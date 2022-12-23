import { PortfolioShare } from './../entities/PortfolioShare';
import { PostgresDataSource } from './../db';
import { Portfolio } from '../entities/Portfolio';
import { Service } from 'typedi';
import { Share } from '../models/share';

@Service()
export default class PortfolioService {
    private portfolioRepository
    private portfolioShareRepository

    constructor() {
        this.portfolioRepository = PostgresDataSource.getRepository(Portfolio)
        this.portfolioShareRepository = PostgresDataSource.getRepository(PortfolioShare)
    }

    async save(name:string): Promise<Portfolio> {
        return await this.portfolioRepository.save(name)
    }

    async getByID(pID: number, sID:number): Promise<PortfolioShare> {
        return await this.portfolioShareRepository
            .createQueryBuilder()
            .select()
            .where("portfolio_id = :p_id", {p_id: pID})
            .andWhere("share_id = :s_id", {s_id: sID})
            .getOne()
    }

    async getByShareID(sID:number): Promise<PortfolioShare> {
        return await this.portfolioShareRepository
            .createQueryBuilder()
            .select()
            .where("share_id = :s_id", {s_id: sID})
            .getOne()
    }

    async getAll() {
        return await this.portfolioShareRepository
            .createQueryBuilder('portfolio_share')
            .select('portfolio_share.share_id as share_id')
            .addSelect('SUM(portfolio_share.buy_count)', 'buy_count')
            .addSelect('SUM(portfolio_share.sell_count)', 'sell_count')
            .groupBy('portfolio_share.share_id')
            .getRawMany()
    }

    async insertPortfolioShare(share: Share): Promise<PortfolioShare> {
        return await this.portfolioRepository
            .createQueryBuilder()
            .insert()
            .into(PortfolioShare)
            .values([
                {   portfolio_id: share.portfolioID, 
                    share_id: share.shareID, 
                    buy_date: share.buyDate, 
                    b_number_of_share: share.bNumShare,
                    buy_count: share.bCount
                }
            ])
            .execute()
    }

    async updatePortfolioShareByBuy(sID: number, newAmount: number, bDate: Date, bCount: number) {
        await this.portfolioShareRepository
            .createQueryBuilder()
            .update()
            .set({ b_number_of_share: newAmount, buy_date: bDate, buy_count: bCount})
            .where("share_id = :id", {id: sID})
            .execute()
    }

    async updatePortfolioShareBySell(sID: number, newAmount: number, sDate: Date, sCount: number) {
        await this.portfolioShareRepository
            .createQueryBuilder()
            .update()
            .set({ s_number_of_share: newAmount, sell_date: sDate, sell_count: sCount})
            .where("share_id = :id", {id: sID})
            .execute()
    }
}
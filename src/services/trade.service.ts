import { PostgresDataSource } from '../db';
import { Service } from 'typedi';
import { Trade } from '../entities/Trade';

@Service()
export default class TradeService {
    private tradeRepository

    constructor() {
        this.tradeRepository = PostgresDataSource.getRepository(Trade)
    }

    async getByID(sID: number): Promise<Trade> {
        const data = await this.tradeRepository.findOne({
            where: {
                id: sID
            }
        })
        return data
    }

    async updateShareTrade(share_id, t_num_buy, t_num_sell) {
        await this.tradeRepository
            .createQueryBuilder()
            .update()
            .set({  total_num_buy: t_num_buy, 
                    total_num_sell: t_num_sell
                })
            .where("share_id = :id", {id: share_id})
            .execute()
    }

    async updateTotalToPrev(share_id, t_num_buy, t_num_sell) {
        await this.tradeRepository
            .createQueryBuilder()
            .update()
            .set({  
                    prev_num_buy: t_num_buy,
                    prev_num_sell: t_num_sell
                })
            .where("share_id = :id", {id: share_id})
            .execute()
    }

    async save(share:object): Promise<Trade> {
        return await this.tradeRepository.save(share)
    }
}
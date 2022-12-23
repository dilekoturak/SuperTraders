import { Share } from './../entities/Share';
import { PostgresDataSource } from './../db';
import { Service } from 'typedi';

@Service()
export default class ShareService {
    private shareRepository

    constructor() {
        this.shareRepository = PostgresDataSource.getRepository(Share)
    }

    async getByID(sID: number): Promise<Share> {
        const data = await this.shareRepository.findOne({
            where: {
                id: sID
            }
        })
        return data
    }

    async updateShare(sID: number, amount: number) {
        await this.shareRepository
            .createQueryBuilder()
            .update()
            .set({ available: amount})
            .where("id = :id", {id: sID})
            .execute()
    }

    async updatePrice(sID: number, price: number) {
        await this.shareRepository
            .createQueryBuilder()
            .update()
            .set({ rate: price})
            .where("id = :id", {id: sID})
            .execute()
    }

    async save(share:object): Promise<Share> {
        return await this.shareRepository.save(share)
    }
}
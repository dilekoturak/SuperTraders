import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { PortfolioShare } from "./PortfolioShare"
import { Trade } from "./Trade"

@Entity('share')
export class Share {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rate: number

    @Column({
        unique: true
    })
    symbol: string

    @Column()
    total: number

    @Column()
    available: number

    @OneToMany(() => PortfolioShare, (portfolioShare) => (portfolioShare.share_id))
    portfolioShare: Array<PortfolioShare>

    @OneToOne(() => Trade, (trade) => (trade.share_id))
    trade: Trade
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Portfolio } from "./Portfolio"
import { Share } from "./Share"

@Entity()
export class PortfolioShare {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    portfolio_id: number

    @Column()
    share_id: number

    @Column({
        nullable: true
    })
    buy_date: Date

    @Column({
        nullable: true
    })
    sell_date: Date

    @Column({
        nullable: true
    })
    b_number_of_share: number

    @Column({
        nullable: true
    })
    s_number_of_share: number

    @Column({
        default: 0
    })
    buy_count: number

    @Column({
        default: 0
    })
    sell_count: number

    @ManyToOne(() => Portfolio, (portfolio) => (portfolio.id))
    @JoinColumn({ name: 'portfolio_id' })
    portfolio: Portfolio

    @ManyToOne(() => Share, (share) => (share.id))
    @JoinColumn({ name: 'share_id' })
    share: Share
}
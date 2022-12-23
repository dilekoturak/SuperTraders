import { PortfolioShare } from './PortfolioShare';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity('portfolio')
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @OneToMany(() => PortfolioShare, (portfolioShare) => (portfolioShare.portfolio_id))
    portfolioShare: Array<PortfolioShare>
}
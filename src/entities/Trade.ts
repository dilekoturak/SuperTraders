import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('trade')
export class Trade {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    share_id: string

    @Column({
        default: 0
    })
    prev_num_buy: number

    @Column({
        default: 0
    })
    prev_num_sell: number

    @Column({
        default: 0
    })
    total_num_buy: number

    @Column({
        default: 0
    })
    total_num_sell: number
}
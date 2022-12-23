import { Portfolio } from './../entities/Portfolio';
import * as schedule from "node-schedule";
import PortfolioService from "../services/portfolio.service";
import TradeService from "../services/trade.service";
import ShareService from '../services/share.service';

export default class UpdateSharePriceJob {
    constructor(private readonly tradeService: TradeService,
                private readonly shareService: ShareService,
                private readonly portfolioService: PortfolioService) {}

    /**
     * @description Update the price of the share on an hourly basis by calculating difference of buy/sell amounts
     */
    updateSharePrice() {
        schedule.scheduleJob("* 1 * * *", async () => {
            try {
                const data = await this.portfolioService.getAll()

                if (data) {
                    data.forEach(async elm => {
                        const currentShare = await this.tradeService.getByID(elm.share_id)
                        await this.tradeService.updateTotalToPrev(elm.share_id, currentShare.total_num_buy, currentShare.total_num_sell)
                        await this.tradeService.updateShareTrade(elm.share_id, elm.buy_count, elm.sell_count)

                        const lastTrade = await this.tradeService.getByID(elm.share_id)
                        const hourlyBuy = lastTrade.total_num_buy - lastTrade.prev_num_buy
                        const hourlySell = lastTrade.total_num_sell - lastTrade.prev_num_sell
                        const share = await this.shareService.getByID(elm.share_id)

                        const updatedPrice = share.rate + (hourlyBuy - hourlySell)
                        await this.shareService.updatePrice(elm.share_id, updatedPrice)
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
}

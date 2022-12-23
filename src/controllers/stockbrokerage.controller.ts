import { Request, Response } from "express"
import { Trade } from "../models/trade"
import PortfolioService from "../services/portfolio.service"
import ShareService from "../services/share.service"
import TradeService from "../services/trade.service"


export default class StockBrokerageController {
    constructor(private readonly shareService: ShareService,
                private readonly portfolioService: PortfolioService,
                private readonly tradeService: TradeService) {}

    /**
     * @description It allows to register share by Stock Brokerage
     */
    async addShare(req: Request, res: Response) {
        try {
            const share = req.body
            const shareData = await this.shareService.save(share)
            const trade = new Trade()
            trade.share_id = shareData.id
            const tradeData = await this.tradeService.save(trade)

            if (shareData && tradeData) {
                res.status(201).json({ 
                    success: true,
                    message: 'Share successfully created'
                 });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Share is not able to created'
                })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    /**
     * @description It allows to register portfolio by Stock Brokerage
     */
    async addPortfolio(req: Request, res: Response) {
        try {
            const name = req.body
            const portfolio = await this.portfolioService.save(name)

            if (portfolio) {
                res.status(201).json({ 
                    success: true,
                    message: 'Portfolio successfully created'
                 });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Portfolio is not able to created'
                })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
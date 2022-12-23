import { Request, Response } from "express"
import { Share } from "../models/share"
import PortfolioService from "../services/portfolio.service"
import ShareService from "../services/share.service"

export default class PortfolioController {
    constructor(private readonly shareService: ShareService,
                private readonly portfolioService: PortfolioService) {}

    /**
     * @description It allows to buy share
     */
    async buy(req: Request, res: Response) {
        try {
            const pID: number = Number(req.params.id)
            const sID: number = Number(req.params.share_id)
            const bNumShare: number = req.body.b_number_of_share
            const date = new Date()

            const share = await this.shareService.getByID(sID)

            // Check if share exist and num of share will be bought is available
            if (share && bNumShare <= share.available) {
                const portfolioShare = await this.portfolioService.getByID(pID, sID)
                const bCount = portfolioShare ? portfolioShare.buy_count + 1 : 1
                // Check if portfolio has been bought share and check buy rate of share is eligible
                if (portfolioShare && (portfolioShare.b_number_of_share + bNumShare) <= share.available) {
                    const newAmount: number = portfolioShare.b_number_of_share + bNumShare
                    await this.portfolioService.updatePortfolioShareByBuy(sID, newAmount, date, bCount)
                } else {
                    const pShare: Share = {
                        portfolioID: pID,
                        shareID: sID,
                        buyDate: date,
                        bNumShare: bNumShare,
                        bCount: bCount
                    }
                    await this.portfolioService.insertPortfolioShare(pShare)
                }

                // Calculate new available amount and update share
                const remainingAmount = share.available - bNumShare    
                await this.shareService.updateShare(sID, remainingAmount)

                res.status(201).json({ 
                    success: true,
                    message: 'Share successfully bought'
                 })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Share is not available to buy'
                })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    /**
     * @description It allows to sell share
     */
    async sell(req: Request, res: Response) {
        try {
            const pID: number = Number(req.params.id)
            const sID: number = Number(req.params.share_id)
            const sNumShare: number = req.body.s_number_of_share
            const sDate = new Date()

            const portfolioShare = await this.portfolioService.getByID(pID, sID)

            // Check if portfolio has been bought share and sell rate of share is eligible
            if (portfolioShare && (portfolioShare.s_number_of_share + sNumShare - portfolioShare.b_number_of_share) <= 0) {
                // Calculate new sell rate and increase sell count then update portfolio
                const newAmount: number = portfolioShare.s_number_of_share + sNumShare
                const sCount = portfolioShare.sell_count + 1

                await this.portfolioService.updatePortfolioShareBySell(sID, newAmount, sDate, sCount)

                // Calculate new available amount and update share
                const share = await this.shareService.getByID(sID)
                const availableAmount = share.available + sNumShare
                await this.shareService.updateShare(sID, availableAmount)

                res.status(201).json({ 
                    success: true,
                    message: 'Share successfully sold'
                 })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Portfolio does not exist or sell rate exceed'
                })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
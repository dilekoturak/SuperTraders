
import { PostgresDataSource } from './db'
import router  from './routes'
import express from 'express'
import UpdateSharePriceJob from './jobs/update-price'
import Container from 'typedi'
import TradeService from './services/trade.service'
import PortfolioService from './services/portfolio.service'
import ShareService from './services/share.service'

PostgresDataSource.initialize()
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use('/api', router)
        app.listen(3000, () => {
            console.log("App is listening on port 3000");
        })
        const tradeService = Container.get(TradeService)
        const shareService = Container.get(ShareService)
        const portfolioService = Container.get(PortfolioService)

        const updateSharePrice = new UpdateSharePriceJob(tradeService, shareService, portfolioService)
        updateSharePrice.updateSharePrice()
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
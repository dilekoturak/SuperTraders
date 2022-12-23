import * as express from "express"
import Container from "typedi";
import PortfolioController from "./controllers/portfolio.controller";
import StockBrokerageController from "./controllers/stockbrokerage.controller";
import PortfolioService from "./services/portfolio.service";
import ShareService from "./services/share.service";
import TradeService from "./services/trade.service";


const router = express.Router()
const shareService = Container.get(ShareService)
const portfolioService = Container.get(PortfolioService)
const tradeService = Container.get(TradeService)

const portfolioController = new PortfolioController(shareService,portfolioService)
const stockBrokerageController = new StockBrokerageController(shareService, portfolioService, tradeService)

// register portfolio by stock brokerage firm
router.post('/stockbrokerage/addPortfolio', (req, res) => stockBrokerageController.addPortfolio(req, res))

// register share by stock brokerage firm
router.post('/stockbrokerage/addShare', (req, res) => stockBrokerageController.addShare(req, res))

// Buy share by portfolio
router.post('/portfolio/:id/buy/:share_id', (req, res) => portfolioController.buy(req, res))

// Sell share by portfolio
router.post('/portfolio/:id/sell/:share_id', (req, res) => portfolioController.sell(req, res))

export default router
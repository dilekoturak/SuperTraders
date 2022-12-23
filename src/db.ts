import { PortfolioShare } from './entities/PortfolioShare'
import { Share } from './entities/Share'
import { Portfolio } from './entities/Portfolio'
import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from "dotenv";
import { Trade } from './entities/Trade';

dotenv.config();

const options: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Share,
        Portfolio,
        PortfolioShare,
        Trade
    ],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/migrations/**/*.ts"],
    synchronize: false,
    logging: false
};

export const PostgresDataSource = new DataSource(options);
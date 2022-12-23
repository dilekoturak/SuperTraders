# SuperTraders

1) docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres

2) create database supertraders

3) add migration

    npm run typeorm migration:generate src/migrations/"migration name"
    npm run typeorm migration:run

4) npm install

5) npm start
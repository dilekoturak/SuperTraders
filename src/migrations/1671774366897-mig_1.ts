import { MigrationInterface, QueryRunner } from "typeorm";

export class mig11671774366897 implements MigrationInterface {
    name = 'mig11671774366897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_dd17dd1eeb0aad5969f88d0631c" UNIQUE ("name"), CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade" ("id" SERIAL NOT NULL, "share_id" character varying NOT NULL, "prev_num_buy" integer NOT NULL DEFAULT '0', "prev_num_sell" integer NOT NULL DEFAULT '0', "total_num_buy" integer NOT NULL DEFAULT '0', "total_num_sell" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "share" ("id" SERIAL NOT NULL, "rate" integer NOT NULL, "symbol" character varying NOT NULL, "total" integer NOT NULL, "available" integer NOT NULL, CONSTRAINT "UQ_2bf54e73ed1d4ba516f22d0be7d" UNIQUE ("symbol"), CONSTRAINT "PK_67a2b28d2cff31834bc2aa1ed7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio_share" ("id" SERIAL NOT NULL, "portfolio_id" integer NOT NULL, "share_id" integer NOT NULL, "buy_date" TIMESTAMP, "sell_date" TIMESTAMP, "b_number_of_share" integer, "s_number_of_share" integer, "buy_count" integer NOT NULL DEFAULT '0', "sell_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_b54af844b514deb32592ec136d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio_share" ADD CONSTRAINT "FK_037d5885c0437738a2e75a3730f" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_share" ADD CONSTRAINT "FK_f46e886e1a1c00d2bb02f8122f1" FOREIGN KEY ("share_id") REFERENCES "share"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_share" DROP CONSTRAINT "FK_f46e886e1a1c00d2bb02f8122f1"`);
        await queryRunner.query(`ALTER TABLE "portfolio_share" DROP CONSTRAINT "FK_037d5885c0437738a2e75a3730f"`);
        await queryRunner.query(`DROP TABLE "portfolio_share"`);
        await queryRunner.query(`DROP TABLE "share"`);
        await queryRunner.query(`DROP TABLE "trade"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}

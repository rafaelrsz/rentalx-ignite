import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserDeleteUsername1648755068758
  implements MigrationInterface { // eslint-disable-line
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
      })
    );
  }
}

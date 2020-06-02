import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePointCategoriesTable1591107829276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'point_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'point_id',
            type: 'uuid'
          },
          {
            name: 'category_id',
            type: 'uuid'
          },
        ]
      }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('point_categories');
    };

}

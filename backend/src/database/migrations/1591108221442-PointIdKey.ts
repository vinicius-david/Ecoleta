import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class PointIdKey1591108221442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKeys('point_categories', [
        new TableForeignKey({
          name: 'pointId',
          columnNames: ['point_id'],
          referencedTableName: 'points',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'categoryId',
          columnNames: ['category_id'],
          referencedTableName: 'categories',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('point_categories', 'pointId');
      await queryRunner.dropForeignKey('point_categories', 'categoryId');
    }

}

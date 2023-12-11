import { Knex } from 'knex';
import { ETableName } from '../EtableNames';

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.studentResponsible, table => {
            table.bigIncrements('id').primary().index();
            table.bigInteger('studentId').index().notNullable().references('id').inTable(ETableName.student).onUpdate('CASCADE').onDelete('RESTRICT');
            table.bigInteger('responsibleId').index().notNullable().references('id').inTable(ETableName.responsible).onUpdate('CASCADE').onDelete('RESTRICT');
            table.string('kinship').notNullable();
            table.string('type').notNullable();

            table.comment('Tabela utilizada para armazenamento os tipos de usuarios');
        })
        .then(() => {
            console.log(`# Create table ${ETableName.studentResponsible}`);
        });
}


export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableName.studentResponsible)
        .then(() => {
            console.log(`# Drop table ${ETableName.studentResponsible}`);
        });
}

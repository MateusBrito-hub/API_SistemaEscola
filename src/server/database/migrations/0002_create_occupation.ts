import { Knex } from 'knex';
import { ETableName } from '../EtableNames';

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.occupation, table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 150).checkLength('<=', 150).index().notNullable();

            table.comment('Tabela utilizada para armazenamento as ocupações de usuarios');
        })
        .then(() => {
            console.log(`# Create table ${ETableName.occupation}`);
        });
}


export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableName.occupation)
        .then(() => {
            console.log(`# Drop table ${ETableName.occupation}`);
        });
}

import { Knex } from 'knex';
import { ETableName } from '../EtableNames';

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.user_Type, table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 150).checkLength('<=', 150).index().notNullable();

            table.comment('Tabela utilizada para armazenamento os tipos de usuarios');
        })
        .then(() => {
            console.log(`# Create table ${ETableName.user_Type}`);
        });
}


export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableName.user_Type)
        .then(() => {
            console.log(`# Drop table ${ETableName.user_Type}`);
        });
}


import { Knex } from 'knex';
import { ETableName } from '../EtableNames';


export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.user, table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 150).index().notNullable();
            table.string('user', 150).notNullable();
            table.string('password', 150).notNullable();
            table.integer('userTypeId').unsigned();

            table.foreign('userTypeId').references('id').inTable('user_Type');

            table.comment('Tabela utilizada para armazenamento de usuarios');
        })
        .then(() => {
            console.log(`# Create table ${ETableName.user}`);
        });
}


export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableName.user)
        .then(() => {
            console.log(`# Create table ${ETableName.user}`);
        });
}


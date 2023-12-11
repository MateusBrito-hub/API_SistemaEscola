import { Knex } from 'knex';
import { ETableName } from '../EtableNames';


export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.user, table => {
            table.bigIncrements('id').primary().index();
            table.string('name').index().notNullable();
            table.string('email').unique().index().notNullable();
            table.string('password').checkLength('>', 6).notNullable();
            table.bigInteger('userTypeId').index().notNullable().references('id').inTable(ETableName.userType).onUpdate('CASCADE').onDelete('RESTRICT');

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
            console.log(`# Drop table ${ETableName.user}`);
        });
}


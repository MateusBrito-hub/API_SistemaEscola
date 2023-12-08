import { Knex } from 'knex';
import { ETableName } from '../EtableNames';

export async function up(knex: Knex){
    return knex
        .schema
        .createTable(ETableName.employee, table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 150).checkLength('<=', 150).index().notNullable();
            table.string('phone', 11).checkLength('<=', 11).notNullable;
            table.date('dateBirth').notNullable;
            table.string('cpf', 11).checkLength('=', 11).notNullable;
            table.string('rg', 14).checkLength('<=', 14).nullable;
            table.bigInteger('occupationId').index().notNullable().references('id').inTable(ETableName.occupation).onUpdate('CASCADE').onDelete('RESTRICT');
            table.string('zipcode', 9).checkLength('<=', 9).notNullable();
            table.string('address', 255).notNullable();
            table.string('number', 10).checkLength('<=', 10).notNullable();
            table.string('district', 255).notNullable();
            table.string('city', 255).notNullable();
            table.string('state', 255).notNullable();
            table.string('observation', 255).nullable();
            table.bigInteger('userId').index().notNullable().references('id').inTable(ETableName.user).onUpdate('CASCADE').onDelete('RESTRICT');


            table.comment('Tabela utilizada para armazenamento os tipos de usuarios');
        })
        .then(() => {
            console.log(`# Create table ${ETableName.employee}`);
        });
}


export async function down(knex: Knex){
    return knex
        .schema
        .dropTable(ETableName.employee)
        .then(() => {
            console.log(`# Drop table ${ETableName.employee}`);
        });
}

import { Knex } from 'knex';
import { ETableName } from '../EtableNames';


export const seed = async(knex: Knex) => {
    const[{count}] = await knex(ETableName.userType).count<[{count: number}]>('* as count');

    if(!Number.isInteger(count) || Number(count) > 0) return;

    const userTypesToInsert = ['Administrador', 'Estudante', 'Funcionário', 'Responsavel', 'Suporte'].map(userType => ({name: userType}));
    await knex(ETableName.userType).insert(userTypesToInsert);
};

import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';

export const count = async (filter = '') : Promise<number | Error> => {

    try {
        const [{ count }] = await Knex(ETableName.user)
            .where('user','like', `%${filter}%`)
            .count<[{ count: number}]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count); 

        return new Error('Erro ao consultar a quantidade total de registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registro');
    }

    
};

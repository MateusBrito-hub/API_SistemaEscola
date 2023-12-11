import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IStudent } from '../../models';

export const getById = async (id: number) : Promise<IStudent | Error> => {

    try {
        const result = await Knex(ETableName.student)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;
        
        return new Error('Erro ao consultar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }

    
};

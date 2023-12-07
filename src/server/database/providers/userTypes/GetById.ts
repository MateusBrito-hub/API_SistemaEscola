import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUserTypes } from '../../models';

export const getById = async (id: number) : Promise<IUserTypes | Error> => {

    try {
        const result = await Knex(ETableName.userType)
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

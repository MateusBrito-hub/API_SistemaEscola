import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const getById = async (id: number) : Promise<IUser | Error> => {

    try {
        const result = await Knex(ETableName.user)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;
        
        return new Error('Erro ao consultar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Error ao consultar o registro');
    }

    
};

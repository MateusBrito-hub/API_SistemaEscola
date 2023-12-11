import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const getByEmail = async (email: string) : Promise<IUser | Error> => {

    try {
        const result = await Knex(ETableName.user)
            .select('*')
            .where('email', '=', email)
            .first();

        if (result) return result;
        
        return new Error('Erro ao consultar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }

    
};

import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUserTypes } from '../../models';

export const create = async (user: Omit<IUserTypes, 'id'>) : Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableName.userType)
            .insert(user)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }

    
};

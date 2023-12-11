import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUserTypes } from '../../models';

export const create = async (userType: Omit<IUserTypes, 'id'>) : Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableName.userType)
            .insert(userType)
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

import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IOccupation } from '../../models';

export const create = async (occupation: Omit<IOccupation, 'id'>) : Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableName.occupation)
            .insert(occupation)
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

import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IResponsible } from '../../models';

export const create = async (responsible: Omit<IResponsible, 'id'>) : Promise<number | Error> => {

    try {

        const [{ count }] = await Knex(ETableName.user)
            .where('id','like', responsible.userId)
            .count<[{ count: number}]>('* as count');

        if (count === 0) {
            return new Error('O usuario usado não foi cadastrado');
        }

        const [result] = await Knex(ETableName.responsible)
            .insert(responsible)
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

import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IResponsible } from '../../models';

export const updateById = async (id: number, responsible: Omit<IResponsible,'id'>) : Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableName.user)
            .where('id','like', responsible.userId)
            .count<[{ count: number}]>('* as count');

        if (count === 0) {
            return new Error('O usuario usado não foi cadastrado');
        }

        const result = await Knex(ETableName.responsible)
            .update(responsible)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};

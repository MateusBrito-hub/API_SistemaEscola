import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IStudent } from '../../models';

export const updateById = async (id: number, student: Omit<IStudent,'id'>) : Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableName.user)
            .where('id','like', student.userId)
            .count<[{ count: number}]>('* as count');

        if (count === 0) {
            return new Error('O Usuario usado não foi cadastrado');
        }

        const result = await Knex(ETableName.student)
            .update(student)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};

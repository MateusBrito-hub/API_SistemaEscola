import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IStudentResponsible } from '../../models';

export const updateById = async (id: number, studentResponsible: Omit<IStudentResponsible,'id'>) : Promise<void | Error> => {
    try {
        const [{ countStudent }] = await Knex(ETableName.student)
            .where('id','like', studentResponsible.studentId)
            .count<[{ countStudent: number}]>('* as count');

        if (countStudent === 0) {
            return new Error('O Estudante usado não foi cadastrado');
        }

        const [{ countResponsible }] = await Knex(ETableName.responsible)
            .where('id','like', studentResponsible.responsibleId)
            .count<[{ countResponsible: number}]>('* as count');

        if (countResponsible === 0) {
            return new Error('O Responsavel usado não foi cadastrado');
        }

        const result = await Knex(ETableName.studentResponsible)
            .update(studentResponsible)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};

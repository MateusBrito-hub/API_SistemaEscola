import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IStudentResponsible } from '../../models';

export const create = async (studentResponsible: Omit<IStudentResponsible, 'id'>) : Promise<number | Error> => {

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

        const [result] = await Knex(ETableName.studentResponsible)
            .insert(studentResponsible)
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

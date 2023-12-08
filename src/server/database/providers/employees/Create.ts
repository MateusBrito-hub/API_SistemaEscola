import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const create = async (user: Omit<IEmployee, 'id'>) : Promise<number | Error> => {

    try {

        const [{ countOccupation }] = await Knex(ETableName.occupation)
            .where('id','like', user.occupationId)
            .count<[{ countOccupation: number}]>('* as count');

        if (countOccupation === 0) {
            return new Error('A ocupação usado não foi cadastrado');
        }

        const [{ countUser }] = await Knex(ETableName.user)
            .where('id','like', user.userId)
            .count<[{ countUser: number}]>('* as count');

        if (countUser === 0) {
            return new Error('O Usuario usado não foi cadastrado');
        }

        const [result] = await Knex(ETableName.employee)
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

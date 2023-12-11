import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const updateById = async (id: number, employee: Omit<IEmployee,'id'>) : Promise<void | Error> => {
    try {
        const [{ countOccupation }] = await Knex(ETableName.occupation)
            .where('id','like', employee.occupationId)
            .count<[{ countOccupation: number}]>('* as count');

        if (countOccupation === 0) {
            return new Error('A ocupação usado não foi cadastrado');
        }

        const [{ countUser }] = await Knex(ETableName.user)
            .where('id','like', employee.userId)
            .count<[{ countUser: number}]>('* as count');

        if (countUser === 0) {
            return new Error('O Usuario usado não foi cadastrado');
        }

        const result = await Knex(ETableName.employee)
            .update(employee)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};

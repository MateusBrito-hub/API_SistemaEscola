import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const updateById = async (id: number, user: Omit<IUser,'id'>) : Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableName.userType)
            .where('name','like', user.userTypeId)
            .count<[{ count: number}]>('* as count');

        if (count === 0) {
            return new Error('O tipo de usuario usado não foi cadastrado');
        }

        const result = await Knex(ETableName.user)
            .update(user)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};

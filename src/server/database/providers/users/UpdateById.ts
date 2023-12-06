import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const updateById = async (id: number, user: Omit<IUser,'id'>) : Promise<void | Error> => {

    try {
        const result = await Knex(ETableName.user)
            .update(user)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar o registro');
    }

    
};

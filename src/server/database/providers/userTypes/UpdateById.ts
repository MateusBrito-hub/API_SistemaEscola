import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUserTypes } from '../../models';

export const updateById = async (id: number, userType: Omit<IUserTypes,'id'>) : Promise<void | Error> => {

    try {
        const result = await Knex(ETableName.userType)
            .update(userType)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }

    
};

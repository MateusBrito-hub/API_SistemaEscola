import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IOccupation } from '../../models';

export const updateById = async (id: number, occupation: Omit<IOccupation,'id'>) : Promise<void | Error> => {

    try {
        const result = await Knex(ETableName.occupation)
            .update(occupation)
            .where('id', '=', id);

        if (result > 0) return;
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }

    
};

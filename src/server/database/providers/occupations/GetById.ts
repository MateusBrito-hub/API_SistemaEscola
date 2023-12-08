import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IOccupation } from '../../models';

export const getById = async (id: number) : Promise<IOccupation | Error> => {

    try {
        const result = await Knex(ETableName.occupation)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;
        
        return new Error('Erro ao consultar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }

    
};

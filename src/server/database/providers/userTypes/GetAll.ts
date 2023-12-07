import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUserTypes } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0) : Promise<IUserTypes[] | Error> => {

    try {
        const result = await Knex(ETableName.userType)
            .select('*')
            .where('id', Number(id))
            .orWhere('user', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableName.userType)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...result, resultById];
        }
        
        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }

    
};

import { passwordCrypto } from '../../../shared/services';
import { ETableName } from '../../EtableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const create = async (user: Omit<IUser, 'id'>) : Promise<number | Error> => {

    try {
        const hashedPassword = await passwordCrypto.hashPassword(user.password);

        const [{ count }] = await Knex(ETableName.userType)
            .where('id','like', user.userTypeId)
            .count<[{ count: number}]>('* as count');

        if (count === 0) {
            return new Error('O tipo de usuario usado não foi cadastrado');
        }

        const [result] = await Knex(ETableName.user)
            .insert({...user, password: hashedPassword})
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

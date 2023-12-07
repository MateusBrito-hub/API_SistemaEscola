import { IUser, IUserTypes } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        users: IUsers
        userTypes: IUserTypes
    }
}

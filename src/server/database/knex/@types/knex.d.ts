import { IUser, IUserTypes, IEmployee, IOccupation } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        users: IUser
        userTypes: IUserTypes
        employees: IEmployee,
        occupation: IOccupation
    }
}

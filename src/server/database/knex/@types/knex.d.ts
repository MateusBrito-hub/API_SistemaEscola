import { IUser, IUserTypes, IEmployee, IOccupation, IStudent, IResponsible, IStudenteResposible } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        users: IUser
        userTypes: IUserTypes
        employees: IEmployee,
        occupation: IOccupation,
        student: IStudent,
        responsible: IResponsible,
        studentResponsible: IStudenteResposible
    }
}

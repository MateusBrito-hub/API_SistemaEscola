import * as create  from './Create';
import * as getAll  from './GetAll';


export const UsersController = {
    ...create,
    ...getAll
};

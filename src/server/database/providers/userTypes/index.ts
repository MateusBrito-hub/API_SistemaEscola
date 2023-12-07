import * as count from './Count';
import * as create  from './Create';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';


export const UserTypesProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getById,
    ...UpdateById,
    ...deleteById
};

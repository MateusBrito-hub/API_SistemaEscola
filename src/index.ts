import {server} from './server/Server';
import { Knex } from './server/database/knex';
import dotenv from 'dotenv';
dotenv.config();

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`App on in ${process.env.PORT || 3333}`);
    });
};

if (process.env.IS_LOCALHOST != 'true') {
    Knex.migrate.latest()
        .then(() => {
            Knex.seed.run()
                .then(() => startServer())
                .catch(console.log);
        }).catch(console.log);
} else {
    startServer();
}


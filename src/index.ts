import {server} from './server/Server';

server.listen(process.env.PORT || 3333, () => {
    console.log(`App on in ${process.env.PORT || 3333}`);
});

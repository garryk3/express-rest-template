import Logger from '../modules/logger.mjs';
import Transport from '../modules/transport.mjs';
import Router from './router.mjs';

import V1 from './v1/index.mjs';

class Controller {
    constructor() {
        this.logger = new Logger();
        this.transport = new Transport(this.logger);
        this.router = new Router(this.logger);
    }

    init() {
        this.router.use('/api/v1', V1(this.router, this.transport, this.logger));
    }
}

export default Controller;

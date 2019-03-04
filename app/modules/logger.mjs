import winston from 'winston';

class Logger {
    constructor() {
        this.loggerConfig = {
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        };
        this.logger = winston.createLogger(this.loggerConfig);
    }

    log(level, message) {
        this.logger.log({ level, message });
    }

    error(message) {
        this.log('error', message);
    }

    info(message) {
        this.log('info', message);
    }
}

export default Logger;

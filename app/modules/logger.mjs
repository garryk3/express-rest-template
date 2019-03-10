import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint } = format;

class Logger {
    constructor() {
        this.loggerConfig = {
            format: combine(
                timestamp(),
                prettyPrint()
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple(),
                    )
                }),
                new transports.File({ filename: 'info.log', level: 'info' }),
                new transports.File({ filename: 'error.log', level: 'error' }),
            ]
        };
        this.logger = createLogger(this.loggerConfig);
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

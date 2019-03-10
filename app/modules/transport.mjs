import axios from 'axios';

import config from '../config.mjs';

const { transport: transportConfig } = config;

class Transport {
    constructor(logger) {
        this.config = {
            baseURL: transportConfig.baseURL,
            timeout: transportConfig.timeout
        };
        this.logger = logger;
        this.instance = axios.create({ ...this.config });
    }

    setHeader(name, value) {
        if (!this.instance) {
            this.logger.error('cant set header, transport instance not found');
            return;
        }

        this.instance.defaults.headers.common[name] = value;
    }

    async request(method, url, data) {
        if (!this.instance) {
            this.logger.error('cant send request, transport instance not found');

            return {
                result: null,
                httpCode: 500,
                error: {
                    message: 'Transport not found!'
                }
            };
        }

        try {
            const response = await this.instance({ method, url, data });
            const clientData = {
                httpCode: response.status
            };

            if (response.status === 200) {
                clientData.error = null;
                clientData.result = response.data;
            } else {
                clientData.result = null;
                clientData.error = response.data;
            }

            return clientData;
        } catch (error) {
            this.logger.error(error.message);

            return {
                result: null,
                httpCode: 500,
                error
            };
        }
    }
}

export default Transport;

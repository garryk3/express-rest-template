import axios from 'axios';

import config from './config';

class Transport {
    constructor() {
        this.config = {
            baseURL: config.baseURL,
            timeout: config.timeout
        };
        this.instance = null;
    }

    setHeader(name, value) {
        if (!this.instance) {
            console.error(`can't set header, transport instance not found`)
            return;
        }

        this.instance.defaults.headers.common[name] = value;
    }

    create() {
        this.instance = axios.create({ ...this.config });
    }

    async request(method, url, data) {
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
            return {
                result: null,
                httpCode: 500,
                error
            };
        }
    }
}

import test from './test.mjs';

export default(router, transport, logger) => () => {
    router.use('/', test(router, transport, logger));
};

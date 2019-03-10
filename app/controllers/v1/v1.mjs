import test from './test.mjs';

export default (params) => {
    const { router, logger } = params;
    const routes = [{
        path: '/test',
        action: test
    }];

    routes.forEach((route) => {
        router.use(route.path, [], route.action(params));
    });
    logger.info('[v1] init success');
    return router;
};

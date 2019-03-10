import test from './test.mjs';

export default params => () => {
    console.log('init v1');
    const { router } = params;
    const routes = [{
        path: '/test',
        action: test
    }];

    routes.forEach((route) => {
        router.use(route.path, route.action(params));
    });
    return router;
};

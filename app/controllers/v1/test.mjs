export default (params) => {
    const { router } = params;
    console.log('init test');

    router.routeHandler('/', 'get', (req, res) => {
        res.send('success test');
    });
    router.instance.get('/', (req, res) => {console.log('@@@')})
    return router.instance;
};

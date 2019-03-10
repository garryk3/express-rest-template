export default (params) => {
    const { router } = params;
    console.log('init test');
    router.route('/')
        .all((req, res, next) => {
            // eslint-disable-next-line no-console
            console.log('Test route: all middleware success!');
            next();
        })
        .get((req, res) => {
            res.send('success test');
        });
    return router;
};

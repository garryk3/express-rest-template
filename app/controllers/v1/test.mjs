export default (params) => {
    const { router } = params;
    console.log('init test', router);
    router.route('/')
        .all((req, res, next) => {
            console.log('all', req);
            next();
        })
        .get((req, res) => {
            res.send('success');
        });
    return router;
};

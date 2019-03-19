export default (params) => {
    const { router } = params;

    router.route('/')
        .all((req, res, next) => {
            if (req.session) {
                if (req.session.test) {
                    req.session.test += 1;
                } else {
                    req.session.test = 1;
                }
            }
            // eslint-disable-next-line no-console
            console.log('Test route: all middleware success!', req.session);
            next();
        })
        .get((req, res) => {
            res.send('success test');
        });
    return router;
};

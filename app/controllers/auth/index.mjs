export default (params) => {
    const { router } = params;

    router.route('/')
        .get((req, res) => {
            res.send('success test');
        });
    return router;
};

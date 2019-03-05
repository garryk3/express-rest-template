export default(router, transport, logger) => () => {
    router.get('/', () => {
        // eslint-disable-next-line no-console
        console.log(transport, logger);
    });
};

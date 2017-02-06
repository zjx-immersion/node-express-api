exports.setRoutes = router => {
    router.use('/items', require('./routers/item-api'));
};
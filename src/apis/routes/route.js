exports.setRoutes = router => {
    router.use('/todos', require('./routers/todo.api'));
};
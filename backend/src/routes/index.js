const UserRoutes = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./cartRouter')


const routes = (app) => {
   app.use('/api/user', UserRoutes);
   app.use('/api/product', ProductRouter);
   app.use('/api/cart', CartRouter);
}

module.exports = routes;
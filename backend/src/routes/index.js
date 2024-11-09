const UserRoutes = require('./UserRouter');
const ProductRouter = require('./ProductRouter');


const routes=(app)=>{
   app.use('/api/user',UserRoutes);
   app.use('/api/product',ProductRouter);
} 

module.exports=routes;
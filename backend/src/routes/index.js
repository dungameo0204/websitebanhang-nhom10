const UserRoutes = require('./UserRouter');
const routes=(app)=>{
   app.use('/api/user',UserRoutes);
} 

module.exports=routes;
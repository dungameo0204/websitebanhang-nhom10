const createUser = () => {
    return new Promise((resolve, reject) => {
        try{
            resolve({message: 'User created successfully'});
        } catch (error) {
            reject(error);
        }
    }   
    )
}
module.exports = {
    createUser
}


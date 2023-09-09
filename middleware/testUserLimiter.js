const error = require ('../errors')

const testUser = (req,res,next) => {
    if (req.user.testUser){
        throw new error.BadRequestError('Test user, read only')
    }
    next();
}

module.exports = testUser;
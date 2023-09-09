const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { email:user.email, lastName:user.lastName, location:user.location
   ,name:user.name, token:token}})
}
const updateUser = async (req, res) => {
  //const user = await User.findOneAndUpdate({email:req.body.email},{...req.body})
  //res.status(StatusCodes.ACCEPTED).json({user:{name:user.name, lastname:user.lastname}})
 
  const {email, name, lastName, location}  = req.body;
  
  if (!email || !name || !lastName || !location){
    throw new error.BadRequestError('missing value')
  }
  const user = await User.findOne({_id:req.user.userId});
  console.log(user);
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user:{email:email, name:name, lastName:lastName, location:location, token:token}})

}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { email:user.email, lastName:user.lastName, location:user.location
    ,name:user.name, token:token}})
}

module.exports = {
  register,
  login,
  updateUser,

}

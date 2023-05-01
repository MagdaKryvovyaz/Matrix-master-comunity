const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt =require('bcrypt')

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please enter an user name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: 'profile-img-placeholder.png',
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
}); 

// static sihnup method
userSchema.statics.signup = async function(email,password,user) {
   //validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
  }

  const exist = await this.findOne({email})

  if(exist) {
    throw Error('Email already in use')
  }
  //password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const newUser = await this.create({email, password:hash, user})

  return newUser
}

//static login method
userSchema.statics.login = async function(email,password){
//validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({email})

  if(!user) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password,user.password)
  if(!match) {
    throw Error('Incorrect password')
  }

  return user
}

const User = mongoose.model("user", userSchema);

module.exports = User;

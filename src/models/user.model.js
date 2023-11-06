const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
    required: false
  }],
  rol: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  }
}, {
  timestamps: true,
});


userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password,salt);
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password,this.password);
};



module.exports = model('User', userSchema);
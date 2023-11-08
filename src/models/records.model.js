const {
  Schema,
  model
} = require('mongoose');


const recordSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  }

}, {
  timestamps: true,
});

module.exports = model('Record', recordSchema);
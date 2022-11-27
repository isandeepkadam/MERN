const mongoose = require('mongoose');
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, ' please add a text value'],
    },
  },
  { timestamps: true } //udpated and created with time stamp field autimatically
);

module.exports = mongoose.model('Goal', goalSchema);

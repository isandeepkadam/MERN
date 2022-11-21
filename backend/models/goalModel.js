const mongoose = require('mongoose');
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, ' please add a text value'],
    },
  },
  { timestamps: true } //udpated and created field autimatically
);

module.exports = mongoose.model('Goal', goalSchema);

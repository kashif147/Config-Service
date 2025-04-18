const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
  },
  isMicrosoft: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
});

//  Pre-save hook to enforce password validation only when isMicrosoft is false
userSchema.pre("save", function (next) {
  if (!this.isMicrosoft && (!this.password || this.password.length === 0)) {
    return next(new Error("Password is required unless logged in via Microsoft"));
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

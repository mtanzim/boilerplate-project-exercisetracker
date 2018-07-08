var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
      required: [true, 'Username can not be empty'],
      minlength: [3, "Username too short!"],
      maxlength: [20, "Username too long!"],
      type: String,
      index: { unique: true },
    },
  },
  {
    timestamps: true,

  });

User.statics.confirmExist = function (id) {
  return this.findOne({ '_id': id });
}

// pre-save hooks
User.pre('save', function (next) {
  // do nothing
  next();
});

// remove all of the user's exercises
User.pre('remove', function (next) {
  removeExercises(this._id, next)
});


module.exports = mongoose.model('User', User);

var Exercises = require('./exercises.js');
function removeExercises(id, next) {
  // console.log('removing recipes');
  Exercises.removeAllforUser(id)
    .then(exercises => next())
    .catch(err => next(err));
}
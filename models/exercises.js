var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const findUser = require("../controllers/user.controller").getOneUser;

var Exercise = new Schema({
  // user is the foreign key
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Exercise must have an owner!'],
  },
  description: {
    type: String,
    maxlength: [25, 'Description too long!'],
    required: [true, 'Description can not be empty'],
  },
  duration: {
    type: Number,
    min: [0, 'Please specify a valid number over 0.'],
    max: [9999, 'Please provide a lower number.'],
    required: [true, 'Please specify duration']
  },
  date: {
    type: String,
    validate: {
      validator: function (inputDate) {
        let isValid = true;
        // console.log(inputDate);
        isValid = (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g).test(inputDate);
        // console.log(`matched regex ${isValid}`);
        
        if (isValid) {
          let tokens = inputDate.split('-');
          // console.log(tokens);
          //year
          let yyyy = Number(tokens[0]);
          let mm = Number(tokens[1]);
          let dd = Number(tokens[2]);
          
          isValid =  (yyyy >= 1900 && yyyy <= 2018);
          // console.log(`year ok ${isValid}`);
          isValid = isValid && (mm >= 1 && mm <= 12);
          // console.log(`month ok ${isValid}`);
          isValid = isValid && (dd >= 1 && dd <= 31);
          // console.log(`date ok ${isValid}`);
        }

        return isValid;

      },
      message: 'Please specify a date between 1900 and 2018 with the format yyyy-mm-dd!',
    },
  }
  }, {
    timestamps: true,
  });

Exercise.pre('save', function (next) {
  confirmUser(this._user, next);
});

Exercise.statics.removeAllforUser = function (userId) {
  return this
    .find({ '_user': userId })
    .sort({ 'createdAt': -1 })
    .select('_user')
    .then((docs) => {
      return Promise.all(docs.map(doc => {
        return doc.remove();
      }));
    });
}


module.exports = mongoose.model('Exercise', Exercise);

var User = require('./users');
function confirmUser(userid, next) {
  User.confirmExist(userid)
    .then(user => {
      user ? next() : next(new Error("Invalid user supplied!"));
    })
    .catch(err => next(err));
}
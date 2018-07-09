module.exports = function (inputDate) {
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

    // first level checks
    isValid = (yyyy >= 1900 && yyyy <= 2018);
    // console.log(`year ok ${isValid}`);
    isValid = isValid && (mm >= 1 && mm <= 12);
    // console.log(`month ok ${isValid}`);
    isValid = isValid && (dd >= 1 && dd <= 31);
    // console.log(`date ok ${isValid}`);

    //check that a valid date is provided
    if (isValid && ![1,3,5,7,8,10,12].includes(mm)) {
      isValid = (isValid && dd <=30);
    }

    // confirm february
    if (isValid && Number(mm)===2) {
      //leap year test
      if (Number(yyyy) % 4 === 0) {
        if (Number(yyyy) % 100 === 0 ) {
          if (Number(yyyy) % 400 === 0) {
            isValid = (isValid && dd <= 29);
          } else {
            isValid = (isValid && dd <= 28);
          }
        } else {
          isValid = (isValid && dd <= 29);
        }
      } else {
        isValid = (isValid && dd <= 28);
      }
    }

  }

  return isValid;

};
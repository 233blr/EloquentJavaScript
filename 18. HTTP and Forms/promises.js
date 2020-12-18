
// The Promise constructor has an all method that, given an array of promises, returns a promise that waits for all of the promises in the array to finish. It then succeeds, yielding an array of result values. If any of the promises in the array fail, the promise returned by all fails too (with the failure value from the failing promise).

// Try to implement something like this yourself as a regular function called all.

// Note that after a promise is resolved (has succeeded or failed), it can’t succeed or fail again, and further calls to the functions that resolve it are ignored. This can simplify the way you handle failure of your promise.

// function all(promises) {
//   return new Promise(function(success, fail) {

//   });
// }


// all([]).then(function(array) {
//   console.log("This should be []:", array);
// });
// function soon(val) {
//   return new Promise(function(success) {
//     setTimeout(function() { success(val); },
//                Math.random() * 500);
//   });
// }
// all([soon(1), soon(2), soon(3)]).then(function(array) {
//   console.log("This should be [1, 2, 3]:", array);
// });
// function fail() {
//   return new Promise(function(success, fail) {
//     fail(new Error("boom"));
//   });
// }
// all([soon(1), fail(), soon(3)]).then(function(array) {
//   console.log("We should not get here");
// }, function(error) {
//   if (error.message != "boom")
//     console.log("Unexpected failure:", error);
// });

function all(promises) {
  var results = [];
  var count = promises.length;
  // Statement will run before the promises are resolved
  if (count === 0) {
    return Promise.resolve(results);
  }
  return new Promise(function (success, reject) {
    // Checking the values
    promises.forEach(function (currentValue, index) {
      // Return the Promise completed with the passed value
      Promise.resolve(currentValue).then(function (val) {
        results[index] = val;
        count -= 1;
        if (count === 0) {
          return success(results);
        }
      }, reject);
    });
  });
}

// Test code.
all([]).then(function (array) {
  console.log('This should be []:', array);
});
function soon(val) {
  return new Promise(function (success) {
    setTimeout(function () { success(val); },
      Math.random() * 500);
  });
}
all([soon(1), soon(2), soon(3)]).then(function (array) {
  console.log('This should be [1, 2, 3]:', array);
});
function fail() {
  return new Promise(function (success, fail) {
    fail(new Error('boom'));
  });
}
all([soon(1), fail(), soon(3)]).then(function () {
  // We should not get here
  console.log('We should not get here');
}, function (error) {
  if (error.message !== 'boom') {
    console.log('Unexpected failure:', error);
  }
});
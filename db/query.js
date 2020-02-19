var promise = require("bluebird");

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var db = pgp("postgres://postgres:postgres@localhost:5432/tenmill");

const getProducts = categoryId => {
  console.log(`this is the category ID ${categoryId}`);
  if (categoryId == 0) {
    db.any(`SELECT * FROM product_info LIMIT 100;`)
      .then(data => {
        console.log("DATA:", data);
      })
      .catch(function(error) {
        console.log("ERROR:", error);
      });
  } else {
    db.any(
      `SELECT * FROM product_info WHERE category IN (${categoryId}) LIMIT 100;`
    )
      .then(function(data) {
        console.log("DATA:", data.value);
      })
      .catch(function(error) {
        console.log("ERROR:", error);
      });
  }
};

//   if (categoryId == '0') {
//     connection.query(`SELECT * FROM itemData;`, (err, data) => {
//       if (err) {
//         callback(err, null)
//       } else {
//         callback(null, data)
//       }
//     })
//   } else {
//     connection.query(`SELECT * FROM itemData WHERE categoryID = ('${categoryId}');`, (err, data) => {
//       if (err) {
//         callback(err, null)
//       } else {
//         callback(null, data)
//       }
//     })
//   }
// }

// connection.query('SELECT 1 + 1 AS solution', function (error, results) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = { getProducts };

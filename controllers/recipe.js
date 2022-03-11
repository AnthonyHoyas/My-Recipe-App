const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES
const addRecipe = (data) => {
    console.log(data);
    let db = new sqlite3.Database('db/db.recipesdatabase');
    
    db.run(`INSERT INTO recipes (title, SDescr, Servings, Time, Level, Cal, Steps, ingredients, url) VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}", "${data[4]}", "${data[5]}", "${data[6]}", "${data[7]}", "${data[8]}")`, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    })
    db.close();
    }

    const recipedb = (req, res) => {
        let sendData = {data: []};
      
        let db = new sqlite3.Database('db/db.recipesdatabase', (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Connected to the tasks database.');
        });
         db.serialize(() => {
          db.each(`SELECT * FROM recipes`, (err, row) => {
            if (err) {
              console.error(err.message);
            }
            console.log(row);
            console.log(row.content)
            sendData.data.push(row)
      
          });
           //res.send(sendData)
        });
      
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
          console.log(sendData)
          res.send(sendData)
          console.log('Close the database connection.');
        });
      
      }


    exports.addRecipe = addRecipe
    exports.recipedb = recipedb
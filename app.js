const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'client/build')));

const pgp = require('pg-promise')(/* options */)

// internal
const db = pgp('postgres://andrew_test_user:xqmeJVWqPokpuyYa7SxlMHTi55CgyEu2@dpg-cfug69g2i3mtiq9jrhh0-a/andrew_test?ssl=true')

// external
// const db = pgp('postgres://andrew_test_user:xqmeJVWqPokpuyYa7SxlMHTi55CgyEu2@dpg-cfug69g2i3mtiq9jrhh0-a.ohio-postgres.render.com/andrew_test?ssl=true')

// db.none('CREATE TABLE IF NOT EXISTS gds (name VARCHAR ( 50 ), grade VARCHAR ( 50 ));')

// db.none("INSERT INTO gds(name, grade) VALUES ('bob', '100');")


app.get("/api", (req, res) => {
  console.log("WORD")
  db.any('SELECT * FROM gds;')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


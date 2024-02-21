const { Client } = require('./pg');

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "cis2559",
  database: "postgres",
});

client.connect();

client.query(`select* from silpakam_point`, (err, res) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(res.rows);
  }
  client.end;
});
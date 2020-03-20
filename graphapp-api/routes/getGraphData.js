const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.get("/", async function(req, res, next) {
    const dbName = 'blink'
    const user = 'root';
    const password = 'AEdkK%25InNcw1qtfGuT99';
    const url = 'mongodb://' + user + ':' + password + '@mongo:27017';
    const client = new MongoClient(url, { useNewUrlParser: true });
      
    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection("temperatures").find({}).sort('Timestamp', 1).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    }
    catch(err) {
        console.log(err.stack);
    }
});

module.exports = router;
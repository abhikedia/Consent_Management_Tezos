var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')
const PORT = process.env.PORT || 4000;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ConsentManagement'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
})
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


app.post("/addBooking", function (req, res) {
    var postData = req.body;
    console.log("execute");
    console.log(postData, res);
    connection.query("INSERT INTO Bookings SET ?", postData, function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get("/getCount/", function (req, res) {
    connection.query(
        "select id from Bookings order by id DESC LIMIT 1",
        [req.params.vr_id],
        function (err, results) {
            err ? res.send(err) : res.json({ data: results });
        }
    );
});

app.get("/getBookings/:add", function (req, res) {
    connection.query(
        "select * from Bookings where user_address=?",
        [req.params.add],
        function (err, results) {
            err ? res.send(err) : res.end(JSON.stringify(results));
        }
    );
});

app.get("/getPassengers/:add", function (req, res) {
    connection.query(
        "select * from Bookings where airline_address=?",
        [req.params.add],
        function (err, results) {
            err ? res.send(err) : res.end(JSON.stringify(results));
        }
    );
});

app.delete('/deleteBooking/:id', function (req, res) {
    connection.query('DELETE FROM `Bookings` WHERE `id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});
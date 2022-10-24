const cors = require('cors');
var express = require('express'),
    path = require('path'),
    app = express();

    // allow cross origin requests
// configure to only allow requests from certain origins
const whitleListDomain = [
  'http://localhost:8080',
  'http://localhost:3000'
];

// configure cors with dynamic origin
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (whitleListDomain.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// enable pre-flight across-the-board
app.options('*', cors());


app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});
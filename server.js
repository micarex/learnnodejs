var express = require('express');
var bodyParser = require('body-parser');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
  { name: 'Tim', message: 'Hi'},
  { name: 'Jane', message: 'Hello there'},

]

app.get('/messages', (req, res) => {

  res.send(messages);

})


app.post('/messages', (req, res) => {
  messages.push(req.body);
  io.emit('message', req.body);
  console.log(req.body);
  res.sendStatus(200);

})

io.on('connection', (socket) => {
  // console.log('a user connected')
})

// gcloud stuff


/*
var visionClient = vision({
  projectId: 'keyword-and-description-match',
  keyFilename: 'c:/dev/gcloud/access-vision.json'
});
*/


// Creates a google vision client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection('c:/Dev/vision/resource/10.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels detected in the image are:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });



// end gcloud stuff

var server = http.listen(3000, () => {

  console.log('server is listening on port ', server.address().port)

});

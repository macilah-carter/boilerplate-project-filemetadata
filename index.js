var express = require('express');
var cors = require('cors');
const mutler = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config()

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = mutler.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})

const upload = mutler({storage: storage});

app.post('/api/fileanalyse',upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const admin     = require('./routes/api/admin');
const user     = require('./routes/api/user');
const location     = require('./routes/api/location');
const policestation     = require('./routes/api/policestation');
const passbooking     = require('./routes/api/passbooking');
const survey     = require('./routes/api/survey');




const fileUpload = require('express-fileupload');
// default options

require('dotenv').load();
const app = express();
app.use(fileUpload());
app.use(express.static('*'));

//Body Parser Middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//DB Config & connection
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport  Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/location', location);
app.use('/api/policestation', policestation);
app.use('/api/passbooking', passbooking);
app.use('/api/survey', survey);



// app.post('/upload',  function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//     let sampleFile = req.files.file;  
//     sampleFile.mv(`uploads/${req.body.filename}`, async function(err) {
//       if (err) {
//         return res.status(500).send(err);
//       }
//     await  cloudinary.uploader.upload(`uploads/${req.body.filename}`, {"crop":"limit","tags":"category","width":300,"height":200},
//      function(error,result) { 
//        console.log("res",result) 
//        res.json(result.url);
//      });
//     //cloudinary.uploader.upload("uploads/writing.png", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
    
//     });
// }) 

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
//Server port & configuration
const port = process.env.PORT || 5000;
app.listen(port,()=> {
console.log(`Server is Listening on ${port}`);
});

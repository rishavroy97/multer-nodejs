const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
}).single('myImage');

const app = express();

const port = 3000;

// VIEW ENGINE
app.set('view engine', 'ejs');
// static folder
app.use(express.static('./static'));



app.get('/', (req, res) => { 
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.send('test');
        }
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
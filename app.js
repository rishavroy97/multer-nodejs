const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


// // Set Storage Engine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function(req, file, callback){
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Init Upload
// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 1000000},
//     fileFilter: function(req, file, callback){
//         checkFileType(file, callback);
//     }
// }).single('myImage');


// // check file type
// function checkFileType(file, callback){
//     //Allowed extensions
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//         return callback(null, true);
//     }else{
//         callback('Error: Images only');
//     }
// }


const app = express();

const port = 3000;

// VIEW ENGINE
app.set('view engine', 'ejs');
// static folder
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './public/uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //accept a file
        cb(null, true);
    }else{
        //reject a file
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});








app.get('/', (req, res) => { 
    res.render('index');
});

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//             res.render('index', {
//                 msg: err
//             });
//         } else {
//             if(req.file == undefined){
//                 res.render('index', {msg: 'Error: No file selected!'})
//             }else{
//                 res.render('index', {msg: 'File uploaded', file: `uploads/${req.file.filename}`});
//             }
//         }
//         console.log(req.body);
//     });
// });


app.post('/upload', upload.single('myImage'), (req, res) => {
    console.log(req.file);
    let result = {
        name: req.body.name,
        u_name: req.body.u_name,
    };
    res.json(result);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
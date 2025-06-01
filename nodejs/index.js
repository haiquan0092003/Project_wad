const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const initAdminRouter = require('./route/admin/initAdminRouter');
const initCustomerRouter = require('./route/customer/initCustomerRouter');
const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');

let session = require('express-session');


const app = express();
const port = 3000;

app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use(fileUpload({
    tempFilePath: true
}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Middleware để log request path
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});

// Di chuyển express.static xuống sau middleware logging
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);

initAdminRouter(app);
initCustomerRouter(app);

// Di chuyển route catch-all xuống cuối cùng
app.get('*', function(req, res){
    res.render('404.ejs', {layout: './404'});
});

app.listen(port, () => {
    console.log(`Run http://localhost:${port}/customer/home`)
})
const loginDB = require('../../model/admin/loginDB');

let viewLogin = (req, res) => {
    req.session.isLoginAdmin = false;
    res.render('admin/loginAdmin.ejs', {layout: 'admin/loginAdmin.ejs', dataLogin: ''});
}

let postLogin = (req, res) => {
    console.log('postLogin function reached!');
    console.log('Attempting login for:', req.body.taiKhoan);
    loginDB.selectLogin(function(data){
        console.log('Data received from loginDB.selectLogin:', data);
        if(!data || data.length === 0){
            console.log('Login failed: No data returned or empty data.');
            res.render('admin/loginAdmin.ejs', {dataLogin: 'Wrong username or password'});
            res.end();
        }
        else{
            console.log('Login successful for:', data[0].TenTK);
            req.session.isLoginAdmin = true;
            res.redirect('/admin');
            res.end();
        }
    }, req.body.taiKhoan, req.body.password);
}

module.exports = {viewLogin, postLogin};
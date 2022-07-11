const crypt = require('bcrypt');
module.exports = class PagesController{
    static login(req, res){

        res.render('login');
    }
    static loginPost(req, res){
        const { email, password } = req.body;
        res.json({email, password});
    }
    static register(req, res){
        const { email, password } = req.body;
        res.render('register');
    }
    static registerPost(req, res){

        res.render('register');
    }
}
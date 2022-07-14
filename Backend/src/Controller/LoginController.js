const crypt = require('bcrypt');
const User = require('../Models/User');

module.exports = class PagesController {

    static login(req, res) {

        res.render('login');
    }

    static async loginPost(req, res) {
        let { email, password } = req.body;

        const user = await User.findOne({where: {email}});

        if(!user) {
            return res.json({ error: 'teucu'});
        }

        const passwordCompared = await crypt.compare(password, user.password);

        if(!passwordCompared){
            return res.redirect('/');
        }
        
        res.redirect('/dashboard');
    }

    static register(req, res) {

        res.render('register');

    }

    static async registerPost(req, res) {
        const { email, password, name } = req.body;
        
        let salt = await crypt.genSalt(10);
        const passwordEncoded = await crypt.hash(password, salt);

        await User.create({ email, password: passwordEncoded, name, status: 0 });

        res.status(201).redirect('/dashboard');
    }

}
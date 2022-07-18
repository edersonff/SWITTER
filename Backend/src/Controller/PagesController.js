module.exports = class PagesController{

    static home(req, res){    
        res.render('feed');
    }
    static login(req, res){    
        res.render('login');
    }
    static registro(req, res){    
        res.render('registro');
    }

}
module.exports = class PagesController {

    static home(req, res) {
        res.render('feed');
    }
    static login(req, res) {
        res.render('login', { layout: '' });
    }
    static registro(req, res) {
        res.render('registro', { layout: '' });
    }
    static notificacoes(req, res) {
        res.render('notificacoes', {});
    }
    static momentos(req, res) {
        res.render('momentos', {});
    }

    static grupos(req, res) {
        res.render('grupos', {});
    }

    static games(req, res) {
        res.render('games', {});
    }
}
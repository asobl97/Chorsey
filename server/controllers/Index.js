module.exports = {
    getHomePage: function(req, res, next) {
        res.render('index', {title: 'Chorsey'});
    }
};

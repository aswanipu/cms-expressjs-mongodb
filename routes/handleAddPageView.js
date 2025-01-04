
const handleAddPageView = (req, res) => {

    console.log('Inside add handler');
    if (req.session.isAdmin) {
        console.log('Inside add handler1',req.session.isAdmin);
        res.render('add-page',{username: req.session.username, isAdmin: req.session.isAdmin});

    }else {
        res.redirect('/login');
        console.log('Inside add handler2');
    }
   
}

module.exports = handleAddPageView;
//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');


const handleEditPage = (req, res) => {
    
    if (req.session.isAdmin) {
        const pageId = req.params.id;

    console.log("PageID: ",pageId);

    PageInfo.findOne({ _id: pageId }).exec().then((page) => {
        if (!page) {
            return res.render('edit-page', { error: 'PAGE NOT FOUND' }); // Pass error to the view
        }
        res.render('edit-page', { page, error: null,username: req.session.username, isAdmin:req.session.isAdmin }); // Pass page and no error
    }).catch((err) => {
        res.render('edit-page', { error: 'An error occurred while retrieving the page',username: req.session.username, isAdmin:req.session.isAdmin }); // Pass error to the view
    });

    }else {
        res.redirect('/login');
    }
    
}

module.exports = handleEditPage;
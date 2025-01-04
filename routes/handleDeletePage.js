//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');

const handleDeletePage = (req, res) => {
    if (req.session.isAdmin) {
        const pageId = req.params.id;

        PageInfo.findOneAndDelete({ _id: pageId }).exec().then(() => {
            res.redirect('/manage'); 
        }).catch((err) => {
            res.render('manage', { error: 'Failed to delete page', username: req.session.username, isAdmin:req.session.isAdmin });
        });

    }else {
        res.redirect('/login');
    }
   
}

module.exports = handleDeletePage;
//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');


const handlePageNavigation = async(req, res) => {
    
    const { slug } = req.params;
    try {
        const pages = await PageInfo.find({}).exec();
        const page = await PageInfo.findOne({ slug }).exec();
        if (page) {
            res.render('index', { pages, selectedPage: page ,username: req.session.username, isAdmin:req.session.isAdmin});
        } else {
            res.status(404).send('Page not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching page');
    }
}

module.exports = handlePageNavigation;
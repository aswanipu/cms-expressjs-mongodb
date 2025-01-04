const PageInfo = require('../models/pageInfo');
const handleLogin = async(req, res) => {
    const pages = await PageInfo.find({}).sort({ _id: 1 }).exec(); // Sort by _id or any other field if needed

    // Get the first page
    const firstPage = pages[0] || null;
    console.log("Login page");
    res.render('admin-login',{pages, selectedPage: firstPage,username: req.session.username, isAdmin:req.session.isAdmin});
    
}

module.exports = handleLogin;
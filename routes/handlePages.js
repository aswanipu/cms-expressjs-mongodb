
//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');

const handlePages = (req,res)=>{
    if (req.session.isAdmin) {
        PageInfo.find({}).exec().then((pages) => {
            console.log("PageList",pages);
            if(pages.length<1) {
                res.render('all-pages', { error: 'PAGE NOT FOUND',username: req.session.username, isAdmin:req.session.isAdmin});
            }else{
                res.render('all-pages', {pages,username: req.session.username, isAdmin:req.session.isAdmin});
            }
            
        }).catch(e => {
            res.render('all-pages', { error: 'Exception :PAGE NOT FOUND',username: req.session.username, isAdmin:req.session.isAdmin});
        });

    }else {
        res.redirect('/login');
    }
    
    
}

module.exports= handlePages;
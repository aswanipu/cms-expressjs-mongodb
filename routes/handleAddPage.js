// Import validationResult from express-validator
const { validationResult } = require('express-validator');
//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');

const CreateSlugFromTitle = require('../helpers/createSlugFromTitle');

const savePage = (req,res)=>{
    let errors = validationResult(req);
    if (errors.array().length>0) { 
        res.render('add-page', {errorsArray:errors.array() });  // Render with errors
    } else {

        // get the file name 
        let fileName = req.files.heroImage.name; 
        let image = req.files.heroImage;
        let imagePath = `public/hero_images/${fileName}`;

        // store the image in the public. 
        image.mv(imagePath, (e) => {
            console.log(e);
        });

        let heroImagePath= `/hero_images/${fileName}`;
        let page= {
            "title":req.body.title,
            "slug":CreateSlugFromTitle(req.body.title),
            "heroImage": heroImagePath,
            "content": req.body.content
        };

        let newPage= new PageInfo(page);

        newPage.save().then(function() {
            console.log('New Page Added', newPage.title);
        }).catch(e => {
           
            res.render('add-page', {"msg":"Couldn't add the page" ,username: req.session.username, isAdmin:req.session.isAdmin});
        });; 


        res.render('add-page', {"msg":"You have succcefully added a page",username: req.session.username, isAdmin:req.session.isAdmin });
        
    }
}

module.exports= savePage;
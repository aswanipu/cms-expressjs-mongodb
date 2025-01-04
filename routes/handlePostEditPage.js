//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');
const CreateSlugFromTitle = require('../helpers/createSlugFromTitle');

const handlePostEditPage = (req, res) => {
    
    if (req.session.isAdmin) {
        const pageId = req.params.id;

    const { title, content } = req.body;
    let slug= CreateSlugFromTitle(title);
    
    const heroImage = req.files && req.files.heroImage ? req.files.heroImage : null;
    if (heroImage !== null){
         // get the file name 
        let fileName = req.files.heroImage.name; 
        let image = req.files.heroImage;
        let imagePath = `public/hero_images/${fileName}`;

        // store the image in the public. 
        image.mv(imagePath, (e) => {
            console.log(e);
        });
        let heroImagePath= `/hero_images/${fileName}`;

        PageInfo.findOneAndUpdate({ _id: pageId }, { title, slug,heroImagePath, content }).exec().then(() => {
            res.redirect('/manage'); // Redirect to the page list after editing
        }).catch((err) => {
            res.render('edit-page', { error: 'Failed to update page',username: req.session.username, isAdmin:req.session.isAdmin });
        });
    }else {
        PageInfo.findOneAndUpdate({ _id: pageId }, { title, slug, content }).exec().then(() => {
            res.redirect('/manage'); // Redirect to the page list after editing
        }).catch((err) => {
            res.render('edit-page', { error: 'Failed to update page',username: req.session.username, isAdmin:req.session.isAdmin });
        });

    }
   
    }else {
        res.redirect('/login');
    }
    
}

module.exports = handlePostEditPage;
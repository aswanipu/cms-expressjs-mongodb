// Import validationResult from express-validator
const { validationResult } = require('express-validator');

const PageInfo = require('../models/pageInfo');

const handleLoginSetup = async(req, res) => {
    
    let errors = validationResult(req);
    if (errors.array().length>0) { 
       
        const pages = await PageInfo.find({}).sort({ _id: 1 }).exec(); // Sort by _id or any other field if needed
        const firstPage = pages[0] || null;

        res.render('admin-login', {errorsArray:errors.array(),pages, selectedPage: firstPage}); 
    } else {
        //Set session values
        req.session.username = req.body.username;
        req.session.isAdmin = true;

        res.render('admin-login', {msg:"Success", username: req.session.username, isAdmin:req.session.isAdmin }); 

        console.log("session",req.session);
    }
 
};

module.exports = handleLoginSetup;
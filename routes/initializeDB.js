const User = require('../models/user');
const PageInfo = require('../models/pageInfo');

const initialize= (req,res)=>{

    console.log("inside initialize hndler");

    let adminUser = 
        {
          username: "PageAdmin",
          password: "password",
        };
    let admin= new User(adminUser);

    admin.save().then(function() {
      res.send("Database setup completeted.");
    }).catch(e => {
        isSuccess= false;
        res.send("Database setup Failed.");
    });
 
};

module.exports = initialize;
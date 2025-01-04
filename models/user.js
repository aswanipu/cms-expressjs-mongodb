const mongoose = require('mongoose');

const user = mongoose.model('User', {
    username: String,
    password: String,
    
});

module.exports = user;
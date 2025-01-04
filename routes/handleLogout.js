
const handleLogout = (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/'); 
    });
    
}

module.exports = handleLogout;
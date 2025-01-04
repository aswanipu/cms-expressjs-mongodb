//Import pageInfo collection model
const PageInfo = require('../models/pageInfo');


const handleDefault = async(req, res) => {
    
    try {
        // Fetch all pages
        const pages = await PageInfo.find({}).sort({ _id: 1 }).exec(); // Sort by _id or any other field if needed

        // Get the first page
        const firstPage = pages[0] || null;

        res.render('index', { pages,selectedPage: firstPage});
    } catch (error) {
        res.status(500).send('Error fetching pages');
    }
}

module.exports = handleDefault;
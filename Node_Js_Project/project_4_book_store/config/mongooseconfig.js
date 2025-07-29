const mongoose = require('mongoose');

const mongooseconnect =  () => {
    mongoose.connect('mongodb://localhost:27017/book_store')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));
}

module.exports = mongooseconnect;
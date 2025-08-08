const mongoose = require('mongoose');

const mongooseconnect = () => {+
    mongoose.connect('mongodb+srv://vishal_solanki:Vishal2425@cluster0.qqivfjv.mongodb.net/moviesdb')
        .then(() => console.log('Connected to the database'))
        .catch((err) => console.log('Error connecting to the database', err));
};

module.exports = mongooseconnect;
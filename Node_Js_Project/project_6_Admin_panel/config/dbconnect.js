const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect('mongodb+srv://vishal_solanki:Vishal2425@cluster0.qqivfjv.mongodb.net/admin_panel')
        .then(() => console.log("Db connection successful"))
        .catch((err) => console.log(err))
}

module.exports = dbconnect;
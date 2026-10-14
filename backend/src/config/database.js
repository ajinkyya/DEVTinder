const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ajinkyaadcs_db_user:fav9wt97rA0KswY6@cluster0.ygkucvg.mongodb.net/devTinder")
};

module.exports = connectDB;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        Unique: true
    },
    funfacts: [String] 
});

module.exports = mongoose.model('State', stateSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    Image: {
        type: String,
        require: true
    },
    isSelected: {
        type: Boolean,
    }
})

module.exports = Candidate = mongoose.model('candidates', candidateSchema);
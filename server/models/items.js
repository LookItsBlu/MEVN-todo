var mongoose = require('mongoose')

var itemSchema = new mongoose.Schema({
    finished: Boolean,
    name: String
});

module.exports = mongoose.model('Item', itemSchema);

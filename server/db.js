const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongoconnection = mongoose.connect('mongodb://localhost/kanbanism')

module.exports = mongoconnection


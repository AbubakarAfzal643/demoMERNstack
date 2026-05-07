const mongoose = require('mongoose')

const demoSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rollNumber : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('demo',demoSchema)
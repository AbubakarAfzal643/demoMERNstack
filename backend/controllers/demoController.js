const demo = require('../models/demoModel')

// get name and roll Number
const getStudents = async (req,res) => {
    try {
        const data = await demo.find().sort({createdAt : -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


// create a student with name and roll number
const createStudent = async(req,res) => {
    try {
        const {name,rollNumber} = req.body
        const newStudent = await demo.create({name,rollNumber})
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {getStudents,createStudent};
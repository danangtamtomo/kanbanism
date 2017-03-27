const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')


const KanbanSchema = mongoose.Schema({
    value: String,
    group: String,
    position: String
}, {
    timestamps: true
})


const Kanban = mongoose.model('Kanban', KanbanSchema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



app.get('/kanban', (req, res) => {
    Kanban.find({})
        .then((kanbans) => {
            res.send(kanbans)
        })
        .catch((err) => {
            res.send(err.message)
        })
})

app.post('/save/kanban', (req, res) => {
    Kanban.remove({})
        .catch((err) => {
            if (err) {
                console.log(err.message)
            }
        })
    let kanbanGroup = []
    for(group in req.body.kanban) kanbanGroup.push(group)
    let newKanban = []
    kanbanGroup.map((kanban) => {
        req.body.kanban[kanban].forEach((val) => {
           newKanban.push(val) 
        })
    })
    Kanban.insertMany(newKanban)
        .then(() => {
            res.send({
                message: 'Kanban has been saved'
            })
        })
        .catch((err) => {
            if (err) {
                message: err.message
            }
        })
})

app.listen(3000)
const express = require("express");
const router = express.Router();
const Task = require("../../models/task");

// router : localhost/api/task
router.route("/task")
.get((req, res) => {
    Task.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(200).json(error))
});

//route pour récuperer task suivant sont id : localhost/api/task/id
router.route("/task/:id")
.get((req,res) => {
    Task.find({ _id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
}) 
.put((req, res) => {
    Task.updateOne({ _id: req.params.id}, req.body)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error)) 
})
.delete((req, res) => {
    Task.deleteOne({ _id: req.params.id})
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error)) 
});

// memo cours
//*********** */
// route pour ajouter un task: localhost/api/task +json
// router.route("/task")
// .post((req,res) => {
//    let task = new Task(req.body)
//    task.save()
//          .then((data) => res.status(201).json(data))
//         .catch((error) => res.status(400).json(error))
// });
//************ */

// export des routes contenues dans le routeur
module.exports =router;
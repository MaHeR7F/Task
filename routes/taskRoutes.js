
const { Router } = require("express");
const express = require("express");
const task = require("../models/task");
const router = express.Router();
const Task = require("../models/task");

// affiche la vue du formulaire
router.route("/")
.get((req, res) => {
    Task.find()
    .then((data) => {
        res.render('home',{
            tasks: data
        });
    })
    .catch((erreur) => console.log(error))
});

router.route('/task/delete/:id')
.get((req, res) => {

    Task.deleteOne({ _id: req.params.id})
    .then((data) => {res.redirect("/");})
    .catch((error) => console.log(error)) 
})

// router : localhost/api/task
router.route("/task/new")
.get((req, res) => {

    res.render('new-task-form', {
        error: ""
    })
})

// memo exemple
//************* */
//let task = save()
//          .then((data) => res.status(201).json(data))
//       .catch((error) => res.status(400).json(error))
//************* */

.post((req, res) => 
{
    let error = ""; 

    if (req.body.label == "")
    {
        error += "Le champs label n'est pas renseigné";
    }
    if (req.body.description == "")
    {
        error += "\n Le champs description n'est pas renseigné" ;
    }
    if (req.body.date == "")
    {
        error += "\n Le champs date n'est pas renseigné" ;
    }
    if (error != "")
    {
        res.render('new-task-form', {
            error: error
        })
    }
    else {
        let task = new Task(req.body)
        
        task.save()
        .then(() => res.redirect('/'))
        .catch((error) => res.status(400).json(error));
        }
});

// suite memo exemple
//************* */
//let task = new Task(req.body)
// task.save()
//  .then((data) => res.status(201).json(data))
//  .catch((error) => res.status(400).json(error))
//redirection vers accueil
//     res.redirect('/');
//});


// autre exemple d'utilisation
//************* */
//route pour récuperer task suivant sont id : 
//localhost/api/task/id
// router.route("/task/:id")
// .get((req,res) => {
//     Task.find({ _id: req.params.id})
//         .then((data) => res.status(200).json(data))
//         .catch((error) => res.status(400).json(error))
// }) 
// .put((req, res) => {
//     Task.updateOne({ _id: req.params.id}, req.body)
//     .then((data) => res.status(200).json(data))
//     .catch((error) => res.status(400).json(error)) 
// })
// .delete((req, res) => {
//     Task.deleteOne({ _id: req.params.id})
//     .then((data) => res.status(200).json(data))
//     .catch((error) => res.status(400).json(error)) 
// });
//************* */


module.exports = router

// entrer des données
//************* */
//crée un task
// let task = new Task({
//     label: "djkhsfjdkhs",
//     desc: "nfdbjkdfbjkvdfsbvfdsblv",
//     date: "12/12/12",
//     status: "fdbsfdsbj",
//     actions: "ouvert"
// });

// //crée un autre task
// let taskBis = new Task({
//     label: "djkhsfjdkhs",
//     desc: "nfdbjkdfbjkvdfsbvfdsblv",
//     date: "12/12/12",
//     status: "fdbsfdsbj",
//     actions: "ouvert"
// });

// // enregistrer task dans la base de données
// task.save()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
//************* */
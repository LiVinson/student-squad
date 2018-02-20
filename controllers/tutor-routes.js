var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");

//New Tutor:

//Request received to register a new tutor
router.post("/newTutor", passport.authenticate('local-signup',  { successRedirect: '/dashboard',
    failureRedirect: '/'}
    ));
    
    // var tutor = req.body;
    // //Parameter names based on object sent from frontend js

    // //Check if this user already exists bu comparing email
    // db.Tutor.findAll({
    //     where: { email: tutor.email }
    //  }).then(function() {

    //  })
    // db.Tutor.create({
    //     tutor_first_name: tutor.firstName,
    //     tutor_last_name: tutor.lastName,
    //     tutor_agency: tutor.agency,
    //     email: tutor.email,
    //     password: tutor.password
    // }).then(function(newUser) {
    //     console.log("New tutor signed up!");
    //     console.log(newUser);
    // })

// });

//Authenticate tutor
router.get("/tutorLogin", function(req, res) {

    db.Tutor.findOne({
        where: {email: req.body.email}
    }).then(
        function(tutor) {
            if (tutor.password === req.body.password) {
                console.log("successfully authenticated")
            }
            else {
                console.log("No tutors matching those credentials")
            }
        }
    )
});

//TUTOR HOME PAGE

//GET ROUTE - Displays students assigned to logged in tutor on navigation bar
// router.get("/", function (req, res) {
//     db.Student.findAll({
//         where: {
//             tutor_id: req.body.userId //Determine how to store logged in tutor's id
//         }
//     }).then(function (students) {
//         res.json(students)
//     })
// });

//PATCH ROUTES - Updates the tutor_id field for student with code entered
router.patch("/newStudent", function (req, res) {
    var studentCode = req.body.studentCode;
    studentCode = studentCode.toLowerCase.trim();
    var tutorCode = req.body.tutorCode; //determine how to save the id for this user

    db.Student.update({
        tutor_id: tutorCode
    }, {
        where: {
            unique_id: studentCode
        }
    }).then(function () {
        res.json("/");
    });
});

//Google Calendar API - Client Side Only

//GET: View the student profile that was clicked - will send student data to handlebars page

//GET: Go to Notes page: Get route using handlebars


//STUDENT PROFILE (Tutor View and Teacher View)
//GET - Most recent 5 tutor messages/notes from the messages table

//GET - Most recent 5 teacher messages/notes from the messages table

//GET - All tutor notes from the messages table

//GET - All teacher notes from the messages table

//PATCH - Update/edit a message from the messages table

//PATCH messages - Change to read (tutor)

//GET - Notes / Landing Page (HTML Routes)

//Messages
//POST - Create a new tutor message (student name, date, length of session, message, next topics to cover);

//Get Pages: Student profile, landing page (HTML Routes)

//TEACHER LANDING PAGE

//POST: Send message to entire class/classes

//GET: Get list of classses 

//Get: list of students in each class - when user clicks on class, generate dropdown with list


module.exports = router;
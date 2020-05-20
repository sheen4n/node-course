const express = require("express");
const Joi = require('joi');
const router = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];


router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The course with the given id not found");
    }
    res.send(course);
});

router.post("/", (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);
});

router.put("/:id", (req, res) => {
    // Lookup the course with id
    //If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The course with the given id not found");
    }

    //validate
    // if invalid, return 400
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update course
    course.name = req.body.name;
    //Return updated course to client
    res.send(course);
})

// app.get("/api/courses/:year/:month", (req, res) => {
//   // res.send(req.params);
//   res.send(req.query);
// });

router.delete("/:id", (req, res) => {
    // Lookup for the courses
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The course with the given id not found");
    }
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = { name: Joi.string().min(3).required() };

    return Joi.validate(course, schema);
}

module.exports = router;
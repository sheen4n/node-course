const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Could not connect to mongoDb:" + err));

const courseSchema = new mongoose.Schema({
    // _id: String,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /abc/
    },
    author: String,
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
        lowercase: true,
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                //Do some async work
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: "There should be at least one tag"
        }
    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

// Classes, objects
// Course, nodeCourse
// Human, John

// createCourse();

async function createCourse() {
    const course = new Course({
        name: "Angular Course 400",
        author: "Mosh",
        category: "WEB",
        tags: ["frontend"],
        isPublished: true,
        price: 20.32
    });

    try {
        // await course.validate();

        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }

};

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // .find({ author: "Mosh", isPublished: true })
        // .find()
        // Contains mo (case insensitive)
        .find({ author: /.*mo.*/i })

        // Starts with mo (case insensitive)
        // .find({ author: /^mo/i })

        // Ends with sh
        // .find({ author: /sh$/ })

        // .or([{ author: "Mosh" }, { isPublished: true }])
        // .and([{ author: "Mosh" }, { isPublished: true }])
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        .skip((pageNumber - 1) * pageSize)
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    // .count();
    console.log(courses);
}



createCourse();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Could not connect to mongoDb:" + err));

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function updateCourse(id) {
    console.log(id);
    const course = await Course.findById(id);
    console.log(course);
    if (!course) return;

    course.isPublished = true;
    course.author = "Test";

    const result = await course.save();
    console.log(result);
};
async function run() {
    await updateCourse('5a68fdc3615eda645bc6bdec');
}

run();

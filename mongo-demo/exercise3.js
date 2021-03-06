const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Could not connect to mongoDb:" + err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    return courses = await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }])
    // .or([{ tags: "frontend" }, { tags: "backend" }])
    // .sort({ price: -1 })
    // .select({ name: 1, author: 1 });
};
async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();

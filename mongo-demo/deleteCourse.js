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

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    // const result = await Course.deleteMany({ isPublished: true });
    // const course = await Course.findByIdAndRemove(id);
    console.log(result);

};
async function run() {
    await removeCourse('5a68fdc3615eda645bc6bdec');
}

run();

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
    const result = await Course.update({ _id: id }, {
        $set: {
            isPublished: false,
            author: "sheen"
        }
    });
    console.log(result);
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         isPublished: true,
    //         author: "jack"
    //     }
    // }, { new: true });

    // console.log(course);
};
async function run() {
    await updateCourse('5a68fdc3615eda645bc6bdec');
}

run();

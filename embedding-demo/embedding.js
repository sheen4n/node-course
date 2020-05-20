const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground_embedding')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  try {
    // const course = await Course.update({ _id: courseId }, {
    //   $set: {
    //     'author.name': 'John Smith'
    //   }
    // });

    const course = await Course.update({ _id: courseId }, {
      $unset: {
        'author': ''
      }
    });

    // course.author.name = "Sheen";
    // course.save();
  } catch (error) {
    console.error(error);
  }

}


async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}


// createCourse('React Course', [
//   new Author({ name: 'Mosh1' }),
//   new Author({ name: 'Mosh2' })
// ]);
// addAuthor('5d90b7e299154f4fdcad65ff', new Author({ name: 'Mosh3' }));
removeAuthor("5d90b7e299154f4fdcad65ff", "5d90b85e457d011a44cf250f");
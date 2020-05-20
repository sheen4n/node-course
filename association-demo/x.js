// Trade off between query performance and consistency

// Using References (Normalization)

let author = {
    name: "Mosh"
};

let course = {
    author: "id",
    // authors: ["id1", "id2"]
};

// Using Embedded Documents (Denormalization)

let course = {
    author: {
        name: "Mosh"
    }
};

// Hybrid Approach
let author = {
    name: "Mosh"
    // 50 other properties
}

let course = {
    author: {
        id: "ref",
        name: "Mosh"
    }
}
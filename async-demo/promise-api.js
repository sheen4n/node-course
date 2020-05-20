const p1 = new Promise((resolve) => {

    setTimeout(() => {
        console.log("Async operation 1..");
        // reject(new Error("Error!"))
        resolve(1);
    }, 4000);

});

const p2 = new Promise((resolve) => {

    setTimeout(() => {
        console.log("Async operation 2..");
        resolve(2);
    }, 2000);

});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log(error.message));
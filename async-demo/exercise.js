

console.log("Starting...");

// async function sendTopMoviesToCustomer() {
//   const [customer, topMovies] = await Promise.all([getCustomer(1), getTopMovies()]);
//   console.log("Movies:" + topMovies);
//   console.log("Customer:" + customer);
//   await sendEmail(customer.email, topMovies);
// };

sendTopMoviesToGoldCustomer();

console.log("Ending...");

async function sendTopMoviesToGoldCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer:" + customer);
    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log(topMovies);
      await sendEmail(customer.email, topMovies);
      console.log("Email sent...");

    }
  } catch (error) {
    console.log("error:" + error.message);
  }

};


function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'abc@abc.com'
      });
    }, 1000);
  });

}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Email sent to:" + email + " with movies: " + movies);
      resolve();
    }, 1000);
  });
}
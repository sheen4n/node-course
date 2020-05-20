console.log("Before");

getUser(1, getRepositories);

console.log("After");

// Callbacks
// Promises
// ASync/await

function getRepositories(user) {
    getRepositories(user.gitHubUserName, getCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from a database");
        callback({ id: id, gitHubUserName: "Sheen" });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("Getting repos from gitHub for..." + username);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
};

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Getting commits from gitHub for..." + repo);
        callback(["commits..."]);
    }, 2000);
};
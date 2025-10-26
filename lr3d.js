// коллбэки
function getPostsWithCallback(callback) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const sorted = data.sort((a, b) => b.title.length - a.title.length);
            callback(null, sorted);
        })
        .catch(err => callback(err));
}

function getCommentsWithCallback(callback) {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => {
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
            callback(null, sorted);
        })
        .catch(err => callback(err));
}


// промисы
function getUsersWithPromise() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => data.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        })));
}

function getTodosWithPromise() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => data.filter(todo => !todo.completed));
}



//  async/await
async function getPostsAsync() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data.sort((a, b) => b.title.length - a.title.length);
}

async function getCommentsAsync() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
    return data.sort((a, b) => a.name.localeCompare(b.name));
}

async function getUsersAsync() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
    }));
}

async function getTodosAsync() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data.filter(todo => !todo.completed);
}

getPostsWithCallback((err, posts) => {
    if (err) console.error(err);
    else console.log('Callback /posts:', posts.slice(0, 3));
});

getCommentsWithCallback((err, comments) => {
    if (err) console.error(err);
    else console.log('Callback /comments:', comments.slice(0, 3));
});

getUsersWithPromise().then(users => console.log('Promise /users:', users.slice(0, 3)));
getTodosWithPromise().then(todos => console.log('Promise /todos:', todos.slice(0, 3)));

(async () => {
    console.log('Async /posts:', (await getPostsAsync()).slice(0, 3));
    console.log('Async /comments:', (await getCommentsAsync()).slice(0, 3));
    console.log('Async /users:', (await getUsersAsync()).slice(0, 3));
    console.log('Async /todos:', (await getTodosAsync()).slice(0, 3));
})();
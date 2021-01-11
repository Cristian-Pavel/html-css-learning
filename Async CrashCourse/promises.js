const posts = [
  {
    title: "Post one",
    body: "This is post one",
  },
  {
    title: "Post two",
    body: "This is post two",
  },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    }, 2000);
  });
}

// 1) Prima varianta cu .then
// createPost({ title: "Post three", body: "This is post three" })
//   .then(getPosts)
//   .catch((err) => console.log(err));

// 2) Async / await

// async function init() {
//   await createPost({ title: "Post three", body: "This is post three" }); // asteptam ca aceasta sa fie executata inainte de a merge mai departe catre getPosts();
//   getPosts();
// }

// init();

// 3) Async / Await with fetch

async function fetchUsers() {
  const rest = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await rest.json();
  console.log(data);
}

fetchUsers();

// 4) Varianta 2 cu promise.all - acesta ia un array de promises

// const promise1 = Promise.resolve("Hello world");
// const promise2 = 10;
// const promise3 = new Promise((resolve, reject) =>
//   setTimeout(resolve, 2000, "Goodbye")
// );

// // aici prin fetch aducem de pe un server extern
// const promise4 = fetch(
//   "https://jsonplaceholder.typicode.com/users"
// ).then((res) => res.json());

// Promise.all([promise1, promise2, promise3, promise4]).then((values) =>
//   console.log(values)
// );

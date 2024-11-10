document.getElementById("button").addEventListener("click", () => {

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Fetching data... Please wait 5 seconds.";
  resultDiv.style.background="yellow";

  delayCallback(5000, fetchData);
});

function delayCallback(delay, callback) {
  setTimeout(() => {
    callback();                                       // callback after delay
  }, delay);
}

function fetchData() {                               // fetching data from JSONPlaceholder API
  fetch("https://dummyjson.com/posts")
    .then(response => response.json())
    .then(data => {
      displayPosts(data.posts);
    })
    .catch(error => {
      document.getElementById("result").innerHTML = "Error fetching posts: " + error;
    });
}

function displayPosts(posts) {                    // display the fetched posts
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h1>Fetched Posts:</h1>";
  resultDiv.style.cssText=`overflow-y: scroll;  max-height: 500px; background :pink`

  posts.forEach(post => {

    const postDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.innerText = post.title;
    title.style.padding=`5px`;
        
    const body = document.createElement("p");
    body.innerText = post.body;
  
    postDiv.appendChild(title);
    postDiv.appendChild(body);
    resultDiv.appendChild(postDiv);
  });
}

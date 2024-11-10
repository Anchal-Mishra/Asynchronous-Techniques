document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    fetchButton.addEventListener("click", fetchData);
  });
  
  async function fetchData() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";
    resultDiv.style.cssText = `border : 2px solid green; border-radius : 10px`;
  
    try {
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) {
        throw new Error("Network response was bad");
      }
  
      const data = await response.json();
  
      resultDiv.innerHTML = `<h1>Fetched Data :</h1>`;
      resultDiv.style.cssText=`overflow-y: scroll;  max-height: 500px;`    //added  vertical scrollbar

      data.posts.forEach(post => {

        const postDiv = document.createElement("div");

        const title = document.createElement("h3");
        title.innerText = post.title;
        title.style.marginBottom="10px";
        
        const body = document.createElement("p");
        body.innerText = post.body;
  
        postDiv.appendChild(title);
        postDiv.appendChild(body);
        resultDiv.appendChild(postDiv);
      });
    } catch (error) {
      resultDiv.innerHTML = `Error: ${error.message}`;
    }
  }
  
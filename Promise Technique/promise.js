document.getElementById('loadDataButton').addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerText = "Loading...";                      // display loading while promise is pending
    contentDiv.style.background="white";
    
    const fetchData = () => {
        return new Promise((resolve, reject) => {

            const timeout = setTimeout(() => {               // if the Promise takes longer than 5 seconds
                reject("Operation timed out.");
            }, 5000);

            // Fetch data from API
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    clearTimeout(timeout);                    // Clear timeout if data is fetched successfully
                    resolve(data.posts);                     // Resolve with posts data
                })
                .catch(error => 
                    reject("An error occurred while fetching data "+error));
        });
    };

    fetchData()                                            
        .then(posts => {
            
            contentDiv.innerHTML = "<h2>Fetched Posts:</h2>";
            contentDiv.style.cssText=`overflow-y: scroll;  max-height: 500px; background :white; color :black`;
            posts.forEach(post => {

            const postDiv = document.createElement("div");
            const title = document.createElement("h3");
            title.innerText = post.title;
            title.style.marginTop = "10px";
        
            const body = document.createElement("p");
            body.innerText = post.body;
  
            postDiv.appendChild(title);
            postDiv.appendChild(body);
            contentDiv.appendChild(postDiv);
                
            });
        })
        .catch(error => {
            contentDiv.innerText = error; 
        });
});

/*Kennedy Ninh & Hayden Perusek       300X HW5        3/17/2024*/
/*In this assignment, we have practiced using the fetch API by building a GitHub Gallery page.*/


/*By: Kennedy Ninh*/
function fetchRepositories(username) {
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((repoData) => {
      // Process and display the retrieved repo data
      displayRepositories(repoData);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Display an error message to the user
      const galleryDiv = document.getElementById("gallery");
      galleryDiv.innerHTML =
        "<p>Error fetching repositories. Please try again later.</p>";
    });
}

  
  /*By: Hayden Perusek*/
  function displayRepositories(repositories) {
    const galleryDiv = document.getElementById("gallery");
    galleryDiv.innerHTML = "";
  
    repositories.forEach((repo) => {
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("gallery-item");
  
      const githubIcon = document.createElement("i");
      githubIcon.classList.add("fab", "fa-github", "fa-xl");
  
      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
  
      // Fetch number of branches
      fetch(`${repo.url}/branches`)
        .then((response) => response.json())
        .then((branches) => {
          const branchCount = branches.length;
          const watchersCount = repo.watchers_count;
  
          // Create a paragraph element to display both branches and watchers
          const branchesAndWatchers = document.createElement("p");
          branchesAndWatchers.innerHTML = `<i class="fas fa-code-branch"></i>${branchCount} | <i class="fas fa-star"></i>${watchersCount}`;
          repoDiv.appendChild(branchesAndWatchers);
        })
        .catch((error) => {
          console.error("Error fetching branches:", error);
        });

      // Fetch number of commits
      fetch(`${repo.url}/commits`)
        .then((response) => response.json())
        .then((commits) => {
          const commitCount = commits.length;

          // Create a paragraph element to display the number of commits
          const commitsElement = document.createElement("p");
          commitsElement.textContent = `Commits: ${commitCount}`;
          repoDiv.appendChild(commitsElement);
        })
        .catch((error) => {
          console.error("Error fetching commits:", error);
        });
  
      const description = document.createElement("p");
      description.textContent = repo.description || "No description available";
  
      const creationDate = document.createElement("p");
      creationDate.textContent = `Created: ${new Date(
        repo.created_at
      ).toLocaleDateString()}`;
  
      const updateDate = document.createElement("p");
      updateDate.textContent = `Last Updated: ${new Date(
        repo.updated_at
      ).toLocaleDateString()}`;
  
      // Append branches, watchers, and commits paragraphs before description
      repoDiv.appendChild(githubIcon);
      repoDiv.appendChild(repoLink);
      repoDiv.appendChild(description);
      repoDiv.appendChild(creationDate);
      repoDiv.appendChild(updateDate);
  
      galleryDiv.appendChild(repoDiv);
    });
  }
  /*By: Hayden Perusek*/
  // Function to handle the search button click
  function search() {
    const username = document.getElementById("username").value;
    fetchRepositories(username);
  }
  
  // Event listener for the search button click
  document.getElementById("search-btn").addEventListener("click", search);

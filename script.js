const blogForm = document.getElementById("blogForm");
const postsContainer = document.getElementById("posts");

// Get posts from localStorage
function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

// Save posts to localStorage
function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Display posts
function displayPosts() {
  const posts = getPosts();
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = `<p class="no-posts">No posts available.</p>`;
    return;
  }

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
    `;

    postsContainer.appendChild(postDiv);
  });
}

// Add post
blogForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title === "" || content === "") return;

  const posts = getPosts();
  posts.push({ title, content });

  savePosts(posts);
  blogForm.reset();
  displayPosts();
});

// Delete post
function deletePost(index) {
  const posts = getPosts();
  posts.splice(index, 1);
  savePosts(posts);
  displayPosts();
}

// Load posts on page load
displayPosts();

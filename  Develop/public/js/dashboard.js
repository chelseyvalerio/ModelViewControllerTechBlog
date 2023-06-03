
const submitPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".title").value.trim();
  const description = document.querySelector(".description").value.trim();
  const content = document.querySelector(".content").value.trim();
  const creator = document.querySelector(".creator").value.trim();
  const author_id = document.querySelector(".logged-in-user-id").innerHTML; 
  if (!author_id) {
      alert(
          "Please login to create a post"
      );
  } else {
      if (title && content) {
          const response = await fetch("/api/post/", {
              method: "POST",
              body: JSON.stringify({ creator, title, description, content, author_id }),
              headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
              document.location.replace("/dashboard");
          } else {
              alert(
                  "Failed to commit post. " +
                      response.status +
                      ": " +
                      response.statusText
              );
          }
      } else {
          alert("Please complete all required fields");
      }
  }
};


const deletePostHandler = async (event) => {
  event.preventDefault();

  const deletePostId = event.target.getAttribute("data-id");
  if (deletePostId) {
      const response = await fetch("/api/post/" + deletePostId, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
          document.location.replace("/dashboard");
      } else {
          alert(
              "Post not deleted, please try again " +
                  response.status +
                  ": " +
                  response.statusText
          );
      }
  }
};


document
  .querySelector(".submit-post")
  .addEventListener("click", submitPostHandler);

const deleteButtons = document.querySelectorAll(".delete-post");
deleteButtons.forEach((el) =>
  el.addEventListener("click", (event) => deletePostHandler(event))
);
  
  
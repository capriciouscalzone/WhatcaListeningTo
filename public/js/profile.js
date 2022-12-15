const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#song-title").value.trim();
  const genre = document.querySelector("#song-genre").value.trim();
  const artist = document.querySelector("#song-artist").value.trim();

  if (title && genre && artist) {
    const response = await fetch(`/api/song`, {
      method: "POST",
      body: JSON.stringify({ title, genre, artist }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create song");
    }
  }
};

const delButtonHandler = async (event) => {
  // console.log(event.target.getAttribute("data-id"));
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/song/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete song");
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector('#comment-body').value.trim();

  if(commentBody){
     const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({ commentBody }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      
      if (response.ok) {
          location.reload();
      } else {
          alert('Failed to create comment');
      }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);

document
  .querySelector(".new-song-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".song-list")
  .addEventListener("click", delButtonHandler);

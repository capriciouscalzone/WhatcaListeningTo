
const newCommentHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#comment-body').value.trim();
    const song_id = event.target.id;

    if(body){
       const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ body, song_id }),
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

const commentForms = document.querySelectorAll(".comment-form");

for(let i=0; i<commentForms.length; i++){
    commentForms[i].addEventListener("submit", newCommentHandler);
}
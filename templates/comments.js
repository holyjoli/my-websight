document.write(`
  <h3>Comments</h3>
<div id="comments">
</div>
<form id="commentForm">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name"><br>
  <label for="text">Comment:</label><br>
  <textarea id="text" name="text"></textarea>
  <button id="send">Send Comment</button>
</form>

<script>
  function addComment(raw) {
    var comment = "<div style='position:relative'><div style='display:inline'>";
    comment += "<h4 style='display:inline'>" + raw.name + "    </h4>" + 
               new Date(parseInt(raw.date)).toLocaleDateString(); + "</div>";
    comment += "<br></br>" + raw.text;

    comment += "</div>";
    document.getElementById('comments').innerHTML += comment + "<br></br><br></br>";
  }
  
  const userAction = async () => {
    var slug = window.location.href.split("/");
    var url = "https://joliroll.herokuapp.com/comments/" + slug[slug.length - 1];
    const response = await fetch(url);
    const comments = await response.json(); //extract JSON from the http response
    for (var i = 0; i < comments.length; i++) {
      addComment(comments[i]);
    }
}
  userAction();
  
  const commentForm = document.getElementById('commentForm');
  commentForm.addEventListener('submit', async function (e) {
      var url = window.location.href.split("/");
      e.preventDefault();
      var body = {name: document.getElementById("name").value,
                 text: document.getElementById("text").value,
                 slug: url[url.length - 1]
                }
      
      var varis = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(body)
      };
    
      var response = await fetch("https://joliroll.herokuapp.com/comments", varis);

      var result = await response.json();
      if (result.status == "success") {
        alert(result.message)
        addComment(result.comment)
      } else {
        alert("FAIL! Try again later.")
      }
      
      console.log(result)
  });

</script>
`)

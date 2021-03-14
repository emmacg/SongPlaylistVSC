"use strict"
// pathway to backend application
const contextPath = "http://localhost:8080";
const table = document.getElementById("tableBody");
//function taking information from backend and presenting it
function getSongPlaylist() {
  axios.get(contextPath + "/read")
    .then(res => {
      table.innerHTML = "";

      const SongPlaylists = res.data;
      console.log(SongPlaylists);

      SongPlaylists.forEach(SongPlaylist => {
        const newSongPlaylist = renderSongPlaylist(SongPlaylist);
        console.log("New SongPlaylist: ", newSongPlaylist);
        table.appendChild(newSongPlaylist);
      });
    }).catch(err => console.error(err))
}

//function to display playlist content in html
function renderSongPlaylist(SongPlaylist) {

  const newRow = document.createElement("tr");
//function to create new song in row
  const newArtistName = document.createElement("td");
  console.log(SongPlaylist.id);
  newArtistName.innerText = SongPlaylist.artistName
  newRow.appendChild(newArtistName)

  const newSongName = document.createElement("td");
  newSongName.innerText = SongPlaylist.songName 
  newRow.appendChild(newSongName);
//edit button and click to call function 
  const actions = document.createElement("td");
  const edit = document.createElement("button");
  edit.className = "edit"
  edit.title = "Edit"
  edit.innerText = "Edit"; 
  edit.addEventListener('click', function() { 
    currentId = SongPlaylist.id;
    updateTable(SongPlaylist.id);
    console.log(SongPlaylist.id);
  });
  actions.appendChild(edit);
  newRow.appendChild(actions);
//delete button and click to call function
  const remove = document.createElement("button");
  remove.className = "delete"
  remove.title = "Remove"
  remove.innerText = "Remove"; 
  remove.addEventListener('click', function()  {
    deleteSongPlaylist(SongPlaylist.id);
  });
  actions.appendChild(remove);
  newRow.appendChild(actions);

return newRow; }
//delete row function
function deleteSongPlaylist(id) {
  console.log(id)
  axios.delete(contextPath + "/removeSongPlaylist/" + id)
  .then(() => getSongPlaylist())
  .catch(err => console.error(err)); 
  
  }
//connecting the create function to the html modal
document.getElementById("createNewEntry").addEventListener('submit', function(event){
  event.preventDefault();
  console.log("this ", this);
  console.log("this.artistName", this.artistName);
  console.log("this.songName", this.songName);


const data ={
  artistName: this.artistName.value, 
  songName: this.songName.value
};
axios.post(contextPath + "/create", data, {
  headers: {
    "content-Type": "application/json", 
    "accept": "application/json",
  }
}).then(() => {
  this.reset();
  this.artistName.focus();
  getSongPlaylist();
  
})
 .catch(err => console.error(err));

}) 

//update function logic
let currentId = 0;
document.getElementById("updateEntry").addEventListener('submit', function(event){
  event.preventDefault();
  console.log("this ", this);
  console.log("this.artistName", this.artistName);
  console.log("this.songName", this.songName);

const data ={
  artistName: this.artistName.value, 
  songName: this.songName.value
};
axios.put(contextPath + "/updateSongPlaylist/" + currentId, data, {
  headers: {
    "content-Type": "application/json", 
    "accept": "application/json",
  }
}).then(() => {
  this.reset();
  this.artistName.focus();
  getSongPlaylist();
  
})
 .catch(err => console.error(err));
}
)
  //update function being called by edit button
  var myModal = new bootstrap.Modal(document.getElementById('updateModal')); 
  
  function updateTable(id) {
    myModal.toggle()
    axios.get(contextPath + "/getSongPlaylist/" + id).then(res => {

    }) 

  }
//this is the function to show the instructions behind the title
  function popFunction() {
    document.getElementById("txt").innerHTML = "<b>How To Use The Playlist</b> Welcome to your Song Playlist! ADD new songs by clicking the 'Add New' button at the top of the screen. To DELETE an entry, clikc the 'Remove' button to the right of the title. To UPDATE or CHANGE an entry, click the 'Edit' button to the right of the title. You can play current entries via the Spotify playlist at the bottom of the screen. <i>The external playlist will not update through this application.</i>"
  }


getSongPlaylist();



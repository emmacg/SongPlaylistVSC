"use strict"

const contextPath = "http://localhost:8080";
const table = document.getElementById("tableBody");

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

// function getRandomColour(){
//   let letters = '0123456789ABCDEF'
//   let color = '#'
//   for( let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
// function changeColor(){
//   let newColour = getRandomColour();
//   document.table.style.backgroundColor = newColour;
// }


function renderSongPlaylist(SongPlaylist) {

  const newRow = document.createElement("tr");

  const newArtistName = document.createElement("td");
  console.log(SongPlaylist.id);
  newArtistName.innerText = SongPlaylist.artistName
  newRow.appendChild(newArtistName)

  const newSongName = document.createElement("td");
  newSongName.innerText = SongPlaylist.songName 
  newRow.appendChild(newSongName);

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

function deleteSongPlaylist(id) {
  console.log(id)
  axios.delete(contextPath + "/removeSongPlaylist/" + id)
  .then(() => getSongPlaylist())
  .catch(err => console.error(err)); 
  
  }

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

// const updatedArtistName = document.createElement("td");
// updatedArtistName.innerText = this.artistName
// newRow.appendChild(updatedArtistName)

// const updatedSongName = document.createElement("td");
// updatedSongName.innerText = this.songName 
// newRow.appendChild(updatedSongName);

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
  
  var myModal = new bootstrap.Modal(document.getElementById('updateModal')); 
  
  function updateTable(id) {
    myModal.toggle()
    axios.get(contextPath + "/getSongPlaylist/" + id).then(res => {

    }) 

  }




getSongPlaylist();



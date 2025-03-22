// Your code here
document.addEventListener("DOMContentLoaded",() =>{
    const characterBar =  document.getElementById("character-bar");
    const  detailedInfo = document.getElementById("detailed-info");
    

let allCharacters =[];

fetch("http://localhost:3000/characters")
.then(response => response.json())
.then(characters=> {
    allCharacters = characters;
    displayCharacters(characters);
});

function displayCharacters(characters) {
    characterBar.innerHTML = "";
    characters.forEach(character => {
        const span  = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => showCharacterInfo(character));
    characterBar.appendChild(span);

    });
}
function showCharacterInfo(character) {
    dogInfo.innerHTML = `
    img src = "${character.image}" alt = "${character.name}">
    <h2>${character.name}</h2>
    <button id ="submit">${addVotes}`
    document.getElementById("submit").addEventListener("click", () => SubmitEvent(votes,button));
const votes = document.getElementById("votes");
const detailedInfo  = document.getElementById("detailed-info");

votes.addEventListener("submit", function(event){
    event.preventDefault();
    const votesInput = this.querySelector('input[type="number"]');
}
)}
})


// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    
    const characterVotesMap = {};

    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.classList.add("character-name");
            span.dataset.id = character.id;
                characterBar.appendChild(span);
                
                if (!characterVotesMap[character.id]) {
                    characterVotesMap[character.id] = character.votes;
                }

                span.addEventListener("click", () => updateCharacterDetails(character));
            });
        })

    function updateCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        detailedInfo.dataset.id = character.id;
        characterVotes.textContent = characterVotesMap[character.id] || 0;
    }

    voteForm.addEventListener("submit", event => {
        event.preventDefault();
        const votesToAdd = parseInt(voteInput.value, 10) || 0;
        const characterId = detailedInfo.dataset.id;

        if (votesToAdd > 0 && characterId) {
            characterVotesMap[characterId] += votesToAdd;
            characterVotes.textContent = characterVotesMap[characterId];
            voteForm.reset();
        }
    });
});

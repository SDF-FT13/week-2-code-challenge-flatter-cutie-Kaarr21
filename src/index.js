// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-button");

 
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

                if (!(character.id in characterVotesMap)) {
                    characterVotesMap[character.id] = character.votes;
                }

                span.addEventListener("click", () => showCharacterDetails(character));
            });
        })
        .catch(error => console.error("Error fetching characters:", error));

    function showCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        detailedInfo.dataset.id = character.id;

        characterVotes.textContent = characterVotesMap[character.id];
    }

    voteForm.addEventListener("submit", event => {
        event.preventDefault();
        const votesToAdd = parseInt(voteInput.value) || 0;
        const characterId = detailedInfo.dataset.id;

        if (votesToAdd > 0 && characterId) {
            characterVotesMap[characterId] += votesToAdd;
            characterVotes.textContent = characterVotesMap[characterId];

            voteForm.reset();
        }
    });

    resetButton.addEventListener("click", () => {
        const characterId = detailedInfo.dataset.id;
        if (characterId) {
            characterVotesMap[characterId] = 0; 
            characterVotes.textContent = 0; 
        }
    });
});

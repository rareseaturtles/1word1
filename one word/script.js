const wordElement = document.getElementById('word-of-the-day');
const changeWordBtn = document.getElementById('change-word-btn');

// Function to update the word element and call the serverless function
async function updateWord(newWord) {
    wordElement.textContent = newWord;
    try {
        const response = await fetch('/.netlify/functions/updateWord', {
            method: 'POST',
            body: JSON.stringify({ word: newWord }),
        });
        if (!response.ok) {
            throw new Error('Failed to update word.');
        }
    } catch (error) {
        console.error('Error updating word:', error);
        // Handle error (e.g., display error message to user)
    }
}

// Function to fetch the word from the serverless function on page load
async function fetchWord() {
    try {
        const response = await fetch('/.netlify/functions/updateWord');
        if (!response.ok) {
            throw new Error('Failed to fetch word.');
        }
        const data = await response.json();
        const word = data.word;
        wordElement.textContent = word || 'Hello'; // Default to 'Hello' if no word is set
    } catch (error) {
        console.error('Error fetching word:', error);
        // Handle error (e.g., display default word)
    }
}

// Call fetchWord() when the page loads
document.addEventListener('DOMContentLoaded', fetchWord);

changeWordBtn.addEventListener('click', () => {
    const newWord = prompt('Enter a new word:');
    if (newWord !== null && newWord.trim() !== '') {
        updateWord(newWord);
    }
});

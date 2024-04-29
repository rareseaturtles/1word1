// functions/updateWord.js

exports.handler = async (event) => {
    try {
        // Parse the incoming request body to extract the new word
        const { word } = JSON.parse(event.body);

        // Validate the new word (optional)
        if (!word || typeof word !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid word format.' }),
            };
        }

        // Save the new word to a centralized location (e.g., database)
        // For demonstration, we'll store it in a global variable
        global.wordOfTheDay = word;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Word updated successfully.' }),
        };
    } catch (error) {
        console.error('Error updating word:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error.' }),
        };
    }
};

const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({origin: true});

exports.generateMidi = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { tempo, key, genre, instrument } = request.body;

    // Generate the ABC notation based on the user's selections
    const abcNotation = generateAbcNotation(tempo, key, genre, instrument);

    try {
      const openAiResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: abcNotation,
        max_tokens: 60
      }, {
        headers: {
          'Authorization': `Bearer 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`
        }
      });

      response.send(openAiResponse.data);
    } catch (error) {
      response.status(500).send(error);
    }
  });
});

function generateAbcNotation(tempo, key, genre, instrument) {
  // Replace this with your actual ABC notation generation logic
  return `X:1\nT:My Tune\nM:4/4\nK:${key}\n${instrument}\n${genre}\nQ:${tempo}\nCDEF`;
}

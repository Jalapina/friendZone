import React, { useState } from 'react';
import axios from 'axios';
import ABCJS from 'abcjs';

const generateMidi = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: 'Generate a chord progression in C major.',
        max_tokens: 100,
        temperature: 0.5,
        n: 1
      }, {
        headers: {
          'Authorization': 'Bearer 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'
        }
      });
  
      const chordProgression = response.data.choices[0].text.trim();
  
      // Render ABC notation on the page
      ABCJS.renderAbc('notation', chordProgression, { staffwidth: 'auto' });
    } catch (error) {
      console.error(error);
    }
  };
  
  export default generateMidi;
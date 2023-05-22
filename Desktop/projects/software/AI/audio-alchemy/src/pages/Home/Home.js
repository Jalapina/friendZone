import React, { useState } from 'react';
import axios from 'axios';
import { genreOptions, instrumentOptions,keyOptions } from '../../Config/Options';

function Home() {
  const [tempo, setTempo] = useState(90);
  const [key, setKey] = useState('');
  const [genre, setGenre] = useState('');
  const [instrument, setInstrument] = useState('');
  const [result, setResult] = useState('');

  const generateMidi = async () => {
    try {
      const response = await axios.post('/api/generateMidi', { tempo, key, genre, instrument });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Home">
      <label htmlFor="tempo">Tempo (BPM):</label>
      <input
        type="number"
        id="tempo"
        min={1}
        step={1}
        value={tempo}
        onChange={e => setTempo(e.target.value)}
      />
      <br />

      <select onChange={e => setKey(e.target.value)}>
        <option value="">Select Key</option>
        {keyOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <br />

      <select onChange={e => setGenre(e.target.value)}>
        <option value="">Select Genre</option>
        {genreOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <br />

      <select onChange={e => setInstrument(e.target.value)}>
        <option value="">Select Instrument</option>
        {instrumentOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <br />

      <button onClick={generateMidi}>Generate</button>
      <p>{result}</p>
    </div>
  );
}

export default Home;

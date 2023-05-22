import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

const GeneratedMIDI = () => {
  const [generatedMidis, setGeneratedMidis] = useState([]);

  useEffect(() => {
    const fetchGeneratedMidis = async () => {
      try {
        // const firestore = firebase.firestore();
        // const midisCollection = firestore.collection('midis');
        // const midisSnapshot = await midisCollection.get();

        // const midisData = midisSnapshot.docs.map((doc) => doc.data());
        // setGeneratedMidis(midisData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGeneratedMidis();
  }, []);

  return (
    <div className="generated-midis">
      <h3>Generated MIDI Files</h3>
      {generatedMidis.length === 0 ? (
        <p>No MIDI files generated yet.</p>
      ) : (
        <ul>
          {generatedMidis.map((midi, index) => (
            <li key={index}>
              <a href={midi.url} download>
                {midi.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeneratedMIDI;
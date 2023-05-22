import React, { useState } from 'react';

const Profile = () => {
  const [generatedMidis, setGeneratedMidis] = useState([]);
  const [subscriptionTier, setSubscriptionTier] = useState('Basic');

  // Function to handle subscription tier change
  const handleSubscriptionChange = (tier) => {
    setSubscriptionTier(tier);
    // Add your logic here to update the user's subscription tier
  };

  return (
    <div className="profile">
      <h2>Profile</h2>

      <div className="subscription">
        <h3>Subscription Tier</h3>
        <p>Current Tier: {subscriptionTier}</p>
        <select onChange={(e) => handleSubscriptionChange(e.target.value)}>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Pro">Pro</option>
        </select>
      </div>

      <div className="generated-midis">
        <h3>Generated MIDI Files</h3>
        {generatedMidis.length === 0 ? (
          <p>No MIDI files generated yet.</p>
        ) : (
          <ul>
            {generatedMidis.map((midi, index) => (
              <li key={index}>
                <a href={midi.url} download>{midi.name}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [collectData, setCollectData] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [favoriteInfluencer, setFavoriteInfluencer] = useState("");
  const [responses, setResponses] = useState([]);

  // Fetch responses from the server (or database)
  useEffect(() => {
    axios
      .get(
        "https://albabackend-axf7axbbh8ckeph3.canadacentral-01.azurewebsites.net/posts"
      ) // Update the URL if you're using a different server
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  function handleCollectData() {
    setCollectData(!collectData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate that all fields are filled
    if (!fullName || !nickname || !age || !favoriteInfluencer) {
      alert("Please fill in all fields.");
      return; // Exit early if validation fails
    }

    const newResponse = {
      fullName,
      nickname,
      age,
      favoriteInfluencer,
      date: new Date().toISOString().split("T")[0],
    };

    // Send the new data to the backend
    axios
      .post(
        "https://albabackend-axf7axbbh8ckeph3.canadacentral-01.azurewebsites.net/posts",
        newResponse
      ) // Make sure to update the URL
      .then((response) => {
        setResponses([response.data, ...responses]); // Add the new response to the list
        setFullName("");
        setNickname("");
        setAge("");
        setFavoriteInfluencer("");
      })
      .catch((error) => {
        console.error("There was an error submitting the data:", error);
      });
  }

  return (
    <div>
      <header>
        <h1>Let Me Know Your Favorite Influencer!</h1>
        <div className="intro">We would love to know a little about you!</div>
        <button onClick={handleCollectData}>Enter Data</button>
      </header>

      {collectData && (
        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor="FullName">Full Name:</label>
            <input
              id="FullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label htmlFor="Nickname">Nickname:</label>
            <input
              id="Nickname"
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <label htmlFor="Age">Age:</label>
            <input
              id="Age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label htmlFor="FavoriteInfluencer">Favorite Influencer:</label>
            <input
              id="FavoriteInfluencer"
              type="text"
              placeholder="Enter your favorite influencer"
              value={favoriteInfluencer}
              onChange={(e) => setFavoriteInfluencer(e.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
        </main>
      )}

      <div className="response-list">
        {responses.map((response) => (
          <div key={response.id} className="response">
            <div className="response-header">
              <div className="name">
                <p>
                  <strong>Full Name:</strong> {response.fullName}
                </p>
                <p>
                  <strong>Nickname:</strong> {response.nickname}
                </p>
              </div>
              <div className="age">
                <p>
                  <strong>Age:</strong> {response.age}
                </p>
              </div>
            </div>
            <p>
              <strong>Favorite Influencer:</strong>{" "}
              {response.favoriteInfluencer}
            </p>
            <div className="date">
              <small>{response.date.split("T")[0]}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

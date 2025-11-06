import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import StoryList from './components/StoryList';
import StoryForm from './components/StoryForm';
import Navigation from './components/Navigation';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchPublicStories();
  }, []);

  const fetchPublicStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories/public`);
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const createStory = async (storyData) => {
    try {
      const response = await axios.post(`${API_URL}/stories`, storyData);
      setStories([response.data, ...stories]);
      return response.data;
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <div className="hero">
                    <h1>Story Diary</h1>
                    <p>Write and share your stories with the world</p>
                  </div>
                  <StoryList stories={stories} />
                </>
              } 
            />
            <Route 
              path="/write" 
              element={
                <StoryForm onSubmit={createStory} />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';

const StoryList = ({ stories }) => {
  if (stories.length === 0) {
    return (
      <div className="story-list">
        <h2>Recent Stories</h2>
        <p>No stories yet. Be the first to write one!</p>
      </div>
    );
  }

  return (
    <div className="story-list">
      <h2>Recent Stories</h2>
      <div className="story-grid">
        {stories.map(story => (
          <div key={story._id} className="story-card">
            <h3>{story.title}</h3>
            <div className="story-meta">
              By {story.author} • {new Date(story.createdAt).toLocaleDateString()} • {story.wordCount} words
            </div>
            <div className="story-content">
              {story.content.substring(0, 150)}...
            </div>
            {story.tags.length > 0 && (
              <div className="story-tags">
                {story.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
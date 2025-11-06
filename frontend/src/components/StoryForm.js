import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoryForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storyData = {
        title,
        content,
        author: author || 'Anonymous',
        isPublic,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await onSubmit(storyData);
      
      // Reset form and redirect
      setTitle('');
      setContent('');
      setAuthor('');
      setIsPublic(false);
      setTags('');
      navigate('/');
    } catch (error) {
      alert('Error saving story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="story-form">
      <h2>Write New Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your story title"
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
          />
        </div>

        <div className="form-group">
          <label>Your Story:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your story here..."
            rows="15"
          />
          <div className="word-count">Words: {wordCount}</div>
        </div>

        <div className="form-group">
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="fantasy, romance, adventure"
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Make this story public
          </label>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Story'}
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
const express = require('express');
const router = express.Router();
const Story = require('../models/story');

// Get all public stories
router.get('/public', async (req, res) => {
  try {
    const stories = await Story.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new story
router.post('/', async (req, res) => {
  try {
    const story = new Story({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author || 'Anonymous',
      isPublic: req.body.isPublic || false,
      tags: req.body.tags || []
    });

    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
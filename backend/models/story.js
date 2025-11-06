const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  wordCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

StorySchema.pre('save', function(next) {
  this.wordCount = this.content.split(/\s+/).filter(word => word.length > 0).length;
  next();
});


module.exports = mongoose.model('Story', StorySchema);

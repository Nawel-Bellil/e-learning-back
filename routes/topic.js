const express = require('express');
const router = express.Router();
const topicController = require('./topic.controller');

// Get all topics for a specific module and chapter
router.get('/modules/:moduleId/chapters/:chapterId/topics', topic.getTopics);

// Create a new topic for a specific module and chapter
router.post('/modules/:moduleId/chapters/:chapterId/topics', topic.createTopic);

// Update a topic
router.put('/modules/:moduleId/chapters/:chapterId/topics/:topicId', topic.updateTopic);

// Delete a topic
router.delete('/modules/:moduleId/chapters/:chapterId/topics/:topicId', topic.deleteTopic);

module.exports = router;

const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Save resume
router.post('/save', async (req, res) => {
    try {
        const resumeData = req.body;
        const resume = new Resume(resumeData);
        await resume.save();
        res.status(201).json({ message: 'Resume saved successfully', id: resume._id });
    } catch (error) {
        res.status(500).json({ error: 'Error saving resume' });
    }
});

// Get all resumes
router.get('/all', async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching resumes' });
    }
});

// Get single resume
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching resume' });
    }
});

// Update resume
router.put('/:id', async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Resume updated successfully', resume });
    } catch (error) {
        res.status(500).json({ error: 'Error updating resume' });
    }
});

// Delete resume
router.delete('/:id', async (req, res) => {
    try {
        await Resume.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting resume' });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    personalInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        github: String
    },
    education: [{
        institution: String,
        degree: String,
        year: String,
        grade: String
    }],
    experience: [{
        company: String,
        position: String,
        duration: String,
        description: String
    }],
    skills: [String],
    projects: [{
        name: String,
        description: String,
        technologies: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema);

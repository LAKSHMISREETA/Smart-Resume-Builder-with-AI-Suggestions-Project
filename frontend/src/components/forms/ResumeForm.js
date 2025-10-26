import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  Alert,
  Snackbar
} from '@mui/material';
import { Add, Download, CloudDownload } from '@mui/icons-material';
import axios from 'axios';

const ResumeForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    education: [{
      institution: '',
      degree: '',
      year: '',
      gpa: ''
    }],
    experience: [{
      company: '',
      position: '',
      duration: '',
      description: ''
    }],
    skills: ['']
  });

  const [generatedPDF, setGeneratedPDF] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const steps = [
    'Personal Info',
    'Professional Summary',
    'Education',
    'Experience',
    'Skills',
    'Generate & Download'
  ];

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleNext = () => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

  const generatePDF = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-pdf', resumeData);
      
      if (response.data.success) {
        setGeneratedPDF(`http://localhost:5000${response.data.downloadUrl}`);
        showSnackbar('✅ PDF generated successfully! Click download to get your resume.');
      } else {
        showSnackbar('❌ Failed to generate PDF', 'error');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      showSnackbar('❌ PDF generation failed. Make sure backend is running.', 'error');
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    if (generatedPDF) {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = generatedPDF;
      link.download = 'my-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSnackbar('📄 Resume download started!');
    }
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', gpa: '' }]
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: updatedEducation }));
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const updateSkill = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData(prev => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 1000, margin: 'auto', mt: 2, mb: 4, p: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        🚀 Smart Resume Builder
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 1: Personal Info */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            👤 Personal Information
          </Typography>
          <Grid container spacing={3}>
            {[
              { label: 'Full Name', field: 'name', type: 'text' },
              { label: 'Email', field: 'email', type: 'email' },
              { label: 'Phone', field: 'phone', type: 'text' },
              { label: 'LinkedIn', field: 'linkedin', type: 'url' },
              { label: 'Portfolio', field: 'portfolio', type: 'url' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={item.label}
                  type={item.type}
                  value={resumeData.personalInfo[item.field]}
                  onChange={(e) => updatePersonalInfo(item.field, e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Step 2: Professional Summary */}
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            📝 Professional Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Write a compelling professional summary"
            value={resumeData.summary}
            onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            variant="outlined"
            placeholder="Example: Dedicated software developer with 4+ years of experience in building scalable web applications..."
          />
        </Box>
      )}

      {/* Step 3: Education */}
      {activeStep === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              🎓 Education
            </Typography>
            <Button startIcon={<Add />} onClick={addEducation} variant="outlined" size="small">
              Add Education
            </Button>
          </Box>
          
          {resumeData.education.map((edu, index) => (
            <Card key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Institution/University"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="GPA (Optional)"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      )}

      {/* Step 4: Experience */}
      {activeStep === 3 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              💼 Work Experience
            </Typography>
            <Button startIcon={<Add />} onClick={addExperience} variant="outlined" size="small">
              Add Experience
            </Button>
          </Box>
          
          {resumeData.experience.map((exp, index) => (
            <Card key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration (e.g., 2018-2022)"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description & Achievements"
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    size="small"
                    placeholder="Describe your responsibilities and achievements in this role..."
                  />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      )}

      {/* Step 5: Skills */}
      {activeStep === 4 && (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            🛠️ Skills
          </Typography>
          <Box sx={{ mb: 3 }}>
            {resumeData.skills.map((skill, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Skill ${index + 1}`}
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                size="small"
                sx={{ mb: 1 }}
                placeholder="e.g., JavaScript, React, Node.js, Python..."
              />
            ))}
            <Button startIcon={<Add />} onClick={addSkill} variant="outlined" size="small">
              Add Skill
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 6: Generate & Download */}
      {activeStep === 5 && (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom color="primary">
            🎉 Your Resume is Ready!
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Generate a professional PDF resume and download it instantly.
          </Typography>

          {generatedPDF ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              ✅ PDF generated successfully! Click below to download your resume.
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mb: 3 }}>
              📄 Fill in your resume details and click "Generate PDF" to create your professional resume.
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={generatePDF}
              disabled={loading}
              startIcon={<CloudDownload />}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              {loading ? 'Generating PDF...' : 'Generate PDF'}
            </Button>
            
            <Button 
              variant="contained" 
              size="large" 
              onClick={downloadPDF}
              disabled={!generatedPDF || loading}
              color="success"
              startIcon={<Download />}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Download Resume
            </Button>
          </Box>

          {/* Resume Preview */}
          <Card sx={{ mt: 4, p: 3, textAlign: 'left', bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" gutterBottom color="primary">
              📋 Resume Preview
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Name:</strong> {resumeData.personalInfo.name || 'Not provided'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {resumeData.personalInfo.email || 'Not provided'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {resumeData.personalInfo.phone || 'Not provided'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Summary:</strong> {resumeData.summary ? `${resumeData.summary.substring(0, 100)}...` : 'Not provided'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Education:</strong> {resumeData.education.length} entries
            </Typography>
            <Typography variant="body2">
              <strong>Experience:</strong> {resumeData.experience.length} entries
            </Typography>
          </Card>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={downloadPDF} disabled={!generatedPDF}>
            Download PDF
          </Button>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Paper>
  );
};

export default ResumeForm;
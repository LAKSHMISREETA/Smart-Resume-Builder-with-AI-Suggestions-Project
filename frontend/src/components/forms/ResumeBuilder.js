import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: ''
    });

    const [aboutMe, setAboutMe] = useState('');

    const [education, setEducation] = useState([{
        institution: '',
        degree: '',
        year: '',
        grade: ''
    }]);

    const [experience, setExperience] = useState([{
        company: '',
        position: '',
        duration: '',
        description: ''
    }]);

    const [internships, setInternships] = useState([{
        company: '',
        position: '',
        duration: '',
        description: ''
    }]);

    const [achievements, setAchievements] = useState(['']);

    const [skills, setSkills] = useState(['']);
    const [projects, setProjects] = useState([{
        name: '',
        description: '',
        technologies: ['']
    }]);
    
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                setProfileImage(imageData);
                localStorage.setItem('profileImage', imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value);
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setEducation(updatedEducation);
    };

    const addEducation = () => {
        setEducation([...education, { institution: '', degree: '', year: '', grade: '' }]);
    };

    const removeEducation = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        setEducation(updatedEducation);
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index] = { ...updatedExperience[index], [field]: value };
        setExperience(updatedExperience);
    };

    const addExperience = () => {
        setExperience([...experience, { company: '', position: '', duration: '', description: '' }]);
    };

    const removeExperience = (index) => {
        const updatedExperience = experience.filter((_, i) => i !== index);
        setExperience(updatedExperience);
    };

    const handleInternshipChange = (index, field, value) => {
        const updatedInternships = [...internships];
        updatedInternships[index] = { ...updatedInternships[index], [field]: value };
        setInternships(updatedInternships);
    };

    const addInternship = () => {
        setInternships([...internships, { company: '', position: '', duration: '', description: '' }]);
    };

    const removeInternship = (index) => {
        const updatedInternships = internships.filter((_, i) => i !== index);
        setInternships(updatedInternships);
    };

    const handleAchievementChange = (index, value) => {
        const updatedAchievements = [...achievements];
        updatedAchievements[index] = value;
        setAchievements(updatedAchievements);
    };

    const addAchievement = () => {
        setAchievements([...achievements, '']);
    };

    const removeAchievement = (index) => {
        const updatedAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(updatedAchievements);
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const addSkill = () => {
        setSkills([...skills, '']);
    };

    const removeSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...projects];
        if (field === 'technologies') {
            updatedProjects[index] = { ...updatedProjects[index], [field]: value };
        } else {
            updatedProjects[index] = { ...updatedProjects[index], [field]: value };
        }
        setProjects(updatedProjects);
    };

    const addProject = () => {
        setProjects([...projects, { name: '', description: '', technologies: [''] }]);
    };

    const removeProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const getResumeData = () => {
        return {
            personalInfo,
            aboutMe,
            education: education.filter(edu => edu.institution || edu.degree),
            experience: experience.filter(exp => exp.company || exp.position),
            internships: internships.filter(intern => intern.company || intern.position),
            achievements: achievements.filter(achievement => achievement.trim() !== ''),
            skills: skills.filter(skill => skill.trim() !== ''),
            projects: projects.filter(project => project.name),
            profileImage
        };
    };

    const saveResume = () => {
        const resumeData = getResumeData();
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Resume saved successfully! You can now download it from the home page.');
        navigate('/');
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
            <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                {/* Header with Home Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            📝 Build Your Resume
                        </h1>
                        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Fill in your details to create a professional resume</p>
                    </div>
                    <button 
                        onClick={goToHome}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #95a5a6, #7f8c8d)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        🏠 Home
                    </button>
                </div>
                
                {/* Profile Photo Upload Section */}
                <section style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #9b59b6', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#9b59b6', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>📷</span>
                        Profile Photo
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ 
                                width: '150px', 
                                height: '150px', 
                                borderRadius: '50%', 
                                background: profileImage ? 'transparent' : '#ecf0f1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                textAlign: 'center',
                                overflow: 'hidden',
                                border: '3px solid #9b59b6',
                                color: profileImage ? 'transparent' : '#7f8c8d'
                            }}>
                                {profileImage ? (
                                    <img 
                                        src={profileImage} 
                                        alt="Profile" 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            borderRadius: '50%'
                                        }}
                                    />
                                ) : (
                                    'No Photo Uploaded'
                                )}
                            </div>
                            <label style={{
                                display: 'inline-block',
                                padding: '12px 25px',
                                background: 'linear-gradient(45deg, #3498db, #2980b9)',
                                color: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                📁 Choose Profile Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {profileImage && (
                                <p style={{ color: '#27ae60', fontSize: '14px', fontWeight: 'bold' }}>
                                    ✓ Photo uploaded successfully!
                                </p>
                            )}
                        </div>
                        <div style={{ flex: 1, maxWidth: '400px' }}>
                            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                <strong>Tips for best results:</strong><br/>
                                • Use a professional headshot<br/>
                                • Ensure good lighting and clear background<br/>
                                • Recommended size: 150x150 pixels<br/>
                                • Supported formats: JPG, PNG, GIF<br/>
                                • File size should be less than 2MB
                            </p>
                        </div>
                    </div>
                </section>

                {/* Personal Information */}
                <section style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#3498db', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>👤</span>
                        Personal Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                        {[
                            { label: 'Full Name', name: 'name', placeholder: 'John Doe' },
                            { label: 'Email', name: 'email', placeholder: 'john@example.com' },
                            { label: 'Phone', name: 'phone', placeholder: '+1 234 567 890' },
                            { label: 'Address', name: 'address', placeholder: 'New York, USA' },
                            { label: 'LinkedIn', name: 'linkedin', placeholder: 'linkedin.com/in/johndoe' },
                            { label: 'GitHub', name: 'github', placeholder: 'github.com/johndoe' }
                        ].map((field) => (
                            <div key={field.name} style={{ position: 'relative' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={personalInfo[field.name]}
                                    onChange={handlePersonalInfoChange}
                                    placeholder={field.placeholder}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 15px', 
                                        border: '2px solid #e1e8ed', 
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        transition: 'all 0.3s ease',
                                        background: 'white'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Me Section */}
                <section style={{ background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #e67e22', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#e67e22', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>💭</span>
                        About Me
                    </h2>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>
                            Professional Summary
                        </label>
                        <textarea
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                            placeholder="Write a brief professional summary about yourself, your career goals, and what makes you unique. This is your elevator pitch!"
                            style={{ 
                                width: '100%', 
                                padding: '15px', 
                                border: '2px solid #ffd89b', 
                                borderRadius: '8px',
                                minHeight: '120px',
                                resize: 'vertical',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                background: 'white'
                            }}
                        />
                        <p style={{ color: '#7f8c8d', fontSize: '12px', marginTop: '5px' }}>
                            Tip: Keep it concise (2-3 sentences) and highlight your key strengths and career objectives.
                        </p>
                    </div>
                </section>

                {/* Education */}
                <section style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #e74c3c', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#e74c3c', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>🎓</span>
                        Education
                    </h2>
                    {education.map((edu, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', margin: '15px 0', borderRadius: '10px', border: '1px solid #ffd7c9' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                {[
                                    { label: 'Institution', field: 'institution', placeholder: 'University Name' },
                                    { label: 'Degree', field: 'degree', placeholder: 'Bachelor of Science' },
                                    { label: 'Year', field: 'year', placeholder: '2020-2024' },
                                    { label: 'Grade', field: 'grade', placeholder: '3.8 GPA' }
                                ].map((item) => (
                                    <div key={item.field}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>
                                            {item.label}
                                        </label>
                                        <input
                                            type="text"
                                            value={edu[item.field]}
                                            onChange={(e) => handleEducationChange(index, item.field, e.target.value)}
                                            placeholder={item.placeholder}
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px', 
                                                border: '2px solid #ffd7c9', 
                                                borderRadius: '6px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            {education.length > 1 && (
                                <button 
                                    onClick={() => removeEducation(index)}
                                    style={{ 
                                        marginTop: '15px', 
                                        padding: '8px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️ Remove Education
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addEducation}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Education
                    </button>
                </section>

                {/* Work Experience */}
                <section style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #9b59b6', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#9b59b6', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>💼</span>
                        Work Experience
                    </h2>
                    {experience.map((exp, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', margin: '15px 0', borderRadius: '10px', border: '1px solid #d6eaf8' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '15px' }}>
                                {[
                                    { label: 'Company', field: 'company', placeholder: 'Google Inc.' },
                                    { label: 'Position', field: 'position', placeholder: 'Software Engineer' },
                                    { label: 'Duration', field: 'duration', placeholder: 'Jan 2023 - Present' }
                                ].map((item) => (
                                    <div key={item.field}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>
                                            {item.label}
                                        </label>
                                        <input
                                            type="text"
                                            value={exp[item.field]}
                                            onChange={(e) => handleExperienceChange(index, item.field, e.target.value)}
                                            placeholder={item.placeholder}
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px', 
                                                border: '2px solid #d6eaf8', 
                                                borderRadius: '6px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Description</label>
                                <textarea
                                    value={exp.description}
                                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                    placeholder="Describe your responsibilities, achievements, and technologies used..."
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '2px solid #d6eaf8', 
                                        borderRadius: '6px',
                                        minHeight: '100px',
                                        resize: 'vertical',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            {experience.length > 1 && (
                                <button 
                                    onClick={() => removeExperience(index)}
                                    style={{ 
                                        marginTop: '15px', 
                                        padding: '8px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️ Remove Experience
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addExperience}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Experience
                    </button>
                </section>

                {/* Internships */}
                <section style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#3498db', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>🏢</span>
                        Internships
                    </h2>
                    {internships.map((intern, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', margin: '15px 0', borderRadius: '10px', border: '1px solid #4facfe' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '15px' }}>
                                {[
                                    { label: 'Company', field: 'company', placeholder: 'Tech Company Inc.' },
                                    { label: 'Position', field: 'position', placeholder: 'Software Development Intern' },
                                    { label: 'Duration', field: 'duration', placeholder: 'Summer 2023 (3 months)' }
                                ].map((item) => (
                                    <div key={item.field}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>
                                            {item.label}
                                        </label>
                                        <input
                                            type="text"
                                            value={intern[item.field]}
                                            onChange={(e) => handleInternshipChange(index, item.field, e.target.value)}
                                            placeholder={item.placeholder}
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px', 
                                                border: '2px solid #4facfe', 
                                                borderRadius: '6px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Description</label>
                                <textarea
                                    value={intern.description}
                                    onChange={(e) => handleInternshipChange(index, 'description', e.target.value)}
                                    placeholder="Describe your internship experience, skills learned, projects worked on, and key achievements..."
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '2px solid #4facfe', 
                                        borderRadius: '6px',
                                        minHeight: '100px',
                                        resize: 'vertical',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            {internships.length > 1 && (
                                <button 
                                    onClick={() => removeInternship(index)}
                                    style={{ 
                                        marginTop: '15px', 
                                        padding: '8px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️ Remove Internship
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addInternship}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Internship
                    </button>
                </section>

                {/* Achievements */}
                <section style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #27ae60', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#27ae60', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>🏆</span>
                        Achievements & Awards
                    </h2>
                    {achievements.map((achievement, index) => (
                        <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Enter achievement or award (e.g., Dean's List, Hackathon Winner, Employee of the Month, etc.)"
                                value={achievement}
                                onChange={(e) => handleAchievementChange(index, e.target.value)}
                                style={{ 
                                    flex: 1, 
                                    padding: '12px 15px', 
                                    border: '2px solid #43e97b', 
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            />
                            {achievements.length > 1 && (
                                <button 
                                    onClick={() => removeAchievement(index)}
                                    style={{ 
                                        padding: '12px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addAchievement}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Achievement
                    </button>
                </section>

                {/* Skills */}
                <section style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #f39c12', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#f39c12', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>🛠️</span>
                        Skills
                    </h2>
                    {skills.map((skill, index) => (
                        <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Enter skill (e.g., JavaScript, React, Python, Machine Learning)"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                style={{ 
                                    flex: 1, 
                                    padding: '12px 15px', 
                                    border: '2px solid #fef9d7', 
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            />
                            {skills.length > 1 && (
                                <button 
                                    onClick={() => removeSkill(index)}
                                    style={{ 
                                        padding: '12px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addSkill}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Skill
                    </button>
                </section>

                {/* Projects */}
                <section style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', padding: '25px', marginBottom: '25px', borderRadius: '12px', border: '1px solid #e1e8ed' }}>
                    <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#3498db', color: 'white', padding: '8px', borderRadius: '50%', fontSize: '16px' }}>🚀</span>
                        Projects
                    </h2>
                    {projects.map((project, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.8)', padding: '20px', margin: '15px 0', borderRadius: '10px', border: '1px solid #89f7fe' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Project Name</label>
                                <input
                                    type="text"
                                    placeholder="Awesome Project Name"
                                    value={project.name}
                                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '2px solid #89f7fe', 
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Description</label>
                                <textarea
                                    placeholder="Describe the project, your role, technologies used, and key achievements..."
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '2px solid #89f7fe', 
                                        borderRadius: '6px',
                                        minHeight: '100px',
                                        resize: 'vertical',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Technologies Used</label>
                                <input
                                    type="text"
                                    placeholder="React, Node.js, MongoDB, Python, etc. (comma separated)"
                                    value={project.technologies.join(', ')}
                                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '2px solid #89f7fe', 
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            {projects.length > 1 && (
                                <button 
                                    onClick={() => removeProject(index)}
                                    style={{ 
                                        padding: '8px 16px', 
                                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🗑️ Remove Project
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        onClick={addProject}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(45deg, #27ae60, #2ecc71)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        ➕ Add Project
                    </button>
                </section>

                {/* Save Button */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button 
                        onClick={saveResume}
                        style={{ 
                            padding: '15px 50px', 
                            fontSize: '18px', 
                            background: 'linear-gradient(45deg, #667eea, #764ba2)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                        }}
                    >
                        💾 Save Resume & Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
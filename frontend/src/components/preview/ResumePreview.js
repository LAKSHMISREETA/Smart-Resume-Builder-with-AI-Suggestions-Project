import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
    const resumeRef = useRef(null);
    const navigate = useNavigate();

    const getResumeData = () => {
        const saved = localStorage.getItem('resumeData');
        return saved ? JSON.parse(saved) : {
            personalInfo: {},
            aboutMe: '',
            education: [],
            experience: [],
            internships: [],
            achievements: [],
            skills: [],
            projects: []
        };
    };

    const getProfileImage = () => {
        return localStorage.getItem('profileImage');
    };

    const resume = getResumeData();
    const profileImage = getProfileImage();

    const downloadPDF = async () => {
        if (!resumeRef.current) return;

        try {
            const canvas = await html2canvas(resumeRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height) * 0.95;
            const imgWidth = canvas.width * ratio;
            const imgHeight = canvas.height * ratio;
            
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;
            
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            
            const fileName = `${resume.personalInfo?.name || 'resume'}-resume.pdf`;
            pdf.save(fileName);
            
            alert('PDF downloaded successfully!');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    const printResume = () => {
        window.print();
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToBuilder = () => {
        navigate('/builder');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', background: '#f8f9fa', minHeight: '100vh' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ color: '#2c3e50', fontSize: '2rem', marginBottom: '20px' }}>
                        📄 Resume Preview & Download
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        <button 
                            onClick={downloadPDF}
                            style={{ 
                                padding: '12px 25px', 
                                background: '#e74c3c', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            📥 Download PDF
                        </button>
                        <button 
                            onClick={printResume}
                            style={{ 
                                padding: '12px 25px', 
                                background: '#3498db', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            🖨️ Print Resume
                        </button>
                        <button 
                            onClick={goToBuilder}
                            style={{ 
                                padding: '12px 25px', 
                                background: '#f39c12', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            ✏️ Edit Resume
                        </button>
                        <button 
                            onClick={goToHome}
                            style={{ 
                                padding: '12px 25px', 
                                background: '#9b59b6', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            🏠 Home
                        </button>
                    </div>
                </div>

                {/* Resume Content - Exact Template Match */}
                <div ref={resumeRef} style={{ 
                    fontFamily: "'Arial', 'Helvetica', sans-serif",
                    backgroundColor: 'white',
                    minHeight: '297mm',
                    maxWidth: '210mm',
                    margin: '0 auto',
                    background: 'white',
                    position: 'relative',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', minHeight: '297mm' }}>
                        {/* Left Column - 35% (Dark Blue) */}
                        <div style={{ 
                            flex: '0 0 35%', 
                            background: '#2c3e50',
                            color: 'white',
                            padding: '40px 30px'
                        }}>
                            {/* Profile Photo */}
                            {profileImage && (
                                <div style={{ 
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '50%', 
                                    margin: '0 auto 40px auto',
                                    overflow: 'hidden',
                                    border: '4px solid #34495e'
                                }}>
                                    <img 
                                        src={profileImage} 
                                        alt="Profile" 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover'
                                        }}
                                        crossOrigin="anonymous"
                                    />
                                </div>
                            )}

                            {/* Contact */}
                            <div style={{ marginBottom: '30px' }}>
                                <h2 style={{ 
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    marginBottom: '20px',
                                    color: 'white',
                                    borderBottom: '2px solid #34495e',
                                    paddingBottom: '8px'
                                }}>
                                    CONTACT
                                </h2>
                                <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#bdc3c7' }}>
                                    {resume.personalInfo?.email && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '5px' }}>EMAIL</div>
                                            <div>{resume.personalInfo.email}</div>
                                        </div>
                                    )}
                                    {resume.personalInfo?.phone && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '5px' }}>PHONE</div>
                                            <div>{resume.personalInfo.phone}</div>
                                        </div>
                                    )}
                                    {resume.personalInfo?.address && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '5px' }}>ADDRESS</div>
                                            <div>{resume.personalInfo.address}</div>
                                        </div>
                                    )}
                                    {resume.personalInfo?.linkedin && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '5px' }}>LINKEDIN</div>
                                            <div>{resume.personalInfo.linkedin}</div>
                                        </div>
                                    )}
                                    {resume.personalInfo?.github && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '5px' }}>GITHUB</div>
                                            <div>{resume.personalInfo.github}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Education */}
                            {resume.education && resume.education.length > 0 && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        color: 'white',
                                        borderBottom: '2px solid #34495e',
                                        paddingBottom: '8px'
                                    }}>
                                        EDUCATION
                                    </h2>
                                    {resume.education.map((edu, index) => (
                                        <div key={index} style={{ marginBottom: '20px' }}>
                                            <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '5px', fontSize: '16px' }}>
                                                {edu.institution}
                                            </div>
                                            <div style={{ color: '#bdc3c7', marginBottom: '3px', fontSize: '14px' }}>
                                                {edu.degree}
                                            </div>
                                            <div style={{ color: '#95a5a6', fontSize: '13px' }}>
                                                {edu.year} {edu.grade && `• ${edu.grade}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Skills */}
                            {resume.skills && resume.skills.length > 0 && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        color: 'white',
                                        borderBottom: '2px solid #34495e',
                                        paddingBottom: '8px'
                                    }}>
                                        SKILLS
                                    </h2>
                                    <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#bdc3c7' }}>
                                        {resume.skills.map((skill, index) => (
                                            <div key={index} style={{ marginBottom: '8px' }}>
                                                • {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - 65% (White) */}
                        <div style={{ 
                            flex: '0 0 65%', 
                            padding: '40px 30px',
                            background: 'white'
                        }}>
                            {/* Name and Title */}
                            <div style={{ marginBottom: '30px' }}>
                                <h1 style={{ 
                                    fontSize: '32px', 
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                    color: '#2c3e50',
                                    textTransform: 'uppercase'
                                }}>
                                    {resume.personalInfo?.name || 'YOUR NAME'}
                                </h1>
                                <p style={{ 
                                    fontSize: '18px',
                                    color: '#3498db',
                                    marginBottom: '0',
                                    fontWeight: '600'
                                }}>
                                    {resume.experience?.[0]?.position || resume.internships?.[0]?.position || 'PROFESSIONAL TITLE'}
                                </p>
                            </div>

                            {/* About Me */}
                            {resume.aboutMe && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        color: '#2c3e50',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        PROFESSIONAL SUMMARY
                                    </h2>
                                    <p style={{ 
                                        fontSize: '14px', 
                                        lineHeight: '1.6', 
                                        color: '#34495e',
                                        textAlign: 'justify'
                                    }}>
                                        {resume.aboutMe}
                                    </p>
                                </div>
                            )}

                            {/* Work Experience */}
                            {resume.experience && resume.experience.length > 0 && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        color: '#2c3e50',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        WORK EXPERIENCE
                                    </h2>
                                    {resume.experience.map((exp, index) => (
                                        <div key={index} style={{ marginBottom: '25px' }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '10px'
                                            }}>
                                                <div>
                                                    <h3 style={{ 
                                                        margin: '0 0 5px 0', 
                                                        fontSize: '17px', 
                                                        fontWeight: 'bold', 
                                                        color: '#2c3e50' 
                                                    }}>
                                                        {exp.position}
                                                    </h3>
                                                    <p style={{ 
                                                        margin: '0', 
                                                        color: '#3498db', 
                                                        fontSize: '15px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                {exp.duration && (
                                                    <span style={{ 
                                                        color: '#7f8c8d', 
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {exp.duration}
                                                    </span>
                                                )}
                                            </div>
                                            {exp.description && (
                                                <p style={{ 
                                                    margin: '10px 0 0 0', 
                                                    color: '#555', 
                                                    fontSize: '14px',
                                                    lineHeight: '1.6'
                                                }}>
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Internships */}
                            {resume.internships && resume.internships.length > 0 && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        color: '#2c3e50',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        INTERNSHIPS
                                    </h2>
                                    {resume.internships.map((intern, index) => (
                                        <div key={index} style={{ marginBottom: '25px' }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '10px'
                                            }}>
                                                <div>
                                                    <h3 style={{ 
                                                        margin: '0 0 5px 0', 
                                                        fontSize: '17px', 
                                                        fontWeight: 'bold', 
                                                        color: '#2c3e50' 
                                                    }}>
                                                        {intern.position}
                                                    </h3>
                                                    <p style={{ 
                                                        margin: '0', 
                                                        color: '#3498db', 
                                                        fontSize: '15px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {intern.company}
                                                    </p>
                                                </div>
                                                {intern.duration && (
                                                    <span style={{ 
                                                        color: '#7f8c8d', 
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {intern.duration}
                                                    </span>
                                                )}
                                            </div>
                                            {intern.description && (
                                                <p style={{ 
                                                    margin: '10px 0 0 0', 
                                                    color: '#555', 
                                                    fontSize: '14px',
                                                    lineHeight: '1.6'
                                                }}>
                                                    {intern.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Projects */}
                            {resume.projects && resume.projects.length > 0 && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ 
                                        color: '#2c3e50',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        PROJECTS
                                    </h2>
                                    {resume.projects.map((project, index) => (
                                        <div key={index} style={{ marginBottom: '20px' }}>
                                            <h3 style={{ 
                                                margin: '0 0 8px 0', 
                                                fontSize: '16px', 
                                                fontWeight: 'bold',
                                                color: '#2c3e50'
                                            }}>
                                                {project.name}
                                            </h3>
                                            {project.description && (
                                                <p style={{ 
                                                    margin: '0 0 10px 0', 
                                                    color: '#555', 
                                                    fontSize: '14px',
                                                    lineHeight: '1.5'
                                                }}>
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Achievements */}
                            {resume.achievements && resume.achievements.length > 0 && (
                                <div>
                                    <h2 style={{ 
                                        color: '#2c3e50',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        ACHIEVEMENTS
                                    </h2>
                                    <ul style={{ paddingLeft: '20px', margin: '0' }}>
                                        {resume.achievements.map((achievement, index) => (
                                            <li key={index} style={{ 
                                                fontSize: '14px', 
                                                lineHeight: '1.6', 
                                                color: '#34495e',
                                                marginBottom: '8px'
                                            }}>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
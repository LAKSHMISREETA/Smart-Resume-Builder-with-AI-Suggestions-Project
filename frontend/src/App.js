import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ResumeBuilder from './components/forms/ResumeBuilder';
import ResumePreview from './components/preview/ResumePreview';
import './App.css';

function HomePage() {
    const navigate = useNavigate();

    const hasResumeData = () => {
        const resumeData = localStorage.getItem('resumeData');
        return resumeData && resumeData !== '{}';
    };

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ 
                background: 'white', 
                borderRadius: '15px', 
                padding: '50px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%'
            }}>
                <h1 style={{ 
                    color: '#2c3e50', 
                    fontSize: '3rem', 
                    marginBottom: '20px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    🚀 Smart Resume Builder
                </h1>
                
                <p style={{ 
                    color: '#7f8c8d', 
                    fontSize: '1.2rem', 
                    marginBottom: '40px',
                    lineHeight: '1.6'
                }}>
                    Create professional resumes in minutes. Build your resume and download it as PDF instantly!
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Build Resume Button */}
                    <button 
                        onClick={() => navigate('/builder')}
                        style={{ 
                            padding: '20px 40px', 
                            fontSize: '18px', 
                            background: 'linear-gradient(45deg, #667eea, #764ba2)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
                            transition: 'all 0.3s ease',
                            minWidth: '200px'
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
                        📝 Build Resume
                    </button>

                    {/* Download Resume Button */}
                    <button 
                        onClick={() => {
                            if (hasResumeData()) {
                                navigate('/preview');
                            } else {
                                alert('Please build a resume first! Click "Build Resume" to get started.');
                            }
                        }}
                        style={{ 
                            padding: '20px 40px', 
                            fontSize: '18px', 
                            background: hasResumeData() 
                                ? 'linear-gradient(45deg, #27ae60, #2ecc71)' 
                                : 'linear-gradient(45deg, #95a5a6, #bdc3c7)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '10px',
                            cursor: hasResumeData() ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold',
                            boxShadow: hasResumeData() 
                                ? '0 5px 15px rgba(39, 174, 96, 0.4)' 
                                : '0 5px 15px rgba(149, 165, 166, 0.4)',
                            transition: 'all 0.3s ease',
                            minWidth: '200px'
                        }}
                        onMouseEnter={(e) => {
                            if (hasResumeData()) {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(39, 174, 96, 0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (hasResumeData()) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(39, 174, 96, 0.4)';
                            }
                        }}
                    >
                        {hasResumeData() ? '📥 Download Resume' : '📥 Build First'}
                    </button>
                </div>

                {/* Resume Status */}
                {hasResumeData() && (
                    <div style={{ 
                        marginTop: '30px', 
                        padding: '15px', 
                        background: '#d4edda', 
                        borderRadius: '8px',
                        border: '1px solid #c3e6cb',
                        color: '#155724'
                    }}>
                        ✅ Your resume is ready! Click "Download Resume" to get your PDF.
                    </div>
                )}

                {/* Features List */}
                <div style={{ 
                    marginTop: '50px', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '20px',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#27ae60', fontSize: '20px' }}>✓</span>
                        <span style={{ color: '#2c3e50' }}>Professional Templates</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#27ae60', fontSize: '20px' }}>✓</span>
                        <span style={{ color: '#2c3e50' }}>PDF Download</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#27ae60', fontSize: '20px' }}>✓</span>
                        <span style={{ color: '#2c3e50' }}>Easy to Use</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#27ae60', fontSize: '20px' }}>✓</span>
                        <span style={{ color: '#2c3e50' }}>Free Forever</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/builder" element={<ResumeBuilder />} />
                    <Route path="/preview" element={<ResumePreview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
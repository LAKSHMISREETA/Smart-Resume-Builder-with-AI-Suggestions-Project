export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
    grade: string;
}

export interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
}

export interface Resume {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    projects: Project[];
}
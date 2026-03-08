export const profileData = {
    name: "Mohammed Mudassir",
    titles: ["B.Tech Student", "AI Enthusiast", "Full-Stack Developer"],
    bio: "Mohammed Mudassir is a B.Tech Information Technology student at Vignan Institute of Technology & Science. He is passionate about AI-powered solutions, full-stack development, and innovative problem-solving.",
    resume_url: "",
    achievements: [
        {
            title: "2nd Prize – CognitiveX: GenAI Hackathon 2025",
            location: "VGNT ECE Department",
            date: "September 2025",
            image: "/images/ece-1.jpg",
        },
        {
            title: "3rd Place – Robotica Chapter-3 Technical Fest",
            location: "Geethanjali College",
            event: "36 Hours Hackathon",
            date: "October 2025",
            image: "/images/gcet-3.jpg",
        },
        {
            title: "Unique Idea & Innovation Award",
            event: "GENAIVERSITY HACKATHON 2025",
            date: "October 2025",
            image: "/images/genai.jpg",
        },
    ],
    skills: {
        technical: [
            { name: "Python", level: "Intermediate" },
            { name: "HTML & CSS", level: "Proficient" },
            { name: "MySQL", level: "Intermediate" },
            { name: "C Programming", level: "Proficient" },
            { name: "React.js", level: "Intermediate" },
        ],
        soft: ["Leadership", "English Proficiency", "Time Management", "Event Management"],
    },
    projects: [
        {
            id: "studymate",
            title: "StudyMate",
            subtitle: "Intelligent Document Learning System",
            description: "An AI-powered document learning system that transforms PDF learning through AI-powered QA, vector search, and knowledge graphs.",
            technologies: ["Python", "Streamlit", "FAISS", "AI/LLM", "OCR"],
            github: "#",
        },
        {
            id: "ppe-checker",
            title: "Smart PPE Compliance Checker",
            description: "Real-time computer vision system that detects PPE compliance using YOLOv9 and behavior analysis.",
            technologies: ["Python", "YOLOv9", "OpenCV", "MediaPipe", "Streamlit"],
            github: "#",
        },
        {
            id: "openideax",
            title: "OpenIdeaX",
            subtitle: "AI Powered Open Innovation Platform",
            description: "AI-driven platform enabling collaborative innovation for solving global challenges.",
            technologies: ["Next.js", "TypeScript", "GPT-4 Turbo", "TailwindCSS", "Node.js"],
            github: "#",
        },
    ],
    education: [
        {
            degree: "B.Tech – Information Technology",
            institution: "Vignan Institute of Technology & Science",
            duration: "2023 – 2027",
            cgpa: "7.23",
        },
    ],
    leadership: [
        { role: "Vice-President", organization: "NextGen Innovators Club" },
        { role: "Organizer", organization: "SpeakEasy Club" },
        { role: "Community Outreach", organization: "Algorand Algobharat VITS" },
        { role: "Member of IIC Council", organization: "Vignan Institute of Technology & Science" },
    ],
};

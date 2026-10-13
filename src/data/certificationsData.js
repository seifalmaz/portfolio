// Certificate document assets (optimized WebP with high-fidelity visual clarity)
import certificateDepiMl from "../assets/certificates/certificate-depi-ml.webp";
import certificateDepiAnalytics from "../assets/certificates/certificate-depi-analytics.webp";
import certificateBanque from "../assets/certificates/certificate-banque-du-caire.webp";
import certificateCib from "../assets/certificates/certificate-cib.webp";

export const certificationsData = [
  {
    id: "depi-microsoft-ml",
    title: "Microsoft Machine Learning Specialist",
    issuer: "Digital Egypt Pioneers Initiative (DEPI) & Microsoft",
    date: "Jul 2026",
    credentialId: "DEPI-MSFT-ML-2026",
    verifyUrl: null, // Verified via verified document image
    image: certificateDepiMl,
    category: "AI & Machine Learning",
    featured: true,
    skills: ["Deep Learning", "Azure AI", "MLOps", "PyTorch", "Computer Vision", "NLP"]
  },
  {
    id: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google & Coursera (via DEPI)",
    date: "May 2025",
    credentialId: "GOOGLE-DA-2025-DEPI",
    verifyUrl: null, // Verified via verified document image
    image: certificateDepiAnalytics,
    category: "Data Analytics",
    featured: true,
    skills: ["Data Analysis", "SQL", "Power BI", "Tableau", "Python", "R", "Spreadsheets"]
  },
  {
    id: "banque-du-caire-data-eng",
    title: "Data Engineering Internship Certificate",
    issuer: "Banque du Caire",
    date: "Aug 2025",
    credentialId: "BDC-DE-INTERN-2025",
    verifyUrl: null,
    image: certificateBanque,
    category: "Data Engineering",
    featured: true,
    skills: ["ETL Pipelines", "SQL", "Informatica PowerCenter", "Data Warehousing", "Oracle DB"]
  },
  {
    id: "cib-financial-analytics",
    title: "Banking & Financial Data Trainee Certificate",
    issuer: "Commercial International Bank (CIB Egypt)",
    date: "Aug 2025",
    credentialId: "CIB-TRAINEE-2025",
    verifyUrl: null,
    image: certificateCib,
    category: "Financial Analytics",
    featured: true,
    skills: ["Financial Modeling", "Banking Operations", "SQL", "Excel", "Data Analytics"]
  },
  {
    id: "mos-powerpoint-2016",
    title: "Microsoft Office Specialist: PowerPoint Office 2016",
    issuer: "Microsoft",
    date: "Verified Credential",
    credentialId: null,
    verifyUrl: null,
    image: null,
    category: "Professional",
    featured: false,
    skills: ["Presentation Design", "Executive Storytelling", "Visual Communication", "Data Reporting"]
  },
  {
    id: "ibm-cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    date: "Professional Coursework",
    credentialId: null,
    verifyUrl: null,
    image: null,
    category: "Systems & Security",
    featured: false,
    skills: ["Cybersecurity", "Information Security", "Network Defense", "Threat Intelligence"]
  },
  {
    id: "duke-machine-learning",
    title: "Machine Learning Foundations Coursework",
    issuer: "Duke University",
    date: "Academic Coursework",
    credentialId: null,
    verifyUrl: null,
    image: null,
    category: "AI & Machine Learning",
    featured: false,
    skills: ["Machine Learning", "Supervised Learning", "Statistical Inference", "Optimization"]
  },
  {
    id: "icpc-community",
    title: "ICPC Competitive Programming Certificate",
    issuer: "ICPC Community • Helwan National University",
    date: "Jul 2025",
    credentialId: "ICPC-HNU-2025",
    verifyUrl: null,
    image: null,
    category: "Algorithms & Problem Solving",
    featured: false,
    skills: ["Algorithms", "Data Structures", "C++", "Optimization", "Problem Solving"]
  }
];

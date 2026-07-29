import depiLogo from "../assets/experience/depi.png";
import banqueLogo from "../assets/experience/banque-du-caire.png";
import icpcLogo from "../assets/experience/icpc.png";

export const experienceData = [
  {
    id: "depi-ml",
    logo: depiLogo,
    type: "Professional Program",
    role: "Microsoft Machine Learning Trainee",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Nov 2025 – Jul 2026",
    location: "Cairo, Egypt",
    description:
      "Completed an intensive Microsoft Machine Learning track covering Deep Learning, Computer Vision, NLP, MLOps, and Azure AI while building end-to-end machine learning solutions from data preparation to cloud deployment.",
    highlights: [
      "Trained neural networks using PyTorch for Computer Vision and Natural Language Processing tasks.",
      "Leveraged Azure AI services and MLflow for experiment tracking and model deployment.",
      "Developed automated feature engineering and evaluation pipelines."
    ],
    technologies: ["Python", "PyTorch", "Azure AI", "MLflow", "Hugging Face", "Scikit-Learn"]
  },
  {
    id: "banque-du-caire",
    logo: banqueLogo,
    type: "Internship",
    role: "Data Engineering Intern",
    organization: "Banque du Caire",
    period: "Jul 2025 – Aug 2025",
    location: "Cairo, Egypt",
    description:
      "Worked on enterprise ETL pipelines using SQL and Informatica PowerCenter, improving data quality and supporting banking data integration workflows.",
    highlights: [
      "Optimized complex SQL queries and database views for banking analytical systems.",
      "Engineered automated ETL mappings using Informatica PowerCenter.",
      "Parsed XML and structured banking transaction files into relational staging databases."
    ],
    technologies: ["SQL", "Informatica", "ETL", "XML", "Oracle DB", "Data Warehousing"]
  },
  {
    id: "cib-internship",
    logo: banqueLogo, // Fallback icon/logo for CIB
    type: "Internship",
    role: "Commercial International Bank Trainee",
    organization: "CIB Egypt",
    period: "Jul 2025 – Aug 2025",
    location: "Cairo, Egypt",
    description:
      "Gained practical exposure to financial data analytics, banking operational workflows, and decision support systems.",
    highlights: [
      "Analyzed customer banking behavior patterns for retail banking reporting.",
      "Collaborated with cross-functional banking teams to present data insight summaries."
    ],
    technologies: ["Data Analytics", "Financial Modeling", "Excel", "SQL"]
  },
  {
    id: "depi-analytics",
    logo: depiLogo,
    type: "Professional Program",
    role: "Google Data Analytics Trainee",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Oct 2024 – Jun 2025",
    location: "Cairo, Egypt",
    description:
      "Designed interactive Power BI dashboards and automated ETL workflows using Python and SQL to generate actionable business insights from real-world datasets.",
    highlights: [
      "Crafted multi-page executive dashboards in Power BI with complex DAX measures.",
      "Built automated data cleaning scripts in Python (Pandas/NumPy) reducing data processing time by 40%.",
      "Performed exploratory data analysis (EDA) and cohort retention modeling."
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "SQL", "Power BI", "Tableau", "DAX"]
  },
  {
    id: "icpc-mentor",
    logo: icpcLogo,
    type: "Mentorship",
    role: "ICPC Programming Mentor",
    organization: "ICPC Community • Helwan National University",
    period: "Feb 2025 – Jul 2025",
    location: "Helwan, Egypt",
    description:
      "Mentored 50+ university students in advanced algorithms, data structures, and competitive programming to prepare them for regional ICPC contests.",
    highlights: [
      "Designed weekly problem sets and held live code walk-through sessions on graph algorithms and dynamic programming.",
      "Coached student teams on time complexity analysis and optimal problem-solving techniques."
    ],
    technologies: ["C++", "Python", "Algorithms", "Data Structures", "Problem Solving"]
  }
];

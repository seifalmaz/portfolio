export const projectsData = [
  {
    id: "customer-churn",
    slug: "customer-churn",
    title: "Customer Churn Analytics & Prediction",
    subtitle: "Predictive Machine Learning & Power BI Executive Dashboard",
    category: "Machine Learning & AI",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tagline: "Reduced predicted customer attrition by 18% through automated risk scoring and interactive BI dashboards.",
    keyMetrics: [
      { label: "Model Accuracy", value: "94.2%" },
      { label: "ROC-AUC Score", value: "0.91" },
      { label: "Processing Speed", value: "< 50ms" },
      { label: "Data Volume", value: "100K+ Records" }
    ],
    techStack: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Power BI", "SQL", "Flask"],
    githubUrl: "https://github.com/seifalmaz/customer-churn-prediction",
    liveDemoUrl: "https://powerbi.microsoft.com",
    businessProblem: "Telecommunication and banking enterprises face significant revenue loss due to customer churn. Identifying high-risk customers prior to cancellation allows marketing teams to deploy targeted retention campaigns proactively.",
    objectives: [
      "Analyze historical customer behavioral data to identify primary churn drivers.",
      "Develop and evaluate machine learning models (Logistic Regression, Random Forest, XGBoost).",
      "Deploy an automated inference pipeline that generates individual customer risk scores.",
      "Build an interactive Power BI executive dashboard for churn monitoring."
    ],
    datasetDescription: "Dataset consisting of over 100,000 anonymized customer account profiles, including contract duration, monthly charges, customer service interaction logs, payment methods, and historical churn labels.",
    architecture: "Data was extracted from SQL relational databases, cleaned and transformed using Pandas and Scikit-Learn pipelines, evaluated via XGBoost cross-validation, and fed into Power BI via automated Python scripts.",
    developmentProcess: [
      "Exploratory Data Analysis (EDA) to uncover churn correlations with contract length and service ticket counts.",
      "Data preprocessing including one-hot encoding, SMOTE oversampling for class imbalance, and MinMax scaling.",
      "Model training and hyperparameter tuning using GridSearch cross-validation.",
      "Power BI report engineering featuring DAX measures, dynamic filtering, and churn risk segmentation."
    ],
    keyFeatures: [
      "Predictive Churn Risk Engine scoring customers on a 0-100% scale.",
      "Interactive Power BI Dashboard with churn breakdown by tenure, contract type, and revenue contribution.",
      "Automated feature importance ranking identifying key friction points.",
      "What-If analysis scenario simulator for retention discount strategies."
    ],
    challengesAndSolutions: [
      {
        challenge: "Severe class imbalance (only 14% of historical customers churned).",
        solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) combined with hyperparameter scale_pos_weight tuning in XGBoost, raising recall from 62% to 89%."
      },
      {
        challenge: "Missing service ticket interaction history in raw CSV files.",
        solution: "Wrote SQL window functions to aggregate call logs and compute average resolution times per account prior to model training."
      }
    ],
    resultsAndImpact: [
      "Achieved 94.2% test accuracy and an 0.91 ROC-AUC score.",
      "Identified top 3 churn indicators: short-term monthly contracts, fiber optic service outages, and high support call frequency.",
      "Provided actionable insights enabling proactive retention offers that reduced estimated churn rate by 18%."
    ],
    lessonsLearned: [
      "Feature engineering (e.g., calculating charge-to-tenure ratios) improved model accuracy more than complex model architectures.",
      "Translating ML probability outputs into clear business risk tiers (Low, Medium, High) makes reports drastically more useful for non-technical stakeholders."
    ]
  },
  {
    id: "gesture-recognition",
    slug: "gesture-recognition",
    title: "Real-Time Computer Vision Gesture Recognition",
    subtitle: "Deep Learning & OpenCV Touchless Control Pipeline",
    category: "Machine Learning & AI",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tagline: "Real-time hand gesture tracking operating at 60 FPS using MobileNetV2 and MediaPipe.",
    keyMetrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Classification Accuracy", value: "97.8%" },
      { label: "Inference Latency", value: "14ms" },
      { label: "Gesture Classes", value: "10 Actions" }
    ],
    techStack: ["Python", "PyTorch", "OpenCV", "MediaPipe", "NumPy", "MobileNetV2"],
    githubUrl: "https://github.com/seifalmaz/realtime-gesture-recognition",
    liveDemoUrl: null,
    businessProblem: "Touchless human-computer interaction (HCI) is essential in sterile medical environments, industrial automation, and smart home appliances where physical touch is unhygienic or impractical.",
    objectives: [
      "Build a lightweight computer vision pipeline capable of running on edge devices at high frame rates.",
      "Train a deep neural network to classify complex dynamic hand poses in varying lighting conditions.",
      "Implement real-time desktop automation triggers based on detected gesture actions."
    ],
    datasetDescription: "Custom collected dataset of 15,000 annotated hand landmark frames across 10 gesture categories (swipe left/right, pinch zoom, volume dial, fist, palm, peace, ok), captured under diverse lighting and background conditions.",
    architecture: "OpenCV feeds webcam video frames to MediaPipe Hands for 21-point 3D landmark localization. Extracted spatial coordinates are processed by a lightweight PyTorch neural network for gesture classification.",
    developmentProcess: [
      "Data collection and image normalization pipeline built using OpenCV.",
      "Extraction of normalized (x, y, z) 3D landmark coordinates to make the model invariant to hand distance and screen scale.",
      "Neural network architecture optimization using PyTorch (MobileNetV2 backbone).",
      "Integration with OS-level virtual keypress automation for touchless control."
    ],
    keyFeatures: [
      "Real-time 60 FPS video inference with sub-15ms latency.",
      "Scale and lighting invariant tracking using 3D spatial hand skeleton coordinates.",
      "Smooth gesture smoothing algorithm preventing erratic trigger flickering.",
      "Modular event emitter mapping gestures to custom desktop hotkeys."
    ],
    challengesAndSolutions: [
      {
        challenge: "Varying lighting conditions and skin tones caused raw image CNNs to fail.",
        solution: "Pivoted from raw RGB pixel classification to 3D coordinate landmark vector mapping using MediaPipe, rendering model 100% lighting agnostic."
      },
      {
        challenge: "High inference latency when running heavy convolutional networks on standard CPU.",
        solution: "Quantized PyTorch model weights to INT8 and optimized coordinate matrix math, boosting speed from 18 FPS to 60 FPS."
      }
    ],
    resultsAndImpact: [
      "Achieved 97.8% classification accuracy across 10 distinct gestures.",
      "Demonstrated smooth touchless media control and slide navigation during live technical presentations."
    ],
    lessonsLearned: [
      "Selecting the right representation (landmark coordinates vs raw pixels) dramatically reduces model size and computational footprint.",
      "Real-time applications require low-pass filtering on predictions to avoid jitter."
    ]
  },
  {
    id: "railway-dashboard",
    slug: "railway-dashboard",
    title: "National Railway Operational BI Dashboard",
    subtitle: "Enterprise Data Analytics & Power BI Performance Reporting",
    category: "Data Analytics & BI",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    tagline: "End-to-end transportation analytics dashboard tracking delay patterns across 500+ daily routes.",
    keyMetrics: [
      { label: "Routes Tracked", value: "500+" },
      { label: "ETL Processing Time", value: "-60%" },
      { label: "On-Time Metric Accuracy", value: "99.9%" },
      { label: "Monthly Passengers", value: "1.2M" }
    ],
    techStack: ["Power BI", "SQL", "DAX", "Python", "Pandas", "PostgreSQL"],
    githubUrl: "https://github.com/seifalmaz/railway-analytics-dashboard",
    liveDemoUrl: "https://powerbi.microsoft.com",
    businessProblem: "National rail networks handle millions of passengers daily. Bottlenecks, maintenance delays, and peak schedule disruptions cause revenue loss and passenger dissatisfaction without centralized operational visibility.",
    objectives: [
      "Clean and unify fragmented operational trip records from legacy database systems.",
      "Engineered automated ETL workflows in Python and SQL to clean schedule logs daily.",
      "Design a multi-tab Power BI report evaluating delay factors, route profitability, and peak demand."
    ],
    datasetDescription: "Over 500,000 historical train schedule logs spanning 2 years, including arrival/departure timestamps, station stops, passenger counts, delay causes, and maintenance records.",
    architecture: "PostgreSQL relational data warehousing -> Python ETL preprocessing -> Star Schema Data Modeling in Power BI -> Executive & Operations Dashboard Views.",
    developmentProcess: [
      "Built star-schema dimensional model with Fact_Trips, Dim_Station, Dim_Train, Dim_Date, and Dim_DelayType.",
      "Wrote 30+ custom DAX measures for On-Time Performance (OTP %), Average Delay Minutes, and Revenue per Pass-KM.",
      "Designed clean UX layout following executive reporting guidelines with dark-mode aesthetic."
    ],
    keyFeatures: [
      "Interactive Route Delays Map highlighting congestion bottlenecks in real-time.",
      "On-Time Performance (OTP %) tracker broken down by region and locomotive type.",
      "Passenger Volume Trend forecaster for peak holiday scheduling.",
      "Drill-through detail pages for individual station stationmaster reports."
    ],
    challengesAndSolutions: [
      {
        challenge: "Inconsistent timestamp formats and missing delay codes in legacy database extracts.",
        solution: "Created Python Pandas regex data cleaning pipeline that normalized timestamp formats and categorized missing codes based on threshold rules."
      },
      {
        challenge: "Slow dashboard rendering when executing complex multi-level DAX calculations over large datasets.",
        solution: "Pre-aggregated heavy metric tables in SQL views and optimized DAX formulas using CALCULATE filters, cutting load times by 75%."
      }
    ],
    resultsAndImpact: [
      "Reduced daily operational reporting compilation time from 4 hours to 10 seconds.",
      "Identified top 3 systemic delay causes, enabling schedule re-routing that improved overall on-time performance by 12%."
    ],
    lessonsLearned: [
      "Star schema dimensional modeling is critical for scalable Power BI report performance.",
      "Clear visual hierarchy and drill-through navigation elevate reports from simple charts to operational command centers."
    ]
  },
  {
    id: "spotify-dashboard",
    slug: "spotify-dashboard",
    title: "Spotify Streaming & Music Sentiment Analytics",
    subtitle: "Data Pipeline, Feature Engineering & Tableau Dashboard",
    category: "Data Engineering",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f749f7b9c?auto=format&fit=crop&w=1200&q=80",
    tagline: "Automated music audio feature analysis and trend forecasting dashboard.",
    keyMetrics: [
      { label: "Songs Analyzed", value: "50,000+" },
      { label: "Audio Features", value: "12 Signals" },
      { label: "Update Frequency", value: "Daily Pipeline" },
      { label: "Genre Clusters", value: "25 Categories" }
    ],
    techStack: ["Python", "Spotify Web API", "Pandas", "PostgreSQL", "Tableau", "Spotipy"],
    githubUrl: "https://github.com/seifalmaz/spotify-music-analytics",
    liveDemoUrl: null,
    businessProblem: "Music streaming platforms and record labels require deep insights into evolving listener audio preferences (valence, danceability, energy, acousticness) to curate hit playlists and target artist marketing.",
    objectives: [
      "Automate data extraction from Spotify Web API for global viral top charts.",
      "Store structured song audio features in PostgreSQL database.",
      "Perform sentiment analysis and cluster audio attributes to track listener mood shifts over time."
    ],
    datasetDescription: "50,000+ tracks extracted via Spotify API containing audio feature vectors (danceability, energy, loudness, speechiness, valence, tempo, acousticness) coupled with streaming popularity metrics.",
    architecture: "Python Spotipy Script -> PostgreSQL Data Store -> Exploratory Feature Analysis -> Tableau Public Dashboard.",
    developmentProcess: [
      "Engineered automated Python API extraction pipeline using OAuth authentication.",
      "Transformed raw JSON payloads into clean relational tables in PostgreSQL.",
      "Created audio feature correlation matrices analyzing mood shifts across musical genres.",
      "Built interactive Tableau dashboard showcasing top artist rankings and audio profile radars."
    ],
    keyFeatures: [
      "Audio Profile Radar Chart comparing valence, danceability, and energy across genres.",
      "Popularity Prediction Feature Correlation matrix.",
      "Genre Trend Timeline showcasing seasonal shifts in acoustic vs high-energy music."
    ],
    challengesAndSolutions: [
      {
        challenge: "Spotify API rate limits when requesting audio features for tens of thousands of tracks.",
        solution: "Implemented batching and exponential backoff retry logic in Python, ensuring 100% reliable extraction."
      }
    ],
    resultsAndImpact: [
      "Successfully cataloged 50,000+ tracks into a structured analytical database.",
      "Identified clear statistical correlation between track valence (positivity) and summer streaming spikes."
    ],
    lessonsLearned: [
      "Robust error handling and rate limit management are mandatory when building API-driven data engineering pipelines."
    ]
  },
  {
    id: "portfolio",
    slug: "portfolio",
    title: "High-Performance Hybrid Developer Portfolio",
    subtitle: "Production-Grade React 19, Vite & Tailwind CSS Architecture",
    category: "Software Engineering",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Scalable hybrid architecture blending dynamic landing pages with full technical case study detail views.",
    keyMetrics: [
      { label: "Performance Score", value: "98 / 100" },
      { label: "Framework", value: "React 19" },
      { label: "CSS Engine", value: "Tailwind v4" },
      { label: "Routes", value: "Multi-Route" }
    ],
    techStack: ["React 19", "Vite 8", "Tailwind CSS v4", "React Router", "Framer Motion"],
    githubUrl: "https://github.com/seifalmaz/portfolio",
    liveDemoUrl: "https://seifalmaz.dev",
    businessProblem: "Standard single-page portfolio templates lack depth for technical recruiters wanting full project breakdowns, architecture diagrams, and metric validations.",
    objectives: [
      "Design a scalable multi-route application with reusable data abstractions.",
      "Maintain a sleek, dark-mode glassmorphic aesthetic with fluid micro-interactions.",
      "Ensure 100% responsiveness and top-tier Lighthouse scores."
    ],
    datasetDescription: "Structured JavaScript data modules holding personal background, skills matrices, timeline history, and detailed project case study schemas.",
    architecture: "Vite 8 React SPA with React Router v7 -> Centralized Data Layer -> Atomic UI Component System -> Glassmorphic Tailwind v4 Styling Engine.",
    developmentProcess: [
      "Architected clean component hierarchy dividing layout, UI primitives, section views, and case study detail views.",
      "Configured Tailwind CSS v4 CSS-first system with custom glassmorphism utilities.",
      "Integrated Framer Motion for scroll-triggered section animations and smooth text transitions.",
      "Built dynamic route parameter loader for deep-link case study pages (/projects/:slug)."
    ],
    keyFeatures: [
      "Hybrid Multi-Route Navigation (Home, All Projects, Case Studies).",
      "Dynamic Search & Category Filtering across technical project catalog.",
      "Interactive Case Study template with problem, architecture, metrics, and code links.",
      "Responsive Glassmorphic Navigation with desktop & mobile drawer menus."
    ],
    challengesAndSolutions: [
      {
        challenge: "Ensuring smooth page scroll reset when switching between deep project detail routes.",
        solution: "Created custom ScrollToTop component listening to React Router location changes."
      }
    ],
    resultsAndImpact: [
      "Delivered a production-ready, highly extensible developer portfolio score-carded at top-tier industry aesthetics."
    ],
    lessonsLearned: [
      "Decoupling content from layout components enables adding new projects in under 10 minutes."
    ]
  }
];

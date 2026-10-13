
/**
 * =========================================================================================
 * CASE STUDY DATA ARCHITECTURE SCHEMA & CANONICAL SPECIFICATION
 * =========================================================================================
 * 
 * Canonical data file supplying all project information to the portfolio catalog and deep-dive case studies.
 * 100% verified against active GitHub repositories:
 * 1. UK Railway Analytics (https://github.com/seifalmaz/Railway_Data_System)
 * 2. Spotify Analytics Dashboard (https://github.com/seifalmaz/spotify-analytics-dashboard)
 * 3. Waste Classifier — Intelligent Recycling System (https://github.com/seifalmaz/waste-classifier)
 * 4. Hand Gesture Classification & Explainable AI (https://github.com/seifalmaz/gesture-recognition)
 * =========================================================================================
 */

// Local Visual Assets - UK Railway Analytics
import railwayPowerBiOverview from "../assets/projects/railway-dashboard/powerbi_network_revenue.png";
import railwayPowerBiReliability from "../assets/projects/railway-dashboard/powerbi_service_reliability.png";
import railwayArchitecture from "../assets/projects/railway-dashboard/architecture.webp";
import railwayStarSchema from "../assets/projects/railway-dashboard/star_schema.jpg";

// Local Visual Assets - Spotify Analytics Dashboard
import spotifyComparison from "../assets/projects/spotify-dashboard/comparison.png";
import spotifyAdvanced from "../assets/projects/spotify-dashboard/advanced_comparison.png";
import spotifyRelationship from "../assets/projects/spotify-dashboard/relationship.webp";
import spotifyDistribution from "../assets/projects/spotify-dashboard/distribution.png";
import spotifyTrends from "../assets/projects/spotify-dashboard/trends.png";

// Local Visual Assets - Waste Classifier
import wasteModelsComparison from "../assets/projects/waste-classifier/models_comparison.png";
import wasteVitAttention from "../assets/projects/waste-classifier/vit_attention_rollout.webp";
import wasteConfusionMatrices from "../assets/projects/waste-classifier/confusion_matrices.png";
import wasteTrainingCurves from "../assets/projects/waste-classifier/training_curves.webp";
import wasteF1Heatmap from "../assets/projects/waste-classifier/f1_heatmap.png";

// Local Visual Assets - Hand Gesture Recognition
import gestureDemo1 from "../assets/projects/gesture-recognition/gesture-recognition-demo-1.webp";
import gestureDemo2 from "../assets/projects/gesture-recognition/gesture-recognition-demo-2.webp";

export const projectsData = [
  // =======================================================================================
  // PROJECT 1: UK Railway Analytics — End-to-End Data Analytics & Business Intelligence
  // =======================================================================================
  {
    /* --- 1. Core Identification --- */
    id: "railway-dashboard",
    slug: "railway-dashboard",
    title: "UK Railway Analytics — End-to-End Data Analytics & Business Intelligence",
    subtitle: "Enterprise Medallion Architecture (Oracle SQL), Star Schema & Power BI Executive Dashboards",
    category: "Data Analytics · Business Intelligence · Data Engineering",
    featured: true,
    timeline: "Jan 2024 – Apr 2024",
    role: "Data Analytics & BI Engineer",
    team: "Seif Ahmed",

    /* --- 2. Visual Artifacts (Verified Real Power BI Screenshots & Architecture) --- */
    thumbnail: railwayPowerBiOverview,
    gallery: [
      {
        url: railwayPowerBiOverview,
        caption: "Network & Revenue Overview — Power BI Dashboard",
        description: "Executive-level reporting displaying £741.92K gross ticket revenue, 31,653 transactions, 19,871 unique journeys, 90.68% on-time performance, revenue trends, status distribution, and station cancellation concentrations."
      },
      {
        url: railwayPowerBiReliability,
        caption: "Service Reliability & Delay Analysis — Power BI Dashboard",
        description: "Deep dive into 1,062 delayed journeys (5.34%), 790 cancellations (3.98%), £45.46K in revenue associated with cancelled journeys, delay causes (Weather, Technical, Staffing, Signal), monthly delay trends, and departure-hour bottlenecks."
      },
      {
        url: railwayArchitecture,
        caption: "Medallion Architecture Pipeline (Bronze → Silver → Gold)",
        description: "Layered data engineering pipeline in Oracle SQL schema SEIF routing raw CSV logs into Bronze staging, Silver validation and cleansing, and Gold dimensional star schema."
      },
      {
        url: railwayStarSchema,
        caption: "Dimensional Star Schema Model Blueprint",
        description: "Relational dimensional blueprint centering FACT_RAILWAY around 6 dimension tables: DIM_DATE, DIM_TIME, DIM_STATION, DIM_JOURNEY, DIM_PAYMENT, and DIM_TICKET with role-playing dimensions."
      }
    ],

    /* --- 3. Overview & Problem Context --- */
    tagline: "An end-to-end railway analytics project that transforms UK railway transaction data through Python data preparation and Oracle SQL Bronze/Silver/Gold layers into an analytical star schema, delivering interactive Power BI dashboards for revenue, service reliability, delays, cancellations, and station performance.",
    businessProblem: "UK national railway passenger networks process tens of thousands of complex trip records, schedule variations, delay incidents, and refund claims across dozens of inter-city stations. Without a structured analytical data warehouse, raw transaction logs create operational blind spots regarding systemic delay causes, punctuality discrepancies, station bottlenecks, and commercial exposure from cancelled train services. The objective of this project is to turn fragmented railway transaction data into reliable operational and commercial intelligence for decision-makers.",
    objectives: [
      "Load and audit raw UK railway transaction datasets using Python to eliminate duplicates and standardize schemas.",
      "Implement a robust multi-tiered Medallion data architecture (Bronze, Silver, Gold) in Oracle Database (Schema SEIF).",
      "Model an enterprise Gold Star Schema distinguishing passenger transaction grain from unique train journey grain.",
      "Deploy role-playing dimensions for date, time, and station attributes to support multi-faceted temporal and spatial analysis.",
      "Create high-performance analytical SQL views (VW_RAILWAY_ANALYSIS) optimized for downstream BI consumption.",
      "Design interactive, recruiter-ready Power BI executive dashboards featuring custom DAX measures for punctuality, revenue, and delay root-cause analysis."
    ],

    /* --- 4. Architecture & Pipeline --- */
    techStack: [
      "Python",
      "Oracle Database",
      "SQL",
      "ETL",
      "Dimensional Modeling",
      "Power BI",
      "DAX",
      "Git and GitHub"
    ],
    architecture: "The analytical data platform follows a 3-tier Medallion architecture implemented in Oracle Database under schema SEIF. Raw ticket logs are audited and cleansed in Python (Pandas) before bulk staging into the Bronze layer (BRONZE_RAILWAY). The Silver layer (SILVER_RAILWAY) standardizes timestamps, casts SQL datatypes, validates station names against ODbL geospatial coordinates, and preserves categorical unknowns. The Gold layer transforms cleaned records into an analytical Star Schema centered around FACT_RAILWAY (31,653 rows) and 6 dimension tables (DIM_DATE, DIM_TIME, DIM_STATION, DIM_JOURNEY, DIM_PAYMENT, DIM_TICKET). A denormalized analytical view (VW_RAILWAY_ANALYSIS) feeds an interactive Power BI semantic model featuring role-playing dimensions and custom DAX measures.",
    pipeline: [
      {
        title: "1. CSV Ingestion & Inspection",
        description: "Ingested raw UK railway transactions dataset, auditing record distributions, schema datatypes, and missing values.",
        tech: "Python / Pandas"
      },
      {
        title: "2. Python Cleaning & Validation",
        description: "Removed duplicate records (yielding 41,176 cleaned records), parsed scheduled vs actual timestamps, engineered duration and delay metrics, and preserved unknown categoricals.",
        tech: "Python / Pandas / NumPy"
      },
      {
        title: "3. Oracle Bronze Staging Layer",
        description: "Created BRONZE_RAILWAY staging table in Oracle SQL under schema SEIF, loading raw data using bulk insert procedures.",
        tech: "Oracle SQL (Bronze DDL)"
      },
      {
        title: "4. Oracle Silver Standardization Layer",
        description: "Created SILVER_RAILWAY with strict SQL datatypes (DATE, TIMESTAMP), standardized station names, and data integrity constraints.",
        tech: "Oracle SQL (Silver DDL)"
      },
      {
        title: "5. Gold Dimensional Star Schema",
        description: "Designed Gold schema with surrogate keys, populating 6 dimension tables (145 dates, 1,440 times, 32 stations, 19,871 journeys, 6 payments, 24 tickets) and FACT_RAILWAY (31,653 rows).",
        tech: "Oracle SQL (Gold DDL & Stored Procedures)"
      },
      {
        title: "6. Analytical SQL View",
        description: "Built VW_RAILWAY_ANALYSIS denormalizing surrogate dimensions and fact metrics into a unified view for high-throughput query execution.",
        tech: "Oracle SQL View"
      },
      {
        title: "7. Power BI Semantic Model & Dashboards",
        description: "Connected analytical model to Power BI Desktop, modeled role-playing relationships (Purchase Date vs Journey Date, Departure vs Arrival), and authored DAX measures for punctuality and financial tracking.",
        tech: "Power BI / DAX"
      }
    ],

    /* --- 5. Data & Quantitative Metrics --- */
    datasetDescription: "Historical UK railway transaction data covering travel between January 1, 2024, and April 30, 2024 (with ticket purchases spanning December 8, 2023, through April 30, 2024) across 32 inter-city stations in Great Britain. The final fact table contains 31,653 transaction rows, consolidated into 19,871 unique train journeys.",
    keyMetrics: [
      { label: "Total Revenue", value: "£741.92K" },
      { label: "Transactions Processed", value: "31,653" },
      { label: "Unique Journeys", value: "19,871" },
      { label: "On-Time Reliability", value: "90.68%" }
    ],
    metricsDeepDive: [
      {
        label: "Total Revenue",
        value: "£741.92K",
        detail: "Gross ticket sales (£741,921) across 31,653 transaction records, evaluated at the transaction grain across Advance, Off-Peak, and Anytime purchases."
      },
      {
        label: "Total Transactions",
        value: "31,653",
        detail: "Total individual ticket purchase transactions processed in the analytical fact table (FACT_RAILWAY)."
      },
      {
        label: "Total Unique Journeys",
        value: "19,871",
        detail: "Distinct scheduled train runs identified by composite natural key: (Date of Journey, Departure Time, Departure Station, Arrival Station)."
      },
      {
        label: "On-Time Percentage",
        value: "90.68%",
        detail: "18,019 out of 19,871 unique scheduled train journeys arrived strictly on time at their destination, calculated at the distinct journey grain."
      },
      {
        label: "Actual Delay Rate",
        value: "5.27%",
        detail: "1,048 journeys exhibited strictly positive measured arrival delay (> 0 minutes). Distinct from the 5.34% operational delay status flag because 14 services recovered schedule buffer en route."
      },
      {
        label: "Cancellation Rate",
        value: "3.98%",
        detail: "790 scheduled train services were cancelled across the network, heavily concentrated at major termini including London Paddington (137) and Manchester Piccadilly (127)."
      },
      {
        label: "Average Journey Delay",
        value: "2.10 min",
        detail: "Mean arrival delay across all 19,871 scheduled journeys. Monthly averages varied from 1.85 min in April (best) to 2.37 min in March (annual peak)."
      },
      {
        label: "Cancelled Ticket Value",
        value: "£45.46K",
        detail: "Gross ticket revenue (£45,456 across 1,880 tickets) booked on services that were subsequently cancelled. Note: Represents booked ticket value on cancelled runs, not confirmed operator financial loss."
      },
      {
        label: "Refund Request Rate",
        value: "3.53%",
        detail: "1,118 out of 31,653 passenger transactions submitted formal refund claims following service disruption or cancellation."
      }
    ],

    /* --- 6. Code & Implementation Artifacts --- */
    codeSnippets: [
      {
        title: "Gold Layer — FACT_RAILWAY & Dimensional Star Schema DDL",
        language: "sql",
        description: "Oracle SQL DDL creating the centralized transaction fact table linking to 6 dimension tables with foreign key constraints in schema SEIF.",
        code: `CREATE TABLE SEIF.FACT_RAILWAY (
    transaction_id         VARCHAR2(50) PRIMARY KEY,
    ticket_id              NUMBER NOT NULL,
    payment_id             NUMBER NOT NULL,
    departure_station_id   NUMBER NOT NULL,
    arrival_station_id     NUMBER NOT NULL,
    journey_id             NUMBER NOT NULL,
    price                  NUMBER(10,2) NOT NULL,
    purchase_date_id       NUMBER NOT NULL,
    journey_date_id        NUMBER NOT NULL,
    purchase_time_id       NUMBER NOT NULL,
    departure_time_id      NUMBER NOT NULL,
    arrival_time_id        NUMBER NOT NULL,
    actual_arrival_time_id NUMBER,
    refund_request         VARCHAR2(20),
    scheduled_duration_min NUMBER(8,2),
    actual_duration_min    NUMBER(8,2),
    arrival_delay_min      NUMBER(8,2) DEFAULT 0,
    is_actually_delayed    NUMBER(1) DEFAULT 0,
    delay_category         VARCHAR2(50),
    CONSTRAINT fk_fact_ticket    FOREIGN KEY (ticket_id) REFERENCES SEIF.DIM_TICKET(ticket_id),
    CONSTRAINT fk_fact_payment   FOREIGN KEY (payment_id) REFERENCES SEIF.DIM_PAYMENT(payment_id),
    CONSTRAINT fk_fact_dep_stn   FOREIGN KEY (departure_station_id) REFERENCES SEIF.DIM_STATION(station_id),
    CONSTRAINT fk_fact_arr_stn   FOREIGN KEY (arrival_station_id) REFERENCES SEIF.DIM_STATION(station_id),
    CONSTRAINT fk_fact_journey   FOREIGN KEY (journey_id) REFERENCES SEIF.DIM_JOURNEY(journey_id),
    CONSTRAINT fk_fact_pur_date  FOREIGN KEY (purchase_date_id) REFERENCES SEIF.DIM_DATE(date_id),
    CONSTRAINT fk_fact_jrn_date  FOREIGN KEY (journey_date_id) REFERENCES SEIF.DIM_DATE(date_id)
);`
      },
      {
        title: "Analytical View — VW_RAILWAY_ANALYSIS for Power BI Reporting",
        language: "sql",
        description: "Denormalized analytical view in Oracle SQL unifying fact metrics and role-playing dimensions for high-throughput reporting queries.",
        code: `CREATE OR REPLACE VIEW SEIF.VW_RAILWAY_ANALYSIS AS
SELECT 
    f.transaction_id,
    f.price,
    f.refund_request,
    f.scheduled_duration_min,
    f.actual_duration_min,
    f.arrival_delay_min,
    f.is_actually_delayed,
    f.delay_category,
    -- Role-Playing Dates
    dp.full_date AS purchase_date,
    dj.full_date AS journey_date,
    dj.year AS journey_year,
    dj.month AS journey_month,
    dj.weekday AS journey_weekday,
    -- Stations
    ds_dep.station AS departure_station,
    ds_arr.station AS arrival_station,
    -- Journey & Disruption
    j.journey_status,
    j.reason_for_delay,
    -- Ticket & Payment
    t.ticket_type,
    t.ticket_class,
    t.railcard,
    p.purchase_type,
    p.payment_method
FROM SEIF.FACT_RAILWAY f
JOIN SEIF.DIM_DATE dp ON f.purchase_date_id = dp.date_id
JOIN SEIF.DIM_DATE dj ON f.journey_date_id = dj.date_id
JOIN SEIF.DIM_STATION ds_dep ON f.departure_station_id = ds_dep.station_id
JOIN SEIF.DIM_STATION ds_arr ON f.arrival_station_id = ds_arr.station_id
JOIN SEIF.DIM_JOURNEY j ON f.journey_id = j.journey_id
JOIN SEIF.DIM_TICKET t ON f.ticket_id = t.ticket_id
JOIN SEIF.DIM_PAYMENT p ON f.payment_id = p.payment_id;`
      },
      {
        title: "DAX Measures — On-Time Rate & Unique Journey Calculations",
        language: "dax",
        description: "Custom DAX measures separating transaction-level revenue aggregates from distinct journey-level operational punctuality.",
        code: `-- Total Revenue (Transaction Grain)
Total Revenue = SUM(FACT_RAILWAY[price])

-- Distinct Scheduled Journeys Count
Total Unique Journeys = 
DISTINCTCOUNTNOBLANK(FACT_RAILWAY[journey_natural_key])

-- On-Time Punctuality Percentage (Journey Grain)
On-Time Percentage = 
VAR OnTimeJourneys = 
    CALCULATE(
        DISTINCTCOUNT(FACT_RAILWAY[journey_natural_key]),
        FACT_RAILWAY[journey_status] = "On Time"
    )
VAR TotalJourneys = [Total Unique Journeys]
RETURN
    DIVIDE(OnTimeJourneys, TotalJourneys, 0)

-- Actual Delay Rate (Positive arrival delay > 0 minutes)
Actual Delay Rate = 
VAR DelayedJourneys = 
    CALCULATE(
        DISTINCTCOUNT(FACT_RAILWAY[journey_natural_key]),
        FACT_RAILWAY[is_actually_delayed] = 1
    )
RETURN
    DIVIDE(DelayedJourneys, [Total Unique Journeys], 0)`
      }
    ],
    methodology: "The data engineering workflow follows a strict Medallion architecture (Bronze staging, Silver cleansing, and Gold dimensional modeling) implemented in Oracle Database under schema SEIF. Raw ticket logs were cleansed using Python (Pandas), establishing surrogate keys and separating transaction-level billing records from distinct journey-level service runs. Station coordinates were joined via open ODbL station datasets. An analytical SQL view (VW_RAILWAY_ANALYSIS) was deployed to Power BI, with role-playing dimensions and custom DAX measures ensuring correct analytical grains.",
    keyFeatures: [
      "Medallion data architecture in Oracle Database (Schema SEIF) separating Bronze staging, Silver cleansing, and Gold dimensional tables.",
      "Optimized Gold Star Schema centered on FACT_RAILWAY (31,653 rows) and 6 dimensions with referential integrity constraints.",
      "Strict separation of analytical grains: Transaction Grain (sales, payments, refunds) vs Unique Journey Grain (on-time rate, cancellations).",
      "Role-playing dimensions in Power BI for Date (Purchase vs Journey Date), Time (Departure vs Arrival), and Station (Origin vs Destination).",
      "Interactive 2-page Power BI dashboard with executive KPIs, route volume maps, disruption root causes, and hourly delay bottlenecks.",
      "Reconciled discrepancy between operational status delay (5.34%) and measured arrival delay (5.27%) for full audit transparency."
    ],

    /* --- 7. Outcomes, Challenges & Insights --- */
    challengesAndSolutions: [
      {
        challenge: "Separating transaction-level and journey-level metrics: Conflating passenger transactions with train services leads to distorted punctuality figures.",
        solution: "Engineered a composite natural journey key (Date of Journey + Departure Time + Departure Station + Arrival Station) consolidating 31,653 transactions into 19,871 unique train runs."
      },
      {
        challenge: "Handling role-playing dimensions across recurring date, time, and station contexts without duplicating physical database tables.",
        solution: "Designed generic DIM_DATE, DIM_TIME, and DIM_STATION tables in Oracle, establishing multiple role-playing relationships and USERELATIONSHIP DAX measures in Power BI."
      },
      {
        challenge: "Modeling operational delay status flags separately from actual measured arrival delays.",
        solution: "Identified 14 unique journeys where dispatch status was marked 'Delayed' but trains absorbed buffer and arrived on or before schedule (delay <= 0 min). Maintained both operational status and is_actually_delayed flags."
      },
      {
        challenge: "Reconciling raw transaction audit counts (41,176 cleaned records) with the analytical fact table (31,653 rows).",
        solution: "Enforced strict referential join constraints and scoped the reporting timeframe consistently across Silver and Gold transformation procedures."
      }
    ],
    businessInsights: [
      "Weather (280 delays / 26.36%) and Technical Issues (268 delays / 25.24%) are the two largest drivers of train delays across Great Britain, followed closely by Staffing shortages (245 delays / 23.07%) and Signal Failures (217 delays / 20.43%).",
      "Daily service disruption follows distinct operational surges peaking at 11:00 (196 delays) during mid-day platform turnarounds, 08:00 (180 delays) during morning commuter peak, and 17:00 (154 delays) during evening rush hour.",
      "Average journey delay exhibited clear seasonal volatility: peaking in March 2024 at 2.37 minutes due to severe storm disruptions, and achieving the best performance in April 2024 at 1.85 minutes.",
      "Journey cancellations are heavily concentrated at major transit hubs: London Paddington (137 cancellations) and Manchester Piccadilly (127 cancellations) together account for over 33% of all network cancellations.",
      "Passengers booked £45.46K in ticket value on journeys that were subsequently cancelled, but formal refund claim rates remained low at 3.53% (1,118 claims system-wide)."
    ],
    resultsAndImpact: [
      "Delivered an enterprise-grade Oracle SQL dimensional model processing 31,653 fact records and 19,871 distinct scheduled journeys with sub-second analytical query response.",
      "Provided executive transit stakeholders with clear visibility into £741.92K gross ticket revenue and 90.68% network punctuality across 32 inter-city stations.",
      "Pinpointed the exact operational root causes of 1,062 delayed journeys and station cancellation bottlenecks to guide infrastructure and staffing investments.",
      "Published two recruiter-grade Power BI dashboard pages with verified DAX calculations, geospatial mapping, and interactive slice-and-dice capabilities."
    ],
    lessonsLearned: [
      "Distinguishing transaction grain from service run grain is non-negotiable in transportation analytics; treating passenger records as train runs skews reliability reporting by over 3.8 percentage points.",
      "Role-playing dimensions dramatically simplify data warehouse maintenance while maximizing flexibility for multi-perspective BI reporting.",
      "Maintaining audit transparency between reported status classifications and physical timestamp variances builds credibility with operations and engineering leadership."
    ],
    futureImprovements: [
      "Ingest real-time streaming train movement feeds using Apache Kafka and the National Rail Darwin open API.",
      "Enrich root-cause delay models with live Met Office meteorological open weather datasets.",
      "Incorporate granular statutory Delay Repay compensation tiers (15/30/60+ minute brackets) to quantify precise operator financial liabilities.",
      "Implement automated CI/CD data quality validation pipelines using Great Expectations."
    ],

    /* --- 8. External Links --- */
    githubUrl: "https://github.com/seifalmaz/Railway_Data_System",
    liveDemoUrl: null
  },

  // =======================================================================================
  // PROJECT 2: Spotify Analytics Dashboard
  // =======================================================================================
  {
    /* --- 1. Core Identification --- */
    id: "spotify-dashboard",
    slug: "spotify-dashboard",
    title: "Spotify Analytics Dashboard",
    subtitle: "Interactive Audio Feature & Genre Analysis with Plotly Dash & Python",
    category: "Data Analytics & BI",
    featured: true,
    timeline: "May 2026",
    role: "Data Analyst & Dashboard Engineer",
    team: "Seif Ahmed",

    /* --- 2. Visual Artifacts (Verified Real Screenshots) --- */
    thumbnail: spotifyComparison,
    gallery: [
      {
        url: spotifyComparison,
        caption: "Comparison Analysis — Track Counts & Average Popularity by Genre",
        description: "Comparative horizontal bars and column charts evaluating volume and popularity benchmarks across genres."
      },
      {
        url: spotifyAdvanced,
        caption: "Advanced Comparison — Genre Cohorts per Decade & Clustered Audio Attributes",
        description: "Multi-dimensional stacked and clustered charts comparing explicit ratios and acoustic profiles across decades."
      },
      {
        url: spotifyRelationship,
        caption: "Relationship Analysis — Energy vs. Valence Mood Quadrant & Danceability",
        description: "Multivariate scatter and bubble plots mapping musical mood quadrants (energy vs. valence) and popularity dynamics."
      },
      {
        url: spotifyDistribution,
        caption: "Distribution Analysis — Popularity Spread Box Plots & Loudness Histograms",
        description: "Statistical spread views examining genre popularity quartiles, danceability violins, and loudness distributions."
      },
      {
        url: spotifyTrends,
        caption: "Trends Analysis — Longitudinal Track Volume & Popularity Trajectory (2000–2023)",
        description: "Time-series line and area charts tracking release volumes and popularity changes across a 24-year timeline."
      }
    ],

    /* --- 3. Overview & Problem Context --- */
    tagline: "Interactive analytical web application exploring 54,465 Spotify tracks across acoustic features, genres, and decades.",
    businessProblem: "Music streaming platforms and audio analysts require systematic exploratory tools to dissect complex track-level audio features (danceability, energy, valence, tempo, acousticness) across genres, release decades, and popularity tiers without relying on static reports.",
    objectives: [
      "Process, clean, and enrich a high-dimensional dataset of 54,465 Spotify tracks spanning 2000 to 2023.",
      "Overcome metadata gaps by merging track identifiers to recover missing release dates and decade cohorts.",
      "Engineer an interactive multi-tab analytical dashboard using Plotly Dash with reactive client-side filtering.",
      "Evaluate cross-genre acoustic profiles, mood quadrants (energy vs. valence), and popularity dynamics."
    ],

    /* --- 4. Architecture & Pipeline --- */
    techStack: ["Python", "Plotly Dash", "Pandas", "NumPy", "Plotly", "Jupyter", "CSS3"],
    architecture: "Pandas Preprocessing & Deduplication -> Release-Date Recovery via track_id Left Merge -> Analytical Data Staging -> Plotly Dash Reactive Callback Engine -> Custom Dark-Themed Glassmorphism UI.",
    pipeline: [
      {
        title: "Data Cleaning & Sanitization",
        description: "Filtered raw 114,000+ tracks to 2000–2023 cohort, handled duplicates, normalized artist names from semicolon strings, and pruned invalid records.",
        tech: "Pandas / Python"
      },
      {
        title: "Metadata Recovery via Left Merge",
        description: "Overcame Spotify API rate limits by joining an external release-date catalog on track_id, successfully backfilling year and decade metadata.",
        tech: "Pandas Data Merge"
      },
      {
        title: "Feature Engineering & Metric Adjustment",
        description: "Engineered decade intervals, popularity tiers (Low, Medium, High), and calculated Bayesian-adjusted genre popularity (m=500).",
        tech: "NumPy / Pandas"
      },
      {
        title: "Plotly Dash Web Dashboard",
        description: "Built a 5-tab reactive interface with instant clientside callback switching, dynamic range sliders, and dark theme design tokens.",
        tech: "Plotly Dash / CSS"
      }
    ],

    /* --- 5. Data & Quantitative Metrics --- */
    datasetDescription: "Cleaned analytical dataset of 54,465 Spotify tracks (filtered from a raw catalog of 114,000+ tracks) spanning 2000–2023. Key attributes include popularity (0-100), explicit content flag, release year, decade cohorts, and Spotify acoustic descriptors: danceability, energy, valence, acousticness, speechiness, instrumentalness, liveness, loudness, and duration.",
    keyMetrics: [
      { label: "Cleaned Tracks", value: "54,465" },
      { label: "Raw Catalog", value: "114,000+" },
      { label: "Time Range", value: "2000–2023" },
      { label: "Analysis Views", value: "5 Tabs" }
    ],
    metricsDeepDive: [
      {
        label: "Dataset Volume",
        value: "54,465 Tracks",
        detail: "Strictly cleaned and enriched records filtered from a raw corpus of 114,000+ tracks."
      },
      {
        label: "Audio Dimensions",
        value: "7 Signals",
        detail: "Danceability, energy, speechiness, acousticness, instrumentalness, liveness, and valence."
      },
      {
        label: "Popularity Tiers",
        value: "3 Levels",
        detail: "Segmented into Low (0–40), Medium (40–70), and High (70–100) for distribution analysis."
      },
      {
        label: "Bayesian Prior (m=500)",
        value: "Weighted Mean",
        detail: "Shrinkage metric preventing low-volume niche genres from artificially dominating rankings."
      }
    ],

    /* --- 6. Code & Implementation Artifacts --- */
    codeSnippets: [
      {
        title: "Bayesian-Adjusted Popularity & Tier Segmentation",
        language: "python",
        description: "Prevents small-sample genre distortion by weighting group sizes against global mean, paired with popularity tier binning.",
        code: `def adj_popularity(d: pd.DataFrame, m: int = 500) -> pd.Series:
    """Bayesian-adjusted popularity score per genre group."""
    stats = d.groupby("main_genre").agg(
        avg=("popularity", "mean"),
        cnt=("popularity", "count"),
    )
    gm = d["popularity"].mean()
    return (stats["cnt"] / (stats["cnt"] + m)) * stats["avg"] + (m / (stats["cnt"] + m)) * gm

def pop_tier(d: pd.DataFrame) -> pd.DataFrame:
    """Add a popularity tier column to a copy of d."""
    d = d.copy()
    d["pop_tier"] = pd.cut(
        d["popularity"], bins=[0, 40, 70, 100],
        labels=["Low", "Medium", "High"], include_lowest=True
    )
    return d`
      },
      {
        title: "Reactive Clientside Tab Navigation in Dash",
        language: "python",
        description: "Zero-latency tab switching executed directly in the browser via clientside JavaScript callback, avoiding server round-trips.",
        code: `SECTIONS = ["comparison", "advanced", "relationship", "distribution", "trends"]

app.clientside_callback(
    """
    function(c1, c2, c3, c4, c5) {
        const sections = ['comparison','advanced','relationship','distribution','trends'];
        const ctx = window.dash_clientside.callback_context;
        if (!ctx.triggered.length) return Array(sections.length * 2).fill(window.dash_clientside.no_update);
        const active = ctx.triggered[0].prop_id.split('.')[0].replace('tab-', '');
        const btnClasses = sections.map(s => s === active ? 'tab-btn active' : 'tab-btn');
        const secStyles  = sections.map(s => ({display: s === active ? 'grid' : 'none'}));
        return [...btnClasses, ...secStyles];
    }
    """,
    [Output(f"tab-{s}", "className") for s in SECTIONS] +
    [Output(f"section-{s}", "style") for s in SECTIONS],
    [Input(f"tab-{s}", "n_clicks") for s in SECTIONS],
)`
      },
      {
        title: "Dark-Theme Plotly Figure Layout Factory",
        language: "python",
        description: "Centralized styling factory enforcing cohesive dark aesthetics, typography, margins, and custom grids across all 15+ dashboard charts.",
        code: `def chart_layout(title: str = "", **overrides) -> dict:
    """Return a Plotly layout dict matching the custom dashboard dark theme."""
    base = dict(
        paper_bgcolor="#141720",
        plot_bgcolor="#141720",
        font=dict(family="DM Sans, sans-serif", color="#c8d0de", size=11),
        title=dict(
            text=title,
            font=dict(family="DM Sans, sans-serif", size=12, color="#c8d0de"),
            x=0.015, xanchor="left",
            pad=dict(l=4, t=4),
        ),
        margin=dict(l=46, r=16, t=42, b=36),
        xaxis=dict(gridcolor="rgba(255,255,255,0.05)", linecolor="rgba(255,255,255,0.05)"),
        yaxis=dict(gridcolor="rgba(255,255,255,0.05)", linecolor="rgba(255,255,255,0.05)"),
        hoverlabel=dict(bgcolor="#1b1f2e", font_size=11, bordercolor="rgba(255,255,255,0.07)"),
        hovermode="closest",
        bargap=0.15,
    )
    base.update(overrides)
    return base`
      }
    ],
    keyFeatures: [
      "Interactive Multi-Tab Dashboard with Comparison, Advanced Comparison, Relationship, Distribution, and Trends views.",
      "Dynamic Sidebar Filters controlling genre multi-selection, 2000–2023 release year range slider, and explicit content toggle.",
      "Live KPI Summary Strip reporting Total Tracks, Average Popularity, Average Duration (mm:ss), Explicit Rate %, and Peak Decade.",
      "Energy vs. Valence Mood Quadrant scatter plot mapping musical sentiment and emotional tone.",
      "Bayesian-adjusted popularity metric weighting genre group sample size to avoid small-sample bias.",
      "Zero-latency tab switching powered by Dash clientside JavaScript callbacks."
    ],

    /* --- 7. Outcomes, Challenges & Insights --- */
    challengesAndSolutions: [
      {
        challenge: "Missing release date metadata in the original Spotify dataset, which prevented time-series analysis and decade cohort grouping. Initial attempts to backfill via the Spotify Web API hit rate-limits after ~500 tracks.",
        solution: "Engineered an offline enrichment strategy by acquiring an extended Spotify metadata dump and performing a scalable left merge on track_id in Pandas, successfully recovering year and decade attributes for 54,465 tracks."
      },
      {
        challenge: "Multi-artist semicolon-separated strings (e.g., 'Artist A; Artist B') corrupted artist-level aggregations and ranking charts.",
        solution: "Built string splitting and sanitization logic to extract the primary artist name while purging null and invalid string representations."
      },
      {
        challenge: "Small-sample genre skew where genres with very few tracks artificially dominated average popularity rankings.",
        solution: "Implemented a Bayesian-adjusted popularity formula with prior weighting (m=500), balancing genre mean against the global catalog average."
      }
    ],
    businessInsights: [
      "Track duration exhibits a consistent downward trend from the 2000s into the 2020s, reflecting changing streaming consumption habits.",
      "The Energy vs. Valence mood quadrant reveals clear genre clustering: Electronic and Pop concentrate in high-energy/high-valence quadrants, while Acoustic and Classical cluster in low-energy profiles.",
      "Explicit content rates show marked growth across contemporary decades, particularly concentrated in Hip-Hop and modern Pop releases."
    ],
    resultsAndImpact: [
      "Successfully cleaned, enriched, and structured 54,465 tracks spanning 24 years of music history.",
      "Delivered a responsive 5-tab analytical dashboard featuring 15+ interactive visualizations with sub-second clientside switching.",
      "Demonstrated that combining metadata recovery with statistical shrinkage yields dramatically more trustworthy insights than raw unweighted aggregations."
    ],
    lessonsLearned: [
      "Data enrichment via reliable secondary keys (track_id) is vastly more scalable and deterministic than live API scraping under strict rate limits.",
      "Clientside callbacks in Dash drastically improve dashboard responsiveness by eliminating unnecessary server round-trips for UI tab state transitions.",
      "Statistical adjustments like Bayesian shrinkage are critical when displaying ranking metrics over groups with high variance in sample count."
    ],
    futureImprovements: [
      "Containerize the Dash application using Docker for one-click cloud deployment on Render or AWS ECS.",
      "Integrate Spotify's recommendation endpoint to dynamically suggest similar tracks based on active slider feature filters."
    ],

    /* --- 8. External Links --- */
    githubUrl: "https://github.com/seifalmaz/spotify-analytics-dashboard",
    liveDemoUrl: null
  },

  // =======================================================================================
  // PROJECT 3: Waste Classifier — Intelligent Recycling System
  // =======================================================================================
  {
    /* --- 1. Core Identification --- */
    id: "waste-classifier",
    slug: "waste-classifier",
    title: "Waste Classifier — Intelligent Recycling System",
    subtitle: "Deep Learning, Transfer Learning (ResNet50, EfficientNetB3), Vision Transformers (ViT) & Grad-CAM",
    category: "Machine Learning & AI",
    featured: true,
    timeline: "May 2026",
    role: "Deep Learning & Computer Vision Engineer",
    team: "Academic Research Team (5 Members)",

    /* --- 2. Visual Artifacts (Verified Real Experiment Figures & Visualizations) --- */
    thumbnail: wasteModelsComparison,
    gallery: [
      {
        url: wasteModelsComparison,
        caption: "Model Architecture Benchmark Comparison",
        description: "Comparative test accuracy across 6 configurations: Baseline CNN (61.94%), Improved CNN (70.43%), ViT from scratch (71.61%), ResNet50 (95.81%), EfficientNetB3 (96.02%), and Ensemble (97.20%)."
      },
      {
        url: wasteVitAttention,
        caption: "Vision Transformer (ViT) Attention Rollout Saliency",
        description: "Layer-by-layer multi-head self-attention rollout maps demonstrating spatial focus on material textures and silhouette boundaries across waste categories."
      },
      {
        url: wasteConfusionMatrices,
        caption: "Combined Multi-Model Confusion Matrices",
        description: "Per-class prediction distributions across Plastic, Paper, Metal, Glass, and Organic for all evaluated architectures."
      },
      {
        url: wasteTrainingCurves,
        caption: "Training & Validation Loss / Accuracy Learning Curves",
        description: "Convergence trajectories and epoch loss progression highlighting the impact of Batch Normalization, Dropout, and two-stage transfer learning fine-tuning."
      },
      {
        url: wasteF1Heatmap,
        caption: "Per-Class F1-Score Performance Heatmap",
        description: "Material-level classification efficacy highlighting >98% precision in organic and paper waste, with boundary analysis on transparent plastics vs glass."
      }
    ],

    /* --- 3. Overview & Problem Context --- */
    tagline: "An Intelligent Waste Classification system built in PyTorch evaluating CNNs, ResNet50, EfficientNetB3, and Vision Transformers, achieving 97.2% ensemble accuracy across 6,166 images.",
    businessProblem: "Inefficient municipal waste sorting leads to recyclable materials being sent to landfills, escalating environmental degradation and resource waste. Automating the classification of municipal waste into plastic, paper, metal, glass, and organic categories using deep neural networks enables automated smart recycling bins and conveyor-belt sorting.",
    objectives: [
      "Curate and clean a balanced multi-source dataset of 6,166 waste images across 5 distinct recyclable material classes.",
      "Design, train, and benchmark a Baseline CNN against an Improved CNN with batch normalization, dropout, and augmentation.",
      "Leverage Transfer Learning with deep backbone architectures (ResNet50 and EfficientNetB3).",
      "Implement and train a Vision Transformer (ViT) architecture from scratch.",
      "Build a soft-voting ensemble model combining ResNet50 and EfficientNetB3.",
      "Visualize model decision regions using Grad-CAM and ViT attention rollout maps for interpretability."
    ],

    /* --- 4. Architecture & Pipeline --- */
    techStack: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "Transfer Learning",
      "Vision Transformers (ViT)",
      "Grad-CAM",
      "NumPy",
      "Pandas",
      "Matplotlib"
    ],
    architecture: "Multi-stage deep learning pipeline implemented in PyTorch. Raw images are collected, hash-deduplicated, normalized to ImageNet statistics (224x224), and split into 70/15/15 train/val/test partitions. Models range from lightweight CNNs to fine-tuned deep residual networks (ResNet50), compound-scaled networks (EfficientNetB3), and self-attention Vision Transformers. An ensemble combining ResNet50 and EfficientNetB3 delivers the highest overall test accuracy.",
    pipeline: [
      {
        title: "1. Data Collection & Deduplication",
        description: "Scraped web images via Bing & DuckDuckGo, merged Kaggle datasets, applied imagehash deduplication, yielding 6,166 verified images.",
        tech: "Python / imagehash"
      },
      {
        title: "2. Preprocessing & Data Augmentation",
        description: "Resized to 224x224 RGB, normalized to ImageNet statistics, applied random rotation, zoom, horizontal flips, and color jitter.",
        tech: "PyTorch Torchvision"
      },
      {
        title: "3. Baseline & Improved CNNs",
        description: "Built 4-layer custom CNN baseline (61.94% acc), upgraded with Batch Normalization, Dropout (0.5), and Adam optimizer (70.43% acc).",
        tech: "PyTorch nn.Module"
      },
      {
        title: "4. Transfer Learning (ResNet50 & EfficientNetB3)",
        description: "Two-stage transfer learning: frozen backbone feature extraction followed by unfreezing upper blocks for fine-tuning at lower learning rates.",
        tech: "PyTorch Transfer Learning"
      },
      {
        title: "5. Vision Transformer (ViT) Architecture",
        description: "Implemented patch extraction, linear projection, learnable class tokens, and multi-head self-attention encoders trained from scratch.",
        tech: "PyTorch ViT"
      },
      {
        title: "6. Ensemble & Interpretability",
        description: "Constructed soft-voting ensemble achieving 97.20% accuracy; generated Grad-CAM heatmaps and ViT attention rollout maps to verify feature localization.",
        tech: "Grad-CAM / Attention Rollout"
      }
    ],

    /* --- 5. Data & Quantitative Metrics --- */
    datasetDescription: "Curated dataset of 6,166 verified waste images across 5 classes: Plastic (1,033), Paper (1,285), Metal (1,102), Glass (1,440), and Organic (1,306). Partitioned using a fixed seed into 70% training (4,316 images), 15% validation (925 images), and 15% test (925 images).",
    keyMetrics: [
      { label: "Ensemble Accuracy", value: "97.20%" },
      { label: "Macro F1-Score", value: "97.08%" },
      { label: "Dataset Size", value: "6,166 Images" },
      { label: "Material Classes", value: "5 Categories" }
    ],
    metricsDeepDive: [
      {
        label: "Ensemble (Top)",
        value: "97.20% Acc",
        detail: "Soft-voting ensemble of fine-tuned ResNet50 and EfficientNetB3 delivering 97.08% Macro F1 and 97.19% Recall on unseen test data."
      },
      {
        label: "EfficientNetB3",
        value: "96.02% Acc",
        detail: "Top individual architecture with 95.94% Macro F1, leveraging compound coefficient scaling across depth, width, and resolution."
      },
      {
        label: "ResNet50",
        value: "95.81% Acc",
        detail: "50-layer deep residual network with skip connections achieving 95.66% Macro F1 and 95.68% Precision."
      },
      {
        label: "Vision Transformer",
        value: "71.61% Acc",
        detail: "Self-attention ViT trained from scratch on 16x16 image patches without pre-trained weights."
      },
      {
        label: "Improved CNN",
        value: "70.43% Acc",
        detail: "+8.49% accuracy lift over baseline achieved through Batch Normalization, Dropout (0.5), and geometric augmentation."
      },
      {
        label: "Baseline CNN",
        value: "61.94% Acc",
        detail: "Initial 4-layer convolutional architecture establishing standard inductive bias reference."
      }
    ],

    /* --- 6. Code & Implementation Artifacts --- */
    codeSnippets: [
      {
        title: "Two-Stage Transfer Learning Fine-Tuning Loop",
        language: "python",
        description: "PyTorch training routine: initial frozen feature extraction followed by selective layer unfreezing at reduced learning rate (1e-4).",
        code: `def fine_tune_model(model, dataloaders, criterion, optimizer, num_epochs=15):
    best_model_wts = copy.deepcopy(model.state_dict())
    best_acc = 0.0

    for epoch in range(num_epochs):
        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
            else:
                model.eval()

            running_loss = 0.0
            running_corrects = 0

            for inputs, labels in dataloaders[phase]:
                inputs, labels = inputs.to(device), labels.to(device)
                optimizer.zero_grad()

                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)

                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)
            if phase == 'val' and epoch_acc > best_acc:
                best_acc = epoch_acc
                best_model_wts = copy.deepcopy(model.state_dict())

    model.load_state_dict(best_model_wts)
    return model, best_acc`
      },
      {
        title: "Soft-Voting Ensemble Probability Aggregator",
        language: "python",
        description: "Aggregates softmax probability tensors from fine-tuned ResNet50 and EfficientNetB3 backbones to generate final ensemble predictions.",
        code: `def evaluate_ensemble(models, test_loader, weights=[0.5, 0.5]):
    for m in models:
        m.eval()
        
    all_preds, all_labels = [], []
    with torch.no_grad():
        for inputs, labels in test_loader:
            inputs = inputs.to(device)
            ensemble_probs = torch.zeros(inputs.size(0), 5).to(device)
            
            for m, w in zip(models, weights):
                probs = F.softmax(m(inputs), dim=1)
                ensemble_probs += w * probs
                
            preds = torch.argmax(ensemble_probs, dim=1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.numpy())
            
    test_acc = accuracy_score(all_labels, all_preds)
    macro_f1 = f1_score(all_labels, all_preds, average='macro')
    return test_acc, macro_f1`
      }
    ],
    keyFeatures: [
      "5-class waste classification covering Plastic, Paper, Metal, Glass, and Organic.",
      "Rigorous benchmark comparing 6 model configurations on identical test splits.",
      "Two-stage fine-tuning schedule preventing catastrophic forgetting of ImageNet features.",
      "ViT attention rollout and Grad-CAM interpretability visualizations.",
      "High-performance soft-voting ensemble achieving 97.20% accuracy and 97.08% Macro F1."
    ],

    /* --- 7. Outcomes, Challenges & Insights --- */
    challengesAndSolutions: [
      {
        challenge: "High intra-class variance and background clutter (e.g. crushed cans vs clean cans, varied lighting).",
        solution: "Applied heavy data augmentation (color jitter, affine rotation, random scaling) and fine-tuned compound-scaled EfficientNetB3."
      },
      {
        challenge: "Training Vision Transformer from scratch with limited dataset size (ViTs lack inductive bias of convolutions).",
        solution: "Engineered lightweight patch projections (16x16) and analyzed attention rollout maps, demonstrating where self-attention focuses compared to CNN receptive fields."
      }
    ],
    businessInsights: [
      "Organic and paper waste exhibit the highest classification confidence (>98% F1), whereas transparent plastics and clear glass present the primary boundary confusion due to shared specular highlights.",
      "Ensemble models eliminate single-architecture failure modes, providing the reliability necessary for industrial sorting machinery where misclassification contaminates recyclable batches."
    ],
    resultsAndImpact: [
      "Achieved 97.20% overall test accuracy and 97.08% Macro F1 on a held-out test split of 925 images.",
      "Demonstrated that compound-scaled EfficientNetB3 outperforms ResNet50 with fewer parameters.",
      "Documented a reproducible research workflow with version-controlled notebooks and structured reports on GitHub."
    ],
    lessonsLearned: [
      "Transfer learning reduces sample requirements by orders of magnitude compared to training self-attention transformers from scratch.",
      "Visualizing Grad-CAM and attention rollout maps is essential for auditing whether models learn true material morphology rather than background artifacts."
    ],
    futureImprovements: [
      "Deploy the ensemble model onto NVIDIA Jetson edge hardware for real-time sorting conveyor testing.",
      "Train an object detection model (YOLOv8) to support multi-object detection in crowded waste bins."
    ],

    /* --- 8. External Links --- */
    githubUrl: "https://github.com/seifalmaz/waste-classifier",
    liveDemoUrl: null
  },

  // =======================================================================================
  // PROJECT 4: Hand Gesture Recognition — Real-Time Computer Vision with Deep Learning
  // =======================================================================================
  {
    /* --- 1. Core Identification --- */
    id: "gesture-recognition",
    slug: "gesture-recognition",
    title: "Hand Gesture Recognition — Real-Time Computer Vision with Deep Learning",
    subtitle: "Production MobileNetV3-Large Classifier, MediaPipe 3D Landmark Tracking, Domain-Adaptive Augmentation & Vectorized Grad-CAM",
    category: "Machine Learning & AI · Computer Vision · Deep Learning",
    featured: true,
    timeline: "Dec 2025 – Oct 2026",
    role: "Computer Vision & Deep Learning Engineer",
    team: "Seif Ahmed",

    /* --- 2. Visual Artifacts (Verified Real Webcam Interface Screenshots) --- */
    thumbnail: gestureDemo1,
    gallery: [
      {
        url: gestureDemo1,
        caption: "Live Real-Time Gesture Recognition — OK Gesture (100.0% Confidence)",
        description: "Real-time webcam inference on NVIDIA GeForce GTX 1650 GPU displaying 21 3D hand landmarks, 30% safety margin bounding box, 21.1 ms inference latency, and full class probability distribution across all 4 gesture classes."
      },
      {
        url: gestureDemo2,
        caption: "Live Real-Time Gesture Recognition — Fist Gesture (100.0% Confidence)",
        description: "Robust real-time classification of the closed fist gesture with 100.0% confidence and 25.0 ms latency, demonstrating domain-adaptive invariance against background room clutter and orientation shifts."
      }
    ],

    /* --- 3. Overview & Problem Context --- */
    tagline: "An end-to-end, high-performance real-time computer vision system that localizes human hands via MediaPipe and classifies gestures from live webcam feeds using a production-ready MobileNetV3-Large neural network (99.25% test accuracy, 10.3 ms latency, 16.2 MB) with domain-adaptive background injection and vectorized Grad-CAM explainability.",
    businessProblem: "Touchless human-computer interaction (HCI) is essential in sterile surgical suites, industrial automation, and hands-free computing environments. However, deep learning models trained exclusively on controlled laboratory infrared datasets (such as LeapGestRecog) suffer catastrophic generalization failure when deployed to real-world optical webcams. Under real webcam conditions, models encounter complex room backgrounds, dynamic lighting, scale jitter, arbitrary hand orientations, and image preprocessing mismatches. In early testing, unadapted models frequently misclassified a closed fist as a thumb (97.9%) due to bright room pixels resembling extended digits, and vertical thumbs as 'OK' (91.9%) due to orientation bias. The objective of this project was to diagnose and eliminate these failure modes, engineer an end-to-end real-time webcam pipeline with robust hand localization, and benchmark candidate deep learning architectures under realistic, leak-free evaluation conditions.",
    objectives: [
      "Diagnose and resolve root causes of webcam domain transfer errors (zero-background bias, horizontal pose bias, and temporal frame leakage).",
      "Implement robust MediaPipe HandLandmarker 3D localization with adaptive aspect-ratio letterboxing and 30% margin expansion.",
      "Engineer a domain-adaptive augmentation pipeline (RandomBackgroundInjection at p=0.80, ±60° rotation invariance, sensor noise).",
      "Train and benchmark five deep learning architectures (MobileNetV3-Large, VGG16, Custom Compact CNN, ResNet50, and EfficientNet-B0) on an independent, unseen subject test split.",
      "Deploy a high-performance Tkinter desktop workstation featuring live video streaming, rolling majority-vote temporal smoothing, standby state detection ('NO HAND DETECTED'), and GPU-accelerated vectorized Grad-CAM attention heatmaps.",
      "Maintain real-time inference latency (<15 ms) and high frame rates (>60 FPS) on consumer GPU hardware."
    ],

    /* --- 4. Architecture & Pipeline --- */
    techStack: [
      "Python",
      "PyTorch",
      "Torchvision",
      "CUDA 12.4",
      "OpenCV",
      "MediaPipe",
      "MobileNetV3",
      "Grad-CAM",
      "Tkinter",
      "Scikit-Learn",
      "NumPy"
    ],
    architecture: "The end-to-end inference pipeline processes webcam video frames synchronously at 30+ FPS. Live BGR frames are converted to RGB and ingested by Google MediaPipe HandLandmarker to track 21 3D hand coordinates. If no hand is detected, the system transitions into an idle standby state ('NO HAND DETECTED'), suppressing false positives on furniture or walls. When a hand is localized, a bounding box is extracted with 30% safety margin expansion and clamped to frame boundaries. The region of interest is cropped with aspect-ratio preserved letterboxing to 224×224 pixels and normalized using ImageNet channel statistics. The tensor passes to the fine-tuned MobileNetV3-Large classifier, outputting softmax probabilities across the 4 verified gesture classes (Fist, OK, Palm, Thumb). Raw predictions are fed into a 7-frame rolling temporal majority voting buffer to eliminate frame-to-frame flicker, while an explainability hook computes vectorized Grad-CAM activation heatmaps from the final convolutional layer for real-time visual inspection.",
    pipeline: [
      {
        title: "1. Webcam Frame Acquisition",
        description: "Captures live optical video feed at 30 FPS via OpenCV, formatting incoming frames for landmark ingestion.",
        tech: "OpenCV / VideoCapture"
      },
      {
        title: "2. MediaPipe 3D Hand Localization",
        description: "Tracks 21 3D spatial coordinates per hand; triggers standby state ('NO HAND DETECTED') if no hand is detected to suppress false classifications.",
        tech: "MediaPipe HandLandmarker"
      },
      {
        title: "3. Adaptive Margin ROI & Letterboxing",
        description: "Calculates bounding box with 30% safety margin expansion to preserve fingertips and thumb tips, applying square letterboxed resizing to 224×224.",
        tech: "OpenCV / NumPy"
      },
      {
        title: "4. Domain-Adaptive ImageNet Preprocessing",
        description: "Normalizes RGB pixels with ImageNet channel statistics (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) matching the training distribution.",
        tech: "PyTorch / Torchvision"
      },
      {
        title: "5. MobileNetV3 Neural Inference",
        description: "Executes forward pass through lightweight MobileNetV3-Large classifier, generating softmax probability distributions across all 4 gesture classes.",
        tech: "PyTorch / CUDA 12.4"
      },
      {
        title: "6. Rolling Temporal Consensus Buffer",
        description: "Buffers sequential frame predictions in a rolling deque (7 frames) to apply majority voting, eliminating transient visual flicker.",
        tech: "collections.deque"
      },
      {
        title: "7. Telemetry HUD & Grad-CAM Heatmap",
        description: "Renders cybernetic UI overlay with live bounding box, confidence meters, latency/FPS telemetry, and vectorized Grad-CAM attention heatmaps.",
        tech: "CustomTkinter / Grad-CAM"
      }
    ],

    /* --- 5. Data & Quantitative Metrics --- */
    methodology: "The dataset workflow utilizes the LeapGestRecog infrared gesture dataset (10 human subjects, 00 to 09). To eliminate temporal sequence leakage present in naive random train/val splits—which artificially reported ~100% accuracy on correlated video frames—we instituted a strict group-aware subject split: Subjects 00–07 for training, Subject 08 for validation, and Subject 09 held out as a completely unseen test benchmark (800 samples, 200 per class across Fist, OK, Palm, and Thumb). To bridge the sensor-to-webcam reality gap, training utilized domain-adaptive augmentation: a custom RandomBackgroundInjection module (p=0.80) that composites synthetic room lighting, gradients, and indoor noise behind segmented hands; ±60° rotation invariance to accommodate vertical webcam hand poses; random scale/translation jitter; and mild Gaussian sensor blur. Models were trained using PyTorch with Cross-Entropy Loss, AdamW optimizer, cosine annealing learning rate schedules, and ImageNet weight initialization.",
    datasetDescription: "LeapGestRecog infrared hand gesture dataset featuring 10 subjects (00 to 09). Evaluation benchmark consists of 800 strictly unseen samples from Subject 09 across 4 verified gesture classes: Fist (200), OK (200), Palm (200), and Thumb (200).",
    keyMetrics: [
      { label: "Test Accuracy", value: "99.25%" },
      { label: "Macro F1-Score", value: "99.25%" },
      { label: "Inference Latency", value: "10.31 ms" },
      { label: "Model Footprint", value: "16.2 MB" }
    ],
    benchmarkTable: [
      { model: "MobileNetV3-Large (Ours)", accuracy: "99.25%", f1: "99.25%", precision: "99.27%", recall: "99.25%", latency: "10.31 ms", fps: "97.0", size: "16.2 MB", params: "4.21M", isSelected: true },
      { model: "VGG16 (Original Baseline)", accuracy: "75.88%", f1: "72.23%", precision: "86.60%", recall: "75.88%", latency: "14.92 ms", fps: "67.0", size: "512.2 MB", params: "134.28M", isSelected: false },
      { model: "CustomCompactCNN (Scratch)", accuracy: "67.88%", f1: "59.63%", precision: "57.49%", recall: "67.88%", latency: "1.30 ms", fps: "771.2", size: "1.6 MB", params: "0.42M", isSelected: false },
      { model: "ResNet50 (Original Baseline)", accuracy: "36.88%", f1: "27.21%", precision: "31.56%", recall: "36.88%", latency: "7.64 ms", fps: "130.9", size: "90.0 MB", params: "23.52M", isSelected: false },
      { model: "EfficientNet-B0 (Original Baseline)", accuracy: "32.62%", f1: "23.33%", precision: "30.75%", recall: "32.62%", latency: "11.74 ms", fps: "85.2", size: "15.6 MB", params: "4.01M", isSelected: false }
    ],
    metricsDeepDive: [
      {
        label: "MobileNetV3-Large (Ours)",
        value: "99.25% Test Acc",
        detail: "Achieved 99.25% test accuracy and 99.25% Macro F1 on independent unseen Subject 09 (Fist 100%, OK 98.5%, Palm 98.5%, Thumb 100%), with 10.31 ms latency (97.0 FPS) and 4.21M parameters."
      },
      {
        label: "VGG16 Baseline",
        value: "75.88% Test Acc",
        detail: "Original baseline achieved 75.88% test accuracy (72.23% Macro F1) with high latency (14.92 ms), 134.3M parameters (512.2 MB size), and suffered severe palm recall degradation (18.5%)."
      },
      {
        label: "Custom Compact CNN",
        value: "67.88% Test Acc",
        detail: "Trained from scratch (0.42M parameters, 1.6 MB); achieved ultra-fast 1.30 ms latency (771 FPS) but suffered 0% recall on the OK gesture due to capacity limits on subtle finger loops."
      },
      {
        label: "ResNet50 & EfficientNet-B0",
        value: "36.88% & 32.62%",
        detail: "Original models collapsed on the unseen test subject (36.88% and 32.62% test accuracy) due to severe orientation bias and zero-background sensor overfitting when trained without domain adaptation."
      },
      {
        label: "Confusion Matrix Performance",
        value: "794 / 800 Correct",
        detail: "Across 800 independent test samples: Fist 200/200, OK 200/200, Thumb 200/200, Palm 194/200 (only 6 palm samples confused with OK). Macro precision: 99.27%."
      },
      {
        label: "Webcam Telemetry",
        value: "97.0 FPS / 10.3 ms",
        detail: "Measured on an NVIDIA GeForce GTX 1650 under PyTorch CUDA 12.4. Provides smooth real-time tracking well beyond standard 30 FPS camera capture limits."
      }
    ],

    /* --- 6. Code & Implementation Artifacts --- */
    codeSnippets: [
      {
        title: "MediaPipe Hand Detection & Adaptive Square ROI Cropping",
        language: "python",
        description: "Localizes 21 3D landmarks via MediaPipe HandLandmarker, expands bounding box with 30% margin padding to protect fingertips, and extracts square ROI for CNN inference.",
        code: `class HandDetector:
    def __init__(self, model_path=None, margin=0.30):
        self.margin = margin  # 30% safety margin expansion
        base_options = mp_python.BaseOptions(model_asset_path=model_path)
        options = vision.HandLandmarkerOptions(
            base_options=base_options,
            num_hands=1,
            min_hand_detection_confidence=0.45,
            min_tracking_confidence=0.45
        )
        self.detector = vision.HandLandmarker.create_from_options(options)

    def detect_hand(self, frame_bgr):
        h, w = frame_bgr.shape[:2]
        frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        result = self.detector.detect(mp_image)

        if not result.hand_landmarks:
            return False, None, None, None  # Standby: NO HAND DETECTED

        landmarks = result.hand_landmarks[0]
        xs = [lm.x * w for lm in landmarks]
        ys = [lm.y * h for lm in landmarks]

        # Calculate bounding box with 30% safety margin
        raw_x1, raw_x2 = min(xs), max(xs)
        raw_y1, raw_y2 = min(ys), max(ys)
        pad_x = max((raw_x2 - raw_x1) * self.margin, 20)
        pad_y = max((raw_y2 - raw_y1) * self.margin, 20)

        # Force square aspect ratio to avoid distortion during 224x224 resize
        max_side = max((raw_x2 - raw_x1) + 2 * pad_x, (raw_y2 - raw_y1) + 2 * pad_y)
        cx, cy = (raw_x1 + raw_x2) / 2.0, (raw_y1 + raw_y2) / 2.0

        x1 = int(max(0, cx - max_side / 2.0))
        y1 = int(max(0, cy - max_side / 2.0))
        x2 = int(min(w, cx + max_side / 2.0))
        y2 = int(min(h, cy + max_side / 2.0))

        crop_bgr = frame_bgr[y1:y2, x1:x2].copy()
        return True, (x1, y1, x2, y2), crop_bgr, landmarks`
      },
      {
        title: "Domain-Adaptive Background Injection Pipeline",
        language: "python",
        description: "Overcomes LeapGestRecog zero-background bias by compositing synthetic solid tones, linear gradients, and room noise behind segmented hands.",
        code: `class RandomBackgroundInjection(object):
    """
    Synthesizes realistic background variations behind segmented hand gestures.
    Cures the model's false sensitivity to non-black room backgrounds (p=0.80).
    """
    def __init__(self, p=0.80, threshold=28):
        self.p = p
        self.threshold = threshold

    def __call__(self, img_pil):
        if random.random() > self.p:
            return img_pil

        img_np = np.array(img_pil)
        h, w = img_np.shape[:2]
        is_3d = (img_np.ndim == 3)

        # Segment hand foreground from infrared pitch-black background
        mask = (img_np.mean(axis=2) > self.threshold).astype(np.uint8)[:, :, None] if is_3d else (img_np > self.threshold).astype(np.uint8)

        bg_type = random.choice(["solid", "gradient", "noisy"])
        if bg_type == "solid":
            bg = np.full(img_np.shape, random.randint(30, 180), dtype=np.uint8)
        elif bg_type == "gradient":
            grad_1d = np.linspace(random.randint(20, 150), random.randint(40, 200), w, dtype=np.uint8)
            bg = np.tile(grad_1d, (h, 1))
            if is_3d: bg = np.stack([bg]*img_np.shape[2], axis=-1)
        else:
            noise = np.random.normal(0, 20, (h, w)).clip(-40, 40)
            bg = np.clip(random.randint(40, 160) + noise, 0, 255).astype(np.uint8)
            if is_3d: bg = np.stack([bg]*img_np.shape[2], axis=-1)

        # Composite foreground hand onto synthetic realistic background
        composite = np.where(mask > 0, img_np, bg)
        return Image.fromarray(composite)`
      },
      {
        title: "Vectorized Real-Time Model Inference & Temporal Deque Consensus",
        language: "python",
        description: "Executes forward pass with MobileNetV3-Large, calculates softmax probabilities, and stabilizes live predictions using a 7-frame rolling majority voting buffer.",
        code: `class GestureClassifierEngine:
    def __init__(self, model_path, device="cuda"):
        self.device = torch.device(device if torch.cuda.is_available() else "cpu")
        self.model = torch.load(model_path, map_location=self.device)
        self.model.eval()
        self.labels = ["Fist", "OK", "Palm", "Thumb"]
        self.history = deque(maxlen=7)  # Rolling temporal buffer

    @torch.inference_mode()
    def predict_crop(self, crop_bgr):
        # Aspect-ratio preserved letterbox resize & ImageNet normalization
        img_rgb = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2RGB)
        tensor = transform_pipeline(Image.fromarray(img_rgb)).unsqueeze(0).to(self.device)

        logits = self.model(tensor)
        probs = torch.softmax(logits, dim=1)[0].cpu().numpy()
        pred_idx = int(np.argmax(probs))
        pred_conf = float(probs[pred_idx])
        pred_label = self.labels[pred_idx]

        # Majority voting over sequential frames to prevent visual flicker
        self.history.append(pred_label)
        smoothed_label = max(set(self.history), key=self.history.count)

        return smoothed_label, pred_conf, probs`
      }
    ],
    keyFeatures: [
      "Production MobileNetV3-Large neural network delivering 99.25% test accuracy on independent unseen human subjects.",
      "4 verified core gesture classes: Fist (✊), OK (👌), Palm (🖐️), and Thumb (👍).",
      "MediaPipe HandLandmarker tracking 21 3D spatial landmarks with 30% safety margin bounding box.",
      "Standby state detection displaying 'NO HAND DETECTED' to prevent false positive classifications on empty backgrounds.",
      "Domain-adaptive data augmentation (RandomBackgroundInjection at p=0.80 and ±60° rotation invariance) bridging the sensor-to-webcam reality gap.",
      "GPU-accelerated vectorized Grad-CAM explainability heatmaps for real-time model decision auditing.",
      "Rolling 7-frame majority voting temporal buffer eliminating frame-to-frame prediction flicker.",
      "Benchmarking suite comparing MobileNetV3-Large, VGG16, Custom CNN, ResNet50, and EfficientNet-B0."
    ],

    /* --- 7. Outcomes, Challenges & Insights --- */
    challengesAndSolutions: [
      {
        challenge: "Zero-Background Bias: LeapGestRecog infrared training images possess 100% pitch-black backgrounds. When deployed on standard webcams, bright background room pixels around a clenched hand caused models to misclassify Fist as Thumb (97.9% confidence).",
        solution: "Developed a custom RandomBackgroundInjection augmentation pipeline (p=0.80) that composites synthetic solid tones, linear gradients, and Gaussian room noise behind segmented training hands, forcing the CNN to learn morphological finger boundaries rather than background contrast."
      },
      {
        challenge: "Horizontal Orientation Bias: Training dataset hands were captured strictly horizontally across the sensor. Real-world webcam users hold thumbs vertically upright, causing unadapted models to match vertical digits to the 'OK' loop (91.9% confidence).",
        solution: "Introduced ±60° rotation invariance augmentation and increased bounding-box expansion margin from 0.15 to 0.30, ensuring extended thumb tips and wrist anatomy remain fully within the normalized ROI."
      },
      {
        challenge: "Temporal Sequence Leakage: Early development notebooks reported ~100% validation accuracy due to random splitting across consecutive video frames from identical recording sessions, concealing real-world failure modes.",
        solution: "Implemented a strict group-aware subject split partitioning human subjects into disjoint sets (Subjects 00–07 for training, 08 for validation, and 09 for independent testing), yielding true, uninflated generalization metrics."
      },
      {
        challenge: "False Positives on Empty Scenes: In live webcam feeds without a user present, standard classifiers generated high-confidence predictions on background walls, clothing, or chairs.",
        solution: "Integrated a MediaPipe landmark gating mechanism that displays 'NO HAND DETECTED' and halts neural inference whenever hand landmark confidence falls below 0.45, eliminating ambient hallucinations."
      }
    ],
    businessInsights: [
      "Lightweight modern architectures like MobileNetV3-Large decisively outclassed legacy heavy networks like VGG16, achieving 23.4% higher test accuracy with 1/30th the parameter size and 30% lower latency.",
      "High benchmark accuracy on laboratory datasets is often an illusion of domain bias; without background synthesis and rotation invariance, models completely fail in real-world environments.",
      "Temporal smoothing via rolling majority consensus (7-frame buffer) is critical for touchless HCI; raw frame-by-frame inference causes visual jitter that destroys user trust."
    ],
    resultsAndImpact: [
      "Achieved 99.25% test accuracy and 99.25% Macro F1 on an independent unseen test subject (Subject 09, 800 samples).",
      "Reduced inference latency to 10.31 ms (97.0 FPS throughput) on an NVIDIA GeForce GTX 1650, easily exceeding 30 FPS webcam requirements.",
      "Reduced model checkpoint size from 512.2 MB (VGG16) to 16.2 MB (MobileNetV3-Large), enabling edge and embedded deployment.",
      "Eliminated zero-background false classifications and upright orientation errors via domain-adaptive augmentation.",
      "Integrated real-time vectorized Grad-CAM explainability confirming that feature attribution is grounded in active finger articulation."
    ],
    lessonsLearned: [
      "Group-aware splitting by human subject is mandatory in biometric and gesture datasets to avoid sequence leakage between temporally adjacent frames.",
      "Domain adaptation through targeted synthetic augmentation (background injection, rotation invariance) is vastly more effective than simply increasing model parameter capacity.",
      "Compound scaling and depthwise separable convolutions (MobileNetV3) provide optimal inductive bias for edge computer vision, balancing representation capacity with low FLOP counts.",
      "Explainable AI (Grad-CAM) should be an active debugging tool during model iteration, not just a post-hoc presentation graphic."
    ],
    futureImprovements: [
      "Multi-hand tracking support for simultaneous two-hand gesture recognition.",
      "Temporal sequence modeling (LSTM / Transformer) to classify dynamic continuous gestures (swipe, wave, pinch).",
      "TensorRT and ONNX Runtime INT8 quantization for embedded deployment on NVIDIA Jetson and Raspberry Pi.",
      "Dynamic exposure compensation and background segmentation using selfie segmentation backbones for low-light webcam settings."
    ],

    /* --- 8. External Links --- */
    githubUrl: "https://github.com/seifalmaz/gesture-recognition",
    liveDemoUrl: null
  }
];

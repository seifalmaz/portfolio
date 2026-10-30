import { Helmet } from "react-helmet-async";

const DEFAULT_TITLE = "Seif Almaz (Seif Ahmed Almaz) | Data Science & AI Engineer";
const DEFAULT_DESCRIPTION =
  "Official portfolio of Seif Almaz (Seif Ahmed Almaz) - Data Science & AI Engineer. Explore verified case studies in Machine Learning, predictive modeling, and executive Power BI dashboards.";
const BASE_URL = "https://www.seifalmaz.site";
const DEFAULT_IMAGE = `${BASE_URL}/og-card.png`;

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  pathname = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  article = null
}) {
  const pageTitle = title ? `${title} | Seif Almaz` : DEFAULT_TITLE;
  const canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary HTML Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Seif Almaz Portfolio" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Article metadata if applicable */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
    </Helmet>
  );
}

export default SEO;

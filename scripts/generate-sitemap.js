import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@insforge/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we have fallback environment variables if run without them (e.g. locally without .env loaded in node script)
const INSFORGE_URL = process.env.VITE_INSFORGE_URL || "https://6w3sgde5.us-east.insforge.app";
const INSFORGE_ANON_KEY = process.env.VITE_INSFORGE_ANON_KEY || "ik_70965bdd4ef84eae1800692c1cdf68fd";

// The base URL of the deployed application (must be set in coolify or fallback to generic)
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || "https://www.bzcreators.com";

const supabase = createClient({ baseUrl: INSFORGE_URL, anonKey: INSFORGE_ANON_KEY });

async function generateSitemap() {
  console.log("Generating sitemap...");
  
  // Base static routes
  const staticRoutes = [
    '',
    '/blog',
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  for (const route of staticRoutes) {
    xml += `
  <url>
    <loc>${PUBLIC_SITE_URL}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }

  // Fetch dynamic blog posts
  const { data: posts, error } = await supabase.database
    .from("posts")
    .select("slug, updated_at, created_at")
    .eq("published", true);

  if (error) {
    console.error("Error fetching posts for sitemap:", error);
  } else if (posts) {
    for (const post of posts) {
      const date = post.updated_at || post.created_at;
      const isoDate = new Date(date).toISOString().split('T')[0];
      xml += `
  <url>
    <loc>${PUBLIC_SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  xml += `\n</urlset>`;

  // Write to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log("sitemap.xml generated successfully in /public.");
}

generateSitemap().catch(console.error);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  generateRobotsTxt: true,
  // Add changefreq and priority for better SEO
  changefreq: "weekly",
  priority: 0.7,
};
// https://www.runfunrun.dev

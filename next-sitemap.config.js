/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://geoquiz.co',
  generateRobotsTxt: true,
  exclude: ['/user', '/quiz', '/daily/test'],
  sitemapSize: 200,
  generateIndexSitemap: true,
  transform: async (config, path) => {
    // Priority 1
    if (path === '/' || path === '/home' || path === '/daily') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    //Priority 0.9
    if (path === '/countries' || path === '/decks') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
      };
    }

    // Default priority for all other pages
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.8,
    };
  },
};

module.exports = {
  siteUrl: 'https://www.convertly.org',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 1.0,
  sitemapSize: 5000,
  exclude: [],
  additionalPaths: async (config) => {
    const urls = [
      'jpeg-to-png', 'jpeg-to-bmp', 'jpeg-to-tiff', 'jpeg-to-webp', 'jpeg-to-gif', 'jpeg-to-ico', 'jpeg-to-jp2', 'jpeg-to-avif',
      'png-to-jpeg', 'png-to-bmp', 'png-to-tiff', 'png-to-webp', 'png-to-gif', 'png-to-ico', 'png-to-jp2', 'png-to-avif',
      'bmp-to-jpeg', 'bmp-to-png', 'bmp-to-tiff', 'bmp-to-webp', 'bmp-to-gif', 'bmp-to-ico', 'bmp-to-jp2', 'bmp-to-avif',
      'tiff-to-jpeg', 'tiff-to-png', 'tiff-to-bmp', 'tiff-to-webp', 'tiff-to-gif', 'tiff-to-ico', 'tiff-to-jp2', 'tiff-to-avif',
      'webp-to-jpeg', 'webp-to-png', 'webp-to-bmp', 'webp-to-tiff', 'webp-to-gif', 'webp-to-ico', 'webp-to-jp2', 'webp-to-avif',
      'gif-to-jpeg', 'gif-to-png', 'gif-to-bmp', 'gif-to-tiff', 'gif-to-webp', 'gif-to-ico', 'gif-to-jp2', 'gif-to-avif',
      'ico-to-jpeg', 'ico-to-png', 'ico-to-bmp', 'ico-to-tiff', 'ico-to-webp', 'ico-to-gif', 'ico-to-jp2', 'ico-to-avif',
      'jp2-to-jpeg', 'jp2-to-png', 'jp2-to-bmp', 'jp2-to-tiff', 'jp2-to-webp', 'jp2-to-gif', 'jp2-to-ico', 'jp2-to-avif',
      'avif-to-jpeg', 'avif-to-png', 'avif-to-bmp', 'avif-to-tiff', 'avif-to-webp', 'avif-to-gif', 'avif-to-ico', 'avif-to-jp2',
    ];
    return urls.map(url => ({
      loc: `/${url}`,
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    }));
  },
};
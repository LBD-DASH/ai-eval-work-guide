import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absUrl } from '../lib/url';

export const GET: APIRoute = async ({ site }) => {
  const platforms = await getCollection('platforms');
  const latest = platforms.reduce((m, a) => (a.data.lastUpdated > m ? a.data.lastUpdated : m), new Date(0));
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const urls = [
    { loc: absUrl('', site), lastmod: day(latest) },
    { loc: absUrl('platforms/', site), lastmod: day(latest) },
    ...platforms.map((a) => ({ loc: absUrl(`platforms/${a.id}/`, site), lastmod: day(a.data.lastUpdated) })),
    { loc: absUrl('get-started/', site), lastmod: day(latest) },
    { loc: absUrl('faq/', site), lastmod: day(latest) },
    { loc: absUrl('about/', site) },
    { loc: absUrl('affiliate-disclosure/', site) },
    { loc: absUrl('privacy/', site) },
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

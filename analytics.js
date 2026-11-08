/* Google Analytics 4 — TZP Tracker (G-B40MPHFTS0)
   Sem sinais do Google e sem personalização de anúncios.
   Eventos:
   - generate_lead: clique em qualquer link mailto (contato com possível comprador)
   - language_switch: clique nos links entre PT e EN */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-B40MPHFTS0', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});

document.addEventListener('click', function (event) {
  var link = event.target.closest ? event.target.closest('a') : null;
  if (!link) return;
  var href = link.getAttribute('href') || '';
  var area = link.closest('section, header, footer, aside');
  var areaId = area ? (area.id || area.tagName.toLowerCase()) : 'page';
  var text = (link.textContent || '').trim().slice(0, 100);

  if (href.indexOf('mailto:') === 0) {
    gtag('event', 'generate_lead', {
      method: 'email',
      link_text: text,
      cta_area: areaId
    });
  } else if (link.hasAttribute('hreflang')) {
    gtag('event', 'language_switch', {
      language: link.getAttribute('hreflang'),
      cta_area: areaId
    });
  }
});

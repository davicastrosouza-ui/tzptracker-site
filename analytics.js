/* Google Analytics 4 — TZP Tracker (G-B40MPHFTS0)
   Sem sinais do Google e sem personalização de anúncios.
   Eventos:
   - generate_lead: clique em link mailto (method=email) ou no botão "Copiar e-mail" (method=copy_email)
   - language_switch: clique nos links entre PT e EN */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-B40MPHFTS0', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});

document.addEventListener('click', function (event) {
  var copyBtn = event.target.closest ? event.target.closest('[data-copy-email]') : null;
  if (copyBtn) {
    var email = copyBtn.getAttribute('data-copy-email');
    var original = copyBtn.textContent;
    var done = function (label) {
      copyBtn.textContent = label;
      setTimeout(function () { copyBtn.textContent = original; }, 2500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { done('E-mail copiado ✓'); },
        function () { done(email); }
      );
    } else {
      done(email);
    }
    gtag('event', 'generate_lead', { method: 'copy_email', cta_area: 'contato' });
    return;
  }

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

(function() {
  'use strict';
  if (typeof gtag !== 'function') return;

  var AIRPORT_DOMAINS = [
    'yawtt.net',
    'lanpangyun.me',
    'ewanwtt.net',
    'j134.net',
    'dgy02.com'
  ];

  var AIRPORT_NAMES = {
    'yawtt.net': '扬帆云',
    'lanpangyun.me': '蓝胖云',
    'ewanwtt.net': '尔湾云',
    'j134.net': '疾风云',
    'dgy02.com': '大哥云'
  };

  var UNICLASH_DOWNLOAD_PAGES = {
    'https://tusmartchat.com/uniclash.html': '扬帆云',
    'https://tusmartchat.com/uniclash-erwan.html': '尔湾云'
  };

  function getAirportName(url) {
    for (var i = 0; i < AIRPORT_DOMAINS.length; i++) {
      if (url.indexOf(AIRPORT_DOMAINS[i]) !== -1) {
        return AIRPORT_NAMES[AIRPORT_DOMAINS[i]];
      }
    }
    return null;
  }

  function isDownloadLink(url) {
    return /\.(tar\.gz|zip|run|apk|dmg|exe|deb|rpm|AppImage)(\?|$)/i.test(url);
  }

  function getUniclashProvider(url) {
    var cleanUrl = (url || '').split('?')[0].replace(/\/$/, '');
    for (var pageUrl in UNICLASH_DOWNLOAD_PAGES) {
      if (cleanUrl === pageUrl) {
        return UNICLASH_DOWNLOAD_PAGES[pageUrl];
      }
    }
    return null;
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().substring(0, 80);
    var page = document.title;

    var airportName = getAirportName(href);
    if (airportName) {
      gtag('event', 'clash_register_click', {
        airport_name: airportName,
        source_page: page,
        link_url: href,
        link_text: text
      });
      return;
    }

    var uniclashProvider = getUniclashProvider(href);
    if (uniclashProvider) {
      gtag('event', 'uniclash_download_click', {
        provider_name: uniclashProvider,
        source_page: page,
        link_url: href,
        link_text: text
      });
      return;
    }

    if (isDownloadLink(href)) {
      var filename = href.split('/').pop().split('?')[0];
      gtag('event', 'plugin_download', {
        file_name: filename,
        source_page: page,
        link_url: href
      });
      return;
    }

    if (link.hostname && link.hostname !== location.hostname) {
      gtag('event', 'outbound_click', {
        link_url: href,
        link_text: text,
        link_domain: link.hostname,
        source_page: page
      });
      return;
    }

    if (link.classList.contains('cta-btn')) {
      gtag('event', 'cta_click', {
        link_url: href,
        link_text: text,
        source_page: page
      });
      return;
    }

    var path = link.pathname || '';
    if (/^\/pages\//.test(path) && path !== location.pathname) {
      gtag('event', 'cross_page_click', {
        link_url: path,
        link_text: text,
        source_page: page
      });
    }
  });
})();

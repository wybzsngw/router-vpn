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

  // 将当前页面 pathname 归类到一个稳定的 source_module 标识，便于在 GA4 中按"来源页面模块"细分转化漏斗。
  var SOURCE_MODULE_RULES = [
    { pattern: /\/pages\/uniclash-guide/, module: 'uniclash_guide' },
    { pattern: /\/pages\/yangfan-important-notice/, module: 'yangfan_notice' },
    { pattern: /\/pages\/chatgpt-plus-guide/, module: 'chatgpt_plus_guide' },
    { pattern: /\/pages\/openai-api-guide/, module: 'openai_api_guide' },
    { pattern: /\/pages\/chatgpt-guide/, module: 'chatgpt_guide' },
    { pattern: /\/pages\/netflix-guide/, module: 'netflix_guide' },
    { pattern: /\/pages\/clash-for-windows-alternative/, module: 'cfw_alternative' },
    { pattern: /\/pages\/bypass-router-guide/, module: 'bypass_router_guide' },
    { pattern: /\/pages\/asus-router-guide/, module: 'asus_router_guide' },
    { pattern: /\/pages\/soft-router-guide/, module: 'soft_router_guide' },
    { pattern: /\/pages\/istoreos-guide/, module: 'istoreos_guide' },
    { pattern: /\/pages\/windows-guide/, module: 'windows_guide' },
    { pattern: /\/pages\/macos-guide/, module: 'macos_guide' },
    { pattern: /\/pages\/linux-guide/, module: 'linux_guide' },
    { pattern: /\/pages\/mobile-guide/, module: 'mobile_guide' },
    { pattern: /\/clash-subscription-guide/, module: 'subscription_guide' },
    { pattern: /^\/$|\/index\.html$/, module: 'home' }
  ];

  function getSourceModule() {
    var path = (location.pathname || '/').replace(/\/$/, '') || '/';
    for (var i = 0; i < SOURCE_MODULE_RULES.length; i++) {
      if (SOURCE_MODULE_RULES[i].pattern.test(path)) {
        return SOURCE_MODULE_RULES[i].module;
      }
    }
    return 'other';
  }

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
    var sourceModule = getSourceModule();

    // 显式标注 data-feedback 的链接（如 UniClash 机场反馈入口）单独打点，便于评估"内容贡献用户反馈"的能力。
    var feedbackTag = link.getAttribute('data-feedback');
    if (feedbackTag) {
      gtag('event', 'feedback_click', {
        feedback_type: feedbackTag,
        source_page: page,
        source_module: sourceModule,
        link_url: href,
        link_text: text
      });
      return;
    }

    var airportName = getAirportName(href);
    if (airportName) {
      gtag('event', 'clash_register_click', {
        airport_name: airportName,
        source_page: page,
        source_module: sourceModule,
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
        source_module: sourceModule,
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
        source_module: sourceModule,
        link_url: href
      });
      return;
    }

    if (link.hostname && link.hostname !== location.hostname) {
      gtag('event', 'outbound_click', {
        link_url: href,
        link_text: text,
        link_domain: link.hostname,
        source_page: page,
        source_module: sourceModule
      });
      return;
    }

    if (link.classList.contains('cta-btn')) {
      gtag('event', 'cta_click', {
        link_url: href,
        link_text: text,
        source_page: page,
        source_module: sourceModule
      });
      return;
    }

    var path = link.pathname || '';
    if (/^\/pages\//.test(path) && path !== location.pathname) {
      gtag('event', 'cross_page_click', {
        link_url: path,
        link_text: text,
        source_page: page,
        source_module: sourceModule
      });
    }
  });
})();

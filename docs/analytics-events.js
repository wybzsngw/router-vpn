(function() {
  'use strict';
  if (typeof gtag !== 'function') return;

  var AIRPORT_DOMAINS = [
    '/go/yangfan/',
    'ewanwtt.net',
    'j134.net'
  ];

  var AIRPORT_NAMES = {
    '/go/yangfan/': '扬帆云',
    'ewanwtt.net': '尔湾云',
    'j134.net': '疾风云'
  };

  var UNICLASH_DOWNLOAD_PAGES = {
    'https://tusmartchat.com/uniclash.html': '扬帆云',
    'https://tusmartchat.com/uniclash-erwan.html': '尔湾云'
  };

  // 回国加速专题：商业回国加速器 / 回国机场联盟域名白名单。
  // 命中后触发 return_accelerator_click 事件，参数与 clash_register_click 对齐，便于 GA4 漏斗复用。
  // 注：番茄、网易 UU 暂不挂联盟（番茄无开放计划、UU 官方明确个人版不做代理/分销/联盟），
  // 仍可能出现在文章对比表中，但不进入此白名单（即出现仅记 outbound_click，不算转化）。
  var RETURN_ACCELERATOR_DOMAINS = {
    'getmalus.com':    'Malus',
    'kuaifan.co':      '快帆',           // 快帆官网与子域（vip.kuaifan.co、download 等）
    'af.kuaifan.club': '快帆',           // 快帆推广员跳转短链域名
    'transocks.com':   '穿梭 Transocks', // 穿梭推广链接（payment?affiliate-code=）
    'ednovas.org':     'EdNovas 回国机场' // 少数提供回国线路的 Clash 机场（方案 B）
  };

  // 回国加速专题：VPS 服务商联盟（自建党 self-hosted 教程引导用）。
  // 用于"海外 VPS + CN2 GIA 优质回国线路"推荐位，避免国内云服务器违规问题。
  var VPS_AFFILIATE_DOMAINS = {
    'bandwagonhost.com': '搬瓦工 BandwagonHost',
    'dmit.io':           'DMIT'
  };

  // 回国加速专题：海外华人横向联盟（机票/酒店）。
  // 用于回国机票预订引导，仅在 overview / 工具箱 卡片露出，不在主线评测中混杂。
  var TRAVEL_AFFILIATE_DOMAINS = {
    // 'trip.com':       'Trip.com',
    // 'booking.com':    'Booking',
    // 'skyscanner.com': 'Skyscanner',
    // 'agoda.com':      'Agoda'
  };

  // 回国加速专题：海外华人横向联盟（金融/汇款）。
  // 仅导向持牌机构（券商需 SEC/FINRA/SFC 牌照，汇款需 FCA/MSB 牌照）。
  // 涉及金融的文章必须独立成段并加风险提示。
  var FINANCE_AFFILIATE_DOMAINS = {
    // 'futunn.com':       '富途',
    // 'tigerbrokers.com.sg': '老虎证券',
    // 'longbridge.com':   '长桥证券',
    // 'wise.com':         'Wise'
  };

  // 将当前页面 pathname 归类到一个稳定的 source_module 标识，便于在 GA4 中按"来源页面模块"细分转化漏斗。
  var SOURCE_MODULE_RULES = [
    { pattern: /\/pages\/uniclash-guide/, module: 'uniclash_guide' },
    { pattern: /\/pages\/karing-guide/, module: 'karing_guide' },
    { pattern: /\/pages\/jifengyun/, module: 'jifeng_guide' },
    { pattern: /\/pages\/mihomo-party-guide/, module: 'mihomo_party_guide' },
    { pattern: /\/pages\/flclash-guide/, module: 'flclash_guide' },
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
    // 回国加速专题（按文件名前缀归类，便于后续场景页/横评页加入时统一识别）
    { pattern: /\/pages\/return-china-guide/, module: 'return_overview' },
    { pattern: /\/pages\/return-accelerator-comparison/, module: 'return_comparison' },
    { pattern: /\/pages\/return-transocks-guide/, module: 'return_transocks' },
    { pattern: /\/pages\/return-speedin-guide/, module: 'return_speedin' },
    { pattern: /\/pages\/return-fanqie-guide/, module: 'return_fanqie' },
    { pattern: /\/pages\/return-uu-guide/, module: 'return_uu' },
    { pattern: /\/pages\/return-streaming/, module: 'return_streaming' },
    { pattern: /\/pages\/return-music/, module: 'return_music' },
    { pattern: /\/pages\/return-gaming/, module: 'return_gaming' },
    { pattern: /\/pages\/return-office/, module: 'return_office' },
    { pattern: /\/pages\/return-wechat/, module: 'return_wechat' },
    { pattern: /\/pages\/return-self-hosted/, module: 'return_self_hosted' },
    { pattern: /\/pages\/return-clash-rules/, module: 'return_client_rules' },
    // 回国加速场景专题（按事件/赛事独立成页，单独归类便于 GA4 看不同专题的转化差异）
    { pattern: /\/pages\/return-worldcup-2026/, module: 'return_worldcup_2026' },
    // 回国加速客户端配置专题
    { pattern: /\/pages\/shadowrocket-return/, module: 'return_client_shadowrocket' },
    { pattern: /\/pages\/android-return/, module: 'return_client_android' },
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

  // 通过域名字典做包含匹配，命中返回品牌名称。url 已是 a.href（完整 URL），无需再 parse。
  // 用于回国加速专题各类联盟域名识别，统一在主分发器里复用。
  function matchAffiliateName(url, dict) {
    if (!url) return null;
    for (var domain in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, domain) && url.indexOf(domain) !== -1) {
        return dict[domain];
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

  var CLIENT_EVENTS = ['client_download_click', 'client_compare_click', 'client_migration_click'];

  // 客户端矩阵专用事件分发：CFW 替代页与后续 Karing/Mihomo Party/FlClash 页面共用。
  // 命中 data-event=client_* 时单独打点，并在下方主分发器跳过该链接，避免重复上报 outbound/cross_page 等事件。
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[data-event]');
    if (!a) return;
    var ev = a.getAttribute('data-event');
    if (CLIENT_EVENTS.indexOf(ev) === -1) return;
    if (typeof gtag !== 'function') return;
    gtag('event', ev, {
      client_name: a.getAttribute('data-client') || '',
      target_platform: a.getAttribute('data-platform') || '',
      source_module: a.getAttribute('data-source-module') || getSourceModule(),
      link_url: a.href || '',
      link_text: (a.innerText || '').trim().slice(0, 60),
      step: a.getAttribute('data-step') || ''
    });
  });

  // 占位链接（待发布的客户端教程等）拦截：阻止 href="#" 把页面跳到顶部，并把点击意图作为产品信号单独上报，
  // 便于通过 GA4 评估"哪个待发布专题用户最期待"。
  document.addEventListener('click', function(e) {
    var pending = e.target.closest('a[data-pending="true"]');
    if (!pending) return;
    e.preventDefault();
    if (typeof gtag !== 'function') return;
    gtag('event', 'pending_link_click', {
      client_name: pending.getAttribute('data-client') || '',
      source_module: pending.getAttribute('data-source-module') || getSourceModule(),
      source_page: document.title,
      link_text: (pending.innerText || '').trim().slice(0, 60)
    });
  });

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    // 已被客户端矩阵分发器或占位链接拦截器处理过的链接，跳过主分发，避免一次点击触发多条事件。
    if (link.hasAttribute('data-event') && CLIENT_EVENTS.indexOf(link.getAttribute('data-event')) !== -1) return;
    if (link.getAttribute('data-pending') === 'true') return;

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

    // 回国加速专题：四类联盟点击事件分发。命中后直接 return，避免再触发 outbound_click。
    // product_name / vps_brand / travel_brand / finance_brand 等参数与 airport_name 同位置，便于 GA4 报表统一切分。
    var returnAcceleratorName = matchAffiliateName(href, RETURN_ACCELERATOR_DOMAINS);
    if (returnAcceleratorName) {
      gtag('event', 'return_accelerator_click', {
        product_name: returnAcceleratorName,
        source_page: page,
        source_module: sourceModule,
        link_url: href,
        link_text: text
      });
      return;
    }

    var vpsBrand = matchAffiliateName(href, VPS_AFFILIATE_DOMAINS);
    if (vpsBrand) {
      gtag('event', 'vps_affiliate_click', {
        vps_brand: vpsBrand,
        source_page: page,
        source_module: sourceModule,
        link_url: href,
        link_text: text
      });
      return;
    }

    var travelBrand = matchAffiliateName(href, TRAVEL_AFFILIATE_DOMAINS);
    if (travelBrand) {
      gtag('event', 'travel_affiliate_click', {
        travel_brand: travelBrand,
        source_page: page,
        source_module: sourceModule,
        link_url: href,
        link_text: text
      });
      return;
    }

    var financeBrand = matchAffiliateName(href, FINANCE_AFFILIATE_DOMAINS);
    if (financeBrand) {
      gtag('event', 'finance_affiliate_click', {
        finance_brand: financeBrand,
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

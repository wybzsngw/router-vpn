/*
 * 统一中转逻辑（配置驱动）
 * ------------------------------------------------------------------
 * 以后新增 / 修改可中转的机场，只改下面的 PROVIDERS 即可。
 * 每个机场可配置多个入口（官方 + 备用），按顺序探测，命中第一个
 * 可用入口即跳转，并自动带上你的邀请码。url 中的 {code} 会被替换
 * 为该机场的邀请码（可被 ?code= 覆盖）。
 *
 * 机场由 URL 路径推断：/go/<机场标识>/  ——例如 /go/mojie/、/go/naiyun/
 * 也兼容 ?to=<机场标识> 形式（用于本地测试或临时入口）。
 * ------------------------------------------------------------------
 */
(function () {
  var PROVIDERS = {
    naiyun: {
      title: "奈云",
      defaultCode: "rxkbocWK",
      // 奈云官方用泛域名 *.nygo.cc / *.nyigo.cc 抗封锁（官方优选页 v2ny.co 会随机生成前缀，
      // 故每次落地的具体地址不同）。这里固定用 www 前缀的稳定泛域名 + www.nyaff.cc 兜底，
      // 不要写死随机前缀（随机前缀只是泛解析的一次性结果，不应硬编码）。
      entries: [
        { name: "官方入口",   probe: "https://www.nygo.cc/",   url: "https://www.nygo.cc/#/auth/register?code={code}" },
        { name: "备用入口 A", probe: "https://www.nyigo.cc/",  url: "https://www.nyigo.cc/#/auth/register?code={code}" },
        { name: "备用入口 B", probe: "https://www.nyaff.cc/",  url: "https://www.nyaff.cc?path=register&code={code}" }
      ]
    },
    dage: {
      title: "大哥云",
      defaultCode: "1CAfWNQC",
      entries: [
        { name: "官方入口",   probe: "https://dageyun.net/",   url: "https://dageyun.net/#/register?code={code}" },
        { name: "备用入口 A", probe: "https://a03.dgy02.com/", url: "https://a03.dgy02.com/#/register?code={code}" }
      ]
    },
    yangfan: {
      title: "扬帆云",
      defaultCode: "BnJcjUjE",
      // 2026-06 实测：a04.yfyn01.net/register?code=... 和 yangfanhome.com 入口已出现 Chrome 红标，
      // 不再作为自动跳转目标。以下入口来自当前可用的扬帆云入口页，本站定期维护。
      entries: [
        { name: "官方入口",   probe: "https://yfsite.net/invite",             url: "https://yfsite.net/invite?code={code}" },
        { name: "备用入口 A", probe: "https://ml.yangfan618.net/dashboard",   url: "https://ml.yangfan618.net/invite?code={code}" },
        { name: "备用入口 B", probe: "https://yfsite.net/register",          url: "https://yfsite.net/register?code={code}" }
      ]
    },
    erwan: {
      title: "尔湾云",
      defaultCode: "EGi8tb",
      // erwanfind.net 为官方后台公告推荐的防失联备用域名。
      entries: [
        { name: "官方入口",   probe: "https://ewanwtt.net/",   url: "https://ewanwtt.net/auth/register?code={code}" },
        { name: "备用入口 A", probe: "https://erwanfind.net/", url: "https://erwanfind.net/auth/register?code={code}" }
      ]
    },
    jifeng: {
      title: "疾风云",
      defaultCode: "1p7r",
      // 备用薄弱：目前仅 j134.net 一个官方域名实测稳定可用，后续拿到官方备用域名再补。
      entries: [
        { name: "官方入口", probe: "https://j134.net/", url: "https://j134.net/?code={code}" }
      ]
    },
    lanpang: {
      title: "蓝胖云",
      defaultCode: "30Y2Sexl",
      // Xboard 面板，注册路由 /#/register?code=
      entries: [
        { name: "官方入口",   probe: "https://u.lanpangyun.de/",   url: "https://u.lanpangyun.de/#/register?code={code}" },
        { name: "备用入口 A", probe: "https://lanpangyun.de/",     url: "https://lanpangyun.de/#/register?code={code}" },
        { name: "备用入口 B", probe: "https://www.lanpangyun.de/", url: "https://www.lanpangyun.de/#/register?code={code}" }
      ]
    },
    mojie: {
      title: "魔戒",
      defaultCode: "ItS1igEf",
      // 2026-06 实测：mojie.co/register?aff=... 已被 Chrome 安全页标记为危险入口，
      // 不再作为自动跳转目标。以下入口来自「魔戒.net」（xn--xnun88j.net）官方发布页，
      // 由本站定期维护；用户点击本站入口后仍直接进入带 aff 的注册页，不需要自行选择入口。
      entries: [
        { name: "官方入口",   probe: "https://47.242.128.61:8000/", url: "https://47.242.128.61:8000/#/register?aff={code}" },
        { name: "备用入口 A", probe: "https://47.112.97.173:5000/", url: "https://47.112.97.173:5000/#/register?aff={code}" },
        { name: "备用入口 B", probe: "https://mojie.host/",          url: "https://mojie.host/#/register?aff={code}" }
      ]
    }
  };

  var PROBE_TIMEOUT_MS = 2800;

  function detectAirport() {
    var q = new URLSearchParams(window.location.search).get("to");
    if (q) return q.trim().toLowerCase();
    var parts = window.location.pathname
      .replace(/\/index\.html$/i, "")
      .split("/")
      .filter(Boolean);
    return (parts[parts.length - 1] || "").toLowerCase();
  }

  function buildUrl(tpl, code) {
    return tpl.replace("{code}", encodeURIComponent(code));
  }

  function mountUI() {
    document.body.innerHTML =
      '<main class="panel" aria-live="polite">' +
      '  <div class="brand"><img class="brand-logo" src="/favicon.svg" width="22" height="22" alt="" />AI小白网络指南 · aixiaobai168.com</div>' +
      '  <h1 id="title">正在为你打开官方注册页</h1>' +
      '  <p class="sub">我们会从已维护的<strong>官方入口</strong>中选择当前可访问的一条，稍后前往服务商官网。</p>' +
      '  <div class="spinner" aria-hidden="true"></div>' +
      '  <p class="status" id="status">正在确认官方入口是否可访问…</p>' +
      '  <div class="list" id="manual-links"></div>' +
      '  <p class="note">为什么会有这一步？部分服务商官网域名会临时调整，本页由「<strong>AI小白网络指南</strong>」（aixiaobai168.com）整理常用官方入口，只负责帮你打开可访问的服务商官网。下方会显示即将前往的官方地址，自动打开失败时也可以手动选择。</p>' +
      "</main>";
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (_, reject) {
        setTimeout(function () { reject(new Error("timeout")); }, ms);
      })
    ]);
  }

  function probe(url) {
    return withTimeout(
      fetch(url, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        redirect: "follow",
        referrerPolicy: "no-referrer"
      }),
      PROBE_TIMEOUT_MS
    );
  }

  function start() {
    mountUI();

    var statusEl = document.getElementById("status");
    var manualEl = document.getElementById("manual-links");

    function setStatus(text) { statusEl.textContent = text; }

    var to = detectAirport();
    var codeOverride = (new URLSearchParams(window.location.search).get("code") || "").trim();
    var provider = PROVIDERS[to];

    if (!provider) {
      setStatus("未指定有效的机场入口。");
      var keys = Object.keys(PROVIDERS).map(function (k) {
        return '<div class="row"><a href="/go/' + k + '/">' + PROVIDERS[k].title + "（/go/" + k + "/）</a></div>";
      }).join("");
      manualEl.innerHTML = '<div class="hd warn">可用入口：</div>' + keys;
      manualEl.style.display = "block";
      return;
    }

    var code = codeOverride || provider.defaultCode;
    var titleEl = document.getElementById("title");
    if (titleEl) titleEl.textContent = "正在为你打开「" + provider.title + "」官方注册页";
    document.title = provider.title + " - 正在打开官方注册页";

    function renderManualLinks(headClass, headText) {
      var rows = provider.entries.map(function (item) {
        var u = buildUrl(item.url, code);
        return '<div class="row"><a href="' + u + '" target="_self" rel="noopener">' + item.name + "：" + u + "</a></div>";
      }).join("");
      manualEl.innerHTML = '<div class="hd ' + headClass + '">' + headText + "</div>" + rows;
      manualEl.style.display = "block";
    }

    function jump(url) {
      setStatus("已确认可用，正在前往服务商官网...");
      setTimeout(function () { window.location.replace(url); }, 240);
    }

    (async function run() {
      renderManualLinks("warn", "稍后会自动前往官网；如未打开，也可手动选择以下官方入口：");
      for (var i = 0; i < provider.entries.length; i++) {
        var current = provider.entries[i];
        setStatus("正在确认 " + current.name + " 是否可访问...");
        try {
          await probe(current.probe);
          renderManualLinks("ok", "可用入口已确认，如未自动打开可手动选择：");
          jump(buildUrl(current.url, code));
          return;
        } catch (err) { /* 该入口不可用，继续探测下一个 */ }
      }
      setStatus("暂时无法完成确认，正在尝试打开默认官方入口...");
      jump(buildUrl(provider.entries[0].url, code));
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

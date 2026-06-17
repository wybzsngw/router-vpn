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
      entries: [
        { name: "官方入口",   probe: "https://www.nyaff.cc/",      url: "https://www.nyaff.cc?path=register&code={code}" },
        { name: "备用入口 A", probe: "https://0g116uhy.nyigo.cc/", url: "https://0g116uhy.nyigo.cc/#/auth/register?code={code}" },
        { name: "备用入口 B", probe: "https://anyaff.cc/",         url: "https://anyaff.cc?path=register&code={code}" }
      ]
    },
    mojie: {
      title: "魔戒",
      defaultCode: "ItS1igEf",
      entries: [
        { name: "官方入口",   probe: "https://mojie.co/",   url: "https://mojie.co/register?aff={code}" },
        { name: "备用入口 A", probe: "https://mojie.app/",  url: "https://mojie.app/register?aff={code}" },
        { name: "备用入口 B", probe: "https://mojie.host/", url: "https://mojie.host/register?aff={code}" }
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
      '  <h1>安全检查</h1>' +
      '  <p class="sub">请稍作等待，正在为您选择最优入口...</p>' +
      '  <div class="spinner" aria-hidden="true"></div>' +
      '  <p class="status" id="status">初始化中...</p>' +
      '  <div class="list" id="manual-links"></div>' +
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
    document.title = provider.title + " - 正在为您选择最优节点";

    function renderManualLinks(headClass, headText) {
      var rows = provider.entries.map(function (item) {
        var u = buildUrl(item.url, code);
        return '<div class="row"><a href="' + u + '" target="_self" rel="noopener">' + item.name + "：" + u + "</a></div>";
      }).join("");
      manualEl.innerHTML = '<div class="hd ' + headClass + '">' + headText + "</div>" + rows;
      manualEl.style.display = "block";
    }

    function jump(url) {
      setStatus("入口可用，正在跳转...");
      setTimeout(function () { window.location.replace(url); }, 240);
    }

    (async function run() {
      renderManualLinks("warn", "若自动跳转失败，可手动点击以下入口：");
      for (var i = 0; i < provider.entries.length; i++) {
        var current = provider.entries[i];
        setStatus("正在检测 " + current.name + " ...");
        try {
          await probe(current.probe);
          renderManualLinks("ok", "已检测到可用入口，若未自动跳转可手动点击：");
          jump(buildUrl(current.url, code));
          return;
        } catch (err) { /* 该入口不可用，继续探测下一个 */ }
      }
      setStatus("自动检测未命中，正在尝试默认入口...");
      jump(buildUrl(provider.entries[0].url, code));
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

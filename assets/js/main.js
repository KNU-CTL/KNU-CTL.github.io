/* =====================================================================
   KNU Coding Theory Team — 화면 그리기 (한국어·영어 공용, v6)
   내용은 content/*.json 에 있고, Pages CMS(app.pagescms.org)에서 양식으로 고칩니다.
   이 파일은 고칠 필요가 거의 없습니다.
   언어: <html lang="ko"> 이면 한국어(맨 위 폴더), lang="en" 이면 영어(en/ 폴더).
   ===================================================================== */
(function () {
  "use strict";
  var LANG = document.documentElement.lang === "en" ? "en" : "ko";
  var BASE = LANG === "ko" ? "../" : "";   /* 영어판은 맨 위, 한국어판은 ko/ (2026. 10. 6.) */
  var page = document.body.getAttribute("data-page") || "home";
  var D = {};   /* 불러온 내용: site, research, people, publications, seminar, news, digest */

  /* ---------- 고정 문구 ---------- */
  var UI = {
    ko: {
      kicker: "강원대학교 수학과 부호이론 연구팀", toResearch: "연구 분야 보기 →", toJoin: "함께하기 →",
      about: "연구팀 소개", areas: "연구 분야", more: "자세히 보기 →", news: "최근 소식", allNews: "뉴스레터 전체 보기 →",
      cats: { seminar: "세미나", talk: "학회 발표", paper: "논문 게재", patent: "특허", news: "소식" },
      newsLead: "연구팀의 세미나, 학회 발표, 논문 게재 소식을 달마다 모아 전합니다.",
      digestLead: "Research Digest: 연구 분야의 새 소식과 함께 읽을 논문을 골라 소개합니다.",
      dcats: { all: "전체", news: "연구 뉴스", paper: "논문 소개" }, digestBack: "← 연구 동향 목록", source: "출처", aiNote: "이 뉴스레터는 AI가 수집하여 구성한 것입니다.",
      issue: function (y, m) { return y + "년 " + m + "월호"; }, items: function (n) { return n + "건"; },
      back: "← 뉴스레터 목록", notFound: "소식을 찾을 수 없습니다.",
      researchLead: "대수적 부호이론을 바탕으로 네 갈래의 연구를 하고, 학생이 관심 있는 주제도 함께 연구합니다.", demo: "체험: VT 부호로 사라진 한 비트 되찾기",
      peopleLead: "함께 공부하고 연구하는 사람들입니다.",
      roles: { pi: "책임교수", postdoc: "박사후연구원", grad: "대학원생", undergrad: "학부연구생", alumni: "졸업생" },
      pos: { pi: "책임교수", postdoc: "박사후연구원", ms: "석사과정", phd: "박사과정", grad: "대학원생", undergrad: "학부연구생", alumni: "졸업생" },
      pubLead: "연구팀의 학술지 논문, 학술대회 발표, 특허, 연구과제, 수상입니다.",
      pubTypes: { all: "전체", journal: "학술지", conference: "학술대회 발표", patent: "특허", grant: "연구과제", award: "수상" },
      example: "예시 항목", none: "아직 등록된 항목이 없습니다.",
      semLead: "매주 네 차례 정규 세미나를 엽니다. 발표 내용과 자료는 연구팀 안에서 공유합니다.",
      when: "언제", where: "어디서", period: "기간", every: function (w) { return "매주 " + "일월화수목금토"[w] + "요일"; },
      prev: "‹ 이전 달", next: "다음 달 ›", today: "이번 달", dows: ["일", "월", "화", "수", "목", "금", "토"],
      monthTitle: function (y, m) { return y + "년 " + (m + 1) + "월"; }, monthEvents: "이달의 발표·행사", noEvents: "이달에는 등록된 발표가 없습니다.",
      cancelled: "휴강", talks: function (n) { return "발표 " + n + "명"; },
      dateFmt: function (d) { return (d.getMonth() + 1) + "월 " + d.getDate() + "일 (" + "일월화수목금토"[d.getDay()] + ")"; },
      longDate: function (s) { var a = s.split("-"); return a[0] + "년 " + (+a[1]) + "월 " + (+a[2]) + "일"; },
      joinLead: "학부연구생과 대학원생을 모집합니다.", mail: "메일로 문의하기",
      steps: [["세미나", "정규 세미나에서 논문을 읽고 발표합니다. 발표 자료는 LaTeX(Beamer)로 만들어 연구팀 안에서 공유합니다."],
              ["계산", "Python·Magma·SageMath로 작은 부호를 직접 계산하고, 결과를 전수 검사로 확인합니다."],
              ["정리와 발표", "결과를 짧은 노트로 정리해 워크숍·학회에서 발표하고, 논문으로 발전시킵니다."]],
      nav: { home: "홈", research: "연구 분야", people: "구성원", publications: "연구 실적", seminars: "세미나", news: "소식", digest: "연구 동향", join: "참여 안내" },
      lang: "EN", langTitle: "English", loadFail: "내용을 불러오지 못했습니다. 홈페이지를 웹 서버(GitHub Pages 등)에서 열어 주세요.",
      d: { label: "이진어 x를 입력하세요 (길이 2–16)", code: "Varshamov–Tenengolts 부호 ", text: '는 한 비트가 사라져도 원래 단어를 되찾습니다. 아래에서 <b>지울 비트를 누르세요</b>.',
           two: "두 비트 이상 입력하세요.", mod: "법", del: function (i, b) { return i + "번째 비트(" + b + ")를 지운 수신어  y = "; },
           dec: "복호", got: "되찾은 단어       x̂ = ", same: "✓ 원래 단어와 같음", tryIt: "위의 비트 하나를 눌러 지워 보세요.",
           bit: function (i) { return i + "번째 비트 지우기"; } }
    },
    en: {
      kicker: "Department of Mathematics, Kangwon National University", toResearch: "Our research →", toJoin: "Join us →",
      about: "About", areas: "Research Areas", more: "Learn more →", news: "Recent News", allNews: "All newsletters →",
      cats: { seminar: "Seminar", talk: "Talk", paper: "Publication", patent: "Patent", news: "News" },
      newsLead: "Monthly news from the team: seminars, conference talks, and publications.",
      digestLead: "Research news from our fields and papers worth reading, selected by the team.",
      dcats: { all: "All", news: "Research News", paper: "Paper Picks" }, digestBack: "← All digest posts", source: "Source", aiNote: "This newsletter was collected and compiled by AI.",
      issue: function (y, m) { return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1] + " " + y; },
      items: function (n) { return n + (n === 1 ? " item" : " items"); },
      back: "← All newsletters", notFound: "News item not found.",
      researchLead: "Grounded in algebraic coding theory, our research has four directions, and we also welcome topics of students' own interest.", demo: "Try it: recover a lost bit with a VT code",
      peopleLead: "The people who study and do research together.",
      roles: { pi: "Principal Investigator", postdoc: "Postdoctoral Researchers", grad: "Graduate Students", undergrad: "Undergraduate Researchers", alumni: "Alumni" },
      pos: { pi: "Principal Investigator", postdoc: "Postdoctoral Researcher", ms: "M.S. Student", phd: "Ph.D. Student", grad: "Graduate Student", undergrad: "Undergraduate Researcher", alumni: "Alumni" },
      pubLead: "Journal articles, talks, patents, grants, and awards from the team.",
      pubTypes: { all: "All", journal: "Journal Articles", conference: "Talks", patent: "Patents", grant: "Grants and Fellowships", award: "Awards" },
      example: "example entry", none: "No entries yet.",
      semLead: "We hold four regular seminars every week. Talk contents and slides are shared within the team.",
      when: "When", where: "Where", period: "Period", every: function (w) { return "Every " + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][w]; },
      prev: "‹ Prev", next: "Next ›", today: "This month", dows: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthTitle: function (y, m) { return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m] + " " + y; },
      monthEvents: "Talks and events this month", noEvents: "No talks registered this month.", cancelled: "No seminar", talks: function (n) { return n + (n === 1 ? " talk" : " talks"); },
      dateFmt: function (d) { return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()] + ", " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()] + " " + d.getDate(); },
      longDate: function (s) { var a = s.split("-"); return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][+a[1] - 1] + " " + (+a[2]) + ", " + a[0]; },
      joinLead: "We are recruiting undergraduate researchers and graduate students.", mail: "Contact us by email",
      steps: [["Seminars", "Read and present papers in the regular seminar. Slides are made with LaTeX (Beamer) and shared within the team."],
              ["Computation", "Compute small codes with Python, Magma, and SageMath, and verify results by exhaustive checks."],
              ["Write-up & talks", "Summarize results in short notes, present them at workshops and conferences, and develop them into papers."]],
      nav: { home: "Home", research: "Research", people: "People", publications: "Publications", seminars: "Seminars", news: "News", digest: "Digest", join: "Join" },
      lang: "한국어", langTitle: "한국어 페이지", loadFail: "Could not load the content. Please open the site from a web server (e.g. GitHub Pages).",
      d: { label: "Enter a binary word x (length 2–16)", code: "The Varshamov–Tenengolts code ", text: ' recovers the original word even if one bit is deleted. <b>Click a bit below to delete it</b>.',
           two: "Enter at least two bits.", mod: "modulus", del: function (i, b) { return "Delete bit " + i + " (" + b + "), received  y = "; },
           dec: "Decoding", got: "Recovered word    x̂ = ", same: "✓ equals the original word", tryIt: "Click one of the bits above to delete it.",
           bit: function (i) { return "Delete bit " + i; } }
    }
  }[LANG];

  /* ---------- 도구 ---------- */
  function T(o, k) { return o ? (o[k + "_" + LANG] || o[k + "_ko"] || o[k] || "") : ""; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function media(p) { if (!p) return ""; return /^https?:\/\//.test(p) ? p : BASE + String(p).replace(/^\//, ""); }
  function pName(p) { return LANG === "en" && p.name_en && p.name_en !== "TODO" ? p.name_en : p.name; }
  function initials(p) {  /* 한글 판은 한글 이름, 영문 판은 영문 이름으로 */
    var n = pName(p);
    if (/^[A-Za-z]/.test(n)) return n.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
    return /\s/.test(n) ? n.split(/\s+/)[0].slice(0, 2) : (n.length === 3 ? n.slice(1) : n.slice(-2));
  }
  function areaTitle(id) { for (var i = 0; i < D.research.length; i++) if (D.research[i].id === id) return T(D.research[i], "title"); return id || ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function newsSorted() { return (D.news || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }); }

  /* 로고: assets/img/1.png(교수님 제공, 왼쪽 그림 부분만 잘라 보임) */
  var MENU = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';

  /* ---------- 머리말·꼬리말 ---------- */
  var NAV = [["index.html", "home", "Home"], ["research.html", "research", "Research"], ["people.html", "people", "People"],
             ["publications.html", "publications", "Publications"], ["seminars.html", "seminars", "Seminars"],
             ["news.html", "news", "News"], ["digest.html", "digest", "Digest"], ["join.html", "join", "Join"]];
  function otherLang() {
    var f = location.pathname.split("/").pop() || "index.html";
    if (!/\.html$/.test(f)) f = "index.html";
    return (LANG === "ko" ? "../" : "ko/") + f + location.search;
  }
  function header() {
    return '<div class="container nav"><a class="brand" href="index.html"><span class="brand-logo"><img src="' + BASE + 'assets/img/1.png" alt=""></span>KNU Coding Theory Team</a>' +
      '<div class="nav-right"><ul class="nav-links" id="navLinks">' +
      NAV.map(function (n) { return '<li><a href="' + n[0] + '"' + (n[1] === page ? ' class="active"' : "") + '>' + esc(UI.nav[n[1]] || n[2]) + '</a></li>'; }).join("") +
      '</ul><a class="tool-btn" href="' + otherLang() + '" title="' + esc(UI.langTitle) + '">' + esc(UI.lang) + '</a>' +
      '<button class="tool-btn menu-btn" id="menuBtn" aria-label="menu">' + MENU + '</button></div></div>';
  }
  function footer() {
    var s = D.site || {};
    return '<div class="container footer-grid"><div><b>' + esc(s.name || "KNU Coding Theory Team") + '</b><br>' + esc(T(s, "affiliation")) + '<br>' + esc(T(s, "address")) + '</div>' +
      '<div>' + (s.email ? '<a href="mailto:' + esc(s.email) + '">' + esc(s.email) + '</a><br>' : "") +
      '© ' + new Date().getFullYear() + ' KNU Coding Theory Team</div></div>';
  }

  /* ---------- 공통 조각 ---------- */
  function sectionHead(title, link) { return '<div class="section-head"><h2 class="title">' + esc(title) + '</h2>' + (link || "") + '</div>'; }
  function pageHead(title, lead) { return '<section class="page-head"><div class="container"><h1>' + esc(title) + '</h1><p class="lead">' + esc(lead) + '</p></div></section>'; }
  function heroFigure() {
    function link(id, cls, svg) {
      var r = D.research.filter(function (x) { return x.id === id; })[0];
      return '<a class="fig ' + cls + '" href="research.html#' + id + '" title="' + esc(r ? T(r, "title") : "") + '">' + svg + '</a>';
    }
    /* 그림: 위키미디어 공용의 퍼블릭 도메인(CC0) 그림. 출처는 README 7절 */
    function img(f) { return '<img src="' + BASE + 'assets/img/' + f + '" alt="">'; }
    return '<div class="hero-figure">' + link("coding", "fig-cube", img("Numbered_3-cube_on_side.svg")) +
      link("quantum", "fig-bloch", img("Yet_another_Bloch_sphere.svg")) + link("dna", "fig-dna", img("DNA_simple2.svg")) + '</div>';
  }
  function newsCard(n) {
    var cover = n.cover ? '<img class="cover" src="' + esc(media(n.cover)) + '" alt="">' : "";
    return '<a class="nl-card" href="news.html?id=' + encodeURIComponent(n.id) + '">' + cover +
      '<div class="meta"><b>' + esc(UI.cats[n.category] || n.category) + '</b>' + esc(UI.longDate(n.date)) + '</div>' +
      '<h3>' + esc(T(n, "title")) + '</h3><p>' + esc(T(n, "summary")) + '</p></a>';
  }

  /* ---------- 홈 ---------- */
  function renderHome() {
    var s = D.site;
    $("#app").innerHTML =
      '<section class="hero"><div class="container hero-inner"><div>' +
      '<p class="kicker">' + esc(UI.kicker) + '</p><h1>KNU Coding Theory Team</h1><p class="tagline">' + esc(T(s, "tagline")) + '</p>' +
      '<div class="hero-links"><a href="research.html">' + esc(UI.toResearch) + '</a><a href="join.html">' + esc(UI.toJoin) + '</a></div>' +
      '</div>' + heroFigure() + '</div></section>' +
      '<section class="block"><div class="container">' + sectionHead(UI.about) + '<p class="prose">' + esc(T(s, "intro")) + '</p></div></section>' +
      '<section class="block"><div class="container">' + sectionHead(UI.areas, '<a href="research.html">' + esc(UI.more) + '</a>') +
      '<div class="areas">' + D.research.map(function (r, i) {
        return '<div class="area"><div class="num">0' + (i + 1) + '</div><h3><a href="research.html#' + esc(r.id) + '" style="color:inherit">' + esc(T(r, "title")) + '</a></h3><p>' + esc(T(r, "short")) + '</p></div>';
      }).join("") + '</div></div></section>' +
      '<section class="block"><div class="container">' + sectionHead(UI.news, '<a href="news.html">' + esc(UI.allNews) + '</a>') +
      '<div class="cards">' + newsSorted().slice(0, 3).map(newsCard).join("") + '</div></div></section>';
  }

  /* ---------- 뉴스레터 ---------- */
  function renderNews() {
    var id = new URLSearchParams(location.search).get("id");
    if (id) return renderArticle(id);
    var groups = [], key = null;
    newsSorted().forEach(function (n) {
      var k = n.date.slice(0, 7);
      if (k !== key) { groups.push({ k: k, items: [] }); key = k; }
      groups[groups.length - 1].items.push(n);
    });
    $("#app").innerHTML = pageHead(LANG === "ko" ? UI.nav.news : "News", UI.newsLead) + '<section class="block" style="padding-top:8px"><div class="container">' +
      groups.map(function (g) {
        var a = g.k.split("-");
        return '<div class="issue"><div class="issue-head"><h2>' + esc(UI.issue(+a[0], +a[1])) + '</h2><span>' + esc(UI.items(g.items.length)) + '</span></div>' +
          '<div class="cards">' + g.items.map(newsCard).join("") + '</div></div>';
      }).join("") + '</div></section>';
  }
  /* ---------- Research Digest: 연구 동향과 관련 논문 (content/digest.json) ---------- */
  function digestSorted() { return (D.digest || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }); }
  function digestLinks(n) {
    var b = [];
    if (n.link) b.push('<a href="' + esc(n.link) + '">LINK</a>');
    if (n.pdf) b.push('<a href="' + esc(media(n.pdf)) + '">PDF</a>');
    return b.length ? '<div class="pub-btns">' + b.join("") + '</div>' : "";
  }
  function digestCard(n) {
    var cover = n.cover ? '<img class="cover" src="' + esc(media(n.cover)) + '" alt="">' : "";
    return '<a class="nl-card" href="digest.html?id=' + encodeURIComponent(n.id) + '">' + cover +
      '<div class="meta"><b>' + esc(UI.dcats[n.category] || n.category) + '</b>' + esc(UI.longDate(n.date)) + '</div>' +
      '<h3>' + esc(T(n, "title")) + '</h3><p>' + esc(T(n, "summary")) + '</p>' +
      (n.source ? '<p class="src">' + esc(n.source) + '</p>' : "") + '</a>';
  }
  function renderDigest() {
    var id = new URLSearchParams(location.search).get("id");
    if (id) return renderDigestArticle(id);
    var order = ["all", "news", "paper"];
    $("#app").innerHTML = pageHead(LANG === "ko" ? "연구 동향" : "Research Digest", UI.digestLead) +
      '<section class="block" style="padding-top:0"><div class="container"><div class="filters" id="dgFilters">' +
      order.map(function (k) { return '<button class="chip' + (k === "all" ? " active" : "") + '" data-t="' + k + '">' + esc(UI.dcats[k]) + '</button>'; }).join("") +
      '</div><div id="dgList"></div></div></section>';
    function draw(t) {
      var L = digestSorted().filter(function (n) { return t === "all" || n.category === t; });
      $("#dgList").innerHTML = L.length ? '<div class="cards">' + L.map(digestCard).join("") + '</div>' : '<div class="empty">' + esc(UI.none) + '</div>';
    }
    $$("#dgFilters .chip").forEach(function (c) {
      c.addEventListener("click", function () { $$("#dgFilters .chip").forEach(function (d) { d.classList.remove("active"); }); c.classList.add("active"); draw(c.getAttribute("data-t")); });
    });
    draw("all");
  }
  function renderDigestArticle(id) {
    var n = (D.digest || []).filter(function (x) { return x.id === id; })[0];
    if (!n) { $("#app").innerHTML = '<div class="container article"><a class="back" href="digest.html">' + esc(UI.digestBack) + '</a><p class="loading">' + esc(UI.notFound) + '</p></div>'; return; }
    document.title = T(n, "title") + " | KNU Coding Theory Team";
    $("#app").innerHTML = '<div class="container"><article class="article"><a class="back" href="digest.html">' + esc(UI.digestBack) + '</a>' +
      '<p class="ai-note">' + esc(UI.aiNote) + '</p>' +
      '<div class="meta"><b>' + esc(UI.dcats[n.category] || n.category) + '</b>' + esc(UI.longDate(n.date)) + '</div>' +
      '<h1>' + esc(T(n, "title")) + '</h1>' + (T(n, "summary") ? '<p class="summary">' + esc(T(n, "summary")) + '</p>' : "") +
      (n.source ? '<p class="src">' + esc(UI.source) + ': ' + esc(n.source) + '</p>' : "") + digestLinks(n) +
      (n.cover ? '<img class="cover" src="' + esc(media(n.cover)) + '" alt="">' : "") +
      '<div class="body">' + (T(n, "body") || "") + '</div></article></div>';
    $$(".article .body img").forEach(function (im) { var s = im.getAttribute("src"); if (s && !/^https?:|^data:/.test(s)) im.setAttribute("src", media(s)); });
  }

  function renderArticle(id) {
    var n = (D.news || []).filter(function (x) { return x.id === id; })[0];
    if (!n) { $("#app").innerHTML = '<div class="container article"><a class="back" href="news.html">' + esc(UI.back) + '</a><p class="loading">' + esc(UI.notFound) + '</p></div>'; return; }
    document.title = T(n, "title") + " | KNU Coding Theory Team";
    /* 본문은 Pages CMS의 rich-text(HTML)로 연구팀 구성원만 씁니다. */
    $("#app").innerHTML = '<div class="container"><article class="article"><a class="back" href="news.html">' + esc(UI.back) + '</a>' +
      '<div class="meta"><b>' + esc(UI.cats[n.category] || n.category) + '</b>' + esc(UI.longDate(n.date)) + '</div>' +
      '<h1>' + esc(T(n, "title")) + '</h1>' + (T(n, "summary") ? '<p class="summary">' + esc(T(n, "summary")) + '</p>' : "") +
      (n.cover ? '<img class="cover" src="' + esc(media(n.cover)) + '" alt="">' : "") +
      '<div class="body">' + (T(n, "body") || "") + '</div></article></div>';
    $$(".article .body img").forEach(function (im) { var s = im.getAttribute("src"); if (s && !/^https?:|^data:/.test(s)) im.setAttribute("src", media(s)); });
  }

  /* ---------- 연구 ---------- */
  function renderResearch() {
    $("#app").innerHTML = pageHead(LANG === "ko" ? UI.nav.research : "Research", UI.researchLead) +
      '<section class="block" style="padding-top:8px"><div class="container">' + D.research.map(function (r, i) {
        var other = LANG === "en" ? r.title_ko : r.title_en;
        return '<div class="area-detail" id="' + esc(r.id) + '"><div><div class="num">0' + (i + 1) + '</div><h2>' + esc(T(r, "title")) + '</h2><div class="sub">' + esc(other) + '</div></div>' +
          '<div>' + T(r, "detail").split(/\n\s*\n/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") +
          '<div class="keywords">' + (r.keywords || []).map(function (k) { return '<span>' + esc(k) + '</span>'; }).join("") + '</div></div></div>';
      }).join("") + '</div></section>' +
      '<section class="block"><div class="container">' + sectionHead(UI.demo) + vtDemo() + '</div></section>';
    initDemo();
  }

  /* ---------- VT 부호 체험 ---------- */
  function vtDemo() {
    var Dm = UI.d;
    return '<div class="demo" id="demo"><div><label for="vtInput">' + esc(Dm.label) + '</label>' +
      '<input type="text" id="vtInput" value="101101" maxlength="16" spellcheck="false" autocomplete="off">' +
      '<p>' + esc(Dm.code) + '<span class="mono">VT<sub>a</sub>(n) = { x : Σ i·x<sub>i</sub> ≡ a (mod n+1) }</span>' + Dm.text + '</p>' +
      '<div class="bitrow" id="vtBits"></div></div><div><div class="calc" id="vtCalc"></div></div></div>';
  }
  function vtChecksum(x) { var s = 0; for (var i = 0; i < x.length; i++) s += (i + 1) * x[i]; return s; }
  /* Levenshtein–VT 복호: y(길이 n-1), 길이 n, 나머지 a → x */
  function vtDecode(y, n, a) {
    var w = 0, i, pos;
    for (i = 0; i < y.length; i++) w += y[i];
    var S = ((a - vtChecksum(y)) % (n + 1) + (n + 1)) % (n + 1);
    if (S <= w) {               /* 0이 지워짐: 오른쪽에 1이 정확히 S개 있는 자리에 0을 넣는다 */
      var ones = 0;
      for (pos = y.length; pos >= 0; pos--) { if (ones === S) return y.slice(0, pos).concat([0], y.slice(pos)); ones += y[pos - 1]; }
    } else {                    /* 1이 지워짐: 왼쪽에 0이 정확히 S-w-1개 있는 자리에 1을 넣는다 */
      var z = S - w - 1, zeros = 0;
      for (pos = 0; pos <= y.length; pos++) { if (zeros === z) return y.slice(0, pos).concat([1], y.slice(pos)); zeros += 1 - y[pos]; }
    }
    return null;
  }
  function initDemo() {
    var inp = $("#vtInput"); if (!inp) return;
    var del = -1, Dm = UI.d;
    function draw() {
      var raw = inp.value.replace(/[^01]/g, "").slice(0, 16); if (raw !== inp.value) inp.value = raw;
      var x = raw.split("").map(Number), n = x.length, calc = $("#vtCalc"), bits = $("#vtBits");
      if (n < 2) { bits.innerHTML = ""; calc.innerHTML = Dm.two; return; }
      if (del >= n) del = -1;
      bits.innerHTML = x.map(function (b, i) {
        return '<div class="bit' + (b ? " one" : "") + '" data-i="' + i + '" title="' + esc(Dm.bit(i + 1)) + '"' + (i === del ? ' style="opacity:.25;text-decoration:line-through"' : "") + '>' + b + '<small>' + (i + 1) + '</small></div>';
      }).join("");
      var terms = [], i; for (i = 0; i < n; i++) if (x[i]) terms.push(i + 1);
      var cs = vtChecksum(x), a = cs % (n + 1);
      var out = "n = " + n + ",  " + Dm.mod + " n+1 = " + (n + 1) + "\nΣ i·x_i = " + (terms.length ? terms.join(" + ") : "0") + " = " + cs +
        "\na = " + cs + " mod " + (n + 1) + " = " + a + "   →  x ∈ VT_" + a + "(" + n + ")\n";
      if (del >= 0) {
        var y = x.slice(0, del).concat(x.slice(del + 1)), r = vtDecode(y, n, a);
        out += "\n" + Dm.del(del + 1, x[del]) + y.join("") + "\n" + Dm.dec + ": w = " + y.reduce(function (p, q) { return p + q; }, 0) +
          ", S = (a − Σ i·y_i) mod " + (n + 1) + " = " + (((a - vtChecksum(y)) % (n + 1)) + (n + 1)) % (n + 1) + "\n" +
          Dm.got + (r ? r.join("") : "?") + "   " + (r && r.join("") === raw ? '<span class="result-ok">' + Dm.same + '</span>' : "✗");
      } else out += "\n" + Dm.tryIt;
      calc.innerHTML = out.replace(/\n/g, "<br>");
      Array.prototype.forEach.call(bits.querySelectorAll(".bit"), function (el) {
        el.addEventListener("click", function () { var k = +el.getAttribute("data-i"); del = del === k ? -1 : k; draw(); });
      });
    }
    inp.addEventListener("input", function () { del = -1; draw(); });
    draw();
  }

  /* ---------- 구성원 ---------- */
  function personCard(p, isPI) {
    var av = p.photo ? '<img class="avatar" src="' + esc(media(p.photo)) + '" alt="' + esc(pName(p)) + '">' : '<div class="avatar">' + esc(initials(p)) + '</div>';
    var links = [];
    if (p.email) links.push('<a href="mailto:' + esc(p.email) + '">Email</a>');
    if (p.homepage) links.push('<a href="' + esc(p.homepage) + '">Homepage</a>');
    var body = '<h3>' + esc(pName(p)) + '</h3>' +
      '<div class="pos">' + esc(UI.pos[(p.role === "grad" && p.degree) || p.role] || p.role) + '</div>' +
      '<div class="int">' + esc((p.interests || []).join(" · ")) + '</div>' + (links.length ? '<div class="links">' + links.join(" · ") + '</div>' : "");
    return '<div class="person' + (isPI ? " pi" : "") + '">' + av + '<div>' + body + '</div></div>';
  }
  function renderPeople() {
    var html = pageHead(LANG === "ko" ? UI.nav.people : "People", UI.peopleLead) + '<section class="block" style="padding-top:0"><div class="container">';
    ["pi", "postdoc", "grad", "undergrad", "alumni"].forEach(function (role) {
      var ps = D.people.filter(function (p) { return p.role === role; });
      if (!ps.length) return;
      html += '<h2 class="role-title">' + esc(UI.roles[role]) + '</h2>' +
        (role === "pi" ? ps.map(function (p) { return personCard(p, true); }).join("") :
          '<div class="people">' + ps.map(function (p) { return personCard(p, false); }).join("") + '</div>');
    });
    $("#app").innerHTML = html + '</div></section>';
  }

  /* ---------- 출간 ---------- */
  function renderPublications() {
    var TY = UI.pubTypes, order = ["journal", "conference", "patent", "grant", "award"];
    $("#app").innerHTML = pageHead(LANG === "ko" ? UI.nav.publications : "Publications", UI.pubLead) +
      '<section class="block" style="padding-top:0"><div class="container"><div class="filters" id="pubFilters">' +
      ["all"].concat(order).map(function (k) { return '<button class="chip' + (k === "all" ? " active" : "") + '" data-t="' + k + '">' + esc(TY[k]) + '</button>'; }).join("") +
      '</div><div id="pubList"></div></div></section>';
    function draw(t) {
      var out = "", idx = 0;
      order.forEach(function (k) {
        if (t !== "all" && t !== k) return;
        var ps = D.publications.filter(function (p) { return p.type === k; }).sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
        out += '<div class="pub-group"><h2>' + esc(TY[k]) + '</h2>';
        if (!ps.length) out += '<div class="empty">' + esc(UI.none) + '</div>';
        ps.forEach(function (p) {
          var id = "p" + (idx++), btn = [];
          if (p.abstract) btn.push('<button data-x="abs' + id + '">ABS</button>');
          if (p.bibtex) btn.push('<button data-x="bib' + id + '">BIB</button>');
          ["pdf", "doi", "arxiv", "link"].forEach(function (q) { if (p[q]) btn.push('<a href="' + esc(p[q]) + '">' + q.toUpperCase() + '</a>'); });
          out += '<div class="pub"><div class="year">' + esc(p.year || "") + '</div><div><div class="ptitle">' + esc(T(p, "title")) +
            (p.example ? '<span class="example">' + esc(UI.example) + '</span>' : "") + '</div>' + (T(p, "authors") ? '<div class="authors">' + esc(T(p, "authors")) + '</div>' : "") +
            '<div class="venue">' + esc(T(p, "venue")) + '</div>' + (btn.length ? '<div class="pub-btns">' + btn.join("") + '</div>' : "") +
            (p.abstract ? '<div class="pub-extra" id="abs' + id + '">' + esc(p.abstract) + '</div>' : "") +
            (p.bibtex ? '<div class="pub-extra mono" id="bib' + id + '">' + esc(p.bibtex) + '</div>' : "") + '</div></div>';
        });
        out += '</div>';
      });
      $("#pubList").innerHTML = out;
      $$(".pub-btns button").forEach(function (b) { b.addEventListener("click", function () { document.getElementById(b.getAttribute("data-x")).classList.toggle("open"); }); });
    }
    $$("#pubFilters .chip").forEach(function (c) {
      c.addEventListener("click", function () { $$("#pubFilters .chip").forEach(function (d) { d.classList.remove("active"); }); c.classList.add("active"); draw(c.getAttribute("data-t")); });
    });
    draw("all");
  }

  /* ---------- 세미나 캘린더 ----------
     seminar.json: from·to(학기), series[](정규 세미나: id·이름·요일·시간·장소), sessions[](날짜별 발표자), cancel[](휴강) */
  function seriesOf(id) { var L = D.seminar.series || []; for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }
  function isCancelled(key, sid) {
    return (D.seminar.cancel || []).some(function (c) { return typeof c === "string" ? c === key : !!c && c.date === key && (!c.series || c.series === sid); });
  }
  function eventsOn(d) {
    var S = D.seminar, key = ymd(d), evs = [], used = [];
    var inTerm = S.from && S.to && key >= S.from && key <= S.to;
    var ses = (S.sessions || []).filter(function (s) { return s.date === key; });
    var hasTitle = function (s) { return !!(s.title_ko || s.title_en); };
    (S.series || []).forEach(function (r, i) {
      if (!inTerm || d.getDay() !== parseInt(r.weekday, 10)) return;
      if (isCancelled(key, r.id)) { evs.push({ kind: "cancel", si: i, title: T(r, "title") + " · " + UI.cancelled }); return; }
      var m = ses.filter(function (s) { return !hasTitle(s) && (s.series === r.id || !s.series); })[0];
      if (m) used.push(m);
      evs.push({ kind: "regular", si: i, title: T(r, "title"), time: r.time, place: T(r, "place"), speaker: m && m.speaker, topic: m && m.topic });
    });
    ses.forEach(function (s) {
      if (used.indexOf(s) >= 0) return;
      var r = seriesOf(s.series);
      evs.push({ kind: "extra", si: -1, title: T(s, "title") || (r ? T(r, "title") : ""), time: r && r.time, place: r && T(r, "place"), speaker: s.speaker, topic: s.topic });
    });
    return evs;
  }
  function renderSeminars() {
    var S = D.seminar, now = new Date(), cur = new Date(now.getFullYear(), now.getMonth(), 1);
    $("#app").innerHTML = pageHead(LANG === "ko" ? UI.nav.seminars : "Seminars", UI.semLead) +
      '<section class="block" style="padding-top:0"><div class="container">' +
      '<div class="sem-series">' + (S.series || []).map(function (r, i) {
        var note = [T(r, "desc"), T(r, "place")].filter(Boolean).join(" · ");
        return '<div class="row"><span class="when"><i class="sw s' + i + '"></i>' + esc(UI.every(parseInt(r.weekday, 10))) + ' ' + esc(r.time) + '</span>' +
          '<span class="name">' + esc(T(r, "title")) + '</span><span class="note">' + esc(note) + '</span></div>';
      }).join("") + '</div>' +
      (S.from && S.to ? '<p class="sem-period"><b>' + esc(UI.period) + '</b> ' + esc(S.from) + ' – ' + esc(S.to) + '</p>' : "") +
      '<div class="cal-head"><h2 id="calTitle"></h2><div class="cal-nav"><button class="tool-btn" id="calPrev">' + esc(UI.prev) + '</button>' +
      '<button class="tool-btn" id="calToday">' + esc(UI.today) + '</button><button class="tool-btn" id="calNext">' + esc(UI.next) + '</button></div></div>' +
      '<div class="cal" id="cal"></div><div class="month-list"><h2 class="title" style="font-size:18px;margin-bottom:12px">' + esc(UI.monthEvents) + '</h2><div id="calList"></div></div>' +
      '</div></section>';
    function draw() {
      var y = cur.getFullYear(), m = cur.getMonth(), first = new Date(y, m, 1), start = new Date(y, m, 1 - first.getDay());
      $("#calTitle").textContent = UI.monthTitle(y, m);
      var cells = UI.dows.map(function (w) { return '<div class="dow">' + esc(w) + '</div>'; }), list = [];
      for (var i = 0; i < 42; i++) {
        var d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        if (i % 7 === 0 && i > 0 && d.getMonth() !== m) break;
        var evs = eventsOn(d), inMonth = d.getMonth() === m;
        cells.push('<div class="day' + (inMonth ? "" : " out") + (ymd(d) === ymd(now) ? " today" : "") + '"><span class="d">' + d.getDate() + '</span>' +
          (inMonth ? evs.map(function (e) {
            return '<span class="ev ' + e.kind + (e.si >= 0 ? " s" + e.si : "") + '">' + esc(e.title) + (e.time && e.kind !== "cancel" ? '<small>' + esc(e.time) + '</small>' : "") + '</span>';
          }).join("") : "") + '</div>');
        /* 목록에는 발표자가 정해진 세미나, 휴강, 특별 행사만 */
        if (inMonth) evs.forEach(function (e) { if (e.kind !== "regular" || e.speaker) list.push({ d: d, e: e }); });
      }
      $("#cal").innerHTML = cells.join("");
      $("#calList").innerHTML = list.length ? '<ul class="updates">' + list.map(function (x) {
        var e = x.e, extra = [];
        if (e.kind !== "cancel") {
          if (e.time) extra.push(e.time);
          if (e.place) extra.push(e.place);
          if (e.speaker) extra.push(UI.talks(e.speaker.split(/\s*,\s*/).filter(Boolean).length));  /* 캘린더에는 발표자 이름을 싣지 않고 인원만 */
          if (e.topic) extra.push(areaTitle(e.topic));
        }
        return '<li' + (e.kind === "cancel" ? ' class="cancel"' : "") + '><span class="date">' + esc(UI.dateFmt(x.d)) + '</span><span><span class="kind">' + esc(e.title) + '</span>' + esc(extra.join(" · ")) + '</span></li>';
      }).join("") + '</ul>' : '<p class="empty">' + esc(UI.noEvents) + '</p>';
    }
    $("#calPrev").addEventListener("click", function () { cur = new Date(cur.getFullYear(), cur.getMonth() - 1, 1); draw(); });
    $("#calNext").addEventListener("click", function () { cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1); draw(); });
    $("#calToday").addEventListener("click", function () { cur = new Date(now.getFullYear(), now.getMonth(), 1); draw(); });
    if (/^#\d{4}-\d{2}$/.test(location.hash)) { var a = location.hash.slice(1).split("-"); cur = new Date(+a[0], +a[1] - 1, 1); }
    draw();
  }

  /* ---------- 함께하기 ---------- */
  function renderJoin() {
    var s = D.site;
    $("#app").innerHTML = pageHead(LANG === "ko" ? UI.nav.join : "Join", UI.joinLead) +
      '<section class="block" style="padding-top:28px"><div class="container"><h2 class="title">' + esc(T(s, "join_headline")) + '</h2>' +
      '<ul class="join-list">' + (s.join_points || []).map(function (p) { return '<li>' + esc(p[LANG] || p.ko) + '</li>'; }).join("") + '</ul>' +
      '<a class="btn" href="mailto:' + esc(s.email) + '">' + esc(UI.mail) + '</a>' +
      '<div class="steps">' + UI.steps.map(function (st, i) { return '<div><h3>0' + (i + 1) + ' ' + esc(st[0]) + '</h3><p>' + esc(st[1]) + '</p></div>'; }).join("") + '</div>' +
      '</div></section>';
  }

  /* ---------- 자체 시험 (주소 끝 #selftest) ---------- */
  function selfTest() {
    var tot = 0, bad = 0;
    for (var n = 1; n <= 12; n++) for (var v = 0; v < (1 << n); v++) {
      var x = []; for (var i = 0; i < n; i++) x.push((v >> (n - 1 - i)) & 1);
      var a = vtChecksum(x) % (n + 1);
      for (var d = 0; d < n; d++) { var r = vtDecode(x.slice(0, d).concat(x.slice(d + 1)), n, a); tot++; if (!r || r.join("") !== x.join("")) bad++; }
    }
    var div = document.createElement("div");
    div.style.cssText = "position:fixed;bottom:10px;left:10px;z-index:99;background:#000;color:#0f0;padding:10px 14px;font:15px monospace";
    div.textContent = "SELFTEST [" + LANG + "] VT decode n<=12: total=" + tot + " fail=" + bad;
    document.body.appendChild(div);
  }

  /* ---------- 시작: content/*.json 을 읽은 뒤 그린다 ---------- */
  document.getElementById("site-header").innerHTML = header();
  $("#menuBtn").addEventListener("click", function () { $("#navLinks").classList.toggle("open"); });
  $("#app").innerHTML = '<div class="container loading">…</div>';
  var files = ["site", "research", "people", "publications", "seminar", "news", "digest"];
  Promise.all(files.map(function (f) {
    return fetch(BASE + "content/" + f + ".json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(f); return r.json(); });
  })).then(function (vals) {
    files.forEach(function (f, i) { D[f] = vals[i]; });
    document.getElementById("site-footer").innerHTML = footer();
    ({ home: renderHome, research: renderResearch, people: renderPeople, publications: renderPublications,
       seminars: renderSeminars, news: renderNews, digest: renderDigest, join: renderJoin })[page]();
    if (location.hash === "#selftest") selfTest();
  }).catch(function () {
    $("#app").innerHTML = '<div class="container loading">' + esc(UI.loadFail) + '</div>';
  });
})();

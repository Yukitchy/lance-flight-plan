/* Lance's Flight Plan — Flite Fest 2026
   No dependencies. Countdown, language toggle, live weather, card rendering. */

/* ---------------- language toggle ---------------- */
(function () {
  var root = document.documentElement;
  var bEn = document.getElementById('btn-en');
  var bJa = document.getElementById('btn-ja');

  function setLang(l) {
    root.classList.toggle('lang-ja', l === 'ja');
    root.setAttribute('lang', l === 'ja' ? 'ja' : 'en');
    bEn.classList.toggle('on', l !== 'ja');
    bJa.classList.toggle('on', l === 'ja');
    try { localStorage.setItem('lance-lang', l); } catch (e) { /* private mode */ }
  }

  var saved = null;
  try { saved = localStorage.getItem('lance-lang'); } catch (e) { /* ignore */ }
  setLang(saved === 'ja' ? 'ja' : 'en');

  bEn.addEventListener('click', function () { setLang('en'); });
  bJa.addEventListener('click', function () { setLang('ja'); });
})();

/* ---------------- countdown ---------------- */
(function () {
  var start = new Date(2026, 7, 6, 9, 0, 0);   // 6 Aug 2026, gates 09:00
  var end = new Date(2026, 7, 9, 18, 0, 0);    // 9 Aug 2026, event ends
  var d = document.getElementById('d');
  var h = document.getElementById('h');
  var m = document.getElementById('m');
  var note = document.getElementById('note');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = new Date();
    var diff = start - now;
    if (diff <= 0) {
      d.textContent = '00'; h.textContent = '00'; m.textContent = '00';
      note.textContent = now < end ? 'GATES ARE OPEN — GO FLY' : 'MISSION COMPLETE';
      return;
    }
    var mins = Math.floor(diff / 60000);
    d.textContent = pad(Math.floor(mins / 1440));
    h.textContent = pad(Math.floor(mins / 60) % 24);
    m.textContent = pad(mins % 60);
  }
  tick();
  setInterval(tick, 30000);
})();

/* ---------------- "find these" cards ---------------- */
var FINDS = [
  {
    img: 'img/sr71.jpg',
    title: 'SR-71 Blackbird',
    cap: 'FASTEST AIR-BREATHING AIRCRAFT EVER FLOWN',
    en: 'It leaked fuel on the ground on purpose — the panels only sealed once friction heat expanded them at speed.',
    ja: '<ruby>世界<rt>せかい</rt></ruby>で<ruby>一番<rt>いちばん</rt></ruby><ruby>速<rt>はや</rt></ruby>い<ruby>飛行機<rt>ひこうき</rt></ruby>です。<ruby>地上<rt>ちじょう</rt></ruby>では、わざと<ruby>燃料<rt>ねんりょう</rt></ruby>がもれます。<ruby>飛<rt>と</rt></ruby>ぶと<ruby>熱<rt>あつ</rt></ruby>くなって、すきまが<ruby>閉<rt>し</rt></ruby>まります。',
    word: '<ruby>偵<rt>てい</rt>察<rt>さつ</rt>機<rt>き</rt></ruby>', romaji: 'teisatsuki', gloss: 'reconnaissance aircraft',
    credit: 'Photo: James St. John · CC BY 2.0'
  },
  {
    img: 'img/xb70.jpg',
    title: 'XB-70 Valkyrie',
    cap: 'TWO WERE BUILT · THIS IS THE ONLY SURVIVOR',
    en: 'A white six-engine bomber the size of a building, designed to cruise at Mach 3. It rode its own shockwave to stay up.',
    ja: '<ruby>白<rt>しろ</rt></ruby>くて、とても<ruby>大<rt>おお</rt></ruby>きい<ruby>飛行機<rt>ひこうき</rt></ruby>です。エンジンが6つあります。2<ruby>機<rt>き</rt></ruby>しか<ruby>作<rt>つく</rt></ruby>りませんでした。<ruby>今<rt>いま</rt></ruby><ruby>残<rt>のこ</rt></ruby>っているのは、これ1<ruby>機<rt>き</rt></ruby>だけです。',
    word: '<ruby>試<rt>し</rt>作<rt>さく</rt>機<rt>き</rt></ruby>', romaji: 'shisakuki', gloss: 'prototype',
    credit: 'Photo: Bubba73 · CC BY-SA 3.0'
  },
  {
    img: 'img/memphis-belle.jpg',
    title: 'Memphis Belle',
    cap: 'B-17 · RESTORED OVER 13 YEARS · SHE IS THE ONE ON THE LEFT',
    en: 'The famous B-17 whose crew flew 25 missions and went home. Its restoration took longer than the war it fought in — you will appreciate that number more than most visitors.',
    ja: '<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>爆撃機<rt>ばくげきき</rt></ruby>です。<ruby>直<rt>なお</rt></ruby>すのに13<ruby>年<rt>ねん</rt></ruby>かかりました。<ruby>戦争<rt>せんそう</rt></ruby>より<ruby>長<rt>なが</rt></ruby>いです。<ruby>車<rt>くるま</rt></ruby>を<ruby>直<rt>なお</rt></ruby>すあなたなら、この<ruby>数字<rt>すうじ</rt></ruby>がわかりますね。',
    word: '<ruby>爆<rt>ばく</rt>撃<rt>げき</rt>機<rt>き</rt></ruby>', romaji: 'bakugekiki', gloss: 'bomber',
    credit: 'Photo: Kevin Lush, U.S. Air Force · CC0'
  },
  {
    img: 'img/sam26000.jpg',
    title: 'SAM 26000',
    cap: 'AIR FORCE ONE · KENNEDY TO CLINTON',
    en: 'In the Presidential Gallery you walk <i>through</i> four presidential aircraft, not past them. Do not skip this hangar.',
    ja: '<ruby>大統領<rt>だいとうりょう</rt></ruby>が<ruby>乗<rt>の</rt></ruby>った<ruby>飛行機<rt>ひこうき</rt></ruby>です。ここでは、<ruby>飛行機<rt>ひこうき</rt></ruby>の<ruby>中<rt>なか</rt></ruby>を<ruby>歩<rt>ある</rt></ruby>けます。4<ruby>機<rt>き</rt></ruby>あります。<ruby>絶対<rt>ぜったい</rt></ruby><ruby>行<rt>い</rt></ruby>ってください。',
    word: '<ruby>大<rt>だい</rt>統<rt>とう</rt>領<rt>りょう</rt></ruby>の<ruby>飛<rt>ひ</rt>行<rt>こう</rt>機<rt>き</rt></ruby>', romaji: 'daitōryō no hikōki', gloss: "the president's airplane",
    credit: 'Photo: U.S. Air Force / Ken LaRock · Public domain'
  },
  {
    img: 'img/space.jpg',
    title: 'Missile &amp; Space Gallery',
    cap: 'ROCKETS STANDING IN A SILO-LIKE DOME',
    en: 'The fourth building holds the space side of the Air Force — full-size rockets standing upright, and a space shuttle crew compartment trainer you can board.',
    ja: '4<ruby>番目<rt>ばんめ</rt></ruby>のたてものは、<ruby>宇宙<rt>うちゅう</rt></ruby>のへやです。<ruby>本物<rt>ほんもの</rt></ruby>の<ruby>大<rt>おお</rt></ruby>きいロケットが<ruby>立<rt>た</rt></ruby>っています。スペースシャトルの<ruby>中<rt>なか</rt></ruby>にも<ruby>入<rt>はい</rt></ruby>れます。',
    word: '<ruby>宇<rt>う</rt>宙<rt>ちゅう</rt></ruby>', romaji: 'uchū', gloss: 'space',
    credit: 'Photo: U.S. Air Force · Public domain'
  },
  {
    img: 'img/zero.jpg',
    title: 'Mitsubishi A6M2 Zero',
    cap: 'AIR POWER GALLERY · WWII',
    en: 'Your Japanese lesson, parked in a hangar in Ohio. We call it 零戦 — "zero fighter", shortened from the year it was named for.',
    ja: 'あなたの<ruby>日本語<rt>にほんご</rt></ruby>のレッスンが、オハイオにあります。<ruby>日本語<rt>にほんご</rt></ruby>では「<ruby>零戦<rt>ぜろせん</rt></ruby>」と<ruby>言<rt>い</rt></ruby>います。',
    word: '<ruby>零<rt>ぜろ</rt>戦<rt>せん</rt></ruby>', romaji: 'zerosen', gloss: 'the Zero',
    credit: 'Photo: Roland Turner · CC BY-SA 2.0'
  }
];

(function () {
  var host = document.getElementById('finds');
  if (!host) return;
  host.innerHTML = FINDS.map(function (f, i) {
    var n = i + 1 < 10 ? '0' + (i + 1) : String(i + 1);
    return '<article class="find">' +
      '<figure><img src="' + f.img + '" alt="' + f.title.replace(/&amp;/g, 'and') + '" loading="lazy" ' +
      'onerror="this.closest(\'figure\').remove()"></figure>' +
      '<div class="body">' +
        '<p class="no">FIND ' + n + '</p>' +
        '<h3>' + f.title + '</h3>' +
        '<p class="cap">' + f.cap + '</p>' +
        '<p class="txt"><span class="x-en">' + f.en + '</span><span class="x-ja">' + f.ja + '</span></p>' +
        '<div class="word"><span class="k">' + f.word + '</span>' +
          '<span class="romaji">' + f.romaji + '</span>' +
          '<span class="gloss">' + f.gloss + '</span></div>' +
      '</div>' +
      '<p class="credit">' + f.credit + '</p>' +
    '</article>';
  }).join('');
})();

/* ---------------- live weather (Open-Meteo, no key) ---------------- */
(function () {
  var host = document.getElementById('wx');
  if (!host) return;

  // WMO weather code -> [emoji, short label]
  function wmo(c) {
    if (c === 0) return ['☀️', 'Clear'];
    if (c <= 2) return ['🌤️', 'Mostly sunny'];
    if (c === 3) return ['☁️', 'Cloudy'];
    if (c <= 48) return ['🌫️', 'Fog / mist'];
    if (c <= 57) return ['🌦️', 'Drizzle'];
    if (c <= 67) return ['🌧️', 'Rain'];
    if (c <= 77) return ['🌨️', 'Snow'];
    if (c <= 82) return ['🌧️', 'Showers'];
    if (c <= 99) return ['⛈️', 'Thunderstorms'];
    return ['🌥️', '—'];
  }

  // Wind is what decides an RC day.
  function verdict(mph, pop) {
    if (mph < 10 && pop < 50) return ['v-good', 'GREAT FOR RC', 'かぜ：よわい'];
    if (mph < 15) return ['v-ok', 'FLYABLE', 'とばせる'];
    return ['v-bad', 'ROUGH — HEAVY MODELS ONLY', 'かぜ：つよい'];
  }

  var url = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=39.7817&longitude=-84.1097' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max' +
    '&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York' +
    '&start_date=2026-08-06&end_date=2026-08-09';

  fetch(url).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function (j) {
    var dy = j.daily;
    if (!dy || !dy.time || !dy.time.length) throw new Error('no data');
    host.innerHTML = dy.time.map(function (iso, i) {
      var parts = iso.split('-');
      var dt = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      var dow = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dt.getDay()];
      var w = wmo(dy.weather_code[i]);
      var wind = Math.round(dy.wind_speed_10m_max[i]);
      var pop = dy.precipitation_probability_max[i];
      var v = verdict(wind, pop);
      return '<div class="wx">' +
        '<p class="dow">' + dow + ' ' + (+parts[2]) + '</p>' +
        '<div class="ic" aria-hidden="true">' + w[0] + '</div>' +
        '<p class="t">' + Math.round(dy.temperature_2m_max[i]) + '°<small> / ' +
          Math.round(dy.temperature_2m_min[i]) + '°</small></p>' +
        '<p class="meta">' + w[1] + '<br>Wind ' + wind + ' mph · Rain ' + pop + '%</p>' +
        '<span class="verdict ' + v[0] + '">' +
          '<span class="x-en">' + v[1] + '</span><span class="x-ja">' + v[2] + '</span></span>' +
      '</div>';
    }).join('');
  }).catch(function () {
    host.innerHTML = '<p class="wx-load">Forecast unavailable right now — check ' +
      '<a href="https://forecast.weather.gov/MapClick.php?lat=39.7817&lon=-84.1097" target="_blank" rel="noopener">weather.gov</a> ' +
      'for Dayton, OH.</p>';
  });
})();

/* ---------------- nearby places ---------------- */
/* Filled from verified research — every entry has a real address. */
var PLACES = {
  attractions: [
    {
      name: 'Huffman Prairie Flying Field',
      tag: 'FREE · 8 MIN',
      address: '2380 Memorial Rd, Wright-Patterson AFB, OH 45433',
      drive: '8 min from the museum', admission: 'Free',
      en: 'The actual pasture where the Wright brothers turned a fragile 1903 machine into a practical airplane, and later ran the world\'s first flying school. It is on the same base as the museum — the easiest add-on you will ever make.',
      ja: 'ライト<ruby>兄弟<rt>きょうだい</rt></ruby>が<ruby>飛<rt>と</rt></ruby>ぶれんしゅうをした、<ruby>本物<rt>ほんもの</rt></ruby>の<ruby>原<rt>はら</rt>っぱ</ruby>です。<ruby>博物館<rt>はくぶつかん</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じ<ruby>基地<rt>きち</rt></ruby>の<ruby>中<rt>なか</rt></ruby>にあります。ただです。',
      url: 'https://www.nps.gov/daav/learn/historyculture/huffman-prairie-flying-field.htm'
    },
    {
      name: 'Carillon Historical Park',
      tag: '$14 · 21 MIN',
      address: '1000 Carillon Blvd, Dayton, OH 45409',
      drive: '21 min', admission: '$14 adults',
      en: 'Home of the original 1905 Wright Flyer III — the world\'s first practical airplane, restored under Orville Wright\'s own supervision. If you see one Wright artifact in your life, make it this one.',
      ja: '1905<ruby>年<rt>ねん</rt></ruby>の<ruby>本物<rt>ほんもの</rt></ruby>のライト<ruby>兄弟<rt>きょうだい</rt></ruby>の<ruby>飛行機<rt>ひこうき</rt></ruby>があります。<ruby>世界<rt>せかい</rt></ruby>で<ruby>最初<rt>さいしょ</rt></ruby>の、<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>使<rt>つか</rt></ruby>える<ruby>飛行機<rt>ひこうき</rt></ruby>です。',
      url: 'https://www.daytonhistory.org/visit/general-info/hours-and-pricing/'
    },
    {
      name: 'The Wright Cycle Company Complex',
      tag: 'FREE · 20 MIN',
      address: '16 S Williams St, Dayton, OH 45402',
      drive: '20 min', admission: 'Free · Wed–Sun 9–4',
      en: 'The surviving bicycle shop where Wilbur and Orville earned their living and engineered the 1903 Flyer. Two mechanics in a workshop — the part of the story the Air Force Museum\'s hardware cannot tell.',
      ja: 'ライト<ruby>兄弟<rt>きょうだい</rt></ruby>の<ruby>自転車<rt>じてんしゃ</rt></ruby>やさんです。ここで<ruby>飛行機<rt>ひこうき</rt></ruby>を<ruby>作<rt>つく</rt></ruby>りました。あなたのガレージと<ruby>同<rt>おな</rt></ruby>じですね。ただです。',
      url: 'https://www.nps.gov/daav/planyourvisit/hours.htm'
    },
    {
      name: "America's Packard Museum",
      tag: 'FOR THE CAR GUY',
      address: '420 S Ludlow St, Dayton, OH 45402',
      drive: '19 min', admission: '$15 adults · Tue–Sun 12–5',
      en: 'Packard built the licence-made Merlin V-1650 — the engine that turned the P-51 Mustang into a war-winning fighter. You fix cars. This is the room where cars and airplanes are the same subject, inside a restored 1917 dealership showroom.',
      ja: 'パッカードは<ruby>車<rt>くるま</rt></ruby>の<ruby>会社<rt>かいしゃ</rt></ruby>ですが、<ruby>飛行機<rt>ひこうき</rt></ruby>のエンジンも<ruby>作<rt>つく</rt></ruby>りました。<ruby>車<rt>くるま</rt></ruby>が<ruby>好<rt>す</rt></ruby>きなあなたに、<ruby>一番<rt>いちばん</rt></ruby>おすすめです。',
      url: 'https://www.americaspackardmuseum.org/admissions-and-hours'
    },
    {
      name: 'Wright "B" Flyer Inc.',
      tag: 'WORKING HANGAR',
      address: '10550 Springboro Pike, Miamisburg, OH 45342',
      drive: '30 min', admission: 'Free (donations welcome)',
      en: 'A volunteer-run hangar with airworthy Wright Model B look-alikes. The people who built and maintain them will walk you around — a working shop, not a display case. Public rides are not currently offered.',
      ja: 'ボランティアの<ruby>人<rt>ひと</rt></ruby>たちが、ライト<ruby>兄弟<rt>きょうだい</rt></ruby>の<ruby>飛行機<rt>ひこうき</rt></ruby>のコピーを<ruby>作<rt>つく</rt></ruby>って、<ruby>今<rt>いま</rt></ruby>も<ruby>飛<rt>と</rt></ruby>ばしています。<ruby>作<rt>つく</rt></ruby>った<ruby>人<rt>ひと</rt></ruby>が<ruby>案内<rt>あんない</rt></ruby>してくれます。',
      url: 'https://www.wright-b-flyer.org/visit_us/'
    },
    {
      name: 'Hawthorn Hill',
      tag: 'RESERVE AHEAD',
      address: '901 Harman Ave, Oakwood (Dayton), OH 45419',
      drive: '23 min', admission: '$16 · Wed & Sat tours only, prepaid',
      en: "Orville Wright's own mansion, where he lived from 1914 until 1948 and hosted Lindbergh, Ford and Edison. Rarely open, tours depart by shuttle from Carillon Park — book before you drive out.",
      ja: 'オービル・ライトの<ruby>家<rt>いえ</rt></ruby>です。<ruby>水曜<rt>すいよう</rt></ruby>と<ruby>土曜<rt>どよう</rt></ruby>だけ<ruby>見<rt>み</rt></ruby>られます。<ruby>予約<rt>よやく</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。',
      url: 'https://daytonhistory.org/visit/things-to-do/hawthorn-hill/'
    }
  ],
  restaurants: [
    {
      name: "Marion's Piazza",
      tag: 'DAYTON CLASSIC',
      address: '1320 N Fairfield Rd, Beavercreek, OH 45432',
      cuisine: 'Dayton-style pizza', price: '$', distance: '12 min',
      en: 'The definitive Dayton-style pizza — thin crust, square-cut, since 1965. This is the one local thing you genuinely cannot get anywhere else in the country. Ask for the ham-and-sauerkraut pie if you want the full experience.',
      ja: 'デイトンだけのピザです。うすくて、<ruby>四角<rt>しかく</rt></ruby>く<ruby>切<rt>き</rt></ruby>ります。1965<ruby>年<rt>ねん</rt></ruby>からあります。ここでしか<ruby>食<rt>た</rt></ruby>べられません。',
      url: 'https://marionspiazza.com/'
    },
    {
      name: 'Fairborn Family Diner & Restaurant',
      tag: 'BREAKFAST · 7AM',
      address: '419 N Broad St, Fairborn, OH 45324',
      cuisine: 'American diner', price: '$', distance: '8 min',
      en: 'Independent small-town diner, opens at 7 a.m. every day. The practical stop on the way in — eat before the field gets busy. Carryout available.',
      ja: '<ruby>朝<rt>あさ</rt></ruby>7<ruby>時<rt>じ</rt></ruby>から<ruby>開<rt>あ</rt></ruby>いています。<ruby>会場<rt>かいじょう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>く<ruby>前<rt>まえ</rt></ruby>の<ruby>朝<rt>あさ</rt></ruby>ごはんに、ちょうどいいです。',
      url: 'https://www.facebook.com/p/Fairborn-Family-Diner-Restaurant-100070069541678/'
    },
    {
      name: 'Taste of Jerusalem',
      tag: 'BEST TAKEOUT',
      address: '3800 Colonel Glenn Hwy, Fairborn, OH 45324',
      cuisine: 'Middle Eastern', price: '$', distance: '11 min',
      en: 'Family-run shawarma and falafel by Wright State University. Wraps travel well and survive a hot afternoon better than anything with mayonnaise — the best grab-and-go for the flight line.',
      ja: '<ruby>家族<rt>かぞく</rt></ruby>でやっている<ruby>店<rt>みせ</rt></ruby>です。もって<ruby>行<rt>い</rt></ruby>くのに<ruby>便利<rt>べんり</rt></ruby>です。<ruby>会場<rt>かいじょう</rt></ruby>で<ruby>食<rt>た</rt></ruby>べるならここ。',
      url: 'https://tasteofjerusalem.shop/'
    },
    {
      name: "Giovanni's Pizzeria e Ristorante Italiano",
      tag: 'SINCE 1953',
      address: '215 W Main St, Fairborn, OH 45324',
      cuisine: 'Italian', price: '$$', distance: '9 min',
      en: 'A Fairborn institution opened in 1953 and still cooking from scratch. Closest thing to a hometown legend within a few minutes of the base. Closed Mondays.',
      ja: '1953<ruby>年<rt>ねん</rt></ruby>からある<ruby>店<rt>みせ</rt></ruby>です。<ruby>地元<rt>じもと</rt></ruby>で<ruby>有名<rt>ゆうめい</rt></ruby>です。<ruby>月曜日<rt>げつようび</rt></ruby>は<ruby>休<rt>やす</rt></ruby>みです。',
      url: 'https://www.facebook.com/GiovannisFairborn/'
    },
    {
      name: "Young's Jersey Dairy",
      tag: 'WORTH THE DRIVE',
      address: '6880 Springfield-Xenia Rd, Yellow Springs, OH 45387',
      cuisine: 'Farm fare & ice cream', price: '$', distance: '20 min',
      en: 'A working dairy farm turned Ohio landmark. Ice cream made on site all day, breakfast Sat & Sun 9–noon, plus goats and mini-golf. After a hot day on a flying field this is the correct destination.',
      ja: '<ruby>本物<rt>ほんもの</rt></ruby>のぼくじょうです。アイスクリームがとても<ruby>有名<rt>ゆうめい</rt></ruby>です。<ruby>暑<rt>あつ</rt></ruby>い<ruby>日<rt>ひ</rt></ruby>のあとに、ぴったりです。',
      url: 'https://youngsdairy.com/hours-directions/'
    },
    {
      name: '2nd Street Market',
      tag: 'FRI/SAT/SUN ONLY',
      address: '600 E Second St, Dayton, OH 45402',
      cuisine: 'Indoor market & food hall', price: '$', distance: '20 min',
      en: 'Dozens of independent Dayton vendors under one roof — sandwiches, empanadas, baked goods, coffee. The best single place to assemble a cooler full of food for the event. Fri 11–3, Sat 9–3, Sun 11–3.',
      ja: 'たくさんの<ruby>店<rt>みせ</rt></ruby>が1つのたてものに<ruby>入<rt>はい</rt></ruby>っています。<ruby>金<rt>きん</rt></ruby>・<ruby>土<rt>ど</rt></ruby>・<ruby>日<rt>にち</rt></ruby>だけです。',
      url: 'https://www.metroparks.org/places-to-go/2nd-street-market/'
    },
    {
      name: 'The Pine Club',
      tag: 'SPLURGE · CASH ONLY',
      address: '1926 Brown St, Dayton, OH 45409',
      cuisine: 'Steakhouse', price: '$$$', distance: '21 min',
      en: 'Open since 1947 and repeatedly named one of the best steakhouses in America. A genuine time capsule. Cash or check only, no credit cards, no reservations, closed Sundays — plan for a wait.',
      ja: '1947<ruby>年<rt>ねん</rt></ruby>からあるステーキの<ruby>店<rt>みせ</rt></ruby>です。<ruby>現金<rt>げんきん</rt></ruby>だけです。カードは<ruby>使<rt>つか</rt></ruby>えません。<ruby>日曜日<rt>にちようび</rt></ruby>は<ruby>休<rt>やす</rt></ruby>みです。',
      url: 'https://thepineclub.com/location-hours-more/'
    }
  ]
};

/* Keyed by the exact place name above, so reordering PLACES can never silently
   attach the wrong photo to the wrong business.
   SEE cards show the place. EAT cards show food — Marion's is that restaurant's
   own pizza; the rest are freely-licensed photos of the dish to order there.
   `actual` records which is which for the credits table in README.md. */
var PHOTOS = {
  'Huffman Prairie Flying Field':
    { f: 'huffman-prairie', actual: true, alt: 'The Wright brothers hangar replica on Huffman Prairie Flying Field', credit: 'Ismael Laos · CC BY-SA 4.0' },
  'Carillon Historical Park':
    { f: 'carillon', actual: true, alt: 'Wright Hall at Carillon Historical Park, Dayton', credit: 'Nyttend · Public domain' },
  'The Wright Cycle Company Complex':
    { f: 'wright-cycle', actual: true, alt: 'The Wright Cycle Company building on South Williams Street, Dayton', credit: 'Cory Hartman · CC BY-SA 3.0' },
  "America's Packard Museum":
    { f: 'packard', actual: true, alt: "America's Packard Museum, the former Citizens Motor Car Company showroom", credit: 'Antony-22 · CC BY-SA 4.0' },
  'Wright "B" Flyer Inc.':
    { f: 'wright-b-flyer', actual: true, alt: 'The Wright B Flyer hangar and free museum, Miamisburg', credit: 'Jtesla16 · Public domain' },
  'Hawthorn Hill':
    { f: 'hawthorn-hill', actual: true, alt: "Hawthorn Hill, Orville Wright's mansion in Oakwood", credit: 'Zeist85 · Public domain' },
  "Marion's Piazza":
    { f: 'marions-food', actual: true, alt: "Marion's Piazza supreme pizza: Dayton-style thin crust, cut into squares", credit: 'Jtesla16 (J. Miers) · CC BY-SA 3.0' },
  'Fairborn Family Diner & Restaurant':
    { f: 'fairborn-diner', actual: false, alt: 'A classic American diner breakfast: eggs, bacon, home fries and toast', credit: 'Evan-Amos · Public domain' },
  'Taste of Jerusalem':
    { f: 'taste-jerusalem', actual: false, alt: 'A chicken shawarma wrap', credit: 'Andy Li · CC0' },
  "Giovanni's Pizzeria e Ristorante Italiano":
    { f: 'giovannis-food', actual: false, alt: 'Spaghetti and meatballs in marinara sauce with parmesan', credit: 'D. Laird · CC BY 2.0' },
  "Young's Jersey Dairy":
    { f: 'youngs-food', actual: false, alt: 'A waffle cone with two scoops of dark chocolate chip ice cream', credit: 'Sarah Stierch · CC0' },
  '2nd Street Market':
    { f: 'second-street-food', actual: false, alt: 'A covered market stall piled with fresh vegetables and fruit', credit: 'PattayaPatrol · CC BY-SA 4.0' },
  'The Pine Club':
    { f: 'pine-club-food', actual: false, alt: 'A grilled ribeye steak with thick-cut chips and béarnaise sauce', credit: 'Socket0 · CC0' }
};

function renderPlaces() {
  function card(p, kind) {
    var maps = 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(p.name + ' ' + p.address);
    var meta = kind === 'see'
      ? [p.drive, p.admission].filter(Boolean).join('  ·  ')
      : [p.cuisine, p.price, p.distance].filter(Boolean).join('  ·  ');

    var ph = PHOTOS[p.name];
    var fig = '';
    if (ph) {
      fig = '<figure class="pshot">' +
        '<img src="img/places/' + ph.f + '.jpg" alt="' + ph.alt + '" loading="lazy" ' +
        'onerror="this.closest(\'figure\').remove()">' +
      '</figure>';
    }

    return '<article class="place">' + fig +
      '<div class="pbody">' +
        '<div class="top"><h3>' + p.name + '</h3>' +
          (p.tag ? '<span class="tag">' + p.tag + '</span>' : '') + '</div>' +
        '<p class="addr">' + p.address + '</p>' +
        (meta ? '<p class="meta">' + meta + '</p>' : '') +
        '<p class="why"><span class="x-en">' + p.en + '</span><span class="x-ja">' + p.ja + '</span></p>' +
        '<a class="go" href="' + maps + '" target="_blank" rel="noopener">OPEN IN MAPS</a>' +
        (p.url ? ' <a class="go" href="' + p.url + '" target="_blank" rel="noopener">WEBSITE</a>' : '') +
      '</div>' +
      (ph ? '<p class="credit">Photo: ' + ph.credit + '</p>' : '') +
    '</article>';
  }
  var a = document.getElementById('attractions');
  var r = document.getElementById('restaurants');
  if (a) a.innerHTML = PLACES.attractions.map(function (p) { return card(p, 'see'); }).join('');
  if (r) r.innerHTML = PLACES.restaurants.map(function (p) { return card(p, 'eat'); }).join('');
}
renderPlaces();

/* ---------------- reveal on scroll ----------------
   Sections are visible by default. We only hide them if we are certain we can
   show them again, so a failed observer can never strand content off-screen. */
(function () {
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  function show(el) { el.classList.remove('pending'); }
  els.forEach(function (el) { el.classList.add('pending'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 });

  els.forEach(function (el) { io.observe(el); });

  // Belt and braces: whatever happens, nothing stays hidden for long.
  setTimeout(function () { els.forEach(show); }, 4000);
})();

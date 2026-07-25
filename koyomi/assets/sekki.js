/* ととのい暦 - 二十四節気バー
   月日は目安（年により1日前後ずれる場合があります） */
(function () {
  var SEKKI = [
    { name: "立春", kana: "りっしゅん", month: 2, day: 4, tip: "寒さの中にも春の気配。厚着のままでも軽くストレッチをして体をほぐしましょう。" },
    { name: "雨水", kana: "うすい", month: 2, day: 19, tip: "雪が雨に変わる頃。花粉の飛散も始まるので、こまめな換気と水分補給を。" },
    { name: "啓蟄", kana: "けいちつ", month: 3, day: 6, tip: "虫たちが目覚める季節の変わり目。寒暖差で自律神経が乱れやすいので早寝を意識して。" },
    { name: "春分", kana: "しゅんぶん", month: 3, day: 21, tip: "昼夜の長さが同じになる日。新生活のストレスに備え、深呼吸で心を整えましょう。" },
    { name: "清明", kana: "せいめい", month: 4, day: 5, tip: "すべてが清らかに輝く頃。朝の光を浴びて体内時計をリセットするのに最適です。" },
    { name: "穀雨", kana: "こくう", month: 4, day: 20, tip: "穀物を潤す春雨の季節。湿気で体が重く感じたら、軽い運動で巡りを良くして。" },
    { name: "立夏", kana: "りっか", month: 5, day: 5, tip: "夏の気配が立ち始める頃。紫外線が強まるので日焼け対策を始めましょう。" },
    { name: "小満", kana: "しょうまん", month: 5, day: 21, tip: "草木が茂り始める季節。気温差で疲れが出やすいので、湯船でしっかり温まって。" },
    { name: "芒種", kana: "ぼうしゅ", month: 6, day: 6, tip: "梅雨入りの頃。湿気によるむくみやだるさには、生姜や根菜であたためケアを。" },
    { name: "夏至", kana: "げし", month: 6, day: 21, tip: "一年で最も昼が長い日。冷房と外気温の差で冷えやすいので、首元を温めて。" },
    { name: "小暑", kana: "しょうしょ", month: 7, day: 7, tip: "本格的な暑さが始まる頃。汗をかいたらこまめに拭き、あせもや肌荒れを予防して。" },
    { name: "大暑", kana: "たいしょ", month: 7, day: 23, tip: "一年で最も暑い時期。冷たい物の摂り過ぎで胃腸を冷やさないよう、常温の麦茶を。" },
    { name: "立秋", kana: "りっしゅう", month: 8, day: 8, tip: "暦の上では秋の始まり。夏の疲れが出やすい頃なので、睡眠の質を優先しましょう。" },
    { name: "処暑", kana: "しょしょ", month: 8, day: 23, tip: "暑さが和らぎ始める頃。朝晩の涼しさで冷えないよう、一枚羽織るものを。" },
    { name: "白露", kana: "はくろ", month: 9, day: 8, tip: "朝露が降り始める季節。空気の乾燥が始まるので、喉と肌の保湿を意識して。" },
    { name: "秋分", kana: "しゅうぶん", month: 9, day: 23, tip: "昼夜が再び等しくなる日。実りの秋、旬の野菜で胃腸をいたわりましょう。" },
    { name: "寒露", kana: "かんろ", month: 10, day: 8, tip: "露が冷たく感じる頃。足先の冷えを感じたら、靴下やレッグウォーマーを一枚。" },
    { name: "霜降", kana: "そうこう", month: 10, day: 24, tip: "霜が降り始める季節。朝晩の冷え込みに備えて、寝具を秋冬仕様に切り替えて。" },
    { name: "立冬", kana: "りっとう", month: 11, day: 7, tip: "冬の気配が立つ頃。日照時間の減少で気分が沈みやすいので、日中に外の光を。" },
    { name: "小雪", kana: "しょうせつ", month: 11, day: 22, tip: "小雪がちらつき始める頃。肩まわりが縮こまりやすいので、湯船で温めてほぐして。" },
    { name: "大雪", kana: "たいせつ", month: 12, day: 7, tip: "本格的な冬の到来。乾燥による肌荒れと喉の不調に、加湿と保湿のケアを。" },
    { name: "冬至", kana: "とうじ", month: 12, day: 22, tip: "一年で最も夜が長い日。ゆず湯やかぼちゃなど、昔ながらの養生で体を労って。" },
    { name: "小寒", kana: "しょうかん", month: 1, day: 6, tip: "寒の入り。一年で最も冷える時期の入り口、首・手首・足首の三首を温めて。" },
    { name: "大寒", kana: "だいかん", month: 1, day: 20, tip: "一年で最も寒さが厳しい頃。春に向けて、無理せずゆっくり体を休めましょう。" }
  ];

  function toOrdinal(date) {
    var start = new Date(date.getFullYear(), 0, 1);
    return Math.floor((date - start) / 86400000);
  }

  function currentIndex(today) {
    var y = today.getFullYear();
    var ranges = SEKKI.map(function (s, i) {
      var year = (s.month === 1 && today.getMonth() >= 6) ? y + 1 : y;
      return { i: i, date: new Date(year, s.month - 1, s.day) };
    });
    ranges.sort(function (a, b) { return a.date - b.date; });
    var current = ranges[ranges.length - 1].i;
    for (var k = 0; k < ranges.length; k++) {
      if (ranges[k].date <= today) current = ranges[k].i;
      else break;
    }
    return current;
  }

  function render(barEl, tipEl) {
    var today = new Date();
    var curIdx = currentIndex(today);

    SEKKI.forEach(function (s, i) {
      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "sekki-pill" + (i === curIdx ? " is-current" : "");
      pill.textContent = s.name;
      pill.setAttribute("aria-label", s.name + "（" + s.kana + "）");
      pill.addEventListener("click", function () { showTip(i); });
      barEl.appendChild(pill);
    });

    function showTip(i) {
      var s = SEKKI[i];
      tipEl.innerHTML =
        '<div class="sekki-tip-title">' + s.name + '<small>' + s.kana + '</small></div>' +
        '<div>' + s.tip + '</div>';
      tipEl.classList.add("is-active");
      Array.prototype.forEach.call(barEl.children, function (el, idx) {
        el.classList.toggle("is-current", idx === i);
      });
    }

    showTip(curIdx);

    requestAnimationFrame(function () {
      var currentPill = barEl.children[curIdx];
      if (currentPill) {
        barEl.scrollLeft = currentPill.offsetLeft - barEl.offsetWidth / 2 + currentPill.offsetWidth / 2;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var barEl = document.getElementById("sekkiBar");
    var tipEl = document.getElementById("sekkiTip");
    if (barEl && tipEl) render(barEl, tipEl);
  });
})();

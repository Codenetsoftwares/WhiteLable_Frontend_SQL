/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-ambientlight-cssanimations-cssfilters-csstransforms-csstransforms3d-csstransitions-htmlimports-ie8compat-json-requestanimationframe-setclasses !*/
!(function (e, n, t) {
  function r(e, n) {
    return typeof e === n;
  }
  function i() {
    var e, n, t, i, o, s, a;
    for (var f in C)
      if (C.hasOwnProperty(f)) {
        if (
          ((e = []),
          (n = C[f]),
          n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
        )
          for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
        for (i = r(n.fn, 'function') ? n.fn() : n.fn, o = 0; o < e.length; o++)
          (s = e[o]),
            (a = s.split('.')),
            1 === a.length
              ? (Modernizr[a[0]] = i)
              : (!Modernizr[a[0]] ||
                  Modernizr[a[0]] instanceof Boolean ||
                  (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])),
                (Modernizr[a[0]][a[1]] = i)),
            _.push((i ? '' : 'no-') + a.join('-'));
      }
  }
  function o(e) {
    var n = x.className,
      t = Modernizr._config.classPrefix || '';
    if ((S && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp('(^|\\s)' + t + 'no-js(\\s|$)');
      n = n.replace(r, '$1' + t + 'js$2');
    }
    Modernizr._config.enableClasses &&
      ((n += ' ' + t + e.join(' ' + t)), S ? (x.className.baseVal = n) : (x.className = n));
  }
  function s() {
    return 'function' != typeof n.createElement
      ? n.createElement(arguments[0])
      : S
        ? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0])
        : n.createElement.apply(n, arguments);
  }
  function a(e, n) {
    if ('object' == typeof e) for (var t in e) N(e, t) && a(t, e[t]);
    else {
      e = e.toLowerCase();
      var r = e.split('.'),
        i = Modernizr[r[0]];
      if ((2 == r.length && (i = i[r[1]]), 'undefined' != typeof i)) return Modernizr;
      (n = 'function' == typeof n ? n() : n),
        1 == r.length
          ? (Modernizr[r[0]] = n)
          : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
            (Modernizr[r[0]][r[1]] = n)),
        o([(n && 0 != n ? '' : 'no-') + r.join('-')]),
        Modernizr._trigger(e, n);
    }
    return Modernizr;
  }
  function f(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function (e, n, t) {
        return n + t.toUpperCase();
      })
      .replace(/^-/, '');
  }
  function u() {
    var e = n.body;
    return e || ((e = s(S ? 'svg' : 'body')), (e.fake = !0)), e;
  }
  function l(e, t, r, i) {
    var o,
      a,
      f,
      l,
      d = 'modernizr',
      p = s('div'),
      c = u();
    if (parseInt(r, 10)) for (; r--; ) (f = s('div')), (f.id = i ? i[r] : d + (r + 1)), p.appendChild(f);
    return (
      (o = s('style')),
      (o.type = 'text/css'),
      (o.id = 's' + d),
      (c.fake ? c : p).appendChild(o),
      c.appendChild(p),
      o.styleSheet ? (o.styleSheet.cssText = e) : o.appendChild(n.createTextNode(e)),
      (p.id = d),
      c.fake &&
        ((c.style.background = ''),
        (c.style.overflow = 'hidden'),
        (l = x.style.overflow),
        (x.style.overflow = 'hidden'),
        x.appendChild(c)),
      (a = t(p, e)),
      c.fake ? (c.parentNode.removeChild(c), (x.style.overflow = l), x.offsetHeight) : p.parentNode.removeChild(p),
      !!a
    );
  }
  function d(e, n) {
    return !!~('' + e).indexOf(n);
  }
  function p(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }
  function c(e, n, t) {
    var i;
    for (var o in e) if (e[o] in n) return t === !1 ? e[o] : ((i = n[e[o]]), r(i, 'function') ? p(i, t || n) : i);
    return !1;
  }
  function m(e) {
    return e
      .replace(/([A-Z])/g, function (e, n) {
        return '-' + n.toLowerCase();
      })
      .replace(/^ms-/, '-ms-');
  }
  function h(n, r) {
    var i = n.length;
    if ('CSS' in e && 'supports' in e.CSS) {
      for (; i--; ) if (e.CSS.supports(m(n[i]), r)) return !0;
      return !1;
    }
    if ('CSSSupportsRule' in e) {
      for (var o = []; i--; ) o.push('(' + m(n[i]) + ':' + r + ')');
      return (
        (o = o.join(' or ')),
        l('@supports (' + o + ') { #modernizr { position: absolute; } }', function (e) {
          return 'absolute' == getComputedStyle(e, null).position;
        })
      );
    }
    return t;
  }
  function v(e, n, i, o) {
    function a() {
      l && (delete q.style, delete q.modElem);
    }
    if (((o = r(o, 'undefined') ? !1 : o), !r(i, 'undefined'))) {
      var u = h(e, i);
      if (!r(u, 'undefined')) return u;
    }
    for (var l, p, c, m, v, g = ['modernizr', 'tspan', 'samp']; !q.style && g.length; )
      (l = !0), (q.modElem = s(g.shift())), (q.style = q.modElem.style);
    for (c = e.length, p = 0; c > p; p++)
      if (((m = e[p]), (v = q.style[m]), d(m, '-') && (m = f(m)), q.style[m] !== t)) {
        if (o || r(i, 'undefined')) return a(), 'pfx' == n ? m : !0;
        try {
          q.style[m] = i;
        } catch (y) {}
        if (q.style[m] != v) return a(), 'pfx' == n ? m : !0;
      }
    return a(), !1;
  }
  function g(e, n, t, i, o) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + ' ' + O.join(s + ' ') + s).split(' ');
    return r(n, 'string') || r(n, 'undefined')
      ? v(a, n, i, o)
      : ((a = (e + ' ' + k.join(s + ' ') + s).split(' ')), c(a, n, t));
  }
  function y(e, n, r) {
    return g(e, t, t, n, r);
  }
  var _ = [],
    C = [],
    w = {
      _version: '3.3.1',
      _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
      _q: [],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e]);
        }, 0);
      },
      addTest: function (e, n, t) {
        C.push({ name: e, fn: n, options: t });
      },
      addAsyncTest: function (e) {
        C.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = w),
    (Modernizr = new Modernizr()),
    Modernizr.addTest('ie8compat', !e.addEventListener && !!n.documentMode && 7 === n.documentMode),
    Modernizr.addTest('json', 'JSON' in e && 'parse' in JSON && 'stringify' in JSON);
  var x = n.documentElement,
    S = 'svg' === x.nodeName.toLowerCase(),
    b = (function () {
      function e(e, n) {
        var i;
        return e
          ? ((n && 'string' != typeof n) || (n = s(n || 'div')),
            (e = 'on' + e),
            (i = e in n),
            !i &&
              r &&
              (n.setAttribute || (n = s('div')),
              n.setAttribute(e, ''),
              (i = 'function' == typeof n[e]),
              n[e] !== t && (n[e] = t),
              n.removeAttribute(e)),
            i)
          : !1;
      }
      var r = !('onblur' in n.documentElement);
      return e;
    })();
  (w.hasEvent = b), Modernizr.addTest('ambientlight', b('devicelight', e));
  var T = w._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
  w._prefixes = T;
  var P = 'CSS' in e && 'supports' in e.CSS,
    E = 'supportsCSS' in e;
  Modernizr.addTest('supports', P || E);
  var N;
  !(function () {
    var e = {}.hasOwnProperty;
    N =
      r(e, 'undefined') || r(e.call, 'undefined')
        ? function (e, n) {
            return n in e && r(e.constructor.prototype[n], 'undefined');
          }
        : function (n, t) {
            return e.call(n, t);
          };
  })(),
    (w._l = {}),
    (w.on = function (e, n) {
      this._l[e] || (this._l[e] = []),
        this._l[e].push(n),
        Modernizr.hasOwnProperty(e) &&
          setTimeout(function () {
            Modernizr._trigger(e, Modernizr[e]);
          }, 0);
    }),
    (w._trigger = function (e, n) {
      if (this._l[e]) {
        var t = this._l[e];
        setTimeout(function () {
          var e, r;
          for (e = 0; e < t.length; e++) (r = t[e])(n);
        }, 0),
          delete this._l[e];
      }
    }),
    Modernizr._q.push(function () {
      w.addTest = a;
    }),
    a('htmlimports', 'import' in s('link'));
  var z = (w.testStyles = l),
    A = 'Moz O ms Webkit',
    O = w._config.usePrefixes ? A.split(' ') : [];
  w._cssomPrefixes = O;
  var j = function (n) {
    var r,
      i = T.length,
      o = e.CSSRule;
    if ('undefined' == typeof o) return t;
    if (!n) return !1;
    if (((n = n.replace(/^@/, '')), (r = n.replace(/-/g, '_').toUpperCase() + '_RULE'), r in o)) return '@' + n;
    for (var s = 0; i > s; s++) {
      var a = T[s],
        f = a.toUpperCase() + '_' + r;
      if (f in o) return '@-' + a.toLowerCase() + '-' + n;
    }
    return !1;
  };
  w.atRule = j;
  var k = w._config.usePrefixes ? A.toLowerCase().split(' ') : [];
  w._domPrefixes = k;
  var L = { elem: s('modernizr') };
  Modernizr._q.push(function () {
    delete L.elem;
  });
  var q = { style: L.elem.style };
  Modernizr._q.unshift(function () {
    delete q.style;
  }),
    (w.testAllProps = g);
  var M = (w.prefixed = function (e, n, t) {
    return 0 === e.indexOf('@') ? j(e) : (-1 != e.indexOf('-') && (e = f(e)), n ? g(e, n, t) : g(e, 'pfx'));
  });
  Modernizr.addTest('requestanimationframe', !!M('requestAnimationFrame', e), { aliases: ['raf'] }),
    (w.testAllProps = y),
    Modernizr.addTest('cssanimations', y('animationName', 'a', !0)),
    Modernizr.addTest('cssfilters', function () {
      if (Modernizr.supports) return y('filter', 'blur(2px)');
      var e = s('a');
      return (
        (e.style.cssText = T.join('filter:blur(2px); ')),
        !!e.style.length && (n.documentMode === t || n.documentMode > 9)
      );
    }),
    Modernizr.addTest('csstransforms', function () {
      return -1 === navigator.userAgent.indexOf('Android 2.') && y('transform', 'scale(1)', !0);
    }),
    Modernizr.addTest('csstransforms3d', function () {
      var e = !!y('perspective', '1px', !0),
        n = Modernizr._config.usePrefixes;
      if (e && (!n || 'webkitPerspective' in x.style)) {
        var t,
          r = '#modernizr{width:0;height:0}';
        Modernizr.supports
          ? (t = '@supports (perspective: 1px)')
          : ((t = '@media (transform-3d)'), n && (t += ',(-webkit-transform-3d)')),
          (t += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}'),
          z(r + t, function (n) {
            e = 7 === n.offsetWidth && 18 === n.offsetHeight;
          });
      }
      return e;
    }),
    Modernizr.addTest('csstransitions', y('transition', 'all', !0)),
    i(),
    o(_),
    delete w.addTest,
    delete w.addAsyncTest;
  for (var R = 0; R < Modernizr._q.length; R++) Modernizr._q[R]();
  e.Modernizr = Modernizr;
})(window, document);

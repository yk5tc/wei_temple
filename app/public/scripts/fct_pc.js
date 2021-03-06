var YUEWEN = function(e, t, a) {    //t:window
  var n = "active"
    , i = "reverse"
    , exports = {
    el: {},
    load: function(t, a) {
      var n = this;
      a = a || function() {}
      ;
      var i = document.createElement("script");
      i.onload = function() {
        i.isInited || (i.isInited = !0,
          a.call(n))
      }
        ,
        i.onreadystatechange = function() {
          !i.isInited && /^loaded|complete$/.test(i.readyState) && (i.isInited = !0,
            a.call(n))
        }
        ,
        i.src = t,
        e.getElementsByTagName("head")[0].appendChild(i)
    },
    scrollLoading: function(a) {
      var n = [];
      if (a && a.length) {
        a.each(function() {
          e.querySelector && (this.src = "data:image/gif;base64,R0lGODlhCgAKAIAAAP///wAAACH5BAEAAAAALAAAAAAKAAoAAAIIhI+py+0PYysAOw=="),
            n.push({
              obj: this,
              src: $(this).attr("data-src")
            })
        });
        var i = function() {
          var e = $(t).height()
            , a = $(t).width();
          $.each(n, function(t, n) {
            var i = n.obj;
            if (i) {
              var r = i.getBoundingClientRect();
              if (0 != r.left || 0 != r.top) {
                var s = i.clientWidth
                  , o = i.clientHeight
                  , l = !1;
                r.top + o >= 0 && r.top < e && (l = !0);
                var c = !1;
                r.left + s >= 0 && r.left < a && (c = !0),
                l && c && (i.src = n.src,
                  i.removeAttribute("data-src"),
                  n.obj = null)
              }
            }
          })
        };
        this.el.container.on("scroll", i),
          this.el.container.on("resize", i),
          i()
      }
    },
    swipe: function(e, t, a) {
      var n = this;
      if (0 == $.isFunction(a))
        return n;
      var i = {
        x: 0,
        y: 0
      }
        , r = {}
        , s = {
        start: function(e) {
          var t = e.touches[0];
          i = {
            x: t.pageX,
            y: t.pageY,
            time: +new Date
          }
        },
        move: function(e) {
          if (!(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
            var t = e.touches[0];
            r = {
              x: t.pageX - i.x,
              y: t.pageY - i.y
            }
          }
        },
        end: function(n) {
          var o = +new Date - i.time
            , l = Number(o) < 500;
          if (l) {
            var c = Math.abs(r.x)
              , d = Math.abs(r.y);
            c > 20 && d < c && (r.x < 0 && "left" == t || r.x > 0 && "right" == t) && a.call(e[0], s),
            d > 20 && c < d && (r.y < 0 && "top" == t || r.y > 0 && "bottom" == t) && a.call(e[0], s)
          }
          i = {},
            r = {}
        }
      };
      return e.on("touchstart", s.start),
        e.on("touchmove", s.move),
        e.on("touchend", s.end),
        n
    },
    slide: function(e, t) {
      var a = this;
      if ("string" == typeof e && (e = $(e)),
        e && e.length) {
        var i = 0
          , r = $.map(e, function(e, t) {
          var a = "";
          return e = $(e),
            e.hasClass(n) ? i = t : (a = e.attr("data-hash")) && location.hash.replace("#", "") == a && (i = t),
            $("#" + e.data("index", t).attr("data-rel"))
        });
        e.eq(i).addClass(n),
          e.on("click", function() {
            var e = $(this)
              , t = +e.data("index");
            0 == e.hasClass(n) && s(t)
          });
        var s = function(s) {
          e.eq(i).removeClass(n),
            e.eq(s).addClass(n),
            $(r[i]).removeClass(n),
            $(r[s]).addClass(n),
          $.isFunction(t) && t.call(a, e.eq(s), r[s], e.eq(i), r[i]),
            i = s
        }
      }
      return this
    },
    slidePreload: function() {
      var e = this;
      return e.isPreload = !0,
        e
    },
    slideHomeApp: function() {
      var e = this
        , a = e.el.tabApp = $("#tabApp")
        , i = e.el.tabLine = $("#tabLine")
        , r = a.find("a")
        , s = function(r) {
        var s = a.find("." + n)
          , o = 0;
        if (s.length && (o = s.position().left,
            i.css({
              width: s.width()
            }),
            history.pushState ? i.css({
              webkitTransform: "translateX(" + o + "px)",
              transform: "translateX(" + o + "px)"
            }) : i.css({
              left: s.position().left
            })),
          t.FN_hash && r !== !0) {
          var l = s.attr("data-hash");
          location.replace(location.href.split("#")[0] + "#" + l),
            FN_hash(),
            e.el.container.trigger("scroll")
        }
      };
      if (e.slide(r, s),
          s(!0),
        "S" == t.SIZE) {
        var o = $("#mobile ul");
        e.swipe(o, "left", function() {
          var e = 1 * a.find("." + n).data("index");
          e++,
          e > r.length - 1 && (e = 0),
            r.eq(e).trigger("click")
        }),
          e.swipe(o, "right", function() {
            var e = 1 * a.find("." + n).data("index");
            e--,
            e < 0 && (e = r.length - 1),
              r.eq(e).trigger("click")
          }),
          $("#mobile a").removeAttr("target"),
          $(".mNoBlank").removeAttr("target")
      }
      return e
    },
    slideBrand: function() {
      var e, t, a = this, r = a.el.brandDescX = $("#brandDescX"), s = a.el.brandNavX = $("#brandNavX");
      return r.length && s.length && (e = r.find("li"),
        t = s.find("a"),
        t.each(function(t) {
          $(this).data("index", t).on("mouseenter", function() {
            var t = $(this)
              , r = null
              , o = -1
              , l = t.data("index");
            clearTimeout(a.timerNavHover),
              a.timerNavHover = setTimeout(function() {
                if (t.hasClass(n) === !1) {
                  r = s.find("." + n),
                  1 == r.length && (o = r.data("index"),
                    r.removeClass(n)),
                    t.addClass(n);
                  var a = !1;
                  l < o && (a = !0);
                  var c = e.eq(o);
                  c.length && (c.removeClass("in").removeClass(i).addClass("out"),
                  a && c.addClass(i)),
                    e.eq(l).addClass("in").removeClass(i).removeClass("out"),
                  a && e.eq(l).addClass(i)
                }
              }, 225)
          })
        }),
        s.on("mouseleave", function() {
          clearTimeout(a.timerNavHover)
        })),
        a
    },
    slideHomeHeader: function() {
      var a = this
        , i = a.el.header
        , r = a.el.dots;
      if (i.length) {
        var s = function() {
          a.timerSlide || (a.timerSlide = setInterval(function() {
            var e = 1 * $("#hdDotX ." + n).data("index") + 1;
            r[e] || (e = 0),
              r.eq(e).trigger("click")
          }, 5e3))
        };
        "S" !== t.SIZE ? (i.on("mouseenter", function() {
          clearInterval(a.timerSlide),
            a.timerSlide = null
        }).on("mouseleave", function() {
          s()
        }),
          $(e).on("mouseover", function() {
            a.isPreload || (setTimeout(function() {
              a.isPreload || a.slidePreload()
            }, 4e3),
              setTimeout(function() {
                s()
              }, 5e3))
          })) : (a.swipe(i, "left", function() {
          var e = 1 * $("#hdDotX ." + n).data("index");
          e++,
          e > r.length - 1 && (e = 0),
            r.eq(e).trigger("click")
        }),
          a.swipe(i, "right", function() {
            var e = 1 * $("#hdDotX ." + n).data("index");
            e--,
            e < 0 && (e = r.length - 1),
              r.eq(e).trigger("click")
          }))
      }
      return this
    },
    showQr: function() {
/*      $(".jsLoadQr").on("mouseover mouseout", function(e) {
        "mouseover" == e.type ? $(".jsPicQr").css("display", "block") : "mouseout" == e.type && $(".jsPicQr").css("display", "none")
      });*/

      $(document).on("click",".pop-btn", function() {
        var e = $(this);
        if(e.parents('.check-code').find('.qrcode-contianer').css('display') == 'block'){
          e.parents('.check-code').find('.qrcode-contianer').hide();
        }else {
          e.parents('.check-code').find('.qrcode-contianer').show();
        }

      });

    },
    scrollBarFixed: function() {
      var a = this
        , i = a.el.header
        , r = a.el.container;
      a.el.hdBar = $("#ywHdBar");
      var s, o = $("#ywMnavBtn"), l = $("#ywMnavName");
      a.el.barNav = o;
      var c = 0
        , d = []
        , h = $("#ywMnav > a").each(function(e) {
        var t = this.getAttribute("href");
        /^#/.test(t) && d.push($(t));
        var a = location.hash.replace("&", "");
        a == t && (c = e)
      });
      if (i.length)
        if ("S" == t.SIZE) {
          s = a.el.hdBar;
          var u = $(".jsSwiper")
            , f = $(".jsHuGeBg")
            , v = $(".jsHugeArr")
            , p = $(".jsHeader");
          $(".jsAppImg");
          "QQ" == window.APP && p.css("height", "calc(100vh + 80px)"),
            r.on("scroll", function(e) {
              var t = $(this).scrollTop();
              t <= 0 ? (s.removeClass("fixed"),
                s.css("opacity", 1),
                u.css("opacity", "0"),
                v.css("display", "block"),
                f.css("filter", "blur(0px)"),
                f.css("top", "-30px")) : t > 0 && t <= 80 ? (s.addClass("fixed"),
                s.css("opacity", Math.min(t, 30) / 30),
                u.css("opacity", Math.min(t, 40) / 40),
                f.css("position", "fixed"),
                f.css("filter", "blur(" + Math.min(t, 40) / 4 + "px)"),
                v.css("display", "none"),
                f.css("top", "-30px")) : t > 80 && (f.css("position", "absolute"),
                  f.css("top", "50px"));
              var a = $.map(d, function(module) {
                return module[0].getBoundingClientRect().top
              })
                , i = $.map(a, function(e) {
                return Math.abs(e)
              })
                , r = Math.min.apply(null, i);
              $.each(a, function(e, t) {
                (0 == e && t > 0 || e == a.length - 1 && t < 0 || Math.abs(t) == r) && (h.removeClass(n),
                  l.html(h.eq(e).addClass(n).html()),
                  c = e)
              })
            }),
            r.on("touchend", function(e) {
              u.css("opacity", 1),
                f.css("position", "absolute"),
                f.css("filter", "blur(10px)"),
                console.log("dfdf")
            }),
            o.on("touchstart", function() {
              $(this).toggleClass(n)
            })
        } else if (!t.APP) {
          if (s = $("#ywBarX"),
            0 == s.length)
            return a;
          a.el.barX = s;
          var m = s[0].className.split(" ")[0] + "-fixed"
            , g = function(e, t) {
            h.removeClass(n),
              h.eq(e).addClass(n);
            var a = h.eq(e).attr("href");
            /#/.test(a) && location.replace("#&" + a.split("#")[1]),
              c = e
          };
          a.el.container.on("scroll", function() {
            var t = $(this).scrollTop();
            return t <= 0 ? (s.removeClass(m),
              s.css("opacity", 1)) : (s.addClass(m),
              s.css("opacity", Math.min(t, 50) / 50)),
              a.triggerScroll ? void $.each(d, function(e, t) {
                t[0] == a.triggerScroll && (c = e)
              }) : t == e.documentElement.scrollHeight - e.documentElement.clientHeight ? (c = d.length - 1,
                void g(c, !0)) : void $.each(d, function(e, module) {
                var t = module[0];
                c !== e && Math.abs(t.getBoundingClientRect().top) <= 75 && g(e, !0)
              })
          }),
          0 != c && g(c),
            a.el.container.trigger("scroll")
        }
      return a
    },
    tapHomeCopy: function() {
      var a = this;
      a.el.copy = $("#ywCopyX");
      var i = null
        , r = null
        , s = a.el.copy;
      if (s.length && "S" == t.SIZE) {      //t:window
        var o = Math.round((s[0].scrollWidth - s.width()) / 2);
        s.scrollLeft(o),
          s.on("scroll", function() {
            a.el.container.trigger("scroll"),
            this.scrollEd || s.scrollLeft() === o || ($("#copyright svg").hide(),
              this.scrollEd = !0)
          });
        var l = {
          x: 0,
          y: 0
        };
        s.find("li > div").on({
          touchstart: function(e) {
            var t = e.touches[0] || e;
            l = {
              x: t.pageX,
              y: t.pageY
            };
            var a = this;
            r = a,
              i = setTimeout(function() {
                r == a && $(a).addClass(n)
              }, 500)
          }
        }),
          $(e).on("touchend", function() {
            clearTimeout(i),
              r = null,
              s.find("." + n).removeClass(n)
          }).on("touchmove", function(e) {
            var t = e.touches[0] || e;
            (Math.abs(t.pageX - l.x) > 5 || Math.abs(t.pageY - l.y) > 5) && clearTimeout(i)
          })
      } else if (s.length) {
        var c = s.find("ul")
          , d = parseInt(c.css("marginLeft"));
        c.find("li").on("mouseenter", function() {
          var e = this.getBoundingClientRect()
            , a = 0
            , n = $(t).width();
          (e.left < 0 || e.right > n) && (a = e.left < 0 ? Math.floor(-1 * e.left) : Math.ceil(n - e.right),
            [].map ? c.css({
              msTransform: "translateX(" + a + "px)",
              transform: "translateX(" + a + "px)"
            }) : c.css("marginLeft", d + a))
        }).on("mouseleave", function() {
          [].map ? c.css({
            msTransform: "none",
            transform: "none"
          }) : c.css("marginLeft", d)
        })
      }
      return a
    },
    getNews: function() {
      var a = this
        , n = a.urlNewsList
        , r = $("#yw-news-x")
        , s = $("#newsLoading")
        , c = $("#ywNewslay")
        , d = $("#news-list"),
        _detail = $("#news-detail"),
        _back = $("#back"),
        pager = {};

      $(document).on( "click", ".jsShut",function() {
        c.hide(),d.hide(),_detail.hide(),_back.hide();
        "S" != t.SIZE && (e.documentElement.style.overflow = "",
          $(e.body).css("border-right", "0"))
      });
      var h = function(e) {
        return '<p class="yw-news-fn">' + e + "</p>"
      }
        , u = h("已全部加载完毕");
      $(document).on( "click",".jsLayMore", function() {
        var e = $(this)
          , t = e.attr("data-page");
        if(pager.next > 0){
          e.html("加载中..."),
            $.ajax({
              url: n + '?page=' + t,
              dataType: 'json',
              data: {
                more: 1,
                page: t
              },
              success: function(t) {
                if (200 == t.code) {
                  d.append(t.data.entries);
                  pager = t.data.pager;
                }
              },
              complete: function() {
                e.html("查看更多")
              },
              error: function() {
                e.before(h("网络异常，没有加载成功")).remove()
              }
            })
        }
        else {
          d.append('<div>没有更多了...</div>');
        }

      });
      $(document).on( "click", "#moreNews", function() {
        /*
        "news": {
         "message": "xxx",
         "url": "",
         "code": 200,
         "data": {
         "entries": "<div class="yw-news-li">
         <div class="yw-news-detail">
         <h5 class="yw-news-title"><a href="http://mp.weixin.qq.com/s/pNZ4awBB_wPKmD3LatUlmg" target="_blank">阅文集团白金作家叶非夜：找回创作的初心</a>
         </h5>
         <div class="yw-news-time">
         <span class="yw-news-tag">人物</span>
         <time>2017-07-25</time>
         </div>
         <p class="yw-news-sum">阅文集团白金作家，高人气IP《国民老公带回家》原著作者叶非夜对即将召开的中国网络文学大会表示很期待，并讲述了她在网络文学行业发展中的心路历程，愿以初心做好该做的事。</p>
         <p class="yw-news-more">
         <a href="http://mp.weixin.qq.com/s/pNZ4awBB_wPKmD3LatUlmg" target="_blank" class="yw-news-more-a">阅读更多
         &gt;</a>
         </p>
         </div>
         </div>
         <div class="yw-news-li">
         <div class="yw-news-detail">
         <h5 class="yw-news-title"><a href="http://mp.weixin.qq.com/s/vyiPbc6cT39XD7JS6wN2rg" target="_blank">阅文集团大神作家国王陛下：写出正能量的作品是网文作者的社会担当</a>
         </h5>
         <div class="yw-news-time">
         <span class="yw-news-tag">人物</span>
         <time>2017-07-25</time>
         </div>
         <p class="yw-news-sum">阅文集团大神作家，知名仙侠作品《从前有座灵剑山》作者国王陛下在中国网络文学大会召开前夕受访，表示能够写出一部让大家喜欢的正能量作品就是作为一个网文作者的社会担当。</p>
         <p class="yw-news-more">
         <a href="http://mp.weixin.qq.com/s/vyiPbc6cT39XD7JS6wN2rg" target="_blank" class="yw-news-more-a">阅读更多
         &gt;</a>
         </p>
         </div>
         </div>
         <div class="yw-news-li">
         <div class="yw-news-detail">
         <h5 class="yw-news-title"><a href="http://mp.weixin.qq.com/s/FAE_woZzQTfJNdFEj5ZkwQ" target="_blank">阅文大数据洞察：女性向市场升级趋势</a>
         </h5>
         <div class="yw-news-time">
         <span class="yw-news-tag">报告</span>
         <time>2017-07-04</time>
         </div>
         <p class="yw-news-sum">
         中国正在步入“她时代”。随着女性收入及社会地位的提高，以女性为中心的消费主义成为新的潮流。娱乐方式的多元化、内容产业的扩大和细分，带动这股风潮从消费市场蔓延到文化娱乐市场，垂直女性内容正在成为下一个风口。<br>作为新兴的内容细分领域，女性内容产业正在经历新的结构升级。“她”们拥有什么样的内容消费习惯，需要什么样的产品？通过对内容产业源头——数字阅读女性用户的盘点和分析，我们能能够深入了解，“她时代”内容应该如何迭代。
         </p>
         <p class="yw-news-more">
         <a href="http://mp.weixin.qq.com/s/FAE_woZzQTfJNdFEj5ZkwQ" target="_blank" class="yw-news-more-a">阅读更多
         &gt;</a>
         </p>
         </div>
         </div>",
         "pager": {
         "prev": 0,
         "current": 1,
         "next": 1,
         "page_size": 20,
         "total_page": 1,
         "total": 1
         }
         }
         }, */
        e.documentElement.style.overflow = "hidden";
        var i = {
          more: 1,
          page: $(this).attr("data-page")
        };
        d.show();
        c.show();
        $.ajax({
          url: n + '?page=' + i.page,
          data: i,
          dataType: 'json',
          success: function(e) {
            if (200 == e.code) {
              d.html(e.data.entries);
              pager = e.data.pager;
            } else{
              // d.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
            }
          },
          error: function() {
            // d.html('<div class="error">网络异常，稍后重试</div>')
          }
        })
      });
      $(document).on( "click", ".news-link", function() {
        var _this = $(this);
        if(_this.data('urltype') == 0){
          /* 跳转 */
          location.href = _this.data('url');
        }else {
          /* 1: 弹窗显示详情 */
          _back.show();
          $.ajax({
            url:  _this.data('url'),
            dataType: 'json',
            success: function(e) {
              if (200 == e.code) {
                _detail.html(e.data);
              } else{
                // d.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
              }
            },
            error: function() {
              // d.html('<div class="error">网络异常，稍后重试</div>')
            }
          })
          var display =c.css('display');
          if(display == 'none'){    /* 判断是否已经弹窗 */
            e.documentElement.style.overflow = "hidden";
            _detail.show();
            // d.hide();
            c.show();
          }
          else {
            d.hide();
            _detail.show();
          }
        }

        return false;

      });
      $(document).on( "click", ".js-opt", function() {
        var _this = $(this);
          $.ajax({
            url:  _this.data('url'),
            dataType: 'json',
            success: function(e) {
              if (200 == e.code) {
                _detail.html(e.data);
              } else{
                // d.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
              }
            },
            error: function() {
              // d.html('<div class="error">网络异常，稍后重试</div>')
            }
          })



      });
      $(document).on( "click", "#back", function() {
        var _this = $(this);
        $.ajax({
          url: n + '?page=1',
          dataType: 'json',
          success: function(e) {
            if (200 == e.code) {
              d.html(e.data.entries);
              pager = e.data.pager;
              _detail.hide();
              d.show();
              _back.hide();
            } else{
              // d.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
            }
          },
          error: function() {
            // d.html('<div class="error">网络异常，稍后重试</div>')
          }
        })

      });

      return a
    },
    showImage: function(e) {
      var t = this
        , a = t.el.overlay;
      if (a) {
        if (a.data("lasturl") === e)
          return void a.addClass(n).show();
        a.html(a.data("origin"))
      } else
        a = $("#ywOverlay"),
          a.data("origin", a.html()).on("click", function() {
            $(this).removeClass(n).hide()
          }),
          t.el.overlay = a;
      var i = a.children("div").removeAttr("style");
      a.show();
      var r = new Image;
      return r.onload = function() {
        var t = this.width
          , n = this.height;
        setTimeout(function() {
          i.css({
            width: t,
            height: n
          }).html('<img src="' + e + '">'),
            a.data("lasturl", e)
        }, 200)
      }
        ,
        r.onerror = function() {
          i.html('<div class="error">图片显示异常，请重试</div>')
        }
        ,
        r.src = e,
        this
    },
    scrollIntoView: function(e, a, n) {
      var i = this
        , r = i.el.container;
      n = n || "top";
      var s = "scroll" + n.slice(0, 1).toUpperCase() + n.slice(1, n.length);
      if (e && e.length) {
        clearTimeout(i.timerScroll);
        var o = r[s]()
          , l = e.offset()[n] + o;
        "S" == t.SIZE ? l -= 50 : t.APP || (l = e.offset()[n] - 74);
        var c = 10
          , d = o
          , h = function() {
          var t = (l - d) / c;
          Math.abs(t) < 1 / c ? (r[s](l),
          $.isFunction(a) && a.call(e[0])) : (d += t,
            r[s](d),
            i.timerScroll = setTimeout(h, 20))
        };
        h()
      }
      return i
    },
    eventsGlobal: function() {
      var a = this;
      return $(e).delegate("a", "click", function(e) {
        var i = this.getAttribute("href");
        this.href;
        /^#/.test(i) ? (a.scrollIntoView($(i), function() {
          "S" != t.SIZE && (location.replace("#&" + i.split("#")[1]),
            a.triggerScroll = null)
        }),
        "S" == t.SIZE || /nav/.test(this.className) && (a.triggerScroll = this,
          $(this).addClass(n).siblings("a").removeClass(n)),
          e.preventDefault()) : /\.(?:png|jpg)$/.test(i) ? (a.showImage(i),
          e.preventDefault()) : /#/.test(i) && ($(this).parent().find("." + n).removeClass(n),
            $(this).addClass(n))
      }),
        this.scrollLoading($("img[data-src]")),
        a
    },
    eventsHome: function() {
      var e = this;
      e.slideHomeHeader(),
        e.scrollBarFixed(),
        e.slideHomeApp(),
        e.slideBrand();
        // e.tapHomeCopy();
      var a;
      return "S" == t.SIZE && (a = e.el.barNav || $("#ywMnavBtn"),
        $("#ywMnav").click(function() {
          a.removeClass(n)
        })),
        e.getNews(),
        e.showQr();
    },
    eventsApp: function() {
      var e = this
        , a = /Android/i
        , n = a.test(navigator.userAgent);
      "S" == t.SIZE && $("a[data-href]").each(function() {
        $(this).attr("href", $(this).attr("data-href")).removeAttr("data-href")
      }),
        $(".dlBtn").each(function() {
          var e = this
            , t = e.getAttribute("href");
          "" == t && $(e).siblings("a").each(function() {
            var t = this.innerHTML;
            n && a.test(t) ? e.href = this.href : 0 == n && /ios/i.test(t) && (e.href = this.href)
          })
        }),
        e.scrollBarFixed(),
        e.slideHomeApp(),
        e.showQr();
      var i = 1;
      ![].map && (i = $(t).width() / 1440) > 1 && e.el.header.css("overflow", "hidden").find("s").each(function() {
        var e = $(this);
        e.css("zoom", i).css("left", -.5 * $(t).width() * (i - 1))
      });
      var r = e.el.tabApp;
      return r && r.find("a").on({
        mouseenter: function() {
          var e = this
            , t = $(e)
            , a = -1
            , n = "";
          e.isPreload || (a = +t.data("index") + 1,
            n = $("#hdAPP" + a).find("s").css("background-image"),
          n && (n = n.split('"')[1],
          n && ((new Image).src = n))),
            e.isPreload = !0
        }
      }),
        e
    },
    init: function() {
      var e = this;
      e.loadVideo();
      return e.el.container = "S" == t.SIZE ? $("#ywPage") : $(t),
        e.el.header = $("#ywHeader"),
        e.el.dots = $("#hdDotX a"),
        t.APP ? e.eventsApp() : e.eventsHome(),
        e.eventsGlobal(),
        e
    },
    loadVideo: function () {
      var _this = $(this), _poster = $('.js-poster'), _video = $('video.js-v').get(0);
      $(document).on( "click", ".js-poster",function() {
        _poster.hide();
        _video.src = $('video.js-v').data('src');
        _video.play();
      });
    },
  };
  return exports
}(document, window);

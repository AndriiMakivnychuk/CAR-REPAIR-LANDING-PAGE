(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        o = e.dataset.da.trim().split(","),
        s = {};
      (s.element = e),
        (s.parent = e.parentNode),
        (s.destination = document.querySelector(o[0].trim())),
        (s.breakpoint = o[1] ? o[1].trim() : "767"),
        (s.place = o[2] ? o[2].trim() : "last"),
        (s.index = this.indexInParent(s.parent, s.element)),
        this.оbjects.push(s);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, o) {
          return Array.prototype.indexOf.call(o, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const o = this.mediaQueries[e],
        s = String.prototype.split.call(o, ","),
        n = window.matchMedia(s[0]),
        i = s[1],
        r = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === i;
        });
      n.addListener(function () {
        t.mediaHandler(n, r);
      }),
        this.mediaHandler(n, r);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const o = e[t];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const o = e[t];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, o) {
      e.classList.add(this.daClassname),
        "last" === t || t >= o.children.length
          ? o.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? o.children[t].insertAdjacentElement("beforebegin", e)
          : o.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, o) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[o]
          ? t.children[o].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const o = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(o, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  class e {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (t) {
              const e = t.detail.form.dataset.popupMessage;
              e && this.open(e);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${o}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          i &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        o = Array.prototype.slice.call(e),
        s = o.indexOf(document.activeElement);
      t.shiftKey && 0 === s && (o[o.length - 1].focus(), t.preventDefault()),
        t.shiftKey || s !== o.length - 1 || (o[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && c(`[Попапос]: ${t}`);
    }
  }
  let o = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        o.Android() || o.BlackBerry() || o.iOS() || o.Opera() || o.Windows()
      );
    },
  };
  let s = (t, e = 500, o = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = o ? `${o}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !o),
            !o && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !o && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide");
        }, e));
    },
    n = (t, e = 500, o = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          o && t.style.removeProperty("height");
        let s = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = o ? `${o}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = s + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide");
          }, e);
      }
    },
    i = !0,
    r = (t = 500) => {
      document.documentElement.classList.contains("lock") ? a(t) : l(t);
    },
    a = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    },
    l = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    };
  function c(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function d(t, e) {
    const o = Array.from(t).filter(function (t, o, s) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (o.length) {
      const t = [];
      o.forEach((o) => {
        const s = {},
          n = o.dataset[e].split(",");
        (s.value = n[0]),
          (s.type = n[1] ? n[1].trim() : "max"),
          (s.item = o),
          t.push(s);
      });
      let s = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      s = (function (t) {
        return t.filter(function (t, e, o) {
          return o.indexOf(t) === e;
        });
      })(s);
      const n = [];
      if (s.length)
        return (
          s.forEach((e) => {
            const o = e.split(","),
              s = o[1],
              i = o[2],
              r = window.matchMedia(o[0]),
              a = t.filter(function (t) {
                if (t.value === s && t.type === i) return !0;
              });
            n.push({ itemsArray: a, matchMedia: r });
          }),
          n
        );
    }
  }
  let p = (t, e = !1, o = 500, s = 0) => {
    const n = document.querySelector(t);
    if (n) {
      let i = "",
        r = 0;
      e &&
        ((i = "header.header"), (r = document.querySelector(i).offsetHeight));
      let l = {
        speedAsDuration: !0,
        speed: o,
        header: i,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (a(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", l);
      else {
        let t = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: r ? t - r : t, behavior: "smooth" });
      }
      c(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else c(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  const u = { inputMaskModule: null, selectModule: null };
  let h = {
    getErrors(t) {
      let e = 0,
        o = t.querySelectorAll("*[data-required]");
      return (
        o.length &&
          o.forEach((t) => {
            (null === t.offsetParent && "SELECT" !== t.tagName) ||
              t.disabled ||
              (e += this.validateInput(t));
          }),
        e
      );
    },
    validateInput(t) {
      let e = 0;
      return (
        "email" === t.dataset.required
          ? ((t.value = t.value.replace(" ", "")),
            this.emailTest(t) ? (this.addError(t), e++) : this.removeError(t))
          : ("checkbox" !== t.type || t.checked) && t.value
          ? this.removeError(t)
          : (this.addError(t), e++),
        e
      );
    },
    addError(t) {
      t.classList.add("_form-error"),
        t.parentElement.classList.add("_form-error");
      let e = t.parentElement.querySelector(".form__error");
      e && t.parentElement.removeChild(e),
        t.dataset.error &&
          t.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${t.dataset.error}</div>`
          );
    },
    removeError(t) {
      t.classList.remove("_form-error"),
        t.parentElement.classList.remove("_form-error"),
        t.parentElement.querySelector(".form__error") &&
          t.parentElement.removeChild(
            t.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let e = t.querySelectorAll("input,textarea");
          for (let t = 0; t < e.length; t++) {
            const o = e[t];
            o.parentElement.classList.remove("_form-focus"),
              o.classList.remove("_form-focus"),
              h.removeError(o),
              (o.value = o.dataset.placeholder);
          }
          let o = t.querySelectorAll(".checkbox__input");
          if (o.length > 0)
            for (let t = 0; t < o.length; t++) {
              o[t].checked = !1;
            }
          if (u.selectModule) {
            let e = t.querySelectorAll(".select");
            if (e.length)
              for (let t = 0; t < e.length; t++) {
                const o = e[t].querySelector("select");
                u.selectModule.selectBuild(o);
              }
          }
        }, 0);
    },
    emailTest: (t) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value),
  };
  let m = !1;
  setTimeout(() => {
    if (m) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  document.querySelector(".search-header"),
    document.querySelector(".search-input");
  document.querySelectorAll(".arrow").forEach((t) => {
    t.previousElementSibling.classList.add("parent");
  });
  const f = document.querySelector("body");
  if (o.any()) {
    f.classList.add("_touch");
    document.querySelectorAll(".arrow").forEach((t) => {
      const e = t.nextElementSibling;
      t.addEventListener("click", function (o) {
        e.classList.toggle("_open"),
          e.classList.contains("_open")
            ? (e.style.height = e.scrollHeight + "px")
            : (e.style.height = 0),
          t.classList.toggle("_active");
      });
    });
  } else f.classList.add("_mouse");
  const y = document.querySelector(".video-play__button"),
    g = document.querySelector(".popup__close");
  document.querySelector(".video-popup") &&
    y.addEventListener("click", function () {
      y.classList.add("_open-popup"),
        y.classList.contains("_open-popup") &&
          document.querySelector(".video-popup").play(),
        g.addEventListener("click", function (t) {
          document.querySelector(".video-popup").pause();
        });
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          i && (r(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-tabs]");
      let e = [];
      if (t.length > 0) {
        const s = location.hash.replace("#", "");
        s.startsWith("tab-") && (e = s.replace("tab-", "").split("-")),
          t.forEach((t, o) => {
            t.classList.add("_tab-init"),
              t.setAttribute("data-tabs-index", o),
              t.addEventListener("click", i),
              (function (t) {
                const o = t.querySelectorAll("[data-tabs-titles]>*"),
                  s = t.querySelectorAll("[data-tabs-body]>*"),
                  n = t.dataset.tabsIndex,
                  i = e[0] == n;
                if (i) {
                  t.querySelector(
                    "[data-tabs-titles]>._tab-active"
                  ).classList.remove("_tab-active");
                }
                s.length > 0 &&
                  s.forEach((t, s) => {
                    o[s].setAttribute("data-tabs-title", ""),
                      t.setAttribute("data-tabs-item", ""),
                      i && s == e[1] && o[s].classList.add("_tab-active"),
                      (t.hidden = !o[s].classList.contains("_tab-active"));
                  });
              })(t);
          });
        let n = d(t, "tabs");
        n &&
          n.length &&
          n.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              o(t.itemsArray, t.matchMedia);
            }),
              o(t.itemsArray, t.matchMedia);
          });
      }
      function o(t, e) {
        t.forEach((t) => {
          const o = (t = t.item).querySelector("[data-tabs-titles]"),
            s = t.querySelectorAll("[data-tabs-title]"),
            n = t.querySelector("[data-tabs-body]");
          t.querySelectorAll("[data-tabs-item]").forEach((i, r) => {
            e.matches
              ? (n.append(s[r]), n.append(i), t.classList.add("_tab-spoller"))
              : (o.append(s[r]), t.classList.remove("_tab-spoller"));
          });
        });
      }
      function i(t) {
        const e = t.target;
        if (e.closest("[data-tabs-title]")) {
          const o = e.closest("[data-tabs-title]"),
            i = o.closest("[data-tabs]");
          if (
            !o.classList.contains("_tab-active") &&
            !i.querySelectorAll("._slide").length
          ) {
            const t = i.querySelector("[data-tabs-title]._tab-active");
            t && t.classList.remove("_tab-active"),
              o.classList.add("_tab-active"),
              (function (t) {
                const e = t.querySelectorAll("[data-tabs-title]"),
                  o = t.querySelectorAll("[data-tabs-item]"),
                  i = t.dataset.tabsIndex,
                  r = (function (t) {
                    if (t.hasAttribute("data-tabs-animate"))
                      return t.dataset.tabsAnimate > 0
                        ? t.dataset.tabsAnimate
                        : 500;
                  })(t);
                o.length > 0 &&
                  o.forEach((t, o) => {
                    e[o].classList.contains("_tab-active")
                      ? (r ? n(t, r) : (t.hidden = !1),
                        t.closest(".popup") ||
                          (location.hash = `tab-${i}-${o}`))
                      : r
                      ? s(t, r)
                      : (t.hidden = !0);
                  });
              })(i);
          }
          t.preventDefault();
        }
      }
    })(),
    new e({}),
    (function () {
      const t = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      t.length &&
        t.forEach((t) => {
          t.dataset.placeholder = t.placeholder;
        }),
        document.body.addEventListener("focusin", function (t) {
          const e = t.target;
          ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
            (e.dataset.placeholder && (e.placeholder = ""),
            e.classList.add("_form-focus"),
            e.parentElement.classList.add("_form-focus"),
            h.removeError(e));
        }),
        document.body.addEventListener("focusout", function (t) {
          const e = t.target;
          ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
            (e.dataset.placeholder && (e.placeholder = e.dataset.placeholder),
            e.classList.remove("_form-focus"),
            e.parentElement.classList.remove("_form-focus"),
            e.hasAttribute("data-validate") && h.validateInput(e));
        });
    })(),
    (function (t) {
      const e = document.forms;
      if (e.length)
        for (const t of e)
          t.addEventListener("submit", function (t) {
            o(t.target, t);
          }),
            t.addEventListener("reset", function (t) {
              const e = t.target;
              h.formClean(e);
            });
      async function o(e, o) {
        if (0 === (t ? h.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            o.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              n = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              i = new FormData(e);
            e.classList.add("_sending");
            const r = await fetch(t, { method: n, body: i });
            if (r.ok) {
              await r.json();
              e.classList.remove("_sending"), s(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (o.preventDefault(), s(e));
        } else {
          o.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && p(t, !0, 1e3);
        }
      }
      function s(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } })
        ),
          h.formClean(t),
          c(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0);
})();

var mindDesigner = function(g, e, f, h) {
    this.container = $(g);
    this.containerId = g;
    this.opts = $.extend({
        canvasW: 20000,
        canvasH: 20000,
        readonly: false
    }, e);
    if (h != null) {
        this.opts.themeDef = h
    }
    if (this.opts.chartId == null) {
        this.opts.chartId = this.model.newId()
    }
    this.model.groupList.clearData();
    if (f != null) {
        var c = typeof (f) == "object" ? f : JSON.parse(f);
        var b = this.util.getNewDef(c, this);
        this.model.topic = b
    } else {
        f = this.messageSource.checkLocalValue(this.opts.chartId);
        if (f != null) {
            var c = typeof (f) == "object" ? f : JSON.parse(f);
            var b = this.util.getNewDef(c, this);
            this.model.topic = b
        } else {
            var d = this.model;
            d.topic = this.util.copy(d.topicDef);
            var a = d.topic;
            d.groupList.doGroup(a, d.topic.structure)
        }
    }
    this.styles = this.style.getThemeStyle.call(this, h);
    this.initCanvas();
    this.line.renderLineCon.call(this);
    this.render();
    this.events.push("loadsuccess", this)
};
mindDesigner.prototype = {
    render: function() {
        var a = this.model.topic;
        this.model.topicList.resetTopicList.call(this);
        this.renderTopic(a)
    },
    renderTopic: function(a) {
        var b = this;
        b.renderCenterTopic();
        b.range.rangeTopics.call(b);
        b.renderFreeTopics();
        b.summary.rangeSummaryTopics.call(b, true);
        b.connection.loadConnections.call(b)
    },
    renderSubTopic: function(b, a) {
        var d = this;
        c(b, a);
        function c(g, f) {
            d.renderTopicDom(g, f);
            if (g.collapsed) {
                return
            }
            var j = g.children
              , e = j.length;
            if (e > 0) {
                for (var h = 0; h < e; h++) {
                    var k = j[h];
                    c(k, f)
                }
            }
        }
    },
    renderFreeTopics: function() {
        var j = this
          , f = j.model
          , e = f.groupList
          , l = f.topic
          , n = (l.structure == "mind_org")
          , g = j.util
          , p = j.line;
        if (e.freeList.length) {
            for (var c = 0, h = e.freeList.length; c < h; c++) {
                var d = e.freeList[c];
                var b = null;
                if (d.summary) {
                    b = g.getSelectedPartByPos(d.target[0])
                }
                k(d, b);
                var a = g.getTopicContainer(d.id);
                var m = a.children(".topic-box");
                var o;
                if (n) {
                    o = {
                        x: a.outerWidth() / 2,
                        y: m.outerHeight(),
                        h: m.outerHeight()
                    }
                } else {
                    if (b == "left") {
                        o = {
                            x: a.outerWidth() - m.outerWidth(),
                            y: a.outerHeight() / 2 - 0.5,
                            h: m.outerHeight()
                        }
                    } else {
                        o = {
                            x: m.outerWidth(),
                            y: a.outerHeight() / 2 - 0.5,
                            h: m.outerHeight()
                        }
                    }
                }
                p.renderLines.call(j, d, o, b)
            }
        }
        function k(s, r) {
            j.renderTopicDom(s, r);
            if (s.collapsed) {
                return
            }
            var u = s.children
              , q = u.length;
            if (q > 0) {
                for (var t = 0; t < q; t++) {
                    var v = u[t];
                    k(v, r)
                }
            }
        }
    },
    renderTopics: function(c, b, e, a) {
        var f = this;
        f.renderTopicDom(c, b, e, a);
        if (!e.root) {
            f.renderTopicExpand(e, $(".topic-box[id=" + e.id + "]"), b)
        }
        f.renderTopicExpand(c, $(".topic-box[id=" + c.id + "]"), b);
        d(c, b);
        function d(j, h) {
            if (j.collapsed) {
                return
            }
            var l = j.children
              , g = l.length;
            if (g > 0) {
                for (var k = 0; k < g; k++) {
                    var m = l[k];
                    f.renderTopicDom(m, h);
                    d(m, h)
                }
            }
        }
    },
    renderTopicDom: function(v, u, j, e) {
        var f = this
          , a = f.util
          , c = f.designer
          , b = this.model
          , z = f.operation
          , w = b.topic
          , g = this.styles;
        var p = $("#" + v.id);
        if (p.length > 0) {
            p.parent().remove()
        }
        var d = w.structure == "mind_org"
          , s = w.structure == "mind_tree";
        var A = v.title.replace(/\n/g, "<br>").replace(/\&lt;br\&gt;/g, "<br>")
          , n = ""
          , t = g.childMarginH;
        if (d) {
            n = "org";
            t = 40
        } else {
            if (s) {
                n = "tree";
                t = 26
            }
        }
        p = $("<div class='topic-container " + n + "'><div id='" + v.id + "' class='topic-box'><div class='topic'>" + A + "</div></div></div>");
        var l = p.children(".topic-box");
        if (!v.root && v.parent != w.id) {
            var q = $("#" + v.parent).parent()
              , i = q.children(".topic-children");
            if (i.length == 0) {
                i = $("<div class='topic-children'></div>");
                if (u == "left") {
                    i.prependTo(q);
                    if (!d && !s) {
                        i.css("margin-right", g.childMarginW + 16)
                    } else {
                        if (s) {
                            i.css("margin-right", g.childMarginW + 8)
                        }
                    }
                } else {
                    i.appendTo(q);
                    if (!d && !s) {
                        i.css("margin-left", g.childMarginW + 16)
                    } else {
                        if (s) {
                            i.css("margin-left", g.childMarginW + 8)
                        }
                    }
                }
            }
            p.css("margin-top", t);
            if (e != null) {
                var o = e - 1;
                if (o >= 0) {
                    var r = i.children().eq(e - 1);
                    r.after(p)
                } else {
                    if (o < 0) {
                        i.prepend(p)
                    }
                }
            } else {
                p.appendTo(i)
            }
            if (u == "left") {
                p.addClass("part_left")
            }
        } else {
            l.attr("sub", true);
            if (v.summary) {
                p.css("position", "absolute").appendTo(c);
                var k = v.pos.maxX + 31;
                var h = (v.pos.maxY + v.pos.minY) / 2 - p.outerHeight() / 2;
                p.css({
                    left: k,
                    top: h
                });
                f.summary.renderSummaryShape.call(f, v);
                l.addClass("free");
                l.addClass("summary")
            } else {
                if (v.pos) {
                    p.css("position", "absolute").appendTo(c);
                    p.css({
                        left: v.pos.x,
                        top: v.pos.y
                    });
                    l.addClass("free")
                } else {
                    p.css("position", "absolute").prependTo(c)
                }
            }
            f.line.renderSubLineCon(p, v.id)
        }
        z.renderTopicImage(v);
        var m = f.style.getStyle.call(f, v);
        this.renderTopicStyle(l, v, m);
        f.icons.renderTopicIcons(a, v, u);
        f.remark.renderTopicNote(a, v, u);
        z.renderTopicLink(a, v, u);
        f.tags.renderTopicTag(a, v, u);
        f.task.renderTopicTask(a, v, u);
        if (j != null) {
            this.renderTopicExpand(j, $("#" + j.id), u, m)
        } else {
            this.renderTopicExpand(v, l, u, m)
        }
        return p
    },
    renderCenterTopic: function() {
        var c = this.model
          , b = c.topic;
        this.renderTopicDom(b);
        var d = this.opts
          , a = c.getTopicDomById(b.id);
        a.css({
            left: (d.canvasW - a.width()) / 2,
            top: (d.canvasH - a.height()) / 2
        })
    },
    renderTopicStyle: function(b, a, c) {
        c["font-family"] = c["font-family"] || c.family;
        c["font-style"] = c["font-style"] != null ? c["font-style"] : c.italic ? "italic" : "normal";
        c["font-weight"] = c["font-weight"] != null ? c["font-weight"] : c.bold ? "bold" : "normal";
        b.removeAttr("style");
        b.css(c);
        if (c["text-decoration"] != null && c["text-decoration"] != "none") {
            b.children(".topic").css("text-decoration", c["text-decoration"])
        } else {
            b.children(".topic").removeAttr("style")
        }
    },
    renderTopicExpand: function(e, d, a, g) {
        var h = e.children.length;
        if (h < 1 || e.root) {
            return
        }
        var i = d.find("span.expand_box");
        if (i.length > 0) {
            return
        }
        i = $("<span class='expand_box mind-icons'>&#xe7bb;</span>").appendTo(d);
        if (e.collapsed) {
            i.html("&#xe647;").addClass("hide")
        }
        var f = this.model
          , j = f.topic
          , c = f.topic.background || this.styles.background;
        if (a == "left") {
            i.addClass("left")
        }
        var k = {};
        if (j.structure == "mind_org" || j.structure == "mind_tree") {
            k = {
                backgroundColor: c,
                top: d.outerHeight() + 2
            }
        } else {
            k = {
                top: (d.outerHeight() - i.outerHeight() * 0.9) / 2 - 1,
                backgroundColor: c
            }
        }
        if (g != null) {
            var b = g.lineStyle;
            if (b && b.lineColor) {
                k.color = b.lineColor
            }
        }
        i.css(k)
    },
    resetTopicExpandPos: function(b, a) {
        var c = b.find(".expand_box");
        if (a == "mind_org") {
            c.css({
                top: b.outerHeight() + 2
            })
        } else {
            if (a == "mind_tree") {} else {
                c.css({
                    top: (b.outerHeight() - c.outerHeight()) / 2 - 0.5
                })
            }
        }
    },
    range: {
        rangeTopics: function() {
            var k = this
              , t = k.opts
              , m = k.operation
              , f = k.model
              , z = f.topic
              , a = k.util
              , p = k.line
              , G = z.structure
              , B = f.groupList
              , l = k.styles;
            var d = a.getTopicDomProp(z.id, m.zoomVal / 100);
            B.doGroup(z, G);
            if (G == "mind" || G == "mind_right" || G == "mind_free") {
                var b = z.leftChildren || []
                  , r = B.rightList;
                var q = b.length
                  , s = r.length
                  , F = 0
                  , j = 0
                  , D = l.marginH
                  , u = l.marginW;
                var C = {};
                if (q > 0) {
                    for (var A = 0; A < q; A++) {
                        var c = b[A];
                        k.renderSubTopic(c, "left");
                        var g = a.getTopicContainer(c.id);
                        F += g.outerHeight();
                        if (A < q - 1) {
                            F += D
                        }
                        C[c.id] = g
                    }
                }
                var H = {};
                for (var A = 0; A < s; A++) {
                    var c = r[A];
                    k.renderSubTopic(c, "right");
                    var g = a.getTopicContainer(c.id);
                    j += g.outerHeight();
                    if (A < s - 1) {
                        j += D
                    }
                    H[c.id] = g
                }
                var o = d.x + d.w + u
                  , n = d.y + (d.h - j) / 2;
                var h = {
                    x: d.x + d.w / 2,
                    y: d.y + d.h / 2
                };
                for (var A = 0; A < s; A++) {
                    var c = r[A];
                    var g = H[c.id];
                    g.css({
                        top: n,
                        left: o
                    });
                    var e = {
                        x: o,
                        y: n + g.outerHeight() / 2
                    };
                    p.renderSubLine.call(k, c, z, h, e, "right");
                    if (c.children.length > 0) {
                        var v = g.children(".topic-box");
                        var w = {
                            x: v.outerWidth(),
                            y: g.outerHeight() / 2 - 0.5,
                            h: v.outerHeight()
                        };
                        p.renderLines.call(k, c, w, "right")
                    }
                    n += D + g.outerHeight()
                }
                if (q > 0) {
                    o = d.x - u,
                    n = d.y + (d.h - F) / 2;
                    for (var A = 0; A < q; A++) {
                        var c = b[A];
                        var g = C[c.id];
                        g.css({
                            top: n,
                            right: t.canvasW - o
                        });
                        var e = {
                            x: o,
                            y: n + g.outerHeight() / 2
                        };
                        p.renderSubLine.call(k, c, z, h, e, "left");
                        if (c.children.length > 0) {
                            var v = g.children(".topic-box");
                            var w = {
                                x: v.position().left,
                                y: g.outerHeight() / 2 - 0.5,
                                h: v.outerHeight()
                            };
                            p.renderLines.call(k, c, w, "left")
                        }
                        n += D + g.outerHeight()
                    }
                }
            } else {
                if (G == "mind_org") {
                    var r = B.rightList;
                    var s = r.length
                      , E = 0
                      , D = l.marginH
                      , u = l.marginW;
                    var H = {};
                    for (var A = 0; A < s; A++) {
                        var c = r[A];
                        k.renderSubTopic(c, "right");
                        var g = a.getTopicContainer(c.id);
                        H[c.id] = g
                    }
                    var h = {
                        x: d.x + d.w / 2,
                        y: d.y + d.h
                    };
                    var o = h.x
                      , n = d.y + d.h + D * 2;
                    for (var A = 0; A < s; A++) {
                        var c = r[A];
                        var g = H[c.id];
                        g.css({
                            top: n,
                            left: o
                        });
                        E += g.outerWidth();
                        if (A != s - 1) {
                            E += u / 2
                        }
                    }
                    o -= E / 2;
                    for (var A = 0; A < s; A++) {
                        var c = r[A];
                        var g = H[c.id];
                        g.css({
                            left: o
                        });
                        var e = {
                            x: o + g.outerWidth() / 2,
                            y: n
                        };
                        p.renderSubLine.call(k, c, z, h, e, "right");
                        if (c.children.length > 0) {
                            var v = g.children(".topic-box");
                            var w = {
                                x: g.outerWidth() / 2,
                                y: v.outerHeight(),
                                h: v.outerHeight()
                            };
                            p.renderLines.call(k, c, w, "right")
                        }
                        o += g.outerWidth() + u / 2
                    }
                } else {
                    if (G == "mind_tree") {
                        var r = B.rightList;
                        var s = r.length
                          , E = 0
                          , D = l.marginH
                          , u = l.marginW;
                        var H = {};
                        for (var A = 0; A < s; A++) {
                            var c = r[A];
                            k.renderSubTopic(c, "right");
                            var g = a.getTopicContainer(c.id);
                            H[c.id] = g
                        }
                        var h = {
                            x: d.x + d.w / 2,
                            y: d.y + d.h
                        };
                        var o = h.x
                          , n = d.y + d.h + D * 2;
                        for (var A = 0; A < s; A++) {
                            var c = r[A];
                            var g = H[c.id];
                            g.css({
                                top: n,
                                left: o
                            });
                            E += g.outerWidth();
                            if (A != s - 1) {
                                E += u / 2
                            }
                        }
                        o -= E / 2;
                        for (var A = 0; A < s; A++) {
                            var c = r[A];
                            var g = H[c.id];
                            g.css({
                                left: o
                            });
                            var e = {
                                x: o + g.children(".topic-box").outerWidth() / 2,
                                y: n
                            };
                            p.renderSubLine.call(k, c, z, h, e, "right");
                            if (c.children.length > 0) {
                                var v = g.children(".topic-box");
                                var w = {
                                    x: 10,
                                    y: v.outerHeight(),
                                    h: v.outerHeight()
                                };
                                p.renderLines.call(k, c, w, "right")
                            }
                            o += g.outerWidth() + u / 2
                        }
                    }
                }
            }
        },
        changeOrgTopicPos: function(j, q, o, r, h, n, v) {
            var e = j.model
              , p = e.topic
              , t = e.groupList
              , u = t.rightList.length
              , b = j.util
              , a = j.operation.zoomVal / 100;
            var d = b.getTopicDomProp(p.id, a);
            var m = t.rightList
              , w = 0
              , z = {};
            var g = {
                x: d.x + d.w / 2,
                y: d.y + d.h
            };
            var l = g.x
              , k = d.y + d.h + v * 2;
            for (var s = 0; s < u; s++) {
                var c = m[s];
                var f = b.getTopicContainer(c.id);
                z[c.id] = f;
                f.css({
                    top: k,
                    left: l
                });
                w += f.outerWidth();
                if (s != u - 1) {
                    w += n / 2
                }
            }
            l -= w / 2;
            for (var s = 0; s < u; s++) {
                var c = m[s];
                var f = z[c.id];
                f.css({
                    left: l
                });
                l += f.outerWidth() + n / 2
            }
        },
        changeTopicPos: function(i, u, r, s, v) {
            var d = i.model, m = i.opts, t = d.topic, g = (t.structure == "mind_org"), p = (t.structure == "mind_tree"), b = i.util, e, z = 0, j = i.styles, k = i.operation, a = k.zoomVal / 100, A = j.marginH, n = j.marginW;
            if (g || p) {
                this.changeOrgTopicPos(i, u, r, v, g, n, A);
                return
            }
            if (u.id != r.id) {
                e = b.getTopicContainer(r.id);
                z = (e.outerHeight() - v.h) / 2;
                if (z <= 0) {
                    return
                }
            } else {
                e = b.getTopicContainer(u.id);
                z = (e.outerHeight() + A) / 2
            }
            if (r.free || r.summary) {
                e.css({
                    top: "-=" + z
                });
                return
            }
            if (s == "right") {
                var w = d.groupList
                  , x = w.rightList.length;
                var c;
                if (x == 1) {
                    c = b.getTopicDomProp(t.id, a);
                    e.css({
                        left: c.x + c.w + n,
                        top: c.y + (c.h - e.outerHeight()) / 2
                    });
                    return
                } else {
                    var o = d.getPrevTopicWithoutFree(r);
                    var l;
                    if (o == null) {
                        if (r.id == u.id) {
                            var q = d.getNextTopic(r);
                            c = b.getTopicDomProp(q.id, a);
                            l = c.y - z
                        } else {
                            c = b.getTopicDomProp(r.id, a);
                            l = c.y - z
                        }
                    } else {
                        c = b.getTopicDomProp(o.id, a);
                        l = c.y + c.h + A - z
                    }
                    e.css({
                        left: c.x,
                        top: l
                    })
                }
                i.range.doChangeSubTopicPos(i, r, z, 0, s)
            } else {
                if (s == "left") {
                    var f = t.leftChildren
                      , x = f.length;
                    var c;
                    if (x == 1) {
                        c = b.getTopicDomProp(t.id, a);
                        e.css({
                            right: m.canvasW - c.x + n,
                            top: c.y + (c.h - e.outerHeight()) / 2
                        });
                        return
                    } else {
                        var o = d.getPrevTopicWithoutFree(r, s);
                        var l;
                        if (o == null) {
                            if (r.id == u.id) {
                                var q = d.getNextTopic(r, s);
                                c = b.getTopicDomProp(q.id, a);
                                l = c.y - z
                            } else {
                                c = b.getTopicDomProp(r.id, a);
                                l = c.y - z
                            }
                        } else {
                            c = b.getTopicDomProp(o.id, a);
                            l = c.y + c.h + A - z
                        }
                        e.css({
                            right: m.canvasW - c.x - c.w,
                            top: l
                        })
                    }
                    i.range.doChangeSubTopicPos(i, r, z, 0, s)
                }
            }
            return z
        },
        doChangeOrgSubTopicPos: function(m, a, j, q, d, b) {
            var k = m.util
              , s = Math.abs;
            if (a.root) {
                var c = k.getTopicContainer(a.id);
                if (j > 0) {
                    c.css("top", "-=" + s(j) * 2)
                } else {
                    if (j < 0) {
                        c.css("top", "+=" + s(j) * 2)
                    }
                }
                if (q > 0) {
                    c.css("left", "-=" + s(q) / 2)
                } else {
                    if (q < 0) {
                        c.css("left", "+=" + s(q) / 2)
                    }
                }
                return
            }
            if (a.free || a.summary) {
                return
            }
            if (q == 0) {
                return
            }
            var g = m.model
              , o = g.topic
              , k = m.util
              , n = g.groupList.rightList;
            var e = true;
            var l = n.length;
            for (var f = 0; f < l; f++) {
                var p = n[f];
                if (p.id == a.id) {
                    e = false;
                    var r = k.getTopicContainer(p.id);
                    if (q < 0) {
                        r.css("left", "-=" + q / 2)
                    } else {
                        r.css("left", "-=" + q / 2)
                    }
                    continue
                }
                var r = k.getTopicContainer(p.id);
                if (e) {
                    r.css("left", "-=" + q / 2)
                } else {
                    if (!e) {
                        r.css("left", "+=" + q / 2)
                    }
                }
            }
        },
        doChangeSubTopicPos: function(e, f, q, g, m, j) {
            var a = e.util
              , c = e.model
              , n = c.topic;
            if (n.structure == "mind_org" || n.structure == "mind_tree") {
                this.doChangeOrgSubTopicPos(e, f, q, g, m, j);
                return
            }
            if (f.root) {
                var d = a.getTopicContainer(f.id)
                  , l = f.leftChildren;
                if (q > 0) {
                    d.css("top", "-=" + Math.abs(q))
                } else {
                    if (q < 0) {
                        d.css("top", "+=" + Math.abs(q))
                    }
                }
                if (g > 0) {
                    d.css("left", "-=" + Math.abs(g));
                    if (l.length > 0) {
                        for (var o = 0, p = l.length; o < p; o++) {
                            var k = l[o];
                            var r = a.getTopicContainer(k.id);
                            r.css("right", "+=" + Math.abs(g))
                        }
                    }
                } else {
                    if (g < 0) {
                        d.css("left", "+=" + Math.abs(g));
                        if (l.length > 0) {
                            for (var o = 0, p = l.length; o < p; o++) {
                                var k = l[o];
                                var r = a.getTopicContainer(k.id);
                                r.css("right", "-=" + Math.abs(g))
                            }
                        }
                    }
                }
                return
            }
            if (q == 0) {
                return
            }
            if (f.free || f.summary) {
                var d = e.util.getTopicContainer(f.id);
                d.css("top", "-=" + q);
                return
            }
            var c = e.model
              , n = c.topic
              , a = e.util
              , s = c.groupList.rightList;
            var u = true;
            if (m == "left") {
                s = n.leftChildren
            }
            var p = s.length;
            for (var o = 0; o < p; o++) {
                var b = s[o];
                if (b.id == f.id) {
                    u = false;
                    if (q < 0 || j) {
                        var t = a.getTopicContainer(b.id);
                        t.css("top", "-=" + q)
                    }
                    continue
                }
                var t = a.getTopicContainer(b.id);
                if (u) {
                    t.css("top", "-=" + q)
                } else {
                    if (!u) {
                        t.css("top", "+=" + q)
                    }
                }
            }
        },
        resetSubTopics: function(s) {
            var j = this
              , f = j.model
              , t = f.topic
              , m = j.operation
              , a = m.zoomVal / 100
              , q = j.opts
              , b = j.util
              , p = j.line
              , D = t.structure
              , v = f.groupList
              , l = j.styles;
            var d = b.getTopicDomProp(t.id, a);
            if (t.children.length == 0 && t.leftChildren == null) {
                return
            }
            var z = v.rightList;
            if (s == "left") {
                z = t.leftChildren
            }
            var w = z.length
              , B = 0
              , A = l.marginH
              , r = l.marginW;
            var k = {};
            if (w > 0) {
                for (var u = 0; u < w; u++) {
                    var c = z[u];
                    var g = b.getTopicContainer(c.id);
                    B += g.outerHeight();
                    if (u < w - 1) {
                        B += A
                    }
                    k[c.id] = g
                }
            }
            var h = {
                x: d.x + d.w / 2,
                y: d.y + d.h / 2
            }
              , n = d.y + (d.h - B) / 2;
            if (s == "left") {
                var o = d.x - r;
                for (var u = 0; u < w; u++) {
                    var c = z[u];
                    var g = k[c.id];
                    g.css({
                        top: n,
                        right: q.canvasW - o
                    });
                    var e = {
                        x: o,
                        y: n + g.outerHeight() / 2
                    };
                    p.renderSubLine.call(j, c, t, h, e, "left");
                    n += A + g.outerHeight()
                }
            } else {
                if (D == "mind_tree" || D == "mind_org") {
                    var h = {
                        x: d.x + d.w / 2,
                        y: d.y + d.h
                    };
                    var o = h.x
                      , n = d.y + d.h + A * 2
                      , C = 0;
                    for (var u = 0; u < w; u++) {
                        var c = z[u];
                        var g = k[c.id];
                        C += g.outerWidth();
                        if (u != w - 1) {
                            C += r / 2
                        }
                    }
                    o -= C / 2;
                    for (var u = 0; u < w; u++) {
                        var c = z[u];
                        var g = k[c.id];
                        g.css({
                            left: o,
                            top: n
                        });
                        var e = {
                            x: o + g.children(".topic-box").outerWidth() / 2,
                            y: n
                        };
                        p.renderSubLine.call(j, c, t, h, e, "right");
                        o += g.outerWidth() + r / 2
                    }
                } else {
                    var o = d.x + d.w + r;
                    for (var u = 0; u < w; u++) {
                        var c = z[u];
                        var g = k[c.id];
                        g.css({
                            top: n,
                            left: o
                        });
                        var e = {
                            x: o,
                            y: n + g.outerHeight() / 2
                        };
                        p.renderSubLine.call(j, c, t, h, e, s);
                        n += A + g.outerHeight()
                    }
                }
            }
        }
    },
    initCanvas: function() {
        var b = this.container
          , c = this.model.topic
          , f = this.opts
          , e = this.styles
          , a = $(window).height();
        b.css({
            height: f.height ? f.height : a - b.siblings("div:visible:not(.embeditem)").height()
        });
        var d = $("<div class='mind-designer'></div>").appendTo(b);
        d.css({
            width: f.canvasW,
            height: f.canvasH
        });
        this.designer = d;
        this.operation.moveToCenter.call(this);
        this.operation.setBackground.call(this);
        this.initEvent()
    },
    initEvent: function() {
        var k = this
          , a = k.opts
          , e = k.operation
          , h = k.util
          , g = k.model
          , m = g.topic
          , c = k.connection;
        $(document).off("mousedown.dragmove").on("mousedown.dragmove", function(r) {
            var q = r.pageX
              , s = r.pageY;
            if ((r.ctrlKey || r.metaKey) && k.plugins.presenter.beforeSelecting) {
                if (k.plugins.presenter.selecting == false) {
                    k.plugins.presenter.selecting = true;
                    k.plugins.presenter.initEvent(k, q, s, r)
                }
                return
            }
            if (r.button == 2) {
                return
            }
            var p = k.container.scrollTop();
            var o = k.container.scrollLeft();
            $(document).on("mousemove.dragmove", function(u) {
                var t = u.pageX - q
                  , v = u.pageY - s;
                if (Math.abs(t) > 6 || Math.abs(v) > 6) {
                    k.container.scrollLeft(o - t);
                    k.container.scrollTop(p - v)
                }
            });
            $(document).on("mouseup.dragmove", function(t) {
                $(document).off("mousemove.dragmove");
                $(document).off("mouseup.dragmove");
                k.plugins.navigator.renderViewport()
            });
            k.events.push("hideMenu")
        });
        $(document).off("mouseup.expand").on("mouseup.expand", ".expand_box", function(q) {
            var p = $(this)
              , o = p.parent()
              , r = o.attr("id");
            k.operation.showOrHideChildren.call(k, r);
            q.stopPropagation()
        });
        $(document).off("mousedown.expand").on("mousedown.expand", ".expand_box", function(o) {
            o.stopPropagation()
        });
        $(document).off("dblclick.expand").on("dblclick.expand", ".expand_box", function(o) {
            o.stopPropagation()
        });
        var d = 0
          , b = 0
          , f = false
          , n = null;
        $(document).off("mousemove.mouse").on("mousemove.mouse", function(o) {
            if (!f) {
                d = o.pageX,
                b = o.pageY
            }
        });
        $(document).on("mousewheel DOMMouseScroll", function(r) {
            var q = r.originalEvent.wheelDelta || -r.originalEvent.detail;
            var u = Math.max(-1, Math.min(1, q));
            if (r.ctrlKey || r.metaKey) {
                f = true;
                r.preventDefault();
                var o = k.container.scrollLeft() + d;
                var t = k.container.scrollTop() + b;
                var p = o / k.opts.canvasW * 100 + "% " + t / k.opts.canvasH * 100 + "%";
                if (u < 0) {
                    var s = k.operation.zoomVal -= 5;
                    k.operation.tochZoom.call(k, k.designer, s, p);
                    $(".mind-zoomtxt").text(s + "%")
                } else {
                    var s = k.operation.zoomVal += 5;
                    k.operation.tochZoom.call(k, k.designer, s, p);
                    $(".mind-zoomtxt").text(s + "%")
                }
                if (n == null) {
                    n = setTimeout(function() {
                        f = false;
                        n = null
                    }, 200)
                }
            } else {
                k.plugins.navigator.renderViewport()
            }
        });
        if (k.opts.readonly) {
            return
        }
        $(window).on("resize.canvas", function(r) {
            var o = $(window).height()
              , q = $(window).width();
            var p = k.container;
            p.css({
                height: k.opts.height ? k.opts.height : o - p.siblings("div:visible").height()
            })
        });
        var j = ""
          , l = 0;
        $(document).off("keydown.hotkey").on("keydown.hotkey", function(v) {
            if (k.opts.readonly || l > 5) {
                k.plugins.presenter.keyEvent(v, k);
                return
            }
            l++;
            var o = v.keyCode;
            if (o == 13) {
                e.appendTopic.call(k, false);
                var s = k.util.getSelectedId();
                if (s.length == 0) {
                    return
                }
                e.editTopicDom.call(k, s);
                v.preventDefault()
            } else {
                if (o == 45 || o == 9) {
                    v.preventDefault();
                    var t = k.util.getSelectedId();
                    if (t.length == 0) {
                        return
                    }
                    e.appendTopic.call(k, true);
                    var s = k.util.getSelectedId();
                    e.editTopicDom.call(k, s)
                } else {
                    if (o == 27) {
                        e.closeTip();
                        $(".topic-box.cut_related").removeClass("cut_related");
                        v.preventDefault()
                    } else {
                        if (o == 46 || o == 8) {
                            if (j != "") {
                                e.removeTopicImage.call(k, j);
                                j = ""
                            } else {
                                e.removeTopic.call(k);
                                if (c.currentLine) {
                                    c.deleteConnection(k, c.currentLine)
                                }
                            }
                            v.preventDefault()
                        } else {
                            if (o == 37) {
                                if (v.ctrlKey || v.metaKey) {
                                    l--;
                                    var q = k.container.scrollLeft();
                                    k.container.scrollLeft(q - 10);
                                    v.preventDefault();
                                    return
                                }
                                if (k.plugins.presenter.presenting) {
                                    k.plugins.presenter.prevSlide(k);
                                    return
                                }
                                var u = g.getNearTopic.call(k, "left");
                                if (u != null) {
                                    h.selectOne.call(k, u);
                                    v.preventDefault()
                                }
                            } else {
                                if (o == 38) {
                                    if (v.ctrlKey || v.metaKey) {
                                        l--;
                                        var q = k.container.scrollTop();
                                        k.container.scrollTop(q - 10);
                                        v.preventDefault();
                                        return
                                    }
                                    var u = g.getNearTopic.call(k, "up");
                                    if (u != null) {
                                        h.selectOne.call(k, u);
                                        v.preventDefault()
                                    }
                                } else {
                                    if (o == 39) {
                                        if (v.ctrlKey || v.metaKey) {
                                            l--;
                                            var q = k.container.scrollLeft();
                                            k.container.scrollLeft(q + 10);
                                            v.preventDefault();
                                            return
                                        }
                                        if (k.plugins.presenter.presenting) {
                                            k.plugins.presenter.nextSlide(k);
                                            return
                                        }
                                        var s = k.util.getSelectedId();
                                        var u = g.getNearTopic.call(k, "right");
                                        if (u != null) {
                                            h.selectOne.call(k, u);
                                            v.preventDefault()
                                        }
                                    } else {
                                        if (o == 40) {
                                            if (v.ctrlKey || v.metaKey) {
                                                l--;
                                                var q = k.container.scrollTop();
                                                k.container.scrollTop(q + 10);
                                                v.preventDefault();
                                                return
                                            }
                                            var u = g.getNearTopic.call(k, "down");
                                            if (u != null) {
                                                h.selectOne.call(k, u);
                                                v.preventDefault()
                                            }
                                        } else {
                                            if (o == 32) {
                                                var s = h.getSelectedId();
                                                v.preventDefault();
                                                if (s != "") {
                                                    e.editTopicDom.call(k, s)
                                                }
                                            } else {
                                                if (o == 67 && (v.ctrlKey || v.metaKey)) {
                                                    var s = h.selectedIds;
                                                    if (s.length > 0) {
                                                        g.doCopy.call(k, s)
                                                    }
                                                    v.preventDefault()
                                                } else {
                                                    if (o == 88 && (v.ctrlKey || v.metaKey)) {
                                                        var s = h.selectedIds;
                                                        if (s.length > 0) {
                                                            g.doCut.call(k, s)
                                                        }
                                                        v.preventDefault()
                                                    } else {
                                                        if (o == 86 && (v.ctrlKey || v.metaKey)) {
                                                            l = 0;
                                                            var s = h.getSelectedId();
                                                            if (s != "") {
                                                                g.doPaste.call(k, s)
                                                            }
                                                            var w = g.getTopicById(s);
                                                            h.selectOne.call(k, w);
                                                            v.preventDefault()
                                                        } else {
                                                            if (o == 83 && (v.ctrlKey || v.metaKey)) {
                                                                if (v.ctrlKey || v.metaKey) {
                                                                    k.events.push("saveOnline");
                                                                    v.preventDefault()
                                                                }
                                                            } else {
                                                                if (o == 90 && (v.ctrlKey || v.metaKey)) {
                                                                    v.preventDefault();
                                                                    l = 0;
                                                                    k.messageSource.undo(k)
                                                                } else {
                                                                    if (o == 89 && (v.ctrlKey || v.metaKey)) {
                                                                        v.preventDefault();
                                                                        l = 0;
                                                                        k.messageSource.redo(k)
                                                                    } else {
                                                                        if (o == 221 && (v.ctrlKey || v.metaKey)) {
                                                                            v.preventDefault();
                                                                            if (k.opts.readonly) {
                                                                                return
                                                                            }
                                                                            var s = h.selectedIds;
                                                                            if (s.length > 0) {}
                                                                        } else {
                                                                            if (o == 17 || o == 91) {
                                                                                v.preventDefault()
                                                                            } else {
                                                                                if (o == 66 && (v.ctrlKey || v.metaKey)) {
                                                                                    var s = h.getSelectedId();
                                                                                    if (s != "") {
                                                                                        var w = g.getTopicById(s);
                                                                                        if (w.style == null) {
                                                                                            mind.operation.setStyle.call(mind, {
                                                                                                "font-weight": "bold"
                                                                                            })
                                                                                        } else {
                                                                                            if (w.style.bold != null && w.style.bold == false) {
                                                                                                mind.operation.setStyle.call(mind, {
                                                                                                    "font-weight": "bold"
                                                                                                })
                                                                                            } else {
                                                                                                if (w.style["font-weight"] == "normal" || w.style["font-weight"] == null) {
                                                                                                    mind.operation.setStyle.call(mind, {
                                                                                                        "font-weight": "bold"
                                                                                                    })
                                                                                                } else {
                                                                                                    mind.operation.setStyle.call(mind, {
                                                                                                        "font-weight": "normal"
                                                                                                    })
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    v.preventDefault()
                                                                                } else {
                                                                                    if (o == 71 && (v.ctrlKey || v.metaKey)) {
                                                                                        k.events.push("initBrash");
                                                                                        v.preventDefault()
                                                                                    } else {
                                                                                        if (o == 82 && (v.ctrlKey || v.metaKey)) {
                                                                                            v.preventDefault();
                                                                                            k.events.push("showRightMenu", "remark")
                                                                                        } else {
                                                                                            if (o == 84 && (v.ctrlKey || v.metaKey)) {
                                                                                                v.preventDefault()
                                                                                            } else {
                                                                                                if (o == 75 && (v.ctrlKey || v.metaKey)) {
                                                                                                    v.preventDefault();
                                                                                                    k.events.push("showRightMenu", "link")
                                                                                                } else {
                                                                                                    if (o == 73 && (v.ctrlKey || v.metaKey)) {
                                                                                                        if (v.ctrlKey && v.metaKey) {
                                                                                                            k.events.push("showRightMenu", "style");
                                                                                                            return
                                                                                                        }
                                                                                                        var s = h.getSelectedId();
                                                                                                        if (s != "") {
                                                                                                            var w = g.getTopicById(s);
                                                                                                            if (w.style == null) {
                                                                                                                mind.operation.setStyle.call(mind, {
                                                                                                                    "font-style": "italic"
                                                                                                                })
                                                                                                            } else {
                                                                                                                if (w.style.bold != null && w.style.bold == false) {
                                                                                                                    mind.operation.setStyle.call(mind, {
                                                                                                                        "font-style": "italic"
                                                                                                                    })
                                                                                                                } else {
                                                                                                                    if (w.style["font-style"] == "normal" || w.style["font-style"] == null) {
                                                                                                                        mind.operation.setStyle.call(mind, {
                                                                                                                            "font-style": "italic"
                                                                                                                        })
                                                                                                                    } else {
                                                                                                                        mind.operation.setStyle.call(mind, {
                                                                                                                            "font-style": "normal"
                                                                                                                        })
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        v.preventDefault()
                                                                                                    } else {
                                                                                                        if ((v.ctrlKey || v.metaKey) && v.keyCode == 83) {
                                                                                                            l = 0;
                                                                                                            v.preventDefault()
                                                                                                        } else {
                                                                                                            if ((v.ctrlKey || v.metaKey) && (v.keyCode == 187 || v.keyCode == 107)) {
                                                                                                                v.preventDefault();
                                                                                                                l = 0;
                                                                                                                k.operation.zoomIn.call(k, k.designer);
                                                                                                                var r = k.operation.zoomVal;
                                                                                                                k.events.push("zoom", r)
                                                                                                            } else {
                                                                                                                if ((v.ctrlKey || v.metaKey) && (v.keyCode == 189 || v.keyCode == 109)) {
                                                                                                                    v.preventDefault();
                                                                                                                    l = 0;
                                                                                                                    k.operation.zoomOut.call(k, k.designer);
                                                                                                                    var r = k.operation.zoomVal;
                                                                                                                    k.events.push("zoom", r)
                                                                                                                } else {
                                                                                                                    if ((v.ctrlKey || v.metaKey) && v.keyCode == 48) {
                                                                                                                        v.preventDefault();
                                                                                                                        l = 0;
                                                                                                                        k.operation.zoomVal = 85;
                                                                                                                        k.operation.zoomIn.call(k, k.designer);
                                                                                                                        k.events.push("zoom", 100)
                                                                                                                    } else {
                                                                                                                        if ((v.ctrlKey || v.metaKey) && v.keyCode >= 49 && v.keyCode <= 57) {
                                                                                                                            v.preventDefault();
                                                                                                                            l = 0;
                                                                                                                            var o = v.keyCode - 49;
                                                                                                                            $(".mind-right-detail-icons").find("[n=priority][ico=" + o + "]").trigger("click")
                                                                                                                        } else {
                                                                                                                            if ((v.ctrlKey || v.metaKey) && v.keyCode == 191) {
                                                                                                                                v.preventDefault();
                                                                                                                                l = 0;
                                                                                                                                var s = k.util.getSelectedId();
                                                                                                                                if (s != "") {
                                                                                                                                    var p = h.getTopicDom(s);
                                                                                                                                    if (p.children(".expand_box").length > 0) {
                                                                                                                                        p.children(".expand_box").trigger("mouseup")
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            } else {
                                                                                                                                if ((v.ctrlKey || v.metaKey) && v.keyCode == 76) {
                                                                                                                                    v.preventDefault();
                                                                                                                                    l = 0;
                                                                                                                                    var s = k.util.getSelectedId();
                                                                                                                                    if (s != "") {
                                                                                                                                        $(".header-item.icon_conn").trigger("click")
                                                                                                                                    }
                                                                                                                                } else {
                                                                                                                                    var s = k.util.getSelectedId();
                                                                                                                                    if (s != "") {
                                                                                                                                        e.editTopicDom.call(k, s)
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        $(document).off("keyup.hotkey").on("keyup.hotkey", function(o) {
            l = 0
        });
        k.events.push("documentkeydown");
        $(document).off("dblclick.edit").on("dblclick.edit", ".topic-box", function(q) {
            if (a.readonly) {
                return
            }
            var p = $(this);
            var o = h.getSelectedId();
            if (o != "") {
                e.editTopicDom.call(k, o)
            }
        });
        $(document).off("click.selected").on("click.selected", ".topic-box", function(p) {
            var o = $(this);
            var q = g.getTopicById(o.attr("id"));
            k.util.selectOne.call(k, q);
            k.events.push("setDock", q);
            c.currentLine = null;
            k.operation.brash.call(k, q.id);
            k.operation.hideLink();
            p.stopPropagation();
            k.events.push("hideMenu")
        });
        $(document).off("mouseup.topicnote").on("mouseup.topicnote", ".topic-note", function(p) {
            var o = $(this);
            var q = g.getTopicById(o.parent().attr("id"));
            k.util.selectOne.call(k, q);
            k.events.push("setDock", q);
            k.events.push("openNote", q);
            p.stopPropagation()
        });
        k.designer.off("mousedown.dragmovefree").on("mousedown.dragmovefree", ".topic-box.free", function(K) {
            if (a.readonly || K.button == 2) {
                return
            }
            var C = $(this)
              , G = C.attr("id")
              , E = Math.abs
              , q = k.operation.zoomVal / 100;
            var J = C.hasClass("summary");
            if (J) {
                K.stopPropagation();
                return
            }
            $(".mind-util-container").addClass("noevent");
            $("header").addClass("noevent");
            k.plugins.closeGlobalMenu();
            var I = k.model.getTopicById(G);
            var D = h.getTopicContainer(G)
              , H = D.outerHeight();
            var A = K.pageX
              , w = K.pageY
              , z = D.offset().left
              , v = D.offset().top;
            var r = A - z
              , o = w - v
              , B = false
              , P = {};
            var M = D.position().left
              , L = D.position().top;
            var s = c.getConnectionsByTopic.call(k, I.id);
            var O = h.copyArray(s);
            var p = k.container.scrollTop();
            var N = k.container.scrollLeft();
            k.util.selectById.call(k, G);
            var F = document.getElementById(G);
            k.operation.initScrollPos();
            var u = K.offsetX
              , t = K.offsetY;
            k.designer.off("mousemove.dragmovefree").on("mousemove.dragmovefree", function(Q) {
                var R = Q.pageX
                  , y = Q.pageY;
                var x = R - A
                  , U = y - w;
                if (E(x) > 1 || E(U) > 1) {
                    k.operation.isScroll(Q.pageX, Q.pageY);
                    var S = k.container.scrollTop();
                    var T = k.container.scrollLeft();
                    D.css({
                        left: M / q + x / q + (T - N) / q,
                        top: L / q + U / q + (S - p) / q
                    }).addClass("topic-moving-related").addClass("mind-disable1");
                    if ($(".topic-insert").length == 0) {
                        k.virtualTopic.setMovingRelated(I, null);
                        k.virtualTopic.initEvent.call(k, I, P)
                    }
                    if (s != null && s.length > 0) {
                        c.resetConnectionsOnMoving.call(k, s)
                    }
                    B = true
                }
                k.designer.addClass("noselect");
                Q.stopPropagation();
                Q.preventDefault()
            });
            k.designer.off("mouseup.dragmovefree").on("mouseup.dragmovefree", function(S) {
                k.designer.off("mousemove.dragmovefree");
                k.designer.off("mouseup.dragmovefree");
                k.designer.removeClass("noselect");
                D.removeClass("topic-moving-related").css("z-index", 2).removeClass("mind-disable1");
                $(".mind-util-container").removeClass("noevent");
                $("header").removeClass("noevent");
                k.operation.stopScroll();
                if (B) {
                    if (S.target.tagName == "svg") {
                        P = {}
                    }
                    if (P.id != null) {
                        var R = h.copy(I);
                        g.updateTopicPos.call(k, [R], P, true);
                        h.selectOne.call(k, I)
                    } else {
                        if (B) {
                            var Q = D.position().left / q
                              , U = D.position().top / q;
                            var T = {
                                x: Q,
                                y: U
                            };
                            k.model.updateFreeTopicPos.call(k, I, T, s, O)
                        }
                    }
                }
                c.hideOrShowConnectionText(null, "show");
                $(".topic-insert").remove();
                $(".topic-moving-target").removeClass("topic-moving-target");
                $(this).css({
                    cursor: "default"
                });
                k.virtualTopic.removeShape();
                k.virtualTopic.offEvent.call(k)
            })
        });
        k.designer.off("dblclick.freetopic").on("dblclick.freetopic", ".mind-line-svg", function(q) {
            if (k.opts.readonly) {
                return
            }
            var o = {
                parent: m.id,
                title: "自由主题",
                children: [],
                id: g.newId()
            };
            var p = h.getRealPos.call(k, q.pageX, q.pageY);
            g.addFreeTopic(o, p, k);
            q.stopPropagation()
        });
        k.designer.off("mousedown.dragmovetp").on("mousedown.dragmovetp", ".topic-box:not(.free)", function(t) {
            if (a.readonly || t.button == 2) {
                return
            }
            k.events.push("hidepopeditor");
            k.plugins.closeGlobalMenu();
            k.plugins.hideContextMenu();
            var r = $(this)
              , o = r.attr("id");
            var s = k.model.getTopicById(o);
            var z = t.pageX
              , w = t.pageY
              , u = false;
            if (s.root) {
                var v = k.container.scrollTop();
                var q = k.container.scrollLeft();
                k.designer.off("mousemove.dragmovetp").on("mousemove.dragmovetp", function(y) {
                    var x = y.pageX - z
                      , A = y.pageY - w;
                    if (Math.abs(x) > 6 || Math.abs(A) > 6) {
                        if (!u) {
                            r.addClass("noevent")
                        }
                        u = true;
                        k.container.scrollLeft(q - x);
                        k.container.scrollTop(v - A)
                    }
                });
                k.designer.off("mouseup.dragmovetp").on("mouseup.dragmovetp", function(x) {
                    k.designer.off("mousemove.dragmovetp");
                    k.designer.off("mouseup.dragmovetp");
                    r.addClass("noevent");
                    u = false;
                    r.removeClass("noevent");
                    x.stopPropagation()
                });
                t.stopPropagation();
                t.preventDefault();
                return
            } else {
                e.topicDrag.call(k, {
                    x: z,
                    y: w
                }, s, r, t)
            }
            if ($(".connection_point").length > 0) {
                var p = document.getElementsByClassName("mind-connection-label");
                h.unSelectText(p);
                c.blurConnection(k);
                c.currentLine = null
            }
            t.stopPropagation();
            t.preventDefault()
        });
        $(document).off("click.menuPanel").on("click.menuPanel", ".topic-menu", function() {
            var o = $(this).parent()
              , p = o.attr("id");
            k.plugins.hideContextMenu();
            k.plugins.showContextMenu.call(k, o, p);
            $(document).off("mousedown.contextmenu").on("mousedown.contextmenu", function(q) {
                k.plugins.hideContextMenu();
                q.stopPropagation()
            });
            $(".mind-context-menu").off("mousedown.contextmenu").on("mousedown.contextmenu", function(q) {
                q.stopPropagation()
            })
        });
        $(document).off("mouseenter.menuPanel").on("mouseenter.menuPanel", ".topic-menu", function() {
            return;
            var o = $(this).parent()
              , p = o.attr("id");
            k.plugins.showContextMenu.call(k, o, p);
            $(document).off("mousedown.contextmenu").on("mousedown.contextmenu", function() {
                k.plugins.hideContextMenu()
            });
            $(".mind-context-menu").off("mousedown.contextmenu").on("mousedown.contextmenu", function(q) {
                q.stopPropagation()
            })
        });
        $(document).on("click", ".connection-line", function(s) {
            var p = m.lines;
            var r = $(this)
              , o = r.attr("id").substring(5);
            var q = p[o];
            c.isFocus = false;
            c.focusConnection(k, q)
        });
        k.designer.off("keyup.conn-label").on("keyup.conn-label", ".mind-connection-label", function(r) {
            var q = $(this);
            if (r.keyCode == 13) {
                var s = q.html();
                var p = c.currentLine;
                if (!r.shiftKey && p.label != null && s != p.label) {
                    if (s != "" && s != "label") {
                        var o = h.copy(p);
                        p.label = s;
                        c.saveConnectionText(k, p, o);
                        c.clearControls()
                    }
                }
            }
            r.stopPropagation()
        });
        $(document).on("keydown.conn-label", ".mind-connection-label", function(o) {
            o.stopPropagation();
            if (o.keyCode == 13 && !o.shiftKey) {
                o.preventDefault()
            }
        });
        k.designer.off("mousedown.conn-label").on("mousedown.conn-label", ".mind-connection-label", function(r) {
            var o = $(this).parent().attr("conn");
            var p = m.lines;
            var q = p[o];
            c.focusConnection(k, q);
            r.stopPropagation()
        });
        k.designer.off("mouseup.conn-label").on("mouseup.conn-label", ".mind-connection-label", function(o) {
            h.selectText(this);
            o.stopPropagation()
        });
        k.designer.on("mouseenter", ".mind-connection-label-icons", function(q) {
            var p = $(this)
              , r = p.parent().attr("conn");
            var o = m.lines[r];
            c.currentLine = o;
            k.plugins.showConnectionTip(o);
            q.stopPropagation()
        });
        k.designer.off("blur.conn-label").on("blur.conn-label", ".mind-connection-label", function(r) {
            var q = $(this)
              , s = $.trim(q.html())
              , p = c.tempLine || c.currentLine;
            if (p == null) {
                return
            }
            if (p.label != s) {
                var o = h.copy(p);
                p.label = s;
                c.saveConnectionText(k, p, o)
            }
            if (s == "" || s == "label") {
                q.parent().remove();
                c.currentLine = null
            }
        });
        k.designer.off("focus.conn-label").on("focus.conn-label", ".mind-connection-label", function(q) {
            var p = $(this)
              , r = $.trim(p.html())
              , o = c.currentLine;
            c.tempLine = o
        });
        k.designer.on("mousedown.conn-label", function(p) {
            if ($(".connection_point").length > 0) {
                var o = document.getElementsByClassName("mind-connection-label");
                h.unSelectText(o);
                c.blurConnection(k)
            }
            k.plugins.closeGlobalMenu();
            if (k.operation.brashData.style != null) {
                k.operation.closeTip()
            }
            k.events.push("hideMenus");
            k.operation.hideLink();
            k.util.clearSelect();
            k.events.push("changeOpStatus", k)
        });
        k.designer.on("mousedown.conn-label", ".connection_point", function(o) {
            o.stopPropagation()
        });
        k.designer.on("mousemove.move", function(t) {
            var s = $(t.target);
            if (!s.hasClass("topic") && !s.hasClass("expand_box") && !s.hasClass("topic-menu") && !s.hasClass("topic-box") && !s.hasClass("connection_point")) {
                var q = m.lines;
                if (q == null || $.isEmptyObject(q)) {
                    return
                }
                var r = h.getRealPos.call(k, t.pageX, t.pageY);
                var o = c.getConnectionByPoint.call(k, r.x, r.y);
                if (o.inline > 0 && o.inline != 20) {
                    var p = o.lines[0];
                    k.designer.css("cursor", "pointer");
                    i(p)
                } else {
                    k.designer.css("cursor", "default");
                    k.designer.off("mousedown.connection")
                }
            } else {
                k.designer.off("mousedown.connection");
                k.designer.css("cursor", "default")
            }
        });
        function i(o) {
            k.designer.off("mousedown.connection").on("mousedown.connection", function(p) {
                var q = m.lines[o.id];
                c.focusConnection(k, o);
                k.designer.css("cursor", "default");
                k.designer.off("mousedown.connection");
                p.stopPropagation()
            })
        }
        k.designer.off("mousedown.conn-menu").on("mousedown.conn-menu", ".mind-connection-menu", function(o) {
            o.stopPropagation()
        });
        k.designer.on("mousedown.conn-menu", function() {
            $(".mind-connection-menu").hide();
            k.designer.find(".img-dot").remove();
            k.designer.find(".topic-image .img-btn").remove();
            k.designer.find(".topic-image img.active").removeClass("active");
            j = ""
        });
        k.designer.on("click.image", function(o) {
            j = "";
            k.designer.find(".img-dot").remove();
            k.designer.find(".topic-image img.active").removeClass("active");
            k.designer.find(".topic-image .img-btn").remove()
        });
        k.designer.on("click.imagedel", ".topic-image > .img-btn", function(o) {
            if (j != "") {
                e.removeTopicImage.call(k, j);
                j = "";
                $("#mind_hover_tip").remove()
            }
            o.stopPropagation()
        });
        k.designer.on("mousedown.imagedel", ".topic-image > .img-btn", function(o) {
            o.stopPropagation()
        });
        k.designer.on("contextmenu.image", ".topic-image > img", function(o) {
            $(this).trigger("click.image");
            o.preventDefault()
        });
        k.designer.on("mousedown.imagemove", ".topic-image > img", function(t) {
            var r = $(this)
              , p = t.pageX
              , u = t.pageY
              , o = Math.abs
              , s = false
              , q = r.parent().parent().attr("id");
            $.showTip("拖动到其他主题上，可以快速复制图片", null);
            k.designer.off("mousemove.imagemove").on("mousemove.imagemove", function(w) {
                var v = w.pageX
                  , x = w.pageY;
                if (o(p - v) > 5) {
                    if (!s) {
                        s = true
                    }
                }
            });
            k.designer.off("mouseup.imagemove").on("mouseup.imagemove", function(y) {
                k.designer.off("mousemove.imagemove");
                k.designer.off("mouseup.imagemove");
                s = false;
                $.showTip("close");
                var C = $(y.target).parents()
                  , z = false
                  , v = null;
                for (var x = 0; x < C.length; x++) {
                    var B = $(C[x]);
                    if (B.hasClass("topic-box")) {
                        z = true;
                        v = B;
                        break
                    }
                }
                if (z) {
                    if (v.attr("id") != q) {
                        var w = r.attr("src");
                        var A = new Image();
                        A.src = w;
                        A.onload = function() {
                            e.setTopicImage.call(k, v.attr("id"), w, A)
                        }
                    }
                }
            });
            t.stopPropagation();
            t.preventDefault()
        });
        k.designer.on("click.image", ".topic-image > img", function(x) {
            var u = $(this), t = u.width(), z = u.height(), y, v;
            var p = u.attr("id");
            var q = p.substring(10);
            j = q;
            var r = h.copy(g.getTopicById(q));
            k.util.selectById.call(k, q);
            k.designer.find(".img-dot").remove();
            k.designer.find(".topic-image .img-btn").remove();
            k.designer.find(".topic-image img.active").removeClass("active");
            var o = $("<span title='调节图片大小' class='img-dot'></span>");
            u.parent().append(o);
            var s = $("<span title='删除图片' class='img-btn del'><span class='mind-icons'>&#xe618;</span></span>");
            u.parent().append(s);
            u.addClass("active");
            o.css({
                top: z - o.height() + 2,
                left: t - o.width()
            }).show();
            $(".topic-image .img-dot").off("mousedown").on("mousedown", function(B) {
                B.stopPropagation();
                var w = B.pageX
                  , D = B.pageY
                  , A = u.width()
                  , C = u.height();
                s.hide();
                k.designer.off("mousemove.img-dot").on("mousemove.img-dot", function(G) {
                    G.preventDefault();
                    G.stopPropagation();
                    var E = G.pageX
                      , I = G.pageY
                      , H = E - w
                      , F = I - D;
                    if (Math.abs(H) > 5 || Math.abs(F) > 5) {
                        y = A + H;
                        v = y * C / A;
                        if (y > 20) {
                            u.width(y);
                            u.height(v);
                            o.css({
                                left: y - o.width(),
                                top: v - o.height()
                            })
                        }
                    }
                });
                k.designer.off("mouseup.img-dot").on("mouseup.img-dot", function(E) {
                    A = u.width();
                    C = u.height();
                    var F = h.copy(r);
                    s.show();
                    F.image = $.extend(true, F.image, {
                        w: A,
                        h: C
                    });
                    g.updateTopicImage.call(k, F, r, true);
                    k.designer.off("mouseup.img-dot");
                    k.designer.off("mousemove.img-dot");
                    $("#mind_hover_tip").remove()
                })
            });
            x.stopPropagation()
        });
        k.designer.off("contextmenu.rightclick").on("contextmenu.rightclick", function(s) {
            if (a.readonly) {
                s.preventDefault();
                return
            }
            if ($(".topic-moving").length > 0) {
                s.preventDefault();
                return
            }
            var w = s.pageX;
            var u = s.pageY;
            var t = s.target;
            var r = ["topic", "topic-box", "topic-task", "topic-tag"];
            var p = t.getAttribute("class");
            if (p.indexOf("topic-container") >= 0) {
                k.plugins.showGlobalMenu(k, w, u);
                s.preventDefault()
            } else {
                if (p.indexOf("topic") >= 0 || p.indexOf("textarea_topic") >= 0 || p.indexOf("topic-box") >= 0 || p.indexOf("topic-tag") >= 0 || p.indexOf("topic-task") >= 0 || p.indexOf("topic-icons") >= 0) {
                    var q = null;
                    if (p.indexOf("textarea_topic") >= 0) {
                        q = $(t).parent()
                    } else {
                        q = $(t).attr("id") ? $(t) : $(t).parent()
                    }
                    var o = q.attr("id");
                    if (o != null) {
                        var v = g.getTopicById(o);
                        h.selectOne.call(k, v);
                        q.children(".topic-menu").trigger("click")
                    }
                    s.preventDefault()
                } else {
                    if (t.tagName == "svg" && t.className.baseVal.indexOf("mind-line-svg") >= 0) {
                        k.plugins.showGlobalMenu(k, w, u);
                        s.preventDefault()
                    }
                }
            }
        });
        k.designer.off("click.clickicon").on("click.clickicon", ".topic-icons > span", function(q) {
            var p = $(this)
              , s = p.attr("n")
              , o = p.attr("ico");
            var r = p.parent().parent().attr("id");
            k.util.selectById.call(k, r);
            k.icons.showIcons.call(k, p, r, s, o);
            q.stopPropagation()
        });
        k.designer.off("click.clicktag").on("click.clicktag", ".topic-tag", function(p) {
            k.events.push("showRightMenu", "tag");
            var o = $(this);
            var q = o.parent().parent().attr("id");
            k.util.selectById.call(k, q);
            p.stopPropagation()
        });
        k.designer.off("click.clicktask").on("click.clicktask", ".topic-task", function(p) {
            var o = $(this);
            var q = o.parent().attr("id");
            k.events.push("showRightMenu", "task");
            k.util.selectById.call(k, q);
            p.stopPropagation()
        })
    },
    operation: {
        moveToCenter: function() {
            var b = this.container
              , j = $(".mind-designer:first")
              , f = this
              , e = f.model
              , h = e.topic
              , a = b.width()
              , i = b.height();
            var c = 0
              , g = 0;
            if (h.structure == "mind_tree" || h.structure == "mind_org") {
                var k = $(window).height() / 2;
                c = (j.width() - a) / 2;
                g = (j.height() - i + k) / 2
            } else {
                if ((h.leftChildren == null) || (h.leftChildren.length == 0 && h.children.length > 0)) {
                    var d = $(window).width() / 2;
                    c = (j.width() - a + d) / 2;
                    g = (j.height() - i - 100) / 2
                } else {
                    if (h.leftChildren.length > 0 && h.children.length == 0) {
                        var d = $(window).width() / 2;
                        c = (j.width() - a - d) / 2;
                        g = (j.height() - i - 100) / 2
                    } else {
                        c = (j.width() - a) / 2;
                        g = (j.height() - i - 100) / 2
                    }
                }
            }
            b.scrollLeft(c);
            b.scrollTop(g)
        },
        topicDrag: function(d, n, p, r) {
            var f = this
              , c = f.model
              , a = f.util
              , i = f.line
              , m = c.topic
              , o = c.groupList
              , t = f.styles.marginH;
            var b = p.clone(false).appendTo("body").addClass("topic-moving");
            b.children(".topic").siblings().remove();
            var k = p.offset().left
              , j = p.offset().top;
            var s = d.x - k
              , q = d.y - j;
            var u = {};
            var g = c.getParentTopic(n.parent)
              , l = p.parent();
            var h = false;
            $(".mind-util-container").addClass("noevent");
            $("header").addClass("noevent");
            f.operation.initScrollPos();
            f.designer.off("mousemove.dragmove").on("mousemove.dragmove", function(w) {
                var v = w.pageX - d.x
                  , y = w.pageY - d.y;
                var e = Math.abs(v)
                  , x = Math.abs(y);
                if (e > 8 || x > 8) {
                    f.operation.isScroll(w.pageX, w.pageY);
                    h = true;
                    $(this).css({
                        cursor: "move"
                    });
                    if ($(".topic-insert").length == 0) {
                        f.virtualTopic.setMovingRelated(n, g);
                        b.find(".topic-insert").remove()
                    }
                    if ($(".mind-tip").length == 0) {
                        $.showTip("拖动到其他主题上，进行排序或移动", null)
                    }
                    if (x > 200 || e > 200) {
                        if (w.target.tagName == "svg") {
                            $.showTip("松开鼠标，即可添加为自由主题", null)
                        }
                    }
                    b.css({
                        left: w.pageX - s,
                        top: w.pageY - q
                    })
                }
            });
            f.designer.off("mouseup.dragmove").on("mouseup.dragmove", function(v) {
                var e = v.pageX - d.x
                  , A = v.pageY - d.y;
                if (v.target.tagName == "svg") {
                    u.id = null
                }
                $(".mind-util-container").removeClass("noevent");
                $("header").removeClass("noevent");
                f.operation.stopScroll();
                var y = b.offset().left
                  , x = b.offset().top;
                b.remove();
                $(".topic-insert").remove();
                $(".topic-moving-target").removeClass("topic-moving-target");
                $(this).css({
                    cursor: "default"
                });
                f.virtualTopic.removeShape();
                f.designer.off("mouseup.dragmove");
                f.designer.off("mousemove.dragmove");
                f.designer.off("mouseenter.dragmove");
                $(".topic-moving-related").removeClass("topic-moving-related");
                if (Math.abs(e) > 8 || Math.abs(A) > 8) {
                    if (u.id != null) {
                        var z = a.copy(n);
                        c.updateTopicPos.call(f, [z], u);
                        a.selectOne.call(f, n)
                    } else {
                        if (h) {
                            if (Math.abs(e) > 200 || Math.abs(A) > 200) {
                                var w = a.getRealPos.call(f, y, x);
                                w.y -= $("#" + n.id).parent().outerHeight() / 2 - f.styles.marginH;
                                c.changeToFreeTopic.call(f, n, w)
                            }
                        }
                    }
                }
                $.showTip("close")
            });
            f.virtualTopic.initEvent.call(f, n, u)
        },
        setConfig: function(b, a) {
            $.ajax({
                url: "/mindmap/config",
                data: {
                    field: b,
                    value: a
                },
                cache: false,
                type: "post",
                success: function() {}
            })
        },
        removeTopic: function() {
            var j = this
              , g = j.model
              , l = j.line;
            var a = j.util.selectedIds;
            if (a.length == 1 && a[0] == "root") {
                return
            }
            if (a.length == 0) {
                return
            }
            var h = []
              , b = [];
            for (var d = 0; d < a.length; d++) {
                var c = a[d];
                var f = g.getTopicById(c);
                h.push(f)
            }
            g.removeTopic.call(j, h);
            var k = g.getTopicById(a[0]);
            if (k != null) {
                var e = k.parent;
                j.events.push("outline-prebuild", {
                    id: e,
                    rebuild: "current"
                })
            }
        },
        insertParent: function(b) {
            var c = this
              , a = c.model;
            a.insertParentTopic.call(this, b)
        },
        appendTopic: function(t) {
            var h = this
              , d = h.model
              , r = d.topic
              , e = (r.structure == "mind_org")
              , m = (r.structure == "mind_tree")
              , b = h.util
              , i = h.line;
            if (this.util.selectedIds.length == 0) {
                return
            }
            var n = b.getSelectedId()
              , l = null
              , a = d.getTopicById(n)
              , j = d.newId()
              , u = "子主题"
              , p = "right";
            if (t && a.collapsed) {
                return
            }
            if (a.root || a.free || a.summary || t) {
                l = a
            } else {
                l = d.getTopicById(a.parent)
            }
            p = b.getSelectedPart(n, r.structure);
            var s = l.id;
            if ((t && a.root) || (!t && l.root)) {
                u = "分支主题"
            }
            if (a.root && !e && !m) {
                var c = r.leftChildren ? r.leftChildren.length : 0;
                var f = r.children.length;
                if (c < f) {
                    p = "left"
                }
            }
            var g = d.getNewTopicIndex(a, l, t, p);
            var k = {}
              , o = {};
            o[j] = p;
            k[j] = g;
            var q = {
                id: j,
                parent: s,
                children: [],
                title: u
            };
            d.addTopicMulti.call(h, [q], k, o);
            h.events.push("outline-prebuild", {
                id: n,
                insertChild: t
            });
            b.selectOne.call(h, q);
            $.topicCount();
            return q
        },
        appendSubTopic: function(i, e) {
            var g = this
              , d = g.model
              , j = d.topic
              , f = g.util;
            var a = d.newId();
            title = "分支主题";
            var h = 0;
            if (i == "left") {
                h = j.leftChildren.length
            } else {
                h = j.children.length
            }
            var k = {}
              , b = {};
            b[a] = i;
            k[a] = h;
            var c = {
                id: a,
                parent: e,
                children: [],
                title: title
            };
            d.addTopicMulti.call(g, [c], k, b);
            f.selectOne.call(g, c)
        },
        hideChildren: function(i, b) {
            var l = this
              , j = l.model
              , g = j.groupList
              , m = j.topic
              , d = j.getSubTopic(i)
              , k = l.util
              , p = l.line;
            var e = k.getTopicContainerProp(d.id)
              , c = k.getSelectedPart(i.id, m.structure);
            var a = k.getTopicContainer(i.id);
            a.children(".topic-children").remove();
            p.deleteChildrenLines(i);
            var o = k.getTopicContainerProp(d.id);
            var f = (o.h - e.h) / 2;
            var n = 0;
            if (m.structure == "mind_org" || m.structure == "mind_tree") {
                n = (o.w - e.w)
            }
            l.range.doChangeSubTopicPos(l, d, f, n, c);
            p.resetLines.call(l, [d.id], f, c)
        },
        showChildren: function(p) {
            var j = this
              , b = j.model
              , a = j.util
              , o = b.topic
              , l = j.line
              , q = b.groupList;
            var e = b.getSubTopic(p)
              , n = a.getSelectedPart(p.id, o.structure);
            var d = p.children
              , s = d.length;
            var c = a.getTopicContainerProp(e.id);
            var m = a.getTopicContainer(p.id);
            if (e.summary) {
                n = a.getSelectedPartByPos(e.target[0])
            }
            for (var r = 0; r < s; r++) {
                var f = d[r];
                j.renderSubTopic(f, n)
            }
            l.renderNewLines(j, p, e.id);
            var g = a.getTopicContainerProp(e.id);
            var t = (g.h - c.h) / 2;
            var k = 0;
            if (o.structure == "mind_org" || o.structure == "mind_tree") {
                k = (g.w - c.w)
            }
            j.range.doChangeSubTopicPos(j, e, t, k, n, true);
            l.resetLines.call(j, [e.id], t, n)
        },
        showOrHideChildren: function(a, m, d) {
            var k = this
              , h = k.util
              , g = k.model
              , n = g.topic;
            var b = h.getTopicDom(a)
              , l = b.children(".expand_box");
            var f = g.getTopicById(a)
              , j = "&#xe7bb;"
              , i = "&#xe647;";
            var c = h.getSelectedPart(f.id, n.structure);
            if (m == null) {
                if (f.collapsed) {
                    m = "show"
                } else {
                    m = "hide"
                }
            }
            if (m == "show") {
                l.html(j).removeClass("hide");
                delete f.collapsed;
                k.operation.showChildren.call(k, f);
                k.connection.showConnectionMulti(k, [f]);
                var e = h.getSelectedPartByPos(a);
                k.summary.showRelatedSummarys.call(k, [f], e)
            } else {
                if (m == "hide") {
                    l.html(i).addClass("hide");
                    f.collapsed = true;
                    k.operation.hideChildren.call(k, f, b);
                    k.connection.deleteConnectionByTopics.call(k, [f], false);
                    k.summary.removeRelatedSummarys.call(k, [f])
                }
            }
            k.connection.resetAllConnectionPos.call(k, n);
            k.summary.rangeSummaryTopics.call(k, true);
            if (k.opts.readonly) {
                return
            }
            g.changeTopicExpand.call(k, f, m, c, d);
            k.events.push("outline-collapse", {
                id: a,
                type: m
            })
        },
        isPaste: false,
        editTopicDomInit: function(c) {
            var i = this
              , h = i.operation
              , g = i.util;
            var f = i.model.getTopicById(c)
              , e = i.util.getTopicDom(c);
            var m = f.title
              , j = e.find(".topic");
            e.find(".textarea_topic").remove();
            var b = $("<div contenteditable='true' spellcheck=false id='area_" + c + "' class='textarea_topic'></div>").prependTo(e);
            if (new Date().valueOf() % 2 == 0 && g.tipCount()) {
                b.addClass("tip1")
            } else {
                if (g.tipCount()) {
                    b.addClass("tip2")
                }
            }
            var a = i.style.getStyle.call(i, f);
            var o = {
                "font-family": a.family,
                "font-size": a["font-size"],
                "font-weight": a.bold ? "bold" : "normal",
                "font-style": a.italic ? "italic" : "normal",
                "text-align": a.textAlign
            };
            b.css(o);
            var l = m.replace(/\n/g, "<br>");
            b.html(l).focus();
            b.css({
                left: 0,
                width: j.outerWidth(),
                height: j.outerHeight()
            });
            if (f.image != null) {
                b.css({
                    bottom: 0 - b.height() / 2,
                    top: "auto"
                })
            }
            $("#textarea_topic_temp").remove();
            var n = $("<div id='textarea_topic_temp'></div>").appendTo(e);
            n.css(o);
            $(".topic-menu").remove();
            var d = $("<span class='icons topic-menu'>&#xe65a</span>");
            d.appendTo(e).hide();
            var k = document.getElementById("area_" + c);
            if (k != null) {
                k.addEventListener("paste", function(u) {
                    if (g.isChrome()) {
                        var w = u.clipboardData, v, q, t;
                        if (w) {
                            v = w.items;
                            t = w.types || [];
                            for (var s = 0; s < t.length; s++) {
                                if (t[s] === "Files") {
                                    q = v[s];
                                    break
                                }
                            }
                            if (q && q.kind === "file" && q.type.match(/^image\//i) && v.length != 4) {
                                var r = q.getAsFile()
                                  , p = new FileReader();
                                p.readAsDataURL(r);
                                p.onload = function(y) {
                                    var x = p.result;
                                    h.uploadImage(x, c, function(A) {
                                        if (A.result) {
                                            $.showTip("close");
                                            $.showTip("升级到个人版或者团队版后，才可以直接粘贴截图， <a style='color:#fff;letter-spacing:1px;' href='/upgrade' target='_blank'>去升级</a>", 7000)
                                        } else {
                                            var z = new Image();
                                            z.src = A.img_url;
                                            i.events.push("showuploading");
                                            $(k).trigger("blur");
                                            z.onload = function() {
                                                h.setTopicImage.call(i, null, A.img_url, z);
                                                z.remove()
                                            }
                                        }
                                    })
                                }
                                ;
                                u.stopPropagation();
                                return false
                            } else {
                                i.util.isPaste = true;
                                for (var s = 0; s < t.length; s++) {
                                    if (t[s] == "text/plain") {
                                        q = v[s];
                                        break
                                    }
                                }
                                q.getAsString(function(z) {
                                    z = z.replace(/</g, "&lt;");
                                    z = z.replace(/>/g, "&gt;");
                                    z = z.replace(/\n/g, "<br>");
                                    var y = window.getSelection();
                                    var x = y.getRangeAt(0);
                                    if (document.queryCommandSupported("insertHTML")) {
                                        document.execCommand("insertHTML", false, z)
                                    } else {
                                        if (x.pasteHTML) {
                                            x.pasteHTML(z)
                                        }
                                    }
                                });
                                u.preventDefault();
                                return false
                            }
                        }
                        i.util.isPaste = true
                    } else {
                        if (g.isFirefox() || g.isSafari()) {
                            i.util.isPaste = "safari"
                        } else {
                            i.util.isPaste = true
                        }
                    }
                    u.stopPropagation()
                })
            }
        },
        uploading: false,
        uploadImage: function(b, d, c) {
            var a = this;
            if (a.uploading) {
                return
            }
            a.uploading = true;
            $.ajax({
                url: "/mindmap/uploadimage",
                type: "post",
                data: {
                    id: chartId,
                    img: b
                },
                success: function(e) {
                    a.uploading = false;
                    if (c != null) {
                        c(e)
                    }
                },
                error: function() {
                    a.uploading = false
                }
            })
        },
        editTopicDom: function(a) {
            var i = this
              , f = i.model
              , g = i.util
              , l = false
              , d = false
              , h = i.operation;
            var b = $("#area_" + a);
            if (b.length == 0) {
                this.operation.editTopicDomInit.call(i, a);
                b = $("#area_" + a)
            }
            var e = f.getTopicById(a)
              , c = g.getTopicDom(a);
            var n = e.title
              , j = c.find(".topic")
              , o = $("#textarea_topic_temp");
            b.css({
                "z-index": 9,
                width: j.parent().outerWidth(),
                opacity: 1
            });
            if (e.image != null) {
                b.css({
                    bottom: 0 - b.height() / 2,
                    top: "auto"
                })
            }
            var k = n.replace(/\n/g, "<br>");
            b.html(k).focus();
            document.execCommand("selectAll", false, null);
            b.off().on({
                keydown: function(p) {
                    var r = $(this)
                      , q = r.html();
                    if (!p.shiftKey && p.keyCode == 13) {
                        m(q, r)
                    } else {
                        if (p.keyCode == 27) {
                            $("#textarea_topic_temp").remove();
                            b.remove()
                        } else {
                            if (p.keyCode == 9) {
                                b.trigger("blur");
                                p.preventDefault()
                            } else {
                                if ((p.ctrlKey || p.metaKey) && (p.keyCode == 187 || p.keyCode == 107)) {
                                    p.preventDefault()
                                } else {
                                    if ((p.ctrlKey || p.metaKey) && (p.keyCode == 189 || p.keyCode == 109)) {
                                        p.preventDefault()
                                    } else {
                                        if ((p.ctrlKey || p.metaKey) && p.keyCode == 83) {
                                            p.preventDefault()
                                        }
                                    }
                                }
                            }
                        }
                    }
                    p.stopPropagation()
                },
                blur: function() {
                    var q = $(this);
                    var p = q.html();
                    m(p, q)
                },
                keyup: function(s) {
                    var q = $(this).html();
                    o.html(q);
                    var r = o.outerHeight();
                    var p = o.outerWidth() + 19;
                    if (p < c.outerWidth()) {
                        p = c.outerWidth() + 10
                    }
                    b.css({
                        width: p,
                        height: r,
                        left: (c.outerWidth() - (p)) / 2 - 3
                    });
                    if (e.image != null) {
                        b.css({
                            bottom: 0 - b.height() / 2,
                            top: "auto"
                        })
                    }
                    s.stopPropagation()
                },
                mousemove: function(p) {
                    d = true;
                    p.stopPropagation()
                },
                mousedown: function(p) {
                    l = true;
                    p.stopPropagation()
                },
                mouseup: function(p) {
                    if (d && l) {
                        popEditor.init(this);
                        d = false;
                        l = false
                    }
                },
                click: function(p) {
                    p.stopPropagation()
                }
            });
            var m = function(s, r) {
                s = s.replace(/\n/g, "<br>");
                s = s.replace(/<br><br>/g, "<br>");
                if (i.util.isPaste == "safari") {
                    var q = r.find("img:first");
                    if (q.length > 0) {
                        $.showTip("close");
                        $.showTip("Firfox和Safari浏览器暂时还不支持粘贴截图", 4000);
                        q.remove();
                        s = e.title
                    } else {
                        var p = document.createElement("div");
                        p.innerHTML = s;
                        s = p.innerText
                    }
                }
                $("#textarea_topic_temp").remove();
                b.remove();
                i.events.push("hidepopeditor");
                i.util.isPaste = false;
                if (s == e.title) {
                    return
                }
                i.model.updateTopicText.call(i, e, s);
                i.events.push("outline-prebuild", {
                    id: a,
                    rebuild: "current"
                })
            }
        },
        setDisable: function() {
            this.opts.readonly = true
        },
        setEnable: function() {
            this.opts.readonly = false
        },
        setBackground: function(e, g, a) {
            var d = $(this.designer)
              , f = this.styles
              , b = this.model.topic
              , h = b.background || f.background;
            var c = e || f.background;
            if (e == null) {
                if (h) {
                    c = h
                }
            }
            if (c.indexOf("obqv3yxb1.bkt.clouddn.com") >= 0) {
                c = c.replace("obqv3yxb1.bkt.clouddn.com", "cdn3.processon.com")
            }
            d.css({
                background: c
            });
            if (g) {
                b.background = c;
                if (a == null) {
                    this.messageSource.send.call(this, "updateBg", {
                        content: c,
                        original: h
                    })
                }
            }
            this.designer.find(".expand_box").css("background-color", c)
        },
        showLink: function() {
            var g = this
              , e = g.util
              , c = g.model
              , a = e.getSelectedId()
              , f = g.operation;
            if (a == null || $.trim(a) == "") {
                return
            }
            if (g.opts.readonly) {
                return
            }
            var b = e.getTopicDom(a);
            var k = $(".mind-link-box");
            if (k.length == 0) {
                k = $("<div class='mind-topic-box mind-link-box'><h3>超链接<span id='remove_link' style='cursor:pointer;font-size:13px;font-size: 13px;font-weight: normal;float: right;text-decoration: underline;'>删除</span></h3><div><span>链接地址：</span><input id='mind-topic-link' autofocus type='text'/></div><div><span>显示标题：</span><input  id='mind-topic-linktitle' type='text'/></div><div class='mind-topic-box-btn'><span class='mind-button green'>添加</span></div></div>").appendTo(g.designer)
            }
            var d = c.getTopicById(a);
            var i = k.find("input:first");
            if (d.link != null) {
                i.val(d.link.value || "");
                k.find("input:last").val(d.link.title || "")
            }
            $.fn.showPanel({
                target: b,
                panel: k
            });
            i.focus();
            var h = k.find(".mind-button.green");
            var j = k.find("#remove_link");
            i.on("blur", function() {
                var l = $.trim($(this).val());
                if (l != "" && !e.isUrl(l) && l.length < 200) {
                    $(this).val("http://" + l)
                }
            });
            i.on("keyup", function(l) {
                if (l.keyCode == 13) {
                    i.trigger("blur");
                    setTimeout(function() {
                        h.trigger("click")
                    }, 100)
                }
            });
            h.off().on("click", function() {
                var n = $("#mind-topic-link");
                var o = $.trim(n.val());
                if (o != "" && e.isUrl(o) && o.length < 200) {
                    var l = $.trim($("#mind-topic-linktitle").val().substring(0, 30));
                    var m = {
                        value: o,
                        title: l,
                        type: "url"
                    };
                    f.setLink.call(g, m);
                    f.hideLink()
                } else {
                    n.val("").focus();
                    n.attr("placeholder", "请输入合法的URL地址")
                }
            });
            j.off().on("click", function() {
                f.removeLink.call(g);
                f.hideLink()
            })
        },
        hideLink: function() {
            setTimeout(function() {
                $(".mind-topic-box").find("input[type=text]").val("")
            }, 500)
        },
        setLink: function(h) {
            var f = this
              , e = f.util
              , c = f.model
              , a = e.getSelectedId();
            if (a == null || $.trim(a) == "" || $.trim(h.value) == "") {
                return
            }
            if (f.opts.readonly) {
                return
            }
            var i = $.trim(h.value)
              , d = c.getTopicById(a)
              , g = d.link;
            if (g == null) {
                d.link = {}
            }
            var b = e.copy(d);
            if ((b.link != null && b.link.value == h.value) && (b.link != null && b.link.title == h.title)) {
                return
            }
            d.link = {
                value: h.value,
                type: "url",
                title: h.title
            };
            c.updateTopicNode.call(f, d, b, "link")
        },
        removeLink: function() {
            var e = this
              , b = e.util
              , d = e.model
              , f = b.getSelectedId();
            if (f == null || $.trim(f) == "") {
                return
            }
            if (e.opts.readonly) {
                return
            }
            var c = d.getTopicById(f);
            if (c.link == null) {
                return
            }
            var a = b.copy(c);
            delete c.link;
            d.updateTopicNode.call(e, c, a, "link")
        },
        setStyle: function(e) {
            var f = this
              , b = f.util
              , d = f.model
              , h = b.getSelectedId();
            if (h == null || $.trim(h) == "") {
                return
            }
            if (f.opts.readonly) {
                return
            }
            var c = d.getTopicById(h);
            var a = b.copy(c);
            var g = "line";
            if (e["line-width"] != null) {
                c.lineStyle = c.lineStyle || {};
                c.lineStyle.lineWidth = e["line-width"]
            } else {
                if (e["line-color"] != null) {
                    c.lineStyle = c.lineStyle || {};
                    c.lineStyle.lineColor = e["line-color"]
                } else {
                    if (e["line-type"] != null) {
                        c.lineStyle = c.lineStyle || {};
                        c.lineStyle.lineType = e["line-type"]
                    } else {
                        c.style = $.extend(c.style, e);
                        g = "style";
                        if (c.style["border-width"] && c.style.border) {
                            delete c.style.border
                        }
                    }
                }
            }
            d.updateTopicNode.call(f, c, a, g)
        },
        setTopicImage: function(b, a, d) {
            var h = this
              , e = h.model
              , g = h.util;
            if (h.opts.readonly) {
                return
            }
            if (b == null) {
                b = g.getSelectedId()
            }
            if (b == null) {
                return
            }
            var f = e.getTopicById(b);
            var c = g.copy(f);
            var i = g.copy(f);
            i.image = $.extend(true, {
                w: d.width,
                h: d.height
            }, {
                url: a
            });
            e.updateTopicImage.call(h, i, c)
        },
        removeTopicImage: function(f) {
            var e = this
              , d = e.model
              , b = e.util;
            if (e.opts.readonly) {
                return
            }
            var c = d.getTopicById(f);
            var a = b.copy(c);
            if (c != null) {
                delete c.image;
                d.updateTopicImage.call(e, c, a)
            }
        },
        renderTopicImage: function(b) {
            if (b.image && b.image.url) {
                var e = $(".topic-box[id=" + b.id + "]");
                if (b.image.w > 900) {
                    var c = b.image.h * 900 / b.image.w;
                    b.image.w = 900;
                    b.image.h = c
                }
                var a = b.image.url;
                if (a.indexOf("orgu2a928.bkt.clouddn.com") >= 0) {
                    a = a.replace("orgu2a928.bkt.clouddn.com", "cdn2.processon.com")
                } else {
                    if (a.indexOf("7xt9nt.com1.z0.glb.clouddn.com") >= 0) {
                        a = a.replace("7xt9nt.com1.z0.glb.clouddn.com", "cdn.processon.com")
                    } else {
                        if (a.indexOf("p7o7ul1nf.bkt.clouddn.com") >= 0) {
                            a = a.replace("p7o7ul1nf.bkt.clouddn.com", "cdn1.processon.com")
                        }
                    }
                }
                var d = $("<div style='height:" + b.image.h + "px;width:" + b.image.w + "px;' class='topic-image'><img style='height:" + b.image.h + "px;width:" + b.image.w + "px;' id='topic_img_" + b.id + "' src='" + a + "'/></div>");
                e.prepend(d);
                return d
            }
        },
        clearCanvas: function() {
            $(".mind-context-menu").appendTo(".mind-util-container");
            this.container.html("")
        },
        changeStructure: function(m, e, s) {
            var g = this
              , c = g.model
              , n = c.topic
              , h = g.operation
              , r = g.messageSource
              , l = n.structure;
            h.zoomVal = 100;
            n.structure = m;
            var o = "&#xe6fe;";
            switch (m) {
            case "mind_right":
                var d = $.extend([], n.leftChildren);
                delete n.leftChildren;
                n.children = n.children.concat(d);
                o = "&#xe6fb;";
                j(m);
                break;
            case "mind_free":
                var d = $.extend([], n.children);
                var f = $.extend([], n.leftChildren);
                n.children = [];
                n.leftChildren = [];
                var k = d.concat(f);
                var q = k.length;
                var b = q / 2;
                if (q % 2 == 1) {
                    b = (q + 1) / 2
                }
                for (var p = 0; p < q; p++) {
                    var a = k[p];
                    if (p < b || a.free || a.summary) {
                        n.children.push(a)
                    } else {
                        n.leftChildren.push(a)
                    }
                }
                j(m);
                break;
            case "mind_left":
                n.structure = "mind_right";
                var d = $.extend([], n.children);
                n.leftChildren = n.leftChildren || [];
                n.children = [];
                for (var p = 0; p < d.length; p++) {
                    var t = d[p];
                    if (t.free || t.summary) {
                        n.children.push(t)
                    } else {
                        n.leftChildren.push(t)
                    }
                }
                o = "&#xe6fc;";
                j(m);
                break;
            case "mind_org":
                var d = $.extend([], n.leftChildren);
                delete n.leftChildren;
                n.children = n.children.concat(d);
                o = "&#xe6fd;";
                j(m);
                break;
            case "mind_tree":
                var d = $.extend([], n.leftChildren);
                delete n.leftChildren;
                n.children = n.children.concat(d);
                o = "&#xe6fd;";
                j(m);
                break
            }
            function j(i) {
                if (e != null) {
                    e(o)
                }
                c.groupList.doGroup(n, n.structure);
                c.topicList.resetTopicList.call(g);
                h.clearCanvas.call(g);
                var u = g.opts.themeDef;
                mind = new mindDesigner("#mind_con",{
                    chartId: chartId
                },n,u);
                if (s == null) {
                    r.send.call(g, "updateStructure", {
                        content: i,
                        original: l
                    })
                }
            }
        },
        renderTopicLink: function(a, c, b) {
            if (c.link && c.link.value != null) {
                var f = c.link;
                var e = a.getTopicDom(c.id);
                var d = e.children(".topic-link");
                if (d.length) {
                    d.attr("href", f.value);
                    d.attr("title", f.title)
                } else {
                    d = $("<a href='" + f.value + "' target='_blank' title='" + f.title + "' class='topic-link mind-icons'>&#xe6aa;</a>");
                    if (c.note) {
                        e.find(".topic-note").after(d)
                    } else {
                        e.find(".topic").after(d)
                    }
                }
                if (b == "right" || b == null) {
                    d.addClass("right")
                } else {
                    if (b == "left") {
                        d.addClass("left")
                    }
                }
            } else {
                var e = a.getTopicDom(c.id);
                e.children(".topic-link").remove()
            }
        },
        zoomVal: 100,
        zoomIn: function(a) {
            var b = this
              , e = b.operation;
            e.zoomVal = Number(e.zoomVal) + 15;
            var d = e.zoomVal;
            if (d > 200) {
                e.zoomVal = 200;
                return
            }
            var c = d / 100;
            a.css({
                transform: "scale(" + c + ")",
                "-webkit-transform": "scale(" + c + ")",
                "-moz-transform": "scale(" + c + ")"
            });
            mind.plugins.navigator.init.call(mind)
        },
        zoomOut: function(a) {
            var b = this
              , e = b.operation;
            e.zoomVal = Number(e.zoomVal) - 15;
            var d = e.zoomVal;
            if (d < 40) {
                e.zoomVal = 40;
                return
            }
            var c = d / 100;
            a.css({
                transform: "scale(" + c + ")",
                "-webkit-transform": "scale(" + c + ")",
                "-moz-transform": "scale(" + c + ")"
            });
            mind.plugins.navigator.init.call(mind)
        },
        tochZoom: function(b, e, a) {
            var c = this
              , f = c.operation;
            if (e < 40) {
                f.zoomVal = 40;
                return
            }
            if (e > 200) {
                f.zoomVal = 200;
                return
            }
            f.zoomVal = e;
            var d = e / 100;
            b.css({
                transform: "scale(" + d + ")",
                "-webkit-transform": "scale(" + d + ")",
                "-moz-transform": "scale(" + d + ")"
            });
            if (a != null) {
                b.css({
                    "transform-origin": a,
                    "-webkit-transform-origin": a
                })
            }
            mind.plugins.navigator.init.call(mind)
        },
        initBrash: function(e) {
            var a = e.util
              , h = a.getSelectedId()
              , b = e.model
              , g = e.operation;
            if (h == "") {
                return
            }
            var f = b.getTopicById(h);
            var c = e.style.getStyle.call(e, f);
            var d = a.copy(c);
            g.brashData.style = d;
            g.brashData.id = h;
            g.showTip()
        },
        brash: function(i) {
            var f = this
              , d = f.util
              , c = f.model
              , e = f.operation
              , g = c.topic;
            if (e.brashData == null || e.brashData.style == null || e.brashData.id == i) {
                return
            }
            var h = c.getTopicById(i);
            var a = e.brashData.style;
            var b = d.getSelectedPart(h.id, g.structure);
            f.style.setTopicStyles(f, h, a, b)
        },
        brashData: {
            id: null,
            style: null
        },
        showTip: function() {
            $("#mind-brash-tip").show().css({
                left: 25,
                top: 70
            })
        },
        closeTip: function() {
            $("#mind-brash-tip").hide();
            this.brashData.style = null;
            this.brashData.id = null;
            $(".brash").addClass("mind-disable")
        },
        scrollStv: null,
        scrollIsOver: false,
        scrollLayout: null,
        scrollPos: {},
        initScrollPos: function() {
            var a = $(window);
            this.scrollLayout = $("#mind_con");
            this.scrollPos.b = a.height() - 50;
            this.scrollPos.t = 75;
            this.scrollPos.l = 50;
            this.scrollPos.r = a.width() - 50
        },
        isScroll: function(a, c) {
            var b = this;
            if (a < b.scrollPos.l) {
                b.startScroll("l")
            } else {
                if (a > b.scrollPos.r) {
                    b.startScroll("r")
                } else {
                    if (c < b.scrollPos.t) {
                        b.startScroll("t")
                    } else {
                        if (c > b.scrollPos.b) {
                            b.startScroll("b")
                        } else {
                            if (b.scrollIsOver) {
                                b.stopScroll()
                            }
                        }
                    }
                }
            }
        },
        stopScroll: function() {
            var a = this;
            window.clearInterval(a.scrollStv);
            a.scrollStv = null;
            a.scrollIsOver = false
        },
        startScroll: function(b) {
            var a = this;
            if (a.scrollIsOver) {
                return
            }
            a.scrollIsOver = true;
            a.scrollStv = setInterval(function() {
                a.scrolling(b)
            }, 20)
        },
        scrolling: function(c) {
            var b = this
              , a = b.scrollLayout;
            switch (c) {
            case "t":
                a.scrollTop(a.scrollTop() - 5);
                break;
            case "b":
                a.scrollTop(a.scrollTop() + 5);
                break;
            case "l":
                a.scrollLeft(a.scrollLeft() - 5);
                break;
            case "r":
                a.scrollLeft(a.scrollLeft() + 5);
                break
            }
        }
    }
};
mindDesigner.prototype.line = {
    renderLineCon: function() {
        var a = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" xlink="http://www.w3.org/1999/xlink" class="mind-line-svg"><defs></defs><g  class="svg-topic-con" transform="translate(0.5,0.5)"></g><g class="svg-connection-con" transform="translate(0.5,0.5)"></g><g  class="svg-summary-con" transform="translate(0.5,0.5)"></g></svg>';
        $(this.designer).append(a)
    },
    renderSubLineCon: function(b, c) {
        var a = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%"  xlink="http://www.w3.org/1999/xlink"><g id="subline_' + c + '" transform="translate(0.5,0)"></g><g transform="translate(0.5,0)"></g></svg>';
        b.append(a)
    },
    getLineDom: function(a) {
        return $("#line_" + a)
    },
    renderSubLine: function(q, j, g, e, n) {
        var h = this
          , u = document
          , d = h.model
          , o = d.topic
          , b = h.line
          , i = h.styles;
        var f = u.getElementsByClassName("svg-topic-con")[0]
          , r = h.style
          , a = h.util;
        var k = $("#line_" + q.id);
        if (k.length) {
            k.remove()
        }
        var m;
        var c = r.getLineStyle.call(h, q);
        if (o.structure == "mind_org" || o.structure == "mind_tree") {
            m = a.copy(b.getOrgSubLinePath(c, g, e))
        } else {
            m = a.copy(b.getSubLinePath(c, q, j, i.thinner, g, e, n))
        }
        var t = "http://www.w3.org/2000/svg";
        var l = u.createElementNS(t, "path");
        l.setAttributeNS(null, "part", n);
        l.setAttributeNS(null, "sub", "true");
        l.setAttributeNS(null, "id", "line_" + q.id);
        for (var s in m) {
            l.setAttributeNS(null, s, m[s])
        }
        f.appendChild(l)
    },
    getOrgSubLinePath: function(b, h, c, g) {
        var a = Math.ceil(h.x)
          , f = Math.ceil(c.y);
        var e = "M" + a + " " + h.y + " L" + a + " " + (f - 23) + " L" + c.x + " " + (f - 23) + " L" + c.x + " " + (f);
        if (g) {
            return e
        }
        return {
            d: e,
            stroke: b.lineColor,
            fill: "none",
            "stroke-width": b.lineWidth
        }
    },
    getSubLinePath: function(f, e, h, i, a, c, b) {
        var d = f.lineType
          , g = "sub" + d + "UnderLine";
        if (f.underLine && this.linePaths[g] != null) {
            return this.linePaths[g](e, h, f, a, c, i, b)
        }
        return this.linePaths["sub" + d](e, h, f, a, c, i, b)
    },
    getLinePath: function(d, e, a, g, h, b, c) {
        if (a.underLine && this.linePaths[a.lineType + "UnderLine"] != null) {
            return this.linePaths[a.lineType + "UnderLine"](d, e, a, h, b, c)
        }
        var f = this.linePaths[a.lineType](d, e, a, h, b, c);
        return f
    },
    getTreeLinePath: function(e, j, f, k, a, c, b, h) {
        var i = a.y + 2
          , l = a.x + c.w + 10;
        var g = "M" + a.x + " " + i + " L" + a.x + " " + c.y + "L" + l + " " + c.y;
        if (h) {
            return g
        }
        return {
            d: g,
            p: j.id,
            stroke: f.lineColor,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-width": 1
        }
    },
    getOrgLinePath: function(e, j, f, k, a, c, b, h) {
        var i = a.y + 2;
        var g = "M" + a.x + " " + i + " L" + a.x + " " + (i + 24) + " L" + c.x + " " + (i + 24) + "L" + c.x + " " + (c.y - 2);
        if (h) {
            return g
        }
        return {
            d: g,
            p: j.id,
            stroke: f.lineColor,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-width": f.lineWidth
        }
    },
    renderLines: function(c, a, b) {
        var i = this
          , g = i.util
          , h = i.operation
          , l = h.zoomVal / 100
          , m = i.line
          , f = i.model
          , j = f.topic
          , e = j.structure;
        if (b == "left") {
            k(c, a)
        } else {
            d(c, a)
        }
        function d(p, t) {
            if (p.collapsed) {
                return
            }
            var r = p.children
              , n = r.length;
            if (n > 0) {
                for (var q = 0; q < n; q++) {
                    var s = r[q];
                    if (e == "mind_org") {
                        var o = g.getOrgChildTopicRelativePos.call(i, s.id, l);
                        m.renderLine.call(i, s, p, t, o, c.id);
                        o.y += o.h
                    } else {
                        if (e == "mind_tree") {
                            var o = g.getTreeChildTopicRelativePos.call(i, s.id, l);
                            m.renderLine.call(i, s, p, t, o, c.id);
                            o.x += 9
                        } else {
                            var o = g.getChildTopicRelativePos.call(i, s.id, l);
                            m.renderLine.call(i, s, p, t, o, c.id);
                            o.x += o.w
                        }
                    }
                    d(s, o)
                }
            }
        }
        function k(p, t) {
            if (p.collapsed) {
                return
            }
            var r = p.children
              , n = r.length;
            if (n > 0) {
                for (var q = 0; q < n; q++) {
                    var s = r[q];
                    var o = g.getChildTopicRelativePos.call(i, s.id, l);
                    o.x = o.x + o.w;
                    m.renderLine.call(i, s, p, t, o, c.id, "left");
                    o.x -= o.w;
                    k(s, o)
                }
            }
        }
    },
    renderLine: function(i, n, d, g, a, e) {
        if (d.w == 0) {
            return
        }
        var k = this
          , j = k.model
          , m = j.topic
          , b = k.style;
        var r = $("#line_" + i.id);
        var f = document.getElementById("subline_" + a);
        if (r.length) {
            r.remove()
        }
        var h = b.getLineStyle.call(k, i);
        var c;
        if (m.structure == "mind_org") {
            c = k.line.getOrgLinePath(i, n, h, false, d, g, e)
        } else {
            if (m.structure != "mind_tree") {
                c = k.line.getLinePath(i, n, h, false, d, g, e)
            } else {
                c = k.line.getTreeLinePath(i, n, h, false, d, g, e)
            }
        }
        var l = "http://www.w3.org/2000/svg";
        var q = document.createElementNS(l, "path");
        q.setAttributeNS(null, "id", "line_" + i.id);
        if (typeof c == "object") {
            for (var o in c) {
                q.setAttributeNS(null, o, c[o])
            }
        }
        f.appendChild(q)
    },
    renderNewLine: function(g, e, f, d, c) {
        var b = g.line;
        if (f.root) {
            b.renderSubLine.call(g, e, f, {
                x: 0,
                y: 0,
                h: 0
            }, {
                x: 0,
                y: 0,
                h: 0
            }, c)
        } else {
            var a = document.getElementById("subline_" + d);
            b.renderLine.call(g, e, f, {
                x: 0,
                y: 0,
                h: 0,
                w: 0
            }, {
                x: 0,
                y: 0,
                h: 0,
                w: 0
            }, d, c)
        }
    },
    renderNewLines: function(g, d, c) {
        var b = g.line
          , f = d.children
          , a = f.length;
        if (a > 0) {
            for (var e = 0; e < a; e++) {
                var h = f[e];
                b.renderNewLine(g, h, d, c);
                if (h.collapsed) {
                    continue
                }
                b.renderNewLines(g, h, c)
            }
        }
    },
    resetSubLines: function(q) {
        var j = this
          , b = j.util
          , e = j.model
          , l = j.operation
          , a = l.zoomVal / 100
          , r = e.topic
          , k = j.styles
          , m = j.line
          , v = $(".svg-topic-con");
        var p = null;
        if (q != null && q.indexOf("left") >= 0 && q.indexOf("right") < 0) {
            p = v.children("path[part=left]")
        } else {
            if (q != null && q.indexOf("left") >= 0 && q.indexOf("right") >= 0) {
                p = v.children("path")
            } else {
                p = v.children("path[part=right]")
            }
        }
        var c = b.getTopicContainerProp(r.id, a);
        var g = {
            x: c.x + c.w / 2,
            y: c.y + c.h / 2
        };
        var t = p.length;
        for (var s = 0; s < t; s++) {
            var u = p[s], f;
            var n = u.getAttribute("id").substr(5);
            if (r.structure == "mind_org") {
                f = b.getSubTopicDomProp(n, "mind_org", a)
            } else {
                if (r.structure == "mind_tree") {
                    f = b.getSubTopicDomProp(n, "mind_tree", a)
                } else {
                    f = b.getSubTopicDomProp(n, null, a)
                }
            }
            var o = u.getAttribute("part");
            if (o == "left") {
                f.x += f.w
            }
            var d = e.getTopicById(n);
            var w = j.style.getLineStyle.call(j, d);
            var h;
            if (r.structure == "mind_org" || r.structure == "mind_tree") {
                h = m.getOrgSubLinePath(w, g, f, true)
            } else {
                h = m.linePaths["sub" + w.lineType](null, null, null, g, f, k.thinner, o, true)
            }
            u.setAttribute("d", h)
        }
    },
    resetLines: function(I, F, z) {
        var n = this, b = n.util, t = n.opts, p = n.operation, a = p.zoomVal / 100, g = n.model, B = g.topic, o = n.styles, s = n.line, G = $(".svg-topic-con"), y;
        if (z != null && z.indexOf("left") >= 0 && z.indexOf("right") < 0) {
            y = G.children("path[part=left]")
        } else {
            if (z != null && z.indexOf("left") >= 0 && z.indexOf("right") >= 0) {
                y = G.children("path")
            } else {
                y = G.children("path[part=right]")
            }
        }
        var l = (B.structure == "mind_org");
        var v = (B.structure == "mind_tree");
        var E = y.length;
        if (F != null && F == 0 && !l && !v) {
            E = 0
        }
        var e = {};
        var d = b.getTopicDomProp(B.id, a);
        var k = {
            x: d.x + d.w / 2,
            y: d.y + d.h / 2
        };
        for (var C = 0; C < E; C++) {
            var D = y[C];
            var u = D.getAttribute("id").substr(5);
            var w = D.getAttribute("part");
            var f;
            if (l) {
                f = b.getSubTopicDomProp(u, "mind_org", a)
            } else {
                if (v) {
                    f = b.getSubTopicDomProp(u, "mind_tree", a)
                } else {
                    f = b.getSubTopicDomProp(u, null, a)
                }
            }
            if (w == "left") {
                f.x += f.w
            }
            e[u] = w;
            var c = g.getTopicById(u);
            if (c.free || c.summary) {
                continue
            }
            var H = n.style.getLineStyle.call(n, c);
            var m;
            if (l || v) {
                m = s.getOrgSubLinePath(H, k, f, true)
            } else {
                m = s.linePaths["sub" + H.lineType](null, null, null, k, f, o.thinner, w, true)
            }
            D.setAttribute("d", m)
        }
        if (I.length > 0) {
            for (var C = 0; C < I.length; C++) {
                var u = I[C]
                  , r = g.getTopicById(u);
                if (r == null) {
                    continue
                }
                var j = $("#subline_" + u)
                  , x = j.children("path")
                  , q = x.length
                  , w = e[u];
                if (r.children.length == 0 || j.length == 0) {
                    continue
                }
                if (w == null) {
                    w = z
                }
                var k;
                if (l) {
                    k = b.getSubTopicRelativePos(u, "mind_org")
                } else {
                    if (v) {
                        k = b.getSubTopicRelativePos(u, "mind_tree");
                        k.x += 9
                    } else {
                        if (r.summary) {
                            w = b.getSelectedPartByPos(r.target[0])
                        }
                        k = b.getSubTopicRelativePos(u);
                        if (w == "left") {
                            var A = b.getTopicDomProp(u);
                            k.x = A.w - k.w
                        } else {
                            k.x = k.w
                        }
                    }
                }
                s.renderLines.call(n, r, k, w)
            }
        }
    },
    deleteLine: function(b) {
        var e = this
          , d = b.children
          , a = d.length;
        $("path[id=line_" + b.id + "]").remove();
        if (a > 0) {
            for (var c = 0; c < a; c++) {
                var f = d[c];
                e.deleteLine(f)
            }
        }
        if (b.summary) {
            $("path[id=sum_" + b.id + "]").remove()
        }
    },
    deleteChildrenLines: function(b) {
        var e = this
          , d = b.children
          , a = d.length;
        if (a > 0) {
            for (var c = 0; c < a; c++) {
                var f = d[c];
                $("path[id=line_" + f.id + "]").remove();
                e.deleteChildrenLines(f)
            }
        }
    },
    linePaths: {
        subcurve: function(h, n, i, a, g, o, b, m) {
            if (o) {
                var l = ["M"];
                var k = a.y - 6;
                var p = a.y + 6;
                var f = a.x + 10;
                var e = -120
                  , c = -100;
                if (b == "left") {
                    e = 120,
                    c = 100;
                    f = a.x - 10
                }
                if (g.y < k) {
                    l.push(a.x);
                    l.push(k);
                    l.push("C");
                    l.push(a.x);
                    l.push(k);
                    l.push(g.x + e);
                    l.push(g.y);
                    l.push(g.x);
                    l.push(g.y);
                    l.push("C");
                    l.push(g.x + c);
                    l.push(g.y);
                    l.push(f);
                    l.push(a.y);
                    l.push(f);
                    l.push(a.y);
                    l.push("L");
                    l.push(a.x);
                    l.push(k);
                    l.push("Z")
                } else {
                    if (g.y >= k && g.y <= p) {
                        l.push(a.x);
                        l.push(k);
                        l.push("L");
                        l.push(a.x);
                        l.push(p);
                        l.push("L");
                        l.push(g.x);
                        l.push(g.y);
                        l.push("L");
                        l.push(a.x);
                        l.push(k)
                    } else {
                        l.push(a.x);
                        l.push(p);
                        l.push("C");
                        l.push(a.x);
                        l.push(p);
                        l.push(g.x + e);
                        l.push(g.y);
                        l.push(g.x);
                        l.push(g.y);
                        l.push("C");
                        l.push(g.x + c);
                        l.push(g.y);
                        l.push(f);
                        l.push(a.y);
                        l.push(f);
                        l.push(a.y);
                        l.push("L");
                        l.push(a.x);
                        l.push(p);
                        l.push("Z")
                    }
                }
                var j = l.join(" ");
                if (m) {
                    return j
                }
                return {
                    d: j,
                    stroke: i.lineColor,
                    fill: i.lineColor,
                    "stroke-width": 2
                }
            } else {
                var l = ["M"];
                l.push(a.x);
                l.push(a.y);
                l.push("C");
                l.push(a.x);
                l.push(a.y);
                if (b == "left") {
                    l.push(a.x - 10)
                } else {
                    l.push(a.x + 10)
                }
                l.push(g.y);
                l.push(g.x);
                l.push(g.y);
                var j = l.join(" ");
                if (m) {
                    return j
                }
                return {
                    d: j,
                    stroke: i.lineColor,
                    fill: "none",
                    "stroke-width": i.lineWidth
                }
            }
        },
        substraight: function(f, l, g, a, e, m, b, k) {
            if (m) {
                var j = ["M"];
                var i = a.y - 6;
                var n = a.y + 6;
                var c = a.x + 6;
                if (b == "left") {
                    c = a.x - 6
                }
                if (e.y < i) {
                    j.push(a.x);
                    j.push(i);
                    j.push("L");
                    j.push(c);
                    j.push(a.y);
                    j.push("L");
                    j.push(e.x);
                    j.push(e.y);
                    j.push("L");
                    j.push(a.x);
                    j.push(i)
                } else {
                    if (e.y >= i && e.y <= n) {
                        j.push(a.x);
                        j.push(i);
                        j.push("L");
                        j.push(a.x);
                        j.push(n);
                        j.push("L");
                        j.push(e.x);
                        j.push(e.y);
                        j.push("L");
                        j.push(a.x);
                        j.push(i)
                    } else {
                        j.push(a.x);
                        j.push(n);
                        j.push("L");
                        j.push(c);
                        j.push(a.y);
                        j.push("L");
                        j.push(e.x);
                        j.push(e.y);
                        j.push("L");
                        j.push(a.x);
                        j.push(n)
                    }
                }
                j.push("Z");
                var h = j.join(" ");
                if (k) {
                    return h
                }
                return {
                    d: h,
                    stroke: g.lineColor,
                    fill: g.lineColor,
                    "stroke-width": 2
                }
            } else {
                var j = "M" + a.x + " " + a.y + " L" + e.x + " " + e.y;
                if (k) {
                    return j
                }
                return {
                    d: j,
                    stroke: g.lineColor,
                    fill: "none",
                    "stroke-width": g.lineWidth
                }
            }
            return path
        },
        subbroken: function(e, k, f, a, c, l, b, h) {
            if (l) {} else {
                var j = Math.ceil(a.x)
                  , i = Math.ceil(c.y);
                var g = "M" + j + " " + a.y + " L" + j + " " + i + " L" + c.x + " " + i;
                if (h) {
                    return g
                }
                return {
                    d: g,
                    stroke: f.lineColor,
                    fill: "none",
                    "stroke-width": f.lineWidth
                }
            }
            return path
        },
        subroundBroken: function(f, k, g, b, e, l, c, j) {
            var i = ["M"];
            if (l) {} else {
                var a = (b.y < e.y);
                i.push(b.x);
                i.push(b.y);
                i.push("L");
                i.push(b.x);
                if (Math.abs(e.y - b.y) > 8) {
                    i.push(a ? e.y - 8 : e.y + 8);
                    i.push("A");
                    i.push(8);
                    i.push(8);
                    i.push(0);
                    i.push(0);
                    if (c == "left") {
                        i.push(a ? 1 : 0);
                        i.push(b.x - 8)
                    } else {
                        i.push(a ? 0 : 1);
                        i.push(b.x + 8)
                    }
                    i.push(e.y)
                } else {
                    i.push(e.y)
                }
                i.push("L");
                i.push(e.x);
                i.push(e.y);
                var h = i.join(" ");
                if (j) {
                    return h
                }
                return {
                    d: h,
                    stroke: g.lineColor,
                    fill: "none",
                    "stroke-width": g.lineWidth
                }
            }
            return path
        },
        subcurveUnderLine: function(h, m, i, c, f, n, e, l) {
            var k = ["M"]
              , b = $("#" + h.id)
              , a = b.outerHeight()
              , g = b.outerWidth();
            f.y = f.y + a / 2 - 1.5;
            if (e == "left") {
                f.x = f.x - 1
            } else {
                f.x = f.x
            }
            if (n) {} else {
                var k = ["M"];
                k.push(c.x);
                k.push(c.y);
                k.push("C");
                k.push(c.x);
                k.push(c.y);
                if (e == "left") {
                    k.push(c.x - 10)
                } else {
                    k.push(c.x + 10)
                }
                k.push(f.y);
                k.push(f.x);
                k.push(f.y);
                var j = k.join(" ");
                if (l) {
                    return j
                }
                return {
                    d: j,
                    stroke: i.lineColor,
                    fill: "none",
                    "stroke-width": i.lineWidth
                }
            }
        },
        curve: function(h, m, i, a, e, b, l) {
            var n = ""
              , k = ["M"];
            var f = e.x - 16
              , g = a.x + 20
              , c = 16;
            if (b == "left") {
                f = e.x + 16,
                g = a.x - 20;
                c = -16
            }
            k.push(a.x);
            k.push(a.y);
            k.push("L");
            k.push(a.x + c);
            k.push(a.y);
            k.push("C");
            k.push(g);
            k.push(a.y);
            k.push(f);
            k.push(e.y);
            k.push(e.x);
            k.push(e.y);
            var j = k.join(" ");
            if (l) {
                return j
            }
            return {
                d: j,
                p: m.id,
                stroke: i.lineColor,
                "stroke-linecap": "round",
                fill: "none",
                "stroke-width": i.lineWidth
            }
        },
        straight: function(e, i, f, a, c, b, h) {
            var j = "";
            var g = "";
            if (b == "left") {
                g = "M" + (a.x - 4) + " " + a.y + " L" + (a.x - 17) + " " + a.y + " L" + c.x + " " + c.y
            } else {
                g = "M" + (a.x + 4) + " " + a.y + " L" + (a.x + 17) + " " + a.y + " L" + c.x + " " + c.y
            }
            if (h) {
                return g
            }
            return {
                d: g,
                p: i.id,
                stroke: f.lineColor,
                fill: "none",
                "stroke-linecap": "round",
                "stroke-width": f.lineWidth
            }
        },
        broken: function(e, f, a, i, b, c, h) {
            var g = "";
            if (c == "left") {
                g = "M" + i.x + " " + i.y + "L" + Math.ceil(i.x - 15) + " " + i.y + " L" + Math.ceil(i.x - 15) + " " + b.y + " L" + b.x + " " + b.y
            } else {
                g = "M" + i.x + " " + i.y + "L" + Math.ceil(i.x + 15) + " " + i.y + " L" + Math.ceil(i.x + 15) + " " + b.y + " L" + b.x + " " + b.y
            }
            if (h) {
                return g
            }
            return {
                d: g,
                p: f.id,
                stroke: a.lineColor,
                fill: "none",
                "stroke-linecap": "square",
                "stroke-width": a.lineWidth
            }
        },
        roundBroken: function(g, n, h, b, e, c, k) {
            var p = "", j = ["M"], m;
            var f = h.underLine ? (b.y + b.h / 2) : b.y;
            var o = h.underLine ? (e.y + e.h / 2) : e.y;
            var a = o > b.y;
            var l = n.parent == "root";
            j.push(b.x);
            j.push(l ? b.y : f);
            j.push("L");
            if (c == "left") {
                m = Math.ceil(b.x - 18)
            } else {
                m = Math.ceil(b.x + 18)
            }
            j.push(m);
            j.push(l ? b.y : f);
            j.push("L");
            j.push(m);
            if (Math.abs(o - f) > 5) {
                j.push(a ? o - 4 : o + 4);
                j.push("A");
                j.push(4);
                j.push(4);
                j.push(0);
                j.push(0);
                if (c == "left") {
                    j.push(a ? 1 : 0);
                    j.push(m - 4)
                } else {
                    j.push(a ? 0 : 1);
                    j.push(m + 4)
                }
                j.push(o)
            } else {
                j.push(o)
            }
            j.push("L");
            j.push(e.x);
            j.push(o);
            var i = j.join(" ");
            if (k) {
                return i
            }
            return {
                d: i,
                p: n.id,
                stroke: h.lineColor,
                fill: "none",
                "stroke-linecap": "square",
                "stroke-width": h.lineWidth
            }
        },
        roundBrokenUnderLine: function(h, o, i, b, e, c, l) {
            var q = "", k = ["M"], n, g = $("#" + h.id).outerWidth();
            if (b.x == 0) {
                return ""
            }
            var f = b.y + b.h / 2;
            var p = e.y + e.h / 2;
            var a = p > b.y;
            var m = o.parent == "root";
            k.push(b.x);
            k.push(m ? b.y : f);
            k.push("L");
            if (c == "left") {
                n = Math.ceil(b.x - 18)
            } else {
                n = Math.ceil(b.x + 18)
            }
            k.push(n);
            k.push(m ? b.y : f);
            k.push("L");
            k.push(n);
            if (Math.abs(p - f) > 5) {
                k.push(a ? p - 4 : p + 4);
                k.push("A");
                k.push(4);
                k.push(4);
                k.push(0);
                k.push(0);
                if (c == "left") {
                    k.push(a ? 1 : 0);
                    k.push(n - 4)
                } else {
                    k.push(a ? 0 : 1);
                    k.push(n + 4)
                }
                k.push(p)
            } else {
                k.push(p)
            }
            k.push("L");
            if (c == "left") {
                k.push(e.x - g)
            } else {
                k.push(e.x + g)
            }
            k.push(p);
            var j = k.join(" ");
            if (l) {
                return j
            }
            return {
                d: j,
                p: o.id,
                stroke: i.lineColor,
                fill: "none",
                "stroke-linecap": "square",
                "stroke-width": i.lineWidth
            }
        },
        brokenUnderLine: function(h, o, i, b, e, c, l) {
            var q = "", k = ["M"], n, g = $("#" + h.id).outerWidth();
            if (b.x == 0 || e.x == 0) {
                return ""
            }
            var f = b.y + b.h / 2;
            var p = e.y + e.h / 2;
            var a = p > b.y;
            var m = o.parent == "root";
            k.push(b.x);
            k.push(m ? b.y : f);
            k.push("L");
            if (c == "left") {
                n = Math.ceil(b.x - 18)
            } else {
                n = Math.ceil(b.x + 18)
            }
            k.push(n);
            k.push(m ? b.y : f);
            k.push("L");
            k.push(n);
            k.push(p);
            k.push("L");
            if (c == "left") {
                k.push(n - g - 18)
            } else {
                k.push(n + g + 18)
            }
            k.push(p);
            var j = k.join(" ");
            if (l) {
                return j
            }
            return {
                d: j,
                p: o.id,
                stroke: i.lineColor,
                fill: "none",
                "stroke-linecap": "square",
                "stroke-width": i.lineWidth
            }
        }
    }
};
mindDesigner.prototype.summary = {
    model: {
        addSummary: function(f, b, a) {
            var e = f.util
              , d = f.model
              , j = d.topic;
            var g = b.length;
            for (var c = 0; c < g; c++) {
                var h = e.copy(b[c]);
                j.children.push(h);
                d.addTopicToList(h);
                d.groupList.setList(h)
            }
            if (a == null) {
                f.messageSource.send.call(f, "addSummaryTopic", {
                    content: e.copyArray(b)
                })
            }
        }
    },
    getSummaryPos: function(f) {
        var g = this
          , b = g.util
          , e = g.model;
        if (f.length == 1) {
            var a = b.getTopicContainer(f[0]);
            var h = a.offset();
            var d = b.getRealPos.call(g, h.left, h.top);
            d.w = a.outerWidth();
            d.h = a.outerHeight();
            var c = b.getSelectedPart(f[0], e.topic.structure);
            return {
                part: c,
                startY: d.y,
                endY: d.y + d.h,
                startX: d.x + d.w
            }
        }
    },
    getChunkPos: function(k) {
        var h = this
          , m = k.target
          , d = h.model
          , n = d.topic
          , c = h.util
          , r = 0
          , t = 0
          , s = 0
          , q = 0
          , j = h.operation
          , b = j.zoomVal / 100;
        for (var o = 0, p = m.length; o < p; o++) {
            var l = m[o]
              , e = c.getTopicContainer(l);
            if (e.length == 0) {
                continue
            }
            var f = e.children(".topic-children");
            var g = e.offset();
            if (f.length > 0 && f.text() != "") {
                e = e.children(".topic-children");
                g = e.offset()
            } else {}
            var a = c.getRealPos.call(h, g.left, g.top);
            a.w = e.outerWidth();
            a.h = e.outerHeight();
            if (r == 0) {
                r = a.y;
                q = r + a.h;
                t = a.x;
                s = t + a.w;
                continue
            }
            if (a.y < r) {
                r = a.y
            }
            if (a.x + a.w > s) {
                s = a.x + a.w
            }
            if (a.y + a.h > q) {
                q = a.y + a.h
            }
        }
        k.pos = {
            maxX: s,
            minX: t,
            minY: r,
            maxY: q
        };
        return k
    },
    getSummaryChunk: function(g, c) {
        var d = g.model
          , e = g.util;
        var h = c.length
          , f = [];
        if (h == 1) {
            var a = c[0];
            var b = e.getSelectedPartByPos(a);
            var i = {
                target: c
            };
            f.push(i);
            return f
        }
    },
    addSummarys: function(g) {
        var h = this
          , b = h.util
          , e = h.model
          , d = h.summary;
        var a = g.length;
        for (var f = 0; f < a; f++) {
            var c = g[f];
            h.renderTopicDom(c)
        }
        d.model.addSummary(h, g);
        b.selectOne.call(h, g[g.length - 1]);
        h.summary.rangeSummaryTopics.call(h, true)
    },
    addSummary: function(a) {
        var f = this
          , d = f.util
          , c = f.model
          , h = f.summary;
        var e = h.getSummaryChunk(f, a)
          , g = e.length;
        for (var b = 0; b < g; b++) {
            var j = e[b];
            j = h.getChunkPos.call(f, j);
            j = $.extend(j, {
                title: "概要",
                children: [],
                summary: true,
                parent: "root",
                id: c.newId()
            });
            f.renderTopicDom(j)
        }
        h.model.addSummary(f, e);
        d.selectOne.call(f, e[e.length - 1]);
        f.summary.rangeSummaryTopics.call(f, true)
    },
    renderSummaryShape: function(l) {
        var h = this;
        var k = "http://www.w3.org/2000/svg";
        var b = document.getElementsByClassName("svg-summary-con")[0];
        if (document.getElementById("sum_" + l.id) == null) {
            var g = document.createElementNS(k, "path");
            g.setAttribute("id", "sum_" + l.id);
            b.appendChild(g)
        }
        var g = document.getElementById("sum_" + l.id);
        var j = l.pos
          , m = Math.floor((j.minY + j.maxY) / 2)
          , a = Math.floor(j.maxX + 10)
          , e = Math.floor(j.maxX + 20)
          , f = Math.floor(j.maxX + 30);
        var c = h.util.getSelectedPartByPos(l.target[0]);
        if (c == "left") {
            a = Math.floor(j.minX - 10);
            e = Math.floor(j.minX - 20);
            f = Math.floor(j.minX - 33)
        }
        var i = [];
        i.push(" M " + a + " " + Math.floor(j.minY));
        i.push(" L " + e + " " + Math.floor(j.minY));
        i.push(" L " + e + " " + Math.floor(j.maxY));
        i.push(" L " + a + " " + Math.floor(j.maxY));
        i.push(" M " + e + " " + m);
        i.push(" L " + f + " " + m);
        g.setAttributeNS(null, "stroke", "#eb5e41");
        g.setAttributeNS(null, "fill", "none");
        g.setAttributeNS(null, "stroke-width", "2");
        g.setAttributeNS(null, "d", i.join(""))
    },
    rangeSummaryTopics: function(c) {
        var k = this
          , g = k.model
          , f = g.groupList
          , m = g.topic
          , o = (m.structure == "mind_org")
          , h = k.util
          , p = k.line;
        if (f.freeList.length > 0) {
            for (var d = 0, j = f.freeList.length; d < j; d++) {
                var e = f.freeList[d];
                var a = h.getTopicContainer(e.id);
                if (e.summary) {
                    if (c) {
                        e = k.summary.getChunkPos.call(k, e)
                    }
                    var n = e.pos.maxX + 30;
                    var b = h.getSelectedPartByPos(e.target[0]);
                    if (b == "left") {
                        n = e.pos.minX - a.outerWidth() - 32
                    }
                    var l = (e.pos.maxY + e.pos.minY) / 2 - a.outerHeight() / 2;
                    a.css({
                        left: n,
                        top: l
                    });
                    k.summary.renderSummaryShape.call(k, e)
                }
            }
        }
    },
    getRelatedSummarys: function(b, f) {
        var n = this
          , l = n.model
          , k = l.groupList
          , q = k.freeList;
        var g = [];
        for (var e = 0, m = b.length; e < m; e++) {
            var h = b[e];
            var a = l.getChildrenIdsWithoutSelf(h);
            if (f) {
                a.push(h.id)
            }
            var c = a.join(",");
            for (var d = 0; d < q.length; d++) {
                var p = q[d];
                if (p.summary) {
                    var o = p.target;
                    for (var r = 0; r < o.length; r++) {
                        if (a.indexOf(o[r]) >= 0) {
                            g.push(p);
                            break
                        }
                    }
                }
            }
        }
        return g
    },
    removeRelatedSummarys: function(a) {
        var h = this
          , f = h.model
          , e = f.groupList
          , j = e.freeList
          , k = h.line;
        if (a.length > 0 && j.length > 0) {
            var c = h.summary.getRelatedSummarys.call(h, a);
            for (var b = 0, g = c.length; b < g; b++) {
                var d = c[b];
                $(".topic-box[id=" + d.id + "]").parent().remove();
                k.deleteLine(d)
            }
        }
    },
    showRelatedSummarys: function(a, b, e) {
        var j = this
          , g = j.model
          , f = g.groupList
          , k = f.freeList
          , m = j.line;
        if (a.length > 0 && k.length > 0) {
            var d = j.summary.getRelatedSummarys.call(j, a, e);
            for (var c = 0, h = d.length; c < h; c++) {
                var l = d[c];
                j.renderSubTopic(l, b);
                m.renderNewLines(j, l, l.id);
                m.resetLines.call(j, [l.id], null, b)
            }
        }
    }
};
mindDesigner.prototype.connection = {
    currentLine: null,
    tempLine: null,
    loadConnections: function(d) {
        var h = this
          , g = h.model
          , j = g.topic
          , o = j.lines
          , f = h.connection;
        if (d != null) {
            o = d
        }
        if (o == null) {
            return
        }
        var n = false;
        for (var c in o) {
            var m = o[c];
            var l = g.getTopicById(m.from);
            var k = g.getTopicById(m.to);
            var i = g.checkParentIsCollapsed(m.from);
            var a = g.checkParentIsCollapsed(m.to);
            if (l == null || k == null || i || a) {
                continue
            }
            if (m.start.x == null) {
                delete j.lines[c];
                continue
            }
            f.renderConnectionDom(m, true);
            if (m.label && m.label != "label") {
                f.renderConnectionText(h, m)
            }
            if (m.pts == null && m.points.length > 0) {
                m.pts = [{
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: 0
                }];
                var e = h.util.getTopicRealPos.call(h, m.from);
                e.x += e.w / 2;
                var b = h.util.getTopicRealPos.call(h, m.to);
                b.x += b.w / 2;
                m.pts[0]["x"] = m.points[0].x - e.x;
                m.pts[0]["y"] = m.points[0].y - e.y;
                m.pts[1]["x"] = m.points[1].x - b.x;
                m.pts[1]["y"] = m.points[1].y - b.y;
                n = true;
                delete m.start.p;
                delete m.end.p
            }
        }
        f.resetAllConnectionPos.call(h, j, null, true);
        if (n) {
            $.ajax({
                url: "/mindmap/updatedef",
                type: "post",
                data: {
                    id: h.opts.chartId,
                    def: JSON.stringify(j),
                    ignore: "def"
                },
                success: function(p) {},
                error: function() {}
            })
        }
    },
    setConnectionD: function(l) {
        var a = l.realStart
          , c = l.realEnd
          , k = l.points;
        var h = [];
        if (k == null || k.length == 0) {
            h.push("M " + a.x + " " + a.y);
            h.push("L " + c.x + " " + c.y)
        } else {
            var b = [];
            for (var f = 0; f < k.length; f++) {
                var j = k[f];
                b.push({
                    x: j.x,
                    y: j.y
                })
            }
            h.push("M " + a.x + " " + a.y);
            h.push("C " + b[0].x + " " + b[0].y);
            h.push(" " + b[1].x + " " + b[1].y);
            h.push(" " + c.x + " " + c.y)
        }
        var g = document.getElementById("line_" + l.id);
        var e = g.querySelector(".connection-line");
        e.setAttributeNS(null, "d", h.join(""))
    },
    createConnection: function(i, a, h) {
        var f = this
          , e = f.util
          , d = f.model
          , b = f.connection
          , j = f.styles
          , h = h || e.getSelectedId();
        var k = $.extend(true, {
            styles: j.connectionStyle
        }, {
            id: d.newId()
        });
        var c = e.getRealPos.call(f, i.pageX, i.pageY);
        var g = b.getPointInSVG(f, a, c);
        k.start = g;
        k.realEnd = c;
        k.realStart = {
            x: a.x,
            y: a.y
        };
        b.renderConnectionDom(k);
        return k
    },
    createConnectionByLines: function(e, b) {
        var d = e.connection;
        for (var c = 0; c < b.length; c++) {
            var a = b[c];
            d.renderConnectionDom(a);
            d.renderArrow(e, a);
            d.renderConnectionText(e, a);
            d.renderConnControls(e, a)
        }
    },
    getCanvasPos: function(g, c) {
        var b, f, e, d;
        if (g.x <= c.x) {
            b = g.x;
            e = c.x
        } else {
            b = c.x;
            e = g.x
        }
        if (g.y < c.y) {
            f = g.y;
            d = c.y
        } else {
            f = c.y;
            d = g.y
        }
        var a = {};
        if (c.x < g.x && c.y > g.y) {
            return {
                x: b,
                y: f - 10,
                w: e - b + 10,
                h: d - f + 10,
                start: {
                    x: e - b,
                    y: 10
                },
                end: {
                    x: 10,
                    y: d - f
                }
            }
        } else {
            if (c.x < g.x && c.y < g.y) {
                return {
                    x: b,
                    y: f,
                    w: e - b + 10,
                    h: d - f + 10,
                    start: {
                        x: e - b,
                        y: d - f
                    },
                    end: {
                        x: 10,
                        y: 10
                    }
                }
            } else {
                if (c.x > g.x && c.y < g.y) {
                    return {
                        x: b - 10,
                        y: f,
                        w: e - b + 10,
                        h: d - f + 10,
                        start: {
                            x: 10,
                            y: d - f
                        },
                        end: {
                            x: e - b,
                            y: 10
                        }
                    }
                }
            }
        }
        return {
            x: b - 10,
            y: f - 10,
            w: e - b + 10,
            h: d - f + 10,
            start: {
                x: 10,
                y: 10
            },
            end: {
                x: e - b,
                y: d - f
            }
        }
    },
    getSvgPos: function(e, j, h, d) {
        var f = {
            x: j.x - j.w / 2,
            y: j.y - j.h / 2,
            w: j.w,
            h: j.h
        };
        var b = {
            x: e.x - e.w / 2,
            y: e.y - e.h / 2,
            w: e.w,
            h: e.h
        };
        var i, g, c, a;
        if (b.x <= f.x) {
            i = b.x
        } else {
            i = f.x
        }
        if (b.y < f.y) {
            g = b.y
        } else {
            g = f.y
        }
        if (b.x + b.w > f.x + f.w) {
            c = b.x + b.w
        } else {
            c = f.x + f.w
        }
        if (b.y + b.h > f.y + f.h) {
            a = b.y + b.h
        } else {
            a = f.y + f.h
        }
        if (h != null) {
            if (h.x < i) {
                i = h.x
            } else {
                if (h.x > c) {
                    c = h.x
                }
            }
            if (h.y < g) {
                g = h.y
            } else {
                if (h.y > a) {
                    a = h.y
                }
            }
            if (d.x < i) {
                i = d.x
            } else {
                if (d.x > c) {
                    c = d.x
                }
            }
            if (d.y < g) {
                g = d.y
            } else {
                if (d.y > a) {
                    a = d.y
                }
            }
        }
        var k = {
            x: i,
            y: g,
            w: c - i,
            h: a - g
        };
        return k
    },
    resetConnectionsOnMoving: function(e) {
        var g = this
          , f = g.util
          , d = g.connection;
        for (var a in e) {
            var k = e[a];
            var j = document.getElementById("line_" + k.id);
            if (j == null) {
                continue
            }
            var b = f.getTopicRealPos.call(g, k.from);
            b.x += b.w / 2;
            var c = f.getTopicRealPos.call(g, k.to);
            c.x += c.w / 2;
            var i = d.getPointInSVG(g, b, c);
            k.start = i;
            var h = d.getPointInSVG(g, c, b);
            k.end = h;
            k.realStart = {
                x: b.x - b.w / 2 + b.w * i.x,
                y: b.y - b.h / 2 + b.h * i.y
            };
            k.realEnd = {
                x: c.x - c.w / 2 + c.w * h.x,
                y: c.y - c.h / 2 + c.h * h.y
            };
            k.angle = f.getAngle(k.realStart, k.realEnd);
            if (k.points != null && k.points.length > 0) {
                k.points = [];
                k.pts = []
            }
            d.setConnectionD(k);
            d.renderArrow(g, k);
            d.hideOrShowConnectionText(k, "hide")
        }
    },
    resetAllConnectionPos: function(p, k, g) {
        var l = this
          , c = p.lines
          , f = l.model;
        if (c == null || $.isEmptyObject(c)) {
            return
        }
        if (k != null) {
            c = k
        }
        var b = l.util
          , j = l.connection;
        for (var o in c) {
            var m = c[o]
              , a = m.canvasPos;
            var u = document.getElementById("line_" + m.id);
            if (u == null) {
                continue
            }
            var h, t;
            try {
                h = b.getTopicRealPos.call(l, m.to);
                h.x += h.w / 2;
                t = b.getTopicRealPos.call(l, m.from);
                t.x += t.w / 2
            } catch (s) {
                continue
            }
            var q = m.points
              , i = {
                x: t.x - t.w / 2 + m.start.x * t.w,
                y: t.y - t.h / 2 + m.start.y * t.h
            }
              , d = {
                x: h.x - h.w / 2 + m.end.x * h.w,
                y: h.y - h.h / 2 + m.end.y * h.h
            };
            m.realStart = i;
            m.realEnd = d;
            if (q != null && q.length > 0) {
                var v = m.pts;
                q[0] = {
                    x: v[0].x + t.x,
                    y: v[0].y + t.y
                };
                q[1] = {
                    x: v[1].x + h.x,
                    y: v[1].y + h.y
                }
            }
            var n = {};
            if (q.length == 0) {
                n = {
                    x: (d.x + i.x) / 2,
                    y: (d.y + i.y) / 2
                }
            } else {
                n = {
                    x: q[1].x,
                    y: q[1].y
                }
            }
            var r = {
                x: d.x,
                y: d.y
            };
            m.angle = b.getAngle(n, r);
            j.setConnectionD(m);
            j.renderArrow(l, m);
            j.renderConnectionText(l, m, false)
        }
    },
    renderConnectionDom: function(c, b) {
        var f = "http://www.w3.org/2000/svg";
        var a = document.getElementsByClassName("svg-connection-con")[0];
        var h = document.getElementById("line_" + c.id), e, d;
        var g = c.styles;
        if (h) {
            e = h.querySelector(".connection-line");
            d = h.querySelector(".connection-end-arrow")
        } else {
            h = document.createElementNS(f, "g");
            e = document.createElementNS(f, "path");
            d = document.createElementNS(f, "path");
            h.appendChild(e);
            h.appendChild(d);
            a.appendChild(h);
            e.setAttributeNS(null, "fill", "none");
            e.setAttributeNS(null, "d", "");
            e.setAttributeNS(null, "class", "connection-line");
            d.setAttributeNS(null, "class", "connection-end-arrow");
            e.setAttributeNS(null, "stroke-linejoin", "round");
            h.setAttributeNS(null, "id", "line_" + c.id);
            h.setAttributeNS(null, "class", "connection-svg")
        }
        if (g.lineType == "dashed") {
            e.setAttributeNS(null, "stroke-dasharray", "10,8")
        } else {
            e.removeAttribute("stroke-dasharray")
        }
        if (g.lineWidth > 3) {
            d.setAttributeNS(null, "stroke-linejoin", "round");
            d.setAttributeNS(null, "stroke-linecap", "round")
        } else {
            d.removeAttribute("stroke-linejoin");
            d.removeAttribute("stroke-linecap")
        }
        if (g.lineArrow != 1) {
            d.setAttributeNS(null, "fill", g.lineColor)
        } else {
            d.removeAttribute("fill")
        }
        e.setAttributeNS(null, "stroke", g.lineColor);
        e.setAttributeNS(null, "stroke-width", g.lineWidth);
        d.setAttributeNS(null, "stroke", g.lineColor);
        d.setAttributeNS(null, "stroke-width", g.lineWidth);
        if (b != true) {
            this.setConnectionD(c)
        }
        return h
    },
    render: function(s) {
        var j = this
          , b = j.util
          , f = j.model
          , i = b.getSelectedId()
          , h = j.connection
          , l = j.styles
          , m = j.operation
          , a = m.zoomVal / 100;
        if (i == 0) {
            return
        }
        var t = b.getTopicRealPos.call(j, i);
        t.x = t.x + t.w / 2;
        var k = $("#" + i);
        var n = h.createConnection.call(j, s, t, i);
        var q = document.getElementById("line_" + n.id);
        var r = q.querySelector(".connection-line");
        j.designer.css("cursor", "move");
        m.initScrollPos();
        var p, o, g = {}, d = k.offset().left + k.outerWidth() / 2, c = k.offset().top + k.outerHeight() / 2;
        j.designer.off("mousemove.connection").on("mousemove.connection", function(v) {
            if ($(".mind-tip").length == 0) {
                $.showTip("点击其他主题，即可设置关联连线", null)
            }
            m.isScroll(v.pageX, v.pageY);
            p = v.pageX,
            o = v.pageY;
            var u = b.getRealPos.call(j, p, o);
            n.realEnd = u;
            var e = h.getPointInSVG(j, t, u);
            n.start = e;
            n.realStart = {
                x: t.x - t.w / 2 + t.w * e.x,
                y: t.y - t.h / 2 + t.h * e.y
            };
            h.setConnectionD(n)
        });
        j.designer.off("mouseup.connection").on("mouseup.connection", function(y) {
            j.designer.off("mousemove.connection");
            j.designer.off("mouseup.connection");
            m.stopScroll();
            var x = $(y.target);
            var A = x.parents()
              , v = "";
            for (var w = 0; w < A.length; w++) {
                var B = $(A[w]);
                if (B.hasClass("topic") || B.hasClass("topic-box")) {
                    x = B;
                    break
                }
            }
            if (x.hasClass("topic") || x.hasClass("topic-box")) {
                var e = x.attr("id");
                if (e == null) {
                    e = x.parent().attr("id")
                }
                n.from = i;
                n.to = e;
                var u = b.getTopicRealPos.call(j, e);
                u.x += u.w / 2;
                var z = h.getPointInSVG(j, u, t);
                n.end = z;
                n.realEnd = {
                    x: u.x - u.w / 2 + u.w * z.x,
                    y: u.y - u.h / 2 + u.h * z.y
                };
                n.angle = b.getAngle(n.realStart, n.realEnd);
                n.points = [];
                h.currentLine = n;
                h.setConnectionD(n);
                h.renderArrow(j, n);
                h.renderConnControls(j, n);
                h.renderConnectionText(j, n);
                h.renderConnectionTip(n);
                h.addConnection(j, n)
            } else {
                q.remove()
            }
            $.showTip("close");
            j.designer.css("cursor", "default")
        })
    },
    renderArrow: function(f, m) {
        var c = document.getElementById("line_" + m.id);
        var j = c.querySelector(".connection-end-arrow");
        var b = m.realEnd
          , l = m.styles
          , a = m.angle
          , i = l.lineType
          , e = l.lineWidth;
        var k = f.util.getArrowPoints(a, b, e);
        var h = [];
        h.push("M" + b.x + " " + b.y);
        switch (l.lineArrow) {
        case "1":
            h.push("L" + k.x1 + " " + k.y1);
            h.push("M" + b.x + " " + b.y);
            h.push("L" + k.x2 + " " + k.y2);
            h.push("Z");
            break;
        case "2":
            h.push("L" + k.x1 + " " + k.y1);
            h.push("M" + b.x + " " + b.y);
            h.push("L" + k.x2 + " " + k.y2);
            h.push("L" + k.x1 + " " + k.y1);
            h.push("Z");
            break;
        case "3":
            h = [];
            break;
        default:
            h.push("L" + k.x1 + " " + k.y1);
            h.push("M" + b.x + " " + b.y);
            h.push("L" + k.x2 + " " + k.y2);
            h.push("Z");
            break
        }
        var g = h.join(" ");
        j.setAttributeNS(null, "d", g)
    },
    getSvgPosProperty: function(i, f, b) {
        var h = i.util
          , k = {}
          , j = {};
        var c = h.getTopicRealPos.call(i, b);
        var g = {
            x: c.x,
            y: c.y - c.h / 2
        };
        var d = {
            x: c.x,
            y: c.y + c.h / 2
        };
        var e = {
            x: c.x + c.w,
            y: c.y - c.h / 2
        };
        var a = {
            x: c.x + c.w,
            y: c.y + c.h / 2
        };
        if (f.x < g.x && f.y < g.y) {
            k.x = f.x;
            k.y = f.y;
            k.w = g.x + c.w - f.x;
            k.h = g.y + c.h - f.y;
            j.x = 0;
            j.y = 0
        } else {
            if (f.x < g.x && f.y >= g.y && f.y <= d.y) {
                k.x = f.x;
                k.y = g.y;
                k.w = g.x + c.w - f.x;
                k.h = c.h;
                j.x = 0;
                j.y = f.y - g.y
            } else {
                if (f.x < g.x && f.y > d.y) {
                    k.x = f.x;
                    k.y = g.y;
                    k.w = g.x + c.w - f.x;
                    k.h = f.y - g.y;
                    j.x = 0;
                    j.y = f.y - g.y
                } else {
                    if (f.x >= g.x && f.x <= e.x && f.y < g.y) {
                        k.x = g.x;
                        k.y = f.y;
                        k.w = c.w;
                        k.h = d.y - f.y;
                        j.x = f.x - g.x;
                        j.y = 0
                    } else {
                        if (f.x >= g.x && f.x <= e.x && f.y > d.y) {
                            k.x = g.x;
                            k.y = g.y;
                            k.w = c.w;
                            k.h = f.y - g.y;
                            j.x = f.x - g.x;
                            j.y = f.y - g.y
                        } else {
                            if (f.x > e.x && f.y < e.y) {
                                k.x = g.x;
                                k.y = f.y;
                                k.w = f.x - g.x;
                                k.h = d.y - f.y;
                                j.x = k.w;
                                j.y = 0
                            } else {
                                if (f.x > e.x && f.y >= e.y && f.y <= a.y) {
                                    k.x = g.x;
                                    k.y = g.y;
                                    k.w = f.x - g.x;
                                    k.h = c.h;
                                    j.x = k.w;
                                    j.y = f.y - e.y
                                } else {
                                    if (f.x > e.x && f.y > a.y) {
                                        k.x = g.x;
                                        k.y = g.y;
                                        k.w = f.x - g.x;
                                        k.h = f.y - g.y;
                                        j.x = k.w;
                                        j.y = k.h
                                    } else {
                                        return null
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        k.end = j;
        return k
    },
    initEvent: function(h) {
        var f = h.util
          , a = h.connection
          , e = a.currentLine;
        var k = f.getTopicRealPos.call(h, e.from)
          , i = f.getTopicRealPos.call(h, e.to);
        var g = {
            x: k.x + k.w / 2,
            y: k.y,
            w: k.w,
            h: k.h
        };
        var c = {
            x: i.x + i.w / 2,
            y: i.y,
            w: i.w,
            h: i.h
        };
        var d = document.getElementById("line_" + e.id);
        var j = h.designer;
        var b = f.copy(e);
        j.off("mousedown.points").on("mousedown.points", ".connection_point", function(s) {
            var q = $(this)
              , v = s.pageX
              , u = s.pageY
              , r = h.operation
              , B = r.zoomVal / 100;
            var o = $(".connection_point[tp=from]"), l = $(".connection_point[tp=to]"), t = $(".mind-connection-con[conn=" + e.id + "]"), A = t.find(".mind-connection-label"), p, z, w;
            h.plugins.hideConnectionTip();
            t.find(".mind-connection-label-icons").hide();
            j.off("selectstart").on("selectstart", function() {
                return false
            });
            A.attr("contenteditable", false);
            h.util.clearSelect();
            a.currentLine = e;
            var n = q.position().left + q.width() / 2
              , m = q.position().top + q.height() / 2;
            j.off("mousemove.points").on("mousemove.points", function(C) {
                var y = C.pageX
                  , x = C.pageY
                  , I = y - v
                  , H = x - u;
                if (Math.abs(I) > 2 || Math.abs(H) > 2) {
                    l = $(".connection_point[tp=to]");
                    o = $(".connection_point[tp=from]");
                    var E = f.getRealPos.call(h, y, x);
                    var G = q.attr("tp");
                    a.resetControls(G, E, e, h);
                    if (G == "from") {
                        z = E;
                        w = {
                            x: l.position().left / B + l.outerWidth() / 2,
                            y: l.position().top / B + l.outerHeight() / 2
                        }
                    } else {
                        z = {
                            x: o.position().left / B + o.outerWidth() / 2,
                            y: o.position().top / B + o.outerHeight() / 2
                        };
                        w = E
                    }
                    if (G == "from") {
                        var F = a.getPointInSVG(h, g, E);
                        e.start = F;
                        e.realStart = {
                            x: g.x - g.w / 2 + g.w * F.x,
                            y: g.y - g.h / 2 + g.h * F.y
                        };
                        e.points[0] = {
                            x: E.x,
                            y: E.y
                        };
                        e.points[1] = {
                            x: w.x,
                            y: w.y
                        };
                        p = f.getAngle({
                            x: w.x,
                            y: w.y
                        }, c)
                    } else {
                        p = f.getAngle(E, c);
                        var D = a.getPointInSVG(h, c, E);
                        e.end = D;
                        e.realEnd = {
                            x: c.x - c.w / 2 + c.w * D.x,
                            y: c.y - c.h / 2 + c.h * D.y
                        };
                        e.points[1] = {
                            x: E.x,
                            y: E.y
                        };
                        e.points[0] = {
                            x: z.x,
                            y: z.y
                        }
                    }
                    e.pts = [];
                    e.pts[0] = {
                        x: e.points[0].x - g.x,
                        y: e.points[0].y - g.y
                    };
                    e.pts[1] = {
                        x: e.points[1].x - c.x,
                        y: e.points[1].y - c.y
                    };
                    e.angle = p;
                    a.setConnectionD(e);
                    a.renderArrow(h, e);
                    a.renderConnectionTextPos(h, t, e)
                }
                C.preventDefault()
            });
            j.off("mouseup.points").on("mouseup.points", function(x) {
                A.attr("contenteditable", true);
                a.updateConnection(h, e, b);
                j.off("mousemove.points");
                j.off("mouseup.points");
                j.off("selectstart").on("selectstart", function() {
                    return true
                });
                t.find(".mind-connection-label-icons").show();
                s.stopPropagation()
            });
            s.stopPropagation()
        });
        $(".mind-connection-menu").find("div[alt]").children().off("click").on("click", function(p) {
            var n = $(this)
              , q = n.parent()
              , r = n.attr("ac");
            var o = q.attr("alt");
            var t = a.currentLine;
            if (t == null) {
                return
            }
            var m = f.copy(t);
            var s = t.styles || {}, l;
            if (o == "width") {
                if (s.lineWidth == r) {
                    return
                }
                t.styles = $.extend(s, {
                    lineWidth: r
                })
            } else {
                if (o == "color") {
                    if (s.lineColor == r) {
                        return
                    }
                    t.styles = $.extend(s, {
                        lineColor: r
                    })
                } else {
                    if (o == "type") {
                        if (s.lineType == r) {
                            return
                        }
                        t.styles = $.extend(s, {
                            lineType: r
                        })
                    } else {
                        if (o == "arrow") {
                            if (s.lineArrow == r) {
                                return
                            }
                            t.styles = $.extend(s, {
                                lineArrow: r
                            })
                        }
                    }
                }
            }
            n.addClass("active").siblings().removeClass("active");
            a.updateConnection(h, t, m);
            a.createConnectionByLines(h, [t])
        });
        $(".mind-connection-menu").find(".mind-button").off().on("click", function(l) {
            if (a.currentLine) {
                a.deleteConnection(h, e)
            }
            l.stopPropagation()
        })
    },
    setSVGPos: function(e, a, b) {
        var c = {}
          , d = 1;
        if (e.x < a.x && e.y < a.y) {
            c.x = e.x;
            c.y = e.y;
            d = 3
        } else {
            if (e.x <= a.x && e.y >= a.y) {
                c.x = e.x;
                c.y = a.y;
                d = 2
            } else {
                if (a.x < e.x && a.y > e.y) {
                    c.x = a.x;
                    c.y = e.y;
                    d = 4
                } else {
                    if (a.x <= e.x && a.y <= e.y) {
                        c.x = a.x;
                        c.y = a.y;
                        d = 1
                    }
                }
            }
        }
        c.w = Math.abs(a.x - e.x);
        c.h = Math.abs(a.y - e.y);
        this.setSVGPosByPos(c, b);
        return d
    },
    setSVGPosByPos: function(b, a) {
        a.style.cssText = "left:" + b.x + "px;top:" + b.y + "px;width:" + b.w + "px;height:" + b.h + "px"
    },
    focusConnection: function(b, a) {
        this.currentLine = a;
        this.renderConnControls(b, a);
        this.renderConnectionText(b, a);
        this.renderConnectionTip(a);
        b.util.clearSelect()
    },
    blurConnection: function(a) {
        this.clearControls();
        var b = $(".mind-connection-con[conn]");
        b.each(function(d, e) {
            var c = $.trim($(e).find(".mind-connection-label").html());
            if (c == "" || c == "label") {
                $(e).remove()
            }
        });
        this.currentLine = null;
        this.renderConnectionTip(false)
    },
    renderConnectionText: function(b, a, e) {
        var f = $(".mind-connection-con[conn=" + a.id + "]");
        if (f.length == 0 && e == null) {
            var f = $("<div conn='" + a.id + "' class='mind-connection-con'><div class='mind-connection-label' spellcheck='false' contenteditable='true'>label</div><span class='mind-icons mind-connection-label-icons'>&#xe663;</span></div>");
            b.designer.append(f)
        }
        var d = f.children(".mind-connection-label")
          , c = f.children(".mind-connection-label-icons");
        if (a.label) {
            d.html(a.label)
        }
        this.renderConnectionTextPos(b, f, a)
    },
    hideOrShowConnectionText: function(a, c) {
        if (c == "show") {
            $(".mind-connection-label").show();
            return
        }
        var d = $(".mind-connection-con[conn=" + a.id + "]");
        if (d.length) {
            var b = d.children(".mind-connection-label");
            b.hide()
        }
    },
    renderConnectionTip: function(a) {
        if (a == false) {
            $(".mind-connection-label-icons").hide()
        } else {
            var b = $(".mind-connection-con[conn=" + a.id + "]");
            b.find(".mind-icons").show()
        }
    },
    renderConnectionTextPos: function(d, a, c) {
        var b = this.getConnectionMidPoint(c);
        a.css({
            left: b.x,
            top: b.y,
            background: c.styles.lineColor,
            color: c.styles.color
        })
    },
    renderConnControls: function(f, e) {
        var n = f.designer
          , c = f.connection
          , l = e.points
          , g = e.canvasPos
          , b = e.realStart
          , d = e.realEnd;
        var j = {
            x: (b.x + d.x) / 2,
            y: (b.y + d.y) / 2
        };
        function a(q, r) {
            $(".connection_line[tp=" + q + "]").remove();
            $(".connection_point[tp=" + q + "]").remove();
            var p = $("<div tp='" + q + "' class='connection_line'></div>").appendTo(n);
            var o = $("<div tp='" + q + "' class='connection_point'></div>").appendTo(n);
            if (r == null) {
                r = {};
                if (q == "from") {
                    r.x = (j.x + b.x) / 2;
                    r.y = (j.y + b.y) / 2
                } else {
                    r.x = (d.x + j.x) / 2;
                    r.y = (d.y + j.y) / 2
                }
            }
            return r
        }
        var m = l[0];
        var k = l[1];
        var i = a("from", m);
        var h = a("to", k);
        c.resetControls("from", i, e, f);
        c.resetControls("to", h, e, f);
        c.currentLine = e;
        this.initEvent(f)
    },
    resetControls: function(l, j, e, h) {
        var f = h.util
          , b = h.connection
          , e = e || b.currentLine
          , n = e.styles;
        var o = $(".connection_line[tp=" + l + "]")
          , m = $(".connection_point[tp=" + l + "]")
          , g = 0;
        m.css({
            left: j.x,
            top: j.y,
            border: "1px solid " + n.lineColor
        });
        var a = e.realStart;
        var d = e.realEnd;
        var k, i, c;
        if (l == "from") {
            g = f.calcDistance(a, j);
            k = (j.x + a.x) / 2;
            i = (j.y + a.y) / 2;
            c = f.getAngle(a, j)
        } else {
            k = (j.x + d.x) / 2;
            i = (j.y + d.y) / 2;
            g = f.calcDistance(d, j);
            c = f.getAngle(d, j)
        }
        o.css({
            left: k,
            top: i - g / 2,
            height: g,
            "-webkit-transform": "rotate(" + (90 + c) + "deg)",
            transform: "rotate(" + (90 + c) + "deg)",
            background: n.lineColor
        })
    },
    clearControls: function(a) {
        $(".connection_point").remove();
        $(".connection_line").remove()
    },
    getConnectionMidPoint: function(b) {
        var f = b.points
          , c = [];
        var g = b.realStart
          , a = b.realEnd;
        if (f.length == 0) {
            var e = (a.x + g.x) / 2;
            var d = (a.y + g.y) / 2;
            c = [{
                x: e,
                y: d
            }, {
                x: e,
                y: d
            }]
        } else {
            c = [{
                x: f[0].x,
                y: f[0].y
            }, {
                x: f[1].x,
                y: f[1].y
            }]
        }
        return {
            x: 0.125 * g.x + 0.375 * c[0].x + 0.375 * c[1].x + 0.125 * a.x,
            y: 0.125 * g.y + 0.375 * c[0].y + 0.375 * c[1].y + 0.125 * a.y
        }
    },
    getConnectionByPoint: function(h, f) {
        var d = this
          , g = d.model.topic
          , b = g.lines
          , c = d.connection;
        var e, j = [];
        for (var a in b) {
            var i = b[a];
            e = c.pointInConnection({
                x: h,
                y: f
            }, i, 7);
            if (e > 0) {
                j.push(i);
                break
            }
        }
        return {
            inline: e,
            lines: j
        }
    },
    pointInConnection: function(h, m, e) {
        var j = this.getConnectionPoints(m)
          , f = j.length;
        var c = {
            x: h.x - e,
            y: h.y
        };
        var b = {
            x: h.x + e,
            y: h.y
        };
        var a = {
            x: h.x,
            y: h.y - e
        };
        var l = {
            x: h.x,
            y: h.y + e
        };
        for (var d = 1; d < f; d++) {
            var k = j[d - 1];
            var i = j[d];
            var g = this.checkCross(c, b, k, i);
            if (g) {
                return d
            }
            g = this.checkCross(a, l, k, i);
            if (g) {
                return d
            }
        }
        return -1
    },
    getConnectionPoints: function(k) {
        var h = [];
        var a = k.points
          , j = {};
        var c = k.realStart
          , e = k.realEnd;
        if (a.length == 0) {
            var g = (e.x + c.x) / 2;
            var f = (e.y + c.y) / 2;
            j = [{
                x: g,
                y: f
            }, {
                x: g,
                y: f
            }]
        } else {
            j = [{
                x: a[0].x,
                y: a[0].y
            }, {
                x: a[1].x,
                y: a[1].y
            }]
        }
        var d = 0.05;
        var i = 0;
        while (i <= 1) {
            var b = {
                x: (1 - i) * (1 - i) * (1 - i) * c.x + 3 * (1 - i) * (1 - i) * i * j[0].x + 3 * (1 - i) * i * i * j[1].x + i * i * i * e.x,
                y: (1 - i) * (1 - i) * (1 - i) * c.y + 3 * (1 - i) * (1 - i) * i * j[0].y + 3 * (1 - i) * i * i * j[1].y + i * i * i * e.y
            };
            h.push(b);
            i += d
        }
        h.push(k.end);
        return h
    },
    checkCross: function(i, g, f, e) {
        var a = false;
        var h = (g.x - i.x) * (e.y - f.y) - (g.y - i.y) * (e.x - f.x);
        if (h != 0) {
            var c = ((i.y - f.y) * (e.x - f.x) - (i.x - f.x) * (e.y - f.y)) / h;
            var b = ((i.y - f.y) * (g.x - i.x) - (i.x - f.x) * (g.y - i.y)) / h;
            if ((c >= 0) && (c <= 1) && (b >= 0) && (b <= 1)) {
                a = true
            }
        }
        return a
    },
    getPointInSVG: function(d, b, c) {
        var a = this.getActivePosOnTopic(b, c);
        return a
    },
    getActivePosOnTopic: function(a, f) {
        var d = a.h / 2;
        var i = a.w / 2;
        var b = (f.y - a.y) / (f.x - a.x);
        var h = 0
          , g = 0
          , e = 1
          , j = {};
        if (f.x > a.x && f.y < a.y) {
            var c = -d / b;
            h = (i + c) / a.w;
            g = 0;
            if (c > i) {
                h = 1;
                g = (d + b * i) / a.h
            }
            e = 2
        } else {
            if (f.x >= a.x && f.y >= a.y) {
                var c = d / b;
                h = (i + c) / a.w;
                g = 1;
                if (c > i) {
                    h = 1;
                    g = (d + b * i) / a.h
                }
                e = 3
            } else {
                if (f.x <= a.x && f.y >= a.y) {
                    var c = -d / b;
                    h = (i - c) / a.w;
                    g = 1;
                    if (c > i) {
                        h = 0;
                        g = (d - b * i) / a.h
                    }
                    e = 4
                } else {
                    if (f.x <= a.x && f.y <= a.y) {
                        var c = d / b;
                        h = (i - c) / a.w;
                        g = 0;
                        if (c > i) {
                            h = 0;
                            g = (d - b * i) / a.h
                        }
                        e = 1
                    }
                }
            }
        }
        return {
            x: h.toFixed(1),
            y: g.toFixed(1),
            index: e
        }
    },
    getConnectionsByTopic: function(b) {
        var h = this
          , e = h.model
          , j = e.topic
          , m = j.lines
          , f = h.util
          , c = h.connection;
        if (m == null || $.isEmptyObject(m)) {
            return
        }
        var k = e.getTopicById(b);
        var a = e.getChildrenIds(k);
        a.push(b);
        var g = a.join(",");
        var d = [];
        for (var i in m) {
            var l = m[i];
            if (g.indexOf(l.from) >= 0 || g.indexOf(l.to) >= 0) {
                d.push(l)
            }
        }
        return d
    },
    addConnection: function(b, a) {
        this.addConnectionMulti(b, [a])
    },
    addConnectionMulti: function(d, a, e) {
        for (var c = 0; c < a.length; c++) {
            var b = a[c];
            this.saveConnection(d, b);
            this.currentLine = b
        }
        if (e == null) {
            d.messageSource.send.call(d, "addConnection", {
                content: a
            })
        }
    },
    updateConnection: function(c, b, a, d) {
        this.saveConnection(c, b);
        if (d == null) {
            c.messageSource.send.call(c, "updateConnection", {
                content: b,
                original: a
            })
        }
    },
    saveConnection: function(d, c) {
        var b = d.model
          , a = b.topic;
        if (a.lines == null) {
            a.lines = {}
        }
        a.lines[c.id] = c
    },
    saveConnectionText: function(e, c, b) {
        var d = e.model
          , a = d.topic;
        a.lines[c.id] = c;
        e.messageSource.send.call(e, "updateConnection", {
            content: c,
            original: b
        })
    },
    deleteConnection: function(b, a) {
        this.deleteConnectionMulti(b, [a])
    },
    deleteConnectionMulti: function(f, b, a) {
        if (b.length == 0) {
            return
        }
        var e = f.model
          , h = e.topic
          , j = h.lines;
        for (var c = 0, g = b.length; c < g; c++) {
            var d = b[c];
            $("g[id=line_" + d.id + "]").remove();
            $(".mind-connection-con[conn=" + d.id + "]").remove();
            delete j[d.id]
        }
        if ($.isEmptyObject(j)) {
            delete h.lines
        }
        this.clearControls();
        e.topicList.resetTopicList.call(f);
        this.currentLine = null;
        if (a == null) {
            f.messageSource.send.call(f, "deleteConnection", {
                content: b
            })
        }
    },
    deleteConnectionByTopics: function(b, k) {
        var l = this
          , h = l.model
          , m = h.topic
          , d = l.connection
          , n = m.lines;
        if (b.length > 0 && n != null) {
            var f = [];
            if (k == false) {
                for (var e = 0, j = b.length; e < j; e++) {
                    var g = b[e];
                    var a = h.getChildrenIdsWithoutSelf(g);
                    var c = a.join(",");
                    $.each(n, function(p, o) {
                        if (c.indexOf(o.from) >= 0 || c.indexOf(o.to) >= 0) {
                            f.push(o)
                        }
                    })
                }
                d.hideConnectionMulti(l, f)
            } else {
                for (var e = 0, j = b.length; e < j; e++) {
                    var g = b[e];
                    var a = h.getChildrenIds(g);
                    var c = a.join(",");
                    $.each(n, function(p, o) {
                        if (c.indexOf(o.from) >= 0 || c.indexOf(o.to) >= 0) {
                            f.push(o)
                        }
                    })
                }
                d.deleteConnectionMulti(l, f)
            }
        }
    },
    hideConnectionMulti: function(h, d) {
        if (d.length == 0) {
            return
        }
        var f = h.model
          , c = f.topic
          , b = c.lines;
        for (var g = 0, a = d.length; g < a; g++) {
            var e = d[g];
            $("g[id=line_" + e.id + "]").remove();
            $(".mind-connection-con[conn=" + e.id + "]").remove()
        }
        this.clearControls()
    },
    showConnectionMulti: function(k, b) {
        var f = []
          , h = k.model
          , l = h.topic
          , m = l.lines
          , d = this;
        if (m == null) {
            return
        }
        for (var e = 0, j = b.length; e < j; e++) {
            var g = b[e];
            var a = h.getChildrenIdsWithoutSelf(g);
            var c = a.join(",");
            $.each(m, function(o, n) {
                if (c.indexOf(n.from) >= 0 || c.indexOf(n.to) >= 0) {
                    f.push(n)
                }
            })
        }
        d.loadConnections.call(k, f)
    }
};
mindDesigner.prototype.virtualTopic = {
    setMovingRelated: function(g, m) {
        $(".topic-box").append("<div class='topic-insert before'></div><div class='topic-insert after'></div><div class='topic-insert in'></div></div>");
        var a = $("#" + g.id)
          , c = a.siblings(".topic-children");
        var b = a.parent();
        $(".topic-box[id=" + root.id + "]").find(".topic-insert:not(.in)").remove();
        b.addClass("topic-moving-related");
        a.find(".topic-insert").remove();
        c.find(".topic-insert").remove();
        $(".topic-box.free").children(".topic-insert:not(.in)").remove();
        if (m != null) {
            var j = 0
              , k = m.children;
            for (var e = 0, h = k.length; e < h; e++) {
                var l = k[e];
                if (l.id == g.id) {
                    j = e;
                    break
                }
            }
            var d = k[j - 1];
            var f = k[j + 1];
            if (d != null) {
                $(".topic-box[id=" + d.id + "]").children(".topic-insert.after").remove()
            }
            if (f != null) {
                $(".topic-box[id=" + f.id + "]").children(".topic-insert.before").remove()
            }
        }
    },
    removeShape: function() {
        var a = document.getElementById("mind-svg-insert-temp");
        if (a != null) {
            a.remove()
        }
    },
    renderShape: function(c, f, b) {
        this.removeShape();
        var d = "http://www.w3.org/2000/svg";
        var a = document.createElementNS(d, "svg");
        document.body.appendChild(a);
        a.setAttributeNS(null, "id", "mind-svg-insert-temp");
        var e = document.createElementNS(d, "path");
        if (b == "left") {
            a.style.cssText = "z-index:2;position:fixed;width:120;height:26;stroke: rgb(80, 194, 139);left:" + (f.x - 120) + "px;top:" + f.y + "px";
            if (f.weizhi == "in") {
                e.setAttributeNS(null, "d", "M120 13 L90 13L90 4L88 2L4 2L2 4L2 22L4 24 L88 24L90 22L90 13")
            } else {
                if (f.weizhi == "before") {
                    e.setAttributeNS(null, "d", "M120 26 L90 13L90 4L88 2L4 2 L2 4L2 22L4 24L88 24L90 22L90 13")
                } else {
                    if (f.weizhi == "after") {
                        e.setAttributeNS(null, "d", "M120 0 L90 13L90 4L88 2L4 2 L2 4L2 22L4 24L88 24L90 22L90 13")
                    }
                }
            }
        } else {
            a.style.cssText = "z-index:2;position:fixed;width:120;height:26;stroke: rgb(80, 194, 139);left:" + f.x + "px;top:" + f.y + "px";
            if (f.weizhi == "in") {
                e.setAttributeNS(null, "d", "M0 13 L30 13L30 4L32 2L116 2 L118 4L118 22L116 24L32 24L30 22L30 13")
            } else {
                if (f.weizhi == "before") {
                    e.setAttributeNS(null, "d", "M0 26 L30 13L30 4L32 2L116 2 L118 4L118 22L116 24L32 24L30 22L30 13")
                } else {
                    if (f.weizhi == "after") {
                        e.setAttributeNS(null, "d", "M0 0 L30 13L30 4L32 2L116 2 L118 4L118 22L116 24L32 24L30 22L30 13")
                    }
                }
            }
        }
        e.setAttributeNS(null, "stroke", "rgb(252, 126, 0)");
        e.setAttributeNS(null, "fill-opacity", ".4");
        e.setAttributeNS(null, "stroke-linecap", "round");
        e.setAttributeNS(null, "stroke-width", 2);
        e.setAttributeNS(null, "fill", "rgb(252, 126, 0)");
        a.appendChild(e)
    },
    initEvent: function(d, g) {
        var f = this
          , h = f.virtualTopic
          , c = f.model
          , b = c.topic
          , a = f.util
          , e = f.operation.zoomVal / 100;
        f.designer.off("mousemove.dragmove1").on("mousemove.dragmove1", ".topic-insert", function(l) {
            var j = $(this)
              , k = j.parent()
              , o = k.attr("id");
            if (o == "root") {
                var i = j.width()
                  , m = j.offset();
                if (l.offsetX < i / 2) {
                    var n = {
                        x: m.left,
                        y: m.top + j.height() / 2 * e - 13,
                        weizhi: "in"
                    };
                    g.pos = "in";
                    h.renderShape(b, n, "left");
                    g.rootPos = "left"
                } else {
                    var n = {
                        x: m.left + k.outerWidth() * e,
                        y: m.top + j.height() / 2 * e - 13,
                        weizhi: "in"
                    };
                    g.pos = "in";
                    h.renderShape(b, n, "right");
                    g.rootPos = "right"
                }
            }
        });
        f.designer.off("mouseenter.dragmove").on("mouseenter.dragmove", ".topic-insert", function(l) {
            var i = $(this)
              , k = i.parent()
              , p = k.attr("id");
            if (p == d.id) {
                return
            }
            k.addClass("topic-moving-target");
            var n = c.getTopicById(p);
            var j = a.getSelectedPart(p, b.structure);
            var m = k.offset();
            var o = {
                x: j == "left" ? m.left : m.left + k.outerWidth() * e - 14,
                y: m.top - 26,
                weizhi: "before"
            };
            g.id = p;
            g.pos = "before";
            if (i.hasClass("in")) {
                o = {
                    x: j == "left" ? m.left : m.left + k.outerWidth() * e,
                    y: i.offset().top + i.height() / 2 * e - 13,
                    weizhi: "in"
                };
                g.pos = "in"
            } else {
                if (i.hasClass("after")) {
                    o = {
                        x: j == "left" ? m.left : m.left + k.outerWidth() * e - 14,
                        y: m.top + k.outerHeight() * e,
                        weizhi: "after"
                    };
                    g.pos = "after"
                }
            }
            i.addClass("selected");
            h.renderShape(n, o, j);
            l.stopPropagation()
        });
        f.designer.off("mouseleave.dragmove").on("mouseleave.dragmove", ".topic-box", function(i) {
            $(".topic-moving-target").removeClass("topic-moving-target");
            h.removeShape()
        });
        f.designer.off("mouseleave.dragmove1").on("mouseleave.dragmove1", ".topic-insert", function(i) {
            $(this).removeClass("selected")
        })
    },
    offEvent: function() {
        this.designer.off("mouseenter.dragmove");
        this.designer.off("mouseleave.dragmove")
    }
};
mindDesigner.prototype.model = {
    newId: function() {
        return (this.newIdS4() + this.newIdS4() + this.newIdS4())
    },
    newIdS4: function() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    },
    topicDef: {
        id: "root",
        root: true,
        title: "中心主题",
        children: [],
        structure: "mind_right",
        theme: "theme3"
    },
    topic: {
        id: "root1",
        root: true,
        title: "中心主题",
        leftChildren: [],
        children: [],
        structure: "mind_right",
        theme: "",
        background: "#f4f4f4"
    },
    clipboard: {
        type: "copy",
        list: []
    },
    persistenTopic: {},
    topicList: {
        parentTopics: {},
        data: {},
        build: function(b) {
            var e = this;
            e.data[b.id] = b;
            var d = b.children
              , a = d.length;
            if (a > 0) {
                for (var c = 0; c < a; c++) {
                    var f = d[c];
                    e.build(f)
                }
            }
        },
        resetTopicList: function() {
            var d = this.model
              , f = d.topicList;
            var c = d.topic;
            f.data = {};
            f.build(c);
            var b = c.leftChildren || []
              , a = b.length;
            for (var e = 0; e < a; e++) {
                var g = b[e];
                f.build(g)
            }
        }
    },
    groupList: {
        leftList: [],
        rightList: [],
        freeList: [],
        justPos: "right",
        justTopic: null,
        doGroup: function(c, b) {
            var f = this;
            f.clearData();
            f.leftList = [];
            f.rightList = [];
            var e = c.children
              , a = e.length;
            for (var d = 0; d < a; d++) {
                var g = e[d];
                f.setList(g, b)
            }
        },
        clearData: function() {
            this.leftList = [];
            this.rightList = [];
            this.freeList = [];
            this.justTopic = null;
            this.justPos = "right"
        },
        setList: function(d, a, c, b) {
            var e = this;
            if (d.free || d.summary) {
                e.freeList.push(d);
                e.justPos = "";
                return
            }
            if (c != null) {
                if (c == "right") {
                    if (b != null) {
                        e.rightList.splice(b, 0, d)
                    } else {
                        e.rightList.push(d)
                    }
                    e.justPos = "right"
                }
                return
            }
            if (a == "mind_right" || a == "mind_free" || a == "mind" || a == "mind_org" || a == "mind_tree") {
                e.rightList.push(d);
                e.justPos = "right"
            }
            return e.justPos
        }
    },
    getTopicById: function(a) {
        return this.topicList.data[a]
    },
    getSubTopic: function(b) {
        var d, c = this;
        if (b.root || b.pos != null) {
            return b
        }
        a(b);
        function a(e) {
            var f = c.getTopicById(e.parent);
            if (f.root) {
                d = e;
                return
            } else {
                a(f)
            }
        }
        return d
    },
    getTopicByIndex: function(b, d) {
        var e = [];
        for (var c = 0, a = d.length; c < a; c++) {
            var f = d[c];
            if (f.free || f.summary) {
                continue
            }
            e.push(f)
        }
        return e[b]
    },
    getTopicIndex: function(d, g, c) {
        if (d.root) {
            return null
        }
        var f = g.children;
        if (g.root && c == "left") {
            f = g.leftChildren
        }
        var a = f.length
          , b = -1;
        for (var e = 0; e < a; e++) {
            var h = f[e];
            if (h.id == d.id) {
                b = e;
                break
            }
        }
        return b
    },
    getNewTopicIndex: function(c, e, d, b) {
        var a = 0
          , h = this.groupList
          , g = h.rightList
          , f = h.leftList;
        if (c.root && b == "right") {
            return g.length
        } else {
            if (c.root && b == "left") {
                if (c.leftChildren == null) {
                    c.leftChildren = []
                }
                return c.leftChildren.length
            }
        }
        if (d) {
            a = c.children.length
        } else {
            a = this.getTopicIndex(c, e, b) + 1
        }
        return a
    },
    getTopicDomById: function(b) {
        var a = $(".topic-box[id=" + b + "]");
        return a.parent()
    },
    getTopicDomProp: function(b) {
        var a = $(".topic-container[id=" + b + "]");
        return {
            h: a.outerHeight(),
            w: a.outerWidth(),
            x: a.position().left,
            y: a.position().top
        }
    },
    getNearTopic: function(o, n) {
        var m = this
          , h = m.model
          , p = h.topic
          , r = p.structure == "mind_org"
          , j = m.util;
        var e = j.getSelectedId();
        if (e == "") {
            return null
        }
        var g = h.getTopicById(e)
          , d = j.getSelectedPart(e, p.structure);
        if (o == "left") {
            if (r) {
                var q = h.getParentTopic(g.parent)
                  , c = q.children;
                if (c.length > 1) {
                    var l = 0;
                    for (var f = 0, k = c.length; f < k; f++) {
                        var b = c[f];
                        if (b.id == g.id) {
                            l = f - 1;
                            break
                        }
                    }
                    if (l < 0) {
                        return q
                    } else {
                        return c[l]
                    }
                }
            }
            if (g.root) {
                return g.leftChildren[0]
            } else {
                if (d == "left") {
                    if (!g.collapsed) {
                        return g.children[0]
                    } else {
                        return g
                    }
                } else {
                    return h.getParentTopic(g.parent)
                }
            }
        } else {
            if (o == "right") {
                if (r) {
                    var q = h.getParentTopic(g.parent)
                      , c = q.children;
                    if (c.length > 1) {
                        var l = 0;
                        for (var f = 0, k = c.length; f < k; f++) {
                            var b = c[f];
                            if (b.id == g.id) {
                                l = f + 1;
                                break
                            }
                        }
                        if (l > c.length - 1) {
                            if (g.children.length > 0) {
                                return g.children[g.children.length - 1]
                            } else {
                                var a = h.getSubTopic(g);
                                return h.getNextTopic(a, d)
                            }
                        } else {
                            return c[l]
                        }
                    }
                }
                if (d == "left") {
                    return h.getParentTopic(g.parent)
                } else {
                    if (!g.collapsed) {
                        return g.children[0]
                    } else {
                        return g
                    }
                }
            } else {
                if (o == "up") {
                    if (g.root) {
                        return g.children[0]
                    }
                    var q = h.getParentTopic(g.parent)
                      , c = q.children;
                    if (q.root && d == "left") {
                        c = q.leftChildren
                    }
                    if (c.length > 1) {
                        var l = 0;
                        for (var f = 0, k = c.length; f < k; f++) {
                            var b = c[f];
                            if (b.id == g.id) {
                                l = f - 1;
                                break
                            }
                        }
                        if (l < 0) {
                            return q
                        } else {
                            return c[l]
                        }
                    } else {
                        return q
                    }
                } else {
                    if (o == "down") {
                        if (g.root) {
                            var c = g.children
                              , k = c.length;
                            return c[k - 1]
                        }
                        var q = h.getParentTopic(g.parent)
                          , c = q.children;
                        if (r) {
                            return g.children[0]
                        }
                        if (q.root && d == "left") {
                            c = q.leftChildren
                        }
                        if (c.length > 1) {
                            var l = 0;
                            for (var f = 0, k = c.length; f < k; f++) {
                                var b = c[f];
                                if (b.id == g.id) {
                                    l = f + 1;
                                    break
                                }
                            }
                            if (l > c.length - 1 && !g.collapsed) {
                                if (g.children.length > 0) {
                                    return g.children[g.children.length - 1]
                                } else {
                                    var a = h.getSubTopic(g);
                                    return h.getNextTopic(a, d)
                                }
                            } else {
                                return c[l]
                            }
                        } else {
                            return g
                        }
                    }
                }
            }
        }
    },
    getPrevTopicWithoutFree: function(f, d) {
        var g = 0
          , a = [];
        var j = this.getParentTopic(f.parent);
        var c = j.children;
        if (j.root && d == "left") {
            c = j.leftChildren
        }
        var h = c.length;
        for (var e = 0; e < h; e++) {
            var b = c[e];
            if (b.free || b.summary) {
                continue
            }
            a.push(b);
            if (b.id == f.id) {
                break
            }
            g++
        }
        return a[g - 1]
    },
    getPrevTopic: function(f, c) {
        var g = 0
          , j = this.getParentTopic(f.parent);
        var b = j.children;
        if (j.root && c == "left") {
            b = j.leftChildren
        }
        var h = b.length;
        for (var d = 0; d < h; d++) {
            var a = b[d];
            if (a.free || a.summary) {
                continue
            }
            if (a.id == f.id) {
                g = d - 1;
                break
            }
        }
        if (g < 0) {
            var e = this.getNextTopic(f, c);
            return e
        } else {
            return b[g]
        }
    },
    getNextTopic: function(d, c) {
        var b = 0;
        var g = this.getParentTopic(d.parent)
          , f = g.children;
        if (g.root && c == "left") {
            f = g.leftChildren
        }
        var a = f.length;
        for (var e = 0; e < a; e++) {
            var h = f[e];
            if (h.id == d.id) {
                b = e + 1;
                break
            }
        }
        if (b > a) {
            return null
        } else {
            return f[b]
        }
    },
    getPreTopic: function(c) {
        if (c.root) {
            if (c.children.length > 0) {
                return c.children[0]
            }
            return c
        }
        var b = 0;
        var f = this.getParentTopic(c.parent)
          , e = f.children
          , a = e.length;
        for (var d = 0; d < a; d++) {
            var g = e[d];
            if (g.id == c.id) {
                b = d - 1;
                break
            }
        }
        if (b < 0) {
            if (e.length > 1) {
                return e[1]
            } else {
                return f
            }
        } else {
            return e[b]
        }
    },
    getFirstTopic: function(b) {
        var a;
        c(b);
        function c(d) {
            var e = d.children;
            a = e[0];
            if (a.children.length > 0) {
                c(a)
            }
        }
        return a
    },
    getLastTopic: function(a) {
        var c;
        b(a);
        function b(d) {
            var e = d.children;
            if (e.length == 0) {
                c = d
            } else {
                c = e[e.length - 1]
            }
            if (c.children.length > 0) {
                b(c)
            }
        }
        return c
    },
    getLastTopicTop: function(a) {
        var c = this.model.getLastTopic(a);
        var b = this.model.getTopicDomById.call(this, c.id);
        return b.position().top + b.outerHeight()
    },
    getStyleTopics: function(b) {
        var d = []
          , c = this
          , a = c.util;
        e(b);
        function e(g) {
            if (g.style || g.lineStyle || (g.theme && g.background)) {
                d.push(a.copy(g));
                delete g.style;
                delete g.lineStyle
            }
            if (g.theme) {
                delete g.background
            }
            var j = g.children;
            if (j.length > 0) {
                for (var h = 0, f = j.length; h < f; h++) {
                    var k = j[h];
                    e(k)
                }
            }
        }
        return d
    },
    addTopicStyles: function(k, c) {
        var g = this
          , f = g.util;
        var b = {}
          , a = "";
        for (var d = 0, h = c.length; d < h; d++) {
            var e = c[d];
            b[e.id] = e;
            a += e.id + ","
        }
        j(k);
        function j(n) {
            if (a.indexOf(n.id) >= 0) {
                var m = b[n.id];
                if (m.style) {
                    n.style = m.style
                }
                if (n.theme && m.background) {
                    n.background = m.background
                }
            }
            var p = n.children;
            if (p.length > 0) {
                for (var o = 0, l = p.length; o < l; o++) {
                    var q = p[o];
                    j(q)
                }
            }
        }
        return c
    },
    getParentTopic: function(a) {
        return this.getTopicById(a)
    },
    getParentTopicById: function(b) {
        var a = this.getTopicById(b);
        return this.getTopicById(a.parent)
    },
    getParentTopicPos: function(b) {
        var a = $(this.getDesigner()).find(".topic-container[id=" + b + "]");
        return {
            x: a.position().left + a.outerWidth() / 2,
            y: a.positon().top + a.outerHeight() / 2
        }
    },
    getParentTopics: function(g, a, e) {
        var c = this.getTopicById(g)
          , d = this;
        var f = [];
        if (a) {
            f.push(c)
        }
        b(c.parent);
        function b(i) {
            if (e != null && e == i) {
                return
            }
            var h = d.getTopicById(i);
            if (h != null) {
                f.push(h);
                if (!h.root) {
                    b(h.parent)
                }
            }
        }
        return f
    },
    getChildrenIds: function(a) {
        var c = [];
        function b(h) {
            var g = h.children
              , d = g.length;
            c.push(h.id);
            if (g != null && d > 0) {
                for (var f = 0; f < d; f++) {
                    var e = g[f];
                    b(e)
                }
            }
        }
        b(a);
        return c
    },
    getChildrenIdsWithoutSelf: function(a) {
        var c = [];
        function b(h) {
            var g = h.children
              , d = g.length;
            if (g != null && d > 0) {
                for (var f = 0; f < d; f++) {
                    var e = g[f];
                    c.push(e.id);
                    b(e)
                }
            }
        }
        b(a);
        return c
    },
    getChildrenTopics: function(a) {
        var b = [];
        c(a);
        function c(e) {
            var g = e.children;
            if (g.length > 0) {
                for (var f = 0, d = g.length; f < d; f++) {
                    var h = g[f];
                    b.push(h.id);
                    c(h)
                }
            }
        }
        return b
    },
    getChildren: function(c, h) {
        var f = this
          , b = f.model;
        var e = c.children;
        if (e.length > 0) {
            for (var d = 0, a = e.length; d < a; d++) {
                var g = e[d];
                h(g);
                if (g.collapsed) {
                    continue
                }
                b.getChildren.call(f, g, h)
            }
        }
    },
    getParentTopicIds: function(e) {
        var c = this
          , b = c.getParentTopicById(e);
        var d = [];
        a(b);
        function a(g) {
            d.push(g.id);
            if (g.root) {
                return
            }
            var f = c.getTopicById(g.parent);
            if (f.root) {
                return
            } else {
                a(f)
            }
        }
        return d
    },
    checkParentIsCollapsed: function(e) {
        var c = this
          , b = c.getTopicById(e);
        if (b == null) {
            return false
        }
        b = c.getParentTopicById(e);
        var d = false;
        if (b == null) {
            return d
        }
        a(b);
        function a(g) {
            if (g.root) {
                return
            }
            if (g.collapsed) {
                d = true;
                return
            }
            var f = c.getTopicById(g.parent);
            if (f.root) {
                return
            } else {
                a(f)
            }
        }
        return d
    },
    resetTopicId: function(c, h) {
        var b = this.newId()
          , f = this;
        c.id = b;
        c.parent = $.trim(h);
        var e = c.children
          , a = e.length;
        if (a > 0) {
            for (var d = 0; d < a; d++) {
                var g = e[d];
                f.resetTopicId(g, c.id)
            }
        }
    },
    addTopicToList: function(a, b) {
        this.topicList.build(a)
    },
    changeTopicExpand: function(d, e, c, g) {
        var f = this
          , b = f.model
          , a = b.topic;
        if (g == null) {
            f.messageSource.send.call(f, "changetopicexpand", {
                content: d.id,
                type: e,
                part: c
            })
        }
    },
    addTopicMulti: function(v, g, o, x) {
        var h = this
          , c = h.model
          , s = c.topic
          , e = (s.structure == "mind_org")
          , f = s.leftChildren
          , a = h.util
          , k = h.line
          , b = ""
          , p = h.messageSource;
        var y = []
          , j = "";
        for (var u = 0, w = v.length; u < w; u++) {
            var r = v[u]
              , l = g[r.id]
              , q = o[r.id];
            var n = c.getTopicById(r.parent);
            var d = n.children;
            if (n.root && q == "left") {
                d = n.leftChildren || []
            }
            d.splice(l, 0, r);
            c.addTopicToList(r, n);
            var m = c.getSubTopic(r);
            if (m.summary) {
                q = a.getSelectedPartByPos(m.id)
            }
            j += q + ",";
            if (n.root) {
                c.groupList.setList(r, null, q, l)
            }
            var t = null;
            if (!n.root) {
                t = a.getTopicContainerProp(m.id)
            }
            if (r.children.length > 0) {
                h.renderSubTopic(r, q);
                h.renderTopicExpand(n, $("#" + n.id), q);
                h.range.changeTopicPos(h, r, m, q, t);
                k.renderNewLine(h, r, n, m.id, q);
                k.renderNewLines(h, r, m.id)
            } else {
                h.renderTopicDom(r, q, n, l);
                h.range.changeTopicPos(h, r, m, q, t);
                k.renderNewLine(h, r, n, m.id, q)
            }
            b = r.id;
            if (y.indexOf(m.id) < 0) {
                y.push(m.id)
            }
        }
        k.resetLines.call(h, y, null, j);
        if (x == null) {
            p.send.call(h, "create", {
                content: v,
                index: g,
                parts: o
            })
        }
        h.connection.resetAllConnectionPos.call(h, s);
        h.summary.rangeSummaryTopics.call(h, true)
    },
    updateFreeTopicPos: function(f, i, l, a, b) {
        var h = this
          , g = h.model
          , j = g.topic
          , e = h.util
          , c = h.connection;
        var d = e.copy(f.pos);
        f.pos = i;
        g.topicList.resetTopicList.call(h);
        var k = e.getTopicContainer(f.id);
        k.css({
            left: i.x,
            top: i.y
        });
        if (l == null) {
            l = c.getConnectionsByTopic.call(h, f.id)
        }
        if (l != null && l.length > 0) {
            c.resetAllConnectionPos.call(h, j, l, true)
        }
        h.summary.rangeSummaryTopics.call(h, true);
        if (b == null) {
            h.messageSource.send.call(h, "updateFreeTopic", {
                content: i,
                original: d,
                topicId: f.id,
                lines: l,
                oldLines: a
            })
        }
    },
    addFreeTopic: function(c, h, e, f) {
        var b = e.util
          , d = e.model
          , a = d.topic
          , g = d.groupList;
        c.free = true;
        c.pos = {
            x: h.x,
            y: h.y
        };
        a.children.push(c);
        g.doGroup(a, a.structure);
        d.topicList.resetTopicList.call(e);
        e.renderTopicDom(c);
        if (f == null) {
            e.messageSource.send.call(e, "addFreeTopic", {
                content: c
            });
            b.selectOne.call(e, c)
        }
        $.topicCount()
    },
    changeToFreeTopic: function(A, l, G) {
        var n = this
          , c = n.model
          , z = c.topic
          , C = c.groupList
          , r = n.line
          , a = n.util
          , o = n.styles;
        var I = o.marginH
          , v = o.marginW
          , H = []
          , J = a.copy(A);
        var s = a.getTopicContainer(A.id);
        var e = s.clone(false);
        var j = c.getSubTopic(A);
        var x = a.getSelectedPart(A.id, z.structure);
        var F = 0;
        var b = a.getTopicContainerProp(j.id);
        s.remove();
        r.deleteLine(A);
        if (j.id == A.id) {
            F = b.h + I;
            var q = 0;
            if (z.structure == "mind_org" || z.structure == "mind_tree") {
                q = -(b.w) - v / 2
            }
            n.range.doChangeSubTopicPos(n, j, -F / 2, q, x)
        } else {
            var u = a.getTopicContainerProp(j.id);
            F = u.h - b.h;
            var q = 0;
            if (z.structure == "mind_org" || z.structure == "mind_tree") {
                q = (u.w - b.w)
            }
            n.range.doChangeSubTopicPos(n, j, F / 2, q, x)
        }
        H.push(j.id);
        var p = c.getTopicById(A.parent)
          , g = p.children;
        if (p.root && x == "left") {
            g = p.leftChildren
        }
        var E = g.length
          , m = 0;
        for (var B = 0; B < E; B++) {
            var k = g[B];
            if (k.id == A.id) {
                m = B;
                break
            }
        }
        g.splice(m, 1);
        if (g.length == 0) {
            var D = a.getTopicDom(p.id);
            D.find(".expand_box").remove()
        }
        J.parent = z.id;
        z.children.push(J);
        J.free = true;
        J.pos = {
            x: l.x,
            y: l.y
        };
        C.doGroup(z, z.structure);
        c.topicList.resetTopicList.call(n);
        r.resetLines.call(n, H, null, x);
        n.renderSubTopic(J);
        var d = a.getTopicContainer(J.id);
        var t = d.children(".topic-box");
        var y = {}
          , f = (z.structure == "mind_org");
        if (f) {
            y = {
                x: d.outerWidth() / 2,
                y: t.outerHeight(),
                h: t.outerHeight()
            }
        } else {
            y = {
                x: t.outerWidth(),
                y: d.outerHeight() / 2 - 0.5,
                h: t.outerHeight()
            }
        }
        r.renderLines.call(n, J, y);
        if (G == null) {
            a.selectOne.call(n, J);
            n.messageSource.send.call(n, "changeToFreeTopic", {
                content: J,
                original: A.parent,
                index: m,
                part: x
            })
        }
        n.connection.resetAllConnectionPos.call(n, z);
        n.summary.rangeSummaryTopics.call(n, true)
    },
    addTopic: function(c, e, b, a) {
        this.addTopicToList(c, e);
        if (e.root) {
            this.groupList.setList(c, null, a)
        }
        var d = e.children;
        d.splice(b, 0, c)
    },
    unInsertParentTopic: function(h, l, b) {
        var k = this
          , i = k.model
          , n = i.topic
          , g = i.groupList
          , j = k.util
          , q = k.line
          , p = k.styles;
        var d = i.getTopicById(h.parent);
        var o = i.getTopicById(h.id);
        var f = j.copy(i.getTopicById(h.id));
        var e = j.copy(i.getTopicById(l.id));
        var a = e.children;
        o.id = e.id;
        o.children = [];
        o.children = a;
        if (e.icons) {
            o.icons = e.icons
        }
        if (e.task) {
            o.task = e.task
        }
        if (e.style) {
            o.style = e.style
        }
        if (e.link) {
            o.link = e.link
        }
        if (e.free) {
            o.free = e.free
        }
        if (e.summary) {
            o.summary = e.summary
        }
        if (e.pos) {
            o.pos = e.pos
        }
        if (e.image) {
            o.image = e.image
        }
        if (e.collapsed) {
            o.collapsed = e.collapsed
        }
        o.title = e.title;
        i.groupList.doGroup(n, n.structure);
        i.topicList.resetTopicList.call(k);
        $(".topic-box[id=" + f.id + "]").parent().remove();
        q.deleteLine(f);
        if (d.root) {
            k.renderTopics(o, b, d);
            k.range.resetSubTopics.call(k, b);
            q.renderNewLines(k, o, o.id);
            q.resetLines.call(k, [o.id], null, b)
        } else {
            var c = i.getSubTopic(d);
            k.renderTopics(d, b, d);
            k.range.resetSubTopics.call(k, b);
            q.renderNewLines(k, d, c.id);
            q.resetLines.call(k, [c.id], null, b)
        }
        j.selectOne.call(k, o);
        var m = j.copy(e);
        m.children = [];
        f.children = [];
        k.messageSource.send.call(k, "unInsertParent", {
            content: f,
            original: m,
            part: b
        });
        k.connection.resetAllConnectionPos.call(k, n);
        k.summary.rangeSummaryTopics.call(k, true)
    },
    insertParentTopic: function(m, j, k) {
        var f = this
          , c = f.model
          , l = c.topic
          , o = c.groupList
          , a = f.util
          , h = f.line
          , g = f.styles;
        var i = c.getTopicById(m.parent);
        var q = g.marginH;
        k = k || a.getSelectedPart(m.id, l.structure);
        var d = i.children
          , e = 0;
        if (i.root && k == "left") {
            d = i.leftChildren
        }
        if (j == null) {
            var p = c.getTopicById(m.id);
            var b = a.copy(p);
            m.id = c.newId();
            b.parent = m.id;
            m.children = [];
            m.children.push(b)
        } else {
            var p = c.getTopicById(j.id);
            var b = a.copy(p);
            p.id = m.id;
            p.title = m.title;
            b.parent = m.id;
            p.children = [];
            p.children.push(b);
            m = p
        }
        m.title = "父主题";
        delete m.pos;
        delete m.free;
        delete m.summary;
        delete m.collapsed;
        delete m.image;
        delete m.icons;
        delete m.task;
        delete m.link;
        delete m.style;
        c.groupList.doGroup(l, l.structure);
        c.topicList.resetTopicList.call(f);
        if (i.root) {
            f.renderTopics(m, k, i);
            f.range.resetSubTopics.call(f, k);
            h.renderNewLines(f, m, m.id);
            h.resetLines.call(f, [m.id], null, k)
        } else {
            f.operation.showChildren.call(f, i)
        }
        f.events.push("outline-prebuild", {
            id: i.id,
            rebuild: "current"
        });
        a.selectOne.call(f, m);
        var r = a.copy(m);
        var n = a.copy(b);
        n.children = [];
        r.children = [];
        f.messageSource.send.call(f, "insertParent", {
            content: r,
            original: n,
            part: k
        });
        f.connection.resetAllConnectionPos.call(f, l);
        f.summary.rangeSummaryTopics.call(f, true)
    },
    replaceDef: function(b, a) {
        that.messageSource.send.call(that, "replaceDef", {
            content: b,
            original: a
        })
    },
    updateTopicText: function(n, s, r) {
        var g = this
          , b = g.model
          , a = g.util
          , k = g.line
          , m = b.topic
          , o = b.groupList;
        var i = n.title;
        n.title = s;
        var e = b.getSubTopic(n);
        var l = a.getSelectedPart(n.id, m.structure);
        var c = a.getTopicContainerProp(e.id);
        var q = a.getTopicDom(n.id)
          , d = q.find(".topic");
        d.html(s).show();
        var f = a.getTopicContainerProp(e.id);
        var p = (f.h - c.h) / 2;
        var j = f.w - c.w;
        g.range.doChangeSubTopicPos(g, e, p, j, l, true);
        g.resetTopicExpandPos(q, m.structure);
        if (r == null) {
            g.messageSource.send.call(g, "updateTitle", {
                content: n.id,
                original: i,
                update: s,
                part: l
            })
        }
        g.connection.resetAllConnectionPos.call(g, m);
        g.summary.rangeSummaryTopics.call(g, true);
        if (n.root) {
            l = "left,right,";
            k.resetSubLines.call(g, l);
            g.events.push("savetitle", d.text())
        } else {
            if (e.summary && e.part == "left") {
                l = "left"
            }
            k.resetLines.call(g, [e.id], p, l)
        }
        a.resetSelectDom()
    },
    updateTopicImage: function(q, b, x, w) {
        var s = 900
          , d = 0;
        var i = this
          , e = i.model
          , a = i.util
          , k = i.line
          , p = e.topic
          , r = e.groupList
          , n = i.messageSource;
        var t = a.getTopicDom(q.id);
        var g = e.getSubTopic(q);
        var o = a.getSelectedPart(g.id, p.structure);
        var f = a.getTopicContainerProp(g.id);
        var l = q.image
          , m = $("#topic_img_" + q.id)
          , v = m.parent();
        var j = false;
        if (x) {
            if (l.w != b.image.w || l.h != b.image.h) {
                h()
            }
            j = true;
            u();
            return
        }
        if (l == null) {
            if (m.length > 0) {
                var c = e.getTopicById(q.id);
                delete c.image;
                v.remove();
                u()
            }
        } else {
            if (m.length == 0) {
                v = i.operation.renderTopicImage(q);
                v.hide()
            } else {
                m.removeAttr("style");
                m.attr("src", l.url)
            }
            h();
            v.fadeIn();
            u()
        }
        i.events.push("hideuploading");
        function h() {
            if (l.w <= s) {
                s = l.w;
                d = l.h
            } else {
                d = s * l.h / l.w
            }
            v.css({
                width: s,
                height: d
            });
            m.css({
                width: s,
                height: d
            })
        }
        function u() {
            var B = a.getTopicContainerProp(g.id);
            var A = (B.h - f.h) / 2;
            var y = B.w - f.w;
            i.range.doChangeSubTopicPos(i, g, A, y, o, true);
            i.resetTopicExpandPos(t, p.structure);
            if (q.root) {
                o = "left,right,";
                k.resetSubLines.call(i, o)
            } else {
                k.resetLines.call(i, [g.id], null, o)
            }
            var D = e.getTopicById(q.id);
            D = $.extend(true, D, q);
            var C = a.copy(q).image;
            var z = a.copy(b).image;
            if (w == null) {
                n.send.call(i, "updateImage", {
                    content: q.id,
                    update: C,
                    original: z,
                    resize: j,
                    part: o
                })
            }
            i.connection.resetAllConnectionPos.call(i, p);
            i.summary.rangeSummaryTopics.call(i, true);
            a.resetSelectDom()
        }
    },
    updateTopicNode: function(o, b, d, s, t) {
        var j = this
          , e = j.model
          , n = e.topic
          , u = j.operation
          , a = j.util
          , l = j.line
          , p = e.groupList;
        o = a.copy(o);
        b = a.copy(b);
        var g = e.getSubTopic(o);
        var m = a.getSelectedPart(g.id, n.structure);
        var f = a.getTopicContainerProp(g.id);
        var c = e.getTopicById(o.id);
        if (d == "note") {
            j.remark.renderTopicNote(a, o, m);
            c.note = o.note
        } else {
            if (d == "tag") {
                j.tags.renderTopicTag(a, o, m);
                c.tags = o.tags
            } else {
                if (d == "link") {
                    u.renderTopicLink(a, o, m);
                    c.link = o.link
                } else {
                    if (d == "icon") {
                        j.icons.renderTopicIcons(a, o, m);
                        c.icons = o.icons
                    } else {
                        if (d == "style") {
                            j.style.setTopicStyle(j, o, m);
                            c.style = o.style
                        } else {
                            if (d == "line") {
                                j.style.setTopicLineStyle(j, o, m);
                                c.lineStyle = o.lineStyle;
                                if (o.lineStype != null) {
                                    delete o.lineStyle.lineType;
                                    delete o.lineStyle.underLine
                                }
                                if (c.lineStyle != null) {
                                    delete c.lineStyle.lineType;
                                    delete c.lineStyle.underLine
                                }
                            } else {
                                if (d == "task") {
                                    j.task.renderTopicTask(a, o, m);
                                    c.task = o.task
                                }
                            }
                        }
                    }
                }
            }
        }
        var r = a.getTopicDom(o.id);
        var i = a.getTopicContainerProp(g.id);
        var q = (i.h - f.h) / 2;
        var k = i.w - f.w;
        j.range.doChangeSubTopicPos(j, g, q, k, m, true);
        j.resetTopicExpandPos(r, n.structure);
        if (o.root) {
            m = "left,right,";
            l.resetSubLines.call(j, m)
        } else {
            l.resetLines.call(j, [g.id], q, m)
        }
        j.connection.resetAllConnectionPos.call(j, n);
        if (s) {
            e.topicList.resetTopicList.call(j)
        }
        a.resetSelectDom();
        o.children = [];
        b.children = [];
        if (t == null) {
            j.messageSource.send.call(j, "update", {
                content: o,
                original: b,
                type: d,
                part: m
            })
        }
    },
    _updateTopicPos: function(K, F, t, B, M, a, S) {
        var G = this
          , d = G.model
          , A = d.topic
          , r = d.groupList
          , n = G.util
          , o = G.line
          , D = G.styles;
        var v = D.marginH
          , l = D.marginW;
        var s = []
          , Q = "";
        for (var O = 0, y = t.length; O < y; O++) {
            var C = t[O];
            var q = d.getParentTopic(C.parent);
            var u = M[C.id];
            var g = a[C.id];
            var m = d.getSubTopic(C);
            var P = 0;
            var z = n.getTopicContainerProp(m.id);
            $(".topic-box[id=" + C.id + "]").parent().remove();
            o.deleteLine(C);
            if (m.id == C.id) {
                P = z.h + v;
                var I = 0;
                if (A.structure == "mind_org" || A.structure == "mind_tree") {
                    I = -(z.w) - l / 2
                }
                G.range.doChangeSubTopicPos(G, m, -P / 2, I, u)
            } else {
                var c = n.getTopicContainerProp(m.id);
                P = c.h - z.h;
                var I = 0;
                if (A.structure == "mind_org" || A.structure == "mind_tree") {
                    I = (c.w - z.w)
                }
                G.range.doChangeSubTopicPos(G, m, P / 2, I, u)
            }
            if (q.children.length == 1) {
                var b = n.getTopicDom(q.id);
                b.find(".expand_box").remove();
                b.parent().find(".topic-children").remove()
            }
            var x = q.children;
            if (q.root && u == "left") {
                x = q.leftChildren
            }
            var J = x.length;
            for (var N = 0; N < J; N++) {
                var k = x[N];
                if (k.id == C.id) {
                    x.splice(N, 1);
                    break
                }
            }
            s.push(m.id);
            var L = K[O];
            var R = F[L.id];
            var p = d.getTopicById(L.parent);
            if (p.root && g == "left") {
                p.leftChildren.splice(R, 0, L)
            } else {
                p.children.splice(R, 0, L)
            }
            Q += u + ","
        }
        d.groupList.doGroup(A, A.structure);
        d.topicList.resetTopicList.call(G);
        for (var O = 0, y = K.length; O < y; O++) {
            var C = K[O];
            var E = F[C.id];
            var H = d.getSubTopic(C);
            var u = a[C.id];
            var e = null;
            if (!p.root) {
                e = n.getTopicContainerProp(H.id)
            }
            if (C.children.length > 0) {
                G.renderTopics(C, u, p, E);
                if (C.free != true) {
                    G.range.changeTopicPos(G, C, H, u, e);
                    o.renderNewLine(G, C, p, H.id, u)
                }
                o.renderNewLines(G, C, H.id)
            } else {
                G.renderTopicDom(C, u, p, E);
                if (C.free != true) {
                    G.range.changeTopicPos(G, C, H, u, e);
                    o.renderNewLine(G, C, p, H.id, u)
                }
            }
            if (s.indexOf(H.id) < 0 && H.id != A.id) {
                s.push(H.id)
            }
            Q += u + ","
        }
        o.resetLines.call(G, s, null, Q);
        G.connection.resetAllConnectionPos.call(G, A);
        var f = n.getSelectedPartByPos(K[0].id);
        G.summary.showRelatedSummarys.call(G, K, f, true);
        G.summary.rangeSummaryTopics.call(G, true);
        if (S == null) {
            G.messageSource.send.call(G, "updatePos", {
                content: K,
                original: t,
                newIndex: F,
                oldIndex: B,
                oldPart: M,
                newPart: a
            })
        }
    },
    updateTopicPos: function(T, a, t, G) {
        var P = this
          , f = P.model
          , H = f.topic
          , v = f.groupList
          , q = P.util
          , r = P.line
          , L = P.styles;
        var A = L.marginH
          , o = L.marginW;
        var x = []
          , B = []
          , y = []
          , N = {}
          , I = {}
          , Y = ""
          , U = {}
          , b = {};
        var k = f.getTopicById(a.id), C, m = G || q.getSelectedPart(k.id, H.structure);
        if (k.collapsed && a.pos == "in") {
            return
        }
        for (var W = 0, E = T.length; W < E; W++) {
            var J = T[W], u;
            if (t) {
                u = H
            } else {
                u = f.getParentTopic(J.parent)
            }
            var O = q.copy(J);
            var K = q.copy(f.getTopicById(J.id));
            var z = q.getSelectedPart(J.id, H.structure);
            var D = u.children;
            if (u.root && z == "left") {
                D = u.leftChildren
            }
            if (t != true) {
                var p = f.getSubTopic(K);
                var X = 0;
                var F = q.getTopicContainerProp(p.id);
                $(".topic-box[id=" + K.id + "]").parent().remove();
                r.deleteLine(K);
                if (p.id == K.id) {
                    X = F.h + A;
                    var S = 0;
                    if (H.structure == "mind_org" || H.structure == "mind_tree") {
                        S = -(F.w) - o / 2
                    }
                    P.range.doChangeSubTopicPos(P, p, -X / 2, S, z)
                } else {
                    var e = q.getTopicContainerProp(p.id);
                    X = e.h - F.h;
                    var S = 0;
                    if (H.structure == "mind_org" || H.structure == "mind_tree") {
                        S = (e.w - F.w)
                    }
                    P.range.doChangeSubTopicPos(P, p, X / 2, S, z)
                }
                x.push(p.id)
            } else {
                delete O.free;
                delete O.pos
            }
            if (u.children.length == 1) {
                var d = q.getTopicDom(u.id);
                d.find(".expand_box").remove();
                d.parent().find(".topic-children").remove()
            }
            var R = D.length;
            for (var V = 0; V < R; V++) {
                var n = D[V];
                if (n.id == K.id) {
                    I[K.id] = V;
                    D.splice(V, 1);
                    break
                }
            }
            var Z = 0;
            if (k.root) {
                C = k
            } else {
                C = f.getParentTopicById(k.id)
            }
            var c = [];
            if (a.pos == "in") {
                if (C.root && m == "left") {
                    c = C.leftChildren
                } else {
                    if (a.rootPos != null) {
                        if (a.rootPos == "left" && (H.structure != "mind_org" && H.structure != "mind_tree")) {
                            c = C.leftChildren;
                            a.index = c.length;
                            m = "left"
                        } else {
                            if (a.rootPos == "left" && (H.structure == "mind_org" || H.structure == "mind_tree")) {
                                c = k.children;
                                a.index = 0
                            } else {
                                c = k.children
                            }
                        }
                    } else {
                        c = k.children
                    }
                }
                O.parent = k.id;
                if (a.index != null) {
                    Z = a.index;
                    c.splice(Z, 0, O)
                } else {
                    k.children.push(O);
                    Z = k.children.length - 1
                }
            } else {
                if (a.pos == "before" || a.pos == "after") {
                    if (C.root && m == "left") {
                        c = C.leftChildren
                    } else {
                        c = C.children
                    }
                    var R = c.length;
                    O.parent = C.id;
                    for (var W = 0; W < R; W++) {
                        var n = c[W];
                        if (n.id == k.id) {
                            Z = W;
                            break
                        }
                    }
                    if (a.pos == "after") {
                        Z += 1
                    }
                    c.splice(Z, 0, O)
                }
            }
            B.push(O);
            y.push(K);
            N[O.id] = Z;
            Y += z + ",";
            U[O.id] = z
        }
        f.groupList.doGroup(H, H.structure);
        f.topicList.resetTopicList.call(P);
        for (var W = 0, E = B.length; W < E; W++) {
            var O = B[W];
            var M = N[O.id];
            var s = f.getTopicById(O.parent);
            var Q = f.getSubTopic(O);
            var g = null;
            if (!s.root) {
                g = q.getTopicContainerProp(Q.id)
            }
            if (O.children.length > 0) {
                P.renderTopics(O, m, s, M);
                P.range.changeTopicPos(P, O, Q, m, g);
                r.renderNewLine(P, O, s, Q.id, m);
                r.renderNewLines(P, O, Q.id)
            } else {
                P.renderTopicDom(O, m, s, M);
                P.range.changeTopicPos(P, O, Q, m, g);
                r.renderNewLine(P, O, s, Q.id, m)
            }
            if (x.indexOf(Q.id) < 0 && Q.id != H.id) {
                x.push(Q.id)
            }
            Y += m + ",";
            b[O.id] = m
        }
        P.messageSource.send.call(P, "updatePos", {
            content: B,
            original: y,
            newIndex: N,
            oldIndex: I,
            newPart: b,
            oldPart: U
        });
        r.resetLines.call(P, x, null, Y);
        P.connection.resetAllConnectionPos.call(P, H);
        var m = q.getSelectedPartByPos(B[0].id);
        P.summary.showRelatedSummarys.call(P, B, m, true);
        P.summary.rangeSummaryTopics.call(P, true);
        if (a.pos == "in" || a.id == "root") {
            var l = a.id
        } else {
            var l = C.id
        }
        P.events.push("outline-posupdate", {
            id: T[0].parent,
            target: l
        })
    },
    removeTopic: function(B, F) {
        var g = this
          , c = g.model
          , x = c.topic
          , z = c.groupList
          , a = g.util
          , o = g.line
          , l = g.styles;
        var H = l.marginH
          , q = l.marginW;
        var G = []
          , v = {}
          , s = {}
          , k = "";
        g.connection.deleteConnectionByTopics.call(g, B);
        for (var A = 0, E = B.length; A < E; A++) {
            var u = B[A];
            if (u == null || u.root) {
                continue
            }
            var m = c.getParentTopic(u.parent);
            if (m == null && u.pos == null) {
                continue
            }
            if (m.children.length == 1) {
                var D = a.getTopicDom(m.id);
                D.find(".expand_box").remove()
            }
            var e = c.getSubTopic(u);
            var t = a.getSelectedPart(u.id, x.structure);
            var C = 0;
            var b = a.getTopicContainerProp(e.id);
            $(".topic-box[id=" + u.id + "]").parent().remove();
            o.deleteLine(u);
            if (!u.free && !u.summary && b != null) {
                if (e.id == u.id) {
                    C = b.h + H;
                    var n = 0;
                    if (x.structure == "mind_org" || x.structure == "mind_tree") {
                        n = -(b.w) - q / 2
                    }
                    g.range.doChangeSubTopicPos(g, e, -C / 2, n, t)
                } else {
                    var p = a.getTopicContainerProp(e.id);
                    C = p.h - b.h;
                    var n = 0;
                    if (x.structure == "mind_org" || x.structure == "mind_tree") {
                        n = (p.w - b.w)
                    }
                    g.range.doChangeSubTopicPos(g, e, C / 2, n, t)
                }
                if (G.indexOf(e.id) < 0) {
                    G.push(e.id)
                }
            }
            if (A == E - 1 && !u.free && !u.summary && F == null) {
                var r = c.getPrevTopic(u, t);
                if (r != null) {
                    a.selectOne.call(g, r)
                } else {
                    a.selectOne.call(g, m)
                }
            }
            var d = m.children;
            if (m.root && t == "left") {
                d = m.leftChildren
            }
            var E = d.length;
            for (var y = 0; y < E; y++) {
                var f = d[y];
                if (f.id == u.id) {
                    v[u.id] = y;
                    d.splice(y, 1);
                    break
                }
            }
            s[u.id] = t;
            k += t + ","
        }
        g.model.topicList.resetTopicList.call(g);
        c.groupList.doGroup(x, x.structure);
        o.resetLines.call(g, G, null, k);
        if (F == null) {
            g.messageSource.send.call(g, "delete", {
                content: B,
                index: v,
                parts: s
            })
        }
        g.connection.resetAllConnectionPos.call(g, x);
        g.summary.rangeSummaryTopics.call(g, true)
    },
    doCopy: function(a) {
        var h = this
          , g = h.util
          , f = h.model
          , k = f.topic
          , d = f.clipboard;
        var j = g.getAvailableSelectedIds(h, k, a);
        d.list = [];
        d.type = "copy";
        for (var e = 0; e < j.length; e++) {
            var c = j[e];
            if (c == k.id) {
                continue
            }
            var l = f.getTopicById(c);
            var b = $.extend(true, {}, l);
            d.list.push(b)
        }
        $(".topic-box.cut_related").removeClass("cut_related");
        if (d.list.length > 0) {
            window.localStorage.setItem("clipboard_mind", JSON.stringify(d))
        }
    },
    doCut: function(a) {
        var j = this
          , h = j.util
          , g = j.model
          , l = g.topic
          , e = g.clipboard;
        var k = h.getAvailableSelectedIds(j, l, a);
        e.list = [];
        e.type = "cut";
        for (var f = 0; f < k.length; f++) {
            var d = k[f];
            if (d == l.id) {
                continue
            }
            var m = g.getTopicById(d);
            var c = $.extend(true, {}, m);
            e.list.push(c);
            var b = h.getTopicDom(d);
            b.parent().find(".topic-box").addClass("cut_related")
        }
    },
    doPaste: function(j) {
        var h = this
          , d = h.model
          , m = d.topic
          , s = d.clipboard
          , c = s.type
          , t = s.list
          , a = h.util;
        var n = d.getTopicById(j);
        if (n.collapsed) {
            return
        }
        if (c == "cut") {
            d.removeTopic.call(h, t)
        } else {
            var r = window.localStorage.getItem("clipboard_mind");
            if (r != null) {
                var g = JSON.parse(r).list;
                if (g.length > 0) {
                    t = g
                }
            }
        }
        var l = a.getSelectedPart(n.id, m.structure);
        var f = {}
          , k = {};
        var p = [];
        for (var o = 0, q = t.length; o < q; o++) {
            var b = t[o];
            var e = $.extend(true, {}, b);
            d.resetTopicId(e, j);
            if (e.free) {
                delete e.free;
                delete e.pos
            }
            p.push(e);
            f[e.id] = n.children.length;
            k[e.id] = l
        }
        d.addTopicMulti.call(h, p, f, k);
        $.topicCount()
    }
};
mindDesigner.prototype.util = {
    selectedIds: [],
    select: function(a) {
        a.addClass("selected");
        this.selectedIds.push(a.attr("id"))
    },
    copy: function(a) {
        return $.extend(true, {}, a)
    },
    copyArray: function(a) {
        return $.extend(true, [], a)
    },
    selectOne: function(a) {
        var c = a.id;
        var b = this.util.getTopicDom(c);
        $(".topic-box.selected").removeClass("selected");
        $(".topic-selected").remove();
        this.util.renderSelectDom(b);
        b.addClass("selected");
        this.util.setSelectedId(c, "clear");
        this.operation.editTopicDomInit.call(this, c);
        if (a.root && a.structure != "mind_org") {
            if (a.children.length > 0 && (a.leftChildren == null || a.leftChildren.length < a.children.length)) {}
        }
        this.events.push("changeOpStatus", this);
        this.events.push("outline-select", c)
    },
    renderSelectDom: function(b) {
        var a = b.find(".topic-selected");
        if (a.length == 0) {
            a = $('<div class="topic-selected"></div>').appendTo(b)
        }
        this.resetSelectDom()
    },
    resetSelectDom: function() {
        var a = $(".topic-selected");
        if (a.length == 0) {
            return
        }
        var b = a.parent();
        var c = b.css("border-width").replace("px", "");
        a.css({
            width: b.outerWidth() + 3,
            height: b.outerHeight() + 3
        })
    },
    selectById: function(b) {
        var a = this.model.getTopicById(b);
        this.util.selectOne.call(this, a);
        this.events.push("setDock", a)
    },
    unselect: function(a) {
        a.removeClass("selected");
        var b = a.attr("id");
        this.selectedIds.splice(this.selectedIds.indexOf(b), 1)
    },
    clearSelect: function() {
        $(".topic-menu").remove();
        $("#textarea_topic_temp").remove();
        $(".topic-box.selected").removeClass("selected");
        $(".topic-selected").remove();
        this.selectedIds = []
    },
    getSelectedId: function() {
        return this.selectedIds.length == 0 ? "" : this.selectedIds[this.selectedIds.length - 1]
    },
    setSelectedId: function(b, a) {
        if (a == "clear") {
            this.selectedIds = []
        }
        this.selectedIds.push(b)
    },
    selectText: function(b) {
        var d = document;
        if (d.body.createTextRange) {
            var a = document.body.createTextRange();
            a.moveToElementText(b);
            a.select()
        } else {
            if (window.getSelection) {
                var c = window.getSelection();
                var a = document.createRange();
                a.selectNodeContents(b);
                c.removeAllRanges();
                c.addRange(a)
            }
        }
    },
    unSelectText: function(a) {
        var b = window.getSelection();
        b.removeAllRanges()
    },
    parentsIsSelected: function(h) {
        var g = this
          , e = g.model
          , d = g.util.selectedIds;
        var b = false;
        var c = e.getParentTopicIds(h);
        for (var f = 0, a = c.length; f < a; f++) {
            var h = c[f];
            if (d.indexOf(h) >= 0) {
                b = true;
                break
            }
        }
        return b
    },
    getAvailableSelectedIds: function(f, j, a) {
        var h = []
          , d = this;
        for (var e = 0, g = a.length; e < g; e++) {
            var b = a[e];
            if (b == j.id) {
                continue
            }
            var c = d.parentsIsSelected.call(f, b);
            if (c) {
                continue
            }
            h.push(b)
        }
        return h
    },
    getTopicContainer: function(a) {
        return $("#" + a).parent()
    },
    getTopicContainerProp: function(d, a) {
        var b = $("#" + d).parent()
          , c = b.position();
        if (b.length == 0) {
            return null
        }
        return {
            h: b.outerHeight(),
            w: b.outerWidth(),
            x: c.left / (a || 1),
            y: c.top / (a || 1)
        }
    },
    getSelectedPartByPos: function(c) {
        var b = this.getTopicDom(c);
        var a = $("#root");
        if (b.offset().left < a.offset().left) {
            return "left"
        } else {
            return "right"
        }
    },
    getSelectedPart: function(d, a) {
        if (a != null && (a == "mind_org" || a == "mind_tree")) {
            return "right"
        }
        var c = this.getTopicDom(d);
        if (c.hasClass("free")) {
            return "right"
        }
        if (c.parents(".topic-container").find(".free").length > 0) {
            return "right"
        }
        var b = $("#root");
        if (c.offset().left < b.offset().left) {
            return "left"
        } else {
            return "right"
        }
    },
    getTopicDom: function(a) {
        return $("#" + a)
    },
    getTopicDomProp: function(e, b) {
        var c = $("#" + e);
        var a = c.parent();
        var d = a.position();
        return {
            h: a.outerHeight(),
            w: a.outerWidth(),
            x: d.left / b,
            y: d.top / b,
            dom: a
        }
    },
    getSubTopicDomProp: function(f, a, c) {
        var d = $("#" + f);
        var b = d.parent();
        var e = b.position();
        if (a == "mind_org") {
            return {
                x: e.left / c + b.outerWidth() / 2,
                y: e.top / c,
                w: d.outerWidth(),
                h: d.outerHeight()
            }
        } else {
            if (a == "mind_tree") {
                return {
                    x: e.left / c + d.outerWidth() / 2,
                    y: e.top / c,
                    w: d.outerWidth(),
                    h: d.outerHeight()
                }
            }
        }
        return {
            h: b.outerHeight(),
            w: b.outerWidth(),
            x: e.left / c,
            y: e.top / c + b.outerHeight() / 2
        }
    },
    getTopicsByRange: function(m, a) {
        var j = $(".topic-box")
          , t = []
          , o = m.x + m.w
          , b = m.y + m.h
          , p = Math.max
          , n = Math.min;
        for (var q = 0, r = j.length; q < r; q++) {
            var k = $(j[q])
              , g = k.offset()
              , l = k.width()
              , s = k.height();
            var f = p(g.left / a, m.x)
              , d = p(g.top / a, m.y)
              , e = n((g.left + l) / a, o)
              , c = n((g.top + s) / a, b);
            if (f < e && d < c) {
                t.push(k.attr("id"))
            }
        }
        return t
    },
    getTopicLinePos: function(a, f) {
        var g = this
          , i = g.model.topic;
        var e = $(".topic-box[id=" + i.id + "]")
          , h = e.position()
          , c = e.offset();
        var d = h.left - c.left;
        var b = h.top - c.top
    },
    getTopicRealPos: function(o, r) {
        var i = this
          , d = i.model
          , l = i.container
          , k = i.operation
          , a = k.zoomVal / 100
          , b = i.util;
        var q = $("#" + o)
          , h = q.position()
          , f = h.left
          , n = h.top;
        if (q.attr("sub")) {
            var j = q.parent()
              , e = j.position()
              , m = e.left
              , p = e.top;
            if (r == "mind_org") {
                return {
                    x: m + q.outerWidth() / 2,
                    y: (p + n) / a,
                    w: q.outerWidth(),
                    h: q.outerHeight()
                }
            }
            return {
                x: (m + f) / a,
                y: (p + n) / a + q.outerHeight() / 2,
                w: q.outerWidth(),
                h: q.outerHeight()
            }
        } else {
            var c = d.getTopicById(o);
            var g = d.getSubTopic(c);
            var j = $("#" + g.id).parent()
              , e = j.position()
              , m = e.left
              , p = e.top;
            if (r == "mind_org") {
                return {
                    x: (f + m) / a + q.outerWidth() / 2,
                    y: (n + p) / a,
                    w: q.outerWidth(),
                    h: q.outerHeight()
                }
            }
            return {
                x: (f + m) / a,
                y: (p + n) / a + q.outerHeight() / 2,
                w: q.outerWidth(),
                h: q.outerHeight()
            }
        }
    },
    getRealPos: function(h, g) {
        var f = this
          , a = f.container
          , d = f.operation
          , i = d.zoomVal / 100;
        var b = a.scrollLeft();
        var c = a.scrollTop();
        if (i == 1) {
            return {
                x: b + h,
                y: c + g
            }
        }
        var e = f.designer.offset();
        return {
            x: Math.abs(e.left) / i + h / i,
            y: Math.abs(e.top) / i + g / i
        }
    },
    getChildTopicRelativePos: function(f, a) {
        var d = $(".topic-box[id=" + f + "]")
          , e = d.position()
          , c = e.left
          , b = e.top;
        return {
            x: c / a,
            y: b / a + (d.outerHeight() - 1) / 2,
            w: d.outerWidth(),
            h: d.outerHeight()
        }
    },
    getTreeChildTopicRelativePos: function(f, a) {
        var d = $(".topic-box[id=" + f + "]")
          , e = d.position()
          , c = e.left
          , b = e.top;
        return {
            x: c / a,
            y: b / a + d.outerHeight(),
            w: d.outerWidth(),
            h: d.outerHeight()
        }
    },
    getOrgChildTopicRelativePos: function(f, a) {
        var d = $(".topic-box[id=" + f + "]")
          , e = d.position()
          , c = e.left
          , b = e.top;
        return {
            x: c / a + d.outerWidth() / 2,
            y: b / a,
            w: d.outerWidth(),
            h: d.outerHeight()
        }
    },
    getSubTopicRelativePos: function(d, a) {
        var c = $(".topic-box[id=" + d + "]")
          , b = c.parent().outerHeight() / 2 - 0.5;
        if (a == "mind_org") {
            return {
                x: c.parent().outerWidth() / 2 - 0.5,
                y: c.outerHeight(),
                w: c.outerWidth(),
                h: c.outerHeight()
            }
        } else {
            if (a == "mind_tree") {
                return {
                    x: 0,
                    y: c.outerHeight(),
                    w: c.outerWidth(),
                    h: c.outerHeight()
                }
            }
        }
        return {
            x: 0,
            y: b,
            w: c.outerWidth(),
            h: c.outerHeight()
        }
    },
    getAngle: function(c, b) {
        var a = Math.atan(Math.abs(b.y - c.y) / Math.abs(b.x - c.x)) / Math.PI * 180;
        if (c.x <= b.x && c.y > b.y) {
            a = 180 - a
        } else {
            if (c.x < b.x && c.y <= b.y) {
                a = 180 + a
            } else {
                if (c.x >= b.x && c.y < b.y) {
                    a = 360 - a
                }
            }
        }
        return a
    },
    getArrowPoints: function(d, f, i) {
        var b = 30
          , a = i < 3 ? 10 : i < 5 ? 15 : 20;
        var j = 360 - d + b;
        var k = Math.sin(Math.PI * j / 180) * a;
        var l = Math.cos(Math.PI * j / 180) * a;
        var h = f.x + l
          , g = f.y - k;
        j = 360 - d - b;
        k = Math.sin(Math.PI * j / 180) * a;
        l = Math.cos(Math.PI * j / 180) * a;
        var e = f.x + l
          , c = f.y - k;
        return {
            x1: h,
            y1: g,
            x2: e,
            y2: c
        }
    },
    calcDistance: function(d, b) {
        var a = b.x - d.x;
        var c = b.y - d.y;
        return Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2))
    },
    calcX: function(f, e, a) {
        var c = a.y - e.y;
        var d = a.x - e.x;
        if (d == 0) {
            return null
        }
        var b = Math.abs(c / d);
        if (a.x < e.x && a.y < e.y) {
            b = -b
        } else {
            if (a.x > e.x && a.y > e.y) {
                b = -b
            } else {
                if (a.x > e.x && a.y < e.y) {
                    b = Math.abs(c / d)
                }
            }
        }
        return f / b
    },
    calcY: function(a, f, b) {
        var d = b.y - f.y;
        var e = b.x - f.x;
        if (e == 0) {
            return null
        }
        var c = d / e;
        var c = Math.abs(d / e);
        if (b.x < f.x && b.y < f.y) {
            c = -c
        } else {
            if (b.x > f.x && b.y > f.y) {
                c = -c
            }
        }
        return c * a
    },
    isUrl: function(b) {
        var a = new RegExp("(http|ftp|https)://[a-z0-9-_]+(.[a-z0-9-_]+)+([a-z0-9-.,@?^=%&;:/~+#]*[a-z0-9-@?^=%&;/~+#])?","i");
        if (a.test(b)) {
            return true
        }
        return false
    },
    isHexColor: function(a) {
        return /(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
    },
    htmlEncode: function(a) {
        if (a.length == 0) {
            return ""
        }
        a = a.replace(/</g, "&lt;");
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/\'/g, "&#39;");
        a = a.replace(/\"/g, "&quot;");
        return a
    },
    htmlDecode: function(a) {
        if (a.length == 0) {
            return ""
        }
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&#39;/g, "'");
        a = a.replace(/&quot;/g, '"');
        return a
    },
    getHexColor: function(c) {
        var a = {};
        if (c.indexOf("rgba(0") < 0) {
            var b = c.substring(4, c.length - 1);
            a.rgb = b;
            c = c.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function d(e) {
                return ("0" + parseInt(e).toString(16)).slice(-2)
            }
            c = d(c[1]) + d(c[2]) + d(c[3]);
            a.hex = c;
            return a
        } else {
            return null
        }
    },
    getNewDef: function(s, h) {
        if (s.root && s.theme) {}
        var k = false
          , j = false;
        if (s.structure.indexOf("mind_") < 0) {
            k = true
        }
        var e, q;
        if (s.structure == "mind" && (s.root == null || s.classic)) {
            s.leftChildren = [],
            e = s.children,
            q = e.length - 1;
            var g = Math.floor(q / 2)
              , p = [];
            for (var o = g; o < q; o++) {
                var c = e[o];
                p.push(c)
            }
            e.splice(g, q - g);
            s.leftChildren = s.leftChildren.concat(p);
            s.structure = "mind_free"
        }
        if (s.classic) {
            var t = s.classic;
            if (t.indexOf("defaultClassic") >= 0) {
                t = "theme3"
            }
            delete s.classic;
            s.theme = t
        }
        if (s.root == null) {
            s.root = true
        }
        if ($.isEmptyObject(s.lines)) {
            delete s.lines
        } else {
            var b = s.lines;
            for (var m in b) {
                var l = s.lines[m];
                var f = l.start
                  , d = l.end;
                if ((f.p || d.p) && l.canvasPos != null) {
                    for (var o = 0; o < l.points.length; o++) {
                        var n = l.points[o];
                        if (n.x > 2000) {
                            delete l.points;
                            j = true
                        }
                    }
                    if (f.p == "bottom") {
                        f = {
                            x: 0.5,
                            y: 1
                        }
                    } else {
                        if (f.p == "top") {
                            f = {
                                x: 0.5,
                                y: 0
                            }
                        } else {
                            if (f.p == "left") {
                                f = {
                                    x: 0,
                                    y: 0.5
                                }
                            } else {
                                if (f.p == "right") {
                                    f = {
                                        x: 1,
                                        y: 0.5
                                    }
                                }
                            }
                        }
                    }
                    if (d.p == "bottom") {
                        d = {
                            x: 0.5,
                            y: 1
                        }
                    } else {
                        if (d.p == "top") {
                            d = {
                                x: 0.5,
                                y: 0
                            }
                        } else {
                            if (d.p == "left") {
                                d = {
                                    x: 0,
                                    y: 0.5
                                }
                            } else {
                                if (d.p == "right") {
                                    d = {
                                        x: 1,
                                        y: 0.5
                                    }
                                }
                            }
                        }
                    }
                    if (f.x == null) {
                        f.x = 0;
                        f.y = 0
                    }
                    if (d.x == null) {
                        d.x = 0;
                        d.y = 0
                    }
                    if (f.x > 2000) {
                        f.x = 1
                    }
                    if (d.x > 2000) {
                        d.x = 1
                    }
                    if (f.y > 2000) {
                        f.y = 1
                    }
                    if (d.y > 2000) {
                        d.y = 1
                    }
                }
                if (l.canvasPos && l.start.p) {
                    var a = l.canvasPos;
                    if (l.points != null && l.points.length > 0) {
                        if (l.points[0].x != null && l.points[0].y != null) {
                            l.points[0].x += a.x;
                            l.points[0].y += a.y
                        }
                        if (l.points[0].x != null && l.points[0].y != null) {
                            l.points[1].x += a.x;
                            l.points[1].y += a.y
                        }
                    }
                    if (l.start.x > 1 || l.start.y > 1) {
                        l.realStart = {};
                        l.realStart.x = l.canvasPos.x + l.start.x;
                        l.realStart.y = l.canvasPos.y + l.start.y;
                        l.start.x = l.start.x / l.canvasPos.w;
                        l.start.y = l.start.y / l.canvasPos.h
                    }
                    if (l.end.x > 1 || l.end.y > 1) {
                        l.realEnd = {};
                        l.realEnd.x = l.canvasPos.x + l.end.x;
                        l.realEnd.y = l.canvasPos.y + l.end.y;
                        l.end.x = l.end.x / l.canvasPos.w;
                        l.end.y = l.end.y / l.canvasPos.h
                    }
                    delete l.canvasPos
                }
            }
        }
        if (s.background == "" || s.background == null) {
            delete s.background
        } else {
            if (s.background.indexOf("niupizhi.png") > 0) {
                delete s.background
            }
        }
        r(s);
        function r(F) {
            if (F.tag != null) {
                var D = F.tag;
                var E = [];
                var G = {
                    text: D,
                    color: "#276F86",
                    background: "#d6f0f8"
                };
                E.push(G);
                F.tags = E;
                delete F.tag
            }
            if (F.task != null) {
                if (F.task.start == "") {
                    delete F.task.start
                }
                if (F.task.end == "") {
                    delete F.task.end
                }
            }
            if (F.link != null) {
                if (F.link.value == "") {
                    delete F.link
                }
            }
            if (F.icons != null) {
                var u = h.icons.icons;
                if (u != null) {
                    for (var y = 0, A = F.icons.length; y < A; y++) {
                        var B = F.icons[y];
                        var C = u[B.name];
                        for (var x = 0; x < C.length; x++) {
                            var z = C[B.index];
                            if (z == null) {
                                z = C[C.length - 1];
                                B.text = z.text;
                                break
                            } else {
                                if (z.index == B.index) {
                                    B.text = z.text;
                                    break
                                }
                            }
                        }
                    }
                }
            }
            var w = F.children
              , A = w.length;
            for (var y = 0; y < A; y++) {
                var v = w[y];
                r(v)
            }
        }
        if (k || j) {
            $.ajax({
                url: "/mindmap/updatedef",
                type: "post",
                data: {
                    id: h.opts.chartId,
                    def: JSON.stringify(s),
                    ignore: "def"
                },
                success: function(i) {},
                error: function() {}
            })
        }
        return s
    },
    isChrome: function() {
        return navigator.userAgent.toLowerCase().indexOf("chrome") >= 0
    },
    isFirefox: function() {
        return navigator.userAgent.toLowerCase().indexOf("firefox") >= 0
    },
    isSafari: function() {
        var a = navigator.userAgent.toLowerCase();
        return a.indexOf("safari") !== -1 && a.indexOf("chrome") === -1
    },
    tipCount: function() {
        var b = window.localStorage;
        var c = b.getItem("tip_count");
        if (c == null) {
            localStorage.setItem("tip_count", 1);
            return true
        } else {
            var a = parseInt(c);
            if (a > 20) {
                return false
            }
            localStorage.setItem("tip_count", a + 1);
            return true
        }
    }
};
mindDesigner.prototype.tags = {
    setTags: function(k) {
        var g = this
          , f = g.util
          , d = g.model
          , a = f.getSelectedId();
        if (g.opts.readonly) {
            return
        }
        if (a == null || $.trim(a) == "" || $.trim(k.text) == "") {
            return
        }
        var i = $.trim(k.text)
          , e = d.getTopicById(a)
          , h = e.tags;
        if (h == null) {
            e.tags = []
        }
        var c = false;
        for (var j in h) {
            if (j.text == i) {
                c = true;
                break
            }
        }
        if (c) {
            return
        }
        var b = f.copy(e);
        e.tags.push(k);
        d.updateTopicNode.call(g, e, b, "tag")
    },
    renderTagColors: function(h) {
        var d = {
            background: "#d6f0f8",
            color: "#276F86"
        };
        var g = [];
        var b = h.style.baseColor();
        for (var f = 0, a = b.length; f < a; f++) {
            var e = b[f];
            var j = "#fff;";
            if (e == "#f4f4f4") {
                j = "#333"
            }
            g.push("<span style='background:" + e + ";color:" + j + "'></span>")
        }
        g.push("<span style='background:" + d.background + ";color:" + d.color + ";'></span>");
        return g.join("")
    },
    renderTopicTag: function(f, e, a) {
        if (e.tags && !$.isEmptyObject(e.tags)) {
            var b = f.getTopicDom(e.id);
            var h = b.children(".topic-tags");
            if (h.length) {
                if (h.children().length > 0) {
                    h.children().remove()
                }
            } else {
                h = $("<div class='topic-tags'></div>");
                b.append(h)
            }
            var l = e.tags
              , d = "";
            for (var c = 0, g = l.length; c < g; c++) {
                var k = l[c];
                d += "<span class='topic-tag' style='background:" + k.background + ";color:" + k.color + "'>" + k.text + "</span>"
            }
            h.html(d)
        } else {
            var b = f.getTopicDom(e.id);
            var j = b.children(".topic-tags");
            if (j.length) {
                j.remove()
            }
        }
    },
    removeTag: function(k) {
        var h = this
          , f = h.util
          , d = h.model
          , a = f.getSelectedId();
        if (a == null || $.trim(a) == "") {
            return
        }
        var e = d.getTopicById(a)
          , b = f.copy(e)
          , j = e.tags;
        var g = 0;
        for (var c = 0; c < j.length; c++) {
            var l = j[c];
            if (l.text == k) {
                g = c;
                break
            }
        }
        j.splice(g, 1);
        d.updateTopicNode.call(h, e, b, "tag")
    },
    setTagColor: function(d, m) {
        var k = this
          , h = k.util
          , f = k.model
          , a = h.getSelectedId();
        if (a == null || $.trim(a) == "") {
            return
        }
        var g = f.getTopicById(a)
          , c = h.copy(g)
          , l = g.tags || [];
        if (l.length == 0) {
            g.tags = [];
            g.tags.push({
                background: d.background,
                color: d.color,
                text: m
            })
        } else {
            for (var e = 0, j = l.length; e < j; e++) {
                var b = l[e];
                if (b.text == m) {
                    b.background = d.background;
                    b.color = d.color;
                    break
                }
            }
        }
        f.updateTopicNode.call(k, g, c, "tag")
    },
    checkExists: function(e, h, g) {
        var b = e.model.getTopicById(h);
        var a = b.tags
          , f = true;
        if (a != null && a.length > 0) {
            for (var d = 0; d < a.length; d++) {
                var c = a[d];
                if (c.text == g) {
                    f = false;
                    break
                }
            }
        }
        return f
    },
    selectTag: function(a) {
        $(".mind-tags-curr").find(".tags").each(function(b, d) {
            var c = $(d);
            if (c.children().eq(0).text() == a) {
                c.addClass("active")
            }
        })
    },
    showTag: function(a, j) {
        var k = this
          , h = k.util
          , g = k.model
          , b = j || h.getSelectedId()
          , i = k.operation
          , c = k.tags;
        if (b == null || $.trim(b) == "") {
            return
        }
        if (k.opts.readonly) {
            return
        }
        var d = h.getTopicDom(b);
        var f = $("#mind-tags-box");
        if (f.length == 0) {
            f = $("<div id='mind-tags-box' class='mind-topic-box'><div class='mind-tags-curr'><div>当前标签</div><div></div></div><div class='mind-tags-color'><div>标签颜色</div><div class='mt10'></div></div><div class='mind-tags-default'><div>可添加标签</div><div class='mt10'></div></div><div class='mind-tags-input'><input id='mind-topic-tag' type='text' placeholder='输入文本，回车新建标签'/></div></div>").appendTo(k.designer)
        }
        e(f);
        c.renderTags(k, b);
        $.fn.showPanel({
            target: d,
            panel: f
        });
        f.find("input").focus();
        if (a != null) {
            c.selectTag(a)
        }
        function e(s) {
            var n = s.children(".mind-tags-color");
            var p = s.children(".mind-tags-default");
            var w = s.children(".mind-tags-input");
            var r = {
                background: "#d6f0f8",
                color: "#276F86"
            };
            var t = [];
            var l = mind.style.baseColor();
            for (var q = 0, u = l.length; q < u; q++) {
                var o = l[q];
                var v = "#fff;";
                if (o == "#f4f4f4") {
                    v = "#333"
                }
                t.push("<span style='background:" + o + ";color:" + v + "'></span>")
            }
            t.push("<span style='background:" + r.background + ";color:" + r.color + ";'></span>");
            n.children().eq(1).html(t.join(""));
            if (p.children().eq(1).children().length == 0) {
                var m = '<span class="tags" style="background:#7a00f2;">待定</span><span class="tags" style="background:#50c28b;">已确认</span><span class="tags" style="background:#6d6d6d;">已完成</span><span class="tags" style="background:#c4c4c4;">已关闭</span><span class="tags" style="background:#2760f2;">进行中</span>';
                p.children().eq(1).html(m)
            }
        }
    },
    renderTags: function(f, a) {
        var j = $("#mind-tags-box");
        var g = j.children(".mind-tags-curr");
        var e = f.model.getTopicById(a);
        var j = e.tags;
        if (j != null && j.length > 0) {
            var d = [];
            for (var c = 0; c < j.length; c++) {
                var h = j[c];
                var b = "";
                if (c == 0) {
                    b = " active"
                }
                d.push("<span class='tags" + b + "' style='background:" + h.background + ";color:" + h.color + ";'><span class='mind-tags-text'>" + h.text + "</span><span class='mind-icons'>&#xe622;</span></span>")
            }
            g.children().eq(1).html(d.join(""))
        } else {
            g.children().eq(1).html("<span style='font-size:12px;color:#aaa;'>还没有标签，请在下方输入后回车新建</span>")
        }
        this.renderRecentTags();
        this.initTagsEvent(f, a)
    },
    renderRecentTags: function() {
        var a = localStorage.getItem("recentTags");
        if (a != null && a != "") {
            var d = JSON.parse(a)
              , c = "";
            for (var b = 0; b < d.length; b++) {
                c += '<span class="tags" style="background:#d6f0f8;color:#276F86;">' + d[b] + "</span>"
            }
            $("#mind-tags-recent").html(c)
        } else {
            $("#mind-tags-recent").html("")
        }
    },
    initTagsEvent: function(c, e) {
        var a = this;
        $(document).off("click.tags").on("click.tags", ".mind-tags-default .tags", function(i) {
            var g = $("#mind-tags-box");
            var k = $(this)
              , j = k.text();
            var h = a.checkExists(c, e, j);
            if (!h) {
                return
            }
            var f = {
                text: j,
                background: k.css("background-color"),
                color: k.css("color")
            };
            a.setTags.call(c, f);
            a.renderTags(c, e);
            a.selectTag(j);
            i.stopPropagation()
        });
        $("#mind-topic-tag").off("blur").on("blur", function(f) {
            var g = $(this).val();
            g = c.util.htmlEncode(g);
            if ($.trim(g) != "") {
                b($.trim(g));
                d($.trim(g))
            }
        });
        $("#mind-topic-tag").off("keyup").on("keyup", function(f) {
            if (f.keyCode == 13) {
                var g = $(this).val();
                g = c.util.htmlEncode(g);
                if ($.trim(g) != "") {
                    b($.trim(g));
                    d($.trim(g))
                }
            }
        });
        $("#mind-tags-box").children(".mind-tags-curr").find(".tags").off("click").on("click", function(g) {
            var f = $(this);
            f.addClass("active").siblings().removeClass("active")
        });
        $("#mind-tags-box").children(".mind-tags-curr").find(".mind-icons").off("click").on("click", function(h) {
            var g = $(this)
              , f = g.parent();
            g.remove();
            var i = $.trim(f.text());
            f.remove();
            a.removeTag.call(c, i);
            a.renderTags(c, e);
            h.stopPropagation()
        });
        $("#mind-tags-box").children(".mind-tags-color").find("span").off("click").on("click", function(i) {
            var k = $(this)
              , j = k.text();
            var h = $(".mind-tags-curr").find(".tags.active");
            if (h.length == 0) {
                c.events.push("tagTip");
                return
            }
            var f = h.find(".mind-tags-text").text();
            var g = {
                background: k.css("background-color"),
                color: k.css("color")
            };
            a.setTagColor.call(c, g, f);
            h.css(g);
            i.stopPropagation()
        });
        function d(h) {
            var f = localStorage.getItem("recentTags");
            if (f != null) {
                var g = JSON.parse(f);
                if (g.indexOf(h) < 0) {
                    if (g.length > 5) {
                        g.splice(0, 1)
                    }
                    g.push(h);
                    localStorage.setItem("recentTags", JSON.stringify(g));
                    a.renderRecentTags()
                }
            } else {
                localStorage.setItem("recentTags", "[]");
                d(h)
            }
        }
        function b(j) {
            var f = $("#mind-topic-tags");
            j = c.util.htmlEncode(j);
            if (j.length > 20) {
                j = j.substring(0, 20)
            }
            var h = a.checkExists(c, e, j);
            if (!h) {
                return
            }
            var g = {
                color: "#276F86",
                background: "#d6f0f8"
            };
            var i = {
                text: j,
                color: g.color,
                background: g.background
            };
            a.setTags.call(c, i);
            a.renderTags(c, e);
            $("#mind-topic-tag").val("");
            a.selectTag(j)
        }
    },
    resetPanel: function(a, c) {
        var b = a.util.getTopicDom(c);
        $.fn.showPanel({
            target: b,
            panel: $("#mind-tags-box")
        })
    }
};
mindDesigner.prototype.remark = {
    setRemark: function(g, e) {
        var f = this
          , b = f.util
          , d = f.model
          , h = e || b.getSelectedId();
        if (f.opts.readonly) {
            return
        }
        if (h == null || $.trim(h) == "") {
            return
        }
        g = b.htmlEncode(g);
        var c = d.getTopicById(h);
        if (c.note == null && g == "") {
            return
        }
        if (g != c.note) {
            var a = b.copy(c);
            c.note = g;
            d.updateTopicNode.call(f, c, a, "note")
        }
    },
    renderTopicNote: function(a, c, b) {
        var e = this;
        if (c.note) {
            var f = a.getTopicDom(c.id);
            if (f.children(".topic-note").length > 0) {
                f.children(".topic-note").remove()
            }
            var d = $("<span class='topic-note mind-icons'>&#xe6a6;</span>");
            f.children(".topic").after(d);
            if (b == "right" || b == null) {
                d.addClass("right")
            } else {
                if (b == "left") {
                    d.addClass("left")
                }
            }
            d.on("mouseenter.remark", function(h) {
                var g = $(this);
                e.renderViewBox(c, g, a)
            });
            d.on("click.remark", function(g) {
                mind.events.push("showRightMenu", "remark")
            })
        } else {
            var f = a.getTopicDom(c.id);
            if (f.children(".topic-note").length > 0) {
                f.children(".topic-note").remove()
            }
        }
    },
    renderViewBox: function(b, f, a) {
        var e = $("#note_view_box");
        if (e.length) {
            e.remove()
        }
        var d = new showdown.Converter({
            simpleLineBreaks: true,
            tables: true,
            tasklists: true
        });
        var g = a.htmlDecode(b.note);
        var c = d.makeHtml(g).replace(/<(\/)?script([^>]+)?>/g, "&lt;$1script$2&gt;");
        e = $("<div id='note_view_box'>" + c + "</div>").appendTo("body");
        e.dropdown({
            target: f,
            position: "center"
        });
        e.off("mouseup.remark").on("mouseup.remark", function(h) {
            h.stopPropagation()
        })
    }
};
mindDesigner.prototype.task = {
    showTask: function(m) {
        var n = this
          , k = n.util
          , j = n.model
          , b = m || k.getSelectedId()
          , l = n.operation
          , e = n.task;
        if (b == null || $.trim(b) == "") {
            return
        }
        if (n.opts.readonly) {
            return
        }
        var g = k.getTopicDom(b);
        var i = j.getTopicById(b);
        var c = $("#mind-task");
        var h = $("#mind-task-box");
        if (h.length == 0) {
            h = $("<div id='mind-task-box' class='mind-topic-box'><h3>任务<a id='remove-task' style='cursor:pointer;font-size:13px;font-size: 13px;font-weight: normal;float: right;text-decoration: underline;'>删除</a></h3></div>").appendTo(n.designer);
            h.append(c)
        }
        $.fn.showPanel({
            target: g,
            panel: h
        });
        if (i.task != null) {
            var a = $("#mind-icons-priority-list")
              , q = $("#mind-icons-completion-list");
            var f = a.find("li[priority=" + i.task.priority + "]").clone()
              , p = q.find("li[completion=" + i.task.completion + "]").clone();
            f.find("span").remove();
            p.find("span").remove();
            var o = f.text();
            var d = p.text();
            if (o != "") {
                $("#mind-task-priority").children("span").text(o)
            } else {
                $("#mind-task-priority").children("span").text("无")
            }
            if (d != "") {
                $("#mind-task-completion").children("span").text(d)
            } else {
                $("#mind-task-completion").children("span").text("无")
            }
            p.remove();
            f.remove();
            $("#mind-task-start").find("span").text(i.task.start || "无");
            $("#mind-task-end").find("span").text(i.task.end || "无");
            $("#mind-task-assigned").val(i.task.assigned)
        }
        c.show();
        h.find("input").focus();
        $("#remove-task").on("click", function() {
            e.removeTask.call(n);
            $("#mind-task-assigned").val("");
            n.operation.hideLink();
            $(".mind-dock-right-task").find(".mind-select-box").text("无")
        })
    },
    setTask: function(c) {
        var f = this
          , b = f.util
          , e = f.model
          , g = b.getSelectedId();
        if (g == null || $.trim(g) == "" || c == null) {
            return
        }
        if (f.opts.readonly) {
            return
        }
        var d = e.getTopicById(g)
          , a = b.copy(d);
        if (d.task == null) {
            d.task = {}
        }
        d.task = $.extend(d.task, c);
        e.updateTopicNode.call(f, d, a, "task")
    },
    removeTask: function() {
        var e = this
          , b = e.util
          , d = e.model
          , f = b.getSelectedId();
        if (f == null || $.trim(f) == "") {
            return
        }
        if (e.opts.readonly) {
            return
        }
        var e = this
          , b = e.util
          , d = e.model
          , f = b.getSelectedId();
        var c = d.getTopicById(f)
          , a = b.copy(c);
        if (c.task == null) {
            return
        }
        delete c.task;
        d.updateTopicNode.call(e, c, a, "task")
    },
    renderTopicTask: function(i, h, c) {
        if (h.task && !$.isEmptyObject(h.task)) {
            var d = h.task;
            var f = i.getTopicDom(h.id);
            var e = f.children(".topic-task");
            if (!e.length) {
                e = $("<div class='topic-task'></div>");
                if (h.tags && !$.isEmptyObject(h.tags)) {
                    f.find(".topic-tags").before(e)
                } else {
                    f.append(e)
                }
            }
            var g = ""
              , j = false
              , b = false
              , a = false;
            if (d.start) {
                g += "<span>" + d.start + "</span>";
                j = true
            }
            if (d.end) {
                if (j == false) {
                    g += "_ "
                }
                g += "<span> : " + d.end + "</span>";
                b = true
            }
            if (b == false) {
                g += " : _"
            }
            if (j == false && b == false) {
                g = ""
            }
            if (d.assigned != null) {
                g += "&nbsp;<span>(" + d.assigned + ")</span>";
                a = true
            }
            e.html(g);
            if (e.html() == "") {
                e.remove()
            }
        } else {
            var f = i.getTopicDom(h.id);
            f.children(".topic-task").remove()
        }
    }
};
mindDesigner.prototype.icons = {
    renderTopicIcons: function(j, h, a) {
        if (h.icons) {
            var p = h.icons
              , l = this
              , o = l.icons;
            var e = j.getTopicDom(h.id);
            var d = e.children(".topic-icons");
            if (d.length) {
                d.children().remove()
            } else {
                d = $("<span class='topic-icons'></span>");
                e.find(".topic").before(d)
            }
            var g = "";
            for (var f = 0, k = p.length; f < k; f++) {
                var n = p[f];
                var b = o[n.name];
                var m = l.getIcon(b, n.index);
                if (m == null) {
                    continue
                }
                var c = n.color ? "style='color:" + n.color + "'" : "";
                g += "<span n='" + n.name + "' ico='" + n.index + "' " + c + " class='mind-icons'>" + m.text + "</span>"
            }
            d.html(g);
            if (g == "") {
                d.remove()
            }
            if (a == "right" || a == null) {
                d.addClass("right")
            } else {
                if (a == "left") {
                    d.addClass("left")
                }
            }
            d.css({
                width: k * 25 + "px"
            })
        } else {
            var e = j.getTopicDom(h.id);
            var d = e.children(".topic-icons");
            if (d.length) {
                d.remove()
            }
        }
    },
    currentIcon: {},
    setIcon: function(r, s, o) {
        var e = this;
        var j = r.attr("ico")
          , h = r.text()
          , l = r.attr("n") == null ? "" : r.attr("n");
        var t = {
            index: j,
            name: l
        };
        if (o != null) {
            t.color = o
        }
        if (e.icons.currentIcon != null && e.icons.currentIcon.color != null && e.icons.currentIcon.name == t.name) {
            t.color = e.icons.currentIcon.color
        }
        var e = this
          , b = e.util
          , d = e.model
          , k = b.getSelectedId();
        if (e.opts.readonly) {
            return
        }
        if (k == null || $.trim(k) == "" || t.index == "" || t.index == null) {
            return
        }
        var m = d.getTopicById(k)
          , c = b.copy(m);
        if (r.hasClass("selected")) {
            e.icons.currentIcon = t;
            e.icons.removeIcon.call(e);
            r.removeClass("selected");
            return
        }
        e.icons.currentIcon = t;
        if (m.icons == null) {
            m.icons = []
        }
        var a = m.icons;
        var f = false
          , j = -1;
        for (var p = 0, q = a.length; p < q; p++) {
            var g = a[p];
            if (g.name == t.name && t.name != "") {
                j = p;
                break
            }
            if (g.index == t.index) {
                f = true;
                break
            }
        }
        if (f) {
            return
        }
        if (j >= 0) {
            a.splice(j, 1, t)
        } else {
            m.icons.push(t)
        }
        if (s != null) {
            m.task = $.extend(m.task, s)
        }
        d.updateTopicNode.call(e, m, c, "icon");
        r.addClass("selected");
        if (t.name != "") {
            r.siblings().removeClass("selected")
        }
    },
    getIcon: function(d, b) {
        var e = null;
        for (var c = 0, a = d.length; c < a; c++) {
            var f = d[c];
            if (b == f.index) {
                e = f;
                break
            }
        }
        return e
    },
    removeIcon: function(d) {
        var m = this.icons.currentIcon;
        if (d == null && (m == null || m.index == null)) {
            return
        }
        var k = this
          , h = k.util
          , f = k.model
          , a = h.getSelectedId();
        if (a == null || $.trim(a) == "") {
            return
        }
        var g = f.getTopicById(a)
          , c = h.copy(g)
          , l = g.icons;
        for (var e = 0, j = l.length; e < j; e++) {
            var b = l[e];
            if (d != null && b.name == d) {
                l.splice(e, 1);
                break
            } else {
                if (b.index == m.index) {
                    l.splice(e, 1);
                    break
                } else {
                    if (d != null) {
                        g.task[d] = null
                    }
                }
            }
        }
        f.updateTopicNode.call(k, g, c, "icon")
    },
    setIconColor: function(d) {
        var k = this
          , h = k.util
          , f = k.model
          , a = h.getSelectedId();
        if (a == null || $.trim(a) == "") {
            return
        }
        var m = k.icons.currentIcon;
        if (m.index == null) {
            return
        }
        var g = f.getTopicById(a)
          , c = h.copy(g)
          , l = g.icons;
        for (var e = 0, j = l.length; e < j; e++) {
            var b = l[e];
            if (b.index == m.index) {
                b.color = d;
                break
            }
        }
        f.updateTopicNode.call(k, g, c, "icon")
    },
    icons: {
        face: [{
            index: 9,
            text: "&#xe6c8"
        }, {
            index: 11,
            text: "&#xe6ca"
        }, {
            index: 10,
            text: "&#xe6c6"
        }],
        priority: [{
            index: 0,
            text: "&#xe67a"
        }, {
            index: 1,
            text: "&#xe625"
        }, {
            index: 2,
            text: "&#xe62a"
        }, {
            index: 3,
            text: "&#xe635"
        }, {
            index: 4,
            text: "&#xe626"
        }, {
            index: 5,
            text: "&#xe62b"
        }, {
            index: 6,
            text: "&#xe627"
        }, {
            index: 7,
            text: "&#xe628"
        }, {
            index: 8,
            text: "&#xe629"
        }],
        arrow: [{
            index: 33,
            text: "&#xe68c"
        }, {
            index: 34,
            text: "&#xe68e"
        }, {
            index: 35,
            text: "&#xe68d"
        }, {
            index: 36,
            text: "&#xe68b"
        }, {
            index: 37,
            text: "&#xe6a0"
        }],
        flag: [{
            index: 26,
            text: "&#xe67e"
        }, {
            index: 27,
            text: "&#xe67e"
        }, {
            index: 28,
            text: "&#xe67e"
        }, {
            index: 29,
            text: "&#xe67e"
        }, {
            index: 30,
            text: "&#xe67e"
        }, {
            index: 31,
            text: "&#xe67e"
        }, {
            index: 32,
            text: "&#xe67e"
        }],
        completion: [{
            index: 17,
            text: "&#xe6d2"
        }, {
            index: 18,
            text: "&#xe6d3"
        }, {
            index: 19,
            text: "&#xe6d4"
        }, {
            index: 20,
            text: "&#xe6d5"
        }, {
            index: 21,
            text: "&#xe6d6"
        }, {
            index: 22,
            text: "&#xe6d7"
        }, {
            index: 23,
            text: "&#xe6d8"
        }, {
            index: 24,
            text: "&#xe697;"
        }],
        "": [{
            index: 38,
            text: "&#xe6ab"
        }, {
            index: 39,
            text: "&#xe634"
        }, {
            index: 40,
            text: "&#xe640"
        }, {
            index: 41,
            text: "&#xe692"
        }, {
            index: 42,
            text: "&#xe6b8"
        }, {
            index: 43,
            text: "&#xe6bb"
        }, {
            index: 44,
            text: "&#xe6b9"
        }, {
            index: 45,
            text: "&#xe6bf"
        }, {
            index: 46,
            text: "&#xe663"
        }, {
            index: 47,
            text: "&#xe6bd"
        }, {
            index: 48,
            text: "&#xe621"
        }, {
            index: 49,
            text: "&#xe6bc"
        }, {
            index: 50,
            text: "&#xe6c1"
        }, {
            index: 51,
            text: "&#xe609"
        }, {
            index: 52,
            text: "&#xe688"
        }, {
            index: 53,
            text: "&#xe681"
        }, {
            index: 54,
            text: "&#xe639"
        }, {
            index: 55,
            text: "&#xe682"
        }, {
            index: 56,
            text: "&#xe67f"
        }, {
            index: 57,
            text: "&#xe695"
        }, {
            index: 58,
            text: "&#xe689"
        }, {
            index: 59,
            text: "&#xe6be"
        }, {
            index: 60,
            text: "&#xe683"
        }, {
            index: 61,
            text: "&#xe6c0"
        }, {
            index: 62,
            text: "&#xe6b6"
        }, {
            index: 63,
            text: "&#xe680"
        }, {
            index: 64,
            text: "&#xe693"
        }]
    },
    renderIconBox: function(b, o) {
        if ($("#mind-icons-box").length > 0) {
            $("#mind-icons-box").remove()
        }
        var d = '<div id="mind-icons-box" class="mind-dropdown">';
        var r = this.icons
          , m = "";
        var l = r[b];
        m += "<div>";
        for (var h = 0; h < l.length; h++) {
            var e = l[h];
            var f = "";
            if (o == e.index) {
                f = " selected"
            }
            m += '<span ico="' + e.index + '" n="' + b + '" class="mind-icons' + f + '">' + e.text + "</span>"
        }
        m += "<span remove='true' style='color:#ff0000;' class='mind-icons'>&#xe60c;</span><span style='clear:both;'></span>";
        m += "</div>";
        d += m;
        var a = ["#bf1e1b", "#63abf7", "rgb(113, 203, 45)", "#ff9f1a", "#30bfbf", "#444444", "#f4f4f4"];
        var q = ["<div class='mind-icons-color'>"];
        for (var k = 0, n = a.length; k < n; k++) {
            var g = a[k];
            var p = "#fff;";
            if (g == "#f4f4f4") {
                p = "#333"
            }
            q.push("<span style='background:" + g + ";color:" + p + "'></span>")
        }
        q.push["</div>"];
        d += q.join("");
        d += "</div>";
        return d
    },
    showIcons: function(e, d, b, i) {
        var j = this
          , h = j.util
          , k = j.icons
          , g = j.model;
        var f = k.renderIconBox(b, i);
        var c = {
            index: i,
            name: b,
            color: e.css("color")
        };
        k.currentIcon = c;
        var a = $(f);
        a.appendTo("body");
        $.fn.showPanel({
            target: e,
            panel: a
        });
        k.initIconEvent.call(j)
    },
    initIconEvent: function() {
        var a = this
          , b = a.icons;
        $(document).off("mousedown.icons").on("mousedown.icons", function(c) {
            $("#mind-icons-box").remove();
            setTimeout(function() {
                $(document).off("mousedown.icons")
            }, 50)
        });
        $(document).on("mousedown.icons", "#mind-icons-box", function(c) {
            c.stopPropagation()
        });
        $(document).off("click.icons").on("click.icons", "#mind-icons-box .mind-icons", function(c) {
            var d = $(this);
            if (d.attr("remove")) {
                b.removeIcon.call(a);
                $("#mind-icons-box").remove()
            } else {
                b.setIcon.call(a, d)
            }
            c.stopPropagation()
        });
        $(document).off("click.iconcolors").on("click.iconcolors", ".mind-icons-color span", function(d) {
            var f = $(this)
              , c = f.css("background-color");
            b.setIconColor.call(a, c);
            d.stopPropagation()
        })
    }
};
mindDesigner.prototype.style = {
    baseColor: function() {
        return ["#bf1e1b", "#63abf7", "rgb(113, 203, 45)", "#ff9f1a", "#30bfbf", "#444444", "#f4f4f4"]
    },
    getThemeStyle: function(m) {
        var j = this.model.topic
          , a = this.style
          , l = a.themes
          , g = (j.classic || j.theme)
          , k = this.util;
        if (m != null && m != "" && m != "null") {
            return m
        }
        var h = k.copy(l.theme3);
        if (g) {
            if (g.indexOf("customise_") < 0) {
                h = k.copy(l[g])
            } else {
                var c = window.sessionStorage.getItem("customiseThemes");
                if (c != null && c != "") {
                    var b = JSON.parse(c);
                    if (b.length > 0) {
                        for (var f = 0; f < b.length; f++) {
                            var d = b[f];
                            if (d.id == g) {
                                h = d;
                                break
                            }
                        }
                    }
                }
            }
        }
        var e = j.background;
        h = $.extend(h, {
            background: e || h.background
        });
        return h
    },
    setTheme: function(f) {
        var g = this
          , e = g.model
          , d = e.topic;
        var c = "";
        g.events.push("zoom", 0);
        var a = g.style.checkCustomiseStyle(d);
        if (a) {
            g.events.push("showThemeOperate", f)
        } else {
            g.style.setThemeDirect.call(g, f)
        }
    },
    setThemeDirect: function(d, f) {
        var e = this
          , c = e.model
          , b = c.topic;
        var a = "";
        if (b.classic != null) {
            a = b.classic;
            delete b.classic;
            b.theme = a
        }
        a = b.theme;
        if (d != null || d != "") {
            b.theme = d
        }
        e.operation.clearCanvas.call(e);
        e.operation.zoomVal = 100;
        mind = new mindDesigner("#mind_con",{
            chartId: chartId
        },b);
        if (f == null) {
            e.messageSource.send.call(e, "setTheme", {
                content: d,
                original: a
            })
        }
    },
    setThemeOverWrite: function(d, l) {
        var g = this
          , e = g.model
          , h = e.topic;
        var a = "";
        if (h.classic != null) {
            a = h.classic;
            delete h.classic;
            h.theme = a
        }
        a = h.theme;
        if (d != null || d != "") {
            h.theme = d
        }
        var k = e.getStyleTopics.call(g, h);
        e.topicList.resetTopicList.call(g);
        var b = [];
        for (var c = 0, f = k.length; c < f; c++) {
            var j = k[c];
            delete j.children;
            b.push(j)
        }
        g.styles = g.style.getThemeStyle.call(g);
        g.operation.setBackground.call(g);
        g.render();
        g.messageSource.send.call(g, "setThemeOverWrite", {
            tps: b,
            content: d,
            original: a,
            operate: "delete"
        });
        if (l != null) {
            l()
        }
    },
    setThemeOverWrite_: function(h, g, c, f) {
        var e = this
          , d = e.model
          , b = d.topic;
        var a = b.theme;
        if (h != null || h != "") {
            b.theme = h
        }
        if (c == "add") {
            d.addTopicStyles.call(e, b, g)
        } else {
            if (c == "delete") {
                d.getStyleTopics.call(e, b)
            }
        }
        d.topicList.resetTopicList.call(e);
        e.styles = e.style.getThemeStyle.call(e);
        e.operation.setBackground.call(e);
        e.render();
        if (f == null) {
            e.messageSource.send.call(e, "setThemeOverWrite", {
                tps: g,
                content: h,
                old: a,
                operate: c
            })
        }
    },
    checkCustomiseStyle: function(d) {
        var a = false;
        function c(g) {
            if (g.style || g.lineStyle || (g.background && g.root)) {
                a = true;
                return a
            }
            var f = g.children;
            for (var e = 0, b = f.length; e < b; e++) {
                var h = f[e];
                if (c(h)) {
                    a = true;
                    break
                }
            }
        }
        c(d);
        return a
    },
    getRadomColor: function() {
        var b = ["rgb(220,220,220)", "rgb(193,255,193)", "rgb(254,224,198)", "rgb(254,240,201)", "rgb(255,204,204)", "rgb(255,230,204)", "rgb(230,255,204)", "rgb(204,229,255)", "rgb(204,204,255)", "rgb(229,204,255)", "rgb(255,204,255)", "rgb(255,204,230)"];
        var a = parseInt(Math.random() * 10);
        return b[a]
    },
    usedColors: [],
    getLineColor: function() {
        var a = this.getRadomLineColor();
        while (this.usedColors.indexOf(a) >= 0) {
            a = this.getRadomLineColor()
        }
        this.usedColors.push(a);
        if (this.usedColors.length == 10) {
            this.usedColors.length = []
        }
        return a
    },
    getRadomLineColor: function() {
        var b = ["rgb(255,204,204)", "rgb(153,204,255)", "#FDB813", "#80BC42", "#e85d4e", "#127c97", "rgb(232, 124, 37)", "rgb(0, 94, 170)", "rgb(51, 156, 168)", "rgb(212, 164, 235)"];
        var a = parseInt(Math.random() * 10);
        return b[a]
    },
    themes: {
        theme3: {
            background: "#f6f6f6",
            thumbUrl: "/assets/images/mind/mr.jpg",
            thinner: false,
            title: "默认风格",
            marginH: 26,
            marginW: 80,
            childMarginH: 8,
            childMarginW: 12,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#ffffff",
                color: "#666",
                "font-size": "28px",
                "border-radius": "5px",
                border: "2px solid #666",
                padding: "10px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid #666",
                "border-radius": "25px",
                color: "#735C45",
                "font-size": "15px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 2,
                    lineColor: "#666"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "#666",
                padding: "2px 9px 4px 9px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "#666",
                    underLine: true
                }
            }
        },
        "default": {
            background: "#f8f8f8",
            thinner: false,
            thumbUrl: "/assets/images/mind/wdmx.jpg",
            title: "文档模型",
            marginH: 26,
            marginW: 60,
            childMarginH: 10,
            childMarginW: 14,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "26px",
                "border-radius": "5px",
                padding: "14px 15px 13px 15px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "8px 12px 8px 12px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "2px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(140,140,140)"
                }
            }
        },
        niupizhi: {
            background: "rgb(252,246,207)",
            thumbUrl: "/assets/images/mind/npz.jpg",
            thinner: false,
            title: "牛皮纸",
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 18,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "rgb(221, 170, 68)",
                color: "#fff",
                "font-size": "30px",
                "border-radius": "5px",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                backgroundColor: "rgb(221, 170, 68)",
                "border-radius": "5px",
                color: "#ffffff",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 1,
                    lineColor: "rgb(187, 136, 34)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(187, 136, 34)",
                padding: "2px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(187, 136, 34)"
                }
            }
        },
        shangwu: {
            background: "#f8f8f8",
            thinner: false,
            thumbUrl: "/assets/images/mind/jysw.jpg",
            title: "简约商务",
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 18,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "rgb(102, 102, 255)",
                color: "#fff",
                "font-size": "27px",
                "border-radius": "5px",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                color: "rgb(102, 102, 255)",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 1,
                    lineColor: "rgb(0, 0, 204)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(102, 102, 255)",
                padding: "2px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(102, 102, 255)"
                }
            }
        },
        theme1: {
            background: "#ffffdd",
            thinner: true,
            thumbUrl: "/assets/images/mind/zxjx.jpg",
            title: "线条渐细",
            marginH: 30,
            marginW: 90,
            childMarginH: 10,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "40px",
                "border-radius": "5px",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px",
                lineStyle: {
                    lineType: "straight",
                    lineWidth: 4,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "2px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(140,140,140)"
                }
            }
        },
        caihongpao: {
            title: "彩虹泡",
            thumbUrl: "/assets/images/mind/chp.jpg",
            background: "#f8f8f8",
            thinner: false,
            marginH: 30,
            marginW: 80,
            childMarginH: 8,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "26px",
                "border-radius": "5px",
                padding: "9px 12px 10px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                "border-radius": "5px",
                color: "rgb(103,103,103)",
                "font-size": "14px",
                padding: "6px 10px 5px 10px",
                boxShadow: "1px 1px 1px #ccc",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 2,
                    lineColor: "#43a9ff"
                }
            },
            childTopic: {
                "font-size": "12px",
                "border-radius": "5px",
                color: "rgb(103,103,103)",
                padding: "3px 9px 4px",
                boxShadow: "1px 1px 1px #ccc",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "#43a9ff"
                }
            }
        },
        caihongthinner: {
            background: "#f8f8f8",
            thumbUrl: "/assets/images/mind/chl.jpg",
            title: "有色彩的线条Thinner",
            thinner: true,
            autoColor: true,
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "34px",
                "border-radius": "5px",
                padding: "15px 12px 15px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "2px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 8,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "2px 9px 3px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 2,
                    lineColor: "rgb(140,140,140)",
                    underLine: true
                }
            }
        },
        colorLines: {
            background: "#f8f8f8",
            thumbUrl: "/assets/images/mind/colorlines.png",
            title: "有色彩的线条",
            thinner: false,
            autoColor: true,
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#fff",
                border: "6px solid #3aa9ce",
                color: "#333",
                "font-size": "30px",
                "border-radius": "5px",
                padding: "15px 12px 15px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "2px solid #3aa9ce",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 5,
                    lineColor: "#3aa9ce"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "2px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 2,
                    lineColor: "rgb(58, 169, 206)",
                    underLine: true
                }
            }
        },
        caihong: {
            background: "#f8f8f8",
            thumbUrl: "/assets/images/mind/ch.jpg",
            title: "有色彩的线条",
            thinner: false,
            autoColor: true,
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "34px",
                "border-radius": "5px",
                padding: "15px 12px 15px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "2px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 8,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "3px 9px 4px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(140,140,140)",
                    underLine: true
                }
            }
        },
        jianbihua: {
            background: "rgb(255, 249, 217)",
            thumbUrl: "/assets/images/mind/jbxt.jpg",
            title: "简笔线条",
            thinner: false,
            marginH: 40,
            marginW: 80,
            childMarginH: 20,
            childMarginW: 20,
            common: {
                family: "Comic Sans MS,微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "rgb(255, 249, 217)",
                "border-width": "7px",
                color: "#333",
                "font-size": "34px",
                padding: "16px 12px 15px 12px",
                borderStyle: "solid",
                "-webkit-border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60",
                "border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60"
            },
            secTopic: {
                backgroundColor: "rgb(255, 249, 217)",
                color: "rgb(68,68,68)",
                "font-size": "20px",
                padding: "2px 9px 4px",
                "border-width": "3px",
                "-webkit-border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60",
                "border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60",
                borderStyle: "solid",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 3,
                    lineColor: "rgb(70,70,70)"
                }
            },
            childTopic: {
                "font-size": "17px",
                color: "rgb(68,68,68)",
                padding: "2px 9px 2px",
                "border-width": "2px",
                "-webkit-border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60",
                "border-image": "url(https://o9jaaw9j1.qnssl.com/border.png) 35 60 45 60",
                borderStyle: "solid",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(110,110,110)"
                }
            }
        },
        black: {
            background: "rgb(57, 60, 65)",
            thumbUrl: "/assets/images/mind/black.jpg",
            title: "heise",
            thinner: false,
            marginH: 40,
            marginW: 80,
            childMarginH: 12,
            childMarginW: 20,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "#e8eaec",
                color: "#333"
            },
            centerTopic: {
                backgroundColor: "#ff8200",
                color: "#fff",
                "border-radius": "35px",
                "font-size": "34px",
                padding: "16px 18px 16px 18px"
            },
            secTopic: {
                backgroundColor: "#e8eaec",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px 15px 10px 15px",
                "border-radius": "20px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 3,
                    lineColor: "#e8eaec"
                }
            },
            childTopic: {
                "font-size": "12px",
                color: "#ffffff",
                padding: "4px 10px",
                "border-radius": "20px",
                border: "1px solid #e8eaec",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 2,
                    lineColor: "#e8eaec"
                }
            }
        },
        simple: {
            background: "#f8f8f8",
            thinner: false,
            thumbUrl: "/assets/images/mind/simple.jpg",
            title: "简约",
            marginH: 26,
            marginW: 60,
            childMarginH: 8,
            childMarginW: 14,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "center"
            },
            connectionStyle: {
                lineWidth: 1,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "26px",
                "border-radius": "5px",
                padding: "14px 15px 13px 15px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "8px 12px 8px 12px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 1,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "13px",
                color: "rgb(68,68,68)",
                padding: "3px 6px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(170,170,170)",
                    underLine: true
                }
            }
        },
        basic: {
            background: "#fcf5de",
            thumbUrl: "/assets/images/mind/basic.png",
            thinner: false,
            title: "简约风格",
            marginH: 30,
            marginW: 80,
            childMarginH: 10,
            childMarginW: 12,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#50C28B",
                color: "#fff",
                "font-size": "30px",
                "border-radius": "5px",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid rgb(187,187,187)",
                "border-radius": "5px",
                color: "rgb(68,68,68)",
                "font-size": "17px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 2,
                    lineColor: "rgb(170,170,170)"
                }
            },
            childTopic: {
                "font-size": "14px",
                backgroundColor: "#ffffff",
                color: "rgb(68,68,68)",
                padding: "2px 9px 2px",
                border: "1px solid rgb(187,187,187)",
                "border-radius": "5px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "rgb(140,140,140)"
                }
            }
        },
        paper: {
            background: "#fcf5de",
            thumbUrl: "/assets/images/mind/paper.jpg",
            thinner: false,
            title: "简约风格",
            marginH: 30,
            marginW: 80,
            childMarginH: 14,
            childMarginW: 12,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "rgb(113, 203, 45)",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#ffffff",
                color: "#735C45",
                "font-size": "30px",
                "border-radius": "5px",
                border: "2px solid #3D474D",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                backgroundColor: "#ffffff",
                border: "1px solid #3D474D",
                "border-radius": "25px",
                color: "#735C45",
                "font-size": "16px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "curve",
                    lineWidth: 2,
                    lineColor: "#3D474D"
                }
            },
            childTopic: {
                "font-size": "14px",
                color: "#735C45",
                padding: "2px 9px 4px 9px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "#3D474D",
                    underLine: true
                }
            }
        },
        red: {
            background: "#fafafa",
            thumbUrl: "/assets/images/mind/red.jpg",
            thinner: false,
            title: "简约风格",
            marginH: 30,
            marginW: 80,
            childMarginH: 6,
            childMarginW: 16,
            common: {
                family: "微软雅黑",
                bold: false,
                italic: false,
                textAlign: "left"
            },
            connectionStyle: {
                lineWidth: 2,
                lineColor: "#eb5e41",
                color: "#ffffff"
            },
            centerTopic: {
                backgroundColor: "#eb5e41",
                color: "#ffffff",
                "font-size": "30px",
                padding: "14px 12px 14px 12px"
            },
            secTopic: {
                backgroundColor: "#eb5e41",
                color: "#fff",
                "font-size": "16px",
                padding: "10px 10px 10px 10px",
                lineStyle: {
                    lineType: "straight",
                    lineWidth: 2,
                    lineColor: "#eb5e41"
                }
            },
            childTopic: {
                "font-size": "13px",
                backgroundColor: "#f0f0f0",
                "border-bottom": "1px solid #eb5e41",
                color: "#735C45",
                "box-shadow": "1px 0px 0px #ccc",
                padding: "2px 9px 4px 9px",
                lineStyle: {
                    lineType: "roundBroken",
                    lineWidth: 1,
                    lineColor: "#eb5e41",
                    underLine: true
                }
            }
        }
    },
    getLineStyle: function(d) {
        var e = this.model
          , i = e.topic
          , k = this.util.copy(this.styles)
          , a = this.style;
        var f = {};
        var j = e.getTopicById(d.parent);
        if (k.autoColor) {
            if (!d.root) {
                var l = e.getParentTopic(d.parent);
                if (l.root) {
                    var g = document.getElementById(d.id).style;
                    var b = g.borderColor;
                    if (b != "") {
                        f.lineColor = b
                    }
                } else {
                    var c = $("#line_" + d.parent);
                    var h = c.attr("stroke");
                    if (h != "") {
                        f.lineColor = h
                    }
                }
            }
        } else {
            window.sessionStorage.removeItem("branchLineColors")
        }
        if (j.root) {
            f = $.extend(k.secTopic.lineStyle, f, d.lineStyle)
        } else {
            f = $.extend(k.childTopic.lineStyle, f, d.lineStyle)
        }
        return f
    },
    getStyle: function(k) {
        var g = this.model
          , h = g.topic
          , m = this.util.copy(this.styles)
          , c = this.style;
        var b = null;
        if (k.root || k.classic) {
            b = $.extend({}, m.common, m.centerTopic)
        } else {
            var l = g.getParentTopic(k.parent);
            if (l.root || k.free) {
                b = $.extend({}, m.common, m.secTopic)
            } else {
                b = $.extend({}, m.common, m.childTopic)
            }
        }
        if (h.theme == "caihongpao") {
            if (!k.root) {
                var n = g.getParentTopic(k.parent);
                if (n.root) {
                    var a = window.localStorage.getItem("branchTopicColors");
                    var d = c.getRadomColor();
                    var f = {};
                    f[k.id] = d;
                    a = $.extend(a, f);
                    window.localStorage.setItem("branchTopicColors", JSON.stringify(a));
                    b.backgroundColor = d;
                    b.border = "1px solid " + d
                } else {
                    var e = $(".topic-box[id=" + k.parent + "]");
                    var j = e.css("background-color");
                    b.backgroundColor = j;
                    b.border = "1px solid " + j
                }
            }
        } else {
            window.localStorage.removeItem("branchTopicColors")
        }
        b = $.extend(b, k.style);
        b.lineStype = $.extend(b.lineStyle, k.lineStyle);
        if (m.autoColor && b.border && b.lineStyle && !k.root) {
            var d = c.getLineColor();
            var i = b.border.substring(0, b.border.lastIndexOf(" "));
            b.border = i + " " + d
        }
        return b
    },
    setTopicStyle: function(g, d, b) {
        var e = g.util
          , h = g.style.getStyle.call(g, d)
          , a = d.style;
        if (g.opts.readonly) {
            return
        }
        if (d.style) {
            var i = $.extend(h, a);
            var c = e.getTopicDom(d.id);
            i["font-family"] = i["font-family"] != null ? i["font-family"] : i.family;
            i["font-style"] = i["font-style"] != null ? i["font-style"] : i.italic ? "italic" : "normal";
            i["font-weight"] = i["font-weight"] != null ? i["font-weight"] : i.bold ? "bold" : "normal";
            delete i.family;
            delete i.italic;
            delete i.bold;
            c.removeAttr("style");
            c.css(i);
            if (i["text-decoration"] != null && i["text-decoration"] != "none") {
                c.children(".topic").css("text-decoration", i["text-decoration"])
            } else {
                c.children(".topic").removeAttr("style")
            }
        } else {
            var c = e.getTopicDom(d.id);
            var f = g.style.getStyle.call(g, d);
            g.renderTopicStyle(c, d, f)
        }
    },
    setTopicLineStyle: function(h, d, c) {
        var b = h.util
          , g = h.style.getStyle.call(h, d)
          , f = d.lineStyle;
        if (h.opts.readonly || d.id == "root") {
            return
        }
        if (f == null && g.lineStyle == null) {
            return
        }
        var a = $.extend(g.lineStyle, f);
        var e = document.getElementById("line_" + d.id);
        if (e != null) {
            e.removeAttribute("stroke");
            e.removeAttribute("stroke-width");
            e.setAttribute("stroke-width", a.lineWidth);
            e.setAttribute("stroke", a.lineColor)
        }
    },
    setTopicStyles: function(l, i, p, a, b) {
        var k = l.util
          , q = l.line
          , j = l.model;
        var o = l.operation.zoomVal / 100;
        if (l.opts.readonly) {
            return
        }
        p = k.copy(p);
        var c = j.getSubTopic(i);
        var f = k.getTopicContainerProp(c.id, o);
        var d = k.copy(i.style);
        i.style = k.copy(p);
        i.lineStyle = k.copy(p.lineStyle);
        if (i.lineStyle != null) {
            delete i.lineStyle.lineType;
            delete i.lineStyle.underLine
        }
        p = l.style.getStyle.call(l, i);
        var e = k.getTopicDom(i.id);
        p["font-family"] = p["font-family"] != null ? p["font-family"] : p.family;
        p["font-style"] = p["font-style"] != null ? p["font-style"] : p.italic ? "italic" : "normal";
        p["font-weight"] = p["font-weight"] != null ? p["font-weight"] : p.bold ? "bold" : "normal";
        delete p.family;
        delete p.italic;
        delete p.bold;
        delete p.lineStyle.lineType;
        delete p.lineStyle.underLine;
        e.removeAttr("style");
        e.css(p);
        if (p["text-decoration"] != null && p["text-decoration"] != "none") {
            e.children(".topic").css("text-decoration", p["text-decoration"])
        } else {
            e.children(".topic").removeAttr("style")
        }
        l.style.setTopicLineStyle(l, i, a);
        var n = k.getTopicContainerProp(c.id, o);
        var g = (n.h - f.h) / 2;
        var m = n.w - f.w;
        l.range.doChangeSubTopicPos(l, c, g, m, a, true);
        l.resetTopicExpandPos(e, root.structure);
        l.connection.resetAllConnectionPos.call(l, root);
        l.summary.rangeSummaryTopics.call(l, true);
        if (i.root) {
            a = "left,right,";
            q.resetSubLines.call(l, a)
        } else {
            q.resetLines.call(l, [c.id], g, a)
        }
        if (b == null) {
            l.messageSource.send.call(l, "setTopicStyle", {
                content: i.id,
                original: d,
                update: p,
                part: a
            })
        }
        k.resetSelectDom()
    }
};
mindDesigner.prototype.messageSource = {
    checkLocalStorage: function() {
        if (window.localStorage) {
            return true
        } else {
            return false
        }
    },
    saveLocal: function(d) {
        var b = d.model
          , a = b.topic
          , c = d.opts;
        if (c.readonly) {
            return
        }
        var e = a.id;
        localStorage.setItem("def_" + c.chartId, JSON.stringify(a))
    },
    checkLocalValue: function(b) {
        var a = localStorage.getItem("def_" + b);
        return a ? a : null
    },
    isUndo: true,
    messages: [],
    send: function(d, c) {
        var b = this
          , a = b.messageSource;
        a.messages.push({
            action: d,
            content: c
        });
        b.events.push("savelocal");
        a.submit(b)
    },
    submit: function(b) {
        var a = this;
        if (a.messages.length > 0) {
            if (a.isUndo) {
                a.undoStack.push(a, a.messages)
            }
        }
        if (typeof mindColla != "undefined") {
            mindColla.send(a.messages)
        }
        a.messages = []
    },
    undoStack: {
        stack: [],
        push: function(c, b, a) {
            this.stack.push(b);
            if (typeof a == "undefined") {
                a = true
            }
            if (a) {
                c.redoStack.stack = []
            }
            mind.events.push("undoStackChanged", this.stack.length)
        },
        pop: function(e) {
            var d = this
              , b = d.stack
              , a = b.length;
            if (a == 0) {
                return null
            }
            var c = b[a - 1];
            b.splice(a - 1, 1);
            e.messageSource.redoStack.push(c);
            e.events.push("undoStackChanged", this.stack.length);
            return c
        }
    },
    redoStack: {
        stack: [],
        push: function(a) {
            this.stack.push(a);
            mind.events.push("redoStackChanged", this.stack.length)
        },
        pop: function(e) {
            var d = this
              , b = d.stack
              , a = b.length;
            if (a == 0) {
                return null
            }
            var c = b[a - 1];
            b.splice(a - 1, 1);
            e.messageSource.undoStack.push(e.messageSource, c, false);
            e.events.push("redoStackChanged", this.stack.length);
            return c
        }
    },
    undo: function(f) {
        var d = f.messageSource
          , e = f.connection
          , c = f.model
          , g = f.operation;
        var b = d.undoStack.pop(f);
        if (b == null) {
            return
        }
        var a = b.length;
        d.doWithoutUndo(function() {
            for (var T = 0; T < a; T++) {
                var L = b[T]
                  , k = L.action
                  , r = L.content;
                if (k == "create") {
                    var M = r.content;
                    f.model.removeTopic.call(f, M)
                } else {
                    if (k == "delete") {
                        var M = r.content
                          , w = r.index
                          , V = r.parts;
                        f.model.addTopicMulti.call(f, M, w, V);
                        var R = M.length - 1;
                        f.util.selectOne.call(f, M[R])
                    } else {
                        if (k == "updateTitle") {
                            var J = r.content
                              , z = r.original;
                            var A = c.getTopicById(J);
                            f.model.updateTopicText.call(f, A, z);
                            f.util.selectOne.call(f, A)
                        } else {
                            if (k == "updateImage") {
                                var J = r.content
                                  , z = r.original
                                  , F = r.update
                                  , t = r.resize;
                                var A = c.getTopicById(J);
                                var N = f.util.copy(A);
                                N.image = z;
                                f.model.updateTopicImage.call(f, N, A, t);
                                f.util.selectOne.call(f, A)
                            } else {
                                if (k == "setTheme") {
                                    var z = r.original;
                                    f.style.setThemeDirect.call(f, z)
                                } else {
                                    if (k == "updateStructure") {
                                        var z = r.original;
                                        g.changeStructure.call(f, z)
                                    } else {
                                        if (k == "deleteConnection") {
                                            var G = r.content;
                                            f.connection.createConnectionByLines(f, G);
                                            f.connection.addConnectionMulti(f, G)
                                        } else {
                                            if (k == "addConnection") {
                                                var G = r.content;
                                                f.connection.deleteConnectionMulti(f, G)
                                            } else {
                                                if (k == "updateConnection") {
                                                    var p = r.content
                                                      , Q = r.original;
                                                    e.updateConnection(f, Q, p);
                                                    e.createConnectionByLines(f, [Q])
                                                } else {
                                                    if (k == "updatePos") {
                                                        var v = r.content
                                                          , o = r.original
                                                          , H = r.newIndex
                                                          , W = r.oldIndex
                                                          , P = r.oldPart
                                                          , j = r.newPart;
                                                        f.model._updateTopicPos.call(f, o, W, v, H, j, P);
                                                        f.util.selectOne.call(f, v[0])
                                                    } else {
                                                        if (k == "changeToFreeTopic") {
                                                            var n = r.content
                                                              , x = r.original
                                                              , E = r.index
                                                              , s = r.part;
                                                            var X = f.util.copy(n)
                                                              , q = c.getTopicById(x)
                                                              , K = q.children
                                                              , h = {};
                                                            X.parent = x;
                                                            if (s == "left" && q.root) {
                                                                K = q.leftChildren
                                                            }
                                                            delete X.pos;
                                                            delete X.free;
                                                            var u = c.getTopicByIndex(E - 1, K);
                                                            if (u == null) {
                                                                h.id = x;
                                                                h.pos = "in";
                                                                h.index = E
                                                            } else {
                                                                h.id = u.id;
                                                                h.pos = "after"
                                                            }
                                                            f.model.updateTopicPos.call(f, [X], h, true, s);
                                                            f.util.selectOne.call(f, X)
                                                        } else {
                                                            if (k == "updateFreeTopic") {
                                                                var C = r.content
                                                                  , m = r.original
                                                                  , I = r.topicId;
                                                                var X = c.getTopicById(I);
                                                                var Y = r.oldLines
                                                                  , G = r.lines;
                                                                c.updateFreeTopicPos.call(f, X, m, Y, G)
                                                            } else {
                                                                if (k == "update") {
                                                                    var A = r.content
                                                                      , S = r.original
                                                                      , X = r.type;
                                                                    c.updateTopicNode.call(f, S, A, X, true)
                                                                } else {
                                                                    if (k == "addFreeTopic") {
                                                                        var A = r.content;
                                                                        f.model.removeTopic.call(f, [A])
                                                                    } else {
                                                                        if (k == "updateBg") {
                                                                            var y = r.original;
                                                                            f.operation.setBackground.call(f, y, true)
                                                                        } else {
                                                                            if (k == "setThemeOverWrite") {
                                                                                var D = r.original;
                                                                                var O = r.tps;
                                                                                f.style.setThemeOverWrite_.call(f, D, O, "add")
                                                                            } else {
                                                                                if (k == "setTopicStyle") {
                                                                                    var B = r.original;
                                                                                    var I = r.content;
                                                                                    var X = c.getTopicById(I);
                                                                                    var s = r.part;
                                                                                    f.style.setTopicStyles(f, X, B, s)
                                                                                } else {
                                                                                    if (k == "changetopicexpand") {
                                                                                        var Z = r.type == "show" ? "hide" : "show";
                                                                                        var I = r.content;
                                                                                        f.operation.showOrHideChildren.call(f, I, Z)
                                                                                    } else {
                                                                                        if (k == "insertParent") {
                                                                                            var A = r.content
                                                                                              , S = r.original
                                                                                              , s = r.part;
                                                                                            f.model.unInsertParentTopic.call(f, A, S, s)
                                                                                        } else {
                                                                                            if (k == "addSummaryTopic") {
                                                                                                var U = r.content;
                                                                                                f.model.removeTopic.call(f, U)
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    },
    redo: function(f) {
        var d = f.messageSource
          , e = f.connection
          , c = f.model
          , g = f.operation;
        var b = d.redoStack.pop(f);
        if (b == null) {
            return
        }
        var a = b.length;
        d.doWithoutUndo(function() {
            for (var P = 0; P < a; P++) {
                var H = b[P]
                  , j = H.action
                  , q = H.content;
                if (j == "create") {
                    var I = q.content
                      , B = q.index
                      , R = q.parts;
                    f.model.addTopicMulti.call(f, I, B, R);
                    var N = I.length - 1;
                    f.util.selectOne.call(f, I[N])
                } else {
                    if (j == "delete") {
                        var I = q.content;
                        f.model.removeTopic.call(f, I)
                    } else {
                        if (j == "updateTitle") {
                            var G = q.content
                              , C = q.update;
                            var x = c.getTopicById(G);
                            f.model.updateTopicText.call(f, x, C);
                            f.util.selectOne.call(f, x)
                        } else {
                            if (j == "updateImage") {
                                var G = q.content
                                  , C = q.update
                                  , w = q.original
                                  , s = q.resize;
                                var x = c.getTopicById(G);
                                var J = f.util.copy(x);
                                J.image = C;
                                f.model.updateTopicImage.call(f, J, x, s);
                                f.util.selectOne.call(f, x)
                            } else {
                                if (j == "setTheme") {
                                    var q = q.content;
                                    f.style.setThemeDirect.call(f, q)
                                } else {
                                    if (j == "updateStructure") {
                                        var q = q.content;
                                        g.changeStructure.call(f, q)
                                    } else {
                                        if (j == "deleteConnection") {
                                            var D = q.content;
                                            f.connection.deleteConnectionMulti(f, D)
                                        } else {
                                            if (j == "addConnection") {
                                                var D = q.content;
                                                f.connection.createConnectionByLines(f, D);
                                                f.connection.addConnectionMulti(f, D)
                                            } else {
                                                if (j == "updateConnection") {
                                                    var o = q.content
                                                      , M = q.original;
                                                    e.updateConnection(f, o, M);
                                                    e.createConnectionByLines(f, [o])
                                                } else {
                                                    if (j == "updatePos") {
                                                        var t = q.content
                                                          , n = q.original
                                                          , E = q.newIndex
                                                          , S = q.oldIndex
                                                          , L = q.oldPart
                                                          , h = q.newPart;
                                                        f.model._updateTopicPos.call(f, t, E, n, S, L, h);
                                                        f.util.selectOne.call(f, n[0])
                                                    } else {
                                                        if (j == "changeToFreeTopic") {
                                                            var m = q.content
                                                              , u = q.original
                                                              , B = q.index;
                                                            var p = f.util.copy(m);
                                                            var z = p.pos;
                                                            delete p.pos;
                                                            delete p.free;
                                                            p.parent = u;
                                                            c.changeToFreeTopic.call(f, p, z)
                                                        } else {
                                                            if (j == "updateFreeTopic") {
                                                                var z = q.content
                                                                  , k = q.original
                                                                  , F = q.topicId;
                                                                var T = c.getTopicById(F);
                                                                c.updateFreeTopicPos.call(f, T, z)
                                                            } else {
                                                                if (j == "update") {
                                                                    var x = q.content
                                                                      , O = q.original
                                                                      , T = q.type;
                                                                    c.updateTopicNode.call(f, x, O, T, true)
                                                                } else {
                                                                    if (j == "addFreeTopic") {
                                                                        var x = q.content;
                                                                        c.addFreeTopic(x, x.pos, f)
                                                                    } else {
                                                                        if (j == "updateBg") {
                                                                            var v = q.content;
                                                                            f.operation.setBackground.call(f, v, true)
                                                                        } else {
                                                                            if (j == "setThemeOverWrite") {
                                                                                var A = q.content;
                                                                                var K = q.tps;
                                                                                f.style.setThemeOverWrite_.call(f, A, K, "delete")
                                                                            } else {
                                                                                if (j == "setTopicStyle") {
                                                                                    var y = q.update;
                                                                                    var F = q.content;
                                                                                    var T = c.getTopicById(F);
                                                                                    var r = q.part;
                                                                                    f.style.setTopicStyles(f, T, y, r)
                                                                                } else {
                                                                                    if (j == "changetopicexpand") {
                                                                                        var U = q.type;
                                                                                        var F = q.content;
                                                                                        f.operation.showOrHideChildren.call(f, F, U)
                                                                                    } else {
                                                                                        if (j == "insertParent") {
                                                                                            var x = q.content
                                                                                              , O = q.original
                                                                                              , r = q.part;
                                                                                            f.model.insertParentTopic.call(f, x, O, r)
                                                                                        } else {
                                                                                            if (j == "addSummaryTopic") {
                                                                                                var Q = q.content;
                                                                                                f.summary.addSummarys.call(f, Q)
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    },
    doWithoutUndo: function(a) {
        this.isUndo = false;
        a();
        this.isUndo = true
    },
    excuteMsgDirect: function(J, E) {
        var D = this
          , c = D.model
          , B = J.uk
          , K = J.client
          , u = J.msg
          , T = []
          , s = D.operation;
        for (var O = 0; O < u.length; O++) {
            var F = u[O]
              , b = F.action
              , j = F.content;
            if (b == "create") {
                var G = j.content
                  , w = j.index
                  , P = j.parts;
                c.addTopicMulti.call(D, G, w, P, true);
                T.push(G[0].id)
            } else {
                if (b == "delete") {
                    var G = j.content;
                    D.model.removeTopic.call(D, G, true)
                } else {
                    if (b == "updateTitle") {
                        var C = j.content
                          , x = j.update;
                        var p = c.getTopicById(C);
                        D.model.updateTopicText.call(D, p, x, true);
                        T.push(p.id)
                    } else {
                        if (b == "updateImage") {
                            var C = j.content
                              , x = j.update
                              , q = j.original
                              , l = j.resize;
                            var p = c.getTopicById(C);
                            var H = D.util.copy(p);
                            H.image = x;
                            D.model.updateTopicImage.call(D, H, p, l, true);
                            T.push(p.id)
                        } else {
                            if (b == "setTheme") {
                                var j = j.content;
                                D.style.setThemeDirect.call(D, j, true)
                            } else {
                                if (b == "updateStructure") {
                                    var j = j.content;
                                    s.changeStructure.call(D, j, null, true)
                                } else {
                                    if (b == "deleteConnection") {
                                        var y = j.content;
                                        D.connection.deleteConnectionMulti(D, y, true)
                                    } else {
                                        if (b == "addConnection") {
                                            var y = j.content;
                                            D.connection.createConnectionByLines(D, y);
                                            D.connection.addConnectionMulti(D, y, true)
                                        } else {
                                            if (b == "updateConnection") {
                                                var g = j.content
                                                  , M = j.original;
                                                D.connection.updateConnection(D, g, M, true);
                                                D.connection.createConnectionByLines(D, [g])
                                            } else {
                                                if (b == "updatePos") {
                                                    var m = j.content
                                                      , f = j.original
                                                      , z = j.newIndex
                                                      , Q = j.oldIndex
                                                      , L = j.oldPart
                                                      , a = j.newPart;
                                                    D.model._updateTopicPos.call(D, m, z, f, Q, L, a, true)
                                                } else {
                                                    if (b == "changeToFreeTopic") {
                                                        var e = j.content
                                                          , n = j.original
                                                          , w = j.index;
                                                        var h = D.util.copy(e);
                                                        var t = h.pos;
                                                        delete h.pos;
                                                        delete h.free;
                                                        h.parent = n;
                                                        c.changeToFreeTopic.call(D, h, t, true)
                                                    } else {
                                                        if (b == "updateFreeTopic") {
                                                            var t = j.content
                                                              , d = j.original
                                                              , A = j.topicId;
                                                            var R = c.getTopicById(A);
                                                            c.updateFreeTopicPos.call(D, R, t, null, null, true)
                                                        } else {
                                                            if (b == "update") {
                                                                var p = j.content
                                                                  , N = j.original
                                                                  , R = j.type;
                                                                c.updateTopicNode.call(D, p, N, R, true, true);
                                                                T.push(p.id)
                                                            } else {
                                                                if (b == "addFreeTopic") {
                                                                    var p = j.content;
                                                                    c.addFreeTopic(p, p.pos, D, true);
                                                                    T.push(p.id)
                                                                } else {
                                                                    if (b == "updateBg") {
                                                                        var o = j.content;
                                                                        D.operation.setBackground.call(D, o, true, true)
                                                                    } else {
                                                                        if (b == "setThemeOverWrite") {
                                                                            var v = j.content;
                                                                            var I = j.tps;
                                                                            D.style.setThemeOverWrite_.call(D, v, I, "delete", true)
                                                                        } else {
                                                                            if (b == "setTopicStyle") {
                                                                                var r = j.update;
                                                                                var A = j.content;
                                                                                var R = c.getTopicById(A);
                                                                                var k = j.part;
                                                                                D.style.setTopicStyles(D, R, r, k, true);
                                                                                T.push(R.id)
                                                                            } else {
                                                                                if (b == "changetopicexpand") {
                                                                                    var S = j.type;
                                                                                    var A = j.content;
                                                                                    D.operation.showOrHideChildren.call(D, A, S, true);
                                                                                    T.push(A)
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (E != null) {
            E(T, B)
        }
    }
};
mindDesigner.prototype.plugins = {
    showContextMenu: function(j, b) {
        var n = this
          , l = n.model
          , m = n.util
          , e = n.connection
          , g = n.operation
          , h = n.plugins;
        n.events.push("hidepopeditor");
        n.operation.hideLink();
        var i = $(window).width()
          , f = $(window).height();
        var c = $(".mind-context-menu");
        if (c.is(":visible")) {
            return
        }
        c.attr("activeId", b);
        c.hide();
        var d = g.zoomVal / 100;
        var q = m.getRealPos.call(n, j.offset().left, j.offset().top);
        var a = {
            x: q.x,
            y: q.y,
            h: j.outerHeight(),
            w: j.outerWidth()
        };
        c.appendTo(n.designer);
        c.css({
            left: a.x + a.w,
            top: a.y - 30,
            opacity: 0
        }).show();
        var p = a.x + a.w;
        var o = a.y - 30;
        if (j.offset().top - 30 + c.outerHeight() > f) {
            n.events.push("scrollTop", j.offset().top - 30 + c.outerHeight() - f)
        }
        if (j.offset().left + a.w + c.outerWidth() > i) {
            n.events.push("scrollLeft", j.offset().left + a.w + c.outerWidth() - i)
        }
        c.stop().animate({
            left: p,
            top: o,
            opacity: 1,
            "z-index": 9
        }, 10);
        var k = l.getTopicById(b);
        mind.events.push("setContextMenu", k);
        c.children(".mind-context-menu-content").find("li").off().on("click", function(t) {
            var s = $(this)
              , v = s.attr("op");
            if (s.hasClass("disable")) {
                return
            }
            if (v == "copy") {
                var r = m.selectedIds;
                if (r.length > 0) {
                    l.doCopy.call(n, r)
                }
            } else {
                if (v == "cut") {
                    var r = m.selectedIds;
                    if (r.length > 0) {
                        l.doCut.call(n, r)
                    }
                } else {
                    if (v == "paste") {
                        var r = m.getSelectedId();
                        if (r != "") {
                            l.doPaste.call(n, r)
                        }
                        var u = l.getTopicById(r);
                        m.selectOne.call(n, u)
                    } else {
                        if (v == "insert-child") {
                            var u = g.appendTopic.call(n, true);
                            mind.events.push("setDock", u)
                        } else {
                            if (v == "remark") {
                                mind.events.push("showRightMenu", "remark")
                            } else {
                                if (v == "link") {
                                    mind.events.push("showRightMenu", "link")
                                } else {
                                    if (v == "tag") {
                                        mind.events.push("showRightMenu", "tag")
                                    } else {
                                        if (v == "task") {
                                            mind.events.push("showRightMenu", "task")
                                        } else {
                                            if (v == "style") {
                                                mind.events.push("showRightMenu", "style")
                                            } else {
                                                if (v == "insert-siblings") {
                                                    g.appendTopic.call(n, false)
                                                } else {
                                                    if (v == "insert-parent") {
                                                        g.insertParent.call(n, k)
                                                    } else {
                                                        if (v == "insert-connection") {
                                                            e.render.call(mind, t)
                                                        } else {
                                                            if (v == "delete") {
                                                                g.removeTopic.call(n)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            h.hideContextMenu()
        })
    },
    hideContextMenu: function() {
        var a = $(".mind-context-menu");
        a.hide()
    },
    showConnectionTip: function(a) {
        var d = $(".mind-connection-menu");
        var c = $(".mind-connection-con[conn=" + a.id + "]").find(".mind-icons")
          , b = c.offset();
        d.css({
            left: b.left + c.outerWidth() + 10,
            top: b.top + c.outerHeight() / 2 - 4
        });
        d.show()
    },
    hideConnectionTip: function() {
        var a = $(".mind-connection-menu");
        a.hide()
    },
    showIconsMenu: function(h, e) {
        var f = this
          , c = f.icons;
        $("#mind-icons-box").remove();
        var a = $("<div id='mind-icons-box'></div>").appendTo(f.designer);
        var b = c.icons;
        var i = b[h.name];
        d(i, e);
        function j(k) {
            $(document).off("mouseup.icons").on("mouseup.icons", function(l) {
                $("#mind-icons-box").remove();
                k.removeClass("selected")
            });
            $(document).on("mouseup.icons", "#mind-icons-box", function(l) {
                l.stopPropagation()
            });
            $(document).on("mousedown.icons", "#mind-icons-box", function(l) {
                l.stopPropagation()
            });
            $(document).off("click.icons").on("click.icons", "#mind-icons-box .mind-icons", function(l) {
                var m = $(this);
                if (m.attr("remove")) {
                    c.removeIcon.call(f);
                    a.remove()
                } else {
                    c.setIcon.call(f, m, true)
                }
                l.stopPropagation()
            });
            $(document).off("click.iconcolors").on("click.iconcolors", ".mind-icons-color span", function(m) {
                var n = $(this)
                  , l = n.css("background-color");
                c.setIconColor.call(f, l);
                m.stopPropagation()
            })
        }
        function d(p, r) {
            var o = ["<div>"];
            for (var n = 0, k = p.length; n < k; n++) {
                var q = p[n];
                o.push("<span n='" + h.name + "' ico='" + q.index + "' class='mind-icons'>" + q.text + "</span>")
            }
            o.push("<span remove='true' style='color:#ff0000;' class='mind-icons'>&#xe60c;</span><span style='clear:both;'></span></div>");
            a.css({
                left: r.offset().left,
                top: r.offset().top + 36
            });
            o.push("<div style='clear:both;min-height:1px;'></div><div class='mind-icons-color'>");
            var l = mind.style.baseColor();
            for (var n = 0, k = l.length; n < k; n++) {
                var m = l[n];
                o.push("<span style='background:" + m + ";'></span>")
            }
            o.push("</div>");
            a.html(o.join(""));
            g(h, a, r);
            j(r)
        }
        function g(l, k, m) {
            k.find("span").removeClass("selected");
            if (l.name == "") {
                m.parent().find("span[n='']").each(function() {
                    var n = $(this);
                    k.find("span[ico=" + n.attr("ico") + "]").addClass("selected")
                })
            } else {
                k.find("span[ico=" + l.index + "]").addClass("selected")
            }
        }
    },
    selectDefaultIcon: function() {},
    hideIconsMenu: function() {},
    showGlobalMenu: function(c, a, d) {
        var b = $(".mind-context-global-menu");
        if (b.length) {
            b.css({
                left: a,
                top: d,
                opacity: 1
            }).show();
            b.find("li").off().on("click", function(g) {
                var f = $(this)
                  , h = f.attr("op");
                if (f.hasClass("disable")) {
                    return
                }
                if (h == "torefresh") {
                    window.location.reload()
                } else {
                    if (h == "tonew") {
                        c.events.push("toNew")
                    } else {
                        if (h == "insert-free") {} else {
                            if (h == "tocenter") {
                                c.operation.moveToCenter.call(c)
                            }
                        }
                    }
                }
                c.plugins.closeGlobalMenu()
            })
        }
    },
    closeGlobalMenu: function(a, c) {
        var b = $(".mind-context-global-menu");
        if (b.length) {
            b.hide().css({
                opacity: 0
            })
        }
    },
    navigator: {
        baseCalc: null,
        globalPos: null,
        init: function() {
            var g = this
              , j = g.plugins.navigator;
            var a = $(".mind-canvas-con");
            if (a.length == 0) {
                var d = ""
                  , h = "关闭视图导航";
                if (showCanvas == "false") {
                    d = 'style="display:none;"';
                    h = "显示视图导航"
                }
                a = $('<div class="mind-canvas-con"><div ' + d + ' class="mind-canvas"><canvas></canvas></div><div class="mind-canvas-op"></div></div>');
                $("body").append(a);
                var f = a.children(".mind-canvas-op");
                var c = '<span tit="full" title="全屏" title_pos="top" class="mind-icons">&#xe665;</span><span title="' + h + '" title_pos="top" tit="close" style="vertical-align:-1px;" class="mind-icons">&#xe705;</span><span title="定位到中心主题" title_pos="top" tit="focus" class="mind-icons">&#xe60e;</span><span title="缩小" title_pos="top" tit="zoomout" class="mind-icons mind-zoomout">&#xe615;</span><span title="放大" title_pos="top" tit="zoomin" class="mind-icons mind-zoomin">&#xe630;</span><span title_pos="top" title="还原" tit="zoomtext" class="mind-zoomtxt">100%</span>';
                f.append(c);
                if (showCanvas == "false") {
                    f.children("[tit=close]").addClass("active");
                    f.children("[tit=close]").html("&#xe706;")
                }
            }
            var i = j.calcPos(false, true)
              , e = 250
              , b = 171;
            j.globalPos = i;
            var k = j.calcCanvasSize(i, e, b);
            j.setCanvasStyle(k.w, k.h);
            j.render(i, k, e, b);
            j.initEvent(g)
        },
        initEvent: function(c) {
            var d = $(".mind-canvas-con")
              , e = d.children(".mind-canvas-op");
            var b = $("#mind_con").children(".mind-designer");
            var a = this;
            e.children().off("mousedown").on("mousedown", function() {
                $(document).on("selectstart", function() {
                    return false
                });
                var h = $(this)
                  , f = h.attr("tit");
                if (f == "full") {
                    var g = document.documentElement;
                    if (g.requestFullscreen) {
                        g.requestFullscreen()
                    } else {
                        if (g.mozRequestFullScreen) {
                            g.mozRequestFullScreen()
                        } else {
                            if (g.webkitRequestFullscreen) {
                                g.webkitRequestFullscreen()
                            } else {
                                $.showTip("当前浏览器不支持全屏操作，请使用其他浏览器尝试", 2000)
                            }
                        }
                    }
                } else {
                    if (f == "focus") {
                        c.operation.moveToCenter.call(c)
                    } else {
                        if (f == "zoomout") {
                            c.operation.zoomOut.call(c, c.designer);
                            var i = c.operation.zoomVal;
                            d.find(".mind-zoomtxt").text(i + "%")
                        } else {
                            if (f == "zoomin") {
                                c.operation.zoomIn.call(c, c.designer);
                                var i = c.operation.zoomVal;
                                d.find(".mind-zoomtxt").text(i + "%")
                            } else {
                                if (f == "zoomtext") {
                                    c.operation.zoomVal = 85;
                                    c.operation.zoomIn.call(c, c.designer);
                                    d.find(".mind-zoomtxt").text("100%")
                                } else {
                                    if (f == "close") {
                                        if (h.hasClass("active")) {
                                            a.showCanvas();
                                            h.removeClass("active");
                                            c.operation.setConfig("canvas", "true");
                                            h.attr("title", "关闭视图导航");
                                            h.html("&#xe705;")
                                        } else {
                                            a.hideCanvas();
                                            h.addClass("active");
                                            h.html("&#xe706;");
                                            c.operation.setConfig("canvas", "false");
                                            h.attr("title", "显示视图导航")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            e.children().off("mouseup").on("mouseup", function() {
                $(document).off("selectstart")
            })
        },
        resetCanvas: true,
        showCanvas: function() {
            var a = $(".mind-canvas");
            a.show()
        },
        hideCanvas: function() {
            var a = $(".mind-canvas");
            a.hide()
        },
        render: function(f, j, g, e) {
            if (!this.resetCanvas) {
                return
            }
            var d = $("#mind_con")
              , i = d.children(".mind-designer")
              , a = i.find(".topic-box");
            var b = $(".mind-canvas").children("canvas")[0];
            var h = b.getContext("2d");
            h.clearRect(0, 0, b.width, b.height);
            var c = j.w / f.w;
            this.baseCalc = c;
            a.each(function(p, n) {
                var r = $(n)
                  , o = r.offset()
                  , k = r.attr("id");
                var u = o.left
                  , s = o.top
                  , v = r.outerWidth() * (c)
                  , q = r.outerHeight() * (c);
                var m = (u - f.x) * (c);
                var l = (s - f.y) * (c);
                var t = r[0].style.backgroundColor;
                h.save();
                if (k == "root") {
                    if (t == "rgb(255, 255, 255)") {
                        t = "#57a8ca"
                    }
                    h.fillStyle = t
                } else {
                    h.fillStyle = "#d0d0d0"
                }
                h.fillRect(m, l, v, q);
                h.restore()
            });
            this.renderViewport(f, c)
        },
        renderViewport: function() {
            if (!this.resetCanvas) {
                return
            }
            var b = $(".mind-canvas")
              , c = b.find("canvas");
            if (c.length == 0) {
                return
            }
            var e = this.baseCalc;
            var i = this.calcPos(false, true);
            this.globalPos = i;
            var g = this.calcPos(true, false);
            if (isNaN(g.w) || isNaN(g.h)) {
                $(".viewport").hide();
                return
            } else {
                $(".viewport").show()
            }
            var d = c.position().left
              , h = c.position().top;
            var a = g.x - i.x
              , k = g.y - i.y;
            var j = b.children(".viewport");
            if (j.length == 0) {
                j = $('<div class="viewport"></div>');
                $(".mind-canvas").append(j)
            }
            f();
            function f() {
                var l = g.w * e;
                var m = g.h * e;
                j.css({
                    left: a * e + d,
                    top: k * e + h,
                    width: l - 4,
                    height: m - 4
                })
            }
            this.initViewportEvent()
        },
        initViewportEvent: function(f) {
            var d = $(".mind-canvas")
              , b = d.find("canvas");
            var f = d.children(".viewport");
            var c = this.baseCalc;
            var a = this;
            var e = $(document);
            f.on("mousedown", function(l) {
                var o = l.pageX
                  , n = l.pageY;
                var r = f.position().left
                  , q = f.position().top;
                var s = f.outerWidth()
                  , m = f.outerHeight();
                var i = f.parent()
                  , p = i.width()
                  , j = i.height();
                var k = $("#mind_con")
                  , h = k.scrollLeft()
                  , g = k.scrollTop();
                e.on("selectstart", function() {
                    return false
                });
                e.off("mousemove.nav").on("mousemove.nav", function(z) {
                    var x = z.pageX
                      , y = z.pageY;
                    var v = x - o
                      , t = y - n;
                    var w = r + v;
                    var u = q + t;
                    f.css({
                        left: w,
                        top: u
                    });
                    k.scrollLeft(h + v / c);
                    k.scrollTop(g + t / c);
                    z.stopPropagation()
                });
                e.off("mouseup.nav").on("mouseup.nav", function(t) {
                    e.off("mousemove.nav");
                    e.off("mouseup.nav");
                    e.off("selectstart");
                    t.stopPropagation()
                });
                l.stopPropagation()
            });
            d.off("mousedown").on("mousedown", function(n) {
                var m = $("#mind_con")
                  , j = m.scrollLeft()
                  , g = m.scrollTop();
                var r = d.children(".viewport");
                if (!r.is(":visible")) {
                    r.css({
                        width: 120,
                        height: 60,
                        left: 65,
                        top: 55.5
                    }).show();
                    mind.operation.moveToCenter.call(mind);
                    n.stopPropagation();
                    return
                }
                var k = r.position().left;
                var i = r.position().top;
                var q = r.width();
                var l = r.height();
                var p = n.offsetX - q / 2
                  , o = n.offsetY - l / 2;
                r.css({
                    left: p,
                    top: o
                });
                m.scrollLeft(j + (p - k) / c);
                m.scrollTop(g + (o - i) / c);
                a.renderViewport();
                n.stopPropagation()
            });
            d.off("mouseup").on("mouseup", function(g) {
                e.off("mousemove.nav");
                e.off("mouseup.nav");
                e.off("selectstart");
                a.renderViewport();
                g.stopPropagation()
            })
        },
        setCanvasStyle: function(a, e) {
            var b = $("#mind_con")
              , d = b.children(".mind-designer");
            var c = $(".mind-canvas").children("canvas")[0];
            c.width = a;
            c.height = e
        },
        calcCanvasSize: function(e, a, c) {
            var b = e.w * c / e.h
              , d = c;
            if (b > a) {
                b = a;
                d = e.h * a / e.w
            }
            return {
                w: b,
                h: d
            }
        },
        calcPos: function(h, d) {
            var b = null;
            if (d) {
                b = $(".mind-designer").children(".topic-container")
            } else {
                b = $(".mind-designer").find(".topic-box")
            }
            var f = "first"
              , e = 0
              , c = 0
              , a = 0;
            var i = $(window).width()
              , g = $(window).height();
            b.each(function(k, m) {
                var j = $(m)
                  , l = j.offset();
                if (h && l.left < 0) {
                    return true
                } else {
                    if (h && l.top < 0) {
                        return true
                    } else {
                        if (h && l.top + j.outerHeight() > g) {
                            return true
                        } else {
                            if (h && l.left + j.outerWidth() > i) {
                                return true
                            }
                        }
                    }
                }
                if (f == "first") {
                    f = l.left;
                    e = l.top
                }
                if (l.left < f) {
                    f = l.left
                }
                if (l.top < e) {
                    e = l.top
                }
                if (l.left + j.outerWidth() > c) {
                    c = l.left + j.outerWidth()
                }
                if (l.top + j.outerHeight() > a) {
                    a = l.top + j.outerHeight()
                }
            });
            return {
                x: f,
                y: e,
                w: c - f,
                h: a - e
            }
        }
    },
    presenter: {
        sliders: [],
        sliderIndex: 0,
        selecting: false,
        presenting: false,
        presentingIndex: 0,
        beforeSelecting: false,
        ready: function(a) {
            if (this.sliders.length == 0) {
                $.showTip("close");
                $.showTip("[ Cril + 拖拽 ] 选择并添加幻灯片", 2000);
                return
            }
            a.util.clearSelect();
            a.events.push("hideElements");
            this.renderControls(a);
            this.presenting = true
        },
        calcScale: function(d) {
            var e = $(window).width() - 80
              , c = $(window).height() - 40;
            var b = e / d.w
              , a = c / d.h;
            if (b <= a) {
                return b
            } else {
                return a
            }
        },
        keyEvent: function(b, a) {
            if (b.keyCode == 37 || b.keyCode == 38) {
                if (this.presenting) {
                    this.prevSlide(a)
                }
            } else {
                if (b.keyCode == 39 || b.keyCode == 40) {
                    if (this.presenting) {
                        this.nextSlide(a)
                    }
                } else {
                    if (b.keyCode == 46 || b.keyCode == 8) {
                        this.deleteSlider(this.sliderIndex);
                        this.saveSliders(a)
                    } else {
                        if (b.keyCode == 27) {
                            this.exitShowSlide(a)
                        }
                    }
                }
            }
        },
        nextSlide: function(a) {
            this.presentingIndex++;
            this.toSlide(a, this.presentingIndex)
        },
        prevSlide: function(a) {
            this.presentingIndex--;
            this.toSlide(a, this.presentingIndex)
        },
        toSlide: function(h, i) {
            var k = this.sliders
              , g = k[i];
            if (g == null) {
                if (i >= k.length) {
                    this.presentingIndex = k.length - 1
                } else {
                    if (i < 0) {
                        this.presentingIndex = 0
                    }
                }
                return
            } else {
                this.presentingIndex = i
            }
            var d = g.pos;
            var e = this.calcScale(d);
            var c = $(window).width()
              , l = $(window).height();
            var b = h.container
              , j = h.designer;
            var f = d.x - c / 2 + d.w / 2;
            var a = d.y - l / 2 + d.h / 2;
            b.stop().animate({
                scrollLeft: f,
                scrollTop: a
            }, 500);
            j.css({
                "transform-origin": (d.x + d.w / 2) + "px " + (d.y + d.h / 2) + "px 0px",
                transition: "all 1s",
                transform: "scale(" + (e) + ")"
            });
            $(".mind-slide-controls").children().removeClass("active");
            $(".mind-slide-controls").children().eq(i).addClass("active");
            this.changeTopicStatus(i)
        },
        exitShowSlide: function(c) {
            var a = c.container
              , b = c.designer;
            b.css({
                "transform-origin": "50% 50%",
                transition: "all 1s",
                transform: "scale(1)"
            });
            c.operation.moveToCenter.call(c);
            c.events.push("showElements")
        },
        changeTopicStatus: function(f) {
            var h = this.sliders;
            $(".topic-box").addClass("mind-slide-disable");
            var l = $("g").children("path");
            l.css({
                opacity: "0.06"
            });
            for (var e = 0; e < h.length; e++) {
                if (e == f) {
                    var b = h[e].ids;
                    $(b).removeClass("mind-slide-disable");
                    var a = b.split(",");
                    for (var d = 0, g = a.length; d < g; d++) {
                        var c = a[d]
                          , k = c.substring(1);
                        $("#line_" + k).css({
                            opacity: 1
                        })
                    }
                }
            }
        },
        renderSelections: function(f) {
            var e = this.sliders
              , b = e.length
              , g = this;
            $(".mind-slide-selection").remove();
            if (b > 0) {
                for (var c = 0; c < b; c++) {
                    var a = e[c];
                    var d = $("<div idx=" + a.index + " class='mind-slide-selection'><span class='selection-index'>" + (a.index + 1) + "</span></div>");
                    d.appendTo(".mind-designer");
                    d.css({
                        left: a.pos.x,
                        top: a.pos.y,
                        width: a.pos.w,
                        height: a.pos.h
                    });
                    d.find(".selection-index").show()
                }
                $(document).off("click.mss", ".mind-slide-selection").on("click.mss", ".mind-slide-selection", function() {
                    var h = $(this);
                    g.focusSelection(h)
                });
                g.initDotEvent(f)
            }
            return b
        },
        renderControls: function(e) {
            var a = this;
            var d = this.sliders
              , c = "<div class='mind-slide-controls'>";
            for (var b = 0; b < d.length; b++) {
                c += "<span idx='" + b + "'></span>"
            }
            c += "</div>";
            var f = $(c);
            f.appendTo("body").css({
                left: "50%"
            });
            $(document).off("click.slidecontrols", ".mind-slide-controls > span").on("click.slidecontrols", ".mind-slide-controls > span", function() {
                var h = $(this)
                  , g = h.attr("idx");
                a.toSlide(e, g)
            })
        },
        renderSelection: function() {
            var b = this;
            var a = $("<div class='mind-slide-selection'><span class='selection-index'></span></div>");
            a.appendTo(".mind-designer");
            this.focusSelection(a);
            $(document).off("click.mss", ".mind-slide-selection").on("click.mss", ".mind-slide-selection", function() {
                var c = $(this);
                b.focusSelection(c)
            });
            return a
        },
        focusSelection: function(b) {
            $(".selection-dot").remove();
            $(".selection-del").remove();
            b.addClass("active");
            b.siblings(".mind-slide-selection").removeClass("active");
            var a = $("<span title='删除' onclick='mind.plugins.presenter.deleteOneSlider.call(mind)' class='selection-del mind-icons'>&#xe60c;</span><span class='selection-dot lt'></span><span class='selection-dot rt'></span><span class='selection-dot lb'></span><span class='selection-dot rb'></span>");
            this.sliderIndex = b.attr("idx");
            a.appendTo(b)
        },
        setSelectionPos: function(a, b) {
            a.css({
                left: b.x - 0,
                top: b.y - 0,
                width: b.w + 0,
                height: b.h + 0
            })
        },
        deleteOneSlider: function() {
            var a = this
              , b = a.plugins.presenter;
            b.deleteSlider(b.sliderIndex);
            b.saveSliders(a);
            $("#mind_hover_tip").remove()
        },
        deleteSlider: function(c) {
            $(".mind-slide-selection[idx=" + c + "]").remove();
            this.sliders.splice(c, 1);
            var b = this.sliders.length;
            for (var d = 0; d < b; d++) {
                if (d >= c) {
                    var a = this.sliders[d];
                    a.index -= 1;
                    $(".mind-slide-selection[idx=" + (d + 1) + "]").attr("idx", d);
                    $(".mind-slide-selection[idx=" + d + "]").children("span").text(d + 1)
                }
            }
        },
        resetSelectionByTopics: function(j, c, a, u, b) {
            var t = $(".topic-box.selected");
            var d = {}
              , r = j.x
              , p = j.y
              , q = j.x + j.w
              , o = j.y + j.h;
            for (var k = 0, l = t.length; k < l; k++) {
                var n = $(t[k])
                  , e = n.offset()
                  , g = n.outerWidth()
                  , m = n.outerHeight();
                var s = e.left / b
                  , f = e.top / b;
                if (c + s < r) {
                    r = c + s
                }
                if (c + s + g > q) {
                    q = c + s + g
                }
                if (a + f < p) {
                    p = a + f
                }
                if (a + f + m > o) {
                    o = a + f + m
                }
            }
            var e = {
                x: r,
                y: p,
                w: q - r,
                h: o - p
            };
            this.setSelectionPos(u, e);
            return e
        },
        setSelectedRealTime: function(f, c, b, e, d) {
            var a = {
                x: f.x - c,
                y: f.y - b,
                w: f.w,
                h: f.h
            };
            var h = d.util.getTopicsByRange(a, e);
            if (h.length == 0) {
                return h
            }
            h[0] = "#" + h[0];
            var g = h.join(",#");
            $(".topic-box").removeClass("selected");
            $(g).addClass("selected");
            return g
        },
        saveSliders: function(b) {
            var a = this.sliders;
            b.events.push("saveSliders", a)
        },
        initEvent: function(l, o, n, m) {
            var r = l.designer
              , c = l.container
              , k = l.plugins.presenter
              , q = l.operation.zoomVal / 100;
            var p = this.renderSelection();
            var j = o / q, h = n / q, b, a;
            var f = c.scrollLeft()
              , d = c.scrollTop();
            if (q != 1) {
                f = Math.abs(r.offset().left) / q;
                d = Math.abs(r.offset().top) / q
            }
            var i = {}, g;
            $(document).off("mousemove.presenter").on("mousemove.presenter", function(e) {
                var t = e.pageX / q
                  , s = e.pageY / q;
                if (t < o) {
                    j = t;
                    b = o
                } else {
                    b = t
                }
                if (s < n) {
                    h = s;
                    a = n
                } else {
                    a = s
                }
                i.x = f + j;
                i.y = d + h;
                i.w = b - j;
                i.h = a - h;
                p.css({
                    left: i.x,
                    top: i.y,
                    width: i.w,
                    height: i.h
                });
                g = k.setSelectedRealTime(i, f, d, q, l)
            });
            $(document).off("mouseup.presenter").on("mouseup.presenter", function() {
                $(document).off("mousemove.presenter");
                $(document).off("mouseup.presenter");
                k.selecting = false;
                if (g.length == 0) {
                    p.remove();
                    return
                }
                var s = k.sliders.length;
                var e = {
                    index: s
                };
                k.sliders.push(e);
                k.sliderIndex = s;
                p.attr("idx", s);
                p.children(".selection-index").text(s + 1);
                i = k.resetSelectionByTopics(i, f, d, p, q);
                k.sliders[k.sliderIndex].pos = i;
                k.sliders[k.sliderIndex].ids = g;
                k.saveSliders(l);
                $(".selection-index").fadeIn();
                l.events.push("startPreview");
                k.initDotEvent(l)
            })
        },
        initDotEvent: function(e) {
            var i = e.designer;
            var c = null
              , f = {}
              , j = Math.abs;
            var h = e.operation.zoomVal / 100;
            var d = this;
            var b = e.container.scrollLeft()
              , a = e.container.scrollTop();
            if (h != 1) {
                b = Math.abs(i.offset().left) / h;
                a = Math.abs(i.offset().top) / h
            }
            var g = null;
            $(document).off("mousedown.selectiondot", ".selection-dot").on("mousedown.selectiondot", ".selection-dot", function(p) {
                var o = $(this), l = o.attr("class"), n, k = e.container;
                b = k.scrollLeft(),
                a = k.scrollTop();
                g = $(".mind-slide-selection[idx=" + d.sliderIndex + "]");
                var m = d.sliders[d.sliderIndex].pos;
                f.x = b + p.pageX;
                f.y = a + p.pageY;
                $(document).on("selectstart", function() {
                    return false
                });
                $(document).off("mousemove.selectiondot").on("mousemove.selectiondot", function(t) {
                    if (l == null) {
                        return
                    }
                    var w = b + t.pageX
                      , q = w - f.x
                      , u = a + t.pageY
                      , v = u - f.y;
                    if (l.indexOf("rt") > 0) {
                        var r = m.y + m.h;
                        m.y = u;
                        m.w = w - m.x;
                        m.h = r - u
                    } else {
                        if (l.indexOf("lt") > 0) {
                            var s = m.x + m.w;
                            var r = m.y + m.h;
                            m.y = u;
                            m.x = w;
                            m.w = s - w;
                            m.h = r - u
                        } else {
                            if (l.indexOf("rb") > 0) {
                                m.w = j(w - m.x);
                                m.h = j(u - m.y)
                            } else {
                                if (l.indexOf("lb") > 0) {
                                    var s = m.x + m.w;
                                    m.x = w;
                                    m.w = s - w;
                                    m.h = j(u - m.y)
                                }
                            }
                        }
                    }
                    d.setSelectionPos(g, m);
                    n = d.setSelectedRealTime(m, b, a, h, e);
                    t.stopPropagation()
                });
                $(document).off("mouseup.selectiondot").on("mouseup.selectiondot", function(q) {
                    $(document).off("mousemove.selectiondot");
                    d.resetSelectionByTopics(m, b, a, g, h);
                    $(document).off("mouseup.selectiondot");
                    d.sliders[d.sliderIndex].pos = m;
                    d.sliders[d.sliderIndex].ids = n;
                    d.saveSliders(e);
                    q.stopPropagation()
                });
                p.stopPropagation()
            })
        }
    }
};
mindDesigner.prototype.events = {
    push: function(c, a) {
        var b = this.listeners[c];
        if (b) {
            return b(a)
        }
        return null
    },
    listeners: {},
    addEventListener: function(b, a) {
        this.listeners[b] = a
    }
};

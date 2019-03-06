mindDesigner.prototype.events.addEventListener("savelocal", function() {
    $("#savetip").text("所有更改已保存");
    mindUI.isOperated = true
});
mindDesigner.prototype.events.addEventListener("zoom", function(a) {
    $(".mind-zoomtxt").text(a + "%")
});
mindDesigner.prototype.events.addEventListener("initBrash", function() {
    mind.operation.initBrash(mind)
});
mindDesigner.prototype.events.addEventListener("hideMenu", function() {
    mindUI.closeMenu()
});
mindDesigner.prototype.events.addEventListener("scrollLeft", function(b) {
    var a = $("#mind_con").scrollLeft();
    $("#mind_con").scrollLeft(a + b)
});
mindDesigner.prototype.events.addEventListener("scrollTop", function(b) {
    var a = $("#mind_con").scrollTop();
    $("#mind_con").scrollTop(a + b)
});
mindDesigner.prototype.events.addEventListener("outline-select", function(b) {
    var a = $("#outline-dlg");
    if (a.length > 0 && a.css("display") == "block") {
        Outline.controller.selectNodeById(b)
    }
});
mindDesigner.prototype.events.addEventListener("outline-prebuild", function(b) {
    var a = $("#outline-dlg");
    if (a.length > 0 && a.css("display") == "block") {
        Outline.controller.updateNodeById(b)
    }
});
mindDesigner.prototype.events.addEventListener("outline-collapse", function(b) {
    var a = $("#outline-dlg");
    if (a.length > 0 && a.css("display") == "block") {
        Outline.controller.foldNodeById(b)
    }
});
mindDesigner.prototype.events.addEventListener("outline-posupdate", function(b) {
    var a = $("#outline-dlg");
    if (a.length > 0 && a.css("display") == "block") {
        Outline.controller.nodePosUpdate(b)
    }
});
mindDesigner.prototype.events.addEventListener("showLink", function() {
    mind.operation.showLink.call(mind)
});
mindDesigner.prototype.events.addEventListener("changeOpStatus", function(a) {
    mindUI.changeOpStatus(a)
});
mindDesigner.prototype.events.addEventListener("startPreview", function() {
    $(".mind-slider-show").removeClass("mind-disable");
    $(".mind-slider-show").attr("title", "点击开始演示")
});
mindDesigner.prototype.events.addEventListener("tagTip", function() {
    Util.globalTopTip("点击选择标签后，才可以设置颜色", "top_error", 1000, $(".mind-right-icons"), true);
    Util.globalTopTip("请输入10字以内的名称", "top_error", 1000, $(".mind-right-icons"), true)
});
mindDesigner.prototype.events.addEventListener("changeHeader", function(a) {});
mindDesigner.prototype.events.addEventListener("showRightMenu", function(a) {
    if (!$(".mind-right-con").is(":visible")) {
        $(".mind-right-menu").trigger("click")
    }
    $(".mind-right-icons > [tit=" + a + "]").trigger("click")
});
mindDesigner.prototype.events.addEventListener("savetitle", function(a) {
    if (a != "" && a != null && chartTitle == "未命名文件") {
        $(".header-item .title").val(a);
        setTimeout(function() {
            mindUI.saveTitle(a)
        }, 1600)
    }
});
mindDesigner.prototype.events.addEventListener("documentkeydown", function() {
    $(document).on("keydown.hotkey", ".mind-corner,.mind-topic-box,.mind-image-dlg, .header-item .title,.mind-right-con, .mind-menu-list,.mind-dlg", function(a) {
        a.stopPropagation()
    });
    $(document).on("mousemove.hotkey", ".mind-corner,.mind-topic-box, .mind-image-dlg, .header-item .title,.mind-right-con, .mind-menu-list,.mind-dlg,#body-mask", function(a) {
        a.stopPropagation()
    })
});
mindDesigner.prototype.events.addEventListener("changeHeadColor", function(a) {
    if (a == "#ffffff" || a == "rgb(255, 255, 255)") {
        $("header").css({
            background: "#f5f5f5"
        })
    } else {
        $("header").css({
            background: "#ffffff"
        })
    }
});
mindDesigner.prototype.events.addEventListener("undoStackChanged", function(b) {
    var a = $(".header-item.undo");
    if (b == 0) {
        a.addClass("mind-disable")
    } else {
        a.removeClass("mind-disable")
    }
});
mindDesigner.prototype.events.addEventListener("redoStackChanged", function(b) {
    var a = $(".header-item.redo");
    if (b == 0) {
        a.addClass("mind-disable")
    } else {
        a.removeClass("mind-disable")
    }
});
mindDesigner.prototype.events.addEventListener("loadsuccess", function(b) {
    var a = b.styles;
    if (a.background != "#ffffff" && a.background != "rgb(255,255,255)") {
        $(".mind-dock-right").css("right", "16px")
    } else {
        $(".mind-dock-right").css("right", "10px")
    }
    var c = chartTitle || "中心主题";
    $(".header-item .title").text(c);
    chartTitle = c;
    chartId = b.opts.chartId;
    setTimeout(function() {
        $("#mind-loading").fadeOut(200, function() {
            $("#mind-loading").remove()
        });
        var f = b.util.getSelectedId();
        var e = b.model.getTopicById(f);
        mindUI.initDock(e)
    }, 200);
    if (!tutorial) {
        Tutorial.init(tutorial)
    }
    var d = $(".mind-canvas-op");
    d.find(".mind-zoomtxt").text("100%");
    if (!b.opts.readonly) {
        b.util.selectOne.call(b, b.model.topic)
    }
});
mindDesigner.prototype.events.addEventListener("hidepopeditor", function() {
    $(".pop-editor").remove()
});
mindDesigner.prototype.events.addEventListener("setDock", function(a) {
    mindUI.initDock(a)
});
mindDesigner.prototype.events.addEventListener("openNote", function(b) {
    var a = $(".mind-dock-right").children("div[tit=mind-dock-right-remark]");
    if ($(".mind-dock-right-con").css("opacity") != 0) {
        return
    }
    a.trigger("click");
    setTimeout(function() {
        $("#mind-topic-remark").focus()
    }, 3300)
});
mindDesigner.prototype.events.addEventListener("saveOnline", function(a) {});
mindDesigner.prototype.events.addEventListener("showThemeOperate", function(a) {
    mindUI.showThemeOperate(a)
});
mindDesigner.prototype.events.addEventListener("toNew", function(a) {
    mindUI.createNew()
});
mindDesigner.prototype.events.addEventListener("hideElements", function() {
    $(".mind-slide-selection").hide();
    $(".mind-slide-con").hide();
    $("header").hide();
    $(".mind-slider-dlg").hide()
});
mindDesigner.prototype.events.addEventListener("showElements", function() {
    $(".mind-slider-close").trigger("click")
});
mindDesigner.prototype.events.addEventListener("saveSliders", function(a) {
    mindColla.saveSliders(a);
    if (a.length == 0) {
        $(".mind-slider-show").addClass("mind-disable");
        $(".mind-slider-show").attr("title", "[ctrl+拖拽]创建幻灯片")
    }
});
mindDesigner.prototype.events.addEventListener("setContextMenu", function(b) {
    var a = $(".mind-context-menu-content").find("ul");
    a.find(".disable").removeClass("disable");
    var c = mind.model.clipboard.list;
    if (b.root) {
        a.children("[op=insert-parent]").addClass("disable");
        a.children("[op=insert-siblings]").addClass("disable");
        a.children("[op=cut]").addClass("disable");
        a.children("[op=delete]").addClass("disable")
    }
    if (b.pos) {
        a.children("[op=insert-parent]").addClass("disable");
        a.children("[op=insert-siblings]").addClass("disable")
    }
    if (c.length == 0) {
        a.children("[op=paste]").addClass("disable")
    }
});
mindDesigner.prototype.events.addEventListener("showuploading", function() {
    mindUI.showUploading()
});
mindDesigner.prototype.events.addEventListener("hideuploading", function() {
    mindUI.hideUploading()
});
mindDesigner.prototype.events.addEventListener("showicons", function(a) {
    mindColla.saveSliders(a)
});
$(document).ready(function() {
    $(".header-item[tit]").on("mousedown", function(c) {
        c.stopPropagation()
    });
    $(".header-item[tit]").on("click", function(j) {
        var g = $(this)
          , k = g.attr("tit")
          , h = g.hasClass("mind-disable")
          , f = g.hasClass("active");
        if (h) {
            return
        }
        if (f) {
            mindUI.closeMenu();
            return
        }
        if (k) {
            switch (k) {
            case "down":
                var d = $(".mind-title-menu");
                mindUI.showMenu(g, d);
                break;
            case "themes":
                var d = $(".mind-theme-dlg");
                mindUI.showMenu(g, d);
                break;
            case "structure":
                var d = $("#mind-structures");
                mindUI.showMenu(g, d);
                break;
            case "user":
                var d = $(".mind-user-menu");
                mindUI.showMenu(g, d);
                break;
            case "guide":
                Tutorial.init(false);
                break;
            case "download":
                var c = $(".mind-download-dlg");
                c.dialog();
                setTimeout(function() {
                    $("#btn-download").removeClass("mind-disable")
                }, 500);
                break;
            case "colla":
                var c = $("#colla_add");
                c.dialog();
                mindShare.collaboration.init(chartId, "chart");
                break;
            case "preview":
                var d = $(".mind-slider-dlg")
                  , l = mind.plugins.presenter;
                d.show();
                mind.opts.readonly = true;
                var i = l.renderSelections(mind);
                if (i == 0) {
                    $(".mind-slider-show").attr("title", "没有幻灯片，[ctrl + 拖拽]选择")
                } else {
                    $(".mind-slider-show").removeClass("mind-disable")
                }
                if ($(".mind-right-con").is(":visible")) {
                    $(".mind-right-head").find(".mind-icons").trigger("click")
                }
                l.beforeSelecting = true;
                var m = false;
                $(".mind-slider-show").off().on("click", function() {
                    var e = $(this);
                    if (e.hasClass("mind-disable")) {
                        return
                    }
                    $("header").hide();
                    $(".mind-canvas-con").hide();
                    $(".mind-right-menu").hide();
                    if ($(".mind-right-con").is(":visible")) {
                        m = true
                    }
                    $(".mind-right-con").hide();
                    l.ready(mind);
                    l.toSlide(mind, 0);
                    $.showTip("close");
                    $.showTip("← → 键切换，ESC退出", 4500)
                });
                $(".mind-slider-close").off("click").on("click", function() {
                    $(".mind-slider-dlg").hide();
                    $("header").show();
                    $(".mind-canvas-con").show();
                    $(".mind-right-menu").show();
                    if (m) {
                        $(".mind-right-con").show()
                    }
                    l.beforeSelecting = false;
                    l.presenting = false;
                    $(".mind-slide-selection").remove();
                    mind.opts.readonly = false;
                    $(".mind-slide-disable").removeClass("mind-slide-disable");
                    var e = $("g").children("path");
                    e.removeAttr("style");
                    $(".mind-slide-controls").remove()
                });
                break
            }
        }
    });
    $(".mind-right-menu").on("click", function(d) {
        var c = $(this)
          , f = $(".mind-right-con");
        f.show();
        c.find("span").html("&#xe622;")
    });
    $(".mind-right-head > .mind-icons").on("click", function() {
        var c = $(this)
          , d = $(".mind-right-con");
        d.hide();
        $(".mind-right-menu").find("span").html("&#xe726;")
    });
    $("#btn-insert-img").off("click").on("click", function() {
        var e = $("#text-insert-img")
          , d = $(this).parent();
        var c = /(http[s]?:\/\/.*\.(png|jpg|gif|svg|jpeg)$)/i;
        if ($.trim(e.val()) == "" || !c.test(e.val())) {
            d.find(".text-tip").text("请检查输入的url是否合法");
            e.select();
            return
        }
        d.find(".text-tip").text("");
        mindUI.insertUserImage($.trim(e.val()));
        e.val("")
    });
    $("#text-search-img").on("keyup", function(c) {
        if (c.keyCode == 13) {
            $(".search-con").children(".mind-button").trigger("click")
        }
    });
    $(".search-con").children(".mind-button").on("click", function(f) {
        var d = $("#text-search-img");
        if ($.trim(d.val()) == "") {
            return
        }
        var c = $.trim(d.val());
        mindUI.searchImages(c)
    });
    $(".mind-right-icons").children("a").on("click", function(i) {
        var h = $(this)
          , f = h.attr("tit");
        h.addClass("active").siblings().removeClass("active");
        var c = $(".mind-right-detail");
        c.children("[tit=" + f + "]").show().siblings().hide();
        if (f != "task") {
            c.children("[tit=" + f + "]").find("input:first,textarea:last").focus()
        }
        if (f == "link") {
            var g = $("#remove_link");
            var d = $("#mind-topic-link");
            d.off("blur").on("blur", function() {
                var e = $.trim($(this).val());
                if (e != "" && !mind.util.isUrl(e) && e.length < 200) {
                    $(this).val("http://" + e)
                }
                k()
            });
            $("#mind-topic-linktitle").off("blur").on("blur", function() {
                var e = $.trim($(this).val());
                if (e != "" && e.length < 50) {
                    k()
                }
            });
            d.off("keyup").on("keyup", function(l) {
                if (l.keyCode == 13) {
                    k()
                }
            });
            g.off().on("click", function() {
                j()
            });
            function k() {
                var m = $.trim($("#mind-topic-link").val());
                if (m != "" && mind.util.isUrl(m)) {
                    var e = $.trim($("#mind-topic-linktitle").val());
                    var l = {
                        value: m,
                        title: e,
                        type: "url"
                    };
                    mind.operation.setLink.call(mind, l)
                } else {
                    j()
                }
            }
            function j() {
                $("#mind-topic-link").val("");
                $("#mind-topic-linktitle").val("");
                mind.operation.removeLink.call(mind)
            }
        } else {
            if (f == "task") {}
        }
    });
    $(".mind-right-detail .mind-group-button").children("a").on("click", function(g) {
        var f = $(this)
          , d = f.attr("tit");
        f.addClass("active").siblings().removeClass("active");
        var c = $(".mind-image-detail");
        c.children("[tit=" + d + "]").show().siblings().hide();
        if (d == "history") {
            mindUI.loadUserImages()
        }
    });
    $("#mind-designer-back").on("click", function() {
        window.location.href = "/diagraming/back?id=" + chartId
    });
    $("#mind-help").on("click", function() {
        var c = $(this);
        mindUI.showLeft("shortcut", c)
    });
    $("#history").on("click", function() {
        var c = $(this);
        mindUI.showLeft("history", c)
    });
    window.onbeforeunload = function(c) {
        if (mindColla.isOffLine) {
            mindColla.saveVersion();
            return "当前处于离线模式，退出前请保存"
        }
    }
    ;
    var b = "";
    $(".header-item .title").off("focus").on("focus", function(d) {
        var c = $(this);
        c.select();
        b = c.val();
        d.stopPropagation()
    });
    $(".header-item .title").off("keydown").on("keydown", function(d) {
        if (d.keyCode == 13) {
            var c = $(this)
              , f = $.trim(c.val());
            if (f != "") {
                mindUI.saveTitle(f)
            }
            c.removeAttr("contenteditable");
            d.preventDefault()
        }
    });
    $(".header-item .title").off("blur").on("blur", function(d) {
        d.stopPropagation();
        var c = $(this)
          , f = $.trim(c.val());
        if (f != "") {
            mindUI.saveTitle(f)
        }
    });
    $("#newFile").off("click").on("click", function() {
        mindUI.createNew("new")
    });
    $("#btn_clone").off("click").on("click", function() {
        mindUI.createNew("clone")
    });
    $(".header-item.undo").off("click").on("click", function() {
        var c = mind;
        c.messageSource.undo(c)
    });
    $(".header-item.redo").off("click").on("click", function() {
        var c = mind;
        c.messageSource.redo(c)
    });
    $(".header-item.brash").off("click").on("click", function() {
        var c = mind;
        c.operation.initBrash(c)
    });
    $(".corner-item").on("click", function() {
        var c = $(this)
          , d = c.attr("tp");
        $(".mind-corner.left").showCorner({
            type: d,
            pos: "left"
        });
        mindUI.closeMenu();
        if (d == "history") {
            mindUI.loadHistorys()
        } else {
            if (d == "outline") {
                mindUI.loadOutline()
            }
        }
    });
    $("#btn_pubpo").on("click", function(d) {
        mind.util.clearSelect();
        var c = $("#mind-publish-dlg");
        c.find(".mind-dlg-content").html(mindShare.publish.source);
        mindShare.publish.execute(chartId);
        c.dialog();
        d.stopPropagation()
    });
    $("#btn_share").on("click", function(h) {
        mind.util.clearSelect();
        var c = $(".mind-share-dlg");
        c.dialog();
        var g = c.find(".mind-dialog-left")
          , d = c.find(".mind-dialog-right")
          , f = c.outerWidth();
        g.find("li").off("click").on("click", function() {
            var e = $(this).attr("tit");
            $(this).addClass("active").siblings().removeClass("active");
            d.empty();
            d.html(mindShare[e].source);
            mindShare[e].execute(chartId)
        });
        g.find("li:eq(0)").trigger("click");
        h.stopPropagation()
    });
    $("#btn-download-cancel").on("click", function() {
        var c = $(".mind-download-dlg");
        c.dialog("close")
    });
    $("#btn-download").on("click", function() {
        var c = $(".mind-download-dlg");
        var d = $("input[type=radio]:checked").val();
        $("#export_title").val($(".header-item > .title:first").text());
        if (d == "svg" || d == "pnghd") {
            if (mind.operation.zoomVal != 100) {
                mind.operation.zoomVal = 100;
                $(".mind-zoomtxt").text(100);
                $(".mind-designer").css({
                    transform: "scale(1)",
                    "-webkit-transform": "scale(1)",
                    "-moz-transform": "scale(1)"
                })
            }
            MindToSvg.init(function(g, e) {
                if (d == "pnghd" && (g * e > 81000000)) {
                    $.showTip("文件内容超出高清PNG下载限制", 3000);
                    return
                }
                var f = $("#svg-wrap")
                  , h = '<?xml version="1.0" standalone="no"?><?xml-stylesheet type="text/css" href="https://www.processon.com/themes/default/mind/icons/icons.css" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + f.html().replace(/&nbsp;/g, " ");
                $("#export_width").val(g);
                $("#export_height").val(e);
                $("#export_definition").val(h);
                $("#export_form").submit();
                setTimeout(function() {
                    MindToSvg.container.innerHTML = ""
                }, 10000)
            })
        } else {
            $("#export_definition").val(JSON.stringify(mind.model.topic));
            $("#export_form").submit()
        }
        c.hide();
        $.mask("close");
        $("#btn-download").addClass("mind-disable");
        setTimeout(function() {
            $("#export_definition").val("")
        }, 1000)
    });
    $(".mind-zoomin").off().on("click", function() {
        mind.operation.zoomIn.call(mind, mind.designer);
        var c = mind.operation.zoomVal;
        $(".mind-zoomtxt").text(c)
    });
    $(".mind-zoomout").off().on("click", function() {
        mind.operation.zoomOut.call(mind, mind.designer);
        var c = mind.operation.zoomVal;
        $(".mind-zoomtxt").text(c)
    });
    $("#mind-theme-customise").on("click", function() {
        var c = $(".mind-theme-customise-dlg");
        c.dialog();
        var d = mind.style.themes.theme3;
        mindUI.initCustomise(d)
    });
    $("#callback_dlg_cancel").on("click", function() {
        $(".mind-callback-dlg").dialog("close")
    });
    $("#callback_dlg_save").on("click", function() {
        var c = $(this);
        mindUI.saveFeedBack(function() {
            var d = $(".mind-callback-dlg").dialog("close");
            $.showTip("你的反馈已提交", 1000)
        })
    });
    $("#btn_callback").on("mousedown", function(d) {
        var c = $(".mind-callback-dlg");
        c.dialog();
        c.find("textarea").focus();
        d.stopPropagation()
    });
    $("#btn_onlinedoc").on("mousedown", function(c) {
        c.stopPropagation()
    });
    $("#btn-history-add").on("click", function() {
        var c = $("#area-history-add")
          , d = $(this);
        c.show();
        c.find("textarea").focus()
    });
    $("#btn-histoty-add-cancel").on("click", function() {
        var c = $("#area-history-add")
          , d = $("#btn-history-add");
        c.hide();
        d.show();
        c.find("textarea").val("")
    });
    $("#btn-histoty-save").on("click", function() {
        var c = $("#area-history-add")
          , e = $("#btn-history-add")
          , d = $(this);
        var f = $("#history_remark").val();
        if (!f.trim() || f.length > 20) {
            $("#history_remark").focus();
            return false
        }
        d.addClass("mind-disable");
        e.hide();
        mindColla.saveVersion(f)
    });
    $("#mind-select-font").on("click", function() {
        var c = $(this);
        $("#mind-font-list").dropdown({
            target: c,
            onSelect: function(e) {
                var d = e.text();
                c.children("span").text(d);
                mind.operation.setStyle.call(mind, {
                    "font-family": d
                });
                c.removeClass("selected")
            },
            onClose: function() {
                c.removeClass("selected")
            }
        });
        c.addClass("selected")
    });
    $("#mind-font-b").on("click", function() {
        var e = $(this)
          , d = e.children("label")
          , c = e.hasClass("selected");
        if (c) {
            e.removeClass("selected");
            mind.operation.setStyle.call(mind, {
                "font-weight": "normal"
            })
        } else {
            e.addClass("selected");
            mind.operation.setStyle.call(mind, {
                "font-weight": "bold"
            })
        }
    });
    $("#mind-font-i").on("click", function() {
        var e = $(this)
          , d = e.children("label")
          , c = e.hasClass("selected");
        if (c) {
            e.removeClass("selected");
            mind.operation.setStyle.call(mind, {
                "font-style": "normal"
            })
        } else {
            e.addClass("selected");
            mind.operation.setStyle.call(mind, {
                "font-style": "italic"
            })
        }
    });
    $("#mind-font-ul").on("click", function() {
        var e = $(this)
          , d = e.children("label")
          , c = e.hasClass("selected");
        if (c) {
            e.removeClass("selected");
            mind.operation.setStyle.call(mind, {
                "text-decoration": "none"
            })
        } else {
            e.addClass("selected");
            mind.operation.setStyle.call(mind, {
                "text-decoration": "underline"
            });
            e.siblings("[line]").removeClass("selected")
        }
    });
    $("#mind-font-ml").on("click", function() {
        var e = $(this)
          , d = e.children("label")
          , c = e.hasClass("selected");
        if (c) {
            e.removeClass("selected");
            mind.operation.setStyle.call(mind, {
                "text-decoration": "none"
            })
        } else {
            e.addClass("selected");
            mind.operation.setStyle.call(mind, {
                "text-decoration": "line-through"
            });
            e.siblings("[line]").removeClass("selected")
        }
    });
    $("#mind-font-left").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "text-align": "left"
        });
        c.addClass("selected");
        c.siblings("[align]").removeClass("selected")
    });
    $("#mind-font-center").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "text-align": "center"
        });
        c.addClass("selected");
        c.siblings("[align]").removeClass("selected")
    });
    $("#mind-font-right").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "text-align": "right"
        });
        c.addClass("selected");
        c.siblings("[align]").removeClass("selected")
    });
    $("#mind-customise-bc_").off().on("click", function() {
        var e = $(this);
        var e = $(this)
          , c = e.css("color");
        var d = mind.util.getHexColor(c);
        $.colorpicker({
            target: e,
            setColor: c,
            onSelect: function(f) {
                if (f == null) {
                    f = "transparent"
                } else {
                    f = "#" + f
                }
                e.children(".color_line").css("background", f);
                mind.operation.setStyle.call(mind, {
                    "border-color": f
                });
                e.removeClass("selected")
            },
            onClose: function() {
                e.removeClass("selected")
            }
        });
        $("#color-hex-value").val(d.hex);
        e.addClass("selected")
    });
    $("#mind-customise-bw_").off().on("click", function() {
        var c = $(this);
        $("#mind-customise-borderw").dropdown({
            target: c,
            onSelect: function(e) {
                var f = e.attr("tp");
                var d = e.text();
                c.children("span").text(d);
                mind.operation.setStyle.call(mind, {
                    "border-width": f
                });
                c.removeClass("selected")
            },
            onClose: function() {
                c.removeClass("selected")
            }
        });
        c.addClass("selected")
    });
    $("#mind-customise-bst_").off().on("click", function() {
        var c = $(this);
        $("#mind-customise-borderst").dropdown({
            target: c,
            onSelect: function(f) {
                var d = f.text();
                c.children("span").text(d);
                var e = f.attr("tp");
                mind.operation.setStyle.call(mind, {
                    "border-style": e
                });
                c.removeClass("selected")
            },
            onClose: function() {
                c.removeClass("selected")
            }
        });
        c.addClass("selected")
    });
    $("#mind-customise-bs1_").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "border-radius": "0px"
        });
        c.addClass("selected");
        c.siblings().removeClass("selected")
    });
    $("#mind-customise-bs2_").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "border-radius": "5px"
        });
        c.addClass("selected");
        c.siblings().removeClass("selected")
    });
    $("#mind-customise-bs3_").on("click", function() {
        var c = $(this);
        mind.operation.setStyle.call(mind, {
            "border-radius": "30px"
        });
        c.addClass("selected");
        c.siblings().removeClass("selected")
    });
    $("#mind-customise-linec_").off().on("click", function() {
        var e = $(this);
        var e = $(this)
          , c = e.css("color");
        var d = mind.util.getHexColor(c);
        $.colorpicker({
            target: e,
            setColor: c,
            onSelect: function(f) {
                if (f == null) {
                    f = "transparent"
                } else {
                    f = "#" + f
                }
                e.children(".color_line").css("background", f);
                mind.operation.setStyle.call(mind, {
                    "line-color": f
                });
                e.removeClass("selected")
            },
            onClose: function() {
                e.removeClass("selected")
            }
        });
        $("#color-hex-value").val(d.hex);
        e.addClass("selected")
    });
    $("#mind-customise-linew_").off().on("click", function() {
        var c = $(this);
        $("#mind-customise-linew-list").css("z-index", 10).dropdown({
            target: c,
            onSelect: function(d) {
                var e = d.attr("tp");
                c.children("span").text(e + "px");
                mind.operation.setStyle.call(mind, {
                    "line-width": e
                })
            },
            onClose: function() {
                c.removeClass("selected")
            }
        })
    });
    $("#mind-topic-bg").on("click", function() {
        var e = $(this)
          , c = e.css("background-color");
        var d = mind.util.getHexColor(c);
        $.colorpicker({
            target: e,
            setColor: c,
            onSelect: function(f) {
                if (f == null) {
                    var g = mind.designer.css("background-color");
                    e.css("background-color", g);
                    mind.operation.setStyle.call(mind, {
                        "background-color": g
                    })
                } else {
                    f = "#" + f;
                    e.children(".color_line").css("background", f);
                    mind.operation.setStyle.call(mind, {
                        "background-color": f
                    })
                }
                e.removeClass("selected")
            },
            onClose: function() {
                e.removeClass("selected")
            }
        });
        $("#color-hex-value").val(d.hex);
        e.addClass("selected")
    });
    $("#mind-canvas-bg").on("click", function() {
        var d = $(this)
          , c = d.css("background");
        $.colorpicker({
            target: d,
            setColor: c,
            onSelect: function(e) {
                e = "#" + e;
                d.children(".color_line").css("background", e);
                mind.operation.setBackground.call(mind, e, true);
                d.removeClass("selected")
            },
            onClose: function() {
                d.removeClass("selected")
            }
        });
        d.addClass("selected")
    });
    $("#mind-font-color").on("click", function() {
        var d = $(this)
          , c = d.css("color");
        $.colorpicker({
            target: d,
            setColor: c,
            onSelect: function(e) {
                e = "#" + e;
                d.children(".color_line").css("background", e);
                mind.operation.setStyle.call(mind, {
                    color: e
                });
                d.removeClass("selected")
            },
            onClose: function() {
                d.removeClass("selected")
            }
        });
        d.addClass("selected")
    });
    $("#mind-number-size").numberBox({
        callback: function(c) {
            mind.operation.setStyle.call(mind, {
                "font-size": c
            })
        }
    });
    $("#mind-task-priority").on("click", function() {
        var c = $(this);
        $("#mind-icons-priority-list").dropdown({
            target: c,
            position: "right",
            width: 80,
            onSelect: function(i) {
                var j = i.clone();
                j.find("span").remove();
                var f = j.text()
                  , g = j.attr("priority")
                  , h = j.attr("ico");
                var e = i.find(".mind-icons").css("color");
                var d = $(".mind-right-detail > [tit=icon]").find("[ico=" + h + "]");
                if (g == null) {
                    mind.icons.removeIcon.call(mind, "priority")
                } else {
                    mind.icons.setIcon.call(mind, d, {
                        priority: g
                    }, e)
                }
                c.children("span").text(f);
                c.removeClass("selected");
                j.remove()
            },
            onClose: function() {
                c.removeClass("selected")
            }
        });
        c.addClass("selected")
    });
    $("#mind-task-completion").on("click", function() {
        var c = $(this);
        $("#mind-icons-completion-list").dropdown({
            target: c,
            position: "right",
            width: 80,
            onSelect: function(i) {
                var j = i.clone();
                j.find("span").remove();
                var g = j.text()
                  , f = j.attr("completion")
                  , h = j.attr("ico");
                var e = i.find(".mind-icons").css("color");
                c.children("span").text(g);
                var d = $(".mind-right-detail > [tit=icon]").find("[ico=" + h + "]");
                if (f == null) {
                    mind.icons.removeIcon.call(mind, "completion")
                } else {
                    mind.icons.setIcon.call(mind, d, {
                        completion: f
                    }, e)
                }
                c.removeClass("selected");
                j.remove()
            },
            onClose: function() {
                c.removeClass("selected")
            }
        });
        c.addClass("selected")
    });
    $("#mind-task-end").off("click").on("click", function(d) {
        var c = $(this);
        $("#mind-task-end").datePicker({
            dateFormat: "yyyy-MM-dd",
            selected: function(e) {
                c.find("span").text(e);
                mind.task.setTask.call(mind, {
                    end: e
                })
            }
        });
        d.stopPropagation()
    });
    $("#mind-task-start").off("click").on("click", function(d) {
        var c = $(this);
        $("#mind-task-start").datePicker({
            dateFormat: "yyyy-MM-dd",
            selected: function(e) {
                c.find("span").text(e);
                mind.task.setTask.call(mind, {
                    start: e
                })
            }
        });
        d.stopPropagation()
    });
    $("#mind-task-assigned").on("blur", function() {
        var c = $(this)
          , d = $.trim(c.val());
        if (d != "" && d.length < 20) {
            mind.task.setTask.call(mind, {
                assigned: d
            })
        } else {
            if (d == "") {
                mind.task.setTask.call(mind, {
                    assigned: null
                })
            }
        }
    }).on("keyup", function(d) {
        if (d.keyCode == 13) {
            var c = $(this)
              , f = $.trim(c.val());
            if (f != "" && f.length < 20) {
                mind.task.setTask.call(mind, {
                    assigned: f
                })
            } else {
                if (f == "") {
                    mind.task.setTask.call(mind, {
                        assigned: null
                    })
                }
            }
        }
    });
    $("#remove_task").off().on("click", function() {
        mind.task.removeTask.call(mind);
        $("#mind-task-assigned").val("");
        $(".mind-right-detail > [tit=task]").find(".mind-select-box > span").text("无")
    });
    $(document).on("mousedown.titlemenu", ".mind-right-con,.mind-dlg,.mind-corner,.header-item .title,.mind-title-menu,.mind-user-menu, .mind-theme-dlg,.mind-image-dlg,.header-item.icon.down,.header-item.icon.theme,.header-item.icon.image", function(c) {
        c.stopPropagation()
    });
    $(".header-item.icon.icon_conn").on("click", function(d) {
        var c = mind.util.getSelectedId();
        if (c == "") {
            $.showTip("请先选中一个主题", 1000);
            return
        }
        mind.connection.render.call(mind, d)
    });
    $("input[name=mind_upload_img_file]").off("change").on("change", function(d) {
        var c = this.files[0].type;
        if ($.trim($(this).val()) == "") {
            return
        }
        if (c.indexOf("image") >= 0) {
            mindUI.showUploading();
            $("#upload_mind_img").submitForm({
                success: function(e) {
                    if (e.result == "size_wrong") {
                        $.showTip("图片大小不能超过2M", 2500);
                        mindUI.hideUploading();
                        return
                    }
                    if (e.result == "type_wrong") {
                        $.showTip("格式有误，只能上传图片", 2500);
                        mindUI.hideUploading();
                        return
                    }
                    mindUI.loadUserImages(true);
                    if (e.userImage != null) {
                        mindUI.insertUserImage(e)
                    }
                    $("input[name=mind_upload_img_file]").val("")
                },
                error: function() {
                    mindUI.hideUploading()
                }
            })
        }
    });
    var a = null;
    $("#mind-topic-remark").on("blur", function(c) {
        var d = $(this).val();
        mind.remark.setRemark.call(mind, d, a)
    });
    $("#mind-topic-remark").on("focus", function(c) {
        a = mind.util.getSelectedId()
    });
    $(".mind-right-detail > [tit=icon]").find(".mind-icons").on("click", function(d) {
        var f = $(this);
        if (f.attr("remove")) {
            mind.icons.removeIcon.call(mind)
        } else {
            var g = f.attr("n");
            var c = null;
            if (g == "flag") {
                c = f.css("color")
            }
            mind.icons.setIcon.call(mind, f, null, c)
        }
    });
    setTimeout(function() {
        mindUI.loadRecentFiles();
        mindUI.loadThemes(mind);
        mindColla.getSliders()
    }, 1500);
    setTimeout(function() {
        mindUI.initStructure();
        mindUI.isMember()
    }, 600);
    mindColla.collaStart();
    window.setInterval(function() {
        if (mindColla.version != mindColla.versionNow) {
            mindColla.versionNow = mindColla.version;
            mindColla.saveVersion()
        }
    }, mindColla.versionSaveTime)
});
var mindColla = {
    isOffLine: false,
    isSending: false,
    mess: [],
    tempMess: [],
    versionSaveTime: 180000,
    versionNow: 0,
    version: 0,
    send: function(d) {
        $("#savetip").text("正在保存...");
        mindColla.version++;
        if (mindColla.isOffLine) {
            mindColla.showTip();
            mind.messageSource.saveLocal(mind);
            return
        }
        if (this.isSending) {
            this.tempMess = this.tempMess.concat(d);
            return
        }
        var a = this.collaClient;
        this.mess = this.tempMess.concat(d);
        this.isSending = true;
        this.tempMess = [];
        var b = JSON.stringify(this.mess);
        var c = {
            msgStr: b,
            ignore: "msgStr",
            chartId: chartId,
            uk: userId,
            client: a,
            fullName: fullName
        };
        $.ajax({
            url: "/mindmap/msg",
            data: c,
            cache: false,
            type: "post",
            success: function(e) {
                if (e.error) {
                    mindColla.isOffLine = true;
                    mindColla.showTip()
                } else {
                    setTimeout(function() {
                        $("#savetip").text("所有更改已保存");
                        mind.plugins.navigator.init.call(mind)
                    }, 100)
                }
                mindColla.isSending = false;
                mindColla.mess = []
            },
            error: function(f) {
                mindColla.isOffLine = true;
                mindColla.showTip();
                mindColla.isSending = false;
                mindColla.mess = []
            }
        })
    },
    isConnection: false,
    connected: function() {
        var a = $(".mind-connecting-dlg");
        if (a.length == 0) {
            return
        }
        a.dialog("close");
        a.remove();
        this.isConnection = false;
        if (this.isSync) {
            this.isOffLine = false;
            $("#savetip").text("所有更改已保存")
        }
    },
    connecting: function() {
        if (this.isConnection) {
            return
        }
        this.isConnection = true;
        var a = $(".mind-connecting-dlg");
        if (a.length == 0) {
            var c = '<div class="mind-connecting-dlg mind-dlg"><h4>重新连接</h4><div class="mind-dlg-content"><div tit><span class="mind-icons">&#xe614;</span> <span>检测网络连接</span><label></label></div><div tit><span class="mind-icons">&#xe614;</span> <span>等待服务器响应</span><label></label></div><div tit><span class="mind-icons">&#xe614;</span> <span>同步成功</span></div><div class="mind-dlg-buttons"><span onclick="mindColla.connected()" class="mind-button gray">关闭</span></div><div style="height:15px;"></div></div></div>';
            $(".mind-util-container").append(c);
            a = $(".mind-connecting-dlg")
        }
        a.dialog();
        var e = new Date().valueOf();
        var b = "http://cdn.processon.com/logo_on.png?_=" + new Date().valueOf();
        var d = new Image();
        d.src = b;
        d.onload = function() {
            var f = $(".mind-connecting-dlg").find("div[tit]:first");
            var g = new Date().valueOf();
            f.find("label").text((g - e) + "ms");
            f.css("color", "#50c28b");
            $.ajax({
                url: "/mindmap/connecting",
                success: function(i) {
                    g = new Date().valueOf();
                    var h = $(".mind-connecting-dlg").find("div[tit]").eq(1);
                    if (i.result == "success") {
                        h.css("color", "#50c28b");
                        mindColla.doSync(chartId)
                    } else {
                        h.css("color", "#f60");
                        h.find(".mind-icons").html("&#xe622;")
                    }
                    h.find("label").text((g - e) + "ms")
                },
                error: function(i) {
                    g = new Date().valueOf();
                    var h = $(".mind-connecting-dlg").find("div[tit]").eq(1);
                    h.css("color", "#f60");
                    h.find(".mind-icons").html("&#xe622;")
                }
            })
        }
        ;
        d.onerror = function() {
            var g = new Date().valueOf();
            var f = $(".mind-connecting-dlg").find("div[tit]:first");
            f.css("color", "#f60");
            f.find(".mind-icons").html("&#xe622;");
            f.find("label").text((g - e) + "ms")
        }
    },
    isSync: false,
    doSync: function(d) {
        var b = JSON.stringify(mind.model.topic);
        var a = this;
        var c = new Date().valueOf();
        $.ajax({
            url: "/mindmap/saveonline",
            type: "post",
            cache: false,
            data: {
                id: d,
                def: b,
                shapecount: b.split('"children":[').length,
                ignore: "def"
            },
            success: function(e) {
                var g = new Date().valueOf();
                var f = $(".mind-connecting-dlg").find("div[tit]").eq(2);
                if (e.result == "success") {
                    f.css("color", "#50c28b");
                    a.isSync = true;
                    setTimeout(function() {
                        mindColla.connected()
                    }, 3000)
                } else {
                    if (e.result == "nologin") {
                        $.showTip("还未登录，无法同步，请打开新选项卡登录后返回重试", 8500)
                    } else {
                        f.css("color", "#f60");
                        f.find(".mind-icons").html("&#xe622;");
                        mind.messageSource.saveLocal(mind);
                        a.isSync = false
                    }
                }
                f.find("label").text((g - c) + "ms")
            },
            error: function(f) {
                var g = new Date().valueOf();
                var e = $(".mind-connecting-dlg").find("div[tit]").eq(2);
                e.css("color", "#f60");
                e.find(".mind-icons").html("&#xe622;");
                e.find("label").text((g - c) + "ms");
                mind.messageSource.saveLocal(mind);
                a.isSync = false
            }
        })
    },
    showTip: function() {
        if (mindColla.collaUsers.length > 1) {
            this.renderOff()
        } else {
            $("#savetip").html("已保存到本地，<a href='javascript:void(0)' onclick='mindColla.connecting()' style='color:#63abf7;text-decoration:underline;'>重连并同步</a>")
        }
    },
    closeTip: function() {
        var a = $("#mind-error-tip");
        a.fadeOut(function() {
            a.remove()
        })
    },
    saveSliders: function(a) {
        $.ajax({
            url: "/mindmap/savesliders",
            type: "post",
            data: {
                id: mindUI.chartId(),
                def: JSON.stringify(a),
                ignore: "def"
            },
            success: function(b) {}
        })
    },
    getSliders: function() {
        $.ajax({
            url: "/mindmap/getsliders",
            data: {
                id: mindUI.chartId()
            },
            success: function(a) {
                if (a.slider != null) {
                    mind.plugins.presenter.sliders = JSON.parse(a.slider.def)
                }
            }
        })
    },
    collaClient: null,
    collaUk: null,
    collaItv: null,
    collaUsers: {},
    baseUrl: window.location.host.indexOf("processon.com") >= 0 ? "https://cb.processon.com/" : "/",
    collaStart: function() {
        var c = sessionStorage.getItem("mindclient_" + chartId);
        var b = mindColla
          , a = "";
        if (c == null) {
            a = new Date().valueOf();
            sessionStorage.setItem("mindclient_" + chartId, a)
        } else {
            a = c
        }
        $.ajax({
            url: "/mindmap/listen",
            type: "post",
            data: {
                subject: chartId,
                client: a
            },
            success: function(d) {
                mindColla.collaUserCount = d.users.length;
                mindColla.collaClient = a;
                mindColla.collaUk = d.uk;
                if (mindColla.collaUserCount > 1) {
                    mindColla.collaItv = window.setInterval(mindColla.poll, mindColla.collaPollTime)
                } else {
                    mindColla.collaItv = window.setInterval(mindColla.poll, mindColla.collaPollTimeSingle)
                }
            },
            error: function() {}
        })
    },
    collaCount: 0,
    collaPollTimeSingle: 9000,
    collaPollTime: 3000,
    collaUserCount: 1,
    poll: function() {
        mindColla.collaCount++;
        if (mindColla.collaCount > 5000) {
            mindColla.stop();
            return
        }
        var a = mindColla.collaClient
          , b = mindColla.collaUk;
        $.getJSON(mindColla.baseUrl + "mindmap/poll", {
            subject: chartId,
            client: a,
            uk: b
        }, function(g) {
            var h = g.users;
            if (h == null) {
                return
            }
            if (h.length > 1 && mindColla.collaUserCount != h.length) {
                window.clearInterval(mindColla.collaItv);
                mindColla.collaItv = null;
                mindColla.collaItv = window.setInterval(mindColla.poll, mindColla.collaPollTime)
            } else {
                if (h.length == 1) {
                    window.clearInterval(mindColla.collaItv);
                    mindColla.collaItv = null;
                    mindColla.collaItv = window.setInterval(mindColla.poll, mindColla.collaPollTimeSingle)
                }
            }
            mindColla.collaUserCount = h.length;
            mindColla.renderUsers(h);
            var f = g.msgs;
            for (var e = 0; e < f.length; e++) {
                var c = JSON.parse(f[e]);
                if (c.client == a) {
                    continue
                }
                try {
                    mind.messageSource.excuteMsgDirect.call(mind, c, function(j, i) {
                        mindColla.showUserOp(j, i)
                    })
                } catch (d) {
                    continue
                }
            }
        })
    },
    saveVersion: function(b) {
        var d = userName;
        var a = JSON.stringify(mind.model.topic)
          , c = "自动存储";
        if (b != null && b != "") {
            c = b
        }
        $.ajax({
            url: "/diagraming/add_version",
            data: {
                chartId: chartId,
                userId: userId,
                fullName: d,
                def: a,
                remark: c,
                ignore: "def"
            },
            type: "post",
            success: function(e) {
                mindUI.loadHistorys();
                $("#area-history-add").hide();
                $("#btn-history-add").show();
                $("#history_remark").val("");
                $("#area-history-add").find("textarea").val("");
                $("#btn-histoty-save").removeClass("mind-disable")
            }
        })
    },
    collaUsers: [],
    renderUsers: function(b) {
        var j = this;
        var c = $("#colla-users-con");
        if (c.length == 0 && b.length > 1) {
            c = $("<div id='colla-users-con'><div class='colla-tip'><span></span></div></div>").appendTo(".mind-util-container")
        } else {
            if (b.length == 1) {
                if (c.length > 0) {
                    c.remove()
                }
                return
            }
        }
        j.collaUsers = {};
        var h = [];
        for (var g = 0; g < b.length; g++) {
            var f = JSON.parse(b[g]);
            if (h.indexOf(f.userId) >= 0) {
                continue
            }
            h.push(f.userId);
            j.collaUsers[f.userId] = f
        }
        if (mindColla.offlineModel && b.length > 1) {
            if (h.length > 1) {
                mindColla.stop()
            } else {
                mindColla.stop(false)
            }
            return
        }
        var k = [], l = [], m;
        c.children().each(function(n, o) {
            var p = o.getAttribute("uid");
            if (h.indexOf(p) < 0 && p) {
                k.push(p)
            }
        });
        for (var g = 0; g < h.length; g++) {
            var a = h[g];
            var e = c.find(".colla-user[uid=" + a + "]");
            if (e.length == 0) {
                l.push(a)
            }
        }
        var d = "";
        if (k.length > 0) {
            j.showCollaTip(c, k, "leave")
        }
        if (l.length > 0) {
            j.showCollaTip(c, l, "join")
        }
    },
    userOpCount: {},
    showUserOp: function(e, d) {
        var b = mindColla.collaUsers[d];
        if (b == null) {
            return
        }
        if (e.length == 0) {
            return
        }
        var h = e[0];
        var g = $("#" + h);
        if (g != null) {
            var f = g.offset();
            var a = $(".colla-user-tip-con[uk=" + d + "]");
            if (a.length == 0) {
                var c = "/photo/" + b.userId + ".png";
                if (window.location.host.indexOf("processon.com") >= 0) {
                    c = "https://accounts.processon.com/photo/" + b.userId + ".png"
                }
                a = $("<div uk='" + d + "' class='colla-user-tip-con'><img src='" + c + "'/> <span>" + b.name + "</span>正在编辑</div>").appendTo("body");
                if (mindColla.userOpCount[d] != null) {
                    window.clearTimeout(mindColla.userOpCount[d])
                }
                mindColla.userOpCount[d] = setTimeout(function() {
                    a.fadeOut().remove()
                }, 2000)
            }
            a.css({
                left: f.left + g.outerWidth() + 12,
                top: f.top + g.outerHeight() / 2 - a.outerHeight() / 2
            }).show()
        }
    },
    stm: null,
    showCollaTip: function(d, a, m) {
        var l = this
          , f = ""
          , j = ""
          , e = [];
        var k = (m == "leave") ? "离开" : "加入";
        for (var h = 0; h < a.length; h++) {
            var c = a[h];
            var g = l.collaUsers[c];
            if (m == "join") {
                var b = "/photo/" + g.userId + ".png";
                if (window.location.host.indexOf("processon.com") >= 0) {
                    b = "https://accounts.processon.com/photo/" + g.userId + ".png"
                }
                if (e.indexOf(g.userId) < 0) {
                    j = "<div uid='" + c + "' class='colla-user' title_pos='top' title='" + g.name + "'><a target='_blank' href='/u/" + g.uname + "/profile'><img src='" + b + "'/></a></div>";
                    d.append(j);
                    e.push(g.userId)
                }
            } else {
                d.find("[uid=" + c + "]").remove()
            }
            if (g == null || g.client == mindColla.collaClient) {
                continue
            }
            if (f != "") {
                f += ","
            }
            f += g.name
        }
        if (f != "") {}
    },
    stop: function(c) {
        var a = mindColla.collaClient
          , b = mindColla.collaUk;
        window.clearInterval(mindColla.collaItv);
        mindColla.collaUserCount--;
        mindColla.collaCount = 1;
        $.ajax({
            url: "/mindmap/stop",
            type: "post",
            cache: false,
            data: {
                subject: chartId,
                client: a,
                uk: b
            },
            success: function(d) {},
            error: function() {}
        })
    },
    renderOff: function() {
        if ($("#stop_listen_tip").length > 0) {
            $("#stop_listen_tip").dialog();
            return
        }
        mindColla.saveVersion();
        var a = '<div id="stop_listen_tip" class="mind-dlg"><h3>提示</h3><div class="mind-dlg-content">当前存在多个终端正在编辑文件<br><br>无法离线，系统已自动为您存储历史版<br><br><div>点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">刷新恢复</a></div><br><br></div></div>';
        $(a).appendTo("body").dialog()
    }
};
var mindUI = {
    member: false,
    fileCount: 0,
    usedFileCount: 0,
    chartId: function() {
        return chartId
    },
    newId: function() {
        return (this.newIdS4() + this.newIdS4() + this.newIdS4())
    },
    newIdS4: function() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    },
    saveTamp: 0,
    getRandomColor: function() {
        var b = ["rgb(255, 244, 179)", "rgb(179, 229, 255)", "rgb(196, 179, 255)", "rgb(236, 255, 179)", "rgb(216, 210, 210)"];
        var a = parseInt(Math.random() * 5);
        return b[a]
    },
    filterXss: function(a) {
        if (a == null || a == "") {
            return ""
        }
        a = a.toString();
        a = a.replace(/</g, "&lt;");
        a = a.replace(/%3C/g, "&lt;");
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/%3E/g, "&gt;");
        a = a.replace(/'/g, "&#39;");
        a = a.replace(/"/g, "&quot;");
        return a
    },
    restoreXss: function(a) {
        if (a == null || a == "") {
            return ""
        }
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&#39;/g, "'");
        a = a.replace(/&quot;/g, '"');
        return a
    },
    changeOpStatus: function(a) {
        if (a.util.selectedIds.length == 0) {
            $(".header-item.brash,.header-item.icon_conn").addClass("mind-disable1");
            $(".mind-right-detail").addClass("mind-disable1")
        } else {
            $(".header-item.brash,.header-item.icon_conn").removeClass("mind-disable1");
            $(".mind-right-detail").removeClass("mind-disable1")
        }
    },
    initDock: function(s) {
        if (s == null) {
            return
        }
        var p = mind.model.topic;
        if (!s.root) {
            $(".brash").removeClass("mind-disable")
        }
        var w = mind.style.getStyle.call(mind, s);
        var e, o, G, x, t, l, K, k;
        k = p.background || mind.styles.background;
        if (s.style != null) {
            var F = s.style;
            o = F["font-size"];
            e = F["font-family"];
            G = F.color;
            x = F["font-weight"];
            t = F["font-style"];
            l = F["text-align"];
            K = F["background-color"]
        }
        if ((x || w["font-weight"]) == "bold") {
            $("#mind-font-b").addClass("selected")
        } else {
            $("#mind-font-b").removeClass("selected")
        }
        if ((t || w["font-style"]) == "italic") {
            $("#mind-font-i").addClass("selected")
        } else {
            $("#mind-font-i").removeClass("selected")
        }
        if (w["text-decoration"] == "underline") {
            $("#mind-font-ul").addClass("selected")
        } else {
            $("#mind-font-ul").removeClass("selected")
        }
        if (w["text-decoration"] == "line-through") {
            $("#mind-font-ml").addClass("selected")
        } else {
            $("#mind-font-ml").removeClass("selected")
        }
        var h = w["border-width"]
          , H = w.border;
        if (h != null || H) {
            var E = $("#" + s.id);
            var B = E.css("border-width") || E.css("border-left-width");
            var D = E.css("border-style") || E.css("border-left-style");
            var M = E.css("border-color") || E.css("border-left-color");
            $("#mind-customise-bw_").children("span").text(B);
            var q = $("#mind-customise-borderst").children("[tp=" + D + "]").text();
            if (q != "") {
                $("#mind-customise-bst_").children("span").text(q)
            }
            $("#mind-customise-bc_").children(".color_line").css("background", M)
        }
        var f = w.lineStyle;
        if (f != null) {
            $("#mind-customise-linew_").children("span:first").text((f.lineWidth || 2) + "px");
            $("#mind-customise-linec_").children(".color_line").css("background", f.lineColor)
        }
        var a = w["border-radius"];
        if (a != null) {
            a = parseInt(a);
            if (a == 5) {
                $("#mind-customise-bs2_").addClass("selected").siblings().removeClass("selected")
            } else {
                if (a == 0) {
                    $("#mind-customise-bs1_").addClass("selected").siblings().removeClass("selected")
                } else {
                    if (a == 30) {
                        $("#mind-customise-bs3_").addClass("selected").siblings().removeClass("selected")
                    }
                }
            }
        } else {
            $(".mind-color-box[bdr=true]").removeClass("selected")
        }
        $("#mind-select-font").children("span").text(e || w["font-family"]);
        $("#mind-number-size").children("input").val(o == null ? w["font-size"] : (o + "px"));
        $("#mind-font-color").find(".color_line").css("background", G || w.color);
        $(".mind-color-box[align=" + (l || w["text-align"]) + "]").addClass("selected").siblings("[align]").removeClass("selected");
        if (K != null || w.backgroundColor != null) {
            $("#mind-topic-bg").find(".color_line").css({
                "background-color": K || w.backgroundColor,
                color: G || w.color
            })
        } else {
            $("#mind-topic-bg").find(".color_line").css({
                "background-color": "#fff",
                color: "#333"
            })
        }
        $("#mind-canvas-bg").find(".color_line").css("background", k);
        var n = s.note
          , v = s.tags
          , d = s.link
          , A = s.task
          , J = s.icons;
        if (n) {
            var b = mindUI.restoreXss(n);
            $("#mind-topic-remark").val(b)
        } else {
            $("#mind-topic-remark").val("")
        }
        if (J && J.length > 0) {
            var z = $(".mind-right-detail > [tit=icon]");
            z.find(".selected").removeClass("selected");
            for (var I = 0, m = J.length; I < m; I++) {
                var g = J[I];
                z.find("[ico=" + g.index + "]").addClass("selected")
            }
        } else {
            var z = $(".mind-right-detail > [tit=icon]");
            z.find(".selected").removeClass("selected")
        }
        var r = mind.tags.renderTagColors(mind);
        $(".mind-tags-color").children().eq(1).html(r);
        mind.tags.renderTags(mind, s.id);
        if (d) {
            $("#mind-topic-link").val(d.value);
            $("#mind-topic-linktitle").val(d.title)
        } else {
            $("#mind-topic-link").val("");
            $("#mind-topic-linktitle").val("")
        }
        if (A) {
            var C = $("#mind-icons-priority-list")
              , c = $("#mind-icons-completion-list");
            var u = C.find("li[priority=" + A.priority + "]").clone()
              , y = c.find("li[completion=" + A.completion + "]").clone();
            u.find("span").remove();
            y.find("span").remove();
            var j = u.text();
            var L = y.text();
            if (j != "") {
                $("#mind-task-priority").children("span").text(j)
            } else {
                $("#mind-task-priority").children("span").text("无")
            }
            if (L != "") {
                $("#mind-task-completion").children("span").text(L)
            } else {
                $("#mind-task-completion").children("span").text("无")
            }
            y.remove();
            u.remove();
            $("#mind-task-start").children("span").text(A.start || "无");
            $("#mind-task-end").children("span").text(A.end || "无");
            $("#mind-task-assigned").val(A.assigned)
        } else {
            $("#mind-task-priority").children("span").text("无");
            $("#mind-task-completion").children("span").text("无");
            $("#mind-task-start").children("span").text("无");
            $("#mind-task-end").children("span").text("无");
            $("#mind-task-assigned").val("")
        }
        mindUI.initStyleEvent()
    },
    getFile: function(b) {
        var a = localStorage;
        return a.getItem("def_" + b)
    },
    saveFile: function(b, c) {
        var a = localStorage;
        a.setItem("def_" + b, c)
    },
    removeFile: function(b) {
        var a = localStorage;
        a.removeItem("def_" + b)
    },
    setLocalFiles: function() {
        var e = localStorage
          , b = []
          , j = e.getItem("localFiles") || "[]";
        var h = JSON.parse(j);
        for (var f in e) {
            if (f == "currentId" || f == "currentTitle" || f.indexOf("def_local") >= 0) {
                continue
            } else {
                if (f.indexOf("def_") < 0) {
                    continue
                }
            }
            var d = e[f];
            var i = JSON.parse(d);
            var a = f.substring(4);
            if (!g(a, h)) {
                var c = {
                    id: a,
                    title: i.title,
                    localId: localId
                };
                b.push(c)
            }
        }
        h = h.concat(b);
        e.setItem("localFiles", JSON.stringify(h));
        function g(p, o) {
            if (o.length == 0) {
                return false
            }
            var n = false;
            for (var m = 0, k = o.length; m < k; m++) {
                var l = o[m];
                if (l.id == p) {
                    n = true;
                    break
                }
            }
            return n
        }
    },
    loadRecentFiles: function() {
        if (chartId == "") {
            return
        }
        $.ajax({
            url: "/mindmap/getrecentfiles",
            data: {
                team_id: teamId
            },
            success: function(f) {
                var b = $(".mind-title-menu-con");
                b.html("");
                if (f.charts != null) {
                    var e = f.charts;
                    for (var d = 0, a = e.length; d < a; d++) {
                        var c = e[d];
                        var g = $('<div id="title_' + c.chartId + '" class="dropdown-item"><a href="/mindmap/' + c.chartId + '">' + c.title + '</a><span style="color:#aaa;margin-left:10px;display:inline-block;">' + mindUI.splitDate(c.lastModify) + "</span></div>");
                        if (c.chartId == mindUI.chartId()) {
                            g.addClass("active")
                        }
                        b.append(g)
                    }
                }
            }
        })
    },
    loadLocalFiles: function() {
        var f = localStorage
          , c = f.getItem("localFiles");
        var b = $(".mind-title-menu-con");
        $(".mind-title-menu-item").remove();
        if (c == null) {
            return
        }
        var g = JSON.parse(c);
        for (var e = 0, a = g.length; e < a; e++) {
            var d = g[e];
            if (d.localId != localId) {
                continue
            }
            var h = $('<div id="title_' + d.id + '" class="mind-title-menu-item"><a>' + d.title + '</a><span class="mind-icons">&#xe622;</span></div>');
            if (d.id == mindUI.chartId()) {
                h.addClass("active")
            }
            b.append(h)
        }
        $(".mind-title-menu-item").on("click", function(j) {
            var i = $(this)
              , l = i.attr("id");
            var m = l.replace("title_", "")
              , k = i.find("a").text();
            mindUI.openFile(m)
        });
        $(".mind-title-menu-item .mind-icons").on("click", function(k) {
            var j = $(this)
              , i = j.parent()
              , m = i.attr("id");
            i.parent().find(".mind-file-delete").remove();
            var l = $("<div class='mind-file-delete'><span class='delete'>确认删除</span> <span class='cancel'>取消</span></div>");
            l.appendTo(i);
            l.animate({
                left: 0
            }, 50);
            $(".mind-title-menu-item .delete").on("click", function(n) {
                if (m.indexOf("title_") >= 0) {
                    m = m.substring(6)
                }
                mindUI.deleteLocalFile(m);
                i.remove();
                n.stopPropagation()
            });
            $(".mind-title-menu-item .cancel").on("click", function(n) {
                var p = $(this)
                  , o = p.parent();
                o.parent().find(".mind-file-delete").remove();
                n.stopPropagation()
            });
            k.stopPropagation()
        })
    },
    deleteLocalFile: function(g) {
        var d = localStorage.getItem("localFiles");
        var c = JSON.parse(d)
          , e = [];
        for (var b in c) {
            var a = c[b];
            if (a.id != g) {
                e.push(a)
            }
        }
        var f = e[0];
        localStorage.setItem("localFiles", JSON.stringify(e));
        localStorage.removeItem("def_" + g);
        if (g == chartId) {
            if (f != null) {
                $(".mind-title-menu-item:first").trigger("click")
            } else {
                localStorage.removeItem("localFiles");
                localStorage.removeItem("currentId");
                localStorage.removeItem("currentTitle");
                $(".header-item .title").text("");
                mind.operation.clearCanvas.call(mind);
                window.location.hash = ""
            }
        }
    },
    currentDef: null,
    currentDefId: null,
    splitDate: function(b) {
        if (b == "") {
            return
        }
        var d = "";
        var a = b.split(" ");
        if (a[0].indexOf("-") >= 0) {
            var c = a[0].split("-");
            if (new Date().getFullYear() == c[0]) {
                d = c[1] + "-" + c[2]
            } else {
                d = c
            }
        }
        if (a[1].indexOf(":") >= 0) {
            var c = a[1].split(":");
            d += " " + c[0] + ":" + c[1]
        }
        return d
    },
    renderHistory: function(f) {
        var g = "";
        for (var e = 0, b = f.length; e < b; e++) {
            var d = f[e]
              , h = d._id.$oid;
            var a = "";
            if (d.remark == "自动存储") {
                a = "auto=true"
            }
            g += "<li " + a + ' vid="' + h + '" def="' + d.definitionId + '"><div class="history_remark">' + d.createDate + '<span class="mind-icons revert" title="还原至此版本">&#xe6e9;</span><span class="mind-icons del" title="移除">&#xe622;</span></div><div class="history_info"><span class="version_time">' + d.fullName + "</span><span>" + d.remark + "</span></div></div></li>"
        }
        var c = $("#history-container");
        c.html(g);
        if (g == "") {
            c.html('<div id="history-none-tip" style="text-align:center;"><img style="width:110px;" src="/assets/images/icon/empty_version.svg"/><div style="font-size:14px;">未找到手动创建的历史版本</div></div>')
        } else {
            $("#history-none-tip").hide()
        }
        $(".mind-corner.left").find(".showmycreate").off("click").on("click", function(j) {
            var i = $(this);
            if (i.hasClass("active")) {
                i.removeClass("active");
                mindUI.loadHistorys();
                i.attr("title", "只看我创建的")
            } else {
                i.addClass("active");
                i.attr("title", "查看全部");
                $("#history-container").find("[auto]").remove();
                if ($("#history-container").text() == "") {
                    $("#history-container").html('<div id="history-none-tip" style="text-align:center;"><img style="width:110px;" src="/assets/images/icon/empty_version.svg"/><div style="font-size:14px;">未找到手动创建的历史版本</div></div>')
                }
            }
        });
        $("#history-container li").off("click").on("click", function() {
            var j = $(this)
              , i = j.attr("def");
            if (i == mindUI.currentDefId) {
                return
            }
            mindUI.currentDefId = i;
            mindUI.getHistory(i);
            j.addClass("active").siblings().removeClass("active")
        });
        $("#history-container").find(".del").off("click").on("click", function(m) {
            var l = $(this)
              , k = l.parent().parent();
            var j = k.attr("def");
            var i = k.attr("vid");
            if (i != null) {
                l.confirm({
                    content: "确定要删除当前历史记录？",
                    width: 168,
                    height: 45,
                    onConfirm: function() {
                        mindUI.removeHistory(i);
                        if (j == mindUI.currentDefId) {
                            mindUI.closeHistory()
                        }
                    }
                })
            }
            m.stopPropagation()
        });
        $("#history-container").find(".revert").off("click").on("click", function(m) {
            var l = $(this)
              , k = l.parent().parent();
            var j = k.attr("def");
            var i = k.attr("vid");
            if (i != null) {
                l.confirm({
                    content: "确认要还原至该版本？",
                    width: 168,
                    height: 45,
                    onConfirm: function() {
                        $.ajax({
                            url: "/diagraming/get_versiondef",
                            data: {
                                id: j
                            },
                            success: function(n) {
                                if (n.def == null) {
                                    return
                                }
                                mindUI.revertHistory(n.def);
                                $.showTip("历史版本还原成功", 1500)
                            }
                        })
                    }
                })
            }
            m.stopPropagation()
        })
    },
    loadHistorys: function() {
        if (chartId == "") {
            return
        }
        var a = $("#history-container");
        $.ajax({
            url: "/diagraming/get_versions",
            data: {
                chartId: chartId
            },
            cache: false,
            success: function(c) {
                var b = c.list;
                mindUI.renderHistory(b)
            }
        })
    },
    loadOutline: function() {
        var b = {
            target: "outline-container",
            line: {
                show: true
            },
            readOnly: true,
            indent: "wider"
        };
        var c = mind.model.topic;
        var a = Outline.init(b, c)
    },
    getHistory: function(a) {
        if (a == null) {
            return
        }
        $.ajax({
            url: "/diagraming/get_versiondef",
            data: {
                id: a
            },
            success: function(b) {
                if (b.def == null) {
                    return
                }
                mindUI.openHistory(b.def);
                $("#mind-history-tip").css({
                    top: 56,
                    marginLeft: -122
                }).show().find(".mind-tip-text").html("您在正浏览一个历史版本<a href='javascript:' style='margin-left: 10px;color:#fff;text-decoration:underline;' onclick='mindUI.closeHistory()'>点击退出</a>")
            }
        })
    },
    removeHistory: function(a) {
        if (a == null) {
            return
        }
        $.ajax({
            url: "/diagraming/del_version",
            data: {
                vid: a
            },
            cache: false,
            success: function(b) {
                $("#history-container").find("li[vid=" + a + "]").remove();
                if ($("#history-container li").length > 0) {
                    $("#history-none-tip").hide()
                } else {
                    $("#history-none-tip").show()
                }
            }
        })
    },
    openingDef: null,
    openHistory: function(b) {
        if (this.currentDef == null) {
            var d = mind.opts.chartId;
            var c = JSON.stringify(mind.model.topic);
            this.currentDef = c
        }
        this.openingDef = b;
        mind.operation.clearCanvas.call(mind);
        var a = new mindDesigner("#mind_con",{
            chartId: chartId,
            readonly: true
        },b);
        mind.operation.setDisable.call(mind);
        a.util.clearSelect()
    },
    closeHistory: function(a) {
        if (a == null) {
            a = this.currentDef
        }
        var b = mind.opts.chartId;
        mind.operation.clearCanvas.call(mind);
        mind = new mindDesigner("#mind_con",{
            chartId: chartId
        },a);
        mind.operation.setEnable.call(mind);
        this.currentDef = null;
        mindUI.currentDefId = null;
        $("#history-container").find(".active").removeClass("active");
        $("#mind-history-tip").css({
            top: -56
        }).hide()
    },
    revertHistory: function(a) {
        $.ajax({
            url: "/mindmap/restore",
            type: "post",
            data: {
                def: a,
                chart_id: chartId,
                ignore: "def"
            },
            success: function() {
                mindUI.closeHistory(a);
                mindUI.loadHistorys()
            }
        })
    },
    saveTitle: function(b) {
        if (b.length > 30) {
            b = b.substring(0, 30)
        }
        if (b == chartTitle) {
            return
        }
        chartTitle = b;
        var a = {
            action: "changeTitle",
            title: b
        };
        mindColla.send([a]);
        mindUI.loadRecentFiles();
        document.title = b
    },
    setLocalFileTitle: function(h, g) {
        var d = window.localStorage;
        var e = d.getItem("localFiles");
        var f = JSON.parse(e);
        for (var c = 0, a = f.length; c < a; c++) {
            var b = f[c];
            if (b.localId != localId) {
                continue
            }
            if (b.id == h) {
                b.title = g
            }
        }
        d.setItem("localFiles", JSON.stringify(f))
    },
    setLocalFileId: function(h, b) {
        var e = window.localStorage;
        var f = e.getItem("localFiles");
        var g = JSON.parse(f);
        for (var d = 0, a = g.length; d < a; d++) {
            var c = g[d];
            if (c.localId != localId) {
                continue
            }
            if (c.id == h) {
                c.id = b;
                break
            }
        }
        e.setItem("localFiles", JSON.stringify(g))
    },
    addLocalFile: function(f, e) {
        var b = window.localStorage;
        var c = b.getItem("localFiles");
        var d = JSON.parse(c);
        var a = {
            id: f,
            title: e,
            localId: localId
        };
        d.push(a);
        b.setItem("localFiles", JSON.stringify(d))
    },
    isMember: function(b, a) {
        $.ajax({
            url: "/mindmap/ismember",
            data: {
                orgId: orgId,
                teamId: teamId
            },
            type: "post",
            success: function(c) {
                mindUI.member = c.member ? true : false;
                mindUI.fileCount = c.fileCount;
                mindUI.usedFileCount = c.usedFileCount;
                if (c.member) {
                    $("#export_form").find("[tit=member]").eq(0).remove();
                    $("#export_form").find("[tit=member]").removeClass("mind-disable1")
                }
            }
        })
    },
    savePublish: function(f) {
        var b = $("#publish_category").val();
        var e = $("#publish_language").val();
        var d = $("#publish_description").val();
        var a = $("#publish_tags").val();
        var c = a.replace(/，/ig, ",").split(",");
        c = this.removeFromArray(c, "");
        if (c.length == 0) {
            $("#publish_tags").attr("placeholder", "请输入标签");
            $("#publish_tags").focus();
            return
        }
        $("#publish_dlg_save").addClass("mind-disable");
        $.ajax({
            url: "/folder/publish",
            type: "post",
            data: {
                id: chartId,
                status: "public",
                language: e,
                industry: b,
                description: d,
                tags: c,
                _public_edit: $("#public_edit").is(":checked"),
                _public_clone: $("#public_clone").is(":checked")
            },
            traditional: true,
            success: function(g) {
                $("#publish_dlg_save").removeClass("mind-disable");
                f()
            }
        })
    },
    showThemeOperate: function(b) {
        $(".mind-theme-dlg").dialog("close");
        $(".mind-theme-customise-dlg").dialog("close");
        var a = $(".mind-exists-dlg");
        a.dialog();
        $("#btn-style-overwrite").off("click").on("click", function() {
            mind.style.setThemeOverWrite.call(mind, b, function() {
                $(".mind-exists-dlg").dialog("close")
            })
        });
        $("#btn-style-remain").off("click").on("click", function() {
            mind.style.setThemeDirect.call(mind, b);
            $(".mind-exists-dlg").dialog("close")
        });
        $("#btn-style-cancel").off("click").on("click", function() {
            $(".mind-exists-dlg").dialog("close")
        })
    },
    renderCustomiseThemes: function(a) {
        var f = []
          , b = $("#mind-customise-themes-list");
        if (a.length == 0) {
            b.html("<div style='text-align:center;width:100%;padding-top:120px;'><img style='width:140px;' src='/assets/images/icon/empty_theme.svg'/><div class='text-tip' style='margin-top:0px 8px 9px'>还没有自定义主题风格</div></div>");
            return
        }
        if (mindUI.member || 1 == 1) {
            b.prev().remove();
            b.height(453)
        }
        for (var e = 0; e < a.length; e++) {
            var h = a[e];
            var d = JSON.parse(h.theme);
            if (d != null) {
                var g = h.themeName || "未命名风格";
                var c = d.background;
                if (d.background == "#ffffff" || d.background == "rgb(255,255,255)") {
                    c = "#e7e6e5"
                }
                f.push("<div cid='" + h.id + "' themeId='" + d.id + "' style='color:" + c + "' class='theme-item'>");
                f.push("<span class='mind-icons icons-theme'>&#xe71b;</span>");
                f.push("<div class='theme-item-date'><input type='text' class='theme-item-title' value='" + g + "' /><div>" + h.updateTime.substring(0, 16) + "</div></div>");
                f.push("<div class='theme-item-op'><span title='使用主题风格' class='mind-icons icon-button icons-use'>&#xe614;</span><span title='修改主题风格' class='mind-icons icon-button icons-edit'>&#xe651;</span><span title='删除主题风格' class='icon-button mind-icons icons-close'>&#xe618;</span></div>");
                f.push("</div>")
            }
        }
        b.html(f.join(""));
        b.find(".theme-item > .icons-theme,.theme-item-op > .icons-use").on("click", function() {
            var i = $(this).parent().parent().attr("themeId");
            mind.style.setTheme.call(mind, i);
            Util.globalTopTip("主题风格应用成功", "top_success", 1000, $(".mind-theme-customise-dlg"), true);
            setTimeout(function() {
                $(".mind-theme-customise-dlg").dialog("close")
            }, 1000)
        });
        b.find(".theme-item-title").off().on("blur", function() {
            var j = $(this).parent().parent().attr("themeId");
            var i = $(this).val();
            if (i.length > 10) {
                Util.globalTopTip("请输入10字以内的名称", "top_error", 1500, $(".mind-theme-customise-dlg"), true);
                return
            }
            mindUI.saveThemeName(j, i)
        });
        b.find(".theme-item-op > .icons-close").on("click", function(l) {
            var k = $(this);
            var j = k.parent().parent();
            var m = j.attr("themeId");
            var i = $("#mind-confirm-themedel");
            k.confirm({
                content: "确定要删除当前主题？",
                width: 140,
                height: 40,
                onConfirm: function() {
                    mindUI.removeCustomiseTheme(m, function() {
                        mindUI.loadCustomiseThemesOn();
                        j.remove();
                        mindUI.editCustomiseId = null
                    })
                }
            });
            l.stopPropagation()
        });
        b.find(".theme-item-op > .icons-edit").on("click", function(p) {
            var m = $(this);
            var q = m.parent().parent();
            var r = q.attr("themeId");
            var k = sessionStorage.getItem("customiseThemes");
            var o = null;
            if (k != null) {
                var j = JSON.parse(k);
                for (var n = 0; n < j.length; n++) {
                    var l = j[n];
                    if (l.id == r) {
                        o = l;
                        break
                    }
                }
                mindUI.editCustomiseId = o.id;
                mindUI.customiseTheme = o;
                mindUI.renderTopic();
                $("#mind-tabs-styles").trigger("click")
            }
            p.stopPropagation()
        })
    },
    saveThemeName: function(b, a) {
        $.ajax({
            url: "/mindmap/savethemename",
            data: {
                id: b,
                val: a
            },
            type: "post",
            success: function(c) {
                if (c.result == "success") {
                    Util.globalTopTip("风格名称保存成功", null, 1500, $(".mind-theme-customise-dlg"), true)
                }
            }
        })
    },
    removeCustomiseTheme: function(b, a) {
        $.ajax({
            url: "/mindmap/deletetheme",
            data: {
                id: b
            },
            success: function(c) {
                if (c.result == "success") {
                    a()
                } else {
                    Util.globalTopTip("删除失败", "top_error", 1500, $(".mind-theme-customise-dlg"), true)
                }
            },
            error: function() {}
        })
    },
    loadCustomiseThemesOn: function(a) {
        if (chartId != "" && chartId != null) {
            $.ajax({
                url: "/mindmap/getthemes",
                type: "post",
                success: function(f) {
                    var b = f.themes;
                    if (b == null) {
                        a()
                    } else {
                        var c = [];
                        for (var e = 0; e < b.length; e++) {
                            var d = b[e];
                            c.push(JSON.parse(d.theme))
                        }
                        mindUI.renderCustomiseThemes(b);
                        sessionStorage.setItem("customiseThemes", JSON.stringify(c))
                    }
                },
                error: function() {}
            })
        }
    },
    initStructure: function() {
        if (mind != null) {
            var b = mind.model.topic.structure;
            a(b)
        }
        var c = $("#mind-structures");
        c.children().off("mousedown").on("mousedown", function(f) {
            var d = $(this)
              , g = d.attr("tp");
            mind.operation.changeStructure.call(mind, g, function(e) {
                d.addClass("active").siblings().removeClass("active")
            });
            mindUI.closeMenu(c);
            a(g)
        });
        function a(e) {
            var d = $(".header-item[tit=structure]");
            if (e == "mind_right") {
                d.find(".mind-icons").html("&#xe6fb;")
            } else {
                if (e == "mind_org") {
                    d.find(".mind-icons").html("&#xe6fd;")
                } else {
                    if (e == "mind_left") {
                        d.find(".mind-icons").html("&#xe6fc;")
                    } else {
                        if (e == "mind_tree") {
                            d.find(".mind-icons").html("&#xe6fd;")
                        } else {
                            if (e == "mind_free") {
                                d.find(".mind-icons").html("&#xe6fe;")
                            }
                        }
                    }
                }
            }
            $("#mind-structures").children("[tp=" + e + "]").addClass("active")
        }
    },
    saveTheme: function(b, d) {
        if (chartId != "" && chartId != null) {
            var c = b.id;
            var a = JSON.stringify(b);
            $.ajax({
                url: "/mindmap/savetheme",
                type: "post",
                data: {
                    id: c,
                    theme: a,
                    ignore: "theme"
                },
                success: function(e) {
                    if (e.result == "over") {
                        Util.globalTopTip("免费用户最多只能新建1个自定义风格", "top_error", 1500, $(".mind-theme-customise-dlg"), true);
                        return
                    } else {
                        if (e.result == "error") {
                            Util.globalTopTip("保存失败", "top_error", 1500, $(".mind-theme-customise-dlg"), true);
                            return
                        }
                    }
                    d()
                },
                error: function() {
                    Util.globalTopTip("保存失败", "top_error", 1500, $(".mind-theme-customise-dlg"), true)
                }
            })
        }
    },
    initCustomise: function(d) {
        var f = $(".mind-theme-customise-dlg");
        mindUI.customiseTheme = mind.util.copy(d);
        var e = $("#previewTopic")
          , g = "centerTopic";
        mindUI.loadCustomiseThemesOn();
        $("#mind-customise-topic").off().on("click", function() {
            var j = $(this);
            $("#mind-customise-topic-list").dropdown({
                target: j,
                width: 200,
                onSelect: function(l) {
                    var k = l.text();
                    j.children("span").text(k);
                    e.text(k);
                    g = l.attr("tp");
                    if (mindUI.customiseTheme[g] == null) {
                        mindUI.customiseTheme[g] = $.extend({}, mindUI.customiseTheme.secTopic)
                    }
                    if (g == "centerTopic") {
                        $("#linestylecon").find(".mind-select-box").addClass("mind-disable");
                        $("#linestylecon").find(".mind-color-box").addClass("mind-disable");
                        $("#previewLine").hide()
                    } else {
                        $("#linestylecon").find(".mind-select-box").removeClass("mind-disable");
                        $("#linestylecon").find(".mind-color-box").removeClass("mind-disable");
                        $("#previewLine").show()
                    }
                    mindUI.renderTopic(g);
                    j.removeClass("selected")
                },
                onClose: function() {
                    j.removeClass("selected")
                }
            })
        });
        $("#btn-customise-close").off("click").on("click", function() {
            var j = $(".mind-theme-customise-dlg").dialog("close")
        });
        $("#btn-customise-restore").off().on("click", function() {
            var j = mind.style.themes.theme3;
            mindUI.editCustomiseId = null;
            mindUI.customiseTheme = null;
            g = null;
            mindUI.renderTopic();
            Util.globalTopTip("重置成功", "top_success", 1000, $(".mind-theme-customise-dlg"), true)
        });
        $("#btn-customise-save").off().on("click", function() {
            var o = mindUI.customiseTheme;
            if (o != null) {
                var j = sessionStorage.getItem("customiseThemes");
                var k = JSON.parse(j) || [];
                if (mindUI.editCustomiseId != null) {
                    var n = 0;
                    for (var l = 0; l < k.length; l++) {
                        var m = k[l];
                        if (m.id == mindUI.editCustomiseId) {
                            n = l;
                            break
                        }
                    }
                    k.splice(n, n, o);
                    sessionStorage.setItem("customiseThemes", JSON.stringify(k));
                    mindUI.saveTheme(o, function() {
                        var q = $(".mind-theme-customise-dlg");
                        q.hide();
                        $.mask("close");
                        mind.style.setTheme.call(mind, o.id);
                        mindUI.customiseTheme = null
                    });
                    return
                }
                var p = mindUI.newId();
                o.id = "customise_" + p;
                k.push(o);
                sessionStorage.setItem("customiseThemes", JSON.stringify(k));
                mindUI.saveTheme(o, function() {
                    var q = $(".mind-theme-customise-dlg");
                    q.hide();
                    $.mask("close");
                    mind.style.setTheme.call(mind, o.id);
                    mindUI.customiseTheme = null
                })
            }
        });
        $(".mind-dlg-tabs").children().off().on("click", function() {
            var k = $(this)
              , l = k.attr("id");
            k.addClass("selected").siblings().removeClass("selected");
            var j = f.find("div[tit=" + l + "]");
            j.show().siblings("[tit]").hide()
        });
        $("#mind-customise-size").numberBox({
            callback: function(j) {
                j = j + "px";
                mindUI.customiseTheme[g]["font-size"] = j;
                mindUI.renderTopic(g)
            }
        });
        $("#mind-customise-paddingt").numberBox({
            width: 60,
            inputWidth: 36,
            callback: function(j) {
                i()
            }
        });
        $("#mind-customise-paddingr").numberBox({
            width: 60,
            inputWidth: 36,
            callback: function(j) {
                i()
            }
        });
        $("#mind-customise-paddingb").numberBox({
            width: 60,
            inputWidth: 36,
            callback: function(j) {
                i()
            }
        });
        $("#mind-customise-paddingl").numberBox({
            width: 60,
            inputWidth: 36,
            callback: function(j) {
                i()
            }
        });
        function i() {
            var j = $(".mind-number-box.padding").map(function() {
                return $(this).children("input").val()
            }).get().join(" ");
            mindUI.customiseTheme[g]["padding"] = j;
            mindUI.renderTopic(g)
        }
        $("#mind-customise-font").off().on("click", function() {
            var j = $(this);
            $("#mind-font-list").dropdown({
                target: j,
                onSelect: function(l) {
                    var k = l.text();
                    j.children("span").text(k);
                    mindUI.customiseTheme.common.family = k;
                    j.removeClass("selected");
                    mindUI.renderTopic(g)
                },
                onClose: function() {
                    j.removeClass("selected")
                }
            })
        });
        $("#mind-customise-color").off().on("click", function() {
            var k = $(this);
            var j = k.find(".color_line").css("background-color");
            a(j, k, function(l) {
                mindUI.customiseTheme[g]["color"] = l;
                mindUI.renderTopic(g)
            })
        });
        $("#mind-customise-b").off().on("click", function() {
            var j = $(this);
            if (j.hasClass("selected")) {
                mindUI.customiseTheme.common.bold = false;
                j.removeClass("selected")
            } else {
                mindUI.customiseTheme.common.bold = true;
                j.addClass("selected")
            }
            mindUI.renderTopic(g)
        });
        $("#mind-customise-i").off().on("click", function() {
            var j = $(this);
            if (j.hasClass("selected")) {
                mindUI.customiseTheme.common.italic = false;
                j.removeClass("selected")
            } else {
                mindUI.customiseTheme.common.italic = true;
                j.addClass("selected")
            }
            mindUI.renderTopic(g)
        });
        $("#mind-customise-bw").off().on("click", function() {
            var j = $(this);
            $("#mind-customise-borderw").dropdown({
                target: j,
                onSelect: function(l) {
                    var k = l.attr("tp");
                    if (k == 0) {
                        mindUI.customiseTheme[g]["border-width"] = 0;
                        delete mindUI.customiseTheme[g]["border-color"];
                        delete mindUI.customiseTheme[g]["border"]
                    } else {
                        mindUI.customiseTheme[g]["border-width"] = k
                    }
                    mindUI.customiseTheme[g]["border-style"] = "solid";
                    mindUI.renderTopic(g);
                    j.removeClass("selected")
                },
                onClose: function() {
                    j.removeClass("selected")
                }
            })
        });
        $("#mind-customise-bc").off().on("click", function() {
            var k = $(this);
            var j = k.find(".color_line").css("background-color");
            a(j, k, function(l) {
                mindUI.customiseTheme[g]["border-color"] = l;
                mindUI.renderTopic(g)
            })
        });
        $("#mind-customise-canvasbg").off().on("click", function() {
            var k = $(this);
            var j = k.find(".color_line").css("background-color");
            a(j, k, function(l) {
                mindUI.customiseTheme.background = l;
                $(".mind-customise-prev").css("background", l)
            })
        });
        $("#mind-customise-linec").off().on("click", function() {
            var k = $(this);
            var j = k.find(".color_line").css("background-color");
            a(j, k, function(l) {
                if (mindUI.customiseTheme[g]["lineStyle"] == null) {
                    mindUI.customiseTheme[g]["lineStyle"] = {}
                }
                mindUI.customiseTheme[g]["lineStyle"]["lineColor"] = l;
                document.getElementById("previewLine").querySelector("path").setAttributeNS("", "stroke", l)
            })
        });
        $("#mind-customise-linet").off().on("click", function() {
            var j = $(this);
            $("#mind-customise-linet-list").dropdown({
                target: j,
                onSelect: function(l) {
                    var k = l.attr("tp")
                      , m = l.text();
                    j.children("span").text(m);
                    if (mindUI.customiseTheme[g]["lineStyle"] == null) {
                        mindUI.customiseTheme[g]["lineStyle"] = {}
                    }
                    mindUI.customiseTheme[g]["lineStyle"]["lineType"] = k;
                    j.removeClass("selected")
                },
                onClose: function() {
                    j.removeClass("selected")
                }
            })
        });
        $("#mind-customise-linew").off().on("click", function() {
            var j = $(this);
            $("#mind-customise-linew-list").dropdown({
                target: j,
                onSelect: function(l) {
                    var k = l.attr("tp");
                    j.children("span").text(k + "px");
                    if (mindUI.customiseTheme[g]["lineStyle"] == null) {
                        mindUI.customiseTheme[g]["lineStyle"] = {}
                    }
                    mindUI.customiseTheme[g]["lineStyle"]["lineWidth"] = k;
                    j.removeClass("selected");
                    document.getElementById("previewLine").querySelector("path").setAttributeNS("", "stroke-width", k)
                },
                onClose: function() {
                    j.removeClass("selected")
                }
            })
        });
        $("#mind-customise-bs1").off().on("click", function() {
            b("0px");
            $("#mind-customise-bs1").addClass("selected");
            $("#mind-customise-bs2").removeClass("selected");
            $("#mind-customise-bs3").removeClass("selected")
        });
        $("#mind-customise-bs2").off().on("click", function() {
            b("5px");
            $("#mind-customise-bs2").addClass("selected");
            $("#mind-customise-bs1").removeClass("selected");
            $("#mind-customise-bs3").removeClass("selected")
        });
        $("#mind-customise-bs3").off().on("click", function() {
            $("#mind-customise-bs3").addClass("selected");
            $("#mind-customise-bs2").removeClass("selected");
            $("#mind-customise-bs1").removeClass("selected");
            b("30px")
        });
        $("#mind-customise-fill").off().on("click", function() {
            var k = $(this);
            var j = k.find(".color_line").css("background-color");
            a(j, k, function(l) {
                mindUI.customiseTheme[g]["backgroundColor"] = l;
                mindUI.renderTopic(g)
            })
        });
        $("#mind-customise-sd").off("").on("click", function() {
            var j = $(this)
              , k = "none";
            if (j.hasClass("selected")) {
                j.removeClass("selected")
            } else {
                k = "1px 2px 6px #aaa";
                j.addClass("selected")
            }
            h(k)
        });
        mindUI.renderTopic();
        function b(j) {
            mindUI.customiseTheme[g]["border-radius"] = j;
            mindUI.renderTopic(g)
        }
        function h(j) {
            if (j == "none") {
                delete mindUI.customiseTheme[g]["box-shadow"]
            } else {
                mindUI.customiseTheme[g]["box-shadow"] = j
            }
            mindUI.renderTopic(g)
        }
        function c() {
            if (g == "centerTopic") {}
        }
        function a(j, l, m) {
            var k = mind.util.getHexColor(j);
            $.colorpicker({
                target: l,
                setColor: j,
                onSelect: function(n) {
                    if (n == null) {
                        if (m != null) {
                            m("transparent")
                        }
                    } else {
                        n = "#" + n;
                        l.find(".color_line").css("background-color", n);
                        if (m != null) {
                            m(n)
                        }
                    }
                    l.removeClass("selected")
                },
                onClose: function() {
                    l.removeClass("selected")
                }
            });
            $("#color-hex-value").val(k.hex)
        }
        $("input[name=mind_upload_bg_file]").off("change").on("change", function(k) {
            var j = this.files[0].type;
            if ($.trim($(this).val()) == "") {
                return
            }
            if (j.indexOf("image") >= 0) {
                Util.globalTopTip("上传中...", "top_error", 6000, $(".mind-theme-customise-dlg"), true);
                $("#upload_mind_img_bg").submitForm({
                    success: function(l) {
                        if (l.result == "size_wrong") {
                            Util.globalTopTip("图片大小不能超过500k", "top_error", 1000, $(".mind-theme-customise-dlg"), true);
                            return
                        }
                        if (l.result == "type_wrong") {
                            Util.globalTopTip("只能上传图片格式", "top_error", 1000, $(".mind-theme-customise-dlg"), true);
                            return
                        }
                        if (l.img_url == null) {
                            Util.globalTopTip("上传失败", "top_error", 1000, $(".mind-theme-customise-dlg"), true);
                            return
                        }
                        if (l.img_url != "") {
                            var m = new Image();
                            m.src = l.img_url;
                            m.onload = function() {
                                $(".mind-customise-prev").css("background", "url(" + l.img_url + ")");
                                mindUI.customiseTheme.background = "url(" + l.img_url + ")";
                                Util.globalTopTip("close")
                            }
                        }
                    },
                    error: function() {
                        Util.globalTopTip("close")
                    }
                })
            } else {
                Util.globalTopTip("只支持图片格式，请重新选择", "top_error", 1500, $(".mind-theme-customise-dlg"), true)
            }
        })
    },
    customiseTheme: null,
    editCustomiseId: null,
    renderTopic: function(d) {
        if (mindUI.customiseTheme == null) {
            mindUI.customiseTheme = mind.util.copy(mind.style.themes.theme3)
        }
        var b = {}
          , a = mindUI.customiseTheme
          , c = $("#previewTopic");
        if (d == "centerTopic" || d == null) {
            b = a.centerTopic
        } else {
            if (d == "secTopic") {
                b = a.secTopic
            } else {
                if (d == "childTopic") {
                    b = a.childTopic
                } else {
                    if (d == "freeTopic") {
                        if (a.freeTopic) {
                            b = a.freeTopic
                        } else {
                            b = a.secTopic
                        }
                    }
                }
            }
        }
        b = $.extend(b, a.common);
        b["font-family"] = b.family;
        b["font-weight"] = b.bold ? "bold" : "normal";
        b["font-style"] = b.italic ? "italic" : "normal";
        delete b.family;
        delete b.bold;
        delete b.italic;
        c.removeAttr("style");
        c.css(b);
        $("#mind-customise-topic").children("span").text(d == "secTopic" ? "分支主题" : d == "childTopic" ? "子主题" : "中心主题");
        $(".mind-theme-customise-dlg").find(".color_line").removeAttr("style");
        $(".mind-customise-prev").css("background", a.background);
        mindUI.initStyles(b)
    },
    initStyles: function(d) {
        var f = $("#previewTopic");
        $("#mind-customise-font").children("span").text(d.family);
        $("#mind-customise-size").children("input").val(d["font-size"]);
        if (d.padding != null) {
            var h = d.padding.split(" ");
            $("#mind-customise-paddingt").children("input").val(h[0]);
            $("#mind-customise-paddingr").children("input").val(h[1]);
            $("#mind-customise-paddingb").children("input").val(h[2]);
            $("#mind-customise-paddingl").children("input").val(h[3])
        }
        if (d.lineStyle != null) {
            var a = d.lineStyle.lineColor
              , b = d.lineStyle.lineWidth
              , c = d.lineStyle.lineType;
            var k = (c == "curv" || c == "curve") ? "曲线" : c == "straight" ? "直线" : c == "roundBroken" ? "圆角折线" : "折线";
            var j = document.getElementById("previewLine").querySelector("path");
            j.setAttributeNS("", "stroke", a);
            j.setAttributeNS("", "stroke-width", b);
            $("#mind-customise-linew").children("span").text(b + "px");
            $("#mind-customise-linec").find(".color_line").css("background", a);
            $("#mind-customise-linet").children("span").text(k)
        }
        if (d["font-wdith"] == "bold") {
            $("#mind-customise-b").addClass("selected")
        }
        if (d["font-style"] == "italic") {
            $("#mind-customise-i").addClass("selected")
        }
        $("#mind-customise-color").find(".color_line").css("background", d.color);
        $("#mind-customise-bs1,#mind-customise-bs2,#mind-customise-bs3").removeClass("selected");
        if (d["border-radius"] != null) {
            var i = d["border-radius"].replace("px", "");
            if (Number(i) < 1) {
                $("#mind-customise-bs1").addClass("selected")
            } else {
                if (Number(i) < 10) {
                    $("#mind-customise-bs2").addClass("selected")
                } else {
                    if (Number(i) > 10) {
                        $("#mind-customise-bs3").addClass("selected")
                    }
                }
            }
        }
        if ((d.border == null && d["border-width"] == null) || d["border-width"] == 0) {
            $("#mind-customise-bw").children("span").text("无");
            $(".customise-bdstyle").find(".mind-color-box").addClass("mind-disable")
        } else {
            if (d["border-width"] != null) {
                $("#mind-customise-bw").children("span").text(d["border-width"]);
                $(".customise-bdstyle").find(".mind-color-box").removeClass("mind-disable");
                $("#mind-customise-bc").find(".color_line").css("background", d["border-color"])
            } else {
                var g = f.css("border-width")
                  , e = f.css("border-color");
                if (g != null) {
                    $("#mind-customise-bw").children("span").text(g);
                    $("#mind-customise-bc").find(".color_line").css("background", e);
                    $(".customise-bdstyle").find(".mind-color-box").removeClass("mind-disable")
                }
            }
        }
        if (d["box-shadow"] != null) {
            $("#mind-customise-sd").addClass("selected")
        } else {
            $("#mind-customise-sd").removeClass("selected")
        }
        $("#mind-customise-fill").find(".color_line").css("background", d.backgroundColor)
    },
    removeFromArray: function(c, b) {
        var a = c.indexOf(b);
        if (a >= 0) {
            c.splice(a, 1)
        }
        return c
    },
    isOperated: false,
    isSaving: false,
    getChart: function(c) {
        if (chartId == "" || chartId == null) {
            return
        }
        $.ajax({
            url: "/mindmap/getchart",
            type: "post",
            data: {
                id: chartId
            },
            success: function(d) {
                if (c != null) {
                    c(d)
                }
            },
            error: function() {}
        });
        var b = $("#btnsave").children()
          , a = 0;
        b.addClass("rotate1").css("color", "rgb(80, 194, 139)");
        setTimeout(function() {
            b.removeClass("rotate1").css("color", "#666")
        }, 1000)
    },
    createNew: function(a) {
        a = a || "new";
        if ((mindUI.member || mindUI.usedFileCount < mindUI.fileCount) && a == "new") {
            window.location.href = "/mindmap/new?category=mind_right&status=private&team=" + teamId + "&org=" + orgId;
            return
        }
        if ((mindUI.member || mindUI.usedFileCount < mindUI.fileCount) && a == "clone") {
            window.location.href = "/mindmap/new?template=" + chartId + "&chart_title" + document.title + "&team=" + teamId + "&org=" + orgId;
            return
        }
        $("#mind-fileover-dlg").dialog()
    },
    openFile: function(b) {
        if (chartId == b) {
            return
        }
        $.loading();
        chartId = b;
        mind.operation.clearCanvas.call(mind);
        mind.model.groupList.clearData();
        mind = null;
        mind = new mindDesigner("#mind_con",{
            chartId: chartId
        },null);
        var a = $(".mind-title-menu");
        mindUI.closeMenu(a);
        mindUI.loadHistorys()
    },
    saveFeedBack: function(b) {
        var a = $.trim($("#feedback_message").val());
        if (a == "" || a.length > 1500) {
            $("#feedback_message").val("").focus();
            return
        }
        $.ajax({
            url: "/support/save_ask",
            data: {
                content: a,
                url: location.href
            },
            success: function(c) {
                if (b != null) {
                    b()
                }
            }
        })
    },
    opening: false,
    showMenu: function(b, c, d) {
        if (mindUI.opening) {
            return
        }
        mindUI.opening = true;
        $(".mind-dropdown").removeClass("visible").hide();
        if (b.hasClass("active")) {
            this.closeMenu();
            return
        }
        c.css("display", "block");
        $(".header-item.active").removeClass("active");
        b.addClass("active");
        var a = b.offset().left + (b.outerWidth() - c.outerWidth()) / 2;
        if (a + c.width() > $(window).width()) {
            a = $(window).width() - c.width() - 17
        }
        c.addClass("visible");
        c.css({
            left: a,
            top: b.outerHeight() + 17,
            zIndex: 9
        });
        if (d != null) {
            d()
        }
        setTimeout(function() {
            mindUI.opening = false
        }, 300)
    },
    closeMenu: function(a) {
        $(".mind-dropdown").removeClass("visible");
        $(".header-item.active").removeClass("active");
        setTimeout(function() {
            $(".mind-dropdown").css("z-index", -1);
            mindUI.opening = false
        }, 300)
    },
    loadThemes: function(d) {
        if (d == null) {
            return
        }
        var a = d.style.themes;
        var b = $("#mind-themes");
        var c = ["<ul>"];
        $.each(a, function(e, g) {
            var f = "<li><div tit='" + e + "'><img src='" + g.thumbUrl + "'/></div></li>";
            c.push(f)
        });
        c.push("</ul>");
        b.prepend(c.join(""));
        $("#mind-themes").find("div[tit]").off("click").on("click", function(h) {
            var g = $(this).attr("tit");
            var f = d.model.topic;
            d.style.setTheme.call(d, g);
            mindUI.closeMenu();
            h.stopPropagation()
        })
    },
    htmlEncode: function(b) {
        var a = "";
        if (b.length == 0) {
            return ""
        }
        a = b.replace(/&/g, "&amp;");
        a = a.replace(/</g, "&lt;");
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/ /g, "&nbsp;");
        a = a.replace(/\'/g, "&#39;");
        a = a.replace(/\"/g, "&quot;");
        return a
    },
    htmlDecode: function(b) {
        var a = "";
        if (b.length == 0) {
            return ""
        }
        a = b.replace(/&amp;/g, "&");
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&nbsp;/g, " ");
        a = a.replace(/&#39;/g, "'");
        a = a.replace(/&quot;/g, '"');
        return a
    },
    showProcess: function() {
        var a = $("<div id='top-tip-uploading'></div>").appendTo("body")
    },
    initStyleEvent: function() {
        $(".pre-topic").off("click").on("click", function() {
            var e = $(this);
            var c = e.css("background-color");
            var a = e.css("color");
            var b = e.css("border");
            var d = e.css("border-radius");
            mind.operation.setStyle.call(mind, {
                "background-color": c,
                color: a,
                border: b,
                "border-radius": d
            })
        })
    },
    showUploading: function() {
        var a = $("<div class='mind-upload-tip'><span class='mind-icons rotate1'>&#xe65b;</span> <span>正在上传中......</span></div>");
        a.appendTo("body");
        a.css({
            top: 60
        }).show()
    },
    hideUploading: function() {
        $(".mind-upload-tip").remove()
    },
    showWeixin: function(a) {
        $.ajax({
            url: "/view/getlink",
            data: {
                chartId: chartId
            },
            success: function(d) {
                if (d.viewLinkId != "") {
                    var b = $("<div></div>").appendTo("body");
                    b.css({
                        position: "absolute",
                        width: 200,
                        height: 216,
                        left: "50%",
                        top: "40%",
                        marginLeft: -100,
                        marginTop: -100,
                        textAlign: "center",
                        zIndex: 9999999,
                        border: "1px solid #ccc",
                        background: "#fff",
                        boxShadow: "1px 1px 12px #bbb"
                    });
                    var c = new QRCode(b[0],{
                        width: 180,
                        height: 180
                    });
                    b.find("img").css({
                        width: "180px",
                        height: "180px",
                        marginTop: 10,
                        marginLeft: 10
                    }).after("<div>微信扫一扫 分享</div>");
                    c.makeCode(d.viewLinkId);
                    $(document).off("mousedown.weixin").on("mousedown.weixin", function() {
                        b.remove()
                    })
                }
            }
        })
    },
    insertUserImage: function(b) {
        var a = "";
        if (typeof b == "string") {
            a = b
        } else {
            a = b.userImage.fileId
        }
        var c = new Image();
        c.src = a;
        c.onload = function() {
            mind.operation.setTopicImage.call(mind, null, a, c);
            mindUI.hideUploading();
            $(".mind-image-dlg").dialog("close")
        }
    },
    loadUserImages: function(a) {
        var b = $(".upload-imgs");
        if (b.attr("loaded") && a == null) {
            return
        }
        $("#insertUserImage").hide();
        b.empty();
        $.ajax({
            url: "/user_image/list?type=mind",
            success: function(e) {
                if (e.images && e.images.length > 0) {
                    for (var d = 0; d < e.images.length; d++) {
                        var c = e.images[d];
                        mindUI.appendUserImage(c)
                    }
                    b.append("<div style='clear: both'></div>");
                    $("#insertUserImage").show()
                } else {
                    b.append("<div style='text-align:center;width:100%;'><img style='display:inline-block;width:110px;' src='/assets/images/icon/empty_picture.svg'/><div>还没有使用过图片，可以点击上传</div><br></div>");
                    $("#insertUserImage").hide()
                }
            }
        });
        b.attr("loaded", "true");
        $("#insertUserImage").off().on("click", function() {
            var d = $(".upload-imgs").children(".image_item_selected");
            if (d.length > 0) {
                var c = d.attr("fileid");
                mindUI.insertUserImage(c)
            }
        })
    },
    appendUserImage: function(b) {
        var c = $("<div class='upload-img' id='" + b.imageId + "' fileId='" + b.fileId + "'></div>").appendTo($(".upload-imgs"));
        var a = "/file/id/" + b.fileId + "/diagram_user_image";
        if (b.fileId != null && b.fileId.indexOf("http") >= 0) {
            a = b.fileId;
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
        }
        var d = $("<div class='image_box'><img src='" + a + "'/></div>").appendTo(c);
        c.off().on("click", function() {
            $(".image_item_selected").removeClass("image_item_selected");
            $(this).addClass("image_item_selected");
            $(".mind-image-detail > [tit=history]").find(".mind-disable1").removeClass("mind-disable1")
        }).on("mouseenter", function() {
            var f = $(this);
            var e = $("<div title='删除图片' class='remove_icons'><span class='mind-icons'>&#xe630;</span></div>").appendTo(f);
            var g = f.attr("id");
            e.on("click", function() {
                f.fadeOut();
                $.ajax({
                    url: "/user_image/remove",
                    data: {
                        imageId: g
                    },
                    success: function() {
                        f.remove();
                        if ($("#history-list").find("img").length == 0) {
                            $("#history-list").html("<div style='text-align:center;margin-top:65px;color:#a0a0a0;margin:0 auto;'><span style='font-size:80px;' class='mind-icons'>&#xe663;</span><br><br>还没有使用过图片，可以点击上传</div>");
                            $("#insertUserImage").hide()
                        }
                    }
                })
            })
        }).on("mouseleave", function() {
            $(this).find(".remove_icons").remove()
        })
    },
    searchImages: function(a) {
        var d = 0;
        function c(f) {
            b(f, function(g) {
                if (g != null) {
                    var h = g.data;
                    e(h)
                }
            })
        }
        function b(f, g) {
            $.ajax({
                type: "get",
                async: false,
                url: "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&fp=result&ie=utf-8&oe=utf-8&pn=" + d + "&rn=15&word=" + f,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "flightHandler",
                success: function(h) {
                    if (g != null) {
                        g(h)
                    }
                }
            })
        }
        function e(m) {
            var g = $("#search-img-con");
            g.empty();
            var h = "";
            for (var l = 0, f = m.length; l < f; l++) {
                var j = m[l];
                if (j == null || j.thumbURL == null) {
                    continue
                }
                h += '<img msrc="' + (j.hoverURL || j.middleURL) + '" alt="" src="' + j.thumbURL + '" />'
            }
            g.html(h);
            if ($("#image-search-btn").text() == "") {
                var k = "<div class='page-btn'><span class='text-tip'>点击图片，可直接插入</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='mind-icons'>&#xe66a;</span><span class='mind-icons'>&#xe66b;</span></div>";
                $("#image-search-btn").html(k)
            }
            g.children("img").off().on("click", function() {
                var i = $(this).attr("msrc");
                mindUI.insertUserImage(i)
            });
            $(".page-btn").children().off().on("click", function(n) {
                var i = $(this);
                if (i.index() > 0) {
                    d += 15
                } else {
                    d -= 15;
                    if (d < 0) {
                        d = 0
                    }
                }
                c()
            })
        }
        c(a)
    }
};
var mindShare = {
    publish: {
        source: '<div id="publish_toedit" class="pubpo-tab dialog-win-con"><div class="toedit-des">当前文件已发布（公开）到ProcessOn，您可以：</div><div class="publish-content"><div id="btn_submit_private"><span class="mind-icons">&#xe7bb;</span>取消发布</div><div class="item-seq">或者</div><div id="to_publish_edit"><span class="mind-icons">&#xe644;</span>修改发布信息</div></div><div style="margin-bottom:13px;" class="mind-dlg-buttons"><span class="mind-button pubdialog-close">关闭</span></div></div><div id="publish_verifying" class="pubpo-tab dialog-win-con"><div class="toedit-des">当前文件正在进行发布审核，请耐心等待</div><div class="publish-content"><div id="btn_verifying"><span class="mind-icons">&#xe61e;</span>审核中…</div><div class="item-seq">或者</div><div id="to_publish_edit"><span class="mind-icons">&#xe644;</span>修改发布信息</div></div><div class="mind-dlg-buttons"><span class="mind-button pubdialog-close">关闭</span></div></div><div id="publish_topublic" class="pubpo-tab dialog-win-con"><div class="pub-explain">发布后，文件将公开到 ProcessOn，所有用户都可以看到，供大家学习交流；您也可以设置文件的克隆价格，分享知识的同时还可以获得收益。</div><ul class="form"><li><div class="title">文件描述：</div><textarea id="publish_description" class="textarea txt" placeholder="请您描述文件（必填）"></textarea></li><li><div class="title">文件标签：</div><div id="publish_addtags" class="feedTags"><div id="tag_items"></div><input id="tag_input" class="tag-txt" type="text" placeholder="输入内容按回车键添加标签(必填)"></div></li><li><div class="title">开放克隆</div><div class="content"><div class="radio-btn-group"><input type="radio" name="public_clone" id="no_clone" class="clone-radio"><label for="no_clone">不允许克隆</label><span class="label-exp">所有人只限于查看此文件，但是不能克隆</span></div><div class="radio-btn-group"><input id="public_clone_free" type="radio" class="clone-radio" name="public_clone"><label for="public_clone_free">免费克隆</label><span class="label-exp">所有人都可以查看且免费克隆（另存为）此文件</span></div><div class="radio-btn-group"><input id="public_clone_pay" type="radio" class="clone-radio " name="public_clone"><label for="public_clone_pay">付费克隆</label><span class="label-exp">用户可以查看文件，付费后，可以克隆您的文件</span></div></div></li><li class="clone-price"><div class="title">克隆价格</div><div class="content"><input class="setprice-btn txt" id="setprice" type="text" name="set_price" placeholder="请输入5元以上金额"><span style="margin-left:10px;">元</span><a title="点我了解详情" href="/support#user-template" target="_blank"><span class="icons mind-icons" style="color: #888;cursor: pointer;margin-left:10px;">&#xe696;</span></a></div></li></ul><div class="bot-line"><div class="agreement-group"><input id="agreement" type="checkbox" name="agreement" checked /><label for="agreement">点击发布表示您同意我们的<a href="/tos" target="_blank" class="agreement-detail">《服务条款》</a></label></div><div class="mind-dlg-buttons" style="padding-right:0px;"><span id="btn_submit_publish" class="mind-button  pub-btn">发布</span><span class="mind-button gray pubdialog-close">关闭</span></div></div></div>',
        execute: function(e) {
            $.ajax({
                url: "/view/chart/" + e,
                data: {},
                success: function(h) {
                    var g = h.chart;
                    d(g.status);
                    $("#tag_items").children("span").remove();
                    $(".clone-price").hide();
                    if (g.tags != null && g.tags.length > 0) {
                        for (var f = 0; f < g.tags.length; f++) {
                            a(g.tags[f])
                        }
                    }
                    $("#publish_description").val(mindUI.restoreXss(g.description));
                    if (g.template == true) {
                        $("#public_clone_pay").attr("checked", true);
                        $(".clone-price").show()
                    }
                    if (g.publicClone && g.publicClonePrice > 0) {
                        $("#public_clone_pay").attr("checked", true);
                        $(".clone-price").show();
                        $(".setprice-btn").val(g.publicClonePrice)
                    } else {
                        if (g.publicClone) {
                            $("#public_clone_free").attr("checked", true)
                        } else {
                            $("#no_clone").attr("checked", true)
                        }
                    }
                }
            });
            $("#mind-publish-dlg").on("click", "#to_publish_edit", function() {
                $(".pubpo-tab").hide();
                $("#publish_topublic").show()
            });
            $("#publish_addtags").on("click", function(f) {
                $("#tag_input").focus()
            });
            $("#tag_input").off("keyup.input").on("keyup.input", function(g) {
                if ($.trim($(this).val()).length > 30) {
                    $(this).val($.trim($(this).val()).substring(0, 30))
                }
                var f = g.which;
                if (f == 13) {
                    a($("#tag_input").val());
                    $("#tag_input").val("")
                }
                if (f == 188) {
                    a($("#tag_input").val().substr(0, $("#tag_input").val().length - 1));
                    $("#tag_input").val("")
                }
                $("#publish_addtags").scrollTop($(".input_item_box").height())
            }).off("keydown.delete").on("keydown.delete", function(f) {
                if (f.which == 8 && $("#tag_input").val() == "") {
                    $("#tag_items span:last-child").remove()
                }
            }).suggest({
                url: "/tags/suggest",
                valueField: "tagName",
                format: function(f) {
                    return f.tagName
                },
                onEnter: function() {
                    a();
                    $(".feedTags").scrollTop($(".input_item_box").height())
                }
            });
            $("#tag_items").find(".close-tag").die().live("click", function() {
                $(this).parent().remove();
                if ($("#tag_items").children("span").length < 5) {
                    $("#tag_input").val("").focus()
                }
            });
            $(".clone-radio").off().on("change", function() {
                var g = $("#public_clone_pay").prop("checked")
                  , f = $("#btn_submit_publish");
                if (g) {
                    $(".clone-price").show();
                    f.text("提交审核");
                    return
                }
                $(".clone-price").hide();
                f.text("发布")
            });
            $("#agreement").on("change", function() {
                var g = $(this).prop("checked")
                  , f = $("#btn_submit_publish");
                if (!g) {
                    f.disable();
                    return
                }
                f.enable()
            });
            $("#clone_price").off().on("blur", function() {
                var g = $(this);
                var f = g.val();
                if (isNaN(f * 1)) {
                    g.inputTip({
                        text: "克隆价格只能输入数字",
                        pos: "rightout"
                    })
                } else {
                    if ($.trim(f).length == 0) {
                        g.val(0)
                    } else {
                        if (f * 1 < 0.1) {
                            g.inputTip({
                                text: "您输入的克隆价格不在规定范围",
                                pos: "rightout"
                            })
                        }
                    }
                }
            });
            $("#btn_submit_publish").off().on("click", function() {
                var g = "verifying";
                var f = $("#public_clone_free").prop("checked")
                  , h = $("#no_clone").prop("checked");
                if (f || h) {
                    g = "public"
                }
                b(g)
            });
            $("#btn_submit_private").off().on("click", function() {
                var f = "private";
                b(f)
            });
            function b(l) {
                var g = $("#publish_description")
                  , f = $(".clone-radio:checked");
                var m = {};
                m.id = e;
                m.description = g.val();
                m.tags = c();
                m.status = l;
                m._public_clone = ($("#no_clone")[0].checked == true) ? "false" : "true";
                m._public_clone_price = $("#setprice").val();
                m.ignore = "description";
                if (l != "private") {
                    if (m.description.length == 0) {
                        Util.globalTopTip("请输入文件描述", "top_error", 3000, $("#mind-publish-dlg"), true);
                        g.focus();
                        return
                    }
                    if (m.tags.length == 0) {
                        Util.globalTopTip("请输入文件标签", "top_error", 3000, $("#mind-publish-dlg"), true);
                        $("#publish_addtags").find("input").focus();
                        return
                    }
                    if (f.length < 1) {
                        Util.globalTopTip("您需要选择是否开放克隆", "top_error", 3000, $("#mind-publish-dlg"), true);
                        return
                    }
                    var j = $("#public_clone_pay").prop("checked");
                    if (j) {
                        var k = $("#setprice");
                        var i = k.val().trim();
                        if (i.length == 0) {
                            Util.globalTopTip("请您输入克隆价格", "top_error", 3000, $("#mind-publish-dlg"), true);
                            k.focus();
                            return
                        } else {
                            if (!/^(\d+\.\d{1,1}|\d+)$/.test(i)) {
                                Util.globalTopTip("克隆价格需为数字，最多一位小数", "top_error", 3000, $("#mind-publish-dlg"), true);
                                k.focus();
                                return
                            } else {
                                if (i < 5) {
                                    Util.globalTopTip("克隆价格需大于5元", "top_error", 3000, $("#mind-publish-dlg"), true);
                                    k.focus();
                                    return
                                }
                            }
                        }
                    }
                }
                var h = l == "verifying" ? "chart/verify" : "publish";
                $.ajax({
                    url: "/folder/" + h,
                    data: m,
                    success: function(n) {
                        if (n.result == "clone") {
                            Util.globalTopTip("克隆的文件暂不允许发布", "top_error", 3000, $("#mind-share-dlg"), true);
                            return
                        } else {
                            if (n.result == "rename") {
                                Util.globalTopTip("未命名文件不允许发布，请修改文件标题后再发布", "top_error", 3000, $("#mind-share-dlg"), true);
                                return
                            } else {
                                if (n.result == "error") {
                                    Util.globalTopTip("文件过于简单，不允许发布", "top_error", 3000, $("#mind-publish-dlg"), true);
                                    return
                                }
                            }
                        }
                        if (l == "private") {
                            Util.globalTopTip("文件已经取消发布，已处于私密状态", null, 3000, $("#mind-publish-dlg"), true)
                        }
                        d(l)
                    }
                })
            }
            $("#mind-publish-dlg").on("click", ".pubdialog-close", function() {
                var f = $("#mind-publish-dlg");
                $.mask("close");
                f.hide();
                $(window).unbind("resize.dialog")
            });
            function d(f) {
                var g = $(".pubpo-tab");
                if (f == "public") {
                    g.hide();
                    $("#publish_toedit").show()
                } else {
                    if (f == "verifying") {
                        g.hide();
                        $("#publish_verifying").show()
                    } else {
                        g.hide();
                        $("#publish_topublic").show();
                        $("#publish_topublic").find("textarea").focus()
                    }
                }
            }
            function a(g) {
                if (typeof g == "undefined") {
                    g = $("#tag_input").val();
                    $("#tag_input").val("")
                }
                if ($("#tag_items").children("span").length >= 5) {
                    $("#tag_input").inputTip({
                        text: "最多添加五个标签",
                        pos: "rightout"
                    });
                    return
                }
                if (g != "") {
                    var f = $("#tag_items").find(".tagitem").map(function() {
                        return $(this).find("input").val()
                    }).get();
                    if ($.inArray(g, f) < 0) {
                        $("#tag_items").append("<span class='tagitem'><span class='close-tag mind-icons'>&#xe622;</span><input type='hidden' name='tags' value='" + g + "'/>" + g + "</span>");
                        $("#tag_items").show()
                    }
                }
            }
            function c() {
                a();
                var f = $("#tag_items").find(".tagitem").map(function() {
                    return $(this).find("input").val()
                }).get();
                return f
            }
        }
    },
    viewlink: {
        source: '<div class="dlg-content"><h3><span class="tip1">创建浏览链接，分享给别人后，可以通过此链接来安全地浏览您的文件</span></h3><div style="margin:15px 0;"><input type="text" id="view_link_input" class="txt-input share-link-input" style="width:90%;" readonly placeholder="您还没有给文件创建分享链接"></div><div><span class="mind-button create">创建链接</span><div class="new-form-switch"><span class="switchbutton fl gray" val="false"><span class="switch left"><span class="mind-icons" style="color:#888;">&#xe6bc;</span></span><span class="switch-left">删除密码</span><span class="switch-right">添加密码</span></span></div><input type="text" class="txt-input input-pw" style="margin-left:10px;display:none;height:10px;" maxlength="8" placeholder="密码" /></div><div class="shareopt-group"><h3><span class="tip2">分享到社交网络</span></h3><a style="color:#3eb94e" onclick="mindUI.showWeixin(this)" class="mind-icons weixin">&#xe6e3;</a><a style="color:#ff0000" class="mind-icons weibo" target="_blank" rel="nofollow" href="http://service.weibo.com/share/share.php?appkey=4181333602&title=' + chartTitle + "&url=https://www.processon.com/view/" + chartId + "&pic=https://www.processon.com/chart_image/id/" + chartId + '.png&ralateUid=2711044785">&#xe6e1;</a><a style="color:#2196f3;" class="mind-icons mingdao" target="_blank" rel="nofollow" href="http://www.mingdao.com/share?appkey=5967E9E0B4ADA1B9C23B1893ABAED0F&pic=https://www.processon.com/chart_image/id/' + chartId + ".png&title=" + chartTitle + "&url=https://www.processon.com/view/" + chartId + '">&#xe6e2;</a><a style="color:#228a31;" class="mind-icons douban" target="_blank" rel="nofollow" href="http://www.douban.com/share/service?name=' + chartTitle + "&href=https://www.processon.com/view/" + chartId + '">&#xe6e0;</a></div></div>',
        execute: function(k) {
            var i = null;
            var f = "";
            $.ajax({
                url: "/view/getlink",
                data: {
                    chartId: k
                },
                success: function(n) {
                    i = n.chart;
                    mindShare.chart = n.chart;
                    f = n.viewLinkId;
                    if (f == "" || f == null) {
                        a()
                    } else {
                        var m = "false";
                        var l = null;
                        if (!!i.viewPassword) {
                            m = "true";
                            l = i.viewPassword
                        }
                        $(".switchbutton").attr("val", m);
                        h(l);
                        $("#view_link_input").val(f).select()
                    }
                }
            });
            $(".sharedialog-close").off("click").on("click", function(l) {
                l.stopPropagation();
                $(".mind-share-dlg").hide();
                $.mask("close")
            });
            $(".switchbutton").off().on("click", function() {
                var l = $(this).attr("val");
                if (l == "true") {
                    $(this).attr("val", false)
                } else {
                    $(this).attr("val", true)
                }
                c(this)
            });
            $("#view_link_input").on("click", function() {
                $(this).select();
                try {
                    if (document.execCommand("copy", false, null)) {
                        Util.globalTopTip("链接已复制到剪切板", "top_success", 3000, $("#mind-share-dlg"), true)
                    } else {}
                } catch (l) {}
            });
            $(".input-pw").off().on("change", function(m) {
                var l = $(this).val().trim();
                if (l == "") {
                    return
                }
                if (!/^[0-9a-zA-Z]+$/.test(l.trim())) {
                    Util.globalTopTip("只能为数字和字母的组合", "top_error", 3000, $("#mind-share-dlg"), true);
                    return
                }
                j(l)
            });
            function a() {
                $(".dlg-content .create").text("创建链接").off().on("click", function() {
                    e()
                }).next().hide().next().hide();
                $("#view_link_input").val("").off();
                $(".shareopt-group").hide()
            }
            function e() {
                $.ajax({
                    url: "/view/addlink",
                    data: {
                        chartId: k
                    },
                    success: function(m) {
                        $(".switchbutton").attr("val", "false");
                        h();
                        var l = m.viewLinkId;
                        $("#view_link_input").val(l).select()
                    }
                })
            }
            function h(l) {
                $(".dlg-content .create").text("删除链接").off().on("click", function() {
                    g()
                }).next().css("display", "inline-block");
                b(l);
                $(".shareopt-group").show()
            }
            function b(l) {
                var n = $(".switchbutton");
                var m = n.attr("val");
                if (m == "false") {
                    n.removeClass("green").addClass("gray");
                    n.find(".switch").removeClass("right").addClass("left");
                    n.find(".switch .icons").show();
                    n.find(".switch-left").hide();
                    n.find(".switch-right").show()
                } else {
                    n.removeClass("gray").addClass("green");
                    n.find(".switch").removeClass("left").addClass("right");
                    n.find(".switch .icons").hide();
                    n.find(".switch-left").show();
                    n.find(".switch-right").hide();
                    if (!!l) {
                        $(".input-pw").show().val(l)
                    }
                }
            }
            function g() {
                $.ajax({
                    url: "/view/dellink",
                    data: {
                        chartId: k
                    },
                    success: function(l) {
                        a()
                    }
                })
            }
            function c(n) {
                var m = $(n).attr("val");
                if (m == "true") {
                    var l = d(4);
                    $(".input-pw").show().val(l).select();
                    j(l)
                } else {
                    $.ajax({
                        url: "/view/removepassword",
                        data: {
                            chartId: k
                        },
                        success: function(o) {
                            $(".input-pw").val("").hide();
                            b($(".input-pw").val())
                        }
                    })
                }
            }
            function d(n) {
                var o = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "123456789"];
                var m, p;
                var l = "";
                for (p = 0; p < n; p++) {
                    m = Math.floor(Math.random() * 3);
                    l += o[m].substr(Math.floor(Math.random() * (o[m].length)), 1)
                }
                return l
            }
            function j(l) {
                $.ajax({
                    url: "/view/addpassword",
                    data: {
                        viewPassword: l,
                        chartId: k
                    },
                    success: function(m) {
                        b($(".input-pw").val());
                        Util.globalTopTip("密码设置成功", "top_success", 3000, $("#mind-share-dlg"), true)
                    }
                })
            }
        }
    },
    emb: {
        source: '<div class="embed-left"><div class="embed-preview-wrap"><div class="embed-preview"></div></div></div><div class="embed_attributes form"><div id="embed_show_tip">您可以复制下面的代码，嵌入到第三方网站中</div><textarea id="iframe_html" class="textarea txt-input" readonly="readonly" style="margin-top:10px;height:60px;width:97%;"></textarea><div class="embed-size"><label class="title" for="embed_width">宽度:</label><input type="text" id="embed_width" name="embed_width" class="txt-input" value="525"><label for="embed_width">px</label>,<label class="title" for="embed_height">高度:</label><input type="text" id="embed_height" name="embed_height" class="txt-input" value="245"><label for="embed_height">px</label></div></div>',
        execute: function(e) {
            $("#iframe_html").val("");
            $(".embed-preview").html("");
            var c = "/embed/mind/";
            var a, b;
            a = $("#embed_width").val();
            b = $("#embed_height").val();
            d(a, b);
            $("#iframe_html").select();
            function d(f, j) {
                var g = '<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:' + f + "px; height:" + j + 'px;" src="https://www.processon.com' + (c + e) + '"></iframe>';
                $("#iframe_html").val(g);
                $(".embed-preview-wrap").css({
                    "margin-top": (-j / 2) + "px",
                    "margin-left": (-f / 2) + "px"
                });
                $(".embed-preview").html(g);
                var i = document.getElementById("embed_dom");
                i.onload = i.onreadystatechange = function() {
                    if (!i.readyState || i.readyState == "complete") {
                        setTimeout(function() {
                            $(".embed-preview .preview_dis").remove();
                            setTimeout(function() {
                                $(".embed_obj").fadeIn()
                            }, 100)
                        }, 400)
                    }
                }
            }
            $(".embed-size").find("input").keyup(function() {
                var f = $.trim($("#embed_width").val()) == "" ? 340 : $.trim($("#embed_width").val());
                var g = $.trim($("#embed_height").val()) == "" ? 160 : $.trim($("#embed_height").val());
                f = parseInt(f);
                g = parseInt(g);
                $(".embed-preview").find("div:first").css({
                    width: f + "px",
                    height: g + "px"
                });
                $(".embed-preview").find("iframe").css({
                    width: f + "px",
                    height: g + "px"
                });
                d(f, g)
            });
            $("#iframe_html").off().on("click", function() {
                $(this).select();
                try {
                    if (document.execCommand("copy", false, null)) {
                        Util.globalTopTip("链接已复制到剪切板", "top_success", 3000, $("#mind-share-dlg"), true)
                    } else {}
                } catch (f) {}
            });
            $(".embed-preview").keydown(function() {
                $(".embed-size").find("input").blur()
            })
        }
    },
    image: {
        source: '<div class="dlg-content"><h3><span class="tip1">分享图片链接</span></h3><div><input type="text" id="img_link_input" class="txt-input" readonly style="width:95%;margin-top:10px;"><div style="clear:both;"></div></div></div>',
        execute: function(a) {
            $.ajax({
                url: "/folder/on_line_pic/" + a,
                success: function(c) {
                    $("#img_link_input").show().prev().hide();
                    var b = c.url.replace("www.processon.com", "assets.processon.com");
                    $("#img_link_input").val(b).off().on("click", function() {
                        $(this).select();
                        try {
                            if (document.execCommand("copy", false, null)) {
                                Util.globalTopTip("链接已复制到剪切板", "top_success", 3000, $("#mind-share-dlg"), true)
                            } else {}
                        } catch (d) {}
                    }).select()
                }
            })
        }
    },
    collaboration: {
        loadingcolla: false,
        followingPage: 0,
        followerPage: 0,
        loadAvatar: function(b) {
            var a = "https://accounts.processon.com";
            var d = location.origin.toLowerCase();
            var c = d.indexOf(".processon.com");
            if (c < 0) {
                a = ""
            }
            if (!b) {
                return '<img src="/assets/imgs/on.png"/>'
            } else {
                return '<img src="' + a + "/photo/" + b + '.png"/>'
            }
        },
        init: function(c, b) {
            var a = this;
            a.multiVal = [];
            a.multiType = [];
            a.getContacters();
            a.getRoleList();
            $(".colla-tab").off().on("click", function() {
                var e = $(this).attr("tit");
                if ($(this).hasClass("active")) {
                    return
                }
                $(this).addClass("active").siblings().removeClass("active");
                switch (e) {
                case "colla_users":
                    $("#colla_users").show().siblings().hide();
                    break;
                case "colla_teams":
                    var d = $(".colla-team-user").length;
                    if (d < 1) {
                        a.getTeams()
                    }
                    $("#colla_teams").show().siblings().hide();
                    break;
                case "colla_following":
                    var f = $("#colla_following")
                      , i = f.find(".colla-follow-user").length;
                    if (i < 1) {
                        f.empty();
                        a.getCollaFollwinger("following", 0)
                    }
                    f.show().siblings().hide();
                    break;
                case "colla_follower":
                    var h = $("#colla_follower")
                      , g = h.find(".colla-follow-user").length;
                    if (g < 1) {
                        h.empty();
                        a.getCollaFollwinger("follower", 0)
                    }
                    h.show().siblings().hide();
                    break
                }
            });
            $(".mind-colladd-dlg-close").on("click", function() {
                $("#colla_add").hide();
                $.mask("close")
            });
            $(".colla-context-con").on("click", ".colla-follow-more", function(f) {
                var d = $(this).parent().data("type");
                a[d + "Page"] += 1;
                a.getCollaFollwinger(d, a[d + "Page"])
            });
            $(document).off("click", ".colla-team").on("click", ".colla-team", function(i) {
                var h = $(this)
                  , g = h.attr("tid")
                  , f = h.find(".mind-icons")
                  , d = f.hasClass("active");
                if (!d) {
                    if ($(".colla-team-user[tid=" + g + "]").length > 0) {
                        a.showTeamsMbs(null, g)
                    } else {
                        a.getTeamMembers(g)
                    }
                    f.addClass("active")
                } else {
                    f.removeClass("active");
                    a.hideTeamMbs(g)
                }
            });
            $(document).off("click", ".colla-user, .colla-team-user > div");
            $(document).on("click", ".colla-user, .colla-team-user > div", function(f) {
                var d = $(this).attr("uid")
                  , g = $(this).text();
                if (a.multiVal.indexOf(d) >= 0) {
                    return
                }
                $("#multi-input-colla").multiInput("setVal", d, g);
                a.multiVal.push(d);
                a.multiType.push("user")
            });
            $("#send-colla-invite").off().on("click", function(i) {
                var h = $("#colla_add")
                  , d = $("#multi-input");
                if (d.length > 0 && d.val() != "") {
                    var i = $.Event("keyup");
                    i.keyCode = 13;
                    d.trigger(i)
                }
                var g = a.multiVal;
                if (g.length == 0) {
                    return
                }
                $("#send-colla-invite").hide();
                $("#send-colla-invite-loading").show();
                var f = [];
                $.ajax({
                    url: "/collaboration/add",
                    data: {
                        type: "email",
                        targets: g.join(","),
                        targetTypes: a.multiType.join(","),
                        folderId: b == "folder" ? c : "",
                        chartId: b == "chart" ? c : "",
                        role: $("#role").val()
                    },
                    success: function(j) {
                        a.multiVal = [];
                        a.multiType = [];
                        $("#send-colla-invite-loading").hide();
                        $("#send-colla-invite").show();
                        $(".multi-input-vals").empty();
                        if (j.result == "success") {
                            Util.globalTopTip("邀请协作发送成功", "top_success", "3000", h, true);
                            a.getRoleList();
                            return false
                        }
                        if (j.result == "exists") {
                            Util.globalTopTip("邀请人已加入协作", "top_error", "3000", h, true)
                        }
                        if (j.result == "expired") {
                            Util.globalTopTip("协作人数已达到上限,请升级至团队版解锁全部功能", "top_error", "3000", h, true)
                        }
                    }
                })
            });
            $("#multi-input-colla").multiInput({
                setVal: function(d) {
                    if (a.multiVal.indexOf(d) >= 0) {
                        return
                    }
                    a.multiVal.push(d);
                    a.multiType.push("email");
                    return d
                },
                deleteVal: function(e) {
                    var d = a.multiVal.indexOf(e);
                    a.multiVal.splice(d, 1);
                    a.multiType.splice(d, 1)
                }
            })
        },
        multiType: [],
        multiVal: [],
        totalCount: 0,
        showCount: 0,
        getContacters: function() {
            var a = this;
            $.ajax({
                url: "/collaboration/get_contacter",
                success: function(b) {
                    a.showContacters(b)
                }
            })
        },
        getTeams: function() {
            var a = this;
            $.ajax({
                url: "/collaboration/get_teams",
                success: function(b) {
                    a.showTeams(b)
                }
            })
        },
        getCollaFollwinger: function(a, c) {
            Util.globalTopTip("加载中...", null, 2000, $("#colla_add"), true);
            var b = this;
            $.ajax({
                url: "/u/colla/more",
                data: {
                    page: c,
                    type: a
                },
                success: function(d) {
                    b.showFollowinger(d, $("#colla_" + a), a);
                    Util.globalTopTip("close")
                }
            })
        },
        getTeamMembers: function(b, c) {
            var a = this
              , c = c || 1;
            $.ajax({
                url: "/collaboration/get_teams_mbs",
                data: {
                    teamId: b,
                    pn: c
                },
                success: function(d) {
                    a.totalCount = d.total;
                    a.showCount = d.skip;
                    a.showTeamsMbs(d, b);
                    $("#loadMore").off().on("click", function(f) {
                        a.getTeamMembers(b, c + 1)
                    })
                }
            })
        },
        showContacters: function(e) {
            var d = "";
            if (e != null && e.contacters.length > 0) {
                for (var c = 0, a = e.contacters.length; c < a; c++) {
                    var b = e.contacters[c];
                    if (b == null) {
                        continue
                    }
                    d += '<div uid="' + b.userId + '" class="colla-user"><span>' + mindShare.collaboration.loadAvatar(b.userId) + "</span><span>" + b.fullName + "</span></div>"
                }
            } else {
                d = "<div class='colla-users-none'><img src='/assets/images/icon/empty_contact.svg'/><div>还没有最近联系人</div></div>"
            }
            $("#colla_users").html(d)
        },
        showFollowinger: function(d, g, j) {
            var f = "";
            var a = d.users.length;
            var k = g.find(".colla-follow-more");
            if (a == 6) {
                if (k.length < 1) {
                    k = $("<div class='colla-follow-more'>更多</div>");
                    k.appendTo(g)
                }
                k.show()
            } else {
                if (a < 6) {
                    if (k.length > 0) {
                        k.hide()
                    }
                }
            }
            if (d != null && a > 0) {
                for (var e = 0, h = a; e < h; e++) {
                    var c = d.users[e];
                    if (c == null) {
                        continue
                    }
                    var b = '<span class="user-logo tmu-photo">' + mindShare.collaboration.loadAvatar(c.userId) + "</span>";
                    f += '<div uid="' + c.userId + '" class="colla-user"><span>' + b + "</span><span>" + c.fullName + "</span></div>"
                }
            }
            g.append(f);
            if (g.find(".colla-user ").length < 1) {
                var l = "您还没有关注用户";
                if (j != "following") {
                    l = "您还没有粉丝"
                }
                g.html("<div class='colla-users-none'><img src='/assets/images/icon/empty_contact.svg'/><div>" + l + "</div></div>")
            }
        },
        showTeams: function(e) {
            var d = "";
            if (e != null && e.teams.length > 0) {
                for (var c = 0, a = e.teams.length; c < a; c++) {
                    var b = e.teams[c];
                    if (b == null) {
                        continue
                    }
                    d += '<div tid="' + b.groupId + '" class="colla-team"><span>' + mindShare.collaboration.getTeamLogo(b) + '</span><span class="title">' + b.groupName + '</span><span class="mind-icons showteammember">&#xe668;</span></div>'
                }
            } else {
                d = "<div class='colla-users-none'><img src='/assets/images/icon/empty_team.svg'/><div>您还未创建或者加入任何小组</div></div>"
            }
            $("#colla_teams").html(d)
        },
        getTeamLogo: function(b) {
            var a = "<span class='mind-icons teamlogo'>&#xe728;</span>";
            if (b != null && b.logoFileName != null && b.logoFileName != "") {
                a = "<img src='/file/response/" + b.logoFileName + "/team_logo'/>"
            }
            return a
        },
        showTeamsMbs: function(f, h) {
            var e = "";
            if (f != null && f.users.length > 0) {
                for (var d = 0, a = f.users.length; d < a; d++) {
                    var b = f.users[d];
                    if (b == null) {
                        continue
                    }
                    var c = '<div class="user-logo tmu-photo">' + mindShare.collaboration.loadAvatar(b.userId) + "</div>";
                    e += '<div uid="' + b.userId + '"><span>' + c + "</span><span>" + b.fullName + "</span></div>"
                }
                var g = $(".colla-team-user[tid=" + h + "]");
                if (g.length == 0) {
                    g = $("<div class='colla-team-user' tid='" + h + "' ></div>");
                    $(".colla-team[tid=" + h + "]").after(g)
                }
                if (this.showCount < this.totalCount) {
                    if ($("#loadMore").length > 0) {
                        $("#loadMore").before(e)
                    } else {
                        e += "<div id='loadMore' style='padding:0px;height: 12px;width: 50%;margin-left:25%;text-align: center;cursor: pointer;margin-top: 5px;border-radius: 6px;border: 1px solid #dcdcdc;'><span class='mind-icons' style='font-size:24px;margin-top:-10px;'>&#xe631;</span></div>";
                        g.append(e)
                    }
                } else {
                    g.append(e);
                    $("#loadMore").hide()
                }
            } else {
                $(".colla-team-user[tid=" + h + "]").show()
            }
        },
        hideTeamMbs: function(a) {
            $(".colla-team-user[tid=" + a + "]").hide()
        },
        getRoleList: function(c, b) {
            var a = this;
            $.ajax({
                url: "/collaboration/list_users",
                data: {
                    chartId: chartId,
                    pg: b || 1
                },
                success: function(d) {
                    a.showRoleList(d)
                }
            })
        },
        showRoleList: function(f) {
            $("#role_list").empty();
            var e = "";
            if (f.owner != null) {
                e = '<div class="role-item"><span class="item-portrait">' + mindShare.collaboration.loadAvatar(f.owner.userId) + '</span><span class="item-user-fullname">' + f.owner.fullName + '</span><span class="item-role-status"></span><span class="role-sel-con" style="padding-left:7px;">创建者</span><span class="closeme"></span></div>'
            }
            if (f.collaborations != null) {
                for (var d = 0; d < f.collaborations.length; d++) {
                    var a = f.collaborations[d].user
                      , c = f.collaborations[d];
                    var b = '<div class="user-logo tmu-photo">' + mindShare.collaboration.loadAvatar(a.userId) + "</div>";
                    e += '<div id="item_' + c.collborationId + '" class="role-item"><span class="item-portrait">' + b + '</span><span class="item-user-fullname">' + a.fullName + '</span><span class="item-role-status" >' + c.email + '</span><span class="role-sel-con" ><select onchange="mindShare.collaboration.setRole(\'' + c.collborationId + '\',this)"><option value="editor" ' + (c.role == "editor" ? 'selected="selected"' : "") + ' ">编辑者</option><option value="viewer" ' + (c.role == "viewer" ? 'selected="selected"' : "") + ' ">浏览者</option></select></span><span title="移除" onclick="mindShare.collaboration.removeRoleUser(\'' + c.collborationId + "','" + c.user.userId + '\')" class="mind-icons closeme">&#xe622;</span></div>'
                }
            }
            $("#role_list").html(e)
        },
        setRole: function(a, b) {
            if (a != "") {
                $.ajax({
                    url: "/collaboration/set_role",
                    data: {
                        role: b.value,
                        collaborationId: a
                    },
                    success: function(c) {
                        Util.globalTopTip("修改成功", null, 2000, $("#colla_add"), true)
                    }
                })
            }
        },
        removeRoleUser: function(b, a) {
            $.ajax({
                url: "/collaboration/delete",
                data: {
                    type: "user",
                    collaborationId: b
                },
                success: function(c) {
                    $("#item_" + b).remove();
                    Util.globalTopTip("已删除", null, 900, $("#colla_add"), true)
                }
            })
        },
        renderExcludeInut: function(d) {
            var b = "";
            for (var c = 0, a = d.length; c < a; c++) {
                b += '<span val="' + d[0] + '" class="multi-input-value"><span class="icons" style="color:#f60;">&#xe614;</span><span class="multi-text" style="color:#f60;">' + d[0] + '</span><span class="mind-icons closeme" style="color:#f20;">&#xe622;</span></span>'
            }
            $(".multi-input-vals").append(b)
        }
    }
};
var Outline = {
    init: function(b, d, a) {
        var c = {
            listType: "dot",
            indent: "default",
            target: "outline-con",
            line: {
                show: false
            }
        };
        this.opts = $.extend(c, b);
        this.designer = document.getElementById(b.target);
        if (d != null) {
            this.controller.renderAll()
        } else {
            this.controller.add()
        }
        this.controller.initEvent()
    },
    initNodeEvent: function(b) {
        var a = this
          , c = document;
        var d = b.querySelector(".node-self");
        d.addEventListener("mouseenter", function(f) {
            Outline.controller.posNodeBg(d, "hover");
            f.stopPropagation()
        });
        d.addEventListener("mouseleave", function(g) {
            var f = c.querySelector(".outline-hover-bg");
            f.style.display = "none";
            g.stopPropagation()
        });
        d.addEventListener("mousedown", function(f) {
            var g = b.getAttribute("id").replace("ol_", "");
            mind.util.selectById.call(mind, g);
            f.stopPropagation()
        });
        $("#ol_root").off().on("click", function() {
            mind.util.selectById.call(mind, "root")
        });
        if (this.opts.readOnly) {
            return
        }
    },
    controller: {
        setTitle: function(b) {
            var a = $(Outline.designer).prev();
            a.html(b).attr("id", "ol_root")
        },
        renderAll: function(d) {
            var e = mind.model.topic
              , b = Outline.designer;
            if (d) {
                document.querySelector("#ol_" + d.id).innerHTML = "";
                this.add(null, d);
                var a = d.children;
                if (a && !d.collapsed) {
                    this.renderChild(a)
                }
                return
            }
            var a = e.children || []
              , f = e.leftChildren || [];
            this.setTitle(e.title);
            b.innerHTML = "";
            var c = a.concat(f);
            if (c.length == 0) {
                return
            }
            this.renderChild(c, b)
        },
        renderChild: function(e, d) {
            for (var c = 0, a = e.length; c < a; c++) {
                var f = e[c];
                this.add(null, f, d);
                if (f.children.length > 0) {
                    if (f.collapsed == undefined || !f.collapsed) {
                        var b = f.children;
                        this.renderChild(b)
                    }
                }
            }
        },
        add: function(o, p, b) {
            var n = document
              , a = Outline.opts
              , i = Outline.model;
            var c = p ? p.id : util.newId()
              , o = o || 0;
            var g = null;
            var l = n.querySelector("#ol_" + c);
            if (l) {
                g = l
            } else {
                g = n.createElement("div");
                if (a.indent == "wider") {
                    g.setAttribute("class", "node-element wider")
                } else {
                    g.setAttribute("class", "node-element")
                }
                g.setAttribute("id", "ol_" + c);
                if (p != null) {
                    if (b == null) {
                        b = n.getElementById("ol_" + p.parent).querySelector(".node-children")
                    }
                    b.appendChild(g)
                }
            }
            var f = n.createElement("div");
            f.setAttribute("class", "node-self");
            g.appendChild(f);
            var e = n.createElement("span");
            f.appendChild(e);
            var h = n.createElement("span");
            e.appendChild(h);
            var m = n.createElement("div");
            m.setAttribute("class", "node-title");
            if (!a.readOnly) {
                m.setAttribute("contenteditable", true)
            }
            m.setAttribute("spellcheck", "false");
            m.setAttribute("autocapitalize", "off");
            var j = p ? p.title : "";
            m.innerHTML = j.replace("<br>", " ");
            f.appendChild(m);
            var d = n.createElement("div");
            var k = "node-children";
            if (a.line.show) {
                k += " line"
            }
            if (a.line.dashed) {
                k += " dashed"
            }
            d.setAttribute("class", k);
            g.appendChild(d);
            if (a.listType == "num") {
                e.setAttribute("class", "node-type num")
            } else {
                e.setAttribute("class", "node-type dot")
            }
            if (p != null) {
                this.addStateIcon(p, g)
            } else {
                m.focus()
            }
            Outline.initNodeEvent(g)
        },
        addStateIcon: function(f, c) {
            var b = document;
            var e = c.querySelector(".node-state")
              , d = c.querySelector(".node-self");
            if (f.children.length > 0 && e == null) {
                e = b.createElement("div");
                e.setAttribute("class", "node-state");
                var a = b.createElement("span");
                if (f.collapsed) {
                    a.setAttribute("class", "collapse-icon closeIcon")
                } else {
                    a.setAttribute("class", "collapse-icon openIcon")
                }
                e.appendChild(a);
                d.appendChild(e)
            }
        },
        selectNodeById: function(c) {
            var b = document.querySelector("#ol_" + c)
              , a = null;
            if (c == "root") {
                a = b
            } else {
                a = b.querySelector(".node-self")
            }
            this.selectNode(a)
        },
        updateNodeById: function(f) {
            var g = f.id
              , e = f.insertChild;
            if (g == "root") {
                this.renderAll();
                return
            }
            if (e || f.rebuild == "current") {
                var b = document.querySelector("#ol_" + g)
                  , c = this.getNodeById(g);
                var a = b.querySelector(".node-children");
                if (a) {
                    a.innerHTML = ""
                }
                this.renderAll(c);
                return
            }
            var d = this.getParentNodeById(g);
            if (d.id == "root") {
                this.renderAll();
                return
            }
            var b = document.querySelector("#ol_" + d.id)
              , a = b.querySelector(".node-children");
            if (a) {
                a.innerHTML = ""
            }
            this.renderAll(d)
        },
        foldNodeById: function(b) {
            var a = b.type
              , c = b.id;
            if (a == "show") {
                this.openChildren("ol_" + c);
                return
            }
            this.closeChildren("ol_" + c)
        },
        nodePosUpdate: function(e) {
            var a = e.id
              , h = e.target;
            if (h == "root") {
                this.renderAll()
            } else {
                var d = document.querySelector("#ol_" + h)
                  , f = this.getNodeById(h)
                  , i = d.querySelector(".node-children");
                if (i) {
                    i.innerHTML = ""
                }
                this.renderChild(f.children)
            }
            if (a == h) {
                return
            }
            if (a == "root") {
                this.renderAll()
            } else {
                var c = this.getNodeById(a)
                  , b = document.querySelector("#ol_" + a)
                  , g = b.querySelector(".node-children");
                if (g) {
                    g.innerHTML = ""
                }
                this.renderChild(c.children)
            }
        },
        openChildren: function(e) {
            var c = this.getNodeById(e.replace("ol_", ""))
              , b = document.querySelector("#" + e);
            var a = b.querySelector(".node-children");
            if (a) {
                a.innerHTML = ""
            }
            this.renderChild(c.children);
            $(a).show();
            var d = b.querySelector(".collapse-icon");
            if (d) {
                d.classList.remove("closeIcon");
                d.classList.remove("openIcon");
                d.classList.add("openIcon")
            }
        },
        closeChildren: function(d) {
            var a = document.getElementById(d)
              , b = a.querySelector(".node-children");
            $(b).hide();
            var c = a.querySelector(".collapse-icon");
            if (c) {
                c.classList.remove("openIcon");
                c.classList.remove("closeIcon");
                c.classList.add("closeIcon")
            }
        },
        selectNode: function(a) {
            this.posNodeBg(a, "current")
        },
        posNodeBg: function(d, b) {
            var a = null;
            if (b == "hover") {
                a = document.querySelector(".outline-hover-bg")
            }
            if (b == "current") {
                a = document.querySelector(".outline-curt-bg")
            }
            var c = d.getBoundingClientRect();
            a.style.top = c.top - 45 + "px";
            a.style.display = "block";
            c = null
        },
        getNodeById: function(a) {
            return mind.model.getTopicById(a)
        },
        getParentNodeById: function(b) {
            b = b.replace("ol_", "");
            var a = mind.model.getTopicById(b);
            return mind.model.getTopicById(a.parent)
        },
        initEvent: function() {
            var a = this;
            $(document).on("click", ".node-state", function(f) {
                var d = $(this)
                  , c = d.parent().parent()
                  , g = c.attr("id");
                var b = $(d.children()[0]);
                if (b.hasClass("openIcon")) {
                    a.closeChildren(g);
                    b.removeClass("openIcon").addClass("closeIcon")
                } else {
                    a.openChildren(g);
                    b.removeClass("closeIcon").addClass("openIcon")
                }
                f.stopPropagation()
            })
        }
    },
    util: {
        newId: function() {
            function a() {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            }
            return (a() + "" + a() + "" + a() + "" + a())
        },
        copy: function(a) {
            return $.extend({}, a)
        },
        getElementIndex: function(a) {
            var b = $(a);
            return b.index()
        },
        getCurrentDate: function() {
            var b = new Date();
            var a = []
              , c = [];
            a.push(b.getFullYear());
            a.push((b.getMonth() + 1));
            a.push(b.getDate());
            c.push(b.getHours());
            c.push(b.getMinutes());
            c.push(b.getSeconds());
            return a.join("-") + " " + c.join(":")
        },
        moveToEnd: function(b) {
            var a = document.getElementById(b);
            a.setSelectionRange(1, 1)
        },
        removeAttribute: function(d, b) {
            if (!d || !b) {
                return
            }
            for (var c = 0, a = d.length; c < a; c++) {
                var e = d[c];
                e.removeAttribute(b)
            }
        },
        setCursorPosition: function(g, f) {
            var d = document.getElementById("ol_" + g);
            if (d == null) {
                return
            }
            var c = d.querySelector(".node-title");
            if (f == null) {
                f = c.innerText.length
            }
            var a = c.childNodes[0];
            if (a == null) {
                c.focus();
                return
            }
            var b = document.createRange();
            var e = window.getSelection();
            b.setStart(a, f);
            b.setEnd(a, f);
            b.collapse(true);
            e.removeAllRanges();
            e.addRange(b);
            c.focus()
        }
    }
};
$(function() {
    getDef(function(a) {
        if (a != null && a.theme && a.theme.indexOf("customise_") >= 0) {
            getThemeById(a.theme, function(b) {
                mind = new mindDesigner("#mind_con",{
                    chartId: chartId
                },JSON.stringify(a),b)
            })
        } else {
            mind = new mindDesigner("#mind_con",{
                chartId: chartId
            },JSON.stringify(a))
        }
        setTimeout(function() {
            mind.plugins.navigator.init.call(mind)
        }, 500)
    })
});
function getDef(a) {
    $.get("/diagraming/getdef", {
        id: chartId
    }, function(b) {
        a(JSON.parse(b.def))
    })
}
;
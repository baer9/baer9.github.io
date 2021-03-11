// ==UserScript==
// @name           豆瓣资源下载大师·完整版
// @description    在豆瓣电影/电视剧/纪录片/综艺/动画等页面显示对应的在线播放链接、字幕下载链接及PT/NZB/BT/磁力/百度盘/115网盘等资源下载链接，聚合173+主流资源网站/字幕网站/资源搜索引擎，是目前聚合资源网站最多的脚本，独家资源颜色标记功能：有对应资源的网站显示绿色，当前无法访问的网站显示白色，没有对应资源的网站则显示删除线；给豆瓣电影条目添加IMDB评分、Metascore及烂番茄评分；本脚本聚合的网站包含需要登陆才能自动颜色标记是否有对应资源的PT/NZB/论坛等网站，如无需聚合这些需要登陆的资源网站，请下载安装豆瓣资源下载大师·轻量版脚本。
// @author         白鸽男孩
// @connect        *
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @require        http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require        https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js
// @include        https://movie.douban.com/
// @match          https://movie.douban.com/*
// @version        2.1.0
// @run-at         document-start
// @namespace      doveboy_js

// ==/UserScript==

// 脚本对页面进行预处理
if($('#info span.pl:contains("又名")').length === 0){
    $('#info').append('<div style="display: none"><span class="pl">又名:</span>啥也没有<br></div>');
}

if($('div#info a[href^=\'http://www.imdb.com/title/tt\']').length === 0){
    $('#info').append('<div style="display: none"><span class="pl">IMDb链接:</span><a href="http://www.imdb.com/title/tt9999999" target="_blank" rel="nofollow">tt9999999</a><br></div>');
}

let myScriptStyle = document.createElement("style");
myScriptStyle.innerHTML = "@charset utf-8;#dale_movie_subject_top_right,#dale_movie_subject_top_right,#dale_movie_subject_top_midle,#dale_movie_subject_middle_right,#dale_movie_subject_bottom_super_banner,#footer,#dale_movie_subject_download_middle,#dale_movie_subject_inner_middle,#movie_home_left_bottom,#dale_movie_home_top_right,#dale_movie_home_side_top,#dale_movie_home_bottom_right,#dale_movie_home_inner_bottom,#dale_movie_home_download_bottom,#dale_movie_home_bottom_right_down,#dale_movie_towhome_explore_right,#dale_movie_chart_top_right,#dale_movie_tags_top_right,#dale_review_best_top_right,.mobile-app-entrance.block5.app-movie,.qrcode-app,.top-nav-doubanapp,.extra,div.gray_ad,p.pl,div.ticket{display:none}.c-aside{margin-bottom:30px}.c-aside-body{*letter-spacing:normal}.c-aside-body a{border-radius:6px;color:#37A;display:inline-block;letter-spacing:normal;margin:0 8px 8px 0;padding:0 8px;text-align:center;width:65px}.c-aside-body a:link,.c-aside-body a:visited{background-color:#f5f5f5;color:#37A}.c-aside-body a:hover,.c-aside-body a:active{background-color:#e8e8e8;color:#37A}.c-aside-body a.disabled{text-decoration:line-through}.c-aside-body a.available{background-color:#5ccccc;color:#006363}.c-aside-body a.available:hover,.c-aside-body a.available:active{background-color:#3cc}.c-aside-body a.sites_r0{text-decoration:line-through}#c_dialog li{margin:10px}#c_dialog{text-align:center}#interest_sectl .rating_imdb{border-bottom:1px solid #eaeaea;padding-bottom:0}#interest_sectl .rating_wrap{padding-top:15px}#interest_sectl .rating_more{border-bottom:1px solid #eaeaea;color:#9b9b9b;margin:0;padding:15px 0;position:relative}#interest_sectl .rating_more a{left:80px;position:absolute}#interest_sectl .rating_more .titleOverviewSprite{background:url(https://coding.net/u/Changhw/p/MyDoubanMovieHelper/git/raw/master/title_overview_sprite.png) no-repeat;display:inline-block;vertical-align:middle}#interest_sectl .rating_more .popularityImageUp{background-position:-14px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityImageDown{background-position:-34px -478px;height:8px;width:8px}#interest_sectl .rating_more .popularityUpOrFlat{color:#83C40B}#interest_sectl .rating_more .popularityDown{color:#930E02}/*!jQuery UI - v1.12.1 - 2016-09-14 * http://jqueryui.com * Includes:core.css,accordion.css,autocomplete.css,menu.css,button.css,controlgroup.css,checkboxradio.css,datepicker.css,dialog.css,draggable.css,resizable.css,progressbar.css,selectable.css,selectmenu.css,slider.css,sortable.css,spinner.css,tabs.css,tooltip.css,theme.css * To view and modify this theme,visit http://jqueryui.com/themeroller/?bgShadowXPos=&bgOverlayXPos=&bgErrorXPos=&bgHighlightXPos=&bgContentXPos=&bgHeaderXPos=&bgActiveXPos=&bgHoverXPos=&bgDefaultXPos=&bgShadowYPos=&bgOverlayYPos=&bgErrorYPos=&bgHighlightYPos=&bgContentYPos=&bgHeaderYPos=&bgActiveYPos=&bgHoverYPos=&bgDefaultYPos=&bgShadowRepeat=&bgOverlayRepeat=&bgErrorRepeat=&bgHighlightRepeat=&bgContentRepeat=&bgHeaderRepeat=&bgActiveRepeat=&bgHoverRepeat=&bgDefaultRepeat=&iconsHover=url(%22images%2Fui-icons_555555_256x240.png%22)&iconsHighlight=url(%22images%2Fui-icons_777620_256x240.png%22)&iconsHeader=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsError=url(%22images%2Fui-icons_cc0000_256x240.png%22)&iconsDefault=url(%22images%2Fui-icons_777777_256x240.png%22)&iconsContent=url(%22images%2Fui-icons_444444_256x240.png%22)&iconsActive=url(%22images%2Fui-icons_ffffff_256x240.png%22)&bgImgUrlShadow=&bgImgUrlOverlay=&bgImgUrlHover=&bgImgUrlHighlight=&bgImgUrlHeader=&bgImgUrlError=&bgImgUrlDefault=&bgImgUrlContent=&bgImgUrlActive=&opacityFilterShadow=Alpha(Opacity%3D30)&opacityFilterOverlay=Alpha(Opacity%3D30)&opacityShadowPerc=30&opacityOverlayPerc=30&iconColorHover=%23555555&iconColorHighlight=%23777620&iconColorHeader=%23444444&iconColorError=%23cc0000&iconColorDefault=%23777777&iconColorContent=%23444444&iconColorActive=%23ffffff&bgImgOpacityShadow=0&bgImgOpacityOverlay=0&bgImgOpacityError=95&bgImgOpacityHighlight=55&bgImgOpacityContent=75&bgImgOpacityHeader=75&bgImgOpacityActive=65&bgImgOpacityHover=75&bgImgOpacityDefault=75&bgTextureShadow=flat&bgTextureOverlay=flat&bgTextureError=flat&bgTextureHighlight=flat&bgTextureContent=flat&bgTextureHeader=flat&bgTextureActive=flat&bgTextureHover=flat&bgTextureDefault=flat&cornerRadius=3px&fwDefault=normal&ffDefault=Arial%2CHelvetica%2Csans-serif&fsDefault=1em&cornerRadiusShadow=8px&thicknessShadow=5px&offsetLeftShadow=0px&offsetTopShadow=0px&opacityShadow=.3&bgColorShadow=%23666666&opacityOverlay=.3&bgColorOverlay=%23aaaaaa&fcError=%235f3f3f&borderColorError=%23f1a899&bgColorError=%23fddfdf&fcHighlight=%23777620&borderColorHighlight=%23dad55e&bgColorHighlight=%23fffa90&fcContent=%23333333&borderColorContent=%23dddddd&bgColorContent=%23ffffff&fcHeader=%23333333&borderColorHeader=%23dddddd&bgColorHeader=%23e9e9e9&fcActive=%23ffffff&borderColorActive=%23003eff&bgColorActive=%23007fff&fcHover=%232b2b2b&borderColorHover=%23cccccc&bgColorHover=%23ededed&fcDefault=%23454545&borderColorDefault=%23c5c5c5&bgColorDefault=%23f6f6f6 * Copyright jQuery Foundation and other contributors;Licensed MIT */ .ui-helper-hidden{display:none}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ui-helper-reset{border:0;font-size:100%;line-height:1.3;list-style:none;margin:0;outline:0;padding:0;text-decoration:none}.ui-helper-clearfix:before,.ui-helper-clearfix:after{border-collapse:collapse;content:'';display:table}.ui-helper-clearfix:after{clear:both}.ui-helper-zfix{height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;filter:Alpha(Opacity=0)}.ui-front{z-index:100}.ui-state-disabled{cursor:default !important;pointer-events:none}.ui-icon{background-repeat:no-repeat;display:inline-block;margin-top:-.25em;overflow:hidden;position:relative;text-indent:-99999px;vertical-align:middle}.ui-widget-icon-block{display:block;left:50%;margin-left:-8px}.ui-widget-overlay{height:100%;left:0;position:fixed;top:0;width:100%}.ui-accordion .ui-accordion-header{cursor:pointer;display:block;font-size:100%;margin:2px 0 0 0;padding:.5em .5em .5em .7em;position:relative}.ui-accordion .ui-accordion-content{border-top:0;overflow:auto;padding:1em 2.2em}.ui-autocomplete{cursor:default;left:0;position:absolute;top:0}.ui-menu{display:block;list-style:none;margin:0;outline:0;padding:0}.ui-menu .ui-menu{position:absolute}.ui-menu .ui-menu-item{cursor:pointer;list-style-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);margin:0}.ui-menu .ui-menu-item-wrapper{padding:3px 1em 3px .4em;position:relative}.ui-menu .ui-menu-divider{border-width:1px 0 0 0;font-size:0;height:0;line-height:0;margin:5px 0}.ui-menu .ui-state-focus,.ui-menu .ui-state-active{margin:-1px}.ui-menu-icons{position:relative}.ui-menu-icons .ui-menu-item-wrapper{padding-left:2em}.ui-menu .ui-icon{bottom:0;left:.2em;margin:auto 0;position:absolute;top:0}.ui-menu .ui-menu-icon{left:auto;right:0}.ui-button{cursor:pointer;display:inline-block;line-height:normal;margin-right:.1em;overflow:visible;padding:.4em 1em;position:relative;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui-button,.ui-button:link,.ui-button:visited,.ui-button:hover,.ui-button:active{text-decoration:none}.ui-button-icon-only{box-sizing:border-box;text-indent:-9999px;white-space:nowrap;width:2em}input.ui-button.ui-button-icon-only{text-indent:0}.ui-button-icon-only .ui-icon{left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-button.ui-icon-notext .ui-icon{height:2.1em;padding:0;text-indent:-9999px;white-space:nowrap;width:2.1em}input.ui-button.ui-icon-notext .ui-icon{height:auto;padding:.4em 1em;text-indent:0;white-space:normal;width:auto}input.ui-button::-moz-focus-inner,button.ui-button::-moz-focus-inner{border:0;padding:0}.ui-controlgroup{display:inline-block;vertical-align:middle}.ui-controlgroup>.ui-controlgroup-item{float:left;margin-left:0;margin-right:0}.ui-controlgroup>.ui-controlgroup-item:focus,.ui-controlgroup>.ui-controlgroup-item.ui-visual-focus{z-index:9999}.ui-controlgroup-vertical>.ui-controlgroup-item{display:block;float:none;margin-bottom:0;margin-top:0;text-align:left;width:100%}.ui-controlgroup-vertical .ui-controlgroup-item{box-sizing:border-box}.ui-controlgroup .ui-controlgroup-label{padding:.4em 1em}.ui-controlgroup .ui-controlgroup-label span{font-size:80%}.ui-controlgroup-horizontal .ui-controlgroup-label + .ui-controlgroup-item{border-left:none}.ui-controlgroup-vertical .ui-controlgroup-label + .ui-controlgroup-item{border-top:none}.ui-controlgroup-horizontal .ui-controlgroup-label.ui-widget-content{border-right:none}.ui-controlgroup-vertical .ui-controlgroup-label.ui-widget-content{border-bottom:none}.ui-controlgroup-vertical .ui-spinner-input{width:75%;width:calc(100% - 2.4em)}.ui-controlgroup-vertical .ui-spinner .ui-spinner-up{border-top-style:solid}.ui-checkboxradio-label .ui-icon-background{border:0;border-radius:.12em;box-shadow:inset 1px 1px 1px #ccc}.ui-checkboxradio-radio-label .ui-icon-background{border:0;border-radius:1em;height:16px;overflow:visible;width:16px}.ui-checkboxradio-radio-label.ui-checkboxradio-checked .ui-icon,.ui-checkboxradio-radio-label.ui-checkboxradio-checked:hover .ui-icon{background-image:none;border-style:solid;border-width:4px;height:8px;width:8px}.ui-checkboxradio-disabled{pointer-events:none}.ui-datepicker{display:none;padding:.2em .2em 0;width:17em}.ui-datepicker .ui-datepicker-header{padding:.2em 0;position:relative}.ui-datepicker .ui-datepicker-prev,.ui-datepicker .ui-datepicker-next{height:1.8em;position:absolute;top:2px;width:1.8em}.ui-datepicker .ui-datepicker-prev-hover,.ui-datepicker .ui-datepicker-next-hover{top:1px}.ui-datepicker .ui-datepicker-prev{left:2px}.ui-datepicker .ui-datepicker-next{right:2px}.ui-datepicker .ui-datepicker-prev-hover{left:1px}.ui-datepicker .ui-datepicker-next-hover{right:1px}.ui-datepicker .ui-datepicker-prev span,.ui-datepicker .ui-datepicker-next span{display:block;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%}.ui-datepicker .ui-datepicker-title{line-height:1.8em;margin:0 2.3em;text-align:center}.ui-datepicker .ui-datepicker-title select{font-size:1em;margin:1px 0}.ui-datepicker select.ui-datepicker-month,.ui-datepicker select.ui-datepicker-year{width:45%}.ui-datepicker table{border-collapse:collapse;font-size:.9em;margin:0 0 .4em;width:100%}.ui-datepicker th{border:0;font-weight:bold;padding:.7em .3em;text-align:center}.ui-datepicker td{border:0;padding:1px}.ui-datepicker td span,.ui-datepicker td a{display:block;padding:.2em;text-align:right;text-decoration:none}.ui-datepicker .ui-datepicker-buttonpane{background-image:none;border-bottom:0;border-left:0;border-right:0;margin:.7em 0 0 0;padding:0 .2em}.ui-datepicker .ui-datepicker-buttonpane button{cursor:pointer;float:right;margin:.5em .2em .4em;overflow:visible;padding:.2em .6em .3em .6em;width:auto}.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current{float:left}.ui-datepicker.ui-datepicker-multi{width:auto}.ui-datepicker-multi .ui-datepicker-group{float:left}.ui-datepicker-multi .ui-datepicker-group table{margin:0 auto .4em;width:95%}.ui-datepicker-multi-2 .ui-datepicker-group{width:50%}.ui-datepicker-multi-3 .ui-datepicker-group{width:33.3%}.ui-datepicker-multi-4 .ui-datepicker-group{width:25%}.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:0}.ui-datepicker-multi .ui-datepicker-buttonpane{clear:left}.ui-datepicker-row-break{clear:both;font-size:0;width:100%}.ui-datepicker-rtl{direction:rtl}.ui-datepicker-rtl .ui-datepicker-prev{left:auto;right:2px}.ui-datepicker-rtl .ui-datepicker-next{left:2px;right:auto}.ui-datepicker-rtl .ui-datepicker-prev:hover{left:auto;right:1px}.ui-datepicker-rtl .ui-datepicker-next:hover{left:1px;right:auto}.ui-datepicker-rtl .ui-datepicker-buttonpane{clear:right}.ui-datepicker-rtl .ui-datepicker-buttonpane button{float:left}.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current,.ui-datepicker-rtl .ui-datepicker-group{float:right}.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:1px;border-right-width:0}.ui-datepicker .ui-icon{background-repeat:no-repeat;display:block;left:.5em;overflow:hidden;text-indent:-99999px;top:.3em}.ui-dialog{left:0;outline:0;padding:.2em;position:absolute;top:0}.ui-dialog .ui-dialog-titlebar{padding:.4em 1em;position:relative}.ui-dialog .ui-dialog-title{float:left;margin:.1em 0;overflow:hidden;white-space:nowrap;width:90%;text-overflow:ellipsis}.ui-dialog .ui-dialog-titlebar-close{height:20px;margin:-10px 0 0 0;padding:1px;position:absolute;right:.3em;top:50%;width:20px}.ui-dialog .ui-dialog-content{background:none;border:0;overflow:auto;padding:.5em 1em;position:relative}.ui-dialog .ui-dialog-buttonpane{background-image:none;border-width:1px 0 0 0;margin-top:.5em;padding:.3em 1em .5em .4em;text-align:left}.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float:right}.ui-dialog .ui-dialog-buttonpane button{cursor:pointer;margin:.5em .4em .5em 0}.ui-dialog .ui-resizable-n{height:2px;top:0}.ui-dialog .ui-resizable-e{right:0;width:2px}.ui-dialog .ui-resizable-s{bottom:0;height:2px}.ui-dialog .ui-resizable-w{left:0;width:2px}.ui-dialog .ui-resizable-se,.ui-dialog .ui-resizable-sw,.ui-dialog .ui-resizable-ne,.ui-dialog .ui-resizable-nw{height:7px;width:7px}.ui-dialog .ui-resizable-se{bottom:0;right:0}.ui-dialog .ui-resizable-sw{bottom:0;left:0}.ui-dialog .ui-resizable-ne{right:0;top:0}.ui-dialog .ui-resizable-nw{left:0;top:0}.ui-draggable .ui-dialog-titlebar{cursor:move}.ui-draggable-handle{-ms-touch-action:none;touch-action:none}.ui-resizable{position:relative}.ui-resizable-handle{display:block;font-size:.1px;position:absolute;-ms-touch-action:none;touch-action:none}.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display:none}.ui-resizable-n{cursor:n-resize;height:7px;left:0;top:-5px;width:100%}.ui-resizable-s{bottom:-5px;cursor:s-resize;height:7px;left:0;width:100%}.ui-resizable-e{cursor:e-resize;height:100%;right:-5px;top:0;width:7px}.ui-resizable-w{cursor:w-resize;height:100%;left:-5px;top:0;width:7px}.ui-resizable-se{bottom:1px;cursor:se-resize;height:12px;right:1px;width:12px}.ui-resizable-sw{bottom:-5px;cursor:sw-resize;height:9px;left:-5px;width:9px}.ui-resizable-nw{cursor:nw-resize;height:9px;left:-5px;top:-5px;width:9px}.ui-resizable-ne{cursor:ne-resize;height:9px;right:-5px;top:-5px;width:9px}.ui-progressbar{height:2em;overflow:hidden;text-align:left}.ui-progressbar .ui-progressbar-value{height:100%;margin:-1px}.ui-progressbar .ui-progressbar-overlay{background:url(data:image/gif;base64,R0lGODlhKAAoAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQABACwAAAAAKAAoAAACkYwNqXrdC52DS06a7MFZI+4FHBCKoDeWKXqymPqGqxvJrXZbMx7Ttc+w9XgU2FB3lOyQRWET2IFGiU9m1frDVpxZZc6bfHwv4c1YXP6k1Vdy292Fb6UkuvFtXpvWSzA+HycXJHUXiGYIiMg2R6W459gnWGfHNdjIqDWVqemH2ekpObkpOlppWUqZiqr6edqqWQAAIfkECQEAAQAsAAAAACgAKAAAApSMgZnGfaqcg1E2uuzDmmHUBR8Qil95hiPKqWn3aqtLsS18y7G1SzNeowWBENtQd+T1JktP05nzPTdJZlR6vUxNWWjV+vUWhWNkWFwxl9VpZRedYcflIOLafaa28XdsH/ynlcc1uPVDZxQIR0K25+cICCmoqCe5mGhZOfeYSUh5yJcJyrkZWWpaR8doJ2o4NYq62lAAACH5BAkBAAEALAAAAAAoACgAAAKVDI4Yy22ZnINRNqosw0Bv7i1gyHUkFj7oSaWlu3ovC8GxNso5fluz3qLVhBVeT/Lz7ZTHyxL5dDalQWPVOsQWtRnuwXaFTj9jVVh8pma9JjZ4zYSj5ZOyma7uuolffh+IR5aW97cHuBUXKGKXlKjn+DiHWMcYJah4N0lYCMlJOXipGRr5qdgoSTrqWSq6WFl2ypoaUAAAIfkECQEAAQAsAAAAACgAKAAAApaEb6HLgd/iO7FNWtcFWe+ufODGjRfoiJ2akShbueb0wtI50zm02pbvwfWEMWBQ1zKGlLIhskiEPm9R6vRXxV4ZzWT2yHOGpWMyorblKlNp8HmHEb/lCXjcW7bmtXP8Xt229OVWR1fod2eWqNfHuMjXCPkIGNileOiImVmCOEmoSfn3yXlJWmoHGhqp6ilYuWYpmTqKUgAAIfkECQEAAQAsAAAAACgAKAAAApiEH6kb58biQ3FNWtMFWW3eNVcojuFGfqnZqSebuS06w5V80/X02pKe8zFwP6EFWOT1lDFk8rGERh1TTNOocQ61Hm4Xm2VexUHpzjymViHrFbiELsefVrn6XKfnt2Q9G/+Xdie499XHd2g4h7ioOGhXGJboGAnXSBnoBwKYyfioubZJ2Hn0RuRZaflZOil56Zp6iioKSXpUAAAh+QQJAQABACwAAAAAKAAoAAACkoQRqRvnxuI7kU1a1UU5bd5tnSeOZXhmn5lWK3qNTWvRdQxP8qvaC+/yaYQzXO7BMvaUEmJRd3TsiMAgswmNYrSgZdYrTX6tSHGZO73ezuAw2uxuQ+BbeZfMxsexY35+/Qe4J1inV0g4x3WHuMhIl2jXOKT2Q+VU5fgoSUI52VfZyfkJGkha6jmY+aaYdirq+lQAACH5BAkBAAEALAAAAAAoACgAAAKWBIKpYe0L3YNKToqswUlvznigd4wiR4KhZrKt9Upqip61i9E3vMvxRdHlbEFiEXfk9YARYxOZZD6VQ2pUunBmtRXo1Lf8hMVVcNl8JafV38aM2/Fu5V16Bn63r6xt97j09+MXSFi4BniGFae3hzbH9+hYBzkpuUh5aZmHuanZOZgIuvbGiNeomCnaxxap2upaCZsq+1kAACH5BAkBAAEALAAAAAAoACgAAAKXjI8By5zf4kOxTVrXNVlv1X0d8IGZGKLnNpYtm8Lr9cqVeuOSvfOW79D9aDHizNhDJidFZhNydEahOaDH6nomtJjp1tutKoNWkvA6JqfRVLHU/QUfau9l2x7G54d1fl995xcIGAdXqMfBNadoYrhH+Mg2KBlpVpbluCiXmMnZ2Sh4GBqJ+ckIOqqJ6LmKSllZmsoq6wpQAAAh+QQJAQABACwAAAAAKAAoAAAClYx/oLvoxuJDkU1a1YUZbJ59nSd2ZXhWqbRa2/gF8Gu2DY3iqs7yrq+xBYEkYvFSM8aSSObE+ZgRl1BHFZNr7pRCavZ5BW2142hY3AN/zWtsmf12p9XxxFl2lpLn1rseztfXZjdIWIf2s5dItwjYKBgo9yg5pHgzJXTEeGlZuenpyPmpGQoKOWkYmSpaSnqKileI2FAAACH5BAkBAAEALAAAAAAoACgAAAKVjB+gu+jG4kORTVrVhRlsnn2dJ3ZleFaptFrb+CXmO9OozeL5VfP99HvAWhpiUdcwkpBH3825AwYdU8xTqlLGhtCosArKMpvfa1mMRae9VvWZfeB2XfPkeLmm18lUcBj+p5dnN8jXZ3YIGEhYuOUn45aoCDkp16hl5IjYJvjWKcnoGQpqyPlpOhr3aElaqrq56Bq7VAAAOw==);height:100%;opacity:.25;filter:alpha(opacity=25)}.ui-progressbar-indeterminate .ui-progressbar-value{background-image:none}.ui-selectable{-ms-touch-action:none;touch-action:none}.ui-selectable-helper{border:1px dotted black;position:absolute;z-index:100}.ui-selectmenu-menu{display:none;left:0;margin:0;padding:0;position:absolute;top:0}.ui-selectmenu-menu .ui-menu{overflow:auto;overflow-x:hidden;padding-bottom:1px}.ui-selectmenu-menu .ui-menu .ui-selectmenu-optgroup{border:0;font-size:1em;font-weight:bold;height:auto;line-height:1.5;margin:.5em 0 0 0;padding:2px .4em}.ui-selectmenu-open{display:block}.ui-selectmenu-text{display:block;margin-right:20px;overflow:hidden;text-overflow:ellipsis}.ui-selectmenu-button.ui-button{text-align:left;white-space:nowrap;width:14em}.ui-selectmenu-icon.ui-icon{float:right;margin-top:0}.ui-slider{position:relative;text-align:left}.ui-slider .ui-slider-handle{cursor:default;height:1.2em;position:absolute;width:1.2em;z-index:2;-ms-touch-action:none;touch-action:none}.ui-slider .ui-slider-range{background-position:0 0;border:0;display:block;font-size:.7em;position:absolute;z-index:1}.ui-slider.ui-state-disabled .ui-slider-handle,.ui-slider.ui-state-disabled .ui-slider-range{filter:inherit}.ui-slider-horizontal{height:.8em}.ui-slider-horizontal .ui-slider-handle{margin-left:-.6em;top:-.3em}.ui-slider-horizontal .ui-slider-range{height:100%;top:0}.ui-slider-horizontal .ui-slider-range-min{left:0}.ui-slider-horizontal .ui-slider-range-max{right:0}.ui-slider-vertical{height:100px;width:.8em}.ui-slider-vertical .ui-slider-handle{left:-.3em;margin-bottom:-.6em;margin-left:0}.ui-slider-vertical .ui-slider-range{left:0;width:100%}.ui-slider-vertical .ui-slider-range-min{bottom:0}.ui-slider-vertical .ui-slider-range-max{top:0}.ui-sortable-handle{-ms-touch-action:none;touch-action:none}.ui-spinner{display:inline-block;overflow:hidden;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{background:none;border:0;color:inherit;margin:.2em 0;margin-left:.4em;margin-right:2em;padding:.222em 0;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;font-size:.5em;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;width:1.6em}.ui-spinner a.ui-spinner-button{border-bottom-style:none;border-right-style:none;border-top-style:none}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-tabs{padding:.2em;position:relative}.ui-tabs .ui-tabs-nav{margin:0;padding:.2em .2em 0}.ui-tabs .ui-tabs-nav li{border-bottom-width:0;float:left;list-style:none;margin:1px .2em 0 0;padding:0;position:relative;top:0;white-space:nowrap}.ui-tabs .ui-tabs-nav .ui-tabs-anchor{float:left;padding:.5em 1em;text-decoration:none}.ui-tabs .ui-tabs-nav li.ui-tabs-active{margin-bottom:-1px;padding-bottom:1px}.ui-tabs .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-state-disabled .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-tabs-loading .ui-tabs-anchor{cursor:text}.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor{cursor:pointer}.ui-tabs .ui-tabs-panel{background:none;border-width:0;display:block;padding:1em 1.4em}.ui-tooltip{max-width:300px;padding:8px;position:absolute;z-index:9999}body .ui-tooltip{border-width:2px}.ui-widget{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget .ui-widget{font-size:1em}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget.ui-widget-content{border:1px solid #c5c5c5}.ui-widget-content{background:#fff;border:1px solid #ddd;color:#333}.ui-widget-content a{color:#333}.ui-widget-header{background:#e9e9e9;border:1px solid #ddd;color:#333;font-weight:bold}.ui-widget-header a{color:#333}.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default,.ui-button,html .ui-button.ui-state-disabled:hover,html .ui-button.ui-state-disabled:active{background:#f6f6f6;border:1px solid #c5c5c5;color:#454545;font-weight:normal}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited,a.ui-button,a:link.ui-button,a:visited.ui-button,.ui-button{color:#454545;text-decoration:none}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus,.ui-button:hover,.ui-button:focus{background:#ededed;border:1px solid #ccc;color:#2b2b2b;font-weight:normal}.ui-state-hover a,.ui-state-hover a:hover,.ui-state-hover a:link,.ui-state-hover a:visited,.ui-state-focus a,.ui-state-focus a:hover,.ui-state-focus a:link,.ui-state-focus a:visited,a.ui-button:hover,a.ui-button:focus{color:#2b2b2b;text-decoration:none}.ui-visual-focus{box-shadow:0 0 3px 1px #5e9ed6}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active,a.ui-button:active,.ui-button:active,.ui-button.ui-state-active:hover{background:#007fff;border:1px solid #003eff;color:#fff;font-weight:normal}.ui-icon-background,.ui-state-active .ui-icon-background{background-color:#fff;border:#003eff}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color:#fff;text-decoration:none}.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{background:#fffa90;border:1px solid #dad55e;color:#777620}.ui-state-checked{background:#fffa90;border:1px solid #dad55e}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color:#777620}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{background:#fddfdf;border:1px solid #f1a899;color:#5f3f3f}.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a{color:#5f3f3f}.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color:#5f3f3f}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight:bold}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{font-weight:normal;opacity:.7;filter:Alpha(Opacity=70)}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{background-image:none;opacity:.35;filter:Alpha(Opacity=35)}.ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}.ui-icon{height:16px;width:16px}.ui-icon,.ui-widget-content .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-widget-header .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_444444_256x240.png)}.ui-state-hover .ui-icon,.ui-state-focus .ui-icon,.ui-button:hover .ui-icon,.ui-button:focus .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_555555_256x240.png)}.ui-state-active .ui-icon,.ui-button:active .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_ffffff_256x240.png)}.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777620_256x240.png)}.ui-state-error .ui-icon,.ui-state-error-text .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_cc0000_256x240.png)}.ui-button .ui-icon{background-image:url(https://cdn.bootcss.com/jqueryui/1.12.1/images/ui-icons_777777_256x240.png)}.ui-icon-blank{background-position:16px 16px}.ui-icon-caret-1-n{background-position:0 0}.ui-icon-caret-1-ne{background-position:-16px 0}.ui-icon-caret-1-e{background-position:-32px 0}.ui-icon-caret-1-se{background-position:-48px 0}.ui-icon-caret-1-s{background-position:-65px 0}.ui-icon-caret-1-sw{background-position:-80px 0}.ui-icon-caret-1-w{background-position:-96px 0}.ui-icon-caret-1-nw{background-position:-112px 0}.ui-icon-caret-2-n-s{background-position:-128px 0}.ui-icon-caret-2-e-w{background-position:-144px 0}.ui-icon-triangle-1-n{background-position:0 -16px}.ui-icon-triangle-1-ne{background-position:-16px -16px}.ui-icon-triangle-1-e{background-position:-32px -16px}.ui-icon-triangle-1-se{background-position:-48px -16px}.ui-icon-triangle-1-s{background-position:-65px -16px}.ui-icon-triangle-1-sw{background-position:-80px -16px}.ui-icon-triangle-1-w{background-position:-96px -16px}.ui-icon-triangle-1-nw{background-position:-112px -16px}.ui-icon-triangle-2-n-s{background-position:-128px -16px}.ui-icon-triangle-2-e-w{background-position:-144px -16px}.ui-icon-arrow-1-n{background-position:0 -32px}.ui-icon-arrow-1-ne{background-position:-16px -32px}.ui-icon-arrow-1-e{background-position:-32px -32px}.ui-icon-arrow-1-se{background-position:-48px -32px}.ui-icon-arrow-1-s{background-position:-65px -32px}.ui-icon-arrow-1-sw{background-position:-80px -32px}.ui-icon-arrow-1-w{background-position:-96px -32px}.ui-icon-arrow-1-nw{background-position:-112px -32px}.ui-icon-arrow-2-n-s{background-position:-128px -32px}.ui-icon-arrow-2-ne-sw{background-position:-144px -32px}.ui-icon-arrow-2-e-w{background-position:-160px -32px}.ui-icon-arrow-2-se-nw{background-position:-176px -32px}.ui-icon-arrowstop-1-n{background-position:-192px -32px}.ui-icon-arrowstop-1-e{background-position:-208px -32px}.ui-icon-arrowstop-1-s{background-position:-224px -32px}.ui-icon-arrowstop-1-w{background-position:-240px -32px}.ui-icon-arrowthick-1-n{background-position:1px -48px}.ui-icon-arrowthick-1-ne{background-position:-16px -48px}.ui-icon-arrowthick-1-e{background-position:-32px -48px}.ui-icon-arrowthick-1-se{background-position:-48px -48px}.ui-icon-arrowthick-1-s{background-position:-64px -48px}.ui-icon-arrowthick-1-sw{background-position:-80px -48px}.ui-icon-arrowthick-1-w{background-position:-96px -48px}.ui-icon-arrowthick-1-nw{background-position:-112px -48px}.ui-icon-arrowthick-2-n-s{background-position:-128px -48px}.ui-icon-arrowthick-2-ne-sw{background-position:-144px -48px}.ui-icon-arrowthick-2-e-w{background-position:-160px -48px}.ui-icon-arrowthick-2-se-nw{background-position:-176px -48px}.ui-icon-arrowthickstop-1-n{background-position:-192px -48px}.ui-icon-arrowthickstop-1-e{background-position:-208px -48px}.ui-icon-arrowthickstop-1-s{background-position:-224px -48px}.ui-icon-arrowthickstop-1-w{background-position:-240px -48px}.ui-icon-arrowreturnthick-1-w{background-position:0 -64px}.ui-icon-arrowreturnthick-1-n{background-position:-16px -64px}.ui-icon-arrowreturnthick-1-e{background-position:-32px -64px}.ui-icon-arrowreturnthick-1-s{background-position:-48px -64px}.ui-icon-arrowreturn-1-w{background-position:-64px -64px}.ui-icon-arrowreturn-1-n{background-position:-80px -64px}.ui-icon-arrowreturn-1-e{background-position:-96px -64px}.ui-icon-arrowreturn-1-s{background-position:-112px -64px}.ui-icon-arrowrefresh-1-w{background-position:-128px -64px}.ui-icon-arrowrefresh-1-n{background-position:-144px -64px}.ui-icon-arrowrefresh-1-e{background-position:-160px -64px}.ui-icon-arrowrefresh-1-s{background-position:-176px -64px}.ui-icon-arrow-4{background-position:0 -80px}.ui-icon-arrow-4-diag{background-position:-16px -80px}.ui-icon-extlink{background-position:-32px -80px}.ui-icon-newwin{background-position:-48px -80px}.ui-icon-refresh{background-position:-64px -80px}.ui-icon-shuffle{background-position:-80px -80px}.ui-icon-transfer-e-w{background-position:-96px -80px}.ui-icon-transferthick-e-w{background-position:-112px -80px}.ui-icon-folder-collapsed{background-position:0 -96px}.ui-icon-folder-open{background-position:-16px -96px}.ui-icon-document{background-position:-32px -96px}.ui-icon-document-b{background-position:-48px -96px}.ui-icon-note{background-position:-64px -96px}.ui-icon-mail-closed{background-position:-80px -96px}.ui-icon-mail-open{background-position:-96px -96px}.ui-icon-suitcase{background-position:-112px -96px}.ui-icon-comment{background-position:-128px -96px}.ui-icon-person{background-position:-144px -96px}.ui-icon-print{background-position:-160px -96px}.ui-icon-trash{background-position:-176px -96px}.ui-icon-locked{background-position:-192px -96px}.ui-icon-unlocked{background-position:-208px -96px}.ui-icon-bookmark{background-position:-224px -96px}.ui-icon-tag{background-position:-240px -96px}.ui-icon-home{background-position:0 -112px}.ui-icon-flag{background-position:-16px -112px}.ui-icon-calendar{background-position:-32px -112px}.ui-icon-cart{background-position:-48px -112px}.ui-icon-pencil{background-position:-64px -112px}.ui-icon-clock{background-position:-80px -112px}.ui-icon-disk{background-position:-96px -112px}.ui-icon-calculator{background-position:-112px -112px}.ui-icon-zoomin{background-position:-128px -112px}.ui-icon-zoomout{background-position:-144px -112px}.ui-icon-search{background-position:-160px -112px}.ui-icon-wrench{background-position:-176px -112px}.ui-icon-gear{background-position:-192px -112px}.ui-icon-heart{background-position:-208px -112px}.ui-icon-star{background-position:-224px -112px}.ui-icon-link{background-position:-240px -112px}.ui-icon-cancel{background-position:0 -128px}.ui-icon-plus{background-position:-16px -128px}.ui-icon-plusthick{background-position:-32px -128px}.ui-icon-minus{background-position:-48px -128px}.ui-icon-minusthick{background-position:-64px -128px}.ui-icon-close{background-position:-80px -128px}.ui-icon-closethick{background-position:-96px -128px}.ui-icon-key{background-position:-112px -128px}.ui-icon-lightbulb{background-position:-128px -128px}.ui-icon-scissors{background-position:-144px -128px}.ui-icon-clipboard{background-position:-160px -128px}.ui-icon-copy{background-position:-176px -128px}.ui-icon-contact{background-position:-192px -128px}.ui-icon-image{background-position:-208px -128px}.ui-icon-video{background-position:-224px -128px}.ui-icon-script{background-position:-240px -128px}.ui-icon-alert{background-position:0 -144px}.ui-icon-info{background-position:-16px -144px}.ui-icon-notice{background-position:-32px -144px}.ui-icon-help{background-position:-48px -144px}.ui-icon-check{background-position:-64px -144px}.ui-icon-bullet{background-position:-80px -144px}.ui-icon-radio-on{background-position:-96px -144px}.ui-icon-radio-off{background-position:-112px -144px}.ui-icon-pin-w{background-position:-128px -144px}.ui-icon-pin-s{background-position:-144px -144px}.ui-icon-play{background-position:0 -160px}.ui-icon-pause{background-position:-16px -160px}.ui-icon-seek-next{background-position:-32px -160px}.ui-icon-seek-prev{background-position:-48px -160px}.ui-icon-seek-end{background-position:-64px -160px}.ui-icon-seek-start{background-position:-80px -160px}.ui-icon-seek-first{background-position:-80px -160px}.ui-icon-stop{background-position:-96px -160px}.ui-icon-eject{background-position:-112px -160px}.ui-icon-volume-off{background-position:-128px -160px}.ui-icon-volume-on{background-position:-144px -160px}.ui-icon-power{background-position:0 -176px}.ui-icon-signal-diag{background-position:-16px -176px}.ui-icon-signal{background-position:-32px -176px}.ui-icon-battery-0{background-position:-48px -176px}.ui-icon-battery-1{background-position:-64px -176px}.ui-icon-battery-2{background-position:-80px -176px}.ui-icon-battery-3{background-position:-96px -176px}.ui-icon-circle-plus{background-position:0 -192px}.ui-icon-circle-minus{background-position:-16px -192px}.ui-icon-circle-close{background-position:-32px -192px}.ui-icon-circle-triangle-e{background-position:-48px -192px}.ui-icon-circle-triangle-s{background-position:-64px -192px}.ui-icon-circle-triangle-w{background-position:-80px -192px}.ui-icon-circle-triangle-n{background-position:-96px -192px}.ui-icon-circle-arrow-e{background-position:-112px -192px}.ui-icon-circle-arrow-s{background-position:-128px -192px}.ui-icon-circle-arrow-w{background-position:-144px -192px}.ui-icon-circle-arrow-n{background-position:-160px -192px}.ui-icon-circle-zoomin{background-position:-176px -192px}.ui-icon-circle-zoomout{background-position:-192px -192px}.ui-icon-circle-check{background-position:-208px -192px}.ui-icon-circlesmall-plus{background-position:0 -208px}.ui-icon-circlesmall-minus{background-position:-16px -208px}.ui-icon-circlesmall-close{background-position:-32px -208px}.ui-icon-squaresmall-plus{background-position:-48px -208px}.ui-icon-squaresmall-minus{background-position:-64px -208px}.ui-icon-squaresmall-close{background-position:-80px -208px}.ui-icon-grip-dotted-vertical{background-position:0 -224px}.ui-icon-grip-dotted-horizontal{background-position:-16px -224px}.ui-icon-grip-solid-vertical{background-position:-32px -224px}.ui-icon-grip-solid-horizontal{background-position:-48px -224px}.ui-icon-gripsmall-diagonal-se{background-position:-64px -224px}.ui-icon-grip-diagonal-se{background-position:-80px -224px}.ui-corner-all,.ui-corner-top,.ui-corner-left,.ui-corner-tl{border-top-left-radius:3px}.ui-corner-all,.ui-corner-top,.ui-corner-right,.ui-corner-tr{border-top-right-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-left,.ui-corner-bl{border-bottom-left-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-right,.ui-corner-br{border-bottom-right-radius:3px}.ui-widget-overlay{background:#aaa;opacity:.003;filter:Alpha(Opacity=.3)}.ui-widget-shadow{-webkit-box-shadow:0 0 5px #666;box-shadow:0 0 5px #666}";
document.getElementsByTagName("head")[0].appendChild(myScriptStyle);
let aside_html = '<div class=c-aside ><h2><i class="">四字标题</i>· · · · · · </h2><div class=c-aside-body  style="padding: 0 12px;"> <ul class=bs > </ul> </div> </div>';
let imdb_html = '<div class="rating_wrap clearbox rating_imdb" rel="v:rating" style="padding-top: 0;"> <div class=rating_logo >IMDB 评分</div> <div class="rating_self clearfix" typeof="v:Rating"> <strong class="ll rating_num" property="v:average">0</strong> <span property="v:best" content=10.0 ></span> <div class="rating_right "> <div class=ll ></div> <div class=rating_sum > <a href=collections  class=rating_people ><span property="v:votes">0</span>人评价</a> </div> </div> </div> </div>';
let rott_html = '<div class="rating_wrap clearbox rating_rott" style="padding-top:5px;padding-bottom:0px"><span class="rating_logo ll">烂番茄新鲜度</span><br><div id="rottValue" class="rating_self clearfix"></div></div>';

// 定义基础方法
function getDoc(url, meta, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': null
        },
        onload: function (responseDetail) {
            let doc="";
            if (responseDetail.status === 200) {
                doc = (new DOMParser).parseFromString(responseDetail.responseText, 'text/html');
                if (doc === undefined) {
                    doc = document.implementation.createHTMLDocument('');
                    doc.querySelector('html').innerHTML = responseText;
                }
            }
            callback(doc, responseDetail, meta);
        }
    });
}
function postDoc(url, data, meta, callback) {
    GM_xmlhttpRequest({
        anonymous: true,
        method: 'POST',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        onload: function (responseDetail) {
            callback(responseDetail.responseText, responseDetail, meta);
        }
    });
}
function getJSON(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json'
        },
        onload: function (response) {
            if (response.status >= 200 && response.status < 400) {
                callback(JSON.parse(response.responseText), url);
            } else {
                callback(false, url);
            }
        }
    });
}
function parseURL(url) {
    let a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            let ret = {};
            let seg = a.search.replace(/^\?/, '').split('&');
            let len = seg.length;
            let i = 0;
            let s = void 0;
            while (i < len) {
                if (!seg[i]) {
                    i++;
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
                i++;
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}


if (!document.getElementById("seBwhA") && "页面不存在" !== document.title) {
    let seBwhA = document.createElement("a");
    seBwhA.id = "seBwhA";
    document.getElementsByTagName("html")[0].appendChild(seBwhA);

    if (location.href.startsWith('https://movie.douban.com/subject/')) {
        $(document).ready(function () {

            // elements in the right column
            // 获取电影中文名
            var nian;
            var zwm = document.title.replace('(豆瓣)','').trim();
            // 获取豆瓣ID
            var xdouban = this.location.href.match(/(\d{7,8})/g);
            var douban = '/subject/' + xdouban;
            // 判断是否电影并赋值年份
            if($('a.bn-sharing').attr('data-type').match(/电影/)){
                nian = ' ' + $('#content > h1 > span.year').text().substr(1, 4);
            }else{
                nian = '';}
            // 获取电影英文名
            var akaTitle, movieTitle, MovieOriginalTitle, MovieEnglishTitle, MovieFinalEnglish, ywm, xywm;
            akaTitle = $('#info span.pl:contains("又名")')[0].nextSibling.nodeValue;
            movieTitle = $('h1 span:eq(0)').text();
            MovieOriginalTitle = movieTitle.replace(/^([^\x00-\xff]| |[0-9]){2,}/, "");
            MovieOriginalTitle = MovieOriginalTitle.replace(/([^\x00-\xff]| ){2,}[0-9]+$/, "");
            MovieOriginalTitle = MovieOriginalTitle.replace(/([^\x00-\xff]| |-){2,}$/, "");
            MovieOriginalTitle = MovieOriginalTitle.replace(/:/, "");
            MovieEnglishTitle = akaTitle.replace(/^[^a-zA-Z]*/, "");
            MovieEnglishTitle = MovieEnglishTitle.replace(/:/, "");
            MovieFinalEnglish = MovieEnglishTitle.replace(/ \/ .*/,"");
            // 确定电影英文名
            if(MovieOriginalTitle.match(/([a-zA-Z]){2,}/)){
                ywm = MovieOriginalTitle;
            }else{
                ywm = MovieFinalEnglish;}
            // 剧集修正季数名
            if(ywm.match(/Season\s\d\d/)){
                ywm = ywm.replace(/Season\s/, "S");
                xywm = ywm.replace(/ S\d\d*$/, "");
            }else{
                ywm = ywm.replace(/Season\s/, "S0");
                xywm = ywm.replace(/ S\d\d*$/, "");
            }
            // 智能判定是用IMDB ID还是豆瓣ID
            let imdbnum = $('div#info a[href^=\'http://www.imdb.com/title/tt\']').attr('href');
            imdbnum = imdbnum.replace(/http:\/\/www\.imdb\.com\/title\//, "");
            let neizhan = imdbnum;
            if(imdbnum.match(/9999999/)){
                neizhan = douban;
            }
            // TTG智能判定是用IMDB ID还是中文名
            let ttgid = imdbnum.slice(2);
            if(ttgid.match(/9999999/)){
                ttgid = zwm + nian;
            }else{
                ttgid = 'IMDB' + ttgid;
            }


            var site_offline, site_online, site_zwzm, site_ywzm, site_zxsp, site_dyzy, site_dmzy, site_mjzy, site_zgbt, site_zgpt, site_wgpt, site_nzb, site_ptzm, update_site_offline_sites, update_site_online_sites, update_site_zwzm_sites, update_site_ywzm_sites, update_site_zxsp_sites, update_site_dyzy_sites, update_site_dmzy_sites, update_site_mjzy_sites, update_site_zgbt_sites, update_site_zgpt_sites, update_site_wgpt_sites, update_site_nzb_sites, update_ptzm_sites;
            site_online = $(aside_html);
            update_site_online_sites = function (title, en) { };
            update_site_offline_sites = function (title, en, imdb) {
                var link, link_parsed, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        'BT-Scene': 'https://bt-scene.cc/results_.php?q=' + ywm + nian,
                        'iDope': 'https://idope.se/torrent-list/' + ywm + nian,
                        'ISOHunt': 'https://isohunt2.net/torrent/?ihq=' + ywm + nian,
                        'KickAss': 'https://katcr.co/katsearch/page/1/' + ywm + nian,
                        'Lime': 'https://www.limetorrents.cc/search/all/' + ywm + nian,
                        'RARBG': 'http://rarbg.is/torrents.php?search=tt' + imdb_id,
                        'WorldWide': 'https://worldwidetorrents.me/torrents-search.php?search=' + ywm + nian,
                        'Zooqle': 'https://zooqle.com/search?q=' + ywm + nian,
                        '海盗湾': 'https://thepiratebay.org/search/' + ywm
                    };
                    for (let name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-offline-body ul').append(link);
                    }
                }
            };

            update_site_zwzm_sites = function (title, en) {
                var link, link_parsed, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        '字幕库': 'http://www.zimuku.cn/search?q=' + title,
                        '字幕组': 'http://www.zimuzu.tv/search/index?type=subtitle&keyword=' + title,
                        'sub HD': 'http://subhd.com/search/' + title,
                        '伪射手': 'http://assrt.net/sub/?searchword=' + title,
                        '163字幕': 'http://www.163sub.com/Search?id=' + title,
                        '电波字幕': 'http://dbfansub.com/?s=' + title,
                        '字幕社': 'https://www.zimushe.com/search.php?keywords=' + title,
                        '中文字幕网': 'http://www.zimuzimu.com/so_zimu.php?title=' + title,
                        'r3sub': 'https://r3sub.com/search.php?s=' + title,
                        'HDZIMU': 'http://www.hdzimu.com/?s=' + title,
                        'M1080': 'http://zimu.m1080.com/search.asp?a=&s=' + title,
                        'OpenSub': 'https://www.opensubtitles.org/zh/search/sublanguageid-chi,zht,zhe,eng/imdbid-' + imdb_id
                    };
                    for (let name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-zwzm-body ul').append(link);
                    }
                }

            };

            update_site_ywzm_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        'Addic7ed': 'http://www.addic7ed.com/search.php?search=' + xywm + nian,
                        'Podnapisi': 'https://www.podnapisi.net/zh/subtitles/search/?language=zh&language=en&keywords=' + xywm + '&' + nian + '-' + nian,
                        'Subscene': 'https://subscene.com/subtitles/release?r=true&q=' + ywm + nian,
                        'TVsubs': 'http://tvsubs.net/search.php?q=' + xywm,
                        'TVsubtitles': 'http://www.tvsubtitles.net/search.php?q=' + xywm,
                        'YIFY': 'http://www.yifysubtitles.com/search?q=' + xywm
                    };
                    for (let name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-ywzm-body ul').append(link);
                    }
                }
            };

            update_site_zxsp_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        'Neets': 'http://neets.cc/search?key=' + title,
                        '爱奇艺视频': 'https://so.iqiyi.com/so/q_' + title,
                        '次元壁': 'http://www.ciyuan.bi/Search?keyword=' + title,
                        '哈哩哈哩': 'http://www.halihali.cc/search/?wd=' + title,
                        '搜狐视频': 'https://so.tv.sohu.com/mts?wd=' + title,
                        '腾讯视频': 'https://v.qq.com/x/search/?q=' + title,
                        '优酷视频': 'http://www.soku.com/search_video/q_' + title,
                        'AAQQS': 'http://aaxxy.com/vod-search-pg-1-wd-' + title + '.html',
                        'Q2电影网': 'http://www.q2002.com/search?wd=' + title,
                        '魔力电影网': 'http://www.magbt.net/search.php?searchword=' + title,
                        '小朱视频': 'http://noad.zhuchaoli.club/search/' + title + '.html',
                        '9ANIME': 'https://www4.9anime.is/search?keyword=' + ywm
                    };
                    for (let name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-zxsp-body ul').append(link);
                    }
                }
            };

            update_site_dyzy_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        '52 Movie': 'http://www.52movieba.com/search.htm?keyword=' + title,
                        '97电影网': 'http://www.id97.com/search?q=' + title,
                        '爱下电影网': 'http://www.aixia.cc/plus/search.php?searchtype=titlekeyword&q=' + title,
                        '比特大雄': 'https://www.btdx8.com/?s=' + title,
                        '比特影视': 'https://www.bteye.com/search/' + title,
                        '电影巴士': 'http://www.dy8c.com/?s=' + title,
                        '电影首发站': 'http://www.dysfz.cc/key/' + title + '/',
                        '嘎嘎影视': 'http://www.gagays.xyz/movie/search?req%5Bkw%5D=' + title,
                        '高清MP4': 'http://www.99tvs.com/?s=' + title,
                        '高清控': 'http://www.gaoqingkong.com/?s=' + title,
                        '蓝光网': 'http://www.languang.co/?s=' + title,
                        '迷你MP4': 'http://www.minimp4.com/search?q=' + title,
                        '胖鸟电影': 'http://www.pniao.com/Mov/so/' + title,
                        '人生05': 'http://www.rs05.com/search.php?s=' + title,
                        '云播网': 'http://www.yunbowang.cn/index.php?m=vod-search&wd=' + title,
                        '中国高清网': 'http://gaoqing.la/?s=' + title,
                        '最新影视站': 'http://www.zxysz.com/?s=' + title
                    };
                    for (let name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-dyzy-body ul').append(link);
                    }
                }
            };


            update_site_dmzy_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        'ACG.RIP': 'https://acg.rip/?term=' + title,
                        'ACG狗狗': 'http://bt.acg.gg/search.php?keyword=' + title,
                        'ACG搜': 'http://www.acgsou.com/search.php?keyword=' + title,
                        '动漫花园': 'https://share.dmhy.org/topics/list?keyword=' + title,
                        '爱恋动漫': 'http://www.kisssub.org/search.php?keyword=' + title,
                        '喵搜': 'https://nyaso.com/dong/' + title +'.html',
                        '旋风动漫': 'http://share.xfsub.com:88/search.php?keyword=' + title,
                        '怡萱动漫': 'http://www.yxdm.tv/search.html?title=' + title,
                        'AniDex': 'https://anidex.info/?q=' + ywm,
                        'AniRena': 'https://www.anirena.com/?s=' + ywm,
                        'AniTosho': 'https://animetosho.org/search?q=' + ywm,
                        'Nyaa': 'https://nyaa.si/?q=' + ywm
                    };
                    for (name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-dmzy-body ul').append(link);
                    }
                }
            };

            update_site_mjzy_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        '人人影视': 'http://www.zimuzu.tv/search?type=resource&keyword=' + title,
                        '人人美剧': 'http://www.yyetss.com/Search/index/s_keys/' + title,
                        '天天美剧': 'http://www.ttmeiju.vip/index.php/search/index.html?keyword=' + title,
                        '爱美剧': 'https://22v.net/search/' + title,
                        '天天看美剧': 'http://www.msj1.com/?s=' + title,
                        '美剧粉': 'http://www.itvfans.com/?s=' + title
                    };
                    for (name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-mjzy-body ul').append(link);
                    }
                }
            };

            update_site_zgbt_sites = function (title, en) {
                var link, link_parsed, name, site_offline_sites;
                title = encodeURI(title);
                if (!en) {
                    site_offline_sites = {
                        'BT吧': 'http://www.btba.com.cn/search?keyword=' + title,
                        'BT蚂蚁': 'https://www.btmyi.com/search.html?kw=' + title,
                        'BT天堂': 'http://www.bttt.la/s.php?q=' + title,
                        'BT之家': 'http://www.btbtt.co/search-index-keyword-' + title + '.htm',
                        'RARBT': 'http://www.rarbt.com/index.php/search/index.html?search=' + title,
                        '查片源': 'https://www.chapianyuan.com/?keyword=' + title,
                        '磁力猫': 'http://www.cilimao.me/search?word=' + title,
                        '磁力站': 'http://oabt004.com/index/index?c=&k=' + title,
                        '光影资源': 'http://www.etdown.net/index.php?keyword=' + title,
                        '我爱P2P': 'http://www.woaip2p.net/topic/list?categoryId=0&title=' + title,
                        '小浣熊下载': 'https://www.xiaohx.org/search?key=' + title,
                        '一站搜': 'http://v.yizhansou.com/search?kw=' + title
                    };
                    for (name in site_offline_sites) {
                        link = site_offline_sites[name];
                        link_parsed = parseURL(link);
                        link = $('<a></a>').attr('href', link);
                        link.attr('data-host', link_parsed.host);
                        link.attr('target', '_blank').attr('rel', 'nofollow');
                        link.html(name);
                        $('#content div.site-zgbt-body ul').append(link);
                    }
                }
            };


            update_site_zgpt_sites = function (imdb, en) {
                var link, link_parsed, name, site_zgpt_sites;
                if (en) {
                    site_zgpt_sites = {
                        // search_area=0：标题；1：简介；4：IMDB链接
                        //incldead=1：活种；0：死种
                        // chinese sites
                        'BTSchool': 'http://pt.btschool.net/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'BYRBT': 'https://bt.byr.cn/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'CCFBits': 'http://www.ccfbits.org/browse.php?fullsearch=1&search=' + neizhan,
                        'CHDBits': 'https://chdbits.co/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'CMCT': 'https://hdcmct.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'GZTown': 'https://pt.gztown.net/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'FRDS': 'http://pt.keepfrds.com/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'HDChina': 'https://hdchina.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'HDCity': 'https://hdcity.city/pt?incldead=1&search_area=1&iwannaseethis=' + neizhan,
                        'HDHome': 'https://hdhome.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'HDSky': 'https://hdsky.me/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'HDStreet': 'https://hdstreet.club/torrents.php?incldead=1&search_area=4&search=' + xdouban,
                        'HDTime': 'https://hdtime.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'HDU': 'http://pt.upxin.net/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'Hyperay': 'https://hyperay.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'JoyHD': 'https://www.joyhd.net/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'MTeam': 'https://tp.m-team.cc/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'NPUBITS': 'https://npupt.com/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'NWSUAF': 'https://pt.nwsuaf6.edu.cn/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'NYPT': 'https://nanyangpt.com/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'OpenCD': 'https://open.cd/torrents.php?incldead=1&search_area=0&search=' + zwm,
                        'OurBits': 'https://ourbits.club/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'SJTU': 'https://pt.sjtu.edu.cn/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'SS': 'https://skyeysnow.com/forum.php?mod=torrents&search=' + zwm + nian,
                        'TCCF': 'https://et8.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'TLFBits': 'http://pt.eastgame.org/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'TTG': 'https://totheglory.im/browse.php?c=M&search_field=' + ttgid,
                        'U2': 'https://u2.dmhy.org/torrents.php?incldead=1&search_area=0&search=' + zwm + nian,
                        'WHUPT': 'https://pt.whu.edu.cn/torrents.php?incldead=1&search_area=1&search=' + neizhan,
                        'ZX': 'http://pt.zhixing.bjtu.edu.cn/search/x' + zwm + nian + '/',
                    };
                } else {
                    imdb = encodeURI(imdb);
                    site_zgpt_sites = {
                    };
                }
                for (name in site_zgpt_sites) {
                    link = site_zgpt_sites[name];
                    link_parsed = parseURL(link);
                    link = $('<a></a>').attr('href', link);
                    link.attr('data-host', link_parsed.host);
                    link.attr('target', '_blank').attr('rel', 'nofollow');
                    link.html(name);
                    link.attr('site', name);
                    $('#content div.site-zgpt-body ul').append(link);
                }
            };

            update_site_wgpt_sites = function (imdb, en) {
                var link, link_parsed, name, site_wgpt_sites;
                if (en) {
                    site_wgpt_sites = {
                        // global sites
                        'AB': 'https://animebytes.tv/torrents.php?searchstr=' + ywm + nian,
                        'ADC': 'http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Search%21&search=tt' + imdb_id,
                        'AOX': 'https://aox.to/index.php?page=torrents&options=4&search=' + imdb_id,
                        'Apollo': 'https://apollo.rip/torrents.php?searchstr=' + ywm,
                        'AR': 'https://alpharatio.cc/torrents.php?searchstr=' + ywm + nian,
                        'AVZ': 'https://avistaz.to/torrents?in=1&search=' + ywm + nian,
                        'BakaBT': 'https://bakabt.me/browse.php?q=' + ywm + nian,
                        'BHD': 'https://beyond-hd.me/browse.php?incldead=0&search=tt' + imdb_id,
                        'CC': 'http://www.cartoonchaos.org/index.php?page=torrents&options=0&active=1&search=' + ywm + nian,
                        'HDF': 'https://hdf.world/torrents.php?searchstr=' + ywm +nian,
                        'HDME': 'http://hdme.eu/browse.php?incldead=1&blah=1&search=tt' + imdb_id,
                        'HDMonkey': 'https://hdmonkey.org/torrents-search.php?incldead=0&search=' + ywm + nian,
                        'HDS': 'https://hd-space.org/index.php?page=torrents&active=1&options=2&search=' + imdb_id,
                        'HDT': 'https://hd-torrents.org/torrents.php?active=1&options=2&search=' + imdb_id,
                        //'ILC': 'http://www.iloveclassics.com/browse.php?searchin=2&search=tt' + imdb_id,
                        'IPT': 'https://iptorrents.com/t?qf=all&q=tt' + imdb_id,
                        'JPOP': 'https://jpopsuki.eu/torrents.php?searchstr=' + ywm,
                        'PHD': 'https://privatehd.to/torrents?in=1&search=' + ywm + nian,
                        'PTF': 'http://ptfiles.net/browse.php?incldead=0&title=0&search=' + ywm + nian,
                        'Red': 'https://redacted.ch/torrents.php?searchstr=' + ywm,
                        'SC': 'https://secret-cinema.pw/torrents.php?cataloguenumber=tt' + imdb_id,
                        'Speed': 'https://speed.cd/browse.php?d=on&search=tt' + imdb_id,
                        'TD': 'https://www.torrentday.com/t?q=tt' + imdb_id,
                        'TS': 'https://www.torrentseeds.org/browse.php?searchin=title&incldead=0&search=%22' +ywm +nian + '%22',
                        'TT': 'https://revolutiontt.me/browse.php?search=tt' + imdb_id,
                        'UHD': 'https://uhdbits.org/torrents.php?searchstr=tt' + imdb_id,
                        'Waffles': 'https://waffles.ch/browse.php?q=' + ywm,
                        'WOP': 'http://worldofp2p.net/browse.php?incldead=0&searchin=descr&search=tt' + imdb_id,

                    };
                } else {
                    imdb = encodeURI(imdb);
                    site_wgpt_sites = {
                    };
                }
                for (name in site_wgpt_sites) {
                    link = site_wgpt_sites[name];
                    link_parsed = parseURL(link);
                    link = $('<a></a>').attr('href', link);
                    link.attr('data-host', link_parsed.host);
                    link.attr('target', '_blank').attr('rel', 'nofollow');
                    link.html(name);
                    link.attr('site', name);
                    $('#content div.site-wgpt-body ul').append(link);
                }
            };

            update_site_nzb_sites = function (imdb, en) {
                var link, link_parsed, name, site_nzb_sites;
                if (en) {
                    site_nzb_sites = {
                        // nzb sites
                        'DOGnzb': 'https://dognzb.cr/search?q=' + ywm + nian,
                        'LuluNZB': 'https://lulunzb.com/search/' + ywm + nian,
                        'Miatrix': 'https://www.miatrix.com/search/' + ywm + nian,
                        'NewzTown': 'https://newztown.co.za/search/' + ywm + nian,
                        'NZBCat': 'https://nzb.cat/search/' + ywm + nian,
                        'NZBgeek': 'https://nzbgeek.info/geekseek.php?moviesgeekseek=1&browsecategory=&browseincludewords=' + ywm + nian,
                        'NZBP': 'https://nzbplanet.net/search/' + ywm + nian,
                        'Oznzb': 'https://www.oznzb.com/search/' + ywm + nian,
                        'SNZB': 'https://simplynzbs.com/search/' + ywm + nian,
                    };
                } else {
                    imdb = encodeURI(imdb);
                    site_nzb_sites = {
                    };
                }
                for (name in site_nzb_sites) {
                    link = site_nzb_sites[name];
                    link_parsed = parseURL(link);
                    link = $('<a></a>').attr('href', link);
                    link.attr('data-host', link_parsed.host);
                    link.attr('target', '_blank').attr('rel', 'nofollow');
                    link.html(name);
                    link.attr('site', name);
                    $('#content div.site-nzb-body ul').append(link);
                }
            };

            update_site_ptzm_sites = function (imdb, en) {
                var link, link_parsed, name, site_ptzm_sites;
                if (en) {
                    site_ptzm_sites = {
                        // ptzm sites
                        'BYRBT®': 'https://bt.byr.cn/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'CHDBits®': 'https://chdbits.co/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'CMCT®': 'https://hdcmct.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'FRDS®': 'http://pt.keepfrds.com/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDChina®': 'https://hdchina.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDCity®': 'https://hdcity.city/subtitles?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDHome®': 'https://hdhome.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDSky®': 'https://hdsky.me/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDTime®': 'https://hdtime.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'HDU®': 'http://pt.upxin.net/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'Hyperay®': 'https://hyperay.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'JoyHD®': 'https://www.joyhd.net/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'MTeam®': 'https://tp.m-team.cc/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'NPUBITS®': 'https://npupt.com/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'NYPT®': 'https://nanyangpt.com/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'OurBits®': 'https://ourbits.club/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'SJTU®': 'https://pt.sjtu.edu.cn/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'TCCF®': 'https://et8.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'TLFBits®': 'http://pt.eastgame.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'U2®': 'https://u2.dmhy.org/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                        'WHUPT®': 'https://pt.whu.edu.cn/subtitles.php?search=' + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"),
                    };
                } else {
                    imdb = encodeURI(imdb);
                    site_ptzm_sites = {
                    };
                }
                for (name in site_ptzm_sites) {
                    link = site_ptzm_sites[name];
                    link_parsed = parseURL(link);
                    link = $('<a></a>').attr('href', link);
                    link.attr('data-host', link_parsed.host);
                    link.attr('target', '_blank').attr('rel', 'nofollow');
                    link.html(name);
                    link.attr('site', name);
                    $('#content div.site-ptzm-body ul').append(link);
                }
            };

            // config pt batch link
            site_pt_batch = $(aside_html);
            site_pt_batch.addClass('name-offline');
            site_pt_batch.find('div.c-aside-body').addClass('site-zgpt-batch');
            site_pt_batch.find('h2 i').text('PT批量打开');
            $('#content div.tags').before(site_pt_batch);
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');
            var ptlink_all, ptlink_true, ptlink_none;
            ptlink_all = $('<a>全 部</a>').attr('class', 'ptlink_all');
            ptlink_all.css("background-color", "#f5f5f5");
            ptlink_true = $('<a>有资源</a>').attr('class', 'ptlink_true');
            ptlink_true.css("background-color", "#e3f1ed");
            ptlink_none = $('<a>无资源</a>').attr('class', 'ptlink_none');
            ptlink_none.css("background-color", "#f4eac2");
            ptlink_all.click(function () {
                $('.site-zgpt-body a[href]').each(function () {
                    window.open($(this).attr('href'))
                });
            });
            ptlink_true.click(function () {
                $('.site-zgpt-body a[stat="true"]').each(function () {
                    window.open($(this).attr('href'))
                });
            });
            ptlink_none.click(function () {
                $('.site-zgpt-body a[stat="none"]').each(function () {
                    window.open($(this).attr('href'))
                });
            });
            $('#content div.site-zgpt-batch ul').prepend(ptlink_none);
            $('#content div.site-zgpt-batch ul').prepend(ptlink_true);
            $('#content div.site-zgpt-batch ul').prepend(ptlink_all);

            // 设置PT内站站点
            site_zgpt = $(aside_html);
            site_zgpt.addClass('name-offline');
            site_zgpt.find('div.c-aside-body').addClass('site-zgpt-body');
            site_zgpt.find('h2 i').text('PT内站');
            $('#content div.tags').before(site_zgpt);
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');

            // 设置PT外站站点
            site_wgpt = $(aside_html);
            site_wgpt.addClass('name-offline');
            site_wgpt.find('div.c-aside-body').addClass('site-wgpt-body');
            site_wgpt.find('h2 i').text('PT外站');
            $('#content div.tags').before(site_wgpt);
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');

            // 设置NZB站点
            site_nzb = $(aside_html);
            site_nzb.addClass('name-offline');
            site_nzb.find('div.c-aside-body').addClass('site-nzb-body');
            site_nzb.find('h2 i').text('NZB资源');
            $('#content div.tags').before(site_nzb);
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');

            // 设置PT字幕站点
            site_ptzm = $(aside_html);
            site_ptzm.addClass('name-offline');
            site_ptzm.find('div.c-aside-body').addClass('site-ptzm-body');
            site_ptzm.find('h2 i').text('PT字幕');
            $('#content div.tags').before(site_ptzm);
            $('#interest_sectl').after($('div.grid-16-8 div.related-info'));
            $('#interest_sectl').attr('style', 'float:right');
            $('div.related-info').attr('style', 'width:480px;float:left');

            // 设置中文字幕站点
            site_zwzm = $(aside_html);
            site_zwzm.addClass('name-offline');
            site_zwzm.find('div.c-aside-body').addClass('site-zwzm-body');
            site_zwzm.find('h2 i').text('中文字幕');
            $('#content div.tags').before(site_zwzm);

            // 设置英文字幕站点
            site_ywzm = $(aside_html);
            site_ywzm.addClass('name-offline');
            site_ywzm.find('div.c-aside-body').addClass('site-ywzm-body');
            site_ywzm.find('h2 i').text('英文字幕');
            $('#content div.tags').before(site_ywzm);

            // 设置在线视频站点
            site_zxsp = $(aside_html);
            site_zxsp.addClass('name-offline');
            site_zxsp.find('div.c-aside-body').addClass('site-zxsp-body');
            site_zxsp.find('h2 i').text('在线视频');
            $('#content div.tags').before(site_zxsp);

            // 设置电影资源站点
            site_dyzy = $(aside_html);
            site_dyzy.addClass('name-offline');
            site_dyzy.find('div.c-aside-body').addClass('site-dyzy-body');
            site_dyzy.find('h2 i').text('电影资源');
            $('#content div.tags').before(site_dyzy);

            // 设置动漫资源站点
            site_dmzy = $(aside_html);
            site_dmzy.addClass('name-offline');
            site_dmzy.find('div.c-aside-body').addClass('site-dmzy-body');
            site_dmzy.find('h2 i').text('动漫资源');
            $('#content div.tags').before(site_dmzy);


            // 设置美剧资源站点
            site_mjzy = $(aside_html);
            site_mjzy.addClass('name-offline');
            site_mjzy.find('div.c-aside-body').addClass('site-mjzy-body');
            site_mjzy.find('h2 i').text('美剧资源');
            $('#content div.tags').before(site_mjzy);

            // 设置BT内站站点
            site_zgbt = $(aside_html);
            site_zgbt.addClass('name-offline');
            site_zgbt.find('div.c-aside-body').addClass('site-zgbt-body');
            site_zgbt.find('h2 i').text('BT内站');
            $('#content div.tags').before(site_zgbt);


            // config offline part
            site_offline = $(aside_html);
            site_offline.addClass('name-offline');
            site_offline.find('div.c-aside-body').addClass('site-offline-body');
            site_offline.find('h2 i').text('BT外站');
            $('#content div.tags').before(site_offline);

            // gen text info
            // due to the slow connection with imdb.com, only show the info button after IMDB info is ready
            var movieinfo = $("<a>movieinfo</a>").css('color', '#37a');
            var infobox = $(aside_html);
            infobox.find('h2 i').text('电影简介');
            infobox.addClass("movieinfo");
            infobox.attr('style', 'float:left;width:470px;margin-top:20px');
            movieinfo.click(function () {
                //////译名，片名///////
                var title, title_en, title_sec;
                title = title_en = $('#content > h1 > span')[0].textContent.split(' ');
                title = title.shift();
                title_en = title_en.join(' ').trim();
                var temp;
                temp = $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "又名:");
                }).text();
                if (temp) {
                    temp = temp.split(' / ');
                    temp = temp.filter(function (x) {
                        var rname = /[\u4E00-\u9FA5]/;
                        if (rname.test(x)) {
                            //alert("含汉字!");
                            return true;
                        }
                        else {
                            //alert("不含汉字!");
                            return false;
                        }
                    });
                    //alert(temp !== "");
                    if (!(temp == "")) {
                        temp = temp.join(' / ').trim();
                        temp = ' / ' + temp;
                    }
                }
                if (title_en) {
                    infobox.append('◎译　　名　' + title + temp + '</br>');
                    infobox.append('◎片　　名　' + title_en + '</br>');
                }
                else {
                    infobox.append('◎片　　名　' + title + temp + '</br>');
                }
                // var movieinfo = $("<span></span>");

                //////////////◎年　　代/////////////////
                infobox.append('◎年　　代　' + $('#content > h1 > span.year').text().substr(1, 4) + '</br>');
                //////////////◎产　　地/////////////////
                infobox.append('◎产　　地　' + $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "制片国家/地区:");
                }).text().trim() + '</br>');
                //////////////◎类　　别/////////////////
                var temp = $("<div></div>");
                temp.append($('div.article #info span[property="v:genre"]').clone());
                // //temp.find("span").
                temp.find('span').each(function () {
                    $(this).append('<div> / </div>');
                });
                temp.find("div:last").remove();
                // $('div.article #info').append(temp.text());
                infobox.append('◎类　　别　' + temp.text() + '<br>');
                //////////////◎语　　言/////////////////
                infobox.append('◎语　　言　' + $('div.article #info').contents().filter(function () {
                    return (this.nodeType === 3) && ($(this).prev().text() == "语言:");
                }).text().trim() + '</br>');
                //////////////◎上映日期/////////////////
                infobox.append('◎上映日期　' + $('div.article #info [property="v:initialReleaseDate"]').text() + '</br>');
                //////////////◎IMDb评分/////////////////
                infobox.append('◎IMDb评分　' + $('.rating_imdb strong.ll').text() + '/10 from ' + $('.rating_imdb a.rating_people').text() + '</br>');
                //////////////◎IMDb链接/////////////////
                infobox.append('◎IMDb链接　' + $('div#info a[href^=\'http://www.imdb.com/title/tt\']').attr('href') + '</br>');
                //////////////◎豆瓣评分/////////////////
                infobox.append('◎豆瓣评分　' + $('.rating_douban strong.ll').text() + '/10 from ' + $('.rating_douban a.rating_people').text() + '</br>');
                //////////////◎豆瓣链接/////////////////
                temp = $('#mainpic p.gact a').attr('href');
                temp = temp.substring(0, temp.length - 5);
                infobox.append('◎豆瓣链接　' + temp + '</br>');
                //////////////◎片　　长/////////////////
                infobox.append('◎片　　长　' + $('div.article #info').contents().filter(function () {
                    return ($(this).prev().attr('property') == "v:runtime") || ($(this).prev().text() == "片长:");
                }).text().trim() + '</br>');
                //////////////◎导　　演/////////////////
                infobox.append('◎导　　演　' + $('div.article #info span.attrs:first').text() + '</br>');
                //////////////◎主　　演/////////////////
                infobox.append('◎主　　演　' + $('div.article #info span.actor span.attrs').contents().filter(function () {
                    return $(this).attr("class") !== "more-actor";
                }).text() + '</br>');
                //////////////◎简    介/////////////////
                infobox.append('<p>◎简　　介</p><p>' + $('div.article div.related-info [property="v:summary"]').html() + '</p>');
                //////////////◎获奖情况/////////////////
                if ($('ul').hasClass("award")) {
                    var temp = $('<div></div>');
                    $('ul.award').each(function () {
                        temp.append($(this).text() + '</br>');
                    });
                    // $('div.article div.related-info').before(temp);
                    infobox.append('<p>◎获奖情况</p>' + temp.html() + '</br>');
                }
                movieinfo.hide();
                $('div.article div.related-info').before(infobox);
            })

            // get IMDB info
            var imdb, imdb_href, imdb_id;
            imdb = $('div#info a[href^=\'http://www.imdb.com/title/tt\']');
            if (imdb.length) {
                imdb_href = imdb.attr('href');
                imdb_id = imdb.text();
                if (imdb && imdb_id.startsWith('tt')) {
                    imdb_id = imdb_id.slice(2);
                } else {
                    imdb_id = '';
                }
                // imdb_id has been got from the page, generate all IMDB search links in PT part
                update_site_zgpt_sites(imdb_id, true);
                update_site_wgpt_sites(imdb_id, true);
                update_site_nzb_sites(imdb_id, true);
                update_site_ptzm_sites(imdb_id, true);
                getDoc(imdb_href, null, function (doc, resp, meta) {
                    var i, item, len, metascore, parse, popularity, ratingCount, ratingValue, rating_douban, rating_douban_ratingValue, rating_imdb, rating_more, reviews, starValue, titleReviewBarItem, title_en;
                    title_en = $(doc).attr('title');
                    title_en = title_en.split(' (')[0];
                    rating_douban = $('#interest_sectl .rating_wrap').addClass('rating_douban');
                    rating_douban_ratingValue = $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text();
                    rating_douban_ratingValue = (rating_douban_ratingValue + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    $('#interest_sectl .rating_douban a.rating_people span[property^=v]').text(rating_douban_ratingValue);
                    $('#interest_sectl').append($(imdb_html));
                    rating_imdb = $('#interest_sectl .rating_imdb');
                    $('#interest_sectl .rating_imdb a.rating_people').attr('href', imdb_href + '/' + 'ratings?ref_=tt_ov_rt');
                    ratingValue = $('span[itemprop=ratingValue]', doc).text();
                    $('#interest_sectl .rating_imdb strong.rating_num').text(ratingValue);
                    starValue = ratingValue / 2;
                    starValue = starValue % 1 > 0.5 ? Math.floor(starValue) + 0.5 : Math.floor(starValue);
                    starValue *= 10;
                    starValue = 'bigstar' + starValue;
                    $('#interest_sectl .rating_imdb div.rating_right div.ll').addClass(starValue);
                    ratingCount = $('span[itemprop=ratingCount]', doc).text();
                    $('#interest_sectl .rating_imdb a.rating_people span[property^=v]').text(ratingCount);
                    rating_imdb.after($('<div></div>').addClass('rating_more'));
                    rating_more = $('#interest_sectl .rating_more');
                    titleReviewBarItem = $('.titleReviewBar div.titleReviewBarItem', doc);
                    metascore = null;
                    popularity = null;
                    reviews = null;
                    parse = function (item) {
                        var Popularity, score, text;
                        text = $(item).text();
                        if (text.indexOf('Metascore') !== -1) {
                            score = $(item).find('a[href^=criticreviews] span').text();
                            metascore = $("<div>");
                            metascore.html('Metascore');
                            return metascore.append($('<a></a>').attr('href', imdb_href + '/' + 'criticreviews?ref_=tt_ov_rt').text(score));
                        } else if (text.indexOf('Popularity') !== -1) {
                            popularity = $("<div>");
                            Popularity = $(item).find('span.subText').html();
                            return popularity.html('流行度&nbsp;&nbsp;' + Popularity + '<br>');
                        } else if (text.indexOf('Reviews') !== -1) {
                            return null;
                        }
                    };
                    // add IMDB top 250 tag
                    if (ratingValue >= 8) {
                        getDoc('https://m.imdb.com/chart/top', meta, function (doc, res, meta) {
                            let list = res.responseText.match(/data-tconst="(tt\d{7})"/g);
                            //console.log(list);
                            let number = list.indexOf('data-tconst="tt' + imdb_id + '"') + 1;
                            if (number < 1 || number > 250) return;
                            // inject css if needed
                            if (document.getElementsByClassName('top250').length === 0) {
                                let style = document.createElement('style');
                                style.innerHTML = '.top250{background:url(https://s.doubanio.com/f/movie/f8a7b5e23d00edee6b42c6424989ce6683aa2fff/pics/movie/top250_bg.png) no-repeat;width:150px;font:12px Helvetica,Arial,sans-serif;margin:5px 0;color:#744900}.top250 span{display:inline-block;text-align:center;height:18px;line-height:18px}.top250 a,.top250 a:link,.top250 a:hover,.top250 a:active,.top250 a:visited{color:#744900;text-decoration:none;background:none}.top250-no{width:34%}.top250-link{width:66%}';
                                document.head.appendChild(style);
                            }
                            let after = document.getElementById('dale_movie_subject_top_icon');
                            if (!after)
                                after = document.querySelector('h1');
                            after.insertAdjacentHTML('beforebegin', '<div class="top250"><span class="top250-no">No.' + number + '</span><span class="top250-link"><a href="http://www.imdb.com/chart/top">IMDb Top 250</a></span></div>');
                            [].forEach.call(document.getElementsByClassName('top250'), function (e) {
                                e.style.display = 'inline-block';
                            });
                        });
                    }

                    // add rottentomatoes block
                    $('#titleYear', doc).remove();
                    movieTitle = $.trim($('h1[itemprop=name]', doc).text());
                    let rottURL = 'https://www.rottentomatoes.com/m/' + movieTitle.replace(/\s+/g,"_").replace(/\W+/g,"").toLowerCase();
                    getDoc(rottURL, null, function(rotdoc, resp, meta) {
                        //console.log(rotdoc.title+'\n'+$('.year').text());
                        let rottValue_selector = $('#interest_sectl .rating_rott #rottValue');
                        if(!rotdoc.title || rotdoc.title.split(/[\(\)]/)[1]!=$('.year').text().slice(1,-1)){
                            let rotta = $("<a></a>");
                            rotta.attr('target','_blank');
                            rotta.attr('href', 'https://www.rottentomatoes.com/search/?search=' + encodeURI(movieTitle));
                            rotta.text(movieTitle);
                            $('#interest_sectl').append($(rott_html));
                            rottValue_selector.append("搜索");
                            rottValue_selector.append(rotta);
                        }else if($('#tomato_meter_link',rotdoc).length){
                            rating_rott_value = $('#tomato_meter_link .meter-value.superPageFontColor', rotdoc).html();
                            $('#scoreStats .subtle.superPageFontColor', rotdoc).remove();
                            fresh_rott_value = $('#scoreStats .superPageFontColor:eq(2)', rotdoc).text();
                            rotten_rott_value = $('#scoreStats .superPageFontColor:eq(3)', rotdoc).text();
                            let rating_rott_right = '<div class="rating_right" style="line-height: 16px;"><span>鲜:&nbsp;&nbsp;'+fresh_rott_value+'</span><br><span>烂:&nbsp;&nbsp;'+rotten_rott_value+'</span> </div>';
                            $('#interest_sectl').append($(rott_html));
                            rottValue_selector.append($('<strong class="ll rating_num"><a target="_blank" href="'+rottURL+'">'+rating_rott_value+'</a></strong>'));
                            rottValue_selector.append($(rating_rott_right));
                        }
                    });


                    update_site_online_sites(title_en, true);
                    update_site_zwzm_sites(title_en, true);
                    update_site_ywzm_sites(title_en, true);
                    update_site_zxsp_sites(title_en, true);
                    update_site_dyzy_sites(title_en, true);
                    update_site_dmzy_sites(title_en, true);
                    update_site_mjzy_sites(title_en, true);
                    update_site_zgbt_sites(title_en, true);
                    update_site_offline_sites(title_en, true, imdb_id);
                    $('div.article #info').append('<span class="pl">生成信息: </span>').append(movieinfo);

                    // put on more ratings
                    for (i = 0, len = titleReviewBarItem.length; i < len; i++) {
                        item = titleReviewBarItem[i];
                        parse(item);
                    }
                    if (metascore || popularity || reviews) {
                        if (metascore) {
                            rating_more.append(metascore);
                        }
                        if (popularity) {
                            rating_more.append(popularity);
                        }
                        if (reviews) {
                            rating_more.append(reviews);
                        }
                    } else {
                        rating_more.remove();
                    }
                    return null;
                });

            }
            // get Chinese title
            var title, title_en, title_sec;
            title = title_sec = $('#content > h1 > span')[0].textContent.split(' ');
            title = title.shift();
            title_sec = title_sec.join(' ').trim();
            title_en = '';
            update_site_online_sites(title);
            update_site_offline_sites(title);
            update_site_zwzm_sites(title);
            update_site_ywzm_sites(title);
            update_site_zxsp_sites(title);
            update_site_dyzy_sites(title);
            update_site_dmzy_sites(title);
            update_site_mjzy_sites(title);
            update_site_zgbt_sites(title);
            update_site_zgpt_sites(title);
            update_site_wgpt_sites(title);
            update_site_nzb_sites(title);
            update_site_ptzm_sites(title);

            // add link to BIG poster
            let posterAnchor = document.querySelector('#mainpic > a > img');
            if (posterAnchor) {
                // get the posters page's URL via movie.douban.com's customs
                let postersUrl = posterAnchor.getAttribute("src");
                let postersID = postersUrl.match(/p(\d+)/)[1];
                let rawUrl = postersUrl.replace(/photo\/s_ratio_poster\/public\/(p\d+).+$/,"photo/raw/public/.jpg");
                $('#mainpic p.gact').after(`<a target="_blank" class="" onclick="moreurl(this, {raw: '${postersID}'})" rel="nofollow" href="${rawUrl}">查看原图</a>`);
            }

            function Search_PT_Sites(site, search_url, site_type, torrent_table_selector) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: search_url,
                    onload: function (res) {
                        let psite = $(site_type).filter(function () {
                            return $(this).attr('site') === site;
                        });
                        if (/(login|verify|returnto)[.=]/.test(res.finalUrl)) {
                            $(psite).addClass('disabled');
                        } else {
                            let doc = (new DOMParser()).parseFromString(res.responseText, 'text/html');
                            let body = doc.querySelector("body");
                            let page = $(body); // 构造 jQuery 对象
                            try {
                                if (/没有种子|No Torrents Found|Your search did not match anything|No torrents here|用准确的关键字重试/.test(res.responseText)) {
                                    //console.log("No any torrent find in Site " + site + ".");
                                    $(psite).css("background-color", "#f4eac2");
                                    $(psite).attr('stat', 'none');
                                } else {
                                    let tr_list = page.find(torrent_table_selector || "table.torrents:last > tbody > tr:gt(0)");
                                    //console.log("Get " + tr_list.length + " records in Site " + site + ".");
                                    if (tr_list.length) {
                                        $(psite).css("background-color", "#e3f1ed");
                                        $(psite).attr('stat', 'true');
                                    }
                                    else {
                                        $(psite).css("background-color", "#f4eac2");
                                        $(psite).attr('stat', 'none');
                                    }
                                }
                            } catch (error) {
                            }
                        }
                    },
                });
            }

            //get torrents info from ZGPHP sites
            function ZGPHP(site, search_prefix,torrent_table_selector) {
                Search_PT_Sites(site, search_prefix,'.site-zgpt-body a', torrent_table_selector);
            }

            //get torrents info from WGPHP sites
            function WGPHP(site, search_prefix, torrent_table_selector) {
                Search_PT_Sites(site, search_prefix,'.site-wgpt-body a', torrent_table_selector);
            }

            //get torrents info from NZBPHP sites
            function NZBPHP(site, search_prefix, torrent_table_selector) {
                Search_PT_Sites(site, search_prefix,'.site-nzb-body a',torrent_table_selector);
            }

            //get torrents info from PTZMPHP sites
            function PTZMPHP(site, search_prefix, torrent_table_selector) {
                Search_PT_Sites(site, search_prefix,'.site-ptzm-body a',torrent_table_selector);
            }


            function TagColor(site_domain,exist_selector) {
                let site = $('div.aside a[data-host$=\''+ site_domain + '\']');
                if (site) {
                    let site_href = site.attr('href');
                    getDoc(site_href, {site:site}, function(doc, resp, meta) {
                        let site = meta.site;
                        let lists = $(exist_selector, doc);
                        site.addClass(`${lists.length === 0 ? 'disabled': 'available'}`);
                    });
                }
            }

            // chinese sites
            ZGPHP("BTSchool", "http://pt.btschool.net/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("BYRBT", "https://bt.byr.cn/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("CCFBits", "http://www.ccfbits.org/browse.php?fullsearch=1&search=" + neizhan, "table.mainouter > tbody > tr:last > td > table:nth-child(10) > tbody > tr:gt(0)");
            ZGPHP("CHDBits", "https://chdbits.co/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("CMCT", "https://hdcmct.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("GZTown", "https://pt.gztown.net/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("FRDS", "http://pt.keepfrds.com/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("HDChina", "https://hdchina.org/torrents.php?incldead=1&search_area=1&search=" + neizhan, "table.torrent_list:last > tbody > tr:gt(0)");
            ZGPHP("HDCity", "https://hdcity.city/pt?incldead=1&search_area=1&iwannaseethis=" + neizhan, "center > div > div > div.text");
            ZGPHP("HDHome", "https://hdhome.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("HDSky", "https://hdsky.me/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("HDStreet", "https://hdstreet.club/torrents.php?incldead=1&search_area=4&search=" + xdouban);
            ZGPHP("HDTime", "https://hdtime.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("HDU", "http://pt.upxin.net/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("Hyperay", "https://hyperay.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("JoyHD", "https://www.joyhd.net/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("MTeam", "https://tp.m-team.cc/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("NPUBITS", "https://npupt.com/torrents.php?incldead=1&search_area=1&search=" + neizhan, "#torrents_table > tbody > tr:gt(0)");
            ZGPHP("NWSUAF", "https://pt.nwsuaf6.edu.cn/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("NYPT", "https://nanyangpt.com/torrents.php?incldead=1&search_area=1&search=" + neizhan, "table.torrents:last > tbody > tr");
            ZGPHP("OpenCD", "https://open.cd/torrents.php?incldead=1&search_area=0&search=" + zwm, "table.torrents:last > tbody > tr:gt(0)");
            ZGPHP("OurBits", "https://ourbits.club/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("SJTU", "https://pt.sjtu.edu.cn/torrents.php?incldead=1&search_area=1&search=" + neizhan, "table.torrents:last > tbody > tr");
            ZGPHP("SS", "https://skyeysnow.com/forum.php?mod=torrents&search=" + zwm + nian, "table.torrents > tbody > tr:gt(0)");
            ZGPHP("TCCF", "https://et8.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("TLFBits", "http://pt.eastgame.org/torrents.php?incldead=1&search_area=1&search=" + neizhan);
            ZGPHP("TTG", "https://totheglory.im/browse.php?c=M&search_field=" + ttgid, "table#torrent_table:last > tbody > tr:gt(0)");
            ZGPHP("U2", "https://u2.dmhy.org/torrents.php?incldead=1&search_area=0&search=" + zwm + nian);
            ZGPHP("WHUPT", "https://pt.whu.edu.cn/torrents.php?incldead=1&search_area=1&search=" + neizhan, "table.torrents:last > tbody > tr");
            ZGPHP("ZX", "http://pt.zhixing.bjtu.edu.cn/search/x" + zwm + nian + "/", "table.torrenttable > tbody > tr:gt(1)");

            // global sites
            WGPHP("AB", "https://animebytes.tv/torrents.php?searchstr=" + ywm + nian, "div.thin > div.group_cont");
            WGPHP("ADC", "http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Search%21&search=tt" + imdb_id + nian, "table.torrenttable:last > tbody > tr");
            WGPHP("AOX", "https://aox.to/index.php?page=torrents&options=4&search=" + imdb_id, "table.table.table-bordered:last > tbody > tr:gt(0)");
            WGPHP("Apollo", "https://apollo.rip/torrents.php?searchstr=" + ywm, "#torrent_table:last > tbody > tr.group_torrent:gt(0)");
            WGPHP("AR", "https://alpharatio.cc/torrents.php?searchstr=" + ywm + nian, "#torrent_table > tbody > tr:gt(0)");
            WGPHP("AVZ", "https://avistaz.to/torrents?in=1&search=" + ywm + nian, "table.table-condensed.table-striped.table-bordered:last > tbody > tr:gt(0)");
            WGPHP("BakaBT", "https://bakabt.me/browse.php?q=" + ywm + nian, "table.torrents > tbody > tr:gt(0)");
            WGPHP("BHD", "https://beyond-hd.me/browse.php?incldead=0&search=tt" + imdb_id, "table.tb_detail.grey.torrenttable:last > tbody > tr:gt(0)");
            WGPHP("CC", "http://www.cartoonchaos.org/index.php?page=torrents&options=0&active=1&search=" + ywm + nian, "table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:gt(0)");
            WGPHP("HDF", "https://hdf.world/torrents.php?searchstr=" + ywm + nian, "#torrent_table > tbody > tr:gt(0)");
            WGPHP("HDME", "http://hdme.eu/browse.php?incldead=1&blah=1&search=tt" + imdb_id, "table:nth-child(13) > tbody > tr");
            WGPHP("HDMonkey", "https://hdmonkey.org/torrents-search.php?incldead=0&search=" + ywm + nian, "table.ttable_headinner > tbody > tr:gt(0)");
            WGPHP("HDT", "https://hd-torrents.org/torrents.php?active=1&options=2&search=" + imdb_id, "table.mainblockcontenttt:last > tbody > tr:gt(0)");
            //WGPHP("ILC", "http://www.iloveclassics.com/browse.php?searchin=2&search=tt" + imdb_id, "#hover-over > tbody > tr.table_col1:gt(0)");
            WGPHP("HDS", "https://hd-space.org/index.php?page=torrents&active=1&options=2&search=" + imdb_id, "table.lista:last > tbody > tr:gt(0)");
            WGPHP("IPT", "https://iptorrents.com/t?qf=all&q=tt" + imdb_id, "table#torrents:last > tbody > tr:gt(0)");
            WGPHP("JPOP", "https://jpopsuki.eu/torrents.php?searchstr=" + ywm, "#torrent_table > tbody > tr:gt(0)");
            WGPHP("PHD", "https://privatehd.to/torrents?in=1&search=" + ywm + nian, "table.table-condensed.table-striped.table-bordered:first > tbody > tr:gt(0)");
            WGPHP("PTF", "http://ptfiles.net/browse.php?incldead=0&title=0&search=" + ywm + nian, "#tortable > tbody > tr.rowhead:gt(0)");
            WGPHP("Red", "https://redacted.ch/torrents.php?searchstr=" + ywm, "#torrent_table > tbody > tr.group_torrent:gt(0)");
            WGPHP("SC", "https://secret-cinema.pw/torrents.php?cataloguenumber=tt" + imdb_id, "div.torrent_card");
            WGPHP("Speed", "https://speed.cd/browse.php?d=on&search=tt" + imdb_id, "div.boxContent > table:first >tbody > tr:gt(0)");
            WGPHP("TD", "https://www.torrentday.com/t?q=tt" + imdb_id, "table#torrentTable > tbody > tr:gt(0)");
            WGPHP("TS", "https://www.torrentseeds.org/browse.php?searchin=title&incldead=0&search=%22" + ywm + nian + "%22", "table.table.table-bordered > tbody > tr.browse_color:gt(0)");
            WGPHP("TT", "https://revolutiontt.me/browse.php?search=tt" + imdb_id, "table#torrents-table > tbody > tr:gt(0)");
            WGPHP("UHD", "https://uhdbits.org/torrents.php?searchstr=tt" + imdb_id, "table.torrent_table:last > tbody > tr:gt(0)");
            WGPHP("Waffles", "https://waffles.ch/browse.php?q=" + ywm, "#browsetable:last > tbody > tr:gt(0)");
            WGPHP("WOP", "http://worldofp2p.net/browse.php?incldead=0&searchin=descr&search=tt" + imdb_id, "table.yenitorrenttable:last > tbody > tr:gt(0)");

            // NZB sites
            NZBPHP("DOGnzb", "https://dognzb.cr/search?q=" + ywm + nian, "#featurebox > table > tbody > tr > td > table > tbody > tr.odd:gt(0)");
            NZBPHP("LuluNZB", "https://lulunzb.com/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");
            NZBPHP("Miatrix", "https://www.miatrix.com/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");
            NZBPHP("NewzTown", "https://newztown.co.za/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");
            NZBPHP("NZBCat", "https://nzb.cat/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");
            NZBPHP("NZBgeek", "https://nzbgeek.info/geekseek.php?moviesgeekseek=1&browsecategory=&browseincludewords=" + ywm, "table > tbody > tr.HighlightTVRow2:gt(0)");
            NZBPHP("NZBP", "https://nzbplanet.net/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");
            NZBPHP("Oznzb", "https://www.oznzb.com/search/" + ywm + nian, "#browsetable > tbody > tr.ratingReportContainer:gt(0)");
            NZBPHP("SNZB", "https://simplynzbs.com/search/" + ywm + nian, "#browsetable > tbody > tr:gt(0)");

            // PT字幕网站
            PTZMPHP("BYRBT®", "https://bt.byr.cn/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table:last > tbody > tr:gt(1)");
            PTZMPHP("CHDBits®", "https://chdbits.co/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table:last > tbody > tr:gt(1)");
            PTZMPHP("CMCT®", "https://hdcmct.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table:last > tbody > tr:gt(1)");
            PTZMPHP("FRDS®", "http://pt.keepfrds.com/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("HDChina®", "https://hdchina.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table.uploaded_sub_list > tbody > tr:gt(1)");
            PTZMPHP("HDCity®", "https://hdcity.city/subtitles?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "center > div:nth-child(1) > table > tbody > tr:nth-child(2)");
            PTZMPHP("HDHome®", "https://hdhome.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table:last > tbody > tr:gt(1)");
            PTZMPHP("HDSky®", "https://hdsky.me/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table:last > tbody > tr:gt(1)");
            PTZMPHP("HDTime®", "https://hdtime.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='100%'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr");
            PTZMPHP("HDU®", "http://pt.upxin.net/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("Hyperay®", "https://hyperay.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("JoyHD®", "https://www.joyhd.net/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("MTeam®", "https://tp.m-team.cc/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table.table-subtitle-list:last > tbody > tr");
            PTZMPHP("NPUBITS®", "https://npupt.com/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "#main > table > tbody > tr:nth-child(2)");
            PTZMPHP("NYPT®", "https://nanyangpt.com/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("OurBits®", "https://ourbits.club/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("SJTU®", "https://pt.sjtu.edu.cn/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("TCCF®", "https://et8.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("TLFBits®", "http://pt.eastgame.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("U2®", "https://u2.dmhy.org/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table[width='940'][border='1'][cellspacing='0'][cellpadding='5'] > tbody > tr:nth-child(2)");
            PTZMPHP("WHUPT®", "https://pt.whu.edu.cn/subtitles.php?search=" + ywm.replace(/ /g,"_") + nian.replace(/ /,"_"), "table.no-vertical-line:last > tbody > tr");

            // 字幕颜色标记
            TagColor("zimuku.cn",'div.box.clearfix div.item.prel.clearfix');
            TagColor("zimuzu.tv",'.search-result li');
            TagColor("subhd.com",'div.col-md-9 div.box');
            TagColor("assrt.net",'div.body div.subitem');
            TagColor("163sub.com",'#main_narrow_bd div.subs_list');
            TagColor("dbfansub.com",'div.panel-body article.panel.panel-default.archive');
            TagColor("zimushe.com",'div.wrap-l li');
            TagColor("zimuzimu.com",'table.sublist a.othersub');
            TagColor("r3sub.com",'div.col-sm-8.col-md-9.col-lg-8 div.movie.movie--preview.ddd');
            TagColor("hdzimu.com",'div.post-warp div.post-box');
            TagColor("zimu.m1080.com",'table td');
            TagColor("opensubtitles.org",'#search_results tr.change');
            TagColor("addic7ed.com",'table.tabel tr');
            TagColor("podnapisi.net",'table tr.subtitle-entry');
            TagColor("subscene.com",'table td.a1');
            TagColor("tvsubs.net",'div.cont li');
            TagColor("tvsubtitles.net",'div.left_articles li');
            TagColor("yifysubtitles.com",'div.col-sm-12 div.col-xs-12');

            // 在线视频颜色标记
            TagColor("neets.cc",'#search_li_box div.search_li.clearfix');
            TagColor("so.iqiyi.com",'div.mod_result a.info_play_btn');
            TagColor("so.tv.sohu.com",'div.wrap.cfix div.cfix.resource');
            TagColor("v.qq.com",'div.wrapper_main div._infos');
            TagColor("soku.com",'div.DIR div.s_info');
            TagColor("aaxxy.com",'#find-focus li');
            TagColor("q2002.com",'div.container div.movie-item');
            TagColor("magbt.net",'#content li.listfl');
            TagColor("noad.zhuchaoli.club",'div.b-listtab-main li.item');
            TagColor("noad.zhuchaoli.club",'div.b-listtab-main li.item');
            TagColor("halihali.cc",'#contents div.info');
            TagColor("ciyuan.bi",'div.search_left_container div.search_list_box_right');
            TagColor("9anime.is",'div.film-list a.name');

            // 电影资源
            TagColor("id97.com",'div.container div.col-xs-7');
            TagColor("99tvs.com",'#post_container li');
            TagColor("bteye.com",'#main div.item');
            TagColor("rs05.com",'#movielist li');
            TagColor("dysfz.cc",'.movie-list li');
            TagColor("gagays.xyz",'#movie-sub-cont-db div.large-movie-detail');
            TagColor("gaoqing.la",'div.mainleft div.post_hover');
            TagColor("minimp4.com",'div.container div.col-xs-7');
            TagColor("pniao.com",'div.mainContainer div.movieFlag.eachOne');
            TagColor("aixia.cc",'div.con li');
            TagColor("btdx8.com",'#content div.post.clearfix');
            TagColor("52movieba.com",'table.table.table-hover.threadlist tr.thread.tap');
            TagColor("zxysz.com",'table.table.table-hover.threadlist tr.thread.tap');
            TagColor("gaoqingkong.com",'#post_container div.post_hover');
            TagColor("dy8c.com",'#content div.post-box');
            TagColor('languang.co','div.mi_cont li');
            TagColor('yunbowang.cn','div.container div.col-xs-7');

            // 动漫资源颜色标记
            TagColor('share.dmhy.org','tbody span.btl_1');
            TagColor('acg.rip','tbody tr');
            TagColor('kisssub.org','tbody span.bts_1');
            TagColor('acgsou.com','tbody span.bts_1');
            TagColor('nyaso.com','tbody a.down');
            TagColor('acg.gg','tbody p.original.download');
            TagColor('share.xfsub.com','#listTable span.bts_1');
            TagColor('yxdm.tv','div.main p.stars1');
            TagColor('anidex.info','div.table-responsive tr');
            TagColor('animetosho.org','#content div.home_list_entry');
            TagColor('anirena.com','#content table');
            TagColor('nyaa.si','div.table-responsive tr.default');

            // 美剧资源
            TagColor('yyetss.com','div.row div.col-xs-3');
            TagColor('ttmeiju.vip','table.latesttable tr.Scontent1');
            TagColor('22v.net','div.movie span');
            TagColor('msj1.com','div.cat_list div.art_show_top');
            TagColor('itvfans.com','#main-wrap-left div.home-blog-entry-text');

            // BT内站
            TagColor('btbtt.co','#threadlist table');
            TagColor('rarbt.com','div.ml div.title');
            TagColor('oabt004.com','div.link-list-wrapper ul.link-list');
            TagColor('etdown.net','tbody.list_4 tr');
            TagColor('woaip2p','tbody td.word-break');
            TagColor('bttt.la','div.ml div.title');
            TagColor('btba.com.cn','div.left li');
            TagColor('chapianyuan.com','div.block li');
            TagColor('v.yizhansou.com','table td.st');
            TagColor('xiaohx.org','div.search_right li');
            TagColor('cilimao.me','#Search__content_left___2MajJ div.MovieCard__content___3kv1W');   // TODO check
            TagColor('btmyi.com','div.row h5.item-title');

            // BT外站
            TagColor('rarbg.is','table.lista2t tr.lista2');
            TagColor('bt-scene.cc','table.tor td.tname');
            TagColor('idope.se','#div2child div.resultdiv');
            TagColor('katcr.co','div.table--responsive_vertical div.torrents_table__torrent_name');
            TagColor('limetorrents.cc','table.table2 div.tt-name');
            TagColor('thepiratebay.org','#searchResult div.detName');
            TagColor('zooqle.com','div.panel-body a.small');
            TagColor('isohunt2.net','#serps td.title-row');
            TagColor('worldwidetorrents.me','div.w3-responsive td.w3-jose');
        });
    }
}
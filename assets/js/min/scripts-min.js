function debounce(t,e,n){var i;return function(){var o=this,r=arguments;clearTimeout(i),i=setTimeout(function(){i=null,n||t.apply(o,r)},e),n&&!i&&t.apply(o,r)}}function isElementInViewport(t){var e=$(t),n=-1!=navigator.userAgent.toLowerCase().indexOf("webkit")?"body":"html",i=$(n).scrollTop(),o=i+$(window).height(),r=Math.round(e.offset().top),a=r+e.height();return o>r&&a>i}!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var i in n)e.push(n[i]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll,r=o?i.forward:i.backward;for(var a in this.waypoints[n]){var s=this.waypoints[n][a],l=i.oldScroll<s.triggerPoint,c=i.newScroll>=s.triggerPoint,u=l&&c,d=!l&&!c;(u||d)&&(s.queueTrigger(r),t[s.group.id]=s.group)}}for(var f in t)t[f].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;o>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=this.adapter.offset(),i={};this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in t){var r=t[o];for(var a in this.waypoints[o]){var s,l,c,u,d,f=this.waypoints[o][a],h=f.options.offset,p=f.triggerPoint,m=0,g=null==p;f.element!==f.element.window&&(m=f.adapter.offset()[r.offsetProp]),"function"==typeof h?h=h.apply(f):"string"==typeof h&&(h=parseFloat(h),f.options.offset.indexOf("%")>-1&&(h=Math.ceil(r.contextDimension*h/100))),s=r.contextScroll-r.contextOffset,f.triggerPoint=m+s-h,l=p<r.oldScroll,c=f.triggerPoint>=r.oldScroll,u=l&&c,d=!l&&!c,!g&&u?(f.queueTrigger(r.backward),i[f.group.id]=f.group):!g&&d?(f.queueTrigger(r.forward),i[f.group.id]=f.group):g&&r.oldScroll>=f.triggerPoint&&(f.queueTrigger(r.forward),i[f.group.id]=f.group)}}for(var v in i)i[v].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;n.call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},o=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],o="up"===n||"left"===n;i.sort(o?e:t);for(var r=0,a=i.length;a>r;r+=1){var s=i[r];(s.options.continuous||r===i.length-1)&&s.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints),i=n===this.waypoints.length-1;return i?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return i[t.axis][t.name]||new n(t)},o.Group=n}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,n=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,n){t.prototype[n]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(n,i){t[i]=e[i]}),n.adapters.push({name:"jquery",Adapter:t}),n.Adapter=t}(),function(){"use strict";function t(t){return function(){var n=[],i=arguments[0];return t.isFunction(arguments[0])&&(i=t.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var o=t.extend({},i,{element:this});"string"==typeof o.context&&(o.context=t(this).closest(o.context)[0]),n.push(new e(o))}),n}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}(),window.Modernizr=function(t,e,n){function i(t){p.cssText=t}function o(t,e){return i(v.join(t+";")+(e||""))}function r(t,e){return typeof t===e}function a(t,e){return!!~(""+t).indexOf(e)}function s(t,e,i){for(var o in t){var a=e[t[o]];if(a!==n)return i===!1?t[o]:r(a,"function")?a.bind(i||e):a}return!1}var l="2.8.3",c={},u=!0,d=e.documentElement,f="modernizr",h=e.createElement(f),p=h.style,m,g={}.toString,v=" -webkit- -moz- -o- -ms- ".split(" "),y={},w={},b={},C=[],x=C.slice,k,S=function(t,n,i,o){var r,a,s,l,c=e.createElement("div"),u=e.body,h=u||e.createElement("body");if(parseInt(i,10))for(;i--;)s=e.createElement("div"),s.id=o?o[i]:f+(i+1),c.appendChild(s);return r=["&#173;",'<style id="s',f,'">',t,"</style>"].join(""),c.id=f,(u?c:h).innerHTML+=r,h.appendChild(c),u||(h.style.background="",h.style.overflow="hidden",l=d.style.overflow,d.style.overflow="hidden",d.appendChild(h)),a=n(c,t),u?c.parentNode.removeChild(c):(h.parentNode.removeChild(h),d.style.overflow=l),!!a},z={}.hasOwnProperty,A;A=r(z,"undefined")||r(z.call,"undefined")?function(t,e){return e in t&&r(t.constructor.prototype[e],"undefined")}:function(t,e){return z.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var n=x.call(arguments,1),i=function(){if(this instanceof i){var o=function(){};o.prototype=e.prototype;var r=new o,a=e.apply(r,n.concat(x.call(arguments)));return Object(a)===a?a:r}return e.apply(t,n.concat(x.call(arguments)))};return i}),y.touch=function(){var n;return"ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch?n=!0:S(["@media (",v.join("touch-enabled),("),f,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){n=9===t.offsetTop}),n};for(var _ in y)A(y,_)&&(k=_.toLowerCase(),c[k]=y[_](),C.push((c[k]?"":"no-")+k));return c.addTest=function(t,e){if("object"==typeof t)for(var i in t)A(t,i)&&c.addTest(i,t[i]);else{if(t=t.toLowerCase(),c[t]!==n)return c;e="function"==typeof e?e():e,"undefined"!=typeof u&&u&&(d.className+=" "+(e?"":"no-")+t),c[t]=e}return c},i(""),h=m=null,function(t,e){function n(t,e){var n=t.createElement("p"),i=t.getElementsByTagName("head")[0]||t.documentElement;return n.innerHTML="x<style>"+e+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var t=y.elements;return"string"==typeof t?t.split(" "):t}function o(t){var e=g[t[p]];return e||(e={},m++,t[p]=m,g[m]=e),e}function r(t,n,i){if(n||(n=e),v)return n.createElement(t);i||(i=o(n));var r;return r=i.cache[t]?i.cache[t].cloneNode():f.test(t)?(i.cache[t]=i.createElem(t)).cloneNode():i.createElem(t),!r.canHaveChildren||d.test(t)||r.tagUrn?r:i.frag.appendChild(r)}function a(t,n){if(t||(t=e),v)return t.createDocumentFragment();n=n||o(t);for(var r=n.frag.cloneNode(),a=0,s=i(),l=s.length;l>a;a++)r.createElement(s[a]);return r}function s(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(n){return y.shivMethods?r(n,t,e):e.createElem(n)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(y,e.frag)}function l(t){t||(t=e);var i=o(t);return y.shivCSS&&!h&&!i.hasCSS&&(i.hasCSS=!!n(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),v||s(t,i),t}var c="3.7.0",u=t.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h,p="_html5shiv",m=0,g={},v;!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",h="hidden"in t,v=1==t.childNodes.length||function(){e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(n){h=!0,v=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:u.shivCSS!==!1,supportsUnknownElements:v,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:r,createDocumentFragment:a};t.html5=y,l(e)}(this,e),c._version=l,c._prefixes=v,c.testStyles=S,d.className=d.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(u?" js "+C.join(" "):""),c}(this,this.document),function(t,e,n){function i(t){return"[object Function]"==p.call(t)}function o(t){return"string"==typeof t}function r(){}function a(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function s(){var t=m.shift();g=1,t?t.t?f(function(){("c"==t.t?_.injectCss:_.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),s()):g=0}function l(t,n,i,o,r,l,c){function u(e){if(!p&&a(d.readyState)&&(b.r=p=1,!g&&s(),d.onload=d.onreadystatechange=null,e)){"img"!=t&&f(function(){w.removeChild(d)},50);for(var i in S[n])S[n].hasOwnProperty(i)&&S[n][i].onload()}}var c=c||_.errorTimeout,d=e.createElement(t),p=0,v=0,b={t:i,s:n,e:r,a:l,x:c};1===S[n]&&(v=1,S[n]=[]),"object"==t?d.data=n:(d.src=n,d.type=t),d.width=d.height="0",d.onerror=d.onload=d.onreadystatechange=function(){u.call(this,v)},m.splice(o,0,b),"img"!=t&&(v||2===S[n]?(w.insertBefore(d,y?null:h),f(u,c)):S[n].push(d))}function c(t,e,n,i,r){return g=0,e=e||"j",o(t)?l("c"==e?C:b,t,e,this.i++,n,i,r):(m.splice(this.i++,0,t),1==m.length&&s()),this}function u(){var t=_;return t.loader={load:c,i:0},t}var d=e.documentElement,f=t.setTimeout,h=e.getElementsByTagName("script")[0],p={}.toString,m=[],g=0,v="MozAppearance"in d.style,y=v&&!!e.createRange().compareNode,w=y?d:h.parentNode,d=t.opera&&"[object Opera]"==p.call(t.opera),d=!!e.attachEvent&&!d,b=v?"object":d?"script":"img",C=d?"script":b,x=Array.isArray||function(t){return"[object Array]"==p.call(t)},k=[],S={},z={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}},A,_;_=function(t){function e(t){var t=t.split("!"),e=k.length,n=t.pop(),i=t.length,n={url:n,origUrl:n,prefixes:t},o,r,a;for(r=0;i>r;r++)a=t[r].split("="),(o=z[a.shift()])&&(n=o(n,a));for(r=0;e>r;r++)n=k[r](n);return n}function a(t,o,r,a,s){var l=e(t),c=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=i(o)?o:o[t]||o[a]||o[t.split("/").pop().split("?")[0]]),l.instead?l.instead(t,o,r,a,s):(S[l.url]?l.noexec=!0:S[l.url]=1,r.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(o)||i(c))&&r.load(function(){u(),o&&o(l.origUrl,s,a),c&&c(l.origUrl,s,a),S[l.url]=2})))}function s(t,e){function n(t,n){if(t){if(o(t))n||(c=function(){var t=[].slice.call(arguments);u.apply(this,t),d()}),a(t,c,e,0,s);else if(Object(t)===t)for(h in f=function(){var e=0,n;for(n in t)t.hasOwnProperty(n)&&e++;return e}(),t)t.hasOwnProperty(h)&&(!n&&!--f&&(i(c)?c=function(){var t=[].slice.call(arguments);u.apply(this,t),d()}:c[h]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),d()}}(u[h])),a(t[h],c,e,h,s))}else!n&&d()}var s=!!t.test,l=t.load||t.both,c=t.callback||r,u=c,d=t.complete||r,f,h;n(s?t.yep:t.nope,!!l),l&&n(l)}var l,c,d=this.yepnope.loader;if(o(t))a(t,0,d,0);else if(x(t))for(l=0;l<t.length;l++)c=t[l],o(c)?a(c,0,d,0):x(c)?_(c):Object(c)===c&&s(c,d);else Object(t)===t&&s(t,d)},_.addPrefix=function(t,e){z[t]=e},_.addFilter=function(t){k.push(t)},_.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",A=function(){e.removeEventListener("DOMContentLoaded",A,0),e.readyState="complete"},0)),t.yepnope=u(),t.yepnope.executeStack=s,t.yepnope.injectJs=function(t,n,i,o,l,c){var u=e.createElement("script"),d,p,o=o||_.errorTimeout;u.src=t;for(p in i)u.setAttribute(p,i[p]);n=c?s:n||r,u.onreadystatechange=u.onload=function(){!d&&a(u.readyState)&&(d=1,n(),u.onload=u.onreadystatechange=null)},f(function(){d||(d=1,n(1))},o),l?u.onload():h.parentNode.insertBefore(u,h)},t.yepnope.injectCss=function(t,n,i,o,a,l){var o=e.createElement("link"),c,n=l?s:n||r;o.href=t,o.rel="stylesheet",o.type="text/css";for(c in i)o.setAttribute(c,i[c]);a||(h.parentNode.insertBefore(o,h),f(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},!function(t,e){var n=e(t,t.document);t.lazySizes=n,"object"==typeof module&&module.exports&&(module.exports=n)}(window,function(t,e){"use strict";if(e.getElementsByClassName){var n,i,o=e.documentElement,r=t.Date,a=t.HTMLPictureElement,s="addEventListener",l="getAttribute",c=t[s],u=t.setTimeout,d=t.requestAnimationFrame||u,f=t.requestIdleCallback,h=/^picture$/i,p=["load","error","lazyincluded","_lazyloaded"],m={},g=Array.prototype.forEach,v=function(t,e){return m[e]||(m[e]=new RegExp("(\\s|^)"+e+"(\\s|$)")),m[e].test(t[l]("class")||"")&&m[e]},y=function(t,e){v(t,e)||t.setAttribute("class",(t[l]("class")||"").trim()+" "+e)},w=function(t,e){var n;(n=v(t,e))&&t.setAttribute("class",(t[l]("class")||"").replace(n," "))},b=function(t,e,n){var i=n?s:"removeEventListener";n&&b(t,e),p.forEach(function(n){t[i](n,e)})},C=function(t,i,o,r,a){var s=e.createEvent("CustomEvent");return o||(o={}),o.instance=n,s.initCustomEvent(i,!r,!a,o),t.dispatchEvent(s),s},x=function(e,n){var o;!a&&(o=t.picturefill||i.pf)?o({reevaluate:!0,elements:[e]}):n&&n.src&&(e.src=n.src)},k=function(t,e){return(getComputedStyle(t,null)||{})[e]},S=function(t,e,n){for(n=n||t.offsetWidth;n<i.minSize&&e&&!t._lazysizesWidth;)n=e.offsetWidth,e=e.parentNode;return n},z=function(){var t,n,i=[],o=[],r=i,a=function(){var e=r;for(r=i.length?o:i,t=!0,n=!1;e.length;)e.shift()();t=!1},s=function(i,o){t&&!o?i.apply(this,arguments):(r.push(i),n||(n=!0,(e.hidden?u:d)(a)))};return s._lsFlush=a,s}(),A=function(t,e){return e?function(){z(t)}:function(){var e=this,n=arguments;z(function(){t.apply(e,n)})}},_=function(t){var e,n=0,o=i.throttleDelay,a=i.ricTimeout,s=function(){e=!1,n=r.now(),t()},l=f&&a>49?function(){f(s,{timeout:a}),a!==i.ricTimeout&&(a=i.ricTimeout)}:A(function(){u(s)},!0);return function(t){var i;(t=t===!0)&&(a=33),e||(e=!0,i=o-(r.now()-n),0>i&&(i=0),t||9>i?l():u(l,i))}},E=function(t){var e,n,i=99,o=function(){e=null,t()},a=function(){var t=r.now()-n;i>t?u(a,i-t):(f||o)(o)};return function(){n=r.now(),e||(e=u(a,i))}};!function(){var e,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};i=t.lazySizesConfig||t.lazysizesConfig||{};for(e in n)e in i||(i[e]=n[e]);t.lazySizesConfig=i,u(function(){i.init&&F()})}();var T=function(){var a,d,f,p,m,S,T,F,M,N,O,W,D,B,P=/^img$/i,H=/^iframe$/i,R="onscroll"in t&&!/glebot/.test(navigator.userAgent),L=0,q=0,I=0,V=-1,Q=function(t){I--,t&&t.target&&b(t.target,Q),(!t||0>I||!t.target)&&(I=0)},X=function(t,n){var i,r=t,a="hidden"==k(e.body,"visibility")||"hidden"!=k(t,"visibility");for(F-=n,O+=n,M-=n,N+=n;a&&(r=r.offsetParent)&&r!=e.body&&r!=o;)a=(k(r,"opacity")||1)>0,a&&"visible"!=k(r,"overflow")&&(i=r.getBoundingClientRect(),a=N>i.left&&M<i.right&&O>i.top-1&&F<i.bottom+1);return a},U=function(){var t,r,s,c,u,f,h,m,g,v=n.elements;if((p=i.loadMode)&&8>I&&(t=v.length)){r=0,V++,null==D&&("expand"in i||(i.expand=o.clientHeight>500&&o.clientWidth>500?500:370),W=i.expand,D=W*i.expFactor),D>q&&1>I&&V>2&&p>2&&!e.hidden?(q=D,V=0):q=p>1&&V>1&&6>I?W:L;for(;t>r;r++)if(v[r]&&!v[r]._lazyRace)if(R)if((m=v[r][l]("data-expand"))&&(f=1*m)||(f=q),g!==f&&(S=innerWidth+f*B,T=innerHeight+f,h=-1*f,g=f),s=v[r].getBoundingClientRect(),(O=s.bottom)>=h&&(F=s.top)<=T&&(N=s.right)>=h*B&&(M=s.left)<=S&&(O||N||M||F)&&(i.loadHidden||"hidden"!=k(v[r],"visibility"))&&(d&&3>I&&!m&&(3>p||4>V)||X(v[r],f))){if(et(v[r]),u=!0,I>9)break}else!u&&d&&!c&&4>I&&4>V&&p>2&&(a[0]||i.preloadAfterLoad)&&(a[0]||!m&&(O||N||M||F||"auto"!=v[r][l](i.sizesAttr)))&&(c=a[0]||v[r]);else et(v[r]);c&&!u&&et(c)}},J=_(U),K=function(t){y(t.target,i.loadedClass),w(t.target,i.loadingClass),b(t.target,G),C(t.target,"lazyloaded")},Z=A(K),G=function(t){Z({target:t.target})},$=function(t,e){try{t.contentWindow.location.replace(e)}catch(n){t.src=e}},Y=function(t){var e,n=t[l](i.srcsetAttr);(e=i.customMedia[t[l]("data-media")||t[l]("media")])&&t.setAttribute("media",e),n&&t.setAttribute("srcset",n)},tt=A(function(t,e,n,o,r){var a,s,c,d,p,m;(p=C(t,"lazybeforeunveil",e)).defaultPrevented||(o&&(n?y(t,i.autosizesClass):t.setAttribute("sizes",o)),s=t[l](i.srcsetAttr),a=t[l](i.srcAttr),r&&(c=t.parentNode,d=c&&h.test(c.nodeName||"")),m=e.firesLoad||"src"in t&&(s||a||d),p={target:t},m&&(b(t,Q,!0),clearTimeout(f),f=u(Q,2500),y(t,i.loadingClass),b(t,G,!0)),d&&g.call(c.getElementsByTagName("source"),Y),s?t.setAttribute("srcset",s):a&&!d&&(H.test(t.nodeName)?$(t,a):t.src=a),r&&(s||d)&&x(t,{src:a})),t._lazyRace&&delete t._lazyRace,w(t,i.lazyClass),z(function(){(!m||t.complete&&t.naturalWidth>1)&&(m?Q(p):I--,K(p))},!0)}),et=function(t){var e,n=P.test(t.nodeName),o=n&&(t[l](i.sizesAttr)||t[l]("sizes")),r="auto"==o;(!r&&d||!n||!t[l]("src")&&!t.srcset||t.complete||v(t,i.errorClass)||!v(t,i.lazyClass))&&(e=C(t,"lazyunveilread").detail,r&&j.updateElem(t,!0,t.offsetWidth),t._lazyRace=!0,I++,tt(t,e,r,o,n))},nt=function(){if(!d){if(r.now()-m<999)return void u(nt,999);var t=E(function(){i.loadMode=3,J()});d=!0,i.loadMode=3,J(),c("scroll",function(){3==i.loadMode&&(i.loadMode=2),t()},!0)}};return{_:function(){m=r.now(),n.elements=e.getElementsByClassName(i.lazyClass),a=e.getElementsByClassName(i.lazyClass+" "+i.preloadClass),B=i.hFac,c("scroll",J,!0),c("resize",J,!0),t.MutationObserver?new MutationObserver(J).observe(o,{childList:!0,subtree:!0,attributes:!0}):(o[s]("DOMNodeInserted",J,!0),o[s]("DOMAttrModified",J,!0),setInterval(J,999)),c("hashchange",J,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(t){e[s](t,J,!0)}),/d$|^c/.test(e.readyState)?nt():(c("load",nt),e[s]("DOMContentLoaded",J),u(nt,2e4)),n.elements.length?(U(),z._lsFlush()):J()},checkElems:J,unveil:et}}(),j=function(){var t,n=A(function(t,e,n,i){var o,r,a;if(t._lazysizesWidth=i,i+="px",t.setAttribute("sizes",i),h.test(e.nodeName||""))for(o=e.getElementsByTagName("source"),r=0,a=o.length;a>r;r++)o[r].setAttribute("sizes",i);n.detail.dataAttr||x(t,n.detail)}),o=function(t,e,i){var o,r=t.parentNode;r&&(i=S(t,r,i),o=C(t,"lazybeforesizes",{width:i,dataAttr:!!e}),o.defaultPrevented||(i=o.detail.width,i&&i!==t._lazysizesWidth&&n(t,r,o,i)))},r=function(){var e,n=t.length;if(n)for(e=0;n>e;e++)o(t[e])},a=E(r);return{_:function(){t=e.getElementsByClassName(i.autosizesClass),c("resize",a)},checkElems:a,updateElem:o}}(),F=function(){F.i||(F.i=!0,j._(),T._())};return n={cfg:i,autoSizer:j,loader:T,init:F,uP:x,aC:y,rC:w,hC:v,fire:C,gW:S,rAF:z}}});var searchVisible=0,transparent=!0,transparentDemo=!0,fixedTop=!1,navbar_initialized=!1,big_image,scroll,project_content,$project;scroll=(2500-$(window).width())/$(window).width();var $ScrollTop,$ScrollBot,pixels,modal,$project_content,test=!0,timerStart=Date.now(),delay,no_of_elements=0,window_height,window_width,content_opacity=0,content_transition=0,no_touch_screen=!1,burger_menu;$(document).ready(function(){BrowserDetect.init(),"Explorer"==BrowserDetect.browser&&BrowserDetect.version<=9&&$("body").html(better_browser),window_width=$(window).width(),window_height=$(window).height(),burger_menu=$('nav[role="navigation"]').hasClass("navbar-burger")?!0:!1,Modernizr.touch||($("body").addClass("no-touch"),no_touch_screen=!0),rubik.initAnimationsCheck(),(992>window_width||burger_menu)&&rubik.initRightMenu(),992>window_width&&($(".over-area").each(function(){var t=$(this).attr("onClick");""==t&&(src="rubik.showModal(this)",$(this).attr("onClick",src))}),rubik.checkResponsiveImage()),setTimeout(function(){$(".loading").css("opacity","0"),setTimeout(function(){$(".loading").addClass("hide")},500)},3e3),0!=$(".content-with-opacity").length&&(content_opacity=1)}),$(window).load(function(){rubik.initAnimationsCheck()}),$(window).resize(function(){$(window).width()<992&&(rubik.initRightMenu(),rubik.checkResponsiveImage()),$(window).width()>992&&!burger_menu&&($('nav[role="navigation"]').removeClass("navbar-burger"),rubik.misc.navbar_menu_visible=1,navbar_initialized=!1)}),$(window).on("scroll",function(){rubik.checkScrollForTransparentNavbar(),window_width>992&&rubik.checkScrollForParallax(),1==content_opacity&&rubik.checkScrollForContentTransitions()}),$('a[data-scroll="true"]').click(function(t){var e=$(this).data("id"),n=$(this).data("scroll");1==n&&void 0!==e&&(t.preventDefault(),$("html, body").animate({scrollTop:$(e).offset().top-50},1e3))}),$(".section-we-made-2 .scroller").mousemove(function(t){Modernizr.touch||(t.clientX<200&&$(this).css("transform","translateX(0)"),t.clientX>200&&t.clientX<$(window).width()-200&&t.clientX%2==0&&(pixels=-t.clientX*scroll,$(this).css("transform","translateX("+pixels+"px)")),t.clientX>$(window).width()-200&&(pixels=-(2500-$(window).width()),$(this).css("transform","translateX("+pixels+"px)")),$(".projects").css("overflow","hidden"))}),rubik={misc:{navbar_menu_visible:0},initAnimationsCheck:function(){$('[class*="add-animation"]').each(function(){offset_diff=30,$(this).hasClass("title")&&(offset_diff=110);var t=$(this).waypoint(function(t){"down"==t?$(this.element).addClass("animate"):$(this.element).removeClass("animate")},{offset:window_height-offset_diff})})},initRightMenu:function(){navbar_initialized||($nav=$('nav[role="navigation"]'),$nav.addClass("navbar-burger"),$navbar=$nav.find(".navbar-collapse").first().clone(!0),ul_content="",$navbar.children("ul").each(function(){content_buff=$(this).html(),ul_content+=content_buff}),ul_content='<ul class="nav navbar-nav">'+ul_content+"</ul>",$navbar.html(ul_content),$("body").append($navbar),background_image=$navbar.data("nav-image"),void 0!=background_image&&$navbar.css("background","url('"+background_image+"')").removeAttr("data-nav-image").css("background-size","cover").addClass("has-image"),$toggle=$(".navbar-toggle"),$navbar.find("a").removeClass("btn btn-round btn-default"),$navbar.find("button").removeClass("btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral"),$navbar.find("button").addClass("btn-simple btn-block"),$link=$navbar.find("a"),$link.click(function(t){var e=$(this).data("id"),n=$(this).data("scroll");1==n&&void 0!==e&&(t.preventDefault(),$("html, body").animate({scrollTop:$(e).offset().top-50},1e3))}),$toggle.click(function(){1==rubik.misc.navbar_menu_visible?($("html").removeClass("nav-open"),rubik.misc.navbar_menu_visible=0,$("#bodyClick").remove(),setTimeout(function(){$toggle.removeClass("toggled")},550)):(setTimeout(function(){$toggle.addClass("toggled")},580),div='<div id="bodyClick"></div>',$(div).appendTo("body").click(function(){$("html").removeClass("nav-open"),rubik.misc.navbar_menu_visible=0,$("#bodyClick").remove(),setTimeout(function(){$toggle.removeClass("toggled")},550)}),$("html").addClass("nav-open"),rubik.misc.navbar_menu_visible=1)}),navbar_initialized=!0)},checkResponsiveImage:function(){responsive_background=$(".section-header > div .responsive-background"),0==responsive_background.length&&$(".section-header > div > img, .section-header video").each(function(){var t=$(this),e=t.attr("src");t.attr("responsive-src")&&(e=t.attr("responsive-src")),div='<div class="responsive-background" style="background-image:url('+e+')"/>',t.after(div),t.addClass("hidden-xs hidden-sm")})},checkScrollForTransparentNavbar:debounce(function(){$(document).scrollTop()>560?transparent&&(transparent=!1,$('nav[role="navigation"]').removeClass("navbar-transparent")):transparent||(transparent=!0,$('nav[role="navigation"]').addClass("navbar-transparent"))},17),checkScrollForParallax:debounce(function(){no_of_elements=0,$(".parallax").each(function(){var t=$(this);if(isElementInViewport(t)){var e=t.offset().top,n=$(window).scrollTop(),i=t.children("img");oVal=(n-e)/3,i.css("transform","translate3d(0px, "+oVal+"px, 0px)")}})},6),checkScrollForContentTransitions:debounce(function(){$(".content-with-opacity").each(function(){var t=$(this);if(isElementInViewport(t)){var e=$(window).scrollTop();if(opacityVal=1-e/230,opacityVal<0)return void(opacityVal=0);t.css("opacity",opacityVal)}})},6),showModal:function(t){var e=$(t).data("target"),n=$(t).closest(".project"),i=$(window).scrollTop();if(n.length)var o=n.offset().top,r=n.offset().left;var a=o-i,s=n.innerHeight(),l=n.innerWidth();modal=$("#"+e),$(modal).css({top:a,left:r,width:l,height:s,"z-index":"1032"}),$(modal).addClass("has-background"),setTimeout(function(){$(modal).addClass("open")},300),setTimeout(function(){$("body").addClass("noscroll"),$(modal).addClass("scroll")},1e3),$(".icon-close").click(function(){$project_content=$(this).closest(".project-content"),$project_content.removeClass("open scroll"),$("body").removeClass("noscroll"),setTimeout(function(){$project_content.removeClass("has-background"),setTimeout(function(){$project_content.removeAttr("style")},450)},500)})}};var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"Other",this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"Unknown"},searchString:function(t){for(var e=0;e<t.length;e++){var n=t[e].string;if(this.versionSearchString=t[e].subString,-1!==n.indexOf(t[e].subString))return t[e].identity}},searchVersion:function(t){var e=t.indexOf(this.versionSearchString);if(-1!==e){var n=t.indexOf("rv:");return"Trident"===this.versionSearchString&&-1!==n?parseFloat(t.substring(n+3)):parseFloat(t.substring(e+this.versionSearchString.length+1))}},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer"},{string:navigator.userAgent,subString:"Trident",identity:"Explorer"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Safari",identity:"Safari"},{string:navigator.userAgent,subString:"Opera",identity:"Opera"}]},better_browser='<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>Im sorry but it looks like your Browser doesn\'t support my website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';
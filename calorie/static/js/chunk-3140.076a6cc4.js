(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3140"],{"3trC":function(t,e,n){},"5b90":function(t,e,n){"use strict";n.d(e,"c",function(){return r}),n.d(e,"b",function(){return a}),n.d(e,"a",function(){return o});var i=n("t3Un");function r(t){return Object(i.a)({url:"/record/getrecord",method:"get",params:t})}function a(t){return Object(i.a)({url:"/record/getmealrecord",method:"get",params:t})}function o(t){return Object(i.a)({url:"/record/getfavMeal",method:"get",params:t})}},"8chH":function(t,e){t.exports={config:[{title:"菜品名称",prop:"name"},{title:"数量",prop:"ordercount"}]}},Q4Eu:function(t,e,n){"use strict";var i=n("Q2AE"),r={inserted:function(t,e,n){var r=e.value,a=i.a.getters&&i.a.getters.roles;if(!(r&&r instanceof Array&&r.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=r;a.some(function(t){return o.includes(t)})||t.parentNode&&t.parentNode.removeChild(t)}},a=function(t){t.directive("permission",r)};window.Vue&&(window.permission=r,Vue.use(a)),r.install=a;e.a=r},Wgwc:function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",i="hour",r="day",a="week",o="month",s="quarter",u="year",c=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,l=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},f={s:d,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+d(i,2,"0")+":"+d(r,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),i=t.clone().add(n,o),r=e-i<0,a=t.clone().add(n+(r?-1:1),o);return Number(-(n+(e-i)/(r?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(c){return{M:o,y:u,w:a,d:r,D:"date",h:i,m:n,s:e,ms:t,Q:s}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m="en",p={};p[m]=h;var v=function(t){return t instanceof $},g=function(t,e,n){var i;if(!t)return m;if("string"==typeof t)p[t]&&(i=t),e&&(p[t]=e,i=t);else{var r=t.name;p[r]=t,i=r}return!n&&i&&(m=i),i||!n&&m},y=function(t,e,n){if(v(t))return t.clone();var i=e?"string"==typeof e?{format:e,pl:n}:e:{};return i.date=t,new $(i)},w=f;w.l=g,w.i=v,w.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var $=function(){function d(t){this.$L=this.$L||g(t.locale,null,!0),this.parse(t)}var f=d.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(c);if(i)return n?new Date(Date.UTC(i[1],i[2]-1,i[3]||1,i[4]||0,i[5]||0,i[6]||0,i[7]||0)):new Date(i[1],i[2]-1,i[3]||1,i[4]||0,i[5]||0,i[6]||0,i[7]||0)}return new Date(e)}(t),this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return w},f.isValid=function(){return!("Invalid Date"===this.$d.toString())},f.isSame=function(t,e){var n=y(t);return this.startOf(e)<=n&&n<=this.endOf(e)},f.isAfter=function(t,e){return y(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<y(t)},f.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},f.year=function(t){return this.$g(t,"$y",u)},f.month=function(t){return this.$g(t,"$M",o)},f.day=function(t){return this.$g(t,"$W",r)},f.date=function(t){return this.$g(t,"$D","date")},f.hour=function(t){return this.$g(t,"$H",i)},f.minute=function(t){return this.$g(t,"$m",n)},f.second=function(t){return this.$g(t,"$s",e)},f.millisecond=function(e){return this.$g(e,"$ms",t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,s){var c=this,l=!!w.u(s)||s,d=w.p(t),f=function(t,e){var n=w.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return l?n:n.endOf(r)},h=function(t,e){return w.w(c.toDate()[t].apply(c.toDate(),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},m=this.$W,p=this.$M,v=this.$D,g="set"+(this.$u?"UTC":"");switch(d){case u:return l?f(1,0):f(31,11);case o:return l?f(1,p):f(0,p+1);case a:var y=this.$locale().weekStart||0,$=(m<y?m+7:m)-y;return f(l?v-$:v+(6-$),p);case r:case"date":return h(g+"Hours",0);case i:return h(g+"Minutes",1);case n:return h(g+"Seconds",2);case e:return h(g+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(a,s){var c,l=w.p(a),d="set"+(this.$u?"UTC":""),f=(c={},c[r]=d+"Date",c.date=d+"Date",c[o]=d+"Month",c[u]=d+"FullYear",c[i]=d+"Hours",c[n]=d+"Minutes",c[e]=d+"Seconds",c[t]=d+"Milliseconds",c)[l],h=l===r?this.$D+(s-this.$W):s;if(l===o||l===u){var m=this.clone().set("date",1);m.$d[f](h),m.init(),this.$d=m.set("date",Math.min(this.$D,m.daysInMonth())).toDate()}else f&&this.$d[f](h);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[w.p(t)]()},f.add=function(t,s){var c,l=this;t=Number(t);var d=w.p(s),f=function(e){var n=y(l);return w.w(n.date(n.date()+Math.round(e*t)),l)};if(d===o)return this.set(o,this.$M+t);if(d===u)return this.set(u,this.$y+t);if(d===r)return f(1);if(d===a)return f(7);var h=(c={},c[n]=6e4,c[i]=36e5,c[e]=1e3,c)[d]||1,m=this.$d.getTime()+t*h;return w.w(m,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=w.z(this),r=this.$locale(),a=this.$H,o=this.$m,s=this.$M,u=r.weekdays,c=r.months,d=function(t,i,r,a){return t&&(t[i]||t(e,n))||r[i].substr(0,a)},f=function(t){return w.s(a%12||12,t,"0")},h=r.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:s+1,MM:w.s(s+1,2,"0"),MMM:d(r.monthsShort,s,c,3),MMMM:c[s]||c(this,n),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(r.weekdaysMin,this.$W,u,2),ddd:d(r.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:w.s(a,2,"0"),h:f(1),hh:f(2),a:h(a,o,!0),A:h(a,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:i};return n.replace(l,function(t,e){return e||m[t]||i.replace(":","")})},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(t,c,l){var d,f=w.p(c),h=y(t),m=6e4*(h.utcOffset()-this.utcOffset()),p=this-h,v=w.m(this,h);return v=(d={},d[u]=v/12,d[o]=v,d[s]=v/3,d[a]=(p-m)/6048e5,d[r]=(p-m)/864e5,d[i]=p/36e5,d[n]=p/6e4,d[e]=p/1e3,d)[f]||p,l?v:w.a(v)},f.daysInMonth=function(){return this.endOf(o).$D},f.$locale=function(){return p[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=g(t,e,!0);return i&&(n.$L=i),n},f.clone=function(){return w.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},d}();return y.prototype=$.prototype,y.extend=function(t,e){return t(e,$,y),y},y.locale=g,y.isDayjs=v,y.unix=function(t){return y(1e3*t)},y.en=p[m],y.Ls=p,y}()},Y5bG:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),Math.easeInOutQuad=function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function r(t,e,n){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=t-r,o=0;e=void 0===e?500:e;!function t(){o+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(o,r,a,e)),o<e?i(t):n&&"function"==typeof n&&n()}()}},ZySA:function(t,e,n){"use strict";var i=n("P2sY"),r=n.n(i),a=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var i=r()({},e.value),a=r()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var s=o.getBoundingClientRect(),u=o.querySelector(".waves-ripple");switch(u?u.className="waves-ripple":((u=document.createElement("span")).className="waves-ripple",u.style.height=u.style.width=Math.max(s.width,s.height)+"px",o.appendChild(u)),a.type){case"center":u.style.top=s.height/2-u.offsetHeight/2+"px",u.style.left=s.width/2-u.offsetWidth/2+"px";break;default:u.style.top=(n.pageY-s.top-u.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",u.style.left=(n.pageX-s.left-u.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return u.style.backgroundColor=a.color,u.className="waves-ripple z-active",!1}},!1)}}),o=function(t){t.directive("waves",a)};window.Vue&&(window.waves=a,Vue.use(o)),a.install=o;e.a=a},aAhk:function(t,e,n){"use strict";var i=n("3trC");n.n(i).a},aoZG:function(t,e,n){"use strict";n.r(e);var i=n("m1cH"),r=n.n(i),a=n("P2sY"),o=n.n(a),s=n("5b90"),u=n("ZySA"),c=n("Q4Eu"),l=(n("7Qib"),n("Mz3J")),d=n("Si9d"),f=n("F16w"),h=n("8chH"),m=n("Wgwc"),p=n.n(m),v={name:"favmeal",components:{Pagination:l.a,FilenameOption:d.a,BookTypeOption:f.a},directives:{waves:u.a,permission:c.a},data:function(){return{tableKey:0,u8list:[],u8listCopy:[],list:null,total:0,listLoading:!1,listQuery:{date:[p()().startOf("month").format("YYYY-MM-DD"),p()().endOf("month").format("YYYY-MM-DD")]},pickerOptionsForDate:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},btnIsLoading:!1,downloadLoading:!1,filename:"",autoWidth:!0,bookType:"xlsx",spanArr:[]}},computed:{maxheight:function(){return.6*window.innerHeight}},created:function(){this.getList()},methods:{getList:function(){var t=this;if(null==this.listQuery.date)return this.$notify({title:"提示",message:"请先指定要查询的日期!",type:"warning",duration:2e3});this.spanArr=[],this.listLoading=!0,Object(s.a)(o()({},{begindate:this.listQuery.date[0],enddate:this.listQuery.date[1]})).then(function(e){var n=e.data,i=n.data,r=n.state;n.message;"success"===r&&(t.list=i),setTimeout(function(){t.listLoading=!1},0)})},handleFilter:function(){this.getList()},handleExplore:function(){var t=this;if(!(this.list.length>0))return this.$notify({title:"错误",message:"没有数据可以导出",type:"error",duration:2e3});this.downloadLoading=!0,Promise.all([n.e("chunk-7a57"),n.e("chunk-3c5e"),n.e("chunk-6b3a")]).then(n.bind(null,"S/jZ")).then(function(e){var n=[].concat(r()(h.config)),i=[].concat(r()(h.config)).map(function(t){return t.prop}),a=t.list,o=t.formatJson(i,a);e.export_json_to_excel({header:n.map(function(t){return t.title}),data:o,filename:t.filename,autoWidth:!0,bookType:t.bookType}),t.downloadLoading=!1})},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})}}},g=(n("aAhk"),n("KHd+")),y=Object(g.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-row",{attrs:{span:24}},[n("el-col",[n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd","picker-options":t.pickerOptionsForDate},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),n("FilenameOption",{staticClass:"filter-item",model:{value:t.filename,callback:function(e){t.filename=e},expression:"filename"}}),t._v(" "),n("BookTypeOption",{staticClass:"filter-item",model:{value:t.bookType,callback:function(e){t.bookType=e},expression:"bookType"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-download",loading:t.downloadLoading},on:{click:t.handleExplore}},[t._v("导出")])],1)],1)],1),t._v(" "),n("div",{staticClass:"claim_company"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"","highlight-current-row":"",height:t.maxheight}},[n("el-table-column",{attrs:{label:"序号",width:"50px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"菜品名称",width:"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"数量",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.ordercount))])]}}])})],1)],1)])},[],!1,null,null,null);y.options.__file="favmeal.vue";e.default=y.exports},jUE0:function(t,e,n){}}]);
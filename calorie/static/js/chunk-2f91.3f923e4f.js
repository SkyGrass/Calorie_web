(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2f91"],{"5b90":function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"b",function(){return o}),n.d(t,"a",function(){return r});var a=n("t3Un");function i(e){return Object(a.a)({url:"/record/getrecord",method:"get",params:e})}function o(e){return Object(a.a)({url:"/record/getmealrecord",method:"get",params:e})}function r(e){return Object(a.a)({url:"/record/getfavMeal",method:"get",params:e})}},C0EQ:function(e,t,n){},PRiS:function(e,t){e.exports={config:[{title:"日期",prop:"createdate"},{title:"早餐",prop:"breakfast"},{title:"中餐",prop:"lunch"},{title:"晚餐",prop:"dinner"}]}},Q4Eu:function(e,t,n){"use strict";var a=n("Q2AE"),i={inserted:function(e,t,n){var i=t.value,o=a.a.getters&&a.a.getters.roles;if(!(i&&i instanceof Array&&i.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var r=i;o.some(function(e){return r.includes(e)})||e.parentNode&&e.parentNode.removeChild(e)}},o=function(e){e.directive("permission",i)};window.Vue&&(window.permission=i,Vue.use(o)),i.install=o;t.a=i},Y5bG:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),Math.easeInOutQuad=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-i,r=0;t=void 0===t?500:t;!function e(){r+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(r,i,o,t)),r<t?a(e):n&&"function"==typeof n&&n()}()}},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),i=n.n(a),o=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=o.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var l=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(l.width,l.height)+"px",r.appendChild(s)),o.type){case"center":s.style.top=l.height/2-s.offsetHeight/2+"px",s.style.left=l.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-l.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-l.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=o.color,s.className="waves-ripple z-active",!1}},!1)}}),r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t.a=o},jUE0:function(e,t,n){},"mCz/":function(e,t,n){"use strict";n.r(t);var a=n("jWXv"),i=n.n(a),o=n("rfXi"),r=n.n(o),l=n("P2sY"),s=n.n(l),c=n("gDS+"),u=n.n(c),d=n("m1cH"),p=n.n(d),f=n("FyfS"),m=n.n(f),h=n("5b90"),v=n("ZySA"),y=n("Q4Eu"),g=(n("7Qib"),n("Mz3J")),w=n("Si9d"),b=n("F16w"),k=n("PRiS"),x=n("Wgwc"),_=n.n(x),E=n("PbVA"),C=n("MT78"),T=n.n(C),D={name:"calorie",components:{Pagination:g.a,FilenameOption:w.a,BookTypeOption:b.a},directives:{waves:v.a,permission:y.a},data:function(){var e=this;return{tableKey:0,u8list:[],u8listCopy:[],list:null,total:0,listLoading:!1,index:0,listQuery:{keyword:"",date:[_()().startOf("month").format("YYYY-MM-DD"),_()().endOf("month").format("YYYY-MM-DD")]},pickerOptionsForDate:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},btnIsLoading:!1,downloadLoading:!1,filename:"",autoWidth:!0,bookType:"xlsx",spanArr:[],meals:[{label:"早餐",value:"1"},{label:"中餐",value:"2"},{label:"晚餐",value:"3"}],option:{title:{text:"卡路里曲线表",left:"center",align:"right"},color:["#5CACEE","#EE9A00","#BDBDBD"],legend:{left:"center",top:"bottom",data:["早餐","中餐","晚餐"]},tooltip:{trigger:"axis",axisPointer:{},formatter:function(t){var n=t[0].name,a="",i="",o="";return e.tipsData.filter(function(e){return e.label==n})[0].value.forEach(function(e){var t="",n="",r="";"早餐"==e.meal?(e.list.forEach(function(e){t+="菜名:"+e.name+",卡路里:"+e.calorie+"<br/>"}),a=e.meal+":<br/>"+(t.length>0?t:"无")):"中餐"==e.meal?(e.list.forEach(function(e){n+="菜名:"+e.name+",卡路里:"+e.calorie+"<br/>"}),i=e.meal+":<br/>"+(n.length>0?n:"无")):"晚餐"==e.meal&&(e.list.forEach(function(e){r+="菜名:"+e.name+",卡路里:"+e.calorie+"<br/>"}),o=e.meal+":<br/>"+(r.length>0?r:"无"))}),a+"<br/>"+i+"<br/>"+o}},xAxis:[{type:"category",data:[],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[]},tipsData:[]}},computed:{maxheight:function(){return.6*window.innerHeight}},watch:{list:{handler:function(e,t){var n=this.list,a={},i=!0,o=!1,r=void 0;try{for(var l,s=m()(n);!(i=(l=s.next()).done);i=!0){var c=l.value.createdate;void 0===a[c]?a[c]=1:a[c]++}}catch(e){o=!0,r=e}finally{try{!i&&s.return&&s.return()}finally{if(o)throw r}}this.index=a},deep:!0}},methods:{judgeRole:function(){return"user"==[].concat(p()(this.$store.getters.roles)).shift()},getList:function(){var e=this;this.spanArr=[];var t=JSON.parse(u()(this.listQuery));if(delete t.date,null==this.listQuery.date)return this.$notify({title:"提示",message:"请先指定要查询的日期!",type:"warning",duration:2e3});this.listLoading=!0,Object(h.c)(s()({},t,{begindate:this.listQuery.date[0],enddate:this.listQuery.date[1]})).then(function(t){var n=t.data,a=n.data,i=n.state;n.message;"success"===i?(console.log(a),e.buildShowData(a),a.length<=0&&e.$notify({title:"提示",message:"没有查询到数据!",type:"warning",duration:2e3})):e.$notify({title:"提示",message:"没有查询到数据!",type:"warning",duration:2e3}),setTimeout(function(){e.listLoading=!1},0)})},buildShowData:function(e){var t=this,n=e.map(function(e){return e.createdate}),a=[],o=[];(n=r()(new i.a(n))).forEach(function(n){var i={createdate:n},r={label:n,value:[]},l=e.filter(function(e){return e.createdate==n});t.meals.forEach(function(e){var t=0,n=l.filter(function(t){return t.meal==e.value});n.forEach(function(e){t=E.a(t,e.calorie)}),r.value.push({meal:e.label,list:n.map(function(e){return{name:e.name,calorie:e.calorie}})}),1==e.value?i.breakfast=t:2==e.value?i.lunch=t:3==e.value&&(i.dinner=t)}),o.push(i),a.push(r)}),this.list=o,this.tipsData=a,this.buildChart(n,[{name:"早餐",type:"line",data:o.map(function(e){return e.breakfast})},{name:"中餐",type:"line",data:o.map(function(e){return e.lunch})},{name:"晚餐",type:"line",data:o.map(function(e){return e.dinner})}])},buildChart:function(e,t){this.option.xAxis[0].data=e,this.option.series=t,T.a.init(document.getElementById("calore_chart")).setOption(this.option),window.addEventListener("resize",function(){this.myChart.resize()})},handleFilter:function(){this.getList()},handleExplore:function(){var e=this;if(!(this.list.length>0))return this.$notify({title:"错误",message:"没有数据可以导出",type:"error",duration:2e3});this.downloadLoading=!0,Promise.all([n.e("chunk-7a57"),n.e("chunk-3c5e"),n.e("chunk-6b3a")]).then(n.bind(null,"S/jZ")).then(function(t){var n=[].concat(p()(k.config)),a=[].concat(p()(k.config)).map(function(e){return e.prop}),i=e.list,o=e.formatJson(a,i);t.export_json_to_excel({header:n.map(function(e){return e.title}),data:o,filename:e.filename,autoWidth:!0,bookType:e.bookType}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})}},mounted:function(){"user"==[].concat(p()(this.$store.getters.roles)).shift()&&(this.listQuery.keyword=this.$store.getters.username)}},Q=(n("ph5c"),n("KHd+")),L=Object(Q.a)(D,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-row",{attrs:{span:24}},[n("el-col",[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"卡号或者姓名",disabled:e.judgeRole()},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.keyword,callback:function(t){e.$set(e.listQuery,"keyword",t)},expression:"listQuery.keyword"}}),e._v(" "),n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd","picker-options":e.pickerOptionsForDate},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),n("FilenameOption",{staticClass:"filter-item",model:{value:e.filename,callback:function(t){e.filename=t},expression:"filename"}}),e._v(" "),n("BookTypeOption",{staticClass:"filter-item",model:{value:e.bookType,callback:function(t){e.bookType=t},expression:"bookType"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-download",loading:e.downloadLoading},on:{click:e.handleExplore}},[e._v("导出")])],1)],1)],1),e._v(" "),n("el-row",{attrs:{span:24}},[n("el-col",{attrs:{span:5}},[n("div",{staticClass:"claim_company"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"","highlight-current-row":"",clearable:"",height:e.maxheight}},[n("el-table-column",{attrs:{label:"日期",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.createdate))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"早餐",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.breakfast))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"中餐",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.lunch))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"晚餐",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.dinner))])]}}])})],1)],1)]),e._v(" "),n("el-col",{style:{height:e.maxheight+"px"},attrs:{span:19}},[n("div",{style:{height:e.maxheight+"px"},attrs:{id:"calore_chart"}})])],1)],1)},[],!1,null,null,null);L.options.__file="calorie.vue";t.default=L.exports},ph5c:function(e,t,n){"use strict";var a=n("C0EQ");n.n(a).a}}]);
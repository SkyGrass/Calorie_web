(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-bff0"],{HyMM:function(t,e){t.exports={config:[{title:"预订单号",prop:"name"},{title:"日期",prop:"ordercount"}]}},Megi:function(t,e,n){"use strict";var a={props:{value:{type:String,default:""}},computed:{filename:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},i=n("KHd+"),s=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"inline-block"}},[n("el-input",{staticStyle:{width:"340px"},attrs:{placeholder:t.$t("excel.placeholder"),"prefix-icon":"el-icon-document"},model:{value:t.filename,callback:function(e){t.filename=e},expression:"filename"}})],1)},[],!1,null,null,null);s.options.__file="FilenameOption.vue";e.a=s.exports},Q4Eu:function(t,e,n){"use strict";var a=n("Q2AE"),i={inserted:function(t,e,n){var i=e.value,s=a.a.getters&&a.a.getters.roles;if(!(i&&i instanceof Array&&i.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var l=i;s.some(function(t){return l.includes(t)})||t.parentNode&&t.parentNode.removeChild(t)}},s=function(t){t.directive("permission",i)};window.Vue&&(window.permission=i,Vue.use(s)),i.install=s;e.a=i},"QhA+":function(t,e,n){"use strict";n.r(e);var a=n("P2sY"),i=n.n(a),s=n("m1cH"),l=n.n(s),o=n("hE4x"),r=n("mYkC"),u=n("ZySA"),c=n("Q4Eu"),d=(n("7Qib"),n("Mz3J")),p=n("Megi"),f=n("t6WO"),m=n("HyMM"),h={name:"preselllist",components:{Pagination:d.a,FilenameOption:p.a,BookTypeOption:f.a},directives:{waves:u.a,permission:c.a},filters:{statusFilter:function(t){return["info","success","warning","danger"][t]}},data:function(){return{tableKey:0,u8list:[],u8listCopy:[],list:null,total:0,listLoading:!1,statusOptions:[{key:"0",display_name:"未审批"},{key:"1",display_name:"已审批"},{key:"2",display_name:"生单"},{key:"3",display_name:"关闭"}],listQuery:{page:1,limit:20,status:"",searchword:"",ccuscode:"",date:[],requestdate:[]},pickerOptionsForDate:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},pickerOptionsForRequestDate:{shortcuts:[{text:"下一周",onClick:function(t){var e=new Date,n=new Date;e.setTime(n.getTime()+6048e5),t.$emit("pick",[n,e])}},{text:"下一个月",onClick:function(t){var e=new Date,n=new Date;e.setTime(n.getTime()+2592e6),t.$emit("pick",[n,e])}},{text:"下三个月",onClick:function(t){var e=new Date,n=new Date;e.setTime(n.getTime()+7776e6),t.$emit("pick",[n,e])}}]},btnIsLoading:!1,downloadLoading:!1,filename:"",autoWidth:!0,bookType:"xlsx",spanArr:[]}},computed:{specialWidth:function(){var t=[].concat(l()(this.$store.getters.roles)).shift();return["seller","admin","sa"].findIndex(function(e){return e===t})>-1?"300px":"200px"},maxheight:function(){return.6*window.innerHeight}},created:function(){this.getList(),this.getU8CusList()},methods:{judgeRole:function(){return"seller"!=[].concat(l()(this.$store.getters.roles)).shift()&&"admin"!=[].concat(l()(this.$store.getters.roles)).shift()},getList:function(){var t=this;this.spanArr=[],this.listLoading=!0,Object(r.g)(i()({},this.listQuery,{role:[].concat(l()(this.$store.getters.roles)).shift(),biller:this.$store.getters.username})).then(function(e){var n=e.data,a=n.data,i=n.state;n.message;"success"===i&&(t.list=a.items,t.total=a.total);var s=0;t.list.forEach(function(e,n){e.index=n,0===n?t.spanArr.push(1):e.FID===t.list[n-1].FID?(t.spanArr[s]+=1,t.spanArr.push(0)):(t.spanArr.push(1),s=n)}),setTimeout(function(){t.listLoading=!1},1500)})},getU8CusList:function(){var t=this;switch([].concat(l()(this.$store.getters.roles)).shift()){case"customer":Object(o.d)({cuscode:this.$store.getters.username}).then(function(e){var n=e.data,a=n.data,i=n.state;n.message;"success"===i&&(t.u8list=a.items,t.u8listCopy=a.items)}).catch(function(){});break;case"seller":case"admin":case"sa":Object(o.a)().then(function(e){var n=e.data,a=n.data,i=n.state;n.message;"success"===i&&(t.u8list=a.items,t.u8listCopy=a.items)}).catch(function(){});break;case"trader":Object(o.c)({trader:this.$store.getters.username}).then(function(e){var n=e.data,a=n.data,i=n.state;n.message;"success"===i&&(t.u8list=a.items,t.u8listCopy=a.items)}).catch(function(){})}},handleFilter:function(){this.listQuery.page=1,this.getList()},handleExplore:function(){var t=this;if(!(this.list.length>0))return this.$notify({title:"错误",message:"没有数据可以导出",type:"error",duration:2e3});this.downloadLoading=!0,Promise.all([n.e("chunk-7a57"),n.e("chunk-3c5e"),n.e("chunk-6b3a")]).then(n.bind(null,"S/jZ")).then(function(e){var n=[].concat(l()(m.config)),a=[].concat(l()(m.config)).map(function(t){return t.prop}),i=t.list,s=t.formatJson(a,i);e.export_json_to_excel({header:n.map(function(t){return t.title}),data:s,filename:t.filename,autoWidth:!0,bookType:t.bookType}),t.downloadLoading=!1})},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})},filterCus:function(t){this.u8list=t?[].concat(l()(this.u8listCopy)).filter(function(e){return e.ccuscode.indexOf(t)>-1||e.ccusname.indexOf(t)>-1}):[].concat(l()(this.u8listCopy))},handleShow:function(t){this.$router.push({path:"/presellformonth",query:{id:t.FID}})},handleUnAudit:function(t){var e=this,n=t.row,a=t.$index;this.$confirm("您的操作将改变此预订单的审批状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.btnIsLoading=!0,Object(r.k)({verifier:e.$store.getters.username,id:n.FID}).then(function(t){var n=t.data,i=n.data,s=n.state,l=n.message;return"success"===s&&(e.list[a].FVerifierDate=i.date,e.list[a].FVerifierName=i.verifier,e.list[a].FStatusName=i.statusname,e.list[a].FStatus=i.status),e.btnIsLoading=!1,e.$notify({title:"success"==s?"成功":"错误",message:l,type:s,duration:2e3})}).catch(function(){})}).catch(function(){})},handleAudit:function(t){var e=this,n=t.row,a=t.$index;this.$confirm("您的操作将改变此预订单的审批状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.btnIsLoading=!0,Object(r.b)({verifier:e.$store.getters.username,id:n.FID}).then(function(t){var n=t.data,i=n.data,s=n.state,l=n.message;return"success"===s&&(e.list[a].FVerifierDate=i.date,e.list[a].FVerifierName=i.verifier,e.list[a].FStatusName=i.statusname,e.list[a].FStatus=i.status),e.btnIsLoading=!1,e.$notify({title:"success"==s?"成功":"错误",message:l,type:s,duration:2e3})}).catch(function(){})}).catch(function(){})},handleDel:function(t){var e=this,n=t.row;t.$index;this.$confirm("您的操作将删除此销售单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.btnIsLoading=!0,Object(r.d)({id:n.FID}).then(function(t){var n=t.data,a=(n.data,n.state),i=n.message;return"success"===a&&e.getList(),e.btnIsLoading=!1,e.$notify({title:"success"==a?"成功":"错误",message:i,type:a,duration:2e3})}).catch(function(){})}).catch(function(){})},handleBuild:function(t){var e=this,n=t.row;t.$index;this.$confirm("您的操作将生成U8销售单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.btnIsLoading=!0,Object(r.c)({id:n.FID}).then(function(t){var n=t.data,a=(n.data,n.state),i=n.message;return"success"===a&&e.getList(),e.btnIsLoading=!1,e.$notify({title:"success"==a?"成功":"错误",message:i,type:a,duration:2e3})}).catch(function(){})}).catch(function(){})},objectSpanMethod:function(t){t.row,t.column;var e=t.rowIndex;if(t.columnIndex<13){var n=this.spanArr[e];return{rowspan:n,colspan:n>0?1:0}}}}},v=(n("VSD/"),n("KHd+")),_=Object(v.a)(h,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-row",[n("el-col",[n("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"预订单号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.searchword,callback:function(e){t.$set(t.listQuery,"searchword",e)},expression:"listQuery.searchword"}}),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"90px"},attrs:{clearable:"",placeholder:"状态"},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},t._l(t.statusOptions,function(t){return n("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"开单客户",filterable:"","filter-method":t.filterCus,clearable:""},model:{value:t.listQuery.ccuscode,callback:function(e){t.$set(t.listQuery,"ccuscode",e)},expression:"listQuery.ccuscode"}},t._l(t.u8list,function(t){return n("el-option",{key:t.ccuscode,attrs:{label:t.ccusname,value:t.ccuscode}})})),t._v(" "),n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd","picker-options":t.pickerOptionsForDate},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"到货开始日期","end-placeholder":"到货结束日期","value-format":"yyyy-MM-dd","picker-options":t.pickerOptionsForRequestDate},model:{value:t.listQuery.requestdate,callback:function(e){t.$set(t.listQuery,"requestdate",e)},expression:"listQuery.requestdate"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")])],1)],1),t._v(" "),n("el-row",[n("el-col",[n("FilenameOption",{staticClass:"filter-item",model:{value:t.filename,callback:function(e){t.filename=e},expression:"filename"}}),t._v(" "),n("BookTypeOption",{staticClass:"filter-item",model:{value:t.bookType,callback:function(e){t.bookType=e},expression:"bookType"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-download",loading:t.downloadLoading},on:{click:t.handleExplore}},[t._v("导出")])],1)],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"","highlight-current-row":"",height:t.maxheight,"span-method":t.objectSpanMethod}},[n("el-table-column",{attrs:{label:"操作",align:"center",width:t.specialWidth,"class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.FStatus?n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["seller","admin"],expression:"['seller','admin']"}],attrs:{type:"danger",size:"mini",loading:t.btnIsLoading},on:{click:function(n){t.handleAudit(e)}}},[t._v("审批")]):t._e(),t._v(" "),1===e.row.FStatus?n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["seller","admin"],expression:"['seller','admin']"}],attrs:{type:"info",size:"mini",loading:t.btnIsLoading},on:{click:function(n){t.handleUnAudit(e)}}},[t._v("弃审")]):t._e(),t._v(" "),1===e.row.FStatus?n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["seller","admin"],expression:"['seller','admin']"}],attrs:{type:"danger",size:"mini",loading:t.btnIsLoading},on:{click:function(n){t.handleBuild(e)}}},[t._v("生单")]):t._e(),t._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){t.handleShow(e.row)}}},[t._v("查看")]),t._v(" "),0===e.row.FStatus&&t.judgeRole()?n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){t.handleDel(e.row)}}},[t._v("删除")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"销售类型",width:"120px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FSTName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"预订单号",width:"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FBillNo))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"日期",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FDate))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"经销商",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTraderName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"开单客户",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FCusName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"税率",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTaxRate))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"制单人",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FBillerName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tag",{attrs:{type:t._f("statusFilter")(e.row.FStatus)}},[t._v(t._s(e.row.FStatusName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"审核人",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FVerifierName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"审核日期",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FVerifierDate))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"备注",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FRemark))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"U8单号",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FU8BillNo))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"行号",width:"50px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FNo))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"存货编码",width:"140px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FInvCode))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"存货名称",width:"240px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FInvName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"存货规格",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FInvStd))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"单位",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FComUnitName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"数量",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FQty))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"体积",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FVolume))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"总体积",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTotalVolume))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"面价",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FPlanPrice))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"含税单价",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTaxPrice))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"税额",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTaxAmount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"折扣额",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FDisAmount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"价税合计",width:"60px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FSum))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"到货日期",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FRequestDate))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"特价项目",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FProject))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"分录备注",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FEntryRemark))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"最终无税单价",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FPrice2))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"最终无税金额",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FAmount2))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"最终含税单价",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FTaxPrice2))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"最终价税合计",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.FSum2))])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},[],!1,null,null,null);_.options.__file="presellformonthlist.vue";e.default=_.exports},TqAU:function(t,e,n){},"VSD/":function(t,e,n){"use strict";var a=n("TqAU");n.n(a).a},Y5bG:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),Math.easeInOutQuad=function(t,e,n,a){return(t/=a/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=t-i,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,i,s,e)),l<e?a(t):n&&"function"==typeof n&&n()}()}},ZySA:function(t,e,n){"use strict";var a=n("P2sY"),i=n.n(a),s=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var a=i()({},e.value),s=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),l=s.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var o=l.getBoundingClientRect(),r=l.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(o.width,o.height)+"px",l.appendChild(r)),s.type){case"center":r.style.top=o.height/2-r.offsetHeight/2+"px",r.style.left=o.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-o.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-o.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=s.color,r.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(l)),s.install=l;e.a=s},hE4x:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"d",function(){return l}),n.d(e,"c",function(){return o});var a=n("t3Un");function i(t){return Object(a.a)({url:"/u8cus/getallu8cuslist",method:"post",data:t})}function s(t){return Object(a.a)({url:"/u8cus/getallu8cuslistforcanbind",method:"post",data:t})}function l(t){return Object(a.a)({url:"/u8cus/getallu8cuslistwithcode",method:"post",data:t})}function o(t){return Object(a.a)({url:"/u8cus/getallu8cuslisthavebind",method:"post",data:t})}},jUE0:function(t,e,n){},mYkC:function(t,e,n){"use strict";n.d(e,"e",function(){return i}),n.d(e,"j",function(){return s}),n.d(e,"i",function(){return l}),n.d(e,"g",function(){return o}),n.d(e,"h",function(){return r}),n.d(e,"f",function(){return u}),n.d(e,"b",function(){return c}),n.d(e,"k",function(){return d}),n.d(e,"c",function(){return p}),n.d(e,"d",function(){return f}),n.d(e,"a",function(){return m});var a=n("t3Un");function i(t){return Object(a.a)({url:"/presell/getpresellbillno",method:"post",data:t})}function s(t){return Object(a.a)({url:"/presell/savePreSell",method:"post",data:t})}function l(t){return Object(a.a)({url:"/presell/getpreselllist",method:"post",data:t})}function o(t){return Object(a.a)({url:"/presell/getpresellformonthlist",method:"post",data:t})}function r(t){return Object(a.a)({url:"/presell/getpresellinfo",method:"post",data:t})}function u(t){return Object(a.a)({url:"/presell/getpresellformonthinfo",method:"post",data:t})}function c(t){return Object(a.a)({url:"/presell/auditpresell",method:"post",data:t})}function d(t){return Object(a.a)({url:"/presell/unauditpresell",method:"post",data:t})}function p(t){return Object(a.a)({url:"/presell/buildu8so",method:"post",data:t})}function f(t){return Object(a.a)({url:"/presell/delPreSell",method:"post",data:t})}function m(t){return Object(a.a)({url:"/presell/GetPreviewData",method:"post",data:t})}},t6WO:function(t,e,n){"use strict";var a={props:{value:{type:String,default:"xlsx"}},data:function(){return{options:["xlsx","csv","txt"]}},computed:{bookType:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},i=n("KHd+"),s=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"inline-block"}},[n("el-select",{staticStyle:{width:"120px"},model:{value:t.bookType,callback:function(e){t.bookType=e},expression:"bookType"}},t._l(t.options,function(t){return n("el-option",{key:t,attrs:{label:t,value:t}})}))],1)},[],!1,null,null,null);s.options.__file="BookTypeOption.vue";e.a=s.exports}}]);
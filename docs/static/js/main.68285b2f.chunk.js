(this["webpackJsonpdata-visualization"]=this["webpackJsonpdata-visualization"]||[]).push([[0],{101:function(t,e,a){"use strict";a.r(e);var n=a(6),c=a(0),i=a(9),s=a.n(i),o=(a(88),a(23)),r=a(43),l=a(73),u=a(142),h=a(150),b=a(153),d=a(151),j=a(156),m=a(102),x=a(149),g=a(69),p=a(70),v=a(50),O=a(74),f=a(72),S=a(21),k=(a(99),a(16)),C=function(t){Object(O.a)(a,t);var e=Object(f.a)(a);function a(t){var n;return Object(g.a)(this,a),(n=e.call(this,t)).state=n.getStateFromProps(t),n._tooltipHtml=n._tooltipHtml.bind(Object(v.a)(n)),n._onChange=n._onChange.bind(Object(v.a)(n)),n}return Object(p.a)(a,[{key:"getStateFromProps",value:function(t){var e=k.chartWidth,a=k.chartMargin,n=k.brushMargin,c=this._getRange(t.data),i=c.minX,s=c.maxX;return{data:t.data,xScale:S.d3.time.scale().domain([i,s]).range([0,e-(null===a||void 0===a?void 0:a.left)-(null===a||void 0===a?void 0:a.right)]),xScaleBrush:S.d3.time.scale().domain([i,s]).range([0,e-(null===n||void 0===n?void 0:n.left)-(null===n||void 0===n?void 0:n.right)])}}},{key:"componentDidUpdate",value:function(t){if(this.props.data!==t.data){var e=this.getStateFromProps(this.props);this.setState(this.getStateFromProps(e))}}},{key:"_getRange",value:function(t){var e,a,n,c;t.length>0&&(e=(null===(n=t[0].values)||void 0===n?void 0:n.length)>0?t[0].values[0].x:0,a=(null===(c=t[0].values)||void 0===c?void 0:c.length)>0?t[0].values[t[0].values.length-1].x:0);return{minX:e,maxX:a}}},{key:"_tooltipHtml",value:function(t,e){return"stock"===t?Object(n.jsxs)("div",{children:["price: $",e.price]}):Object(n.jsxs)("div",{children:["positives: ",e.positives,Object(n.jsx)("br",{}),"negatives: ",e.negatives]})}},{key:"_onChange",value:function(t){var e=k.chartWidth,a=k.chartMargin;this.setState({xScale:S.d3.time.scale().domain([t[0],t[1]]).range([0,e-(null===a||void 0===a?void 0:a.left)-(null===a||void 0===a?void 0:a.right)])})}},{key:"render",value:function(){var t=k.chartWidth,e=k.chartHeight,a=k.chartMargin,c=k.brushHeight,i=k.brushMargin,s=this._getRange(this.state.data),o=s.minX,r=s.maxX;return Object(n.jsxs)("div",{children:[Object(n.jsx)(S.LineChart,{data:this.state.data,width:t,height:e,margin:a,xScale:this.state.xScale,xAxis:{tickValues:this.state.xScale.ticks(S.d3.time.day,2),tickFormat:S.d3.time.format("%m/%d")},tooltipHtml:this._tooltipHtml}),Object(n.jsx)("div",{className:"brush",style:{float:"none"},children:Object(n.jsx)(S.Brush,{width:t,height:c,margin:i,xScale:this.state.xScaleBrush,extent:[o,r],onChange:this._onChange,xAxis:{tickValues:this.state.xScaleBrush.ticks(S.d3.time.day,2),tickFormat:S.d3.time.format("%m/%d")}})})]})}}]),a}(c.Component),y=a(152),_=a(148),F=a(154),w=a(158),D=a(159),T=a(157),N=a(146),P=a(147),H=a(155),L=Object(u.a)((function(t){return Object(j.a)({paper:{padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary}})})),A=function(t){var e=L(),a=Object(c.useState)(1),i=Object(o.a)(a,2),s=i[0],r=i[1],l=Object(c.useState)(!0),u=Object(o.a)(l,2),h=u[0],b=u[1],d=Object(c.useState)(!0),j=Object(o.a)(d,2),x=j[0],g=j[1],p=Object(c.useState)("twitter"),v=Object(o.a)(p,2),O=v[0],f=v[1],S={textblob:h,custom:x},k=function(e){S[e.target.name]=e.target.checked,"textblob"===e.target.name?b(e.target.checked):g(e.target.checked),t.onChange({normFactor:s,source:O,modelSelected:S})};return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(m.a,{className:e.paper,children:[Object(n.jsx)("h3",{children:"Stock Movement"}),Object(n.jsx)("div",{children:Object(n.jsx)(y.a,{label:"normalization factor",type:"number",fullWidth:!0,inputProps:{min:"0",max:"2",step:"0.1"},InputLabelProps:{shrink:!0},variant:"outlined",value:s,onChange:function(t){r(+t.target.value)}})})]}),Object(n.jsxs)(m.a,{className:e.paper,children:[Object(n.jsx)("h3",{children:"Sentiment Analysis"}),Object(n.jsxs)(T.a,{component:"fieldset",children:[Object(n.jsx)(N.a,{component:"legend",children:"Source"}),Object(n.jsxs)(w.a,{defaultValue:"twitter",name:"sentiment-model",onChange:function(e){f(e.target.defaultValue),t.onChange({normFactor:s,source:e.target.defaultValue,modelSelected:S})},children:[Object(n.jsx)(D.a,{value:"twitter",control:Object(n.jsx)(F.a,{}),label:"Twitter"}),Object(n.jsx)(D.a,{value:"nytimes",control:Object(n.jsx)(F.a,{}),label:"NYTimes"})]})]}),Object(n.jsxs)(T.a,{component:"fieldset",children:[Object(n.jsx)(N.a,{component:"legend",children:"Source"}),Object(n.jsxs)(P.a,{children:[Object(n.jsx)(D.a,{control:Object(n.jsx)(H.a,{onChange:k,checked:h,name:"textblob"}),label:"TextBlob"}),Object(n.jsx)(D.a,{control:Object(n.jsx)(H.a,{onChange:k,checked:x,name:"custom"}),label:"Custom"})]})]})]}),Object(n.jsx)(_.a,{size:"small",onClick:function(e){t.onChange({normFactor:s,source:O,modelSelected:S})},children:"Update Chart"})]})},M=Object(u.a)((function(t){return Object(j.a)({container:{flexGrow:1},paper:{padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary}})})),B=function(t){var e=M(),a=[{label:"stock",values:t.chartData.stock},{label:"textblob",values:t.chartData.sentiment.twitter.textblob},{label:"custom",values:t.chartData.sentiment.twitter.custom}],i=Object(c.useState)(a),s=Object(o.a)(i,2),l=s[0],u=s[1];return Object(n.jsx)("div",{className:e.container,children:Object(n.jsxs)(x.a,{container:!0,spacing:3,children:[Object(n.jsx)(x.a,{item:!0,xs:2,children:Object(n.jsx)(A,{onChange:function(e){var a=e.normFactor,n=e.source,c=e.modelSelected,i=[{label:"stock",values:t.chartData.stock.map((function(t){return Object(r.a)(Object(r.a)({},t),{},{y:t.y*a})}))}];c.textblob&&i.push({label:"textblob",values:t.chartData.sentiment[n].textblob}),c.custom&&i.push({label:"custom",values:t.chartData.sentiment[n].custom}),u(i)}})}),Object(n.jsx)(x.a,{item:!0,xs:10,children:Object(n.jsx)(m.a,{className:e.paper,children:Object(n.jsx)(C,{data:l})})})]})})};function X(t){var e=t.value,a=t.index,c=t.chartData,i=Object(l.a)(t,["value","index","chartData"]);return Object(n.jsx)("div",Object(r.a)(Object(r.a)({role:"tabpanel",hidden:e!==a,id:"tabpanel-".concat(a)},i),{},{children:e===a&&Object(n.jsx)(B,{chartData:c})}))}var E=Object(u.a)((function(t){return{root:{flexGrow:1,backgroundColor:t.palette.background.paper}}}));function I(t){var e=E(),a=Object(c.useState)(0),i=Object(o.a)(a,2),s=i[0],r=i[1],l=k.companies;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{children:"Sentiment Analysis for Stockmarket"}),Object(n.jsxs)("div",{className:e.root,children:[Object(n.jsx)(h.a,{position:"static",children:Object(n.jsx)(b.a,{value:s,onChange:function(t,e){r(e)},children:l.map((function(t,e){return Object(n.jsx)(d.a,{label:t},"tab-".concat(e))}))})}),l.map((function(e,a){return Object(n.jsx)(X,{value:s,index:a,chartData:t.appData[e]},"panel-".concat(a))}))]})]})}var W=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,160)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,i=e.getLCP,s=e.getTTFB;a(t),n(t),c(t),i(t),s(t)}))};fetch("data/aggregated.json").then((function(t){return t.json()})).then((function(t){var e=function(t){var e={};return t.map((function(t){var a=t.date,n=t.company,c=t.source,i=t.sent_score_textblob,s=t.sent_score_custom,o=t.positives_textblob,r=t.negatives_textblob,l=t.positives_custom,u=t.negatives_custom,h=t.price,b=t.price_change,d=a.split("-"),j=new Date("".concat(d[2],"-").concat(d[0],"-").concat(d[1],"T20:00:00.000Z"));e[n]=e[n]||{stock:[],sentiment:{twitter:{textblob:[],custom:[]},nytimes:{textblob:[],custom:[]}}},"TWITTER"===c&&e[n].stock.push({x:j,price:h,y:h&&b?b/h:0}),e[n].sentiment[c.toLowerCase()].textblob.push({x:j,y:i,source:c,positives:o,negatives:r}),e[n].sentiment[c.toLowerCase()].custom.push({x:j,y:s,source:c,positives:l,negatives:u})})),e}(t);s.a.render(Object(n.jsx)(I,{appData:e}),document.getElementById("root"))})),W()},16:function(t){t.exports=JSON.parse('{"companies":["APPLE","DISNEY","NETFLIX","TESLA"],"chartMargin":{"top":10,"bottom":50,"left":50,"right":20},"brushMargin":{"top":0,"bottom":30,"left":50,"right":20},"chartWidth":1200,"chartHeight":400,"brushHeight":50}')},88:function(t,e,a){},99:function(t,e,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.68285b2f.chunk.js.map
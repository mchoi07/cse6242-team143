(this["webpackJsonpdata-visualization"]=this["webpackJsonpdata-visualization"]||[]).push([[0],{107:function(t,e,a){},109:function(t,e,a){"use strict";a.r(e);var n=a(19),c=a(6),l=a(0),i=a(9),s=a.n(i),r=(a(96),a(25)),o=a(77),h=a(141),u=a(111),d=a(152),b=a(156),m=a(153),j=a(159),g=a(80),x=a(151),v=a(71),p=a(72),O=a(51),f=a(78),S=a(76),k=a(16),y=(a(107),a(11)),C=function(t){Object(f.a)(a,t);var e=Object(S.a)(a);function a(t){var n;return Object(v.a)(this,a),(n=e.call(this,t)).state=n.getStateFromProps(t),n._tooltipHtml=n._tooltipHtml.bind(Object(O.a)(n)),n._onChange=n._onChange.bind(Object(O.a)(n)),n}return Object(p.a)(a,[{key:"getStateFromProps",value:function(t){var e=y.sentimentHeight,a=y.chartWidth,n=y.chartMargin,c=y.brushMargin,l=this._getXRange(t.data[0]),i=l.minX,s=l.maxX;return{dataStock:{label:"",values:t.data[0].values.map((function(t){return Object(r.a)(Object(r.a)({},t),{},{y:t.price})}))},dataMovement:t.data[0],dataSentiment:t.data.slice(1),xScale:k.d3.time.scale().domain([i,s]).range([0,a-(null===n||void 0===n?void 0:n.left)-(null===n||void 0===n?void 0:n.right)]),xScaleBrush:k.d3.time.scale().domain([i,s]).range([0,a-(null===c||void 0===c?void 0:c.left)-(null===c||void 0===c?void 0:c.right)]),yScaleMovement:k.d3.scale.linear().domain(this._getYRange(t.data[0])).range([e-(null===n||void 0===n?void 0:n.top)-(null===n||void 0===n?void 0:n.bottom),0]),yScaleSentiment:k.d3.scale.linear().domain(this._getYRange(t.data.slice(1))).range([e-(null===n||void 0===n?void 0:n.top)-(null===n||void 0===n?void 0:n.bottom),0])}}},{key:"componentDidUpdate",value:function(t){if(this.props.data!==t.data){var e=this.getStateFromProps(this.props);this.setState(e)}}},{key:"_getXRange",value:function(t){var e,a;return{minX:(null===(e=t.values)||void 0===e?void 0:e.length)>0?t.values[0].x:0,maxX:(null===(a=t.values)||void 0===a?void 0:a.length)>0?t.values[t.values.length-1].x:0}}},{key:"_getMaxAbs",value:function(t){return t.reduce((function(t,e){return Math.max(t,Math.abs(e))}),0)}},{key:"_getYRange",value:function(t){var e=0;if(Array.isArray(t))for(var a=0;a<t.length;a++)e=Math.max(e,this._getMaxAbs(t[a].values.map((function(t){return t.y}))));else e=Math.max(e,this._getMaxAbs(t.values.map((function(t){return t.y}))));return[-e,e]}},{key:"_tooltipHtml",value:function(t,e){return"stock"===t?Object(c.jsxs)("div",{children:["price: $",e.price]}):Object(c.jsxs)("div",{children:["positives: ",e.positives,Object(c.jsx)("br",{}),"neutrals: ",e.neutrals,Object(c.jsx)("br",{}),"negatives: ",e.negatives]})}},{key:"_getColor",value:function(t,e,a,n){return console.log(t,e,a,n),"green"}},{key:"_onChange",value:function(t){var e=y.chartWidth,a=y.chartMargin;this.setState({xScale:k.d3.time.scale().domain([t[0],t[1]]).range([0,e-(null===a||void 0===a?void 0:a.left)-(null===a||void 0===a?void 0:a.right)])})}},{key:"render",value:function(){var t=y.chartWidth,e=y.chartHeight,a=y.sentimentHeight,n=y.chartMargin,l=y.brushHeight,i=y.brushMargin,s=this._getXRange(this.state.dataStock),r=s.minX,o=s.maxX;return Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"sentimentChart",children:[Object(c.jsx)("div",{className:"title",children:"Sentiment Score & Price Change"}),Object(c.jsx)("div",{className:"leftY",children:Object(c.jsx)(k.LineChart,{data:this.state.dataMovement,width:t,height:a,margin:n,xScale:this.state.xScale,yScale:this.state.yScaleMovement,xAxis:{tickValues:this.state.xScale.ticks(10),tickFormat:k.d3.time.format("%m/%d"),zero:0},yAxis:{label:"price changes"},tooltipHtml:this._tooltipHtml,stroke:{strokeColor:this._getColor,colorStroke:this._getColor},colorStroke:this._getColor})}),this.state.dataSentiment.length>0&&Object(c.jsx)("div",{className:"rightY",style:{bottom:a+3},children:Object(c.jsx)(k.LineChart,{data:this.state.dataSentiment,width:t,height:a,margin:n,xScale:this.state.xScale,yScale:this.state.yScaleSentiment,xAxis:{tickValues:this.state.xScale.ticks(10),tickFormat:k.d3.time.format(""),zero:0},yAxis:{orientation:"right",label:"sentiment score"},tooltipHtml:this._tooltipHtml})})]}),Object(c.jsxs)("div",{className:"brush nofloat",children:[Object(c.jsx)("div",{className:"title brush",children:"Date Range Selector"}),Object(c.jsx)(k.Brush,{width:t,height:l,margin:i,xScale:this.state.xScaleBrush,extent:[r,o],onChange:this._onChange,xAxis:{tickValues:this.state.xScaleBrush.ticks(20),tickFormat:k.d3.time.format("%m/%d")}})]}),Object(c.jsx)("div",{className:"title",children:"Stock Price"}),Object(c.jsx)(k.LineChart,{data:this.state.dataStock,width:t,height:e,margin:n,xScale:this.state.xScale,xAxis:{tickValues:this.state.xScale.ticks(10),tickFormat:k.d3.time.format("%m/%d")},yAxis:{label:"stock price"}})]})}}]),a}(l.Component),_=a(155),M=a(143),N=a(145),w=a(160),A=a(146),D=a(147),L=a(148),F=a(158),P=a(161),H=a(157),T=a(154),B=a(149),X=a(150),R=Object(h.a)((function(t){return Object(j.a)({card:{width:200,padding:"8 16"},cardTitle:{textAlign:"center",marginBottom:"10px"},cardAction:{margin:"auto"},labelStock:{color:y.colorStock},labelBlob:{color:y.colorBlob},labelSmall:{color:y.colorSmall},labelLarge:{color:y.colorLarge}})})),I=function(t){var e=R(),a=Object(l.useState)(1),i=Object(n.a)(a,2),s=i[0],r=i[1],o=Object(l.useState)(!0),h=Object(n.a)(o,2),u=h[0],d=h[1],b=Object(l.useState)(!0),m=Object(n.a)(b,2),j=m[0],g=m[1],x=Object(l.useState)(!0),v=Object(n.a)(x,2),p=v[0],O=v[1],f=Object(l.useState)("twitter"),S=Object(n.a)(f,2),k=S[0],C=S[1],I={textblob:u,small:j,large:p},V=function(e){I[e.target.name]=e.target.checked,"textblob"===e.target.name?d(e.target.checked):"large"===e.target.name?O(e.target.checked):g(e.target.checked),t.onChange({normFactor:s,source:k,modelSelected:I})};return Object(c.jsxs)(_.a,{alignItems:"center",justifyContent:"center",children:[Object(c.jsxs)(M.a,{className:e.card,children:[Object(c.jsx)("h3",{className:e.cardTitle,children:"Sentiment Analysis"}),Object(c.jsxs)(N.a,{children:[Object(c.jsxs)(w.a,{component:"fieldset",children:[Object(c.jsx)(A.a,{component:"legend",children:"Model"}),Object(c.jsxs)(D.a,{children:[Object(c.jsx)(L.a,{disabled:!0,className:e.labelStock,control:Object(c.jsx)(F.a,{style:{color:y.colorStock},indeterminate:!0,checked:!0,name:"stock"}),label:"Daily Price Change"}),Object(c.jsx)(L.a,{className:e.labelBlob,control:Object(c.jsx)(F.a,{style:{color:y.colorBlob},onChange:V,checked:u,name:"textblob"}),label:"TextBlob"}),Object(c.jsx)(L.a,{className:e.labelSmall,control:Object(c.jsx)(F.a,{style:{color:y.colorSmall},onChange:V,checked:j,name:"small"}),label:"Custom (small)"}),Object(c.jsx)(L.a,{className:e.labelLarge,control:Object(c.jsx)(F.a,{style:{color:y.colorLarge},onChange:V,checked:p,name:"large"}),label:"Custom (large)"})]})]}),Object(c.jsxs)(w.a,{component:"fieldset",children:[Object(c.jsx)(A.a,{component:"legend",children:"Source"}),Object(c.jsxs)(P.a,{defaultValue:"twitter",name:"sentiment-model",onChange:function(e){C(e.target.defaultValue),t.onChange({normFactor:s,source:e.target.defaultValue,modelSelected:I})},children:[Object(c.jsx)(L.a,{value:"twitter",control:Object(c.jsx)(H.a,{}),label:"Twitter"}),Object(c.jsx)(L.a,{value:"nytimes",control:Object(c.jsx)(H.a,{}),label:"NYTimes"})]})]})]})]}),Object(c.jsxs)(M.a,{className:e.card,children:[Object(c.jsx)("h3",{className:e.cardTitle,children:"Stock Movement"}),Object(c.jsx)(N.a,{children:Object(c.jsx)(T.a,{className:e.input,label:"scaling adjustment",type:"number",fullWidth:!0,inputProps:{min:1,max:5,step:"0.1",style:{height:5,textAlign:"right"}},InputLabelProps:{shrink:!0},variant:"outlined",value:s,onChange:function(t){r(+t.target.value)}})}),Object(c.jsx)(B.a,{children:Object(c.jsx)(X.a,{className:e.cardAction,size:"small",variant:"outlined",onClick:function(e){t.onChange({normFactor:s,source:k,modelSelected:I})},children:"Calculate"})})]})]})},V=Object(h.a)((function(t){return Object(j.a)({container:{flexGrow:1},paper:{padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary}})})),Y=function(t){var e=V(),a=[{label:"stock",values:t.chartData.stock},{label:"textblob",values:t.chartData.sentiment.twitter.textblob},{label:"small",values:t.chartData.sentiment.twitter.small},{label:"large",values:t.chartData.sentiment.twitter.large}],i=Object(l.useState)(a),s=Object(n.a)(i,2),o=s[0],h=s[1];return Object(c.jsx)("div",{className:e.container,children:Object(c.jsxs)(x.a,{container:!0,spacing:3,children:[Object(c.jsx)(x.a,{item:!0,xs:2,children:Object(c.jsx)(I,{onChange:function(e){var a=e.normFactor,n=e.source,c=e.modelSelected,l=[{label:"stock",values:t.chartData.stock.map((function(t){return Object(r.a)(Object(r.a)({},t),{},{y:t.y*a})}))}];c.textblob&&l.push({label:"textblob",values:t.chartData.sentiment[n].textblob}),c.small&&l.push({label:"small",values:t.chartData.sentiment[n].small}),c.large&&l.push({label:"large",values:t.chartData.sentiment[n].large}),h(l)}})}),Object(c.jsx)(x.a,{item:!0,xs:10,children:Object(c.jsx)(g.a,{className:e.paper,children:Object(c.jsx)(C,{data:o})})})]})})};function E(t){var e=t.value,a=t.index,n=t.chartData,l=Object(o.a)(t,["value","index","chartData"]);return Object(c.jsx)("div",Object(r.a)(Object(r.a)({role:"tabpanel",hidden:e!==a,id:"tabpanel-".concat(a)},l),{},{children:e===a&&Object(c.jsx)(Y,{chartData:n})}))}var W=Object(h.a)((function(t){return{root:{margin:"auto",width:1280,flexGrow:1,backgroundColor:t.palette.background.paper}}}));function z(t){var e=W(),a=Object(l.useState)(0),i=Object(n.a)(a,2),s=i[0],r=i[1],o=y.companies;return Object(c.jsxs)("div",{className:e.root,children:[Object(c.jsx)(u.a,{variant:"h3",align:"center",children:"Sentiment Analysis vs. Stock Price Movement"}),Object(c.jsx)(d.a,{position:"static",children:Object(c.jsx)(b.a,{value:s,onChange:function(t,e){r(e)},children:o.map((function(t,e){return Object(c.jsx)(m.a,{label:t},"tab-".concat(e))}))})}),o.map((function(e,a){return Object(c.jsx)(E,{value:s,index:a,chartData:t.appData[e]},"panel-".concat(a))}))]})}var J=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,163)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,l=e.getLCP,i=e.getTTFB;a(t),n(t),c(t),l(t),i(t)}))},G=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t.map((function(t){var n=t.date,c=t.company,l=t.source,i=t.sent_score_textblob,s=t.sent_score_custom,r=t.positives_textblob,o=t.neutrals_textblob,h=t.negatives_textblob,u=t.positives_custom,d=t.neutrals_custom,b=t.negatives_custom,m=t.price,j=n.split("-"),g=new Date("".concat(j[2],"-").concat(j[0],"-").concat(j[1],"T20:00:00.000Z"));e[c]=e[c]||{stock:[],sentiment:{twitter:{textblob:[],small:[],large:[]},nytimes:{textblob:[],small:[],large:[]}}},a?e[c].sentiment[l.toLowerCase()].large.push({x:g,y:s,source:l,positives:u,neutrals:d,negatives:b}):("TWITTER"===l&&e[c].stock.push({x:g,price:m}),e[c].sentiment[l.toLowerCase()].textblob.push({x:g,y:i,source:l,positives:r,neutrals:o,negatives:h}),e[c].sentiment[l.toLowerCase()].small.push({x:g,y:s,source:l,positives:u,neutrals:d,negatives:b}))})),e};Promise.all([fetch("data/aggregated.json"),fetch("data/aggregated_large.json")]).then((function(t){var e=Object(n.a)(t,2),a=e[0],c=e[1];return Promise.all([a.json(),c.json()])})).then((function(t){var e=Object(n.a)(t,2),a=e[0],l=e[1],i=G(a);G(l,i,!0);var r=function(t){var e=i[t].stock,a=e.find((function(t){return t.price>0})).price;a=Math.round(100*a)/100,e.map((function(t){t.price=t.price?Math.round(100*t.price)/100:Math.round(100*a)/100,t.y=(t.price-a)/a,a=t.price}))};for(var o in i)r(o);s.a.render(Object(c.jsx)(z,{appData:i}),document.getElementById("root"))})),J()},11:function(t){t.exports=JSON.parse('{"companies":["APPLE","DISNEY","NETFLIX","TESLA"],"chartMargin":{"top":10,"bottom":50,"left":35,"right":35},"brushMargin":{"top":0,"bottom":30,"left":35,"right":35},"chartWidth":1000,"chartHeight":250,"sentimentHeight":500,"brushHeight":60,"colorStock":"#1f77b4","colorBlob":"#aec7e8","colorSmall":"#ff7f0e","colorLarge":"#ffbb78"}')},96:function(t,e,a){}},[[109,1,2]]]);
//# sourceMappingURL=main.754a73b3.chunk.js.map
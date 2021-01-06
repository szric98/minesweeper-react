(this["webpackJsonpminesweeper-react"]=this["webpackJsonpminesweeper-react"]||[]).push([[0],{18:function(e,t,s){},19:function(e,t,s){"use strict";s.r(t);var n=s(0),i=s(1),a=s.n(i),o=s(8),r=s.n(o),c=(s(18),s(5)),l=s(2),u=s(9),d=s(10),f=s(12),h=s(11),p=function(e,t,s){return s&&e?"cell flag":e?"cell":t},v=function(e){var t=e.classes,s=e.hidden,i=e.onClick,a=e.gameState,o=e.onContextMenu,r=e.hasFlag;return Object(n.jsx)("button",{className:p(s,t,r),onClick:i,disabled:"win"===a||"dead"===a,onContextMenu:o})};var j=function(e){for(var t,s,n=e.length;0!==n;)s=Math.floor(Math.random()*n),t=e[n-=1],e[n]=e[s],e[s]=t;return e},m=function(e){var t=e.count,s=e.classes;return Object(n.jsxs)("div",{className:s,children:[Object(n.jsx)("span",{className:"count n".concat(Math.floor(t/100))}),Object(n.jsx)("span",{className:"count n".concat(Math.floor(t/10))}),Object(n.jsx)("span",{className:"count n".concat(t%10)})]})};var y=function(e){var t=e.onClick,s=e.gameState;return Object(n.jsx)("button",{className:"smiley ".concat(s),onClick:t})},x=function(e){var t=e.gameState,s=Object(i.useState)(0),a=Object(c.a)(s,2),o=a[0],r=a[1];return Object(i.useEffect)((function(){if(""===t&&r(0),"dead"!==t&&"win"!==t){var e=setInterval((function(){"started"===t&&r((function(e){return e+1}))}),1e3);return function(){return clearInterval(e)}}}),[t]),Object(n.jsx)(m,{count:o,classes:"time"})};var g=function(e){var t=e.flags,s=e.time,i=e.onReset,a=e.gameState;return Object(n.jsxs)("div",{className:"indicator",children:[Object(n.jsx)(m,{count:t,classes:"flags-counter"}),Object(n.jsx)(y,{onClick:i,gameState:a}),Object(n.jsx)(x,{count:s,classes:"time",gameState:a})]})},b=function(e){Object(f.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={tiles:[],hiddenTilesCount:0,time:0,flags:0,gameState:""},n.handleClick=function(e){if(e.hidden){if(e.hasFlag)return;if(""===n.state.gameState){n.setState({gameState:"started"});var t=e.pos.x*n.props.difficulty.size.x+e.pos.y,s=n.generateBoard(t);return n.setState({tiles:s},(function(){n.floodFill(e.pos.x,e.pos.y,0)}))}}else n.openAdjacentFields(e);if(e.hasMine)return n.gameOver(e.pos);n.floodFill(e.pos.x,e.pos.y,0),n.countFieldsBasedOnProp("hidden")===n.props.difficulty.mines&&n.setState({gameState:"win"})},n.handleRightClick=function(e,t){e.preventDefault();var s=n.state.flags;if(t.hidden&&(0!==s||t.hasFlag)){var i=Object(l.a)(n.state.tiles);t.hasFlag?(i[t.pos.x][t.pos.y].hasFlag=!1,n.setState({flags:s+1})):(i[t.pos.x][t.pos.y].hasFlag=!0,n.setState({flags:s-1})),n.setState({tiles:i})}},n.handleReset=function(){var e={tiles:n.initBoard(),hiddenTilesCount:n.props.difficulty.count,time:0,flags:n.props.difficulty.mines,gameState:""};n.setState(e)},n.state.tiles=n.initBoard(),n.state.hiddenTilesCount=n.props.difficulty.counter,n.state.flags=n.props.difficulty.mines,n}return Object(d.a)(s,[{key:"componentDidUpdate",value:function(e,t){e!==this.props&&this.handleReset()}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"minesweeper",children:[Object(n.jsx)(g,{flags:this.state.flags,time:this.state.time,onReset:this.handleReset,gameState:this.state.gameState}),Object(n.jsx)("div",{className:"board",children:this.state.tiles.map((function(t,s){return Object(n.jsx)("div",{className:"row",children:t.map((function(t){return Object(n.jsx)(v,{classes:t.classes,hidden:t.hidden,onClick:function(){return e.handleClick(t)},gameState:e.state.gameState,onContextMenu:function(s){return e.handleRightClick(s,t)},hasFlag:t.hasFlag},10*t.pos.x+t.pos.y)}))},s)}))})]})}},{key:"initBoard",value:function(){for(var e=[],t=this.props.difficulty.size,s=0;s<t.x;s++){for(var n=[],i=0;i<t.y;i++)n.push({pos:{x:s,y:i},hasMine:!1,hasFlag:!1,classes:"cell",hidden:!0});e.push(n)}return e}},{key:"generateBoard",value:function(e){for(var t=[],s=this.props.difficulty.size,n=Object(l.a)(Array(this.props.difficulty.count).keys()).filter((function(t){return t!==e})),i=j(n).slice(0,this.props.difficulty.mines),a=function(e){for(var n=[],a=function(t){n.push({pos:{x:e,y:t},hasMine:void 0!==i.find((function(n){return n===e*s.x+t})),hasFlag:!1,classes:"cell",hidden:!0})},o=0;o<s.y;o++)a(o);t.push(n)},o=0;o<s.x;o++)a(o);for(var r=0;r<s.x;r++)for(var c=0;c<s.y;c++)t[r][c].hasMine?t[r][c].classes+=" mine":t[r][c].classes+=" n".concat(this.countSurroundingMines(t[r][c],t));return t}},{key:"countSurroundingMines",value:function(e,t){for(var s=this.props.difficulty.size,n=0,i=-1;i<=1;i++)for(var a=-1;a<=1;a++)this.isValid(e.pos,{x:i,y:a},s)&&t[e.pos.x+i][e.pos.y+a].hasMine&&n++;return n}},{key:"floodFill",value:function(e,t,s){var n=Object(l.a)(this.state.tiles),i=this.props.difficulty.size;if(e>=0&&e<i.x&&t>=0&&t<i.y&&n[e][t].hidden&&0===s&&!n[e][t].hasMine&&!n[e][t].hasFlag){n[e][t].hidden=!1;var a=this.countSurroundingMines(n[e][t],n);this.floodFill(e-1,t,a),this.floodFill(e+1,t,a),this.floodFill(e,t-1,a),this.floodFill(e,t+1,a)}this.setState({tiles:n})}},{key:"openAdjacentFields",value:function(e){for(var t=Object(l.a)(this.state.tiles),s=this.props.difficulty.size,n=0,i=0,a=-1;a<=1;a++)for(var o=-1;o<=1;o++)this.isValid(e.pos,{x:a,y:o},s)&&(t[e.pos.x+a][e.pos.y+o].hasFlag&&n++,t[e.pos.x+a][e.pos.y+o].hidden&&i++);if(n===this.getMinesCountFromClasses(e)&&i>0&&i!==n){for(var r=-1;r<=1;r++)for(var c=-1;c<=1;c++)if(this.isValid(e.pos,{x:r,y:c},s)&&!t[e.pos.x+r][e.pos.y+c].hasFlag){var u=t[e.pos.x+r][e.pos.y+c];this.floodFill(u.pos.x,u.pos.y,0)}this.setState({tiles:t})}}},{key:"getMinesCountFromClasses",value:function(e){return parseInt(e.classes[e.classes.search("n")+1])}},{key:"countFieldsBasedOnProp",value:function(e){for(var t=this.props.difficulty.size,s=0,n=0;n<t.x;n++)for(var i=0;i<t.y;i++)this.state.tiles[n][i][e]&&s++;return s}},{key:"gameOver",value:function(e){this.revealMines(e),this.setState({gameState:"dead"})}},{key:"revealMines",value:function(e){for(var t=Object(l.a)(this.state.tiles),s=this.props.difficulty.size,n=0;n<s.x;n++)for(var i=0;i<s.y;i++)!t[n][i].hasFlag&&t[n][i].hasMine&&(t[n][i].hidden=!1),t[n][i].hasFlag&&!t[n][i].hasMine&&(t[n][i].hidden=!1,t[n][i].classes+=" dead-flag"),e&&n===e.x&&i===e.y&&(t[n][i].classes+=" triggeredDeath");this.setState({tiles:t})}},{key:"isValid",value:function(e,t,s){return e.x+t.x>=0&&e.y+t.y>=0&&e.x+t.x<s.x&&e.y+t.y<s.y}}]),s}(i.Component);s(7);var O=function(e){var t=e.onMenuItemClick;return Object(n.jsxs)("div",{className:"dropdown",children:[Object(n.jsx)("button",{className:"dropdown-btn",children:"Difficulty"}),Object(n.jsxs)("div",{className:"dropdown-content",children:[Object(n.jsx)("button",{onClick:function(){return t("beginner")},children:"Beginner"}),Object(n.jsx)("button",{onClick:function(){return t("intermediate")},children:"Intermediate"}),Object(n.jsx)("button",{onClick:function(){return t("advanced")},children:"Advanced"})]})]})},S={mines:10,size:{x:9,y:9},count:81},k={mines:40,size:{x:16,y:16},count:256},F={mines:99,size:{x:16,y:32},count:512};var C=function(){var e=Object(i.useState)(S),t=Object(c.a)(e,2),s=t[0],o=t[1];return Object(n.jsxs)(a.a.Fragment,{children:[Object(n.jsx)(O,{onMenuItemClick:function(e){"beginner"===e?o(S):"intermediate"===e?o(k):"advanced"===e&&o(F)}}),Object(n.jsx)(b,{difficulty:s},s)]})};r.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(C,{})}),document.getElementById("root"))},7:function(e,t,s){}},[[19,1,2]]]);
//# sourceMappingURL=main.8be4e2bf.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),a=n(3),r=n.n(a),l=n(1),u=n(4);function i(e){var t=e.todo,n=e.toggleTodo;return c.a.createElement("div",null,c.a.createElement("label",null,c.a.createElement("input",{type:"checkbox",checked:t.complete,onChange:function(){n(t.id)}}),t.name))}function d(e){var t=e.todos,n=e.toggleTodo;return t.map(function(e){return c.a.createElement(i,{key:e.id,toggleTodo:n,todo:e})})}var f=n(16),m="todoApp.todos";var p=function(){var e=Object(o.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],r=Object(o.useRef)();return Object(o.useEffect)(function(){var e=JSON.parse(localStorage.getItem(m));e&&a(e)},[]),Object(o.useEffect)(function(){localStorage.setItem(m,JSON.stringify(n))},[n]),c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{todos:n,toggleTodo:function(e){var t=Object(l.a)(n),o=t.find(function(t){return t.id===e});o.complete=!o.complete,a(t)}}),c.a.createElement("input",{ref:r,type:"text"}),c.a.createElement("button",{onClick:function(e){var t=r.current.value;""!==t&&(a(function(e){return[].concat(Object(l.a)(e),[{id:Object(f.a)(),name:t,complete:!1}])}),r.current.value=null)}},"Add Todo"),c.a.createElement("button",{onClick:function(){var e=n.filter(function(e){return!e.complete});a(e)}},"Clear Completed Todos"),c.a.createElement("div",null,n.filter(function(e){return!e.complete}).length," left to do"))};r.a.createRoot(document.getElementById("root")).render(c.a.createElement(p,null))},5:function(e,t,n){e.exports=n(14)}},[[5,2,1]]]);
//# sourceMappingURL=main.0a031f6f.chunk.js.map
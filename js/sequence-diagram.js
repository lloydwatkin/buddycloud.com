!function(){"use strict";function t(t){this.message=t}function i(i,e){if(!i)throw new t(e)}function e(t){return t.x+t.width/2}function a(t){return t.y+t.height/2}var h=10,n=10,r=10,s=5,o=5,d=10,c=5,l=15,f=0,p=5,g=20,w=Diagram.PLACEMENT,x=Diagram.LINETYPE,u=Diagram.ARROWTYPE,m={stroke:"#000","stroke-width":2},y={fill:"#fff"};t.prototype.toString=function(){return"AssertException: "+this.message},String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Raphael.fn.line=function(t,e,a,h){return i(_.all([t,a,e,h],_.isFinite),"x1,x2,y1,y2 must be numeric"),this.path("M{0},{1} L{2},{3}",t,e,a,h)},Raphael.fn.wobble=function(t,e,a,h){i(_.all([t,a,e,h],_.isFinite),"x1,x2,y1,y2 must be numeric");var n=Math.sqrt((a-t)*(a-t)+(h-e)*(h-e))/25,r=Math.random(),s=Math.random(),o=Math.random()>.5?n:-n,d=Math.random()>.5?n:-n,c={x:(a-t)*r+t+o,y:(h-e)*r+e+d},l={x:(a-t)*s+t-o,y:(h-e)*s+e-d};return"C"+c.x+","+c.y+" "+l.x+","+l.y+" "+a+","+h},Raphael.fn.text_bbox=function(t,i){var e;i._obj?e=this.print_center(0,0,t,i._obj,i["font-size"]):(e=this.text(0,0,t),e.attr(i));var a=e.getBBox();return e.remove(),a},Raphael.fn.handRect=function(t,e,a,h){return i(_.all([t,e,a,h],_.isFinite),"x, y, w, h must be numeric"),this.path("M"+t+","+e+this.wobble(t,e,t+a,e)+this.wobble(t+a,e,t+a,e+h)+this.wobble(t+a,e+h,t,e+h)+this.wobble(t,e+h,t,e)).attr(y)},Raphael.fn.handLine=function(t,e,a,h){return i(_.all([t,a,e,h],_.isFinite),"x1,x2,y1,y2 must be numeric"),this.path("M"+t+","+e+this.wobble(t,e,a,h))},Raphael.fn.print_center=function(t,i,e,a,h,n){var r=this.print(t,i,e,a,h,"baseline",n),s=r.getBBox(),o=t-s.x-s.width/2,_=i-s.y-s.height/2,d=new Raphael.matrix;return d.translate(o,_),r.attr("path",Raphael.mapPath(r.attr("path"),d))};var b=function(t){this.init(t)};_.extend(b.prototype,{init:function(t){this.diagram=t,this._paper=void 0,this._font=void 0,this._title=void 0,this._actors_height=0,this._signals_height=0;var i=this.arrow_types={};i[u.FILLED]="block",i[u.OPEN]="open";var e=this.line_types={};e[x.SOLID]="",e[x.DOTTED]="-"},init_paper:function(t){this._paper=new Raphael(t,320,200)},init_font:function(){},draw_line:function(t,i,e,a){return this._paper.line(t,i,e,a)},draw_rect:function(t,i,e,a){return this._paper.rect(t,i,e,a)},draw:function(t){var i=this.diagram;this.init_paper(t),this.init_font(),this.layout();var e=this._title?this._title.height:0;this._paper.setStart(),this._paper.setSize(i.width,i.height);var a=h+e;this.draw_title(),this.draw_actors(a),this.draw_signals(a+this._actors_height),this._paper.setFinish()},layout:function(){function t(t,e,a){i(e>t,"a must be less than or equal to b"),0>t?(e=u[e],e.x=Math.max(a-e.width/2,e.x)):e>=u.length?(t=u[t],t.padding_right=Math.max(a,t.padding_right)):(t=u[t],t.distances[e]=Math.max(a,t.distances[e]?t.distances[e]:0))}var e=this.diagram,a=this._paper,x=this._font,u=e.actors,m=e.signals;if(e.width=0,e.height=0,e.title){var y=this._title={},b=a.text_bbox(e.title,x);y.text_bb=b,y.message=e.title,y.width=b.width+2*(p+f),y.height=b.height+2*(p+f),y.x=h,y.y=h,e.width+=y.width,e.height+=y.height}_.each(u,function(t){var i=a.text_bbox(t.name,x);t.text_bb=i,t.x=0,t.y=0,t.width=i.width+2*(r+n),t.height=i.height+2*(r+n),t.distances=[],t.padding_right=0,this._actors_height=Math.max(t.height,this._actors_height)},this),_.each(m,function(i){var e,h,r=a.text_bbox(i.message,x);i.text_bb=r,i.width=r.width,i.height=r.height;var _=0;if("Signal"==i.type)i.width+=2*(s+o),i.height+=2*(s+o),i.isSelf()?(e=i.actorA.index,h=e+1,i.width+=g):(e=Math.min(i.actorA.index,i.actorB.index),h=Math.max(i.actorA.index,i.actorB.index));else{if("Note"!=i.type)throw new Error("Unhandled signal type:"+i.type);if(i.width+=2*(d+c),i.height+=2*(d+c),_=2*n,i.placement==w.LEFTOF)h=i.actor.index,e=h-1;else if(i.placement==w.RIGHTOF)e=i.actor.index,h=e+1;else if(i.placement==w.OVER&&i.hasManyActors())e=Math.min(i.actor[0].index,i.actor[1].index),h=Math.max(i.actor[0].index,i.actor[1].index),_=-(2*c+2*l);else if(i.placement==w.OVER)return e=i.actor.index,t(e-1,e,i.width/2),t(e,e+1,i.width/2),this._signals_height+=i.height,void 0}t(e,h,i.width+_),this._signals_height+=i.height},this);var v=0;return _.each(u,function(t){t.x=Math.max(v,t.x),_.each(t.distances,function(i,e){"undefined"!=typeof i&&(e=u[e],i=Math.max(i,t.width/2,e.width/2),e.x=Math.max(e.x,t.x+t.width/2+i-e.width/2))}),v=t.x+t.width+t.padding_right},this),e.width=Math.max(v,e.width),e.width+=2*h,e.height+=2*h+2*this._actors_height+this._signals_height,this},draw_title:function(){var t=this._title;t&&this.draw_text_box(t,t.message,f,p,this._font)},draw_actors:function(t){var i=t;_.each(this.diagram.actors,function(t){this.draw_actor(t,i,this._actors_height),this.draw_actor(t,i+this._actors_height+this._signals_height,this._actors_height);var a=e(t),h=this.draw_line(a,i+this._actors_height-n,a,i+this._actors_height+n+this._signals_height);h.attr(m)},this)},draw_actor:function(t,i,e){t.y=i,t.height=e,this.draw_text_box(t,t.name,n,r,this._font)},draw_signals:function(t){var i=t;_.each(this.diagram.signals,function(t){"Signal"==t.type?t.isSelf()?this.draw_self_signal(t,i):this.draw_signal(t,i):"Note"==t.type&&this.draw_note(t,i),i+=t.height},this)},draw_self_signal:function(t,a){i(t.isSelf(),"signal must be a self signal");var h=t.text_bb,n=e(t.actorA),r=n+g+o-h.x,d=a+t.height/2;this.draw_text(r,d,t.message,this._font);var c,l=_.extend({},m,{"stroke-dasharray":this.line_types[t.linetype]}),f=a+s,p=f+t.height-s;c=this.draw_line(n,f,n+g,f),c.attr(l),c=this.draw_line(n+g,f,n+g,p),c.attr(l),c=this.draw_line(n+g,p,n,p),l["arrow-end"]=this.arrow_types[t.arrowtype]+"-wide-long",c.attr(l)},draw_signal:function(t,i){var a=e(t.actorA),h=e(t.actorB),n=(h-a)/2+a,r=i+s+2*o;this.draw_text(n,r,t.message,this._font),r=i+t.height-s-o;var _=this.draw_line(a,r,h,r);_.attr(m),_.attr({"arrow-end":this.arrow_types[t.arrowtype]+"-wide-long","stroke-dasharray":this.line_types[t.linetype]})},draw_note:function(t,i){t.y=i;var a=t.hasManyActors()?t.actor[0]:t.actor,h=e(a);switch(t.placement){case w.RIGHTOF:t.x=h+n;break;case w.LEFTOF:t.x=h-n-t.width;break;case w.OVER:if(t.hasManyActors()){var r=e(t.actor[1]),s=l+c;t.x=h-s,t.width=r+s-t.x}else t.x=h-t.width/2;break;default:throw new Error("Unhandled note placement:"+t.placement)}this.draw_text_box(t,t.message,d,c,this._font)},draw_text:function(t,i,e,a){var h,n=this._paper,r=a||{};r._obj?h=n.print_center(t,i,e,r._obj,r["font-size"]):(h=n.text(t,i,e),h.attr(r));var s=h.getBBox(),o=n.rect(s.x,s.y,s.width,s.height);o.attr({fill:"#fff",stroke:"none"}),h.toFront()},draw_text_box:function(t,i,h,n,r){var s=t.x+h,o=t.y+h,_=t.width-2*h,d=t.height-2*h,c=this.draw_rect(s,o,_,d);c.attr(m),s=e(t),o=a(t),this.draw_text(s,o,i,r)}});var v=function(t){this.init(t)};_.extend(v.prototype,b.prototype,{init_font:function(){this._font={"font-size":16,"font-family":"Andale Mono, monospace"}}});var M=function(t){this.init(t)};_.extend(M.prototype,b.prototype,{init_font:function(){this._font={"font-size":16,"font-family":"daniel"},this._font._obj=this._paper.getFont("daniel")},draw_line:function(t,i,e,a){return this._paper.handLine(t,i,e,a)},draw_rect:function(t,i,e,a){return this._paper.handRect(t,i,e,a)}});var R={simple:v,hand:M};Diagram.prototype.drawSVG=function(t,i){var e={theme:"hand"};if(i=_.defaults(i||{},e),!(i.theme in R))throw new Error("Unsupported theme: "+i.theme);var a=new R[i.theme](this);a.draw(t)}}();
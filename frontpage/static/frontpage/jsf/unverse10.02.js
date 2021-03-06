//UNVERSE.JS 100220. FREE, FROM UNVERSE.NET UNDER THE MIT LICENCE
var _=function(){
//CONFIGURABLE
 var toDrag="drag",toPop="image",toHover="menu",xMsg="CLOSE",
 ldMsg='<br clear="right"><img align="center" src="http://i50.tinypic.com/15yi1wj.gif" alt="Loading..." />';
//END
var wn=window,dc=document,db,de,ov,pp,drg,lX,lY,mX,mY;
dc.write('<style> #uv_pop{background:#007f00;z-index:1100;position:absolute;top:50%;left:50%;display:none;border:5px solid #FFF;border-radius: 15px;padding:10px} #uv_px {font-weight:bold;color:red;float:right} #uv_ov{position:absolute;top:0;left:0;z-index:1090;background-color:#000;display:none;opacity:.7} </style>');
return {
 $:function(l){return (typeof l=='string')?dc.getElementById(l):l;},
 t:function(tg,l){tg=tg||'*';l=l||dc;return _.$(l).getElementsByTagName(tg);},
 c:function(cls,tg,l){var c=[],p=new RegExp('\\b'+cls+'\\b');_.all(_.t(tg,l),function(m){if(p.test(m.className)){c.push(m);}});return c;}, 
 s:function(l,x,y){var st=_.$(l).style;if(x||y){st.position='absolute';if(x){st.left=x+'px';} if(y){st.top=y+'px';}}st.display='block';}, 
 h:function(l){_.$(l).style.display='none';},
 v:function(l){var s,t=_.$(l),n=t.nodeName;if(n=="INPUT"||n=="TEXTAREA"){return t.value;} 
if(n=="SELECT"){s=t.options[t.selectedIndex];return s.value||s.innerHTML;}return t.innerHTML;},
 gs:function(l,p){var s=_.$(l).currentStyle||dc.defaultView.getComputedStyle(_.$(l),null);return s[p];},
 e:function(o,e,f){return wn.addEventListener?o.addEventListener(e,f,false):o.attachEvent("on"+e,f);},
 re:function(o,e,f){return wn.removeEventListener?o.removeEventListener(e,f,false):o.detachEvent("on"+e,f);},
 wW:function(){return de.clientWidth||wn.innerWidth-18;},
 wH:function(){return de.clientHeight||wn.innerHeight-18;},
 dW:function(){return Math.max(de.scrollWidth,_.wW());},
 dH:function(){return Math.max(de.scrollHeight,_.wH());},
 sX:function(){return wn.pageXOffset||de.scrollLeft;},
 sY:function(){return wn.pageYOffset||de.scrollTop;},
 all:function(a,f){for(var i=0;i<a.length;i++){f(a[i]);}},
 dd:function(l,f){var o=_.$(l);o.onmousedown=_.da;o.drp=f;o.style.cursor='move';},
 da:function(e){if (drg){_.dz();}e=e?e:wn.event;mX=e.clientX;mY=e.clientY;drg=this;lX=this.offsetLeft;lY=this.offsetTop;
_.e(dc,'mousemove',_.dm);_.e(dc,'mouseup',_.dz);return false;},
 dm:function(e){e=e?e:wn.event;_.s(drg,e.clientX-mX+lX,e.clientY-mY+lY);}, 
 dz:function(e){_.h(drg);drg.droppedOn=_.oxy(e);_.s(drg);if(drg.drp){drg.drp();}_.dx();},
 dx:function(){_.re(dc,'mousemove',_.dm);_.re(dc,'mouseup',_.dz);drg=false;},
 oxy:function(e){e=e?e:wn.event;var so=/Safari|Opera/.test(navigator.userAgent),x=so?e.pageX:e.clientX,y=so?e.pageY:e.clientY;return dc.elementFromPoint(x,y);},
 hv:function(o){o.onmouseover=function(){this.className+=" hover";};o.onmouseout=function(){this.className=this.className.replace(new RegExp(" hover\\b"), "");};},
 rsz:function(){ov.style.width=_.dW()+'px';ov.style.height=_.dH()+'px';},
 ce:function(id,tg){tg=tg||'div';var l=dc.createElement(tg);l.setAttribute('id',id);db.insertBefore(l,db.firstChild);return _.$(id);},
 oc:function(){_.s(ov);_.sp('','hidden',ldMsg);_.pop(75,50);var m=new Image();m.onload=_.ol;m.title=this.title;m.src=this.href;return false;},
 ol:function(){var w=this.width,h=this.height,sc=Math.min(1,(_.wW()-50)/w,(_.wH()-50)/h);w*=sc;h*=sc;
_.sp(this.title,'hidden','<img src="'+this.src+'" width="'+w+'" height="'+h+'">');_.pop(w,h);},
 xp:function(e){_.h(pp);_.h(ov);_.hs(1);},
 hs:function(s){_.all(_.t('SELECT'),function(l){if(s){_.s(l);}else{_.h(l);}});},
 box:function(l,w,h,t){if(!t)t='';if(l.indexOf('http:')===0){_.sp(t,'hidden','<iframe src="'+l+'" width="'+w+'" height="'+h+'"></iframe>');}else{t||_.sp(_.$(l).title,'auto',_.$(l).innerHTML);}_.pop(w,h);},
 sp:function(t,v,n){pp.style.overflow=v;pp.title=t;pp.innerHTML='<div style="text-align:right;font-size:smaller"><button id="uv_px" title="'+xMsg+'" onclick="_.xp();">&times;</button>'+t+'&nbsp;</div>'+n;},
 pop:function(w,h){_.hs();_.s(ov);w=w?parseInt(w,10):640;h=h?parseInt(h+25,10):480;pp.style.width=w+'px';pp.style.height=h+'px';_.s(pp,_.sX()+(_.wW()-w)/2,_.sY()+(_.wH()-h)/2);},
 ani:function(l,p,to,ms){var s=parseInt((ms||500)/20),i=(to-parseFloat(_.gs(l,p)))/s,o=p=='opacity',ao='alpha(opacity=',ls=_.$(l).style,v=setInterval(an,20),px=o?'':'px',c; 
  function an(){var n=parseFloat(_.gs(l,p));if((i<0&&n<=to)||(i>0&&n>=to)){clearInterval(v);if(o){ls.filter=ao+(to*100)+')';}ls[p]=to+px;}else{c=n+i;if(o){ls.filter=ao+(c*100)+')';}ls[p]=c+px;}}},
 ajx:function(u,l){var r,q=Math.random(),x=wn.XMLHttpRequest?new XMLHttpRequest():wn.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):false;
u+=(u.indexOf("?")>0)?"&uq="+q:"?"+q;
x.onreadystatechange=function(){if (x.readyState==4){r=x.responseText;if(l){_.$(l).innerHTML=r;}else{eval(r);}}};
x.open("GET",u,true);x.send(null);return x;},
 go:function(){if(!db){db=dc.body;de=dc.documentElement?dc.documentElement:db; pp=_.ce('uv_pop'); ov=_.ce('uv_ov'); _.all(_.c(toPop,'A'),function(m){m.onclick=_.oc;}); ov.onclick=_.xp;_.rsz(); ov.style.filter='alpha(opacity=70)'; _.e(wn,'resize',_.rsz); _.all(_.c(toDrag),_.dd); _.all(_.c(toHover),function(){_.all(_.t('LI'),_.hv);});if(wn.docReady)docReady();}}
};
}();
if(document.addEventListener){document.addEventListener("DOMContentLoaded",_.go,false);}
else if (document.all)(function(){try{document.documentElement.doScroll("left");}catch(er){setTimeout(arguments.callee,9);return;}_.go();})();
window.onload=_.go; //

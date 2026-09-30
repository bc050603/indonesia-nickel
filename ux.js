// Reading and mobile usability helpers applied after each page render (no data changes).
(function(){
 function enhanceFilters(root){
  root.querySelectorAll('.filters').forEach(function(f){
   if(f.dataset.fx)return;var sels=f.querySelectorAll('select');if(sels.length<2)return;f.dataset.fx='1';f.classList.add('fx-collapsible');
   var b=document.createElement('button');b.type='button';b.className='fx-toggle';
   function label(){var n=[].filter.call(sels,function(s){return s.value}).length;b.textContent=(f.classList.contains('open')?'收起筛选':'筛选条件')+(n?'（已选'+n+'）':'')+(f.classList.contains('open')?' ▴':' ▾')}
   b.onclick=function(){f.classList.toggle('open');label()};sels.forEach(function(s){s.addEventListener('change',label)});label();f.parentNode.insertBefore(b,f);
  });
 }
 function notes(root){root.querySelectorAll('.geo-table .op-note').forEach(function(n){if(!n.title)n.title=n.textContent})}
 function run(){var m=document.getElementById('main');if(m){enhanceFilters(m);notes(m)}}
 var m=document.getElementById('main');if(m&&window.MutationObserver)new MutationObserver(run).observe(m,{childList:true});run();
})();

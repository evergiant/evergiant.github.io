(function(){
  /* EVER brand book v1.0 · 07 Motion & pattern: open-ring E glyphs over hero photos, turning toward the cursor */
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].forEach.call(document.querySelectorAll('.hero,.phero'),function(box){
    var cv=document.createElement('canvas');cv.className='efield';cv.setAttribute('aria-hidden','true');
    var shade=box.querySelector('.shade');if(shade)shade.after(cv);else box.prepend(cv);
    var ctx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),cells=[],tgt=null,raf=0,step=52;
    function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);cells=[];for(var y=step/2;y<H+step;y+=step)for(var x=step/2;x<W+step;x+=step)cells.push({x:x,y:y,a:0,red:Math.random()<.015});go()}
    function g(c){var s=step*.24;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.a);ctx.lineCap='round';ctx.lineWidth=Math.max(1.3,s*.26);ctx.strokeStyle='rgba(141,183,255,.30)';ctx.beginPath();ctx.arc(0,0,s,.66,-.66,false);ctx.stroke();ctx.beginPath();ctx.moveTo(-s*.56,0);ctx.lineTo(s*.35,0);ctx.stroke();if(c.red){ctx.fillStyle='rgba(255,122,102,.9)';ctx.beginPath();ctx.arc(s*.85,0,s*.21,0,7);ctx.fill()}ctx.restore()}
    function draw(){ctx.clearRect(0,0,W,H);var t=performance.now()/1000,mv=false;cells.forEach(function(c){var goal=tgt?Math.atan2(tgt[1]-c.y,tgt[0]-c.x):(reduce?0:Math.sin(t*.5+c.x*.012+c.y*.008)*.16);var d=Math.atan2(Math.sin(goal-c.a),Math.cos(goal-c.a));c.a+=d*(reduce?1:.12);if(Math.abs(d)>.002)mv=true;g(c)});if(!reduce&&(mv||!tgt))raf=requestAnimationFrame(draw)}
    function go(){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)}
    box.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();tgt=[e.clientX-r.left,e.clientY-r.top];go()});
    box.addEventListener('pointerleave',function(){tgt=null;go()});
    if(window.ResizeObserver)new ResizeObserver(size).observe(cv);else size();
    if(window.IntersectionObserver)new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)go();else cancelAnimationFrame(raf)})}).observe(cv);
  });
})();
(function(){
  var site=document.getElementById('site'); if(!site) return;
  var sel=document.getElementById('lang-sel');
  function set(l){
    site.dataset.lang=l;
    document.documentElement.lang=(l==='zh'?'zh-Hant':l);
    if(sel) sel.value=l;
    var opts=document.querySelectorAll('option[data-'+l+']');
    for(var i=0;i<opts.length;i++) opts[i].textContent=opts[i].getAttribute('data-'+l);
    try{localStorage.setItem('et-lang',l)}catch(e){}
  }
  if(sel) sel.addEventListener('change',function(){set(sel.value)});
  var s='en'; try{var v=localStorage.getItem('et-lang'); if(v==='en'||v==='de'||v==='zh'||v==='ja'||v==='th') s=v}catch(e){}
  set(s);

  var f=document.getElementById('f'); if(!f) return;
  var out=document.getElementById('out'), cp=document.getElementById('copy');
  function v(id){var e=document.getElementById(id);return e?(e.value||'').trim():''}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var L={en:['Inquiry','Company: ','Name: ','Country: ','Industry: ','Annual volume: ','Details: ','Please send this text to our sales address.'],
           de:['Anfrage','Firma: ','Name: ','Land: ','Branche: ','Jahresmenge: ','Details: ','Bitte diesen Text an unsere Vertriebsadresse senden.'],
           zh:['詢價','公司：','姓名：','國家：','產業：','年用量：','說明：','請將這段文字寄到我們的業務信箱。'],
           ja:['お問い合わせ','会社名：','氏名：','国：','業界：','年間数量：','詳細：','このテキストを当社の営業窓口メールアドレスへお送りください。'],
           th:['สอบถามข้อมูล','บริษัท: ','ชื่อ: ','ประเทศ: ','อุตสาหกรรม: ','ปริมาณต่อปี: ','รายละเอียด: ','กรุณาส่งข้อความนี้ไปยังอีเมลฝ่ายขายของเรา']}[site.dataset.lang];
    out.textContent=L[0]+'\n'+L[1]+v('q-company')+'\n'+L[2]+v('q-name')+'\nE-mail: '+v('q-mail')+'\n'+L[3]+v('q-country')+'\n'+L[4]+v('q-ind')+'\n'+L[5]+v('q-vol')+'\n'+L[6]+v('q-msg')+'\n\n'+L[7];
    out.hidden=false; if(cp) cp.hidden=false;
  });
  if(cp) cp.addEventListener('click',function(){
    function sel(){var r=document.createRange();r.selectNodeContents(out);var s=getSelection();s.removeAllRanges();s.addRange(r)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(out.textContent).then(function(){cp.style.borderColor='var(--blue)'},sel)}else sel();
  });
})();

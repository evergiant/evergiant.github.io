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

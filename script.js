(function(){
var ZAP='5531994852563',$=function(i){return document.getElementById(i)};
/* abertura */
var ab=$('abertura');
function abrir(){ab.classList.add('open');document.body.style.overflow='';}
document.body.style.overflow='hidden';ab.addEventListener('click',abrir);
$('irConf').addEventListener('click',function(){$('confirmar').scrollIntoView({behavior:'smooth'});});
/* contagem */
var alvo=new Date(2026,11,13,12,0,0);
function tick(){var t=alvo-new Date();if(t<=0){['d','h','m','s'].forEach(function(k){$(k).textContent='0'});$('cdmsg').textContent='Hoje é o grande dia! 🎉';return;}
var p=function(n){return String(n).padStart(2,'0')};
$('d').textContent=Math.floor(t/864e5);$('h').textContent=p(Math.floor(t%864e5/36e5));$('m').textContent=p(Math.floor(t%36e5/6e4));$('s').textContent=p(Math.floor(t%6e4/1e3));}
tick();setInterval(tick,1000);
/* máscara telefone */
$('tel').addEventListener('input',function(){var v=this.value.replace(/\D/g,'').slice(0,11),r=v;
if(v.length>2)r='('+v.slice(0,2)+') '+v.slice(2);if(v.length>7)r='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);this.value=r;});
/* alternância */
var acomp=false;
function setAcomp(v){acomp=v;$('tgSim').setAttribute('aria-pressed',v);$('tgNao').setAttribute('aria-pressed',!v);$('blocoQtd').classList.toggle('show',v);}
$('tgSim').onclick=function(){setAcomp(true)};$('tgNao').onclick=function(){setAcomp(false)};
document.querySelectorAll('input[name=pres]').forEach(function(r){r.addEventListener('change',function(){
 var sim=r.value==='sim'&&r.checked;$('blocoAcomp').classList.toggle('show',sim);if(!sim)setAcomp(false);$('fPres').classList.remove('bad');});});
/* campos dinâmicos */
function montaLista(){var n=parseInt($('qtd').value,10),box=$('lista');
 if(!(n>=1))n=0;n=Math.min(n,10);var atual=box.children.length;
 while(atual<n){var d=document.createElement('div');d.className='f guest';d.innerHTML='<label>Acompanhante '+(atual+1)+'</label><input type="text" autocomplete="off" placeholder="Nome completo"><div class="msg">Informe nome e sobrenome.</div>';box.appendChild(d);atual++;}
 while(atual>n){box.removeChild(box.lastChild);atual--;}}
$('qtd').addEventListener('input',montaLista);
/* validação */
function nomeOk(s){return s.trim().split(/\s+/).filter(function(x){return x.length>1}).length>=2}
function marca(el,ok){el.classList.toggle('bad',!ok);el.classList.toggle('ok',ok);return ok}
$('nome').addEventListener('input',function(){marca($('fNome'),nomeOk(this.value))});
$('tel').addEventListener('input',function(){marca($('fTel'),this.value.replace(/\D/g,'').length>=10)});
$('lista').addEventListener('input',function(e){var f=e.target.closest('.f');if(f)marca(f,nomeOk(e.target.value))});
function validar(){var ok=true,primeiro=null;
 function chk(el,c){if(!marca(el,c)){ok=false;if(!primeiro)primeiro=el;}}
 chk($('fNome'),nomeOk($('nome').value));
 chk($('fTel'),$('tel').value.replace(/\D/g,'').length>=10);
 var pr=document.querySelector('input[name=pres]:checked');
 if(!pr){$('fPres').classList.add('bad');ok=false;if(!primeiro)primeiro=$('fPres');}
 if(pr&&pr.value==='sim'&&acomp){var n=parseInt($('qtd').value,10);chk($('fQtd'),n>=1&&n<=10);
  if(n>=1&&n<=10)document.querySelectorAll('#lista .f').forEach(function(g){chk(g,nomeOk(g.querySelector('input').value))});}
 if(primeiro)primeiro.scrollIntoView({behavior:'smooth',block:'center'});
 return ok;}
/* mensagem */
function mensagem(){var nome=$('nome').value.trim().replace(/\s+/g,' '),tel=$('tel').value,pr=document.querySelector('input[name=pres]:checked').value,m;
 if(pr==='nao'){
  m='🎀 CONFIRMAÇÃO DE PRESENÇA — 18 ANOS DA CAROL\n\nResponsável: '+nome+'\nTelefone: '+tel+'\nPresença: Infelizmente não poderei comparecer. 💔\n\nMas desejo uma linda festa e muita felicidade! 🎂';
 }else{var nomes=[];if(acomp)document.querySelectorAll('#lista input').forEach(function(i){nomes.push(i.value.trim().replace(/\s+/g,' '))});
  var tot=1+nomes.length;
  m='🎀 CONFIRMAÇÃO DE PRESENÇA — 18 ANOS DA CAROL\n\nResponsável: '+nome+'\nTelefone: '+tel+'\nPresença: Confirmada! 💗\n\nAcompanhantes:'+(nomes.length?'\n'+nomes.map(function(x,i){return (i+1)+'. '+x}).join('\n'):' Nenhum')+'\n\nTotal de convidados: '+tot+(tot>1?' pessoas.':' pessoa.')+'\nNos vemos na festa! 🎂';}
 return 'https://wa.me/'+ZAP+'?text='+encodeURIComponent(m);}
/* confete */
function confete(){var c=['🌸','✨','💗','⭐','🎀'];for(var i=0;i<26;i++){var e=document.createElement('span');e.className='confete';e.textContent=c[i%c.length];
 e.style.left=Math.random()*100+'vw';e.style.fontSize=(14+Math.random()*16)+'px';e.style.setProperty('--dx',(Math.random()*80-40)+'px');e.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(e);setTimeout(function(x){x.remove()},4000,e);}}
/* envio */
$('form').addEventListener('submit',function(ev){ev.preventDefault();
 if(!validar())return;
 var url=mensagem();$('manual').href=url;
 $('form').style.display='none';$('ok').classList.add('show');$('ok').scrollIntoView({behavior:'smooth',block:'center'});confete();
 setTimeout(function(){window.open(url,'_blank','noopener')||(location.href=url);},1800);});
})();
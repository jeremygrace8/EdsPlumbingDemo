const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
navigation?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
const headerContact=document.querySelector('.header-contact');
const phoneAgent=navigator.userAgent||'';
const phoneDevice=!/iPad|Tablet/i.test(phoneAgent)&&(navigator.userAgentData?.mobile===true||/iPhone|iPod|Android.*Mobile|Windows Phone/i.test(phoneAgent));
if(headerContact&&phoneDevice){headerContact.href=headerContact.dataset.phone;headerContact.setAttribute('aria-label','Call All Chicagoland at (630) 663-1444')}
headerContact?.addEventListener('click',closeMenu);
const form=document.querySelector('#service-request');
form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const body=`Hello Ed’s Plumbing & Sewer,\n\nI would like to discuss ${d.get('service')}.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nTown: ${d.get('town')}\n\nDetails:\n${d.get('details')}\n\nPlease contact me to arrange service. I understand this is an inquiry and my appointment is not confirmed.`;window.location.href=`mailto:contact@thegreatestplumber.com?subject=${encodeURIComponent('Service inquiry: '+d.get('service'))}&body=${encodeURIComponent(body)}`;const status=document.querySelector('#form-status');status.hidden=false;status.textContent='Your email app will open with your request. Review it and press Send there. If it does not open, call Chicagoland at (630) 663-1444, or email contact@thegreatestplumber.com.'});

const homeServiceSection=document.querySelector('.home-services#services');
const homeAreaSection=homeServiceSection&&document.querySelector('#service-area');
if(navigation&&homeServiceSection&&homeAreaSection){
  const sections=[homeServiceSection,homeAreaSection];
  const sectionLinks=Array.from(navigation.querySelectorAll('a'));
  let navigationFrame=0;
  function updateSectionNavigation(){
    navigationFrame=0;
    const marker=(document.querySelector('.site-header')?.getBoundingClientRect().bottom||0)+Math.min(150,window.innerHeight*.2);
    let current='';
    for(const section of sections){if(section.getBoundingClientRect().top<=marker)current=section.id}
    for(const link of sectionLinks){
      const active=current?new URL(link.href,document.baseURI).hash==='#'+current:link.classList.contains('nav-home');
      if(active){link.setAttribute('aria-current',current?'location':'page')}
      else{link.removeAttribute('aria-current')}
    }
  }
  function queueSectionNavigation(){if(!navigationFrame)navigationFrame=requestAnimationFrame(updateSectionNavigation)}
  window.addEventListener('scroll',queueSectionNavigation,{passive:true});
  window.addEventListener('resize',queueSectionNavigation);
  window.addEventListener('hashchange',queueSectionNavigation);
  window.addEventListener('pageshow',queueSectionNavigation);
  window.addEventListener('load',queueSectionNavigation);
  queueSectionNavigation();
}

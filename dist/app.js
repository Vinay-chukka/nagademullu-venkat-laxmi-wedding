const app = document.querySelector('#app');
const params = new URLSearchParams(location.search);
let language = params.get('lang') === 'te' ? 'te' : 'en';
let openingActive = !location.hash;
let stopNavigationTracking;
let revealObserver;
let headerObserver;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const format = (date, options) => new Intl.DateTimeFormat(language === 'te' ? 'te-IN' : 'en-IN', {...options,timeZone:'Asia/Kolkata'}).format(new Date(date));
const fullDate = date => format(date,{day:'numeric',month:'long',year:'numeric'});
const wedding = {
  date:'2026-12-03T12:00:00+05:30',
  muhurtham:'2026-12-04T04:42:00+05:30',
  cover:'assets/sacred-hero.webp',
  mapUrl:'https://maps.app.goo.gl/GWoBxyeWSPseT3Ud6',
  gallery:['assets/gallery-couple.webp','assets/sacred-hands.webp','assets/gallery-mandap.webp','assets/gallery-family-corrected.webp','assets/gallery-portrait.webp','assets/pelli-kuturu.webp','assets/sacred-lamps.webp','assets/kalash.webp'],
  en:{
    names:['Nagademullu','Venkat Laxmi'],
    invitation:'Together with our families, we warmly invite you to celebrate our wedding and bless our new beginning.',
    groomFamily:'Son of Sri RajuBabu & Smt. Rajulamma',
    brideFamily:'Daughter of Sri Ramunaidu & Smt. Satyavathi',
    muhurthamNote:'Celebrations on 3 December. Wedding muhurtham at 4:42 AM on 4 December, the following morning. All times are IST.',
    venue:'Near the groom’s home',
    address:'Burugupalem, Tattabanda · Andhra Pradesh, India',
    venueNote:'Join us for the feast at 7:00 PM on 3 December and the wedding muhurtham at 4:42 AM the following morning, at the same venue.',
    galleryCaptions:['Illustration of the wedding couple under jasmine garlands','Wedding-inspired illustration of joined hands','Illustration of a floral wedding mandap','Illustration of the couple and their families','Illustrated wedding couple portrait','Illustration of a traditional turmeric ceremony','Illustration of glowing ceremonial lamps','Illustration of a decorated wedding kalash'],
    events:[
      {title:'Pelli Kuturu',date:'2026-11-29T09:00:00+05:30',time:'9:00 AM'},
      {title:'Pradhanam',date:'2026-11-29T11:16:00+05:30',time:'11:16 AM – 12:00 PM'},
      {title:'Bridal Rituals',date:'2026-12-03T08:00:00+05:30',time:'Morning'},
      {title:'Wedding Feast',date:'2026-12-03T19:00:00+05:30',time:'7:00 PM'},
      {title:'Wedding Muhurtham',date:'2026-12-04T04:42:00+05:30',time:'4:42 AM',main:true},
    ]
  },
  te:{
    names:['నాగదెమ్ములు','వేంకట లక్ష్మి'],
    invitation:'మా కుటుంబ సభ్యులతో కలిసి మా వివాహ మహోత్సవానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము. మీరు విచ్చేసి వధూవరులను ఆశీర్వదించ ప్రార్థన.',
    groomFamily:'శ్రీ రాజుబాబు గారు, శ్రీమతి రాజులమ్మ గార్ల కుమారుడు',
    brideFamily:'శ్రీ రామునాయుడు గారు, శ్రీమతి సత్యవతి గార్ల కుమార్తె',
    muhurthamNote:'డిసెంబర్ 3 రాత్రి వేడుకలు, తెల్లవారితే డిసెంబర్ 4 ఉదయం 4:42 గంటలకు వివాహ ముహూర్తం. సమయాలన్నీ భారత కాలమానం ప్రకారం.',
    venue:'వరుడి ఇంటి సమీపంలో',
    address:'బూరుగుపాలెం, తట్టబంద · ఆంధ్రప్రదేశ్, భారతదేశం',
    venueNote:'డిసెంబర్ 3 రాత్రి 7:00 గంటలకు విందు, తెల్లవారితే డిసెంబర్ 4 ఉదయం 4:42 గంటలకు వివాహం ఒకే వేదికలో జరుగుతాయి.',
    galleryCaptions:['మల్లెపూల మధ్య వధూవరుల ఊహాచిత్రం','వధూవరులు చేతులు కలిపిన ఊహాచిత్రం','పూలతో అలంకరించిన వివాహ మండపం చిత్రం','కుటుంబ సభ్యులతో వధూవరుల ఊహాచిత్రం','వధూవరుల చిరునవ్వుల ఊహాచిత్రం','పసుపు వేడుక చిత్రం','వెలుగుతున్న ప్రమిదల చిత్రం','అలంకరించిన వివాహ కలశం చిత్రం'],
    events:[
      {title:'పెళ్లికూతురు వేడుక',date:'2026-11-29T09:00:00+05:30',time:'ఉదయం 9:00'},
      {title:'ప్రధానం',date:'2026-11-29T11:16:00+05:30',time:'ఉ. 11:16 – మ. 12:00'},
      {title:'వధువు అలంకరణ',date:'2026-12-03T08:00:00+05:30',time:'ఉదయం'},
      {title:'వివాహ విందు',date:'2026-12-03T19:00:00+05:30',time:'రాత్రి 7:00'},
      {title:'వివాహ ముహూర్తం',date:'2026-12-04T04:42:00+05:30',time:'ఉదయం 4:42',main:true},
    ]
  }
};
function updateCountdown() {
  const clock = document.querySelector('#clock');
  if (!clock) return;
  const seconds = Math.max(0, Math.ceil((Date.parse(wedding.muhurtham)-Date.now())/1000));
  const values = [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  const labels = language==='te'?['రోజులు','గంటలు','నిమిషాలు','సెకన్లు']:['Days','Hours','Minutes','Seconds'];
  if (!seconds) {
    clock.innerHTML='<p>'+ (language==='te'?'మీ ఆశీర్వాదాలకు ధన్యవాదాలు':'Thank you for your blessings')+'</p>';
    return;
  }
  clock.innerHTML=values.map((value,index)=>'<div><strong>'+String(value).padStart(2,'0')+'</strong><span>'+labels[index]+'</span></div>').join('');
}
function sizeInvitationHeader() {
  headerObserver?.disconnect();
  const header=app.querySelector('.sacred-header');
  const measure=()=>document.documentElement.style.setProperty('--invitation-header-height',header.getBoundingClientRect().height+'px');
  measure();
  headerObserver=new ResizeObserver(measure);
  headerObserver.observe(header);
}
function animateSections() {
  revealObserver?.disconnect();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      if(!entry.target.classList.contains('event-rise'))revealObserver.unobserve(entry.target);
    } else if(entry.boundingClientRect.top>window.innerHeight){
      entry.target.classList.remove('revealed');
    }
  }),{threshold:.12,rootMargin:'0px 0px -24px 0px'});
  app.querySelectorAll('.sacred-heading,.sacred-events article,.sacred-gallery,.sacred-venue,.family-blessings').forEach(element=>{
    element.classList.add('reveal');
    if(element.matches('.sacred-events article'))element.classList.add('event-rise');
    revealObserver.observe(element);
  });
}
renderSacredWedding();
setInterval(updateCountdown,1000);

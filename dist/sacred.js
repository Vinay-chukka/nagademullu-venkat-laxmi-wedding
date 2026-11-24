function renderSacredWedding() {
  const copy = wedding[language];
  const te = language === 'te';
  const ui = te ? {
    brand:'మా వివాహం', home:'ముఖపుట', events:'వేడుకలు', gallery:'చిత్రమాలిక', venue:'వేదిక',
    heading:'వివాహ ఆహ్వానం', all:'అన్ని నమూనాలు', open:'ఆహ్వానం తెరవండి', skip:'నేరుగా చూడండి',
    eventTitle:'వివాహ వేడుకలు', galleryTitle:'చిత్రమాలిక', more:'పూర్తి చిత్రమాలిక',
    venueTitle:'వేదిక మరియు ప్రదేశం', maps:'గూగుల్ మ్యాప్స్‌లో లొకేషన్ తెరవండి',
    footer:'మా కుటుంబాల ఆశీర్వాదాలతో, మా ప్రత్యేక రోజులో భాగమవ్వాలని మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.',
    close:'మూసివేయండి'
  } : {
    brand:'Our Wedding', home:'Home', events:'Events', gallery:'Gallery', venue:'Venue',
    heading:'The Wedding of',all:'All designs',open:'Open invitation',skip:'Skip opening',
    eventTitle:'Wedding Events',galleryTitle:'Gallery',more:'View Full Gallery',
    venueTitle:'Venue & Location',maps:'Open location in Google Maps',
    footer:'With the blessings of our families, we invite you to be a part of our special day.',
    close:'Close'
  };
  const names = copy.names.map(escapeHTML);
  const nav = ['home','events','gallery','venue'];
  const illustration = (kind, className='') => {
    const drawings = {
      lotus: '<path d="M32 48C17 39 19 25 32 13c13 12 15 26 0 35Z"/><path d="M32 48C16 48 8 38 8 25c15 0 24 8 24 23Zm0 0c16 0 24-10 24-23-15 0-24 8-24 23Z"/><path d="M13 49c9 7 29 7 38 0M22 57h20"/>',
      leaves: '<path d="M8 48c18-1 32-12 48-35"/><path d="M19 44C9 42 9 34 9 34c10-2 14 2 10 10Zm8-5c-9-4-8-13-8-13 10 1 12 6 8 13Zm9-8c-8-6-5-14-5-14 9 3 11 8 5 14Zm8-9c-3-10 4-16 4-16 6 8 4 13-4 16ZM23 42c3 8 12 7 16 2-7-6-11-6-16-2Zm11-9c4 7 13 4 16-2-8-4-12-3-16 2Zm10-12c8 3 13-4 14-10-9-1-13 2-14 10Z"/>',
      kalash: '<path d="M20 29h24l3 19c-1 9-29 9-30 0l3-19Zm-2-5h28v5H18Z"/><path d="M32 24c-10-8-5-17 0-20 5 3 10 12 0 20Z"/><path d="M28 22C13 23 12 12 12 12c12-1 16 4 16 10Zm8 0c15 1 16-10 16-10-12-1-16 4-16 10Z"/><path d="M20 41h24M23 47h18"/>',
      bowl: '<path d="M8 30c1 17 12 24 24 24s23-7 24-24H8Z"/><ellipse cx="32" cy="30" rx="24" ry="6"/><path d="M19 26c3-10 23-10 26 0M26 21l3-6m4 5 3-7m3 9 4-5M24 57h16"/>',
      music: '<path d="M23 43V15l27-7v28M23 23l27-7"/><ellipse cx="16" cy="46" rx="8" ry="6"/><ellipse cx="43" cy="39" rx="8" ry="6"/><path d="M8 14v10m-5-5h10"/>',
      fire: '<path d="M22 42c-14-13 2-21 3-31 6 7 7 11 5 17 9-5 11-15 10-23 17 19 18 31 5 38"/><path d="M30 42c-7-7 0-12 3-17 0 7 10 9 4 17M14 44h36v7H14Zm-4 8h44v6H10Z"/>',
      feast: '<ellipse cx="32" cy="43" rx="26" ry="12"/><path d="M7 43c4 16 46 16 50 0"/><circle cx="22" cy="39" r="6"/><circle cx="36" cy="39" r="6"/><circle cx="29" cy="29" r="6"/><path d="M16 18c-4-4 4-5 0-9m14 6c-4-4 4-5 0-9m13 12c-4-4 4-5 0-9"/>'
    };
    return '<svg class="wedding-illustration '+className+'" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+drawings[kind]+'</svg>';
  };
  const floral = '<span class="sacred-ornament botanical-divider" aria-hidden="true"><span></span>'+illustration('lotus')+'<span></span></span>';
  const title = text => '<div class="sacred-heading"><h2>'+text+'</h2>'+floral+'</div>';
  const icons = ['kalash','bowl','leaves','feast','fire','lotus'];
  const weekday = format(wedding.date,{weekday:'long'});
  document.documentElement.lang=language;
  document.body.className='sacred';
  document.title=copy.names.join(' & ')+' · '+ui.brand;
  app.innerHTML=`
    <header class="sacred-header">
      <a class="sacred-brand" href="#home" aria-label="${ui.home}">${illustration('lotus','brand-lotus')} ${ui.brand}</a>
      <nav id="sacred-navigation" aria-label="${ui.brand}">${nav.map(id=>`<a href="#${id}">${ui[id]}</a>`).join('')}</nav>
      <button class="sacred-language" lang="${te?'en':'te'}">${te?'English':'తెలుగు'}</button>
    </header>
    <section class="sacred-hero" id="home">
      <img class="sacred-hero-image" src="${wedding.cover}" alt="" fetchpriority="high">
      <div class="sacred-hero-copy">
        <div class="sacred-symbol">${illustration('lotus')}</div>
        <p>${ui.heading}</p>
        <h1 tabindex="-1">${names[0]}<span>&amp;</span>${names[1]}</h1>
        ${floral}
        <p class="sacred-date">${fullDate(wedding.date)}</p><p class="sacred-weekday">${weekday}</p>
        ${floral}
      </div>
    </section>
    <div class="invitation-welcome">
      <p class="welcome-line">${escapeHTML(copy.invitation)}</p>
      <div class="family-blessings"><p><strong>${names[0]}</strong><span>${copy.groomFamily}</span></p><i aria-hidden="true">&amp;</i><p><strong>${names[1]}</strong><span>${copy.brideFamily}</span></p></div>
      <div class="wedding-countdown"><p>${te?'వివాహ ముహూర్తానికి మిగిలిన సమయం':'Counting down to the wedding muhurtham'}</p><div id="clock" class="clock"></div></div>
      <p class="muhurtham-note">${copy.muhurthamNote}</p>
      <a class="sacred-button" href="${te?'wedding-te.ics':'wedding.ics'}" download>${te?'తేదీని గుర్తుంచుకోండి':'Save the date'}</a>
    </div>
    <section class="sacred-section" id="events">${title(ui.eventTitle)}
      <div class="sacred-events">${copy.events.map((event,index)=>`<article class="${event.main?'wedding-event':''}"><span class="event-icon" aria-hidden="true">${illustration(icons[index % icons.length])}</span>
      <h3>${escapeHTML(event.title)}</h3><div class="event-schedule"><p>${format(event.date,{day:'2-digit',month:'short',year:'numeric'})}</p><time datetime="${event.time === '' || event.time === 'Morning' || event.time === 'ఉదయం' ? event.date.slice(0,10) : event.date}">${escapeHTML(event.time)}</time></div></article>`).join('')}</div>
    </section>
    <section class="sacred-section" id="gallery">${title(ui.galleryTitle)}<p class="gallery-intro">${te?'వివాహ వేడుకల స్ఫూర్తితో రూపొందించిన చిత్రాలు':'Wedding-inspired illustrations'}</p>
      <div class="sacred-gallery" tabindex="0" aria-label="${ui.galleryTitle}">${wedding.gallery.map((src,index)=>`<button data-photo="${index}" aria-label="${te?'చిత్రాన్ని పెద్దగా చూడండి':'Enlarge image'} ${index+1}"><img src="${src}" alt="${escapeHTML(copy.galleryCaptions[index])}" loading="lazy"></button>`).join('')}</div>
      <div class="sacred-gallery-dots" aria-label="${ui.galleryTitle}">${wedding.gallery.slice(0,Math.max(1,wedding.gallery.length-1)).map((_,i)=>'<button data-slide="'+i+'" aria-label="'+ui.gallery+' '+(i+1)+'" aria-pressed="'+(i===0)+'"></button>').join('')}</div><button class="sacred-button outline" id="full-gallery">${ui.more}</button>
    </section>
    <section class="sacred-section" id="venue">${title(ui.venueTitle)}
      <div class="sacred-venue"><div class="venue-map-panel"><div id="venue-map-content" aria-label="${te?'వివాహ వేదిక పటం':'Wedding venue map'}"></div><p id="venue-map-fallback">${te?'వేదికను చూడటానికి గూగుల్ మ్యాప్స్‌లో చూడండి నొక్కండి.':'Open Google Maps to see the shared venue location.'}</p><div id="venue-map-controls" hidden><button type="button" data-map-zoom="1" aria-label="${te?'పెద్దగా చూడండి':'Zoom in'}">+</button><button type="button" data-map-zoom="-1" aria-label="${te?'చిన్నగా చూడండి':'Zoom out'}">−</button></div></div>
      <div><h3>${escapeHTML(copy.venue)}</h3><p>${escapeHTML(copy.address)}</p><p class="venue-note">${copy.venueNote}</p>
      <a class="sacred-button outline" href="${escapeHTML(wedding.mapUrl)}" target="_blank" rel="noopener noreferrer">${ui.maps}</a></div></div>
    </section>
    <footer class="sacred-footer">${floral}<p>${ui.footer}</p><small>${names.join(' &amp; ')} · ${fullDate(wedding.date)}</small><a class="pageorigin-credit" href="https://pageorigin.in" target="_blank" rel="noopener noreferrer" lang="en">Made by <strong>PageOrigin</strong></a></footer>
    <dialog class="sacred-dialog" aria-label="${ui.galleryTitle}"><button class="dialog-close" autofocus>${ui.close}</button><div class="dialog-content"></div></dialog>
    ${openingActive?`<div class="sacred-opening"><div class="opening-border"></div><div class="sacred-opening-copy">${floral}<p>${ui.heading}</p><h2>${names[0]} <i>&amp;</i> ${names[1]}</h2><p>${fullDate(wedding.date)}</p><button class="sacred-button" id="sacred-open">${ui.open}</button><button class="sacred-skip">${ui.skip}</button></div></div>`:''}`;
  app.querySelector('.venue-map-panel').setAttribute('aria-label',te?'బూరుగుపాలెం వివాహ వేదిక పటం':'Burugupalem wedding venue map');
  const galleryStrip=app.querySelector('.sacred-gallery');
  const slideButtons=[...app.querySelectorAll('[data-slide]')];
  slideButtons.forEach(button=>button.onclick=()=>{
    const photo=galleryStrip.children[Number(button.dataset.slide)];
    galleryStrip.scrollTo({left:photo.offsetLeft-galleryStrip.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  galleryStrip.addEventListener('scroll',()=>{
    const width=galleryStrip.children[0].getBoundingClientRect().width+parseFloat(getComputedStyle(galleryStrip).gap);
    const active=Math.round(galleryStrip.scrollLeft/width);
    slideButtons.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===active)));
  },{passive:true});
  const dialog=app.querySelector('dialog');
  const dialogContent=dialog.querySelector('.dialog-content');
  dialog.querySelector('.dialog-close').onclick=()=>dialog.close();
  dialog.onclick=event=>{if(event.target===dialog)dialog.close()};
  const showPhoto=index=>{
    dialog.classList.add('photo-viewer');
    dialogContent.innerHTML=`<img src="${wedding.gallery[index]}" alt="${escapeHTML(copy.galleryCaptions[index])}">`;
    if(!dialog.open)dialog.showModal();
  };
  app.querySelectorAll('[data-photo]').forEach(button=>button.onclick=()=>showPhoto(Number(button.dataset.photo)));
  app.querySelector('#full-gallery').onclick=()=>{
    dialog.classList.remove('photo-viewer');
    dialogContent.innerHTML='<h2>'+ui.galleryTitle+'</h2><div class="dialog-gallery">'+wedding.gallery.map((src,index)=>'<button type="button" data-full-photo="'+index+'"><img src="'+src+'" alt="'+escapeHTML(copy.galleryCaptions[index])+'"></button>').join('')+'</div>';
    dialog.showModal();
    dialogContent.querySelectorAll('[data-full-photo]').forEach(button=>button.onclick=()=>showPhoto(Number(button.dataset.fullPhoto)));
  };
  app.querySelector('.sacred-language').onclick=()=>{
    language=te?'en':'te';params.set('lang',language);
    history.replaceState(null,'','?'+params+location.hash);
    renderSacredWedding();
  };
  const opening=app.querySelector('.sacred-opening');
  if(opening){
    let openingFinished=false;
    document.body.classList.add('sacred-locked');
    [...app.children].filter(el=>el!==opening).forEach(el=>el.inert=true);
    const finish=()=>{
      if(openingFinished)return;openingFinished=true;
      opening.remove();openingActive=false;document.body.classList.remove('sacred-locked');
      [...app.children].forEach(el=>el.inert=false);
      app.querySelector('h1').focus({preventScroll:true});
    };
    app.querySelector('#sacred-open').onclick=()=>{
      opening.classList.add('unseal');
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)finish();
      else setTimeout(finish,850);
    };
    app.querySelector('.sacred-skip').onclick=finish;
  }
  stopNavigationTracking?.();
  let queued=0;
  const controller=new AbortController();
  const update=()=>{
    queued=0;let current='home';
    const boundary=app.querySelector('.sacred-header').getBoundingClientRect().height+80;
    nav.forEach(id=>{if(app.querySelector('#'+id).getBoundingClientRect().top<=boundary)current=id});
    app.querySelectorAll('.sacred-header nav a').forEach(a=>{
      if(a.hash==='#'+current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });
  };
  const schedule=()=>{if(!queued)queued=requestAnimationFrame(update)};
  window.addEventListener('scroll',schedule,{passive:true,signal:controller.signal});
  stopNavigationTracking=()=>{controller.abort();cancelAnimationFrame(queued)};
  update();
  updateCountdown();
  animateSections();
  initializeVenueMap();
  sizeInvitationHeader();
}

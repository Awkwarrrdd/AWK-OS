// Portable Wii Pointer by WyfiXP, also known as @Wyfi10 on websim.com
// It creates its own cursor element, hides native cursors, handles iframe mapping, rotation animation and idle return.

(function(){
  const DATA_URI = "data:image/png;base64,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";

  // Create cursor element
  const el = document.createElement('div');
  el.id = 'wiipointer-cursor';
  Object.assign(el.style, {
    position: 'fixed', width: '96px', height: '96px',
    pointerEvents: 'none', zIndex: '2147483647',
    backgroundImage: `url(${DATA_URI})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
    transformOrigin: '25px 3px', transition: 'transform 100ms linear',
  });
  document.documentElement.appendChild(el);

  // Hide native cursors robustly
  const hideNative = () => {
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    Array.from(document.styleSheets || []).forEach(s => {
      try {
        s.insertRule('* { cursor: none !important; }', s.cssRules.length);
      } catch(e){}
    });  
    // also observe future iframes and documents
  };
  hideNative();

  // Rotation/idle logic
  let prevx = 0, cursorrot = 0, returning = false, idleTimer = null, rafId = null;
  const IDLE_MS = 100;
  function apply() { el.style.transform = `rotate(${cursorrot}deg)`; }
  function animateReturn() {
    if (!returning) return;
    cursorrot += (0 - cursorrot) * 0.18;
    if (Math.abs(cursorrot) < 0.25) cursorrot = 0;
    apply();
    if (cursorrot === 0) { returning = false; cancelAnimationFrame(rafId); rafId = null; }
    else rafId = requestAnimationFrame(animateReturn);
  }
  function startIdle() { if (idleTimer) clearTimeout(idleTimer); idleTimer = setTimeout(()=>{ returning=true; if(!rafId) animateReturn(); }, IDLE_MS); }
  function resetIdle(){ if (idleTimer) clearTimeout(idleTimer); idleTimer=null; if(returning){ returning=false; if(rafId){ cancelAnimationFrame(rafId); rafId=null; } } startIdle(); }

  // Movement handlers that map iframe coords to viewport
  function moveTo(clientX, clientY){
    el.style.left = (clientX - 17) + 'px';
    el.style.top  = (clientY - 2) + 'px';
  }

  function onMouseMove(e){
    resetIdle();
    moveTo(e.clientX, e.clientY);
    const normalized = e.clientX / window.innerWidth;
    const delta = Math.min(((normalized - prevx) * 304), 10);
    cursorrot = Math.max(Math.min(cursorrot + delta, 45), -45);
    prevx = normalized;
    apply();
  }

  // Attach to top-level and any same-origin iframes
  window.addEventListener('mousemove', onMouseMove, { passive:true });
  function attachToIframe(ifr){
    try {
      if (!ifr.contentWindow) return;
      ifr.contentWindow.addEventListener('mousemove', function(e){
        resetIdle();
        const rect = ifr.getBoundingClientRect();
        const cx = rect.left + e.clientX;
        const cy = rect.top + e.clientY;
        moveTo(cx, cy);
        const normalized = (rect.left + e.clientX) / window.innerWidth;
        const delta = Math.min(((normalized - prevx) * 304), 10);
        cursorrot = Math.max(Math.min(cursorrot + delta, 45), -45);
        prevx = normalized;
        apply();
      }, { passive:true });
      // hide iframe's internal cursor if same-origin
      try {
        const doc = ifr.contentDocument || ifr.contentWindow.document;
        if (doc && doc.documentElement) doc.documentElement.style.cursor = 'none';
        const style = doc.createElement('style');
        style.textContent = '* { cursor: none !important; }';
        doc.head && doc.head.appendChild(style);
      } catch(e){}
    } catch(e){}
  }

  function scanIframes(){
    document.querySelectorAll('iframe').forEach(attachToIframe);
  }
  scanIframes();
  // watch for new iframes
  const mo = new MutationObserver(scanIframes);
  mo.observe(document.documentElement || document, { childList:true, subtree:true });

  // Start idle timer initially
  startIdle();

  // Expose a minimal API to allow toggling or removal if needed
  window.wiipointer = {
    element: el,
    destroy: function(){
      window.removeEventListener('mousemove', onMouseMove);
      mo.disconnect();
      try { el.remove(); } catch(e){}
      // restore cursor
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    }
  };

  // Auto-init complete
})();
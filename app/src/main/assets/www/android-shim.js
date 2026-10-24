/* Puente Android: descargas, impresión y pantalla completa dentro del WebView. */
(function () {
  var B = window.AndroidBridge;
  if (!B) return;

  function toBase64(blob) {
    return new Promise(function (ok, fail) {
      var r = new FileReader();
      r.onload = function () { var s = String(r.result); ok(s.slice(s.indexOf(',') + 1)); };
      r.onerror = fail;
      r.readAsDataURL(blob);
    });
  }

  /* Descargas: <a download href="blob:..."> se envía al guardado nativo */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[download]') : null;
    if (!a || !a.href) return;
    e.preventDefault();
    e.stopPropagation();
    var name = a.getAttribute('download') || 'archivo.json';
    fetch(a.href)
      .then(function (r) { return r.blob(); })
      .then(function (blob) {
        return toBase64(blob).then(function (data) {
          B.saveFile(name, blob.type || 'application/octet-stream', data);
        });
      })
      .catch(function () { alert('No se pudo preparar el archivo para guardarlo.'); });
  }, true);

  /* Imprimir -> servicio de impresión de Android */
  window.print = function () { B.print(); };

  /* Estado de pantalla completa notificado por la parte nativa */
  window.leaFsChanged = function (on) {
    window.__leaFs = !!on;
    document.dispatchEvent(new Event('fullscreenchange'));
  };
  window.leaFsChanged(B.isFullscreen());
})();

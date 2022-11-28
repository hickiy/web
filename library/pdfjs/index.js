import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
function renderPdf(pdfPath) {
  // Will be using promises to load document, pages and misc data instead of
  // callback.
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  loadingTask.promise
    .then(function (doc) {
      return doc.getPage(1);
    })
    .then((page) => {
      const scale = 1;
      const viewport = page.getViewport({ scale });
      const outputScale = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + 'px';
      canvas.style.height = Math.floor(viewport.height) + 'px';
      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
      const renderContext = {
        canvasContext: context,
        transform,
        viewport
      };
      page.render(renderContext);
      window.setTimeout(() => {
        this.src = canvas.toDataURL();
      }, 1000);
    })
    .catch((err) => {
      console.error('Error: ' + err);
    });
}

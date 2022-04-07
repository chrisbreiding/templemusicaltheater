function renderResumeToCanvas (resumePath) {
  const canvas = document.getElementById('resume-canvas');
  const canvasWrapper = document.getElementById('resume-wrapper');

  getFirstPdfPage().then((page) => {
    renderPageToCanvas(page);

    window.addEventListener('resize', debounce({
      onStart () {
        canvas.style.visibility = 'hidden';
      },
      onEnd () {
        renderPageToCanvas(page);
        canvas.style.visibility = 'visible';
      },
    }))
  });

  function getFirstPdfPage () {
    return pdfjsLib.getDocument(resumePath).promise.then((pdf) => pdf.getPage(1))
  }

  function renderPageToCanvas (page) {
    const originalViewport = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: canvasWrapper.clientWidth / originalViewport.width });
    const outputScale = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height =  Math.floor(viewport.height) + "px";

    const transform = outputScale !== 1
      ? [outputScale, 0, 0, outputScale, 0, 0]
      : null;

    page.render({
      canvasContext: canvas.getContext('2d'),
      transform,
      viewport,
    });
  }

  function debounce({ onStart, onEnd, timeout = 300 }){
    let timer;
    let calledStart = false;

    return (...args) => {
      clearTimeout(timer);

      if (!calledStart) {
        onStart(...args);
        calledStart = true;
      }

      timer = setTimeout(() => {
        onEnd(...args);
        calledStart = false;
      }, timeout);
    };
  }
}

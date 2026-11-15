/** Download helpers for the Patch Lab. */

function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function svgToString(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', '600');
  clone.setAttribute('height', '600');
  return new XMLSerializer().serializeToString(clone);
}

export function downloadSvg(svg: SVGSVGElement, filename: string) {
  const blob = new Blob([svgToString(svg)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadPng(svg: SVGSVGElement, filename: string, size = 1024): Promise<void> {
  return new Promise((resolve, reject) => {
    const data = svgToString(svg);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Could not create PNG'));
        const pngUrl = URL.createObjectURL(blob);
        triggerDownload(pngUrl, filename);
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
        resolve();
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Could not render patch'));
    img.src = url;
  });
}

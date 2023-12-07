/**
 *
 * @param {BlobPart} data Can be string | BufferSource | Blob
 * @param {string} name
 */
export function downloadFile(data, name) {
  const blob = new Blob([data]);
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

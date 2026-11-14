import { site } from '../config/site';
import { showToast } from './toast';

/**
 * Downloads the real PDF from /public. Single-page-app hosts often answer a missing file with
 * index.html, so the response is checked for the PDF signature before it is offered as a download.
 */
export async function downloadResume(): Promise<void> {
  try {
    const response = await fetch(site.resume.url, { cache: 'no-store' });
    if (!response.ok) throw new Error('not found');
    const blob = await response.blob();
    const signature = await blob.slice(0, 5).text();
    if (!signature.startsWith('%PDF')) throw new Error('not a pdf');

    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = site.resume.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(href), 2000);
    showToast('Resume download started.', 'success');
  } catch {
    showToast(
      `Resume isn't available yet. Add your PDF at public${site.resume.url} to enable this download.`,
      'error',
    );
  }
}

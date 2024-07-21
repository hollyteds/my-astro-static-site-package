
/**
 * Fixes the viewport meta tag based on the window width.
 * @param minWidth The minimum width for the viewport.
 */
export default (minWidth: number = 375): void => {
	const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
	const value = window.outerWidth > minWidth ? 'width=device-width,initial-scale=1' : `width=${minWidth}`;

	if (viewport && viewport.getAttribute('content') !== value) viewport.setAttribute('content', value);

}
/**
 * Adds the 'aria-hidden' attribute with a value of 'true' to all <br> tags in the document.
 */
export default () : void => {
  document.addEventListener('DOMContentLoaded', () => {
    const brTags = document.querySelectorAll('br');
    brTags.forEach((br) => {
      br.setAttribute('aria-hidden', 'true');
    });
  });
}
// Don't do anything at the global scope, 
// do it in this annonymous function instead.
(() => {
  // Get the html snippet with AJAX.
  fetch('header.html')

  // Convert the stream into text.
  .then(res => res.text())
  
  // Add the HTML snippet to the DOM.
  .then(res => {
    const header = document.getElementById('header_space');
    header.innerHTML = res;
  });

  fetch('footer.html')
  .then(res1 => res1.text())
  .then(res1 => {
    const footer = document.getElementById('footer_space');
    footer.innerHTML = res1;
  });
})();
// Don't do anything at the global scope, 
// do it in this annonymous function instead.
(() => {
  // Get the html snippet with AJAX.
  fetch('header.html')

  // Convert the stream into text.
  .then(res => res.text())
  
  // Add the HTML snippet to the DOM.
  .then(res => {
    const header = document.getElementById('header-space');
    if (header) {
      header.innerHTML = res;
      insertMenu('header-menu-space');
      }
  });

  fetch('footer.html')
  .then(res1 => res1.text())
  .then(res1 => {
    const footer = document.getElementById('footer-space');
    if (footer) {
      footer.innerHTML = res1;
      insertMenu('footer-menu-space');
    }
  });

  fetch('right-col.html')
  .then(res2 => res2.text())
  .then(res2 => {
    const rightCol = document.getElementById('right-col-space');
    if (rightCol) {
      rightCol.innerHTML = res2;
    }
  });
})();

function insertMenu(id) {
  fetch('menu.html')
  .then(res3 => res3.text())
  .then(res3 => {
    const menu = document.getElementById(id);
    if (menu) {
      menu.innerHTML = res3;
    }
  });
}
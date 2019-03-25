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

  // fetch('right-col.html')
  // .then(res2 => res2.text())
  // .then(res2 => {
  //   const rightCol = document.getElementById('right-col-space');
  //   if (rightCol) {
  //     rightCol.innerHTML = res2;
  //   }
  // });

  let md = document.getElementById('markdown-area');
  if (!md) {
    return;
  }
  let rc = document.getElementById('right-col')
  getBlogPostsConf()
  .then(fileNames => {
    let fileNamesF = fileNames.filter(v => v !== '');
    Promise.all(fileNamesF.map(f => {
      return fetch('blog-posts/' + f)
    }))
    .then(responses => Promise.all(responses.map(res => res.text()))
    ).then(posts => {
      rc.innerHTML = '<ul class="no-style" id="post-list">' + makeRightColHtml(posts) + '</ul>';
      md.innerHTML = makePostsHtml(posts);
    });
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

function getBlogPostsConf() {
  let path = window.location.pathname;
  console.log(path);
  let stage = (path == '/blog-preview.html' ? 'blog-preview.conf' : 'blog-posts.conf');
  return fetch(stage)
  .then(res => {
    return res.text();
  })
  .then(res => {
    return(res.split('\n'));
  });

}

function makePostsHtml(posts) {
  return posts.map(v => {
    v = v.replace(/(?<!\w)"(?=\w)/g, '&ldquo;');
    v = v.replace(/(?<=\w)"(?!\w)/g, '&rdquo;');
    v = v.replace(/(?<!\w)'(?=\w)/g, '&lsquo;');
    v = v.replace(/(?<=\w)'(?!\w)/g, '&rsquo;');
    v = v.replace(/(?<=\w)'(?=\w)/g, '&rsquo;');
    return '<div class="blog-post">' + marked(v) + '</div>';
  }).join('\n');
}

function makeRightColHtml(posts) {
  return posts.map(v => {
    // console.log(marked(v));
    let dom = new DOMParser().parseFromString(marked(v), 'text/html');
    let firstChild = dom.getElementsByTagName('body')[0].firstChild;
    return '<li><a href="#' + firstChild.id + '">' + firstChild.innerHTML + '</a></li>';
  }).join('\n');
}
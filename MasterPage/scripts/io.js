/**io.js
 * @fileoverview To deal with IO of web page.
 * http://www.quirksmode.org/js/xmlhttp.html
 * @author DanDavis
 */

var XMLHttpFactories = [
  function () {
	return (new XMLHttpRequest());
  },
  function () {
	return (new ActiveXObject('Msxml2.XMLHTTP'));
  },
  function () {
	return (new ActiveXObject('Msxml3.XMLHTTP'));
  },
  function () {
	return (new ActiveXObject('Microsoft.XMLHTTP'));
  }
];

/**createXmlHttpObject
 * Add the header contents from header_contents.txt.
 */
function createXmlHttpObject() {
  let xmlHttp = false;
  for (let i = 0; ( i < XMLHttpFactories.length ); i++) {
    try {
      xmlHttp = XMLHttpFactories[i]();
    }
    catch (e) {
      continue;
    }
    break;
  }
  return (xmlHttp);
}

/**readContents
 * Read the html contents in file.
 * @param {string} url The file which with html contents.
 */
function readContents(url) { 
  let request = createXmlHttpObject();
  request.open('GET', url, false );
  request.setRequestHeader('Content-Type', 'text/html');
  request.send('');
  return (request.responseText);
}

/**placeInOuterHtml
 * Place html contents to element.
 * @param {element} element The element to place contents.
 * @param {string} contents The contents which will place at element.
 */
function placeInOuterHtml(element, contents) { 
  if (element.outerHTML) {
    element.outerHTML = contents;
  }
  else{
    element.innerHTML = contents;    
  }
}

/**placeMasterPage
 * Place generic web page contents.
 */
function placeMasterPage() {
  addHeader();
  addFooter();
  addAside();
  addLastArticles();
  addGroupArchives();
}
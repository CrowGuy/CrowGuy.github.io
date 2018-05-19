/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @author Randy Xu
 */
 
/**relativePath
 * @return {string}
 */
function relativePath() {
  let site = document.location.pathname;
  let pathPrefix = '';
  for (let i = site.split('/').length; i > 1; i--) {
    pathPrefix += '../';
  }
  return pathPrefix;
}

/**navSelected
 * @return {dictory}
 */
function navSelected() {
  let site = document.location.pathname.split('/').reverse();
  let navState = {};
  switch (site[0]) {
	case 'index.html':
	  navState.index = 'active';
	  navState.about = '';
	  navState.archives = '';
	  break;
	  
	case 'about.html':
	  navState.index = '';
	  navState.about = 'active';
	  navState.archives = '';
	  break;
	  
	case 'archives.html':
	  navState.index = '';
	  navState.about = '';
	  navState.archives = 'active';
	  break;
	  
	default:
	  navState.index = '';
	  navState.about = '';
	  navState.archives = '';
	  break;
  }
  return navState;
}

/**relativePath
 * @return {number}
 */
function countTotalPages(numItems, groupSize) {
  let totalPages;
  if (parseInt(numItems/groupSize) < 1) {
    totalPages = 1;
  }
  else {
    totalPages = parseInt(numItems/groupSize);
  }
  return totalPages;
}

/**currentPage
 * @return {number}
 */
function currentPage() {
  let site = document.location.href;
  let current = 0;
  if (site.split('page=').length > 1) {
    current = parseInt(site.split('page=')[1]);
  }
  return current;
}

/**typeOfGroup
 * @return {number}
 */
function typeOfGroup() {
  let site = document.location.href;
  return decodeURI(site).split('type=')[1].split('?page=')[0];
}

/**settingPageButton
 * @return {dictory}
 */
function settingPageButton(url, pre, next, totalPage) {
  let pageButtonState = {};
  if (next == 1 && next == totalPage) {
	pageButtonState.preShow = 'disabled';
    pageButtonState.nextShow = 'disabled';
	pageButtonState.preUrl = '#';
	pageButtonState.nextUrl = '#';
  }
  else if (next == 1) {
	pageButtonState.preShow = 'disabled';
    pageButtonState.nextShow = '';
	pageButtonState.preUrl = '#';
	pageButtonState.nextUrl = url + next;  
  }
  else if (next == totalPage) {
	pageButtonState.preShow = '';
    pageButtonState.nextShow = 'disabled';
	pageButtonState.preUrl = url + pre;
	pageButtonState.nextUrl = '#';
  }
  else {
	pageButtonState.preShow = '';
    pageButtonState.nextShow = '';
	pageButtonState.preUrl = url + pre;
	pageButtonState.nextUrl = url + next; 
  }
  return pageButtonState;
}
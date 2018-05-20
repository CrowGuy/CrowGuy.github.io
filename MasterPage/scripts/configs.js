/**configs.js
 * @fileoverview Some small functions to support add contents js.
 * @author Randy Xu
 */
 
/**relativePath
 * Calculate the relative path of current page.
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
 * Calculate the navbar settings.
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

/**countTotalPages
 * Calculate the total pages count.
 * @param {number} numItems Total number of items.
 * @param {number} groupSize The group size of items.
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
 * Calculate the current page number.
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
 * Calculate the type of group.
 * @return {number}
 */
function typeOfGroup() {
  let site = document.location.href;
  return decodeURI(site).split('type=')[1].split('?page=')[0];
}

/**settingPageButton
 * Calculate the page button settings.
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
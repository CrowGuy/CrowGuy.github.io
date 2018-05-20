/**add_contents.js
 * @fileoverview Functions to add generic web contents.
 * @author Randy Xu
 */
 
/**addHeader
 * Add the header contents from header_contents.txt.
 */
function addHeader() {
  const contentsSrc = 'MasterPage/header_contents.txt';
  if (document.getElementById) {
    let header = document.getElementById('header');
    if (header) {
	  let pathPrefix = relativePath();
	  let navState = navSelected();
	  let headerContents = readContents(pathPrefix + contentsSrc);
	  if (headerContents) {
	    headerContents = headerContents.replace('{{indexPrefix}}'
		                                        , pathPrefix);
        headerContents = headerContents.replace('{{aboutPrefix}}'
		                                        , pathPrefix);
        headerContents = headerContents.replace('{{archivesPrefix}}'
		                                        , pathPrefix);
		headerContents = headerContents.replace('{{indexNav}}'
		                                        , navState.index);
        headerContents = headerContents.replace('{{aboutNav}}'
		                                        , navState.about);
        headerContents = headerContents.replace('{{archivesNav}}'
		                                        , navState.archives);					
        placeInOuterHtml(header, headerContents);
	  }
    }
  }  
}

/**addFooter
 * Add the footer contents from footer_contents.txt.
 */
function addFooter() {
  const contentsSrc = 'MasterPage/footer_contents.txt';
  if (document.getElementById) {
    let footer = document.getElementById('footer');
    if (footer) {
	  let pathPrefix = relativePath();
	  let footerContents = readContents(pathPrefix + contentsSrc);
      if (footerContents) {      
        placeInOuterHtml(footer, footerContents);
      }
    }
  }  
}

/**addAside
 * Add the aside contents from aside_contents.txt.
 */
function addAside() {
  const contentsSrc = 'MasterPage/aside_contents.txt';
  if (document.getElementById) {
    let aside = document.getElementById('aside');
    if (aside) {
	  let pathPrefix = relativePath();
	  let asideContents = readContents(pathPrefix + contentsSrc);
      if (asideContents) {
        asideContents = asideContents.replace('{{imageUrlPrefix}}'
		                                      , pathPrefix);	  
        placeInOuterHtml(aside, asideContents);
      }
    }
  }  
}

/**addArchives
 * Add the archives contents from param string and archives_contents.txt.
 * @param {string} htmlText The html contents for archives.
 */
function addArchives(htmlText) {
  const contentsSrc = 'MasterPage/archives_contents.txt';
  if (document.getElementById) {
    let archives = document.getElementById('archives');
    if (archives) {
	  let pathPrefix = relativePath();
	  let archivesContents = readContents(pathPrefix + contentsSrc);
      if (archivesContents) {  
        archivesContents = archivesContents.replace('{{archives}}', htmlText);
        placeInOuterHtml(archives, archivesContents);
      }
    }
  }  
}

/**addGroupArchives
 * Add each group of archives to aside part.
 */
function addGroupArchives() {
  const JSON_SRC = 'MasterPage/json/article_type.json';
  const PATH_PREFIX = relativePath();
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  let groupList = JSON.parse(this.responseText);
	  let htmlContents = '';
	  for (let i = 0; i < groupList.length; i++) {
		htmlContents += '<li><a href="' + PATH_PREFIX + 'type_group.html?type='
		                + groupList[i].type_group + '">' 
						+ groupList[i].type_group + '</a></li>\n';	
	  }
	  addArchives(htmlContents);
	}
  };
  xmlhttp.open("GET", PATH_PREFIX + JSON_SRC, true);
  xmlhttp.send();
}

/**addNews
 * Add news content from news_contents.txt.
 * @param {string} url The url of news contents.
 * @param {string} title The title of news contents.
 * @param {string} img The url of news image.
 * @param {number} index The order of article.
 * @return {string}
 */
function addNews(url, title, img, index) {
  const CONTENTS_SRC = 'MasterPage/news_contents.txt';
  const PATH_PREFIX = relativePath();
  let newsContents = readContents(PATH_PREFIX + CONTENTS_SRC);
  if (newsContents) { 
    if (index == 1) {
      newsContents = newsContents.replace('<h4 class="font-italic">最新文章</h4>'
	                                      ,'');
    }
    newsContents = newsContents.replace('{{acticleUrl}}', PATH_PREFIX + url);
	newsContents = newsContents.replace('{{articleTitle}}', title);
    newsContents = newsContents.replace('{{articleImg}}', PATH_PREFIX + img);
    return newsContents + '\n';
  }  
}

/**addGroupArchives
 * Add each group of archives to aside part.
 */
function addLastArticles() {
  const JSON_SRC = 'MasterPage/json/article_list.json';
  const PATH_PREFIX = relativePath();
  const NUM_LAST = 2;
  let xmlhttp = new XMLHttpRequest();	
  xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  let articleList = JSON.parse(this.responseText);
	  articleList.reverse();
	  let htmlContents = '';
	  for (let i = 0; i < NUM_LAST; i++) {
		let title = articleList[i].articles;
		let img = articleList[i].img;
		let url = articleList[i].url;
        htmlContents += addNews(url, title, img, i);
	  }
	  
      if (document.getElementById) {
		let news = document.getElementById('news');
        if (news) {
		  placeInOuterHtml(news, htmlContents);
		}
	  }
	}
  };
  xmlhttp.open("GET", PATH_PREFIX + JSON_SRC, true);
  xmlhttp.send();
}

/**addBlogPost
 * Add blog post to article posts.
 * @param {string} title The title of article.
 * @param {string} url The url of article.
 * @param {string} date The published date of article.
 * @param {string} typeGroup The type group of article.
 * @param {string} abstracts The abstract of article.
 * @param {string} img The image url of article.
 * @return {string}
 */
function addBlogPost(title, url, date, typeGroup, abstracts, img) {
  const CONTENTS_SRC = 'MasterPage/blog_post_contents.txt';
  let blogPostContents = readContents(CONTENTS_SRC);
  if (blogPostContents) {                                 		
    blogPostContents = blogPostContents.replace('{{articleTitle}}', title);
    blogPostContents = blogPostContents.replace('{{acticleUrl}}', url);
    blogPostContents = blogPostContents.replace('{{acticleUrl}}', url);
    blogPostContents = blogPostContents.replace('{{date}}', date);
    blogPostContents = blogPostContents.replace('{{typeGroup}}', typeGroup);
    blogPostContents = blogPostContents.replace('{{abstract}}', abstracts);
    blogPostContents = blogPostContents.replace('{{articleImg}}', img);
    return blogPostContents + '\n';
  }  
}

/**addPage
 * Add the page buttons contents.
 * @param {string} url The relative path of current site to page contents.
 * @param {number} pre The pre page number of current page.
 * @param {number} next The next page number of current page.
 * @param {number} total The total article number of articles.
 * @param {number} group_size The group size of each page.
 * @return {string}
 */
function addPage(url, pre, next, total, groupSize) {
  const CONTENTS_SRC = 'MasterPage/page_contents.txt';
  let pageContents = readContents(CONTENTS_SRC);
  if (pageContents) {
    let totalPage = countTotalPages(total, groupSize);
    let pageButtonState = settingPageButton(url, pre, next, totalPage);
	pageContents = pageContents.replace('{{disabled-pre}}'
	                                    , pageButtonState.preShow);
    pageContents = pageContents.replace('{{disabled-next}}'
	                                    , pageButtonState.nextShow);
    pageContents = pageContents.replace('{{urlPre}}'
	                                    , pageButtonState.preUrl);
    pageContents = pageContents.replace('{{urlNext}}'
	                                    , pageButtonState.nextUrl);
    pageContents = pageContents.replace('{{currentPage}}', next);
    pageContents = pageContents.replace('{{totalPage}}', totalPage);
    return pageContents + '\n';
  }  
}

/**addBlogPost
 * Add article posts at index page.
 */
function addArticlePosts() {
  const JSON_SRC = 'MasterPage/json/article_list.json';
  const GROUP_SIZE = 6;
  let xmlhttp = new XMLHttpRequest();
  let current = currentPage();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  let articleList = JSON.parse(this.responseText);
	  articleList.reverse();
	  let len = articleList.length;
	  let next = current + 1;
	  let htmlContents = '';
	  for (let i = 0; i < len; i++) {
		if (i == GROUP_SIZE * next) {
		  break;
		}
	    else {
		  if (parseInt(i/GROUP_SIZE) == current) {
		    let title = articleList[i].articles;
		    let url = articleList[i].url;
		    let date = articleList[i].date;
		    let typeGroup = articleList[i].type_group;
		    let abstracts = articleList[i].abstracts;
		    let img = articleList[i].img;
		    htmlContents += addBlogPost(title, url, date, typeGroup
			                            , abstracts, img);
		  } 
		}
	  }
	  htmlContents += addPage('index.html?page=',current-1,next,len,GROUP_SIZE);
			
      if (document.getElementById) {
		let articlePost = document.getElementById ('article_post');
        if (articlePost) {
		  placeInOuterHtml (articlePost, htmlContents);
		}
	  }
	}
  };
  xmlhttp.open("GET", JSON_SRC, true);
  xmlhttp.send();
}

/**addTypePost
 * Add articles of certain type.
 * @param {string} title The title of article.
 * @param {string} url The url of article.
 * @param {string} abstracts The abstract of article.
 * @param {string} img The image url of article.
 * @return {string}
 */
function addTypePost(title, url, abstracts, img) { 
  const CONTENTS_SRC = 'MasterPage/type_post_contents.txt';
  let blogPostContents = readContents(CONTENTS_SRC);
  if (blogPostContents) {                                 
    blogPostContents = blogPostContents.replace('{{articleTitle}}', title);
    blogPostContents = blogPostContents.replace('{{acticleUrl}}', url);
    blogPostContents = blogPostContents.replace('{{abstract}}', abstracts);
    blogPostContents = blogPostContents.replace('{{imageUrl}}', img);
    return blogPostContents + '\n';
  }  
}

/**addGroupArticles
 * Add articles of specified group.
 */
function addGroupArticles() {
  const JSON_SRC = 'MasterPage/json/article_list.json';
  const GROUP_SIZE = 10;
  let xmlhttp = new XMLHttpRequest();
  let current = currentPage();
  let type = typeOfGroup();
  xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  let articleList = JSON.parse(this.responseText);
	  articleList.reverse();
	  let len = articleList.length;
	  let next = current + 1;
	  let htmlContents = '<h2 class="type_title text-deeper">' + type 
	                     + '</h2>\n<hr />\n';
	  let groupArticles = [];
	  for (let i = 0; i < len; i++) {
		if (articleList[i].type_group == type) {
		  groupArticles.push(articleList[i]);
		}
	  }
	  let totalArticles = groupArticles.length;
	  for (let j = 0; j < totalArticles; j++) {
	    if (j == GROUP_SIZE * next) {
		  break;
	    }
	    else {
		  if (parseInt(j/GROUP_SIZE) == current) {
		    let title = groupArticles[j].articles;
		    let url = groupArticles[j].url;
		    let abstracts = groupArticles[j].abstracts;
		    let img = groupArticles[j].img;
		    htmlContents += addTypePost(title, url, abstracts, img);
		  } 
	    }
	  }
	  htmlContents += addPage('type_group.html?type=' + type + '?page='
	                          , current-1, next, totalArticles, GROUP_SIZE);
	  if (document.getElementById) {
	    let groupType = document.getElementById('type_group');
        if (groupType) {
		  placeInOuterHtml(groupType, htmlContents);
	    }
	  }
    }
  };
  xmlhttp.open("GET", JSON_SRC, true);
  xmlhttp.send();
}

/**listArticles
 * list articles for archives page.
 */
function listArticles() {
  const JSON_SRC = 'MasterPage/json/article_list.json';
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  let articleList = JSON.parse(this.responseText);
	  articleList.reverse();
	  let len = articleList.length;
	  let htmlContents = "";
	  for (let i = 0; i < len; i++) {
		htmlContents += '<p><a href="' + articleList[i].url + '">' 
		                + articleList[i].articles + '</a>&emsp;' 
						+ articleList[i].date + '</p>\n';
	  }
			
	  if (document.getElementById) {
		let archivesList = document.getElementById('archives_list');
		if (archivesList) {
		  placeInOuterHtml(archivesList, htmlContents);
		}
	  }
    }
  };
  xmlhttp.open("GET", JSON_SRC, true);
  xmlhttp.send();
}
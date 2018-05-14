function add_articles_post (group_size) {
  var xmlhttp = new XMLHttpRequest();
  var json_url = "MasterPage/json/article_list.json";
  var url = document.location.href;
  if (url.split('=').length > 1) {
    var current = parseInt(url.split('=')[1]);
  }
  else {
    var current = 0;
  }

  var article_list;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
			article_list = JSON.parse(this.responseText);
			article_list.reverse();
			var L = article_list.length;
			var next = current + 1;
			var html_text = "";
			for (var i = 0; i < L; i++) {
				if (i == group_size * next) {
					break;
				}
				else {
					if (parseInt(i/group_size) == current) {
						var title = article_list[i].articles;
						var article_url = article_list[i].url;
						var date = article_list[i].date;
						var type_group = article_list[i].type_group;
						var abstracts = article_list[i].abstracts;
						var img = article_list[i].img;
						html_text += add_blog_post(title, article_url, date, type_group, abstracts, img);
					} 
				}
			}
			
			html_text += add_page('index.html?page=',current-1,next,L,group_size);
			
			if ( document.getElementById ) {
			
				var article_post = document.getElementById ( 'article_post' );

				if ( article_post ) {
					place_in_outerHTML ( article_post, html_text );
				}
			}
		}
	};
	xmlhttp.open("GET", json_url, true);
	xmlhttp.send();
}

function list_type_group (url, html_url) {
	
	var xmlhttp = new XMLHttpRequest();
	var type_group_list;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			type_group_list = JSON.parse(this.responseText);
			var L = type_group_list.length;
			var html_text = "";
			for (var i = 0; i < L; i++) {
				if (html_url) {
					html_text += '<li><a href="' + html_url + 'type_group.html?type=' + type_group_list[i].type_group + '">' + type_group_list[i].type_group + '</a></li>\n';
				}
				else {
					html_text += '<li><a href="type_group.html?type=' + type_group_list[i].type_group + '">' + type_group_list[i].type_group + '</a></li>\n';
				}
			}		
			add_archives(html_url, html_text);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

function add_last_article(html_url) {
	
	var xmlhttp = new XMLHttpRequest();
	
	if ( html_url ) {
		var json_url = html_url + "MasterPage/json/article_list.json";
		var content_url = html_url + "MasterPage/news_contents.txt";
	}
	else {
		var json_url = "MasterPage/json/article_list.json";
		var content_url = "MasterPage/news_contents.txt";
	}
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var article_last = JSON.parse(this.responseText);
			article_last.reverse();
			var html_text = "";
			
			for (var i = 0; i < 2; i++) {
				var title = article_last[i].articles;
				
				if ( html_url ) {
					var img = html_url + article_last[i].img;
					var article_url = html_url + article_last[i].url;
				}
				else {
					var img = article_last[i].img;
					var article_url = article_last[i].url;
				}
				html_text += add_news(content_url, article_url, title, img, i);
			}
			
			if ( document.getElementById ) {
			
				var news = document.getElementById ( 'news' );

				if ( news ) {
					place_in_outerHTML ( news, html_text );
				}
			}
		}
	};
	xmlhttp.open("GET", json_url, true);
	xmlhttp.send();
}

function list_articles () {
	
	var xmlhttp = new XMLHttpRequest();
	var json_url = "MasterPage/json/article_list.json";
	var article_list;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			article_list = JSON.parse(this.responseText);
			article_list.reverse();
			var L = article_list.length;
			var html_text = "";
			for (var i = 0; i < L; i++) {
				html_text += '<p><a href="' + article_list[i].url + '">' + article_list[i].articles + '</a>&emsp;' + article_list[i].date + '</p>\n';
			}
			
			if ( document.getElementById ) {
				var archives_list = document.getElementById ( 'archives_list' );

				if ( archives_list ) {
					place_in_outerHTML ( archives_list, html_text );
				}
			}
		}
	};
	xmlhttp.open("GET", json_url, true);
	xmlhttp.send();
}

function add_articles_group (group_size) {
	
	var xmlhttp = new XMLHttpRequest();
	var json_url = "MasterPage/json/article_list.json";
	var url = document.location.href;
	if (url.split('page=').length > 1) {
		var current = parseInt(url.split('page=')[1]);
	}
	else {
		var current = 0;
	}
	
	var type = decodeURI(url).split('type=')[1].split('?page=')[0];
	var article_list;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			article_list = JSON.parse(this.responseText);
			article_list.reverse();
			var L = article_list.length;
			var next = current + 1;
			var html_text = '<h2 class="type_title text-deeper">' + type + '</h2>\n<hr />\n';
			var article_group = [];
			for (var i = 0; i < L; i++) {
				if (article_list[i].type_group == type) {
					article_group.push(article_list[i]);
				}
			}
			
			var total = article_group.length;
			for (var j = 0; j < total; j++) {
				if (j == group_size * next) {
					break;
				}
				else {
					if (parseInt(j/group_size) == current) {
						var title = article_group[j].articles;
						var article_url = article_group[j].url;
						var abstracts = article_group[j].abstracts;
						var img = article_group[j].img;
						
						html_text += add_type_post(title, article_url, abstracts, img);
					} 
				}
			}
			
			html_text += add_page('type_group.html?type=' + type + '?page=',current-1,next,total,group_size);
		
			if ( document.getElementById ) {
			
				var type_group = document.getElementById ( 'type_group' );

				if ( type_group ) {
					place_in_outerHTML ( type_group, html_text );
				}
			}
		}
	};
	xmlhttp.open("GET", json_url, true);
	xmlhttp.send();
}

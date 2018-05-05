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
			
			html_text += add_page(current-1,next,L,group_size);
			
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
				html_text += '<li><a href="#">' + type_group_list[i].type_group + '</a></li>\n';
			}
			add_aside(html_url, html_text);
		}
	};
	xmlhttp.open("GET", url, true);
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

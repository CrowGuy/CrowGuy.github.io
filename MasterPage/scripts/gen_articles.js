function add_articles_post (url, current) {
	
	var xmlhttp = new XMLHttpRequest();
	var article_list;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			article_list = JSON.parse(this.responseText);
			var L = article_list.length;
			var group_size = 2;
			var html_text = "";
			for (var i = L-1; i >= 0; i--) {
				var title = article_list[i].articles;
				var article_url = article_list[i].url;
				var date = article_list[i].date;
				var type_group = article_list[i].type_group;
				var abstracts = article_list[i].abstracts;
				var img = article_list[i].img;
				html_text += add_blog_post(title, article_url, date, type_group, abstracts, img);
			}
			
			html_text += add_page(1,L,6);
			
			if ( document.getElementById ) {
			
				var article_post = document.getElementById ( 'article_post' );

				if ( article_post ) {
					place_in_outerHTML ( article_post, html_text );
				}
			}
		}
	};
	xmlhttp.open("GET", url, true);
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



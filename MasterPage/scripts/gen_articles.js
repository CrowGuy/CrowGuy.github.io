function list_articles (url) {
	
	var xmlhttp = new XMLHttpRequest();
	var article_list;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			article_list = JSON.parse(this.responseText);
			var L = article_list.length;
			var html_text = "";
			for (var i = 0; i < L; i++) {
		
				alert(article_list[i].articles);
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



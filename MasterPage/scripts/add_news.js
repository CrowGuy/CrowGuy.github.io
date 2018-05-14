// ******************************************************* add_news

function add_news (url, news_url, news_title, news_img, index) {
  var news_contents = read_contents ( url );
  if ( news_contents ) { 
    if (index == 1) {
      news_contents = news_contents.replace('<h4 class="font-italic">最新文章</h4>','');
    }
    news_contents = news_contents.replace('{{acticleUrl}}', news_url);
	news_contents = news_contents.replace('{{articleTitle}}', news_title);
    news_contents = news_contents.replace('{{articleImg}}', news_img);
    return news_contents+"\n";
  }  
}
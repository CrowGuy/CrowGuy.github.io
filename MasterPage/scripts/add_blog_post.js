// ******************************************************* add_blog_post

function add_blog_post (articleTitle, acticleUrl, date, typeGroup, Abstract, articleImg) {
   
	var blog_post_contents = read_contents ( "MasterPage/blog_post_contents.txt" );
			
	if ( blog_post_contents ) {                                 
				
		blog_post_contents = blog_post_contents.replace('{{articleTitle}}', articleTitle);
		blog_post_contents = blog_post_contents.replace('{{acticleUrl}}', acticleUrl);
		blog_post_contents = blog_post_contents.replace('{{acticleUrl}}', acticleUrl);
		blog_post_contents = blog_post_contents.replace('{{Date}}', date);
		blog_post_contents = blog_post_contents.replace('{{typeGroup}}', typeGroup);
		blog_post_contents = blog_post_contents.replace('{{Abstract}}', Abstract);
		blog_post_contents = blog_post_contents.replace('{{articleImg}}', articleImg);
		return blog_post_contents + "\n";
		//place_in_outerHTML ( header, header_contents );
    }  
}
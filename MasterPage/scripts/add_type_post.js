// ******************************************************* add_type_post

function add_type_post (articleTitle, acticleUrl, Abstract, articleImg) {
   
	var blog_post_contents = read_contents ( "MasterPage/type_post_contents.txt" );
			
	if ( blog_post_contents ) {                                 
				
		blog_post_contents = blog_post_contents.replace('{{articleTitle}}', articleTitle);
		blog_post_contents = blog_post_contents.replace('{{acticleUrl}}', acticleUrl);
		blog_post_contents = blog_post_contents.replace('{{Abstract}}', Abstract);
		blog_post_contents = blog_post_contents.replace('{{imageUrl}}', articleImg);
		return blog_post_contents + "\n";
		//place_in_outerHTML ( header, header_contents );
    }  
}
// ******************************************************* add_page

function add_page (current, total, group_size) {
   
	var page_contents = read_contents ( "MasterPage/page_contents.txt" );
			
	if ( page_contents ) {                                 
		
		page_contents = page_contents.replace('{{current_page}}', current);
		page_contents = page_contents.replace('{{total_page}}', total);
		return page_contents + "\n";
    }  
}
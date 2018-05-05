// ******************************************************* add_page

function add_page (pre, next, total, group_size) {
   
	var page_contents = read_contents ( "MasterPage/page_contents.txt" );
			
	if ( page_contents ) {                                 
		if (parseInt(total/group_size) < 1) {
			var total_page = 1;
		}
		else {
			var total_page = parseInt(total/group_size);
		}
		 
		if (next == 1 && next == total_page) {
			page_contents = page_contents.replace('{{disabled-pre}}', 'disabled');
			page_contents = page_contents.replace('{{disabled-last}}', 'disabled');
			page_contents = page_contents.replace('{{url_pre}}', '#');
			page_contents = page_contents.replace('{{url_last}}', '#');
		}
		else if (next == 1) {
			page_contents = page_contents.replace('{{disabled-pre}}', 'disabled');
			page_contents = page_contents.replace('{{url_pre}}', '#');
			page_contents = page_contents.replace('{{url_last}}', 'index.html?page=' + next);
		}
		else if (next == total_page) {
			page_contents = page_contents.replace('{{disabled-last}}', 'disabled');
			page_contents = page_contents.replace('{{url_pre}}', 'index.html?page=' + pre);
			page_contents = page_contents.replace('{{url_last}}', '#');
		}
		else {
			page_contents = page_contents.replace('{{url_pre}}', 'index.html?page=' + pre);
			page_contents = page_contents.replace('{{url_last}}', 'index.html?page=' + next);
		}
		page_contents = page_contents.replace('{{current_page}}', next);
		
		page_contents = page_contents.replace('{{total_page}}', total_page);
		return page_contents + "\n";
    }  
}
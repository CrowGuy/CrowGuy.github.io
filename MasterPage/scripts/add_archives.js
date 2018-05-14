// ******************************************************* add_archives

function add_archives (url, html_text) {
  if ( document.getElementById ) {
    var archives = document.getElementById ( 'archives' );
    if ( archives ) {
	  if ( url ) {
		var archives_contents = read_contents ( url + "MasterPage/archives_contents.txt" );
	  }
	  else {
		var archives_contents = read_contents ( "MasterPage/archives_contents.txt" );
	  }
      if ( archives_contents ) {  
        archives_contents = archives_contents.replace('{{Archives}}', html_text);
        place_in_outerHTML ( archives, archives_contents );
      }
    }
  }  
}
// ******************************************************* add_header

function add_header (site) {
    
	switch(site) {
		case "index.html":
			indexMenu = "active";
			aboutMenu = "";
			archivesMenu = "";
			break;
		case "about.html":
			indexMenu = "";
			aboutMenu = "active";
			archivesMenu = "";
			break;
		case "archives.html":
			indexMenu = "";
			aboutMenu = "";
			archivesMenu = "active";
			break;
		default:
			indexMenu = "";
			aboutMenu = "";
			archivesMenu = "";
			break;
	}

    if ( document.getElementById ) {
		
		var header = document.getElementById ( 'header' );

		if ( header ) {
			
			var header_contents = read_contents ( "MasterPage/header_contents.txt" );
      
			if ( header_contents ) {                                 
				
				header_contents = header_contents.replace('{{indexMenu}}', indexMenu);
				header_contents = header_contents.replace('{{aboutMenu}}', aboutMenu);
				header_contents = header_contents.replace('{{archivesMenu}}', archivesMenu);
				place_in_outerHTML ( header, header_contents );
			}
        }
    }  
}
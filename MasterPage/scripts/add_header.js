// ******************************************************* add_header

function add_header (site, url) {
    
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
			
			if ( url ) {
				var header_contents = read_contents ( url + "MasterPage/header_contents.txt" );
			}
			else {
				var header_contents = read_contents ( "MasterPage/header_contents.txt" );
			}
			
			if ( header_contents ) {                                 
				
				header_contents = header_contents.replace('{{indexMenu}}', indexMenu);
				header_contents = header_contents.replace('{{aboutMenu}}', aboutMenu);
				header_contents = header_contents.replace('{{archivesMenu}}', archivesMenu);
				place_in_outerHTML ( header, header_contents );
			}
        }
    }  
}
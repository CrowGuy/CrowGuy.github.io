// ******************************************************* add_header

function add_header () {

    if ( document.getElementById ) {
		
		var header = document.getElementById ( 'header' );

		if ( header ) {
			
			var header_contents = read_contents ( "MasterPage/header_contents.txt" );
      
			if ( header_contents ) {                                 
				
				place_in_outerHTML ( header, header_contents );
			}
        }
    }  
}
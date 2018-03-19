// ******************************************************* add_aside

function add_aside () {
	if ( document.getElementById ) {
		
		var aside = document.getElementById ( 'aside' );

		if ( aside ) {
			
			var aside_contents = read_contents ( "MasterPage/aside_contents.txt" );

			if ( aside_contents ) {      
				
				place_in_outerHTML ( aside, aside_contents );
			}
		}
    }  
}
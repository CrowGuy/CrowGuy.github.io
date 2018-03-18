// ******************************************************* add_footer

function add_footer () {
	if ( document.getElementById ) {
		
		var footer = document.getElementById ( 'footer' );

		if ( footer ) {
			
			var footer_contents = read_contents ( "MasterPage/footer_contents.txt" );

			if ( footer_contents ) {      
				
				place_in_outerHTML ( footer, footer_contents );
			}
		}
    }  
}

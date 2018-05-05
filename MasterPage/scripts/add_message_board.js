// ******************************************************* add_message_board

function add_message_board (url) {
	if ( document.getElementById ) {
		
		var message_board = document.getElementById ( 'message_board' );

		if ( message_board ) {
			
			if ( url ) {
				
				var message_board_contents = read_contents ( url + "MasterPage/message_board_contents.txt" );
			}
			else {
				
				var message_board_contents = read_contents ( "MasterPage/message_board_contents.txt" );
			}
			
			if ( message_board_contents ) {      
				
				place_in_outerHTML ( message_board, message_board_contents );
			}
		}
    }  
}

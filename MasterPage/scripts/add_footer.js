// ******************************************************* add_footer

function add_footer (url) {
  if ( document.getElementById ) {
    var footer = document.getElementById ( 'footer' );
    if ( footer ) {
      if ( url ) {
        var footer_contents = read_contents ( url + "MasterPage/footer_contents.txt" );
      }
      else {
        var footer_contents = read_contents ( "MasterPage/footer_contents.txt" );
      }
      if ( footer_contents ) {      
        place_in_outerHTML ( footer, footer_contents );
      }
    }
  }  
}

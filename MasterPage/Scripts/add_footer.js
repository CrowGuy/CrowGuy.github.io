// ******************************************************* add_footer

function add_footer ( footer_image )
  {

  if ( document.getElementById )
    {
    var footer = document.getElementById ( 'footer' );

    if ( footer )
      {
      var footer_contents = read_contents ( 
            "HeaderFooterContents/footer_contents.txt" );

      if ( footer_contents )
        {
        if ( footer_image )
          {
          footer_contents = footer_contents.replace ( 
                                              '{{FooterImage}}',
                                              footer_image );
          footer_contents = footer_contents.replace ( 
                                              '{{DisplayFooterImage}}',
                                              'block' );
          }
        else
          {
          footer_contents = footer_contents.replace ( 
                                              '{{FooterImage}}',
                                              '' );
          footer_contents = footer_contents.replace ( 
                                              '{{DisplayFooterImage}}',
                                              'none' );
          }
        place_in_outerHTML ( footer, footer_contents );
        }
      }
    }  
  }

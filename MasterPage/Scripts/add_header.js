// ******************************************************* add_header

function add_header ( site_logo,
                      site_logo_target,
                      page_header,
                      page_subheader )
  {
  
  if ( arguments.length == 4 )
    {
    var document_title = "";
    
    document_title = page_header;
    document_title += ' - ' + page_subheader;
    document.title = document_title;

    if ( document.getElementById )
      {
      var header = document.getElementById ( 'header' );

      if ( header )
        {
        var header_contents = read_contents ( 
              "HeaderFooterContents/header_contents.txt" );
      
        if ( header_contents )
          {
          header_contents = header_contents.replace ( 
                                              '{{SiteLogoTarget}}',
                                              site_logo_target );
          header_contents = header_contents.replace ( 
                                              '{{SiteLogo}}',
                                              site_logo );
          header_contents = header_contents.replace ( 
                                              '{{PageHeader}}',
                                              page_header );
          header_contents = header_contents.replace ( 
                                              '{{PageSubHeader}}',
                                              page_subheader );
                                              
          place_in_outerHTML ( header, header_contents );
          }
        }
      }  
    }
  }
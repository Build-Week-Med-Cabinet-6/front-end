import React from 'react';
import { Alert } from 'reactstrap';

function FormErrorAlert({render, errorMessage = "foobar"}) { // Default text is required to prevent
  return(                                                    // position of elements from shifting on the screen
    <Alert 
    style={{ 
      visibility: render ? "visible" : "hidden",
      fontSize: "10px",
      padding: '5px',
      marginTop: '5px'
    }}
    color="danger"
    >
      {errorMessage}
    </Alert>
  );
}

export default FormErrorAlert;
import React from 'react';
import { Alert } from 'reactstrap';

function FormErrorAlert({render, errorMessage = "foobar"}) { // Default text is required to prevent
  return(                                                    // position of elements from shifting on the screen
    <Alert 
    style={{ 
      visibility: render ? "visible" : "hidden",
      
    }}
    color="danger"
    >
      {errorMessage}
    </Alert>
  );
}

export default FormErrorAlert;
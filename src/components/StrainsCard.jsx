import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function StrainsCard(props) {
  const { name, effects, flavors, description } = props.strain;
  return(
    <Card>
      <CardBody>
        <CardTitle style={{ margin: "1rem 0" }}><strong>{name}</strong></CardTitle>
        <CardSubtitle style={{ margin: "1rem 0" }}><strong>{effects}</strong></CardSubtitle>
        <CardSubtitle style={{ margin: "1rem 0" }}><strong>{flavors}</strong></CardSubtitle>
        <CardText><strong>{description}</strong></CardText>
      </CardBody>
    </Card>
  );
}

export default StrainsCard;
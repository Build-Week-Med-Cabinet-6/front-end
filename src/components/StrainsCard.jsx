import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function StrainsCard() {
  return(
    <Card>
      <CardBody>
        <CardTitle style={{ margin: "1rem 0" }}><strong>Strain name</strong></CardTitle>
        <CardSubtitle style={{ margin: "1rem 0" }}><strong>Effects...</strong></CardSubtitle>
        <CardSubtitle style={{ margin: "1rem 0" }}><strong>Flavors...</strong></CardSubtitle>
        <CardText><strong>Card description:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit corrupti enim amet aliquam nesciunt illo dolorum, odio quos dolore consequatur ad explicabo atque, culpa sapiente ut quo dolor animi incidunt?</CardText>
      </CardBody>
    </Card>
  );
}

export default StrainsCard;
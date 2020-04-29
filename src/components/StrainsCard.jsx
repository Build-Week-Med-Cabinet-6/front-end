import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function StrainsCard(props) {
  const { strain, rating, effects, flavor, description } = props.strain;
  return(
    <Card>
      <CardBody>
        <CardTitle style={{ margin: "1rem 0" }}>{strain}</CardTitle>
        <CardSubtitle style={{ margin: "1rem 0" }}>Rating: {rating}</CardSubtitle>
        <CardSubtitle style={{ margin: "1rem 0" }}>{effects}</CardSubtitle>
        <CardSubtitle style={{ margin: "1rem 0" }}>{flavor}</CardSubtitle>
        <CardText>{description}</CardText>
        <Button>Save Strain to profile</Button> {/* Api call to save to user profile */}
      </CardBody>
    </Card>
  );
}

export default StrainsCard;
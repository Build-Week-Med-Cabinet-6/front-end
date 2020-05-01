import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function StrainsCard(props) {
  const { strain, rating, effects, flavor, description } = props.strain;
  return(
    <Card style={{ margin: '3vh 0' }}>
      <CardBody>
        <CardTitle className="h3" style={{ margin: "1rem 0" }}>{strain}</CardTitle>
        <CardSubtitle className="h4 text-muted" style={{ margin: "1rem 0" }}>Rating: {rating}</CardSubtitle>
        <CardSubtitle className="h4 text-muted" style={{ margin: "1rem 0" }}>{effects}</CardSubtitle>
        <CardSubtitle className="h4 text-muted" style={{ margin: "1rem 0" }}>{flavor}</CardSubtitle>
        <CardText>{description}</CardText>
        <Button>Save Strain to profile</Button> {/* Api call to save to user profile */}
      </CardBody>
    </Card>
  );
}

export default StrainsCard;
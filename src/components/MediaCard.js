import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
} from "reactstrap";

/**
 * ##################   Main Component    ##################
 * @param {object} props
 * @param {string} props.poster
 * @param {string} props.title
 * @param {string} props.year
 * @param {string} props.type
 * @param {string} props.imdbID
 */
const MediaCard = ({ Poster, Title, Type, Year, imdbID }) => {
  return (
    <Card className="mx-2 mb-5">
      <CardImg top src={Poster} alt={Title} />
      <CardBody>
        <CardTitle className="font-weight-bold">{Title}</CardTitle>
        <CardSubtitle className="text-black-50">
          {`${Type}, ${Year}`}
        </CardSubtitle>
        <CardText id="imdbID">
          <span className="font-italic">Imdb ID:</span> {imdbID}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MediaCard;

import * as mediaDetailsAction from "actions/mediaDetailActions";
import { apiMediaSearchByImdbId } from "api/mediasAPI";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";

// ###################   Helpers    ####################
const mapStateToProps = (state) => ({
  mediaDetails: state.mediaDetails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMedias: (mediaDetails) =>
    dispatch(mediaDetailsAction.fetchMediaDetails(mediaDetails)),
});

/**
 * ##################   Main Component    ##################
 * @typedef {Object} Props
 * @property {string} imdbId
 * @property {object} mediaDetails
 * @property {Function} fetchMedias
 * @property {Object[]} mediaDetails
 * @property {string} mediaDetails.Title
 * @property {string} mediaDetails.Poster
 * @extends {Component<Props>}
 */
class MediaDetails extends Component {
  componentDidMount() {
    const { fetchMedias, imdbId } = this.props;
    apiMediaSearchByImdbId(fetchMedias, imdbId);
  }

  render() {
    const details = { ...this.props.mediaDetails };
    const { Poster, Title, Type, Year } = details;

    // Delete the property that have displayed
    delete details.Poster;
    delete details.Title;
    delete details.Year;
    delete details.Type;
    delete details.Year;

    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={{ size: 8 }}>
            <Card>
              <CardImg top src={Poster} width="100%" alt={Title} />
              <CardBody>
                <CardTitle className="font-weight-bold">{Title}</CardTitle>
                <CardSubtitle className="text-black-50">
                  {`${Type}, ${Year}`}
                </CardSubtitle>
                <CardText id="imdbID">
                  <span className="font-italic">Imdb ID:</span>{" "}
                  {this.props.imdbId}
                  {/* The details of course could be have been displayed better but, since it's a styling issue 
                  I just skipped styling it as it shows no skills */}
                </CardText>
                <pre>{JSON.stringify(details, null, 2)}</pre>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetails);

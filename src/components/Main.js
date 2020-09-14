import { Link } from "@reach/router";
import * as mediaActions from "actions/mediasActions";
import { apiMediaSearchByTitle } from "api/mediasAPI";
import { MEDIAS_TOTAL_NUMBER, PAGINATION_URL } from "constants/localStorage";
import { ROUTES } from "constants/urls";
import { DESIGN_SYSTEM } from "designSystem";
import { getItem } from "helpers/localStorageHelpers";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardDeck,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import CustomLoader from "./CustomLoader";
import FilterBox from "./FilterBox";
import MediaCard from "./MediaCard";
import SearchBox from "./SearchBox";

// ###################   Helpers    ####################
const mapStateToProps = (state) => ({
  medias: state.medias,
});

const mapDispatchToProps = (dispatch) => ({
  loadingMedias: () => dispatch(mediaActions.loadingMedias()),
  fetchMedias: (medias) => dispatch(mediaActions.fetchMedias(medias)),
});

/**
 * ################   Main Component    ################
 * @typedef {object} Props
 * @property {object[]} medias
 * @property {string} medias.Poster
 * @property {string} medias.Title
 * @property {string} medias.Type
 * @property {string} medias.Year
 * @property {string} medias.imdbID
 * @property {function} loadingMedias
 * @property {function} fetchMedias
 * @extends {Component<Props>}
 */
class Main extends Component {
  // ###############   Life-Cycle Methods    ###############
  componentDidMount() {
    // Scroll to the top of the page when rendering
    window.scrollTo(0, 0);

    // Activate the loader until we fetch the medias
    this.props.loadingMedias();

    // Load Medias by making an API call
    apiMediaSearchByTitle(this.props.fetchMedias);
  }

  /**
   * @param {object} values
   * @param {string} values.title
   * @param {string} values.year
   */
  handleSubmit = (values, reduxDevtoolCbFn, formProps) => {
    const { title, year } = values;
    apiMediaSearchByTitle(this.props.fetchMedias, 1, "", title, year);
  };

  renderMedias = () =>
    _.map(this.props.medias, (media, media_index) => (
      <Col xs={12} sm={6} lg={4} xl={3} key={media_index}>
        <Link to={`${ROUTES.medias}/${media.imdbID}`}>
          <MediaCard {...media} />
        </Link>
      </Col>
    ));

  renderPagination = () => {
    let pageNo = 1;
    return (
      <FormGroup>
        <Label className="text-white">Page No</Label>
        <Input
          type="select"
          onChange={(e) => {
            e.preventDefault();
            const newId = e.target.value;
            const searchTitle = getItem(PAGINATION_URL)
              .match(/s=[^&]*/)[0]
              .split("=")[1];
            apiMediaSearchByTitle(
              this.props.fetchMedias,
              newId,
              "",
              searchTitle
            );
          }}
        >
          {_.range(0, getItem(MEDIAS_TOTAL_NUMBER) / 10).map(
            (current, index) => {
              pageNo = index + 1;
              return <option key={pageNo}>{pageNo}</option>;
            }
          )}
        </Input>
      </FormGroup>
    );
  };

  render() {
    if (this.props.medias === null) {
      return (
        <Row
          className="justify-content-center"
          style={DESIGN_SYSTEM.setTopMargin("rem")}
        >
          <CustomLoader />
        </Row>
      );
    }

    return (
      <Container fluid>
        <Row style={DESIGN_SYSTEM.setTopMargin("2rem")} className="mx-auto">
          <Col className="d-flex justify-content-center mb-5" xs={12}>
            <SearchBox onSubmit={this.handleSubmit} />
            <FilterBox fetchAction={this.props.fetchMedias} />
          </Col>
          <CardDeck>{this.renderMedias()}</CardDeck>
          <Col className="d-flex justify-content-center mt-5" xs={12}>
            {this.renderPagination()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

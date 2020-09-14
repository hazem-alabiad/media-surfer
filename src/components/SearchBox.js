import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FORM_NAMES } from "constants/formNames";
import formValidator from "forms/formValidator";
import renderField from "forms/renderFields";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledAlert,
} from "reactstrap";
import { Field, reduxForm } from "redux-form";

const _SearchBox = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle} className="btn-lg rounded-pill">
        Search <FontAwesomeIcon icon={faSearch} className="ml-5" />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} charCode="x">
          <strong>Welcome to Media Surfer!</strong>
        </ModalHeader>
        <ModalBody>
          <Card inverse color="info">
            <CardHeader className="text-center">
              Search for Movies, Series, Episodes ...
            </CardHeader>
            <CardBody>
              <UncontrolledAlert>
                You can search medias 'movies, series, episodes' by title and
                year
              </UncontrolledAlert>
              <Form onSubmit={handleSubmit}>
                <Field
                  required
                  name="title"
                  type="text"
                  label="Media Title"
                  placeholder="e.g. Pokemon"
                  component={renderField}
                />
                <Field
                  name="year"
                  type="text"
                  label="Media Year"
                  placeholder="e.g. 2010"
                  component={renderField}
                />

                <Button
                  onClick={reset}
                  className="btn-sm mt-3"
                  disabled={pristine || submitting}
                >
                  Clear Inputs
                </Button>
                <Button
                  className="btn-block mt-4"
                  color="warning"
                  disabled={invalid || submitting}
                  type="submit"
                  onClick={() => setModal(false)}
                >
                  Search
                </Button>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

// ###############    Main Component    ###############
const SearchBox = reduxForm({
  form: FORM_NAMES.SEARCH,
  validate: formValidator,
  touchOnChange: true,
  touchOnBlur: true,
})(_SearchBox);

export default SearchBox;

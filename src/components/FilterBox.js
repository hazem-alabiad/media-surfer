import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiMediaSearchByTitle } from "api/mediasAPI";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

/**
 *
 * @param {object} props
 * @param {Function} props.fetchAction
 */
const FilterBox = ({ fetchAction }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="ml-2">
      <Button color="warning" onClick={toggle} className="btn-lg rounded-pill">
        Filter <FontAwesomeIcon icon={faFilter} className="ml-5" />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} charCode="x">
          <strong>Welcome to Media Surfer!</strong>
        </ModalHeader>
        <ModalBody>
          <Card inverse color="info">
            <CardHeader className="text-center">
              Filter Movies, Series, Episodes ...
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Media Type</Label>
                <Input
                  type="select"
                  onChange={(e) => {
                    const type = e.target.value;
                    apiMediaSearchByTitle(fetchAction, 1, type);
                    toggle();
                  }}
                >
                  <option defaultValue></option>
                  <option>movie</option>
                  <option>series</option>
                  <option>episode</option>
                </Input>
              </FormGroup>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FilterBox;

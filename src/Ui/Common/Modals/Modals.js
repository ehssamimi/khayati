import React, { useState } from 'react';
import {Button, Modal} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const CenterModal = ({  onHide,
                                className,header,Body,submit,show,children }) => {
    // const {
    //
    //
    // } = props;

    return (
        <Modal
            show={show} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter text-center">
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                   children
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>بستن</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const ALertCenter = (props) => {
    const {
        isOpen,
        toggle,
       text
    } = props;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={toggle}>
            <Alert onClose={toggle}
                   // severity={this.state.severity}
            >
                <p dir='rtl' className='mb-0'>   {text}</p>

            </Alert>
        </Snackbar>
    );
}






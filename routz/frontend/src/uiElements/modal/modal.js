import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalBox(props) {
    console.log(props)
const [show,setShow] = useState();
  

    useEffect(()=>{
        setShow(props.show)
    },[props.show])

  return (
    <>


      <Modal show={show} onHide={props.handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.content}
        </Modal.Body>
     
      </Modal>
    </>
  );
}


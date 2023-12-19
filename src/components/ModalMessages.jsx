import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { onGetMessages } from "../CRUD/app";


const ModalMessages = ({ item, messages, currentId, isOpen, onClose }) => {
  //solo si el boton edit se apreta, se abre el modal.
  if (!isOpen) return null
  return (
    <>
      {/*DISPLAY DE MODAL*/}
      <div className="overlay" />
      <div className="modalbox">
        <button className={"closeBtn"} onClick={onClose}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div>
          <h5 className="bg-white rounded p-2 m-1">{item.vendor}</h5>
        </div>
        <div>

        </div>
        <div>{messages.map((msm) => (
          msm.msmSender === item.sender ? (
            <>
              <div className="bg-white rounded m-2 d-flex justify-content-end">{msm.msm}</div>
            </>
          ) : (
            <div>
              <div className="bg-white">{msm.msm}</div>
              <br />
            </div>

          )))}</div>
        <div>{currentId}</div>
      </div>
    </>
  );
};

export default ModalMessages;
import React, { useState } from 'react';
import {AddProducts} from './AddProducts'
import "../CSS/Modal.css";

export const Agregar = ({handleAdd, user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-success"}>
        Agregar
      </button>
      <AddProducts isOpen={isOpen} onClose={onClose} handleAdd={handleAdd} user={user}/>
    </>
  );
};

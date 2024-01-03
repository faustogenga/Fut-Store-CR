import React, { useState } from 'react';
import Modal from './Modal'
import "../CSS/Modal.css";

export const Edit = ({user,item,currentId,handleEdit,imgsProducts}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-info"}>
        Editar
      </button>
      <Modal user={user} item={item} currentId={currentId} isOpen={isOpen} onClose={onClose} handleEdit={handleEdit} imgsProducts={imgsProducts}/>
    </>
  );
};

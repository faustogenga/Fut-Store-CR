import React, { useState } from 'react';
import "../CSS/Modal.css";
import ModalStatus from './ModalStatus';

export const Status = ({user,item,currentId,handleEdit}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-warning"}>
        Estado
      </button>
      <ModalStatus user={user} item={item} currentId={currentId} isOpen={isOpen} onClose={onClose} handleEdit={handleEdit}/>
    </>
  );
};

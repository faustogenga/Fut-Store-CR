import React, { useState } from 'react';
import "../CSS/Modal.css";
import ModalChat from './ModalChat';

export const Chat = ({user,item,currentId,handleChat}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-warning"}>
        Chat
      </button>
      <ModalChat user={user} item={item} currentId={currentId} isOpen={isOpen} onClose={onClose} handleChat={handleChat}/>
    </>
  );
};

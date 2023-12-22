import React, { useState } from 'react';
import "../CSS/Modal.css";
import { Reviews } from './Reviews';

export const ReviewButton = ({user,item}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }
  console.log(item);

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-warning"}>
        Reviews ✨
      </button>
      <Reviews user={user} item={item} isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

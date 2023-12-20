import React, { useState } from 'react';
import "../CSS/Modal.css";
import ModalMessages from './ModalMessages';
import { onGetMessages } from '../CRUD/app';

export const ChatMessages = ({user,item,currentId,isVendor}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([])

  const fetchMessages = async() => {
    const dataFetchMessages = await onGetMessages(currentId);
    const filterMessages = dataFetchMessages.docs.map((doc, index) => (
      {
        key : index,
        id: doc.id,
        ...doc.data()
      }
    ))
    setMessages(filterMessages.sort((a, b) => a.order - b.order));
    console.log(filterMessages.sort((a, b) => a.order - b.order));
  }

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button className='btn btn-info' onClick={() => {setIsOpen(true); fetchMessages()}}>Abrir Chat 💬</button>
      <ModalMessages user={user} item={item} messages={messages} isOpen={isOpen} onClose={onClose} isVendor={isVendor}/>
    </>
  );
};

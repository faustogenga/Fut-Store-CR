import React, { useState } from 'react';
import "../CSS/Modal.css";
import ModalMessages from './ModalMessages';
import { onGetMessages } from '../CRUD/app';

export const ChatMessages = ({user,item,currentId}) => {
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
    setMessages(filterMessages);
    console.log(filterMessages);
  }

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button className='btn btn-info' onClick={() => {setIsOpen(true); fetchMessages()}}>Abrir Chat 💬</button>
      <ModalMessages user={user} item={item} messages={messages} isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

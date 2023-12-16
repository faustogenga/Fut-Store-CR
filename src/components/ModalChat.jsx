import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { collectionAssignation, onFindAll } from "../CRUD/app";


const ModalChat = ({ item, currentId, isOpen, onClose, handleChat }) => {

  const [chat, setChat] = useState('');

  //onchange para editar estado / editando informacion

  useEffect(() => {
    if (item) {
      fetchChat();
    }
  }, []);


  const fetchChat = async () => {
    collectionAssignation('Chat');
    const docsSnapShot = await onFindAll();
    let filterData = docsSnapShot.docs.map((doc, index) => (
      {
        key: index,
        id: doc.id,
        ...doc.data()
      }
    ));
    filterData = filterData.filter(chat => chat.orderId === currentId);
    console.log(filterData);
    setChat(filterData);
  };

  const onChangeValues = ({ target }) => {
    console.log(target.value);
    setChat(target.value);
  };

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
        <div className="text-center">
          <p className="bg-black">{item.name}</p>
          <p className="bg-black">{currentId}</p>
          <p className="bg-black">{chat[0]?.msm1}</p>
        </div>
      </div>
    </>
  );
};

export default ModalChat;
import React, { useEffect, useState } from 'react'
import { collectionAssignation, onFindAll, onInsert, onUpdate } from '../CRUD/app';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';


export const Inbox = ({ user }) => {
  const [uniqueVendors, setUniqueVendors] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [vendor, setVendor] = useState('');
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    if (user) {
      fetchDataOrders();
    }
  }, [user]);

  const fetchDataOrders = async (email) => {
    collectionAssignation('OrderPlaced');
    try {
      const docsSnapshot = await onFindAll();
      let filterData = docsSnapshot.docs.map((doc, index) => (
        {
          key: index,
          id: doc.id,
          ...doc.data(),
        }
      ));
      filterData = filterData.filter(item => item.userEmail === user.email);
      let uniquevendors = Array.from(new Set(filterData.map((order) => order.vendor)));
      setUniqueVendors(uniquevendors);
      console.log(filterData);
    } catch (error) {
      console.log(error)
    }
  };

  //validaciones para ver si los campos estan vacios
  const messageValidation = () => message.length > 0 && vendor.length > 0;

  //validaciones para ver si ya existe el chat
  const newMessageValidation = async () => {
    //fetch todos los chats
    const dataFetchChat = await onFindAll();
    //filtrar la data en un array
    const filterData = dataFetchChat.docs.map((doc, index) => (
      {
        key: index,
        id: doc.id,
        ...doc.data()
      }
    ));
    console.log(filterData);
    //chequear si ya hay un chat de este usuario
    console.log(user.email);
    console.log(vendor);
    const userChat = filterData.find((userChat) => (userChat.sender === user.email && userChat.vendor === vendor));
    if (userChat) {
      console.log("existe");
      setChatId(userChat.id);
      sendMessageToChat();
    }
    else {
      console.log("no existe");
      sendNewMessage();
    }
  }

  //Mandar Nuevo mensaje / Nuevo Chat
  const sendNewMessage = async () => {
    try {
      await onInsert({
        sender: user.email,
        vendor: vendor,
        msmSender: message,
        msmVendor: ''
      });
      Swal.fire({
        title: "Mensaje Enviado",
        text: "Revisa tu inbox pronto con la respuesta de tu vendor",
        icon: "success"
      });
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageToChat = async () => {
    try {
      await onUpdate(chatId, { msmSender: message });
      Swal.fire({
        title: "Mensaje Enviado",
        text: "Revisa tu inbox pronto con la respuesta de tu vendor",
        icon: "success"
      });
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async () => {
    if (messageValidation()) {
      collectionAssignation('Chat');
      newMessageValidation();
      setMessage('');
      setVendor('');
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos vacios",
        text: "Porfavor elige un vendedor y escribe un mensaje",
      });
    }
  }

  const handleChangeVendor = ({ target }) => {
    setVendor(target.value);
  }
  const handleChangeMessage = ({ target }) => {
    setMessage(target.value);
  }


  return (
    <div style={{
      backgroundImage: "url(https://i.pinimg.com/originals/cb/e8/23/cbe8230004b895b545b61337f8d0ff99.jpg)",
      backgroundSize: "cover"
    }}
      className='d-flex justify-content-center py-4'>
      <div style={{ width: "40%" }} className=''>
        <h3 className='text-center mt-3 bg-white rounded-pill opacity-75'>Mensajes</h3>
        <div className='text-center'>
          <button className='btn btn-info m-3' onClick={() => setIsOpen(true)}>Nuevo</button>
          <button className='btn btn-success m-3' onClick={() => setIsOpen(false)}>Inbox</button>
        </div>
        <div className='p-5 bg-white rounded'>
          {isOpen ? (
            <>
              <div className='d-flex'>
                <div className='align-self-center'>Mensaje para : </div>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-simple-select-standard-label">Vendedor</InputLabel>
                  <Select className='mx-1'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={vendor}
                    label="Vendedor"
                    onChange={handleChangeVendor}
                  >
                    {uniqueVendors.map((vendor, index) => {
                      return <MenuItem key={index} value={vendor}>{vendor}</MenuItem>
                    }
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className='text-center m-1 mt-3'>
                <textarea
                  className="form-control"
                  style={{ height: "30vh" }}
                  type="text"
                  name="infoEnvio"
                  value={message}
                  onChange={handleChangeMessage}
                  placeholder='Mensaje para el vendedor de tu orden...' />
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-info m-2' onClick={sendMessage}>Enviar</button>
                <button className='btn btn-danger m-2' onClick={() => setMessage('')}>Borrar</button>
              </div>
            </>
          ) : (
            <div className='text-center'>
              is closed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

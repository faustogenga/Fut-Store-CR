import React, { useEffect, useState } from 'react'
import { collectionAssignation, onFindAll, onInsert, onInsertMessageDoc, onInsertNewChat, onUpdate } from '../CRUD/app';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { BarChart } from '@mui/x-charts/BarChart';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalMessages from './ModalMessages';
import { ChatMessages } from './ChatMessages';


export const Inbox = ({ user, isVendor }) => {
  const [uniqueVendors, setUniqueVendors] = useState([]);
  const [chats, setChats] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [vendor, setVendor] = useState('');
  const [message, setMessage] = useState('');

  //inbox navigation

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    if (user) {
      fetchDataOrders();
      fetchDataChat();
    }
  }, [user, isVendor]);

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
      console.log(isVendor);
      if (isVendor) {
        console.log(filterData);
        filterData = filterData.filter(item => item.vendor === user.email);
        console.log(filterData);
        let uniquevendors = Array.from(new Set(filterData.map((order) => order.userEmail)));
        console.log(uniquevendors);
        setUniqueVendors(uniquevendors);
      } else {
        filterData = filterData.filter(item => item.userEmail === user.email);
        let uniquevendors = Array.from(new Set(filterData.map((order) => order.vendor)));
        setUniqueVendors(uniquevendors);
     }
      console.log(filterData);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchDataChat = async () => {
    //collection name
    collectionAssignation('Chat');
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
    setChats(filterData);
  }

  const refresh = async () => {
    await fetchDataChat();
  }


  const inboxLoad = async () => {
    console.log("inbox loaded");
    refresh();
    if(isVendor) {
      const userChat = chats.filter((userChat) => (userChat.vendor === user.email));
      console.log(userChat);
      setInbox(Array.from(userChat));
    } else {
      const userChat = chats.filter((userChat) => (userChat.sender === user.email));
      console.log(userChat);
      setInbox(Array.from(userChat));
    }
    setVendor('');
  }

  //validaciones para ver si los campos estan vacios
  const messageValidation = () => 400 > message.length && message.length > 0 && vendor.length > 0;

  //validaciones para ver si ya existe el chat
  const newMessageValidation = async () => {
    //ver chats
    console.log(chats);
    //chequear si ya hay un chat de este usuario
    let userChat = '';
    if(isVendor){
      userChat = chats.find((userChat) => (userChat.vendor === user.email && userChat.sender === vendor));
    } else {
        userChat = chats.find((userChat) => (userChat.sender === user.email && userChat.vendor === vendor));
    }
    if (userChat) {
      console.log("existe");
      sendMessageToChat(userChat.id);
    }
    else {
      console.log("no existe");
      sendNewMessage();
    }
  }

  //Mandar Nuevo mensaje y Nuevo Chat
  const sendNewMessage = async () => {
    try {
      await onInsertNewChat({
        sender: user.email,
        vendor: vendor,
      }, {
        msm: message,
        sender: user.email,
        order: 1
      });
      Swal.fire({
        title: "Mensaje Enviado",
        text: "Revisa tu inbox pronto con la respuesta de tu vendor",
        icon: "success"
      });
      await refresh();
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageToChat = async (chatId) => {
    try {
      await onInsertMessageDoc(chatId, {
        msm: message,
        sender: user.email,
        order: 0
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

  const sendMessage = async () => {
    console.log(message);
    console.log(vendor);
    if (messageValidation()) {
      newMessageValidation();
      setMessage('');
      setVendor('');
    } else {
      Swal.fire({
        icon: "error",
        title: 'Campos vacios o \n Mensaje mayor 400 caracteres',
        text: "Porfavor elige un vendedor y escribe un mensaje nuevamente",
      });
    }
  }

  //Handle Changes
  const handleChangeVendor = ({ target }) => {
    setVendor(target.value);
  }
  const handleChangeMessage = ({ target }) => {
    setMessage(target.value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div style={{
      backgroundImage: "url(https://i.pinimg.com/originals/cb/e8/23/cbe8230004b895b545b61337f8d0ff99.jpg)",
      backgroundSize: "cover"
    }}
      className='d-flex justify-content-center py-4'>
      <div style={{ width: "40%" }} className=''>
        <h3 className='text-center mt-3 bg-white rounded-pill opacity-75'>Mensajes 📧</h3>
        <div className='text-center'>
          <button className='btn btn-info m-3' onClick={() => setIsOpen(true)}>Nuevo</button>
          <button className='btn btn-success m-3' onClick={() => { setIsOpen(false); inboxLoad() }}>Inbox</button>
        </div>
        <div className='p-5 bg-white rounded'>
          {isOpen ? (
            <>
              <div className='d-flex'>
                <div className='align-self-center'>Mensaje para : </div>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-simple-select-standard-label">{isVendor?  "Usuario" : "Vendedor"}</InputLabel>
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
                  placeholder='Escribe tu mensaje aqui' />
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-info m-2' onClick={sendMessage}>Enviar</button>
                <button className='btn btn-danger m-2' onClick={() => setMessage('')}>Borrar</button>
              </div>
            </>
          ) : (
            <div className='text-center'>
              <>
                <TableContainer component={Paper} className='' >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bolder" }}>{isVendor?  "Usuario" : "Vendedor"}</TableCell>
                        <TableCell style={{ fontWeight: "bolder" }}>Chat</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inbox?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell className="p-4" align="left">{isVendor?  row.sender : row.vendor}</TableCell>
                          <TableCell>
                            <ChatMessages user={user} item={row} currentId={row.id} isVendor={isVendor} />
                          </TableCell>
                        </TableRow>
                      ))
                      }
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={inbox?.length} // Use the actual total count of orders
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ModalStatus = ({ item, currentId, isOpen, onClose, handleEdit }) => {
  //definimos las casilla con el estado.

  //Estado que queremos cambiar
  const [estado, setEstado] = useState(item.status);
  const [infoEnvio, setInfoEnvio] = useState(item.shippingInfo);

  //onchange para editar estado / editando informacion

  const onChangeValues = ({ target }) => {
    console.log(target.value);
    setEstado(target.value);
  };

  const onChangeInfoEnvio = ({ target }) => {
    console.log(target.value);
    setInfoEnvio(target.value);
  };

  //funcion UPDATE, aqui mandamos un alert para verificar la modificacion del estado
  //llamamos al HANDLEEDIT para realizar el edit
  //cerramos el MODAL
  const Update = async ev => {
    ev.preventDefault();
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Estas seguro que quieres modificar estado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Modificar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleEdit(currentId, estado, infoEnvio);
        onClose();
        console.log("Estado Actualizado");
        Swal.fire({
          title: "Estado Modificado",
          text: "Gracias",
          icon: "success"
        })
      }
    });
  }

  
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
          <h3>Cambia el estado de la orden</h3>
          <h5 className="m-3">Estado Actual : {estado}</h5>
          <FormControl className="col-6 m-2 mb-2">
            <InputLabel id="demo-simple-select-label">estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={estado}
              label="Age"
              onChange={onChangeValues}
            >
              <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
              <MenuItem value={'En Proceso'}>En Proceso</MenuItem>
              <MenuItem value={'Enviado'}>Enviado</MenuItem>
              <MenuItem value={'Entregado'}>Entregado</MenuItem>
              <MenuItem value={'Cancelado'}>Cancelado</MenuItem>
            </Select>
          </FormControl>
          <div className="m-2">Agrega informacion sobre el envio</div>
          <textarea className="form-control" type="text" name="infoEnvio" value={infoEnvio} onChange={onChangeInfoEnvio} placeholder='Informacion Envio' />
          <div className="container-fluid text-center">
            {/*BOTON*/}
            <button className="btn btn-info m-2" onClick={Update}>Actualizar</button>
            <button className="btn btn-danger m-2" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalStatus;
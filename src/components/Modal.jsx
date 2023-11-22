import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { collectionAssignation, onUpdate } from "../CRUD/app";
import { useState } from "react";

const Modal = ({item, currentId, isOpen, onClose }) => {

  const initialValues = {
    category : item.category,
    description : item.description,
    name : item.name,
    price : item.price,
    size : item.size,
    img : item.img,
    stock : item.stock,
    vendor : item.vendor
  }

  const [values, setValues] = useState(initialValues);

  const onChangeValues = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    console.log(values);
}



const Update = async ev =>{
  ev.preventDefault();
  console.log(currentId);
  console.log(values);
  Swal.fire({
    title: "¿Estas Seguro?",
    text: "Estas seguro que quieres modificar producto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Modificar"
  }).then( async (result) => {
    if (result.isConfirmed) {
      collectionAssignation('Products');
      await onUpdate(currentId, values);
      onClose()
      Swal.fire({
        title: "Producto Modificado",
        text: "Gracias por actualizar tu producto",
        icon: "success"
      })
    }
  });
}


  if (!isOpen) return null
  return (
    <>
      <div className="overlay" />
      <div className="modalbox m-2">
        <button className={"closeBtn"} onClick={onClose}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <h3>Modifica tu producto</h3>
        <div className="text-start m-0">Categoria </div>
        <input required="required" className='form-control ' type="text" name="category" value={values.category} onChange={onChangeValues} placeholder='Categoria' />
        <div className="text-start" >Producto </div> 
        <input required="required" className='form-control ' type="text" name="name" value={values.name} onChange={onChangeValues} placeholder='Producto' />
        <div className="text-start m-0">Descripcion </div>
        <textarea className="form-control p-4" type="text" name="description" value={values.description} onChange={onChangeValues} placeholder='Descripcion' />
        <div className="text-start" >Imagen </div>
        <input required="required" className='form-control ' type="text" name="img" value={values.img} onChange={onChangeValues} placeholder='Imagen' />
        <div className="text-start m-0">Precio </div>
        <input required="required" className='form-control  ' type="text" name="price" value={values.price} onChange={onChangeValues} placeholder='Precio' />
        <div className="text-start m-0">Talla </div>
        <input required="required" className='form-control  ' type="text" name="size" value={values.size} onChange={onChangeValues} placeholder='Talla' />
        <div className="text-start m-0">Cantidad </div>
        <input required="required" className='form-control  ' type="text" name="stock" value={values.stock} onChange={onChangeValues} placeholder='Cantidad' />
        <div className="container-fluid text-center">
        <button className="btn btn-info m-2" onClick={Update}>Actualizar</button>
        <button className="btn btn-danger m-2" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
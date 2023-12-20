import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useState } from "react";

const Modal = ({ user, item, currentId, isOpen, onClose, handleEdit }) => {

  //incio de modal par editar productos,
  //definimos las casillas con la info del producto
  const initialValues = {
    category: item.category,
    description: item.description,
    name: item.name,
    price: item.price,
    size: item.size,
    img: item.img,
    stock: item.stock,
    vendor: item.vendor
  }

  //values con la info del producto
  const [values, setValues] = useState(initialValues);


  //onchange para editar VALUES segun vamos ingresando / editando informacion
  const onChangeValues = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    console.log(values);
  }



  //funcion UPDATE, aqui mandamos un alert para verificar la modificacion del producto
  //llamamos al HANDLEEDIT para realizar el edit
  //cerramos el MODAL
  const Update = async ev => {
    ev.preventDefault();
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Estas seguro que quieres modificar producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Modificar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleEdit(currentId, values);
        onClose();
        console.log("Producto Actualizado");
        Swal.fire({
          title: "Producto Modificado",
          text: "Gracias por actualizar tu producto",
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

        {/* Condicion para ver si uno es ADMIN y poder editar el vendor del producto*/}
        {user.email === "admin@gmail.com" && (
          <>
            <div className="text-start m-0">Vendedor </div>
            <input required="required" className='form-control  ' type="text" name="vendor" value={values.vendor} onChange={onChangeValues} placeholder='Vendor' />
          </>
        )}
        <div className="container-fluid text-center">
          {/*BOTON*/}
          <button className="btn btn-info m-2" onClick={Update}>Actualizar</button>
          <button className="btn btn-danger m-2" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
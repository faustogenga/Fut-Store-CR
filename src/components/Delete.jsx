import React from 'react'
import Swal from "sweetalert2";
import { collectionAssignation, onDelete } from '../CRUD/app';

export const Delete = ({ currentId }) => {

  const onDeleteItem = () => {
    console.log(currentId)
    Swal.fire({
      title: "¿Seguro que quieres eliminar?",
      text: "Eliminar producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        collectionAssignation('Products');
        await onDelete(currentId);
        Swal.fire("Producto Eliminado", {
          icon: "success",
        })
      }
    });
  }

  return (
    <>
      <button className='btn btn-danger' onClick={onDeleteItem}>Borrar</button>
    </>
  )
}

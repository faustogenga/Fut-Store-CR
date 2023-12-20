import React from 'react'
import Swal from "sweetalert2";

export const Delete = ({ currentId, handleDelete}) => {

  const onDeleteItem = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar?",
      text: "Eliminando...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleDelete(currentId);
        console.log("Borrado");

        Swal.fire({
          title: "Eliminado :(",
          imageUrl: "https://i.pinimg.com/564x/a6/ea/cb/a6eacbb1e92c055a4e77059d960da8fd.jpg",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image"
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

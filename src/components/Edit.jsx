import { TextFields } from '@mui/icons-material';
import React from 'react'
import Swal from "sweetalert2";

export const Edit = ({ item }) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    const editRun = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Multiple inputs",
            html: `
              <input id="swal-input1" class="swal2-input">
              <input id="swal-input2" class="swal2-input">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
              ];
            }
          });
          if (formValues) {
            Swal.fire(JSON.stringify(formValues));
          }
    }

    return (
        <button className='btn btn-info' onClick={editRun}>Editar</button>
    )
}

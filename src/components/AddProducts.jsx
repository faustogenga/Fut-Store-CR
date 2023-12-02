import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export const AddProducts = ({ isOpen, onClose, handleAdd, user }) => {

    const initialValues = {
        category: '',
        description: '',
        name: '',
        price: '',
        size: '',
        img: '',
        stock: '',
        vendor: ''
    }

    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (!user) {
            return;
        } else {
            setValues({ ...values, vendor: user.email });
        }

    }, [user]);


    const onChangeValues = ({ target }) => {
        const { name, value } = target;
        setValues({ ...values, [name]: value });
        console.log(values);

    }

    const addProduct = async ev => {
        ev.preventDefault();
        console.log(values);
        if (Object.values(values).some(value => value.trim() === '')) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error'
            });
            return;
        }

        Swal.fire({
            title: "¿Estas Seguro?",
            text: "Estas seguro que quieres agregar producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar"
        }).then((result) => {
            if (result.isConfirmed) {
                handleAdd(values);
                onClose();
                setValues({ ...initialValues, vendor: user.email });
                Swal.fire({
                    title: "Producto Agregado",
                    text: "Gracias por agregar tu producto",
                    icon: "success"
                })
            }
        }
        );
    }


    if (!isOpen) return null
    return (
        <>
            <div className="overlay" />
            <div className="modalbox m-2">
                <button className={"closeBtn"} onClick={onClose}>
                    <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <h3>Agrega tu producto</h3>
                <form>
                    <div className="text-start m-0">Categoria </div>
                    <input required="required" className='form-control ' type="text" name="category" value={values.category} onChange={onChangeValues} placeholder='Categoria' />
                    <div className="text-start" >Producto </div>
                    <input required="required" className='form-control ' type="text" name="name" value={values.name} onChange={onChangeValues} placeholder='Producto' />

                    <div className="text-start" >Imagen </div>
                    <input required="required" className='form-control ' type="text" name="img" value={values.img} onChange={onChangeValues} placeholder='Imagen' />

                    <div className="text-start m-0">Descripción </div>
                    <textarea className="form-control p-4" type="text" name="description" value={values.description} onChange={onChangeValues} placeholder='Descripcion' />

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
                        <button className="btn btn-info m-2" type="sumbit" onClick={addProduct}>Agregar</button>
                        <button className="btn btn-danger m-2" onClick={() => { onClose(); setValues({ ...initialValues, vendor: user.email }); }}>Cerrar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProducts;
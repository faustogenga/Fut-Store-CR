import React from 'react'
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from 'sweetalert2';
import { collectionAssignation, onInsert } from '../CRUD/app';
import { useNavigate } from "react-router-dom";
import "../CSS/Reviews.css"


export const Reviews = ({ isOpen, isClose, selectedProduct }) => {
    const navigate = useNavigate();
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const currentDay = new Date().toLocaleDateString();
    const [review, setReview] = useState({
        name: '',
        comment: ''
    });

    const reviewData = {
        customer_name: review.name,
        customer_comment: review.comment,
        customer_rating: number,
        product_id: selectedProduct.product_id,
        vendor_name: selectedProduct.vendor,
        order_id: selectedProduct.orderId,
        review_date: currentDay
    }

    const addReviewToFirebase = async (reviewData) => {
        collectionAssignation('CustomerReviews');
        await onInsert(reviewData);
        Swal.fire({
            title: "¡Gracias!",
            text: "Tu reseña ha sido recibida correctamente.",
            icon: "success"
          });
          review.name = '';
          review.comment = '';
          setNumber(0);
          isClose();
    }
    
    const addCustomerReview = async ev  => {
        ev.preventDefault();
        try {
            if (review.name.trim() === '' || review.comment.trim() === '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, completa todos los campos.',
                    icon: 'error'
                });
                return;
            } else {
                addReviewToFirebase(reviewData);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Lo sentimos, se ha producido un error inesperado.',
                icon: 'error'
            });
        }
    } 

    const handleText = () => {
        switch (number || hoverStar) {
            case 0:
                return "Califica el producto";
            case 1:
                return "Muy insatisfecho";
            case 2:
                return "Insatisfecho";
            case 3:
                return "Normal";
            case 4:
                return "Satisfecho";
            case 5:
                return "Muy satisfecho";
            default:
                return "Califica el producto";
        }
    };

    const handleInputChange = ({ target }) => {
        setReview({
            ...review,
            [target.name]: target.value
        });
    };


    const handlePlaceHolder = () => {
        switch (number || hoverStar) {
            case 0:
                return "Deja tu reseña aquí...";
            case 1:
                return "¿Qué fue lo que menos te gustó del producto?";
            case 2:
                return "¿Cuál problema tuviste con este producto?";
            case 3:
                return "¿Qué mejorarías del producto?";
            case 4:
                return "¿Cuál problema tuviste con este producto?";
            case 5:
                return "¿Qué fue lo que más te gustó del producto?";
            default:
                return "Deja tu reseña aquí...";
        }
    };

    const handleCloseReviews = () => {
        Swal.fire({
            title: "¿Estás Seguro?",
            text: "¿Estás seguro que deseas cancelar tu reseña?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                isOpen = false;
                isClose();
                navigate('/orders');
                
            }
        });
    }

    return (
        <div className="ReviewContainer">
            <div className="snd-container">
                <div className="content">
                    <div className="productDetails">
                        <h1>{selectedProduct.name}</h1>
                        <img
                            style={{ width: '10rem', height: "10rem", borderRadius: "50%", border: "1px solid black",padding: "1rem", margin: "2.5rem" }}
                            src= {selectedProduct.product_img}
                            alt="name"
                        />
                    </div> <br />
                    <div className='starsContainer'>
                        <h1>{handleText()}</h1>
                        {Array(5)
                            .fill()
                            .map((_, index) =>
                                number >= index + 1 || hoverStar >= index + 1 ? (
                                    <AiFillStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                ) : (
                                    <AiOutlineStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                )
                            )}
                    </div>

                    <input
                        id='name'
                        type="text"
                        name="name"
                        value={review.name}
                        onChange={handleInputChange}
                        placeholder="Nombre del consumidor"
                        required
                    />
                    <textarea
                        id='comment'
                        name="comment"
                        value={review.comment}
                        onChange={handleInputChange}
                        placeholder={handlePlaceHolder()}
                        required
                    />
                    <button id='btnReview' type="submit" className={` ${!number && "disabled"}`} onClick={addCustomerReview}>Enviar Reseña</button>
                    <button className='btnCancel' onClick={handleCloseReviews}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}





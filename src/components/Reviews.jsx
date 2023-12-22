import React, { useEffect } from 'react'
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from 'sweetalert2';
import { collectionAssignation, onInsert } from '../CRUD/app';
import "../CSS/Modal.css";


export const Reviews = ({ item, user, isOpen, onClose }) => {
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const currentDay = new Date().toLocaleDateString();
    const [review, setReview] = useState('');

    const addReviewToFirebase = async () => {
        collectionAssignation('CustomerReviews');
        const reviewData = {
            customer_name: user?.email,
            customer_comment: review,
            customer_rating: number,
            product_id: item?.product_id,
            vendor_name: item?.vendor,
            order_id: item?.orderId,
            review_date: currentDay
        }
        await onInsert(reviewData);
        Swal.fire({
            title: "¡Gracias!",
            text: "Tu reseña ha sido recibida correctamente.",
            icon: "success"
        });
        setNumber(0);
        onClose();
    }

    const addCustomerReview = async ev => {
        ev.preventDefault();
        try {
            if (review.trim() === '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, completa todos los campos.',
                    icon: 'error'
                });
                return;
            } else {
                addReviewToFirebase();
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
        setReview(target.value)
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

    if (!isOpen) return null
    return (
        <>
            <div className="overlay" />
            <div className="modalbox w-50">
                <button className={"closeBtn"} onClick={onClose}>
                    <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className="container-fluid">
                    <h4 style={{ color: "black", fontFamily: "Poppins", fontWeight: "bold" }}>{item?.name}</h4>
                    <h5 style={{ color: "black" }}>🪪 {user?.email}</h5>
                    <div className="d-flex container-fluid mt-3">
                        <img
                            className="mt-2"
                            style={{ width: '12rem', height: "12rem", borderRadius: "10%", border: "1px solid black" }}
                            src={item?.product_img}
                            alt="img" />
                        <div className='container-fluid text-center ms-3'>
                            <h4 className='m-1' style={{ color: "black" }}>{handleText()}</h4>
                            <div className='mb-3' style={{ fontSize: "30px" }}>
                                👉
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
                            <textarea
                                className='w-100 h-50 p-2'
                                onChange={handleInputChange}
                                placeholder={handlePlaceHolder()}
                                required
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-info float-end' onClick={addCustomerReview}>Enviar Reseña</button>
                    </div>
                </div>
            </div>
        </>
    );
}


import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, where, query } from "firebase/firestore"
import { auth, db } from "./firebase_conection";

/* ***************************** GENERAL METHODS ***************************** */

/* 1. CREAR LA CONSTANTE DE LA COLECCION */
let collectionStr = '';

export const collectionAssignation = (assignedCollection) => {
    collectionStr = assignedCollection;
}

/* 2. CREAR & EXPORTAR TODOS LOS METODOS DEL CRUD */
export const onFindAll = async () => {
    console.log("Query FindALL");
    const result = await getDocs((collection(db, collectionStr)));
    return result;
};

/* 3. EXTRAER OBJETO */
export const onFindById = async (paramId) => {
    console.log("Query FindbyID");
    const result = await getDoc(doc(db, collectionStr, paramId));
    return result.data;
};

export const onFindByVendor = async (email) => {
    console.log("Query FindbyVendor");
    const result = await getDocs(query(collection(db, collectionStr), where("email", "==", email)));
    return result.empty
};

/* 4. INSERTAR OBJETO */
export const onInsert = async obj => {
    await addDoc(collection(db, collectionStr), obj);
    console.log("Query Insert");
}

/* 5. MODIFICAR OBJETO */
export const onUpdate = async (paramId, newObj) => {
    console.log("Query Update");
    await updateDoc(doc(db, collectionStr, paramId), newObj);
};

/* 6. ELIMINAR OBJETO */
export const onDelete = async paramId => {
    console.log("Query onDelete");
    await deleteDoc(doc(db, collectionStr, paramId));
}

/* ***************************** CART METHODS ***************************** */

/* 7. ENCONTRAR OBJETO EN COLECCIÓN POR EMAIL */
export const onFindbyEmail = async (email) => {
    console.log("Query FindbyEmail");
    const result = await getDocs(query(collection(db, collectionStr), where("userEmail", "==", email)));
    return result.docs;
};

/* 8. ELIMINAR PRODUCTO DEL CARRITO */
export const onDeleteFromCart = async (cartCollectionName, paramId, email) => {
    const cartRef = collection(db, cartCollectionName);
    try {
        const querySnapshot = await getDocs(query(cartRef, where('product_id', '==', paramId), where('userEmail', '==', email)));

        if (querySnapshot.size > 0) {
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(docToDelete.ref);
            console.log('Producto eliminado del carrito');
        } else {
            console.log('No se encontró el producto en el carrito del usuario');
        }
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        throw error;
    }
    console.log("Query Delete From Cart");
};

/* 9. LIMPIAR CARRITO */
export const onClearCart = async (cartCollectionName, email) => {
    const cartRef = collection(db, cartCollectionName);
    try {
        const querySnapshot = await getDocs(query(cartRef, where('userEmail', '==', email)));

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log('Producto eliminado del carrito.');
        });

    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
        throw error;
    }
    
    console.log("Query Clear Cart");
};

/* ***************************** ORDER METHODS ***************************** */

/* 10. INSERTAR ORDEN  */
export const onInsertOrder = async (obj) => {
    console.log(obj)
    await addDoc(collection(db, 'OrderPlaced'), obj);
    console.log("Query Insert Order");
}
/* 11. OBTENER ORDEN POR ID CON MÚLTIPLES PRODUCTOS */
export const onFindOrderById = async (orderId) => {
    try {
        const orderCollectionRef = collection(db, collectionStr);
        const querySnapshot = await getDocs(query(orderCollectionRef, where('orderId', '==', orderId)));

        const orderDetails = {
            order: [],
            products: []
        };
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.product_id) {
                console.log(data.product_id);
                orderDetails.products.push(data);
            } else {
                orderDetails.order = data;
            }
        });
        return orderDetails;
    } catch (error) {
        console.error("Error al obtener la orden por ID:", error);
        throw error;
    }
};
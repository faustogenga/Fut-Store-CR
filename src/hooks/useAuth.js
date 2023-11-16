import React from 'react'
import { useEffect } from 'react'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import {auth} from '../CRUD/firebase_conection'

export const useAuth = () => {

    const llego = () => {
        console.log("llego uuu");
    }

    return {
        llego
    }
}
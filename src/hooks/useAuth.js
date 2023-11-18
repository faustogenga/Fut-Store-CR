import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import {auth} from '../CRUD/firebase_conection'

export const useAuth = () => {

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing in:', error.message);
            throw error;
        }
    };

    return {
        signIn,
        signUp
    }
}
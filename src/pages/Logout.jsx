import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';


export default function Logout(){

   
        localStorage.clear();
    

    return (
        <Navigate to='/login' />
    )
}
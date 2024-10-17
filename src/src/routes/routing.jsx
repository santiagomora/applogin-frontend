import React, {useState} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Login from './login/login.jsx'
import Register from './register/register.jsx'
import Dashboard from './dashboard/dashboard.jsx'
import AuthUser from '../context/auth'
import {retrieveFromLocalStorage} from '../utils/storageHandler'

function Routing(){
    const [currentUser, setCurrentUser] = useState(retrieveFromLocalStorage('currentUser'))
    return(
        <AuthUser.Provider value={currentUser}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={currentUser 
                            ? <Navigate to="/dashboard"/>
                            : <Login currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}/> }/>
                    <Route
                        path="/dashboard/*"
                        element={currentUser 
                            ? <Dashboard currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}/> 
                            : <Navigate to="/login"/>}/>
                    <Route
                        path="/register"
                        element={currentUser 
                            ? <Navigate to="/dashboard"/> 
                            : <Register />}/>
                    <Route
                        path="*"
                        element={currentUser 
                            ? <Navigate to="/dashboard"/> 
                            : <Navigate to="/login"/>}/>
                </Routes>
            </BrowserRouter>
        </AuthUser.Provider>
    );
}

export default Routing

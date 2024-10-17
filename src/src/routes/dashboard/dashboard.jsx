import React, {useState} from 'react'
import {Routes, Route, Navigate, Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {useNavigate} from "react-router"
import {GET} from '../../utils/api'
import {removeFromLocalStorage} from '../../utils/storageHandler'
import {useMessageOutlet} from '../../hooks/messageOutlet'
import {MessageOutlet} from '../../components/messageOutlet'

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="dashboard-link"><Link to="page_1">Page 1</Link></li>
            <li className="dashboard-link"><Link to="page_2">Page 2</Link></li>
            <li className="dashboard-link"><Link to="page_3">Page 3</Link></li>
            <li className="dashboard-link"><Link to="page_4">Page 4</Link></li>
        </ul>
    )
}

function DashboardHeader({user, setCurrentUser, addMessage}){
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        setLoading('sending...')
        GET({
            url: '/auth/logout',
            headers: {
                'Authorization': user.authorization
            }
        })
        .then((response) => {
            const {data} = response
            addMessage({
                type: 'success',
                message: data.message,
                detail: data.detail,
                title: data.type,
                timeout: 3000
            })
            removeFromLocalStorage('currentUser')
            setLoading('redirecting to login...')
            setTimeout(() => {
                setCurrentUser(null)
            }, 3000)
        })
        .catch(({response}) => {
            setLoading(null)
            const {data} = response
            addMessage({
                type: 'danger',
                message: data.message,
                detail: data.detail,
                title: data.type,
                timeout: 3000
            })
        })
    }
    return (
        <div className="row">
            <div className="col-6">
                <h1 className="bold dashboard-link">
                    <Link to="">
                        Dashboard
                    </Link>
                </h1>
                <Navbar/>
            </div>
            <div className="col-6">
                <div className="text-right pad-10-top">
                    {
                        loading 
                        ? <><span>{loading}</span><TailSpin height={30} width={30} wrapperClass="loader-inline-wrapper"/></>
                        : <></>
                    }
                    <button onClick={logout} className="btn btn-danger submit-button bold" disabled={loading !== null}>
                        logout
                    </button>
                </div>
                <div className="text-right">
                    Welcome back, {user.name}
                </div>
            </div>
            <div className="col-12">
                <div className="separator"></div>
            </div>
        </div>
    )
}

function Dashboard(props){
    const [addMessage, closeMessage, messages] = useMessageOutlet()
    return (
        <>
            <div style={{position: 'absolute', top:20, right:20}}>
                <MessageOutlet messages={messages}
                    closeMessage={closeMessage}
                    allowStacking={true}/>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="dashboard-container">
                            <div className="container-fluid">
                                <DashboardHeader user={props.currentUser}
                                    addMessage={addMessage}
                                    setCurrentUser={props.setCurrentUser}/>
                                <Routes>
                                    <Route path="/"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Main page</h2>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/page_1"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Page 1</h2>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/page_2"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Page 2</h2>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/page_3"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Page 3</h2>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/page_4"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Page 4</h2>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="*"
                                        element={<Navigate to="/"/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

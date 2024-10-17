import React, {useState} from 'react'
import {Routes, Route, Navigate, NavLink, Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {useNavigate} from "react-router"
import {GET} from '../../utils/api'
import {removeFromLocalStorage} from '../../utils/storageHandler'
import {useMessageOutlet} from '../../hooks/messageOutlet'
import {MessageOutlet} from '../../components/messageOutlet'
import Support from './support/support'
import Configure from './configure/configure'
import Main from './main/main'
import Metrics from './metrics/metrics'
import Services from './services/services'

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="dashboard-link"><NavLink to="services">services</NavLink></li>
            <li className="dashboard-link"><NavLink to="support">support</NavLink></li>
            <li className="dashboard-link"><NavLink to="configure">configure</NavLink></li>
            <li className="dashboard-link"><NavLink to="metrics">metrics</NavLink></li>
        </ul>
    )
}

function DashboardHeader({user, setCurrentUser, addMessage, loading, setLoading}){
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
                <h1 className="bold dashboard-link" style={{marginBottom:"5px"}}>
                    <Link to="">
                        Applogin
                    </Link>
                </h1>
                <Navbar/>
            </div>
            <div className="col-6">
                <div className="text-right pad-10-top"  style={{marginBottom:"5px"}}>
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
    const [loading, setLoading] = useState(null)
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
                                    loading={loading}
                                    setLoading={setLoading}
                                    setCurrentUser={props.setCurrentUser}/>
                                <Routes>
                                    <Route path="/"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <Main setLoading={setLoading}
                                                        addMessage={addMessage}/>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/services"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <Services setLoading={setLoading}
                                                        addMessage={addMessage}/>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/support"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <Support setLoading={setLoading}
                                                        addMessage={addMessage}/>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/configure"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <Configure setLoading={setLoading}
                                                        addMessage={addMessage}/>
                                                </div>
                                            </div>
                                        }/>
                                    <Route path="/metrics"
                                        element={
                                            <div className="row">
                                                <div className="col-12">
                                                    <Metrics setLoading={setLoading}
                                                        addMessage={addMessage}/>
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

import React, {useEffect, useState} from 'react'
import {TailSpin} from 'react-loader-spinner'
import Text from '../../components/text'
import Password from '../../components/password'
import {Link} from 'react-router-dom'
import {useFormHandler} from '../../hooks/formHandler'
import {MessageOutlet} from '../../components/messageOutlet'
import {useMessageOutlet} from '../../hooks/messageOutlet'
import {useNavigate} from "react-router"

const validation = {
    password:{
        required: true,
        includes_upper: true,
        includes_lower: true,
        min_len: 10,
        special_chars: ['-', '_', '!', '?', '.', '*', '@']
    },
    name:{
        required: true,
        max_len: 50,
        alphabetic: true
    },
    lastname:{
        required: true,
        max_len: 50,
        alphabetic: true
    },
    email:{
        email: true,
        required: true,
        max_len: 80
    }
}

function Register(props){
    const [addMessage, closeMessage, messages] = useMessageOutlet()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const onError = ({data}) => {
        setLoading(null)
        addMessage({
            type: 'danger',
            message: data.message,
            detail: data.detail,
            title: data.type,
        })
    }
    const onSuccess = ({data}) => {
        addMessage({
            type: 'success',
            message: data.message,
            detail: data.detail,
            title: data.type
        })
        setLoading('redirecting to login page...')
        setTimeout(() => {
            navigate('/login')
        }, 3000)
    }
    const [form, errors, submit, changeHandler] = useFormHandler(
        '/auth/register',
        validation,
        setLoading,
        onSuccess,
        onError
    )

    return (
        <div className="container-fluid">
            <div className="row justify-content-center ">
                <div className="col-lg-3 col-md-4 col-sm-6 register-container">
                    <h1 className="bold">Sign up</h1>
                    <div className="separator"></div>
                    <form autoComplete="off" className="container-fluid">
                        <div className="row">
                            <div className="col-12 pad-0-h">
                                <MessageOutlet messages={messages}
                                    closeMessage={closeMessage}
                                    allowStacking={false}/>
                            </div>
                            <div className="col-12 pad-0-h">
                                <Text
                                    title="email *"
                                    name="email"
                                    placeholder="enter your email"
                                    rows={1}
                                    value={form[1].email}
                                    changeHandler={changeHandler}
                                    errors={errors.email || []}/>
                            </div>
                            <div className="col-12 pad-10-top pad-0-h">
                                <Password
                                    title="password *"
                                    name="password"
                                    placeholder="enter your password"
                                    rows={1}
                                    value={form[1].password}
                                    changeHandler={changeHandler}
                                    errors={errors.password || []}/>
                            </div>
                            <div className="col-12 pad-10-top pad-0-h">
                                <Text
                                    title="name *"
                                    name="name"
                                    placeholder={"enter your name"}
                                    rows={1}
                                    value={form[1].name}
                                    changeHandler={changeHandler}
                                    errors={errors.name || []}/>
                            </div>
                            <div className="col-12 pad-10-top pad-0-h">
                                <Text
                                    title="last name *"
                                    name="lastname"
                                    placeholder={"enter your last name"}
                                    rows={1}
                                    value={form[1].lastname}
                                    changeHandler={changeHandler}
                                    errors={errors.lastname || []}/>
                            </div>
                        </div>
                        <div className="row justify-content-end pad-10-top">
                            <div className="col-md-12 text-right pad-0-h">
                                <div className="text-right">
                                    <Link to="/login">
                                        already have an account?
                                    </Link>
                                </div>
                                <div className="text-right pad-10-top">
                                    {
                                        loading 
                                        ? <><span>{loading}</span><TailSpin height={30} width={30} wrapperClass="loader-inline-wrapper"/></>
                                        : <></>
                                    }
                                    <button onClick={submit} className="btn btn-success submit-button bold" disabled={loading !== null}>
                                        send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

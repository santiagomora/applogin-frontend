import React, {useState} from 'react'
import {TailSpin} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Text from '../../components/text'
import Password from '../../components/password'
import {useFormHandler} from '../../hooks/formHandler'
import {MessageOutlet} from '../../components/messageOutlet'
import {useMessageOutlet} from '../../hooks/messageOutlet'
import {useNavigate} from "react-router"
import {storeInLocalStorage} from '../../utils/storageHandler'

const validation = {
    email:{
        email: true,
        required: true
    },
    password:{
        required: true
    }
}

function Login(props){
    const [addMessage, closeMessage, messages] = useMessageOutlet()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const onError = ({data}) => {
        setLoading(null)
        addMessage({
            type: 'danger',
            message: data.message,
            detail: data.detail,
            title: data.type
        })
    }
    const onSuccess = ({data}) => {
        addMessage({
            type: 'success',
            message: data.message,
            detail: data.detail,
            title: data.type
        })
        setLoading('redirecting to dashboard...')
        setTimeout(() => {
            storeInLocalStorage('currentUser', data.user_data)
            props.setCurrentUser(data.user_data)
        }, 3000)
    }
    const [form, errors, submit, changeHandler] = useFormHandler(
        '/auth/login',
        validation,
        setLoading,
        onSuccess,
        onError
    )

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-3">
                    <div className="login-container">
                        <h1 className="bold">Sign in</h1>
                        <div className="separator"></div>
                        <form className="container-fluid">
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
                                        rows={1}
                                        placeholder="enter your email"
                                        value={form[1].email || ""}
                                        changeHandler={changeHandler}
                                        errors={errors.email || []}/>
                                </div>
                                <div className="col-12  pad-0-h pad-10-top">
                                    <Password
                                        title="password *"
                                        name="password"
                                        rows={1}
                                        placeholder="enter your password"
                                        value={form[1].password}
                                        changeHandler={changeHandler}
                                        errors={errors.password || []}/>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-md-12 pad-10-top">
                                    <div className="text-right">
                                        <Link to="/register">
                                            create account
                                        </Link>
                                    </div>
                                    <div className="text-right pad-10-top">
                                        {
                                            loading 
                                            ? <><span>{loading}</span><TailSpin height={30} width={30} wrapperClass="loader-inline-wrapper"/></>
                                            : <></>
                                        }
                                        <button onClick={submit} className="btn btn-success bold" disabled={loading !== null}>
                                            send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

import React, {useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Message = ({type, detail, title, timeout, id, closeMessage}) => {
    let interval = null

    const close = () => {
        closeMessage(id)
    }

    useEffect(() => {
        if(timeout && interval === null){
            interval = setTimeout(() => {
                closeMessage(id)
            }, timeout)
        }
    }, [])

    return (
        <Alert variant={type} dismissible onClose={close}>
            <Alert.Heading>{title}</Alert.Heading>
            <div className="alert-detail">
                {detail}
            </div>
        </Alert>
    )
}

const MessageOutlet = ({messages, allowStacking, closeMessage}) => {
    return (
        <>
        {
            Object.keys(messages).length > 0
            ?  allowStacking
               ? Object.keys(messages).map(id => <Message key={id} closeMessage={closeMessage} {...messages[id]}/>)
               : <Message closeMessage={closeMessage} {...messages[Math.max(...Object.keys(messages))]}/>
            : <></>
        }
        </>
  );
}


export {MessageOutlet, Message}

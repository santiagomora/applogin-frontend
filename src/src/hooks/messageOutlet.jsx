import React, {useState, useEffect} from 'react';

const intervals = {}

const useMessageOutlet = () => {
    const [messages, setMessages] = useState({})

    const closeMessage = (messageId) => {
        if(messageId in intervals){
            clearInterval(intervals[messageId])
            delete intervals[messageId]
        }
        setMessages((messages) => {
            const newMessages = {...messages}
            delete newMessages[messageId]
            return newMessages
        })
    }

    const addMessage = (message) => {
        const messageId = Date.now()
        message.id = messageId
        setMessages((messages) => {
            const newMessages = {...messages}
            newMessages[messageId] = message
            return newMessages
        })
    }
    return [addMessage, closeMessage, messages]
}

export {useMessageOutlet}

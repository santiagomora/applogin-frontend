import React, {useEffect, useContext} from 'react'
import {GET} from '../../../utils/api'
import {memo} from "react";
import AuthUser from '../../../context/auth'

const Configure = ({setLoading, addMessage}) => {
    const user = useContext(AuthUser)

    useEffect(() => {
        setLoading('loading...')
        GET({
            url: '/auth/test',
            params: {
                route: 'configure'
            },
            headers: {
                'Authorization': user.authorization
            }
        })
        .then((response) => {
            setLoading(null)
            const {data} = response
            addMessage({
                type: 'success',
                message: data.message,
                detail: data.detail,
                title: data.type,
                timeout: 3000
            })
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
    })
    return (
        <>
            <h2>Configure</h2>
        </>
    )
}

export default memo(Configure, (oldProps, newProps) => {
    return oldProps.setLoading == newProps.setLoading
})

import React, {useContext, useState, useEffect} from 'react'
import {POST} from '../utils/api'
import {checkValue, allErrors} from '../utils/validation'
import AuthUser from '../context/auth'

const useFormHandler = (url, validation, setLoading, onSuccess, onError) => {
    const [form, changeForm] = useState(["", {}]),
        [errors, changeErrors] = useState({})
    const currentUser = useContext(AuthUser)

    useEffect(() => {
        const lastChangedField = form[0],
            formValues = form[1]
        if(lastChangedField == ""){
            return;
        }
        const fieldErrors = checkValue(
            lastChangedField,
            formValues[lastChangedField],
            validation[lastChangedField]
        )
        const newErrors = {...errors}
        if(fieldErrors.length > 0){
            newErrors[lastChangedField] = fieldErrors
            changeErrors(newErrors)
        } else {
            if(lastChangedField in newErrors){
                delete newErrors[lastChangedField]
                changeErrors(newErrors)
            }
        }
    }, [form])

    const submit = (e) => {
        e.preventDefault()
        const formValues = form[1]
        const errors = allErrors(formValues, validation)
        if (Object.keys(errors).length > 0){
            changeErrors(errors)
        } else {
            setLoading("sending...")
            POST({
                url: url,
                data: formValues,
                headers: currentUser
                    ? {'Authorization': currentUser.authorization}
                    : {}
            })
            .then((response) => {
                setLoading(null)
                changeForm(['', {}])
                if(onSuccess){
                    onSuccess(response)
                }
            })
            .catch(({response}) => {
                setLoading(null)
                const {data} = response
                if(data.type == 'validation_error'){
                    changeErrors(data.detail)
                } else {
                    if(onError){
                        onError(response)
                    }
                }
            })
        }
    }

    const changeHandler = (e) => {
        const newForm = {...form[1]}
        const fieldName = e.currentTarget.name
        newForm[fieldName] = e.currentTarget.value
        changeForm([fieldName, newForm])
    }
    
    return [form, errors, submit, changeHandler]
}

export {useFormHandler}

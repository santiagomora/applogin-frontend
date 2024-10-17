import React from 'react';

export default function Password({
    title,
    name,
    rows,
    readOnly,
    holder,
    value,
    placeholder,
    changeHandler,
    errors
}){
    return (
        <>
            <label className="bold">
                {title}
            </label>
            <div>
                <input
                    type="password"
                    name={name}
                    placeholder={holder}
                    className="wfull text"
                    placeholder={placeholder}
                    className={(errors||[]).length>0 ? "input-error" : ""}
                    onChange={changeHandler}
                    value={value || ""}/>
            </div>
            <div>
                {
                    (errors||[]).length>0
                    ?
                        errors.map(
                            (e,i) => {
                                return (
                                    <div key={i} className="validation-error">
                                        {e}
                                    </div>
                                )
                            }
                        )
                    : ""
                }
            </div>
        </>
    );
}

import React from 'react';

export default function Text ({
    title,
    name,
    rows,
    value,
    changeHandler,
    placeholder,
    errors
}) {
    return (
        <>
            <label className="bold">
                {title}
            </label>
            <div>
                <input name={name}
                    type="text"
                    onChange={changeHandler}
                    placeholder={placeholder}
                    className={(errors||[]).length>0 ? "input-error" : ""}
                    value={value||""}
                    autoComplete="on"/>
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

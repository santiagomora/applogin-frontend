
const evaluation = {
    required: {
        test: (e, p) => e ? e.length <= 0 : true,
        message: (_) => 'is required'
    },
    max_len: {
        test: (e, max) => e ? e.length > max : false,
        message: (max) => `can't exceed ${max} characters`
    },
    min_len: {
        test: (e, min) => e ? e.length < min : false,
        message: (min) => `must exceed ${min} characters`
    },
    numeric: {
        test: (e, p) => e ? (e.match(/[^0-9]/gi) || []).length > 0 : false,
        message: (d) => 'must be numeric'
    },
    alphabetic: {
        test: (e, p) => e ? (e.match(/[^A-Za-z\s]/gi) || []).length > 0 : false,
        message: (d) => 'must be alphabetic'
    },
    email: {
        test: (e, p) => e ? (e.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi) || []).length <= 0 : false,
        message: (d) => 'must be a valid email address'
    },
    includes_upper:{
        test: (e, p) => e ? (e.match(/[A-Z]/g) || []).length <= 0 : false,
        message: (d) => 'must include an uppercase letter'
    },
    includes_lower:{
        test: (e, p) => e ? (e.match(/[a-z]/g) || []).length <= 0 : false,
        message: (d) => 'must include a lowercase letter'
    },
    special_chars: {
        test: (e, p) => e ? (e.match('(\\' + p.join('\|\\') + ')') || []).length <= 0 : false,
        message: (d) => `must include a special character: ${d.join(', ')}`
    }
}


const checkValue = (name, value, rules) => {
    if(!rules){
        return []
    }
    return Object.keys(rules).reduce(
        (err, ruleName, i) => {
            const param = rules[ruleName];
            if (evaluation[ruleName].test(value, param)) {
                return [...err, evaluation[ruleName].message(param)];
            }
            return err;
        }, []
    )
}


const allErrors = (form, rules) => {
    return Object.keys(rules).reduce(
        (err, fieldName, i) => {
            const errors = checkValue(fieldName, form[fieldName], rules[fieldName])
            if(errors.length > 0){
                err[fieldName] = errors
            }
            return err
        }, {}
    )
}

export {checkValue, allErrors}

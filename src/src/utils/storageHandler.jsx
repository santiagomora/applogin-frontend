
const storeInLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

const retrieveFromLocalStorage = (name) => {
    const item = localStorage.getItem(name) || null
    return item === null ? item : JSON.parse(item)
}

const removeFromLocalStorage = (name) => {
    localStorage.removeItem(name)
}

export {storeInLocalStorage, retrieveFromLocalStorage, removeFromLocalStorage}

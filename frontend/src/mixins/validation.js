export const isEmpty = (value) => {
    return !value
}
export const isValidInput = (value) => {
    return !isEmpty(value) && value.length >= 5 
}

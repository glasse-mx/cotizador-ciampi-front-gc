export const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
    
    return match
}
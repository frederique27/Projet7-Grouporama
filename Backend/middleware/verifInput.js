  
//fichier comprenant les fonctions de vérification des inputs des users
module.exports = {
    validEmail: function (value) {
        const regexEmail = /.+@.+\..+/
        return regexEmail.test(value)
    },
    validPassword: function (value) {
        const regexPassword = /[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-\s\-]{6,30}/
        return regexPassword.test(value)
    },
    validUsername: function (value) {
        const usernameRegex = /[a-zA-Z0-9\s\-]{2,30}/
        return usernameRegex.test(value)
    },
    validNname: function (value) {
        const nameRegex = /[a-zA-Z\s\-]{2,30}/
        return nameRegex.test(value)
    }
}
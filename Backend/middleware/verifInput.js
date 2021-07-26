  
//fichier comprenant les fonctions de vérification des inputs des users
module.exports = {
    validEmail: function (value) {
        const regexEmail = /.+@.+\..+/
        // /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
        return regexEmail.test(value)
    },
    validPassword: function (value) {
        //8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
        const regexPassword = /[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-\s\-]{6,30}/
        // /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,64})/
        return regexPassword.test(value)
    },
    validUsername: function (value) {
        const usernameRegex = /[a-zA-Z0-9\s\-]{2,30}/
        // /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return usernameRegex.test(value)
    },
    validNname: function (value) {
        const nameRegex = /[a-zA-Z\s\-]{2,30}/
        // /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return nameRegex.test(value)
    }
}
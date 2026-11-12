/**
 * Check length the pasword (at least 8 characters)
 * 
 * Check if it contains at least one number
 */
function validatorPassword(password) {
    if (password.length < 8) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

module.exports = validatorPassword;
const validateName = (lastName) => {
    return /^[a-zA-Z]+$/u.test(lastName);
};

// Function to validate Philippine phone number
const validatePhoneNumber = (phoneNumber) => {
    return /^(09|\+639)\d{9}$/u.test(phoneNumber);
};

// Function to validate email address
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Function to validate password
const validatePassword = (password) => {
// Password should have a minimum length of 8 characters
// and contain at least one lowercase letter, one uppercase letter,
// one numeric digit, and one special character.
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
};

const validateFields = (firstName, lastName, email, password, repeatPassword, phoneNumber) => {
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return 'Missing required field(s)';
    }
  
    if (firstName === '' || lastName === '' || email === '' || password === '' || phoneNumber === '') {
      return 'Empty string(s) found';
    }

    if (!validatePhoneNumber(phoneNumber)) {
      return 'Invalid phone number';
    }
  
    if (!validateEmail(email) || !validatePassword(password)) {
      return 'Invalid email or password';
    }
  
    if (password !== repeatPassword) {
      // Passwords don't match, handle the error
      return 'Password mismatched.';
    }
  
    return null; // No errors found
  };  

module.exports = {
    validateFields
};
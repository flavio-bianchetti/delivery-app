const ValidateEmail = (email) => {
  // adaptado do site:
  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,5})+(?:\.[a-zA-Z]{2,5})*$/;
  if (email.length > 0 && regex.test(email)) {
    return true;
  }

  return false;
};

export default ValidateEmail;

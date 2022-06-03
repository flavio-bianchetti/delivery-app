const ValidatePassword = (password) => {
  const minLength = 6;
  if (password.length >= minLength) {
    return true;
  }

  return false;
};

export default ValidatePassword;

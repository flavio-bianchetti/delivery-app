const ValidateName = (name) => {
  const minLength = 12;
  if (name.length >= minLength) {
    return true;
  }

  return false;
};

export default ValidateName;

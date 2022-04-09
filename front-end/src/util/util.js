
// This function trims a long text from beginning to LENGTH and adds ellipses at the end of the stiring
// length: max length of string, if more than that, it will trim. If not, do nothing.
// input: the string to trim
export const trimLongText = (input, length) => {
  return input.length > length ? `${input.slice(0, length)}...` : `${input}` ;
};

export const isValidEmail = email => (
  email.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
);
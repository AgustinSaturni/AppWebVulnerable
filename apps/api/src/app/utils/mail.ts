const regexPattern = /^([A-Za-z0-9._%+-]+)@/;

export const getLeftSideOfEmail = (email: string) => {
  const match = email.match(regexPattern);
  return match ? match[1] : null;
}
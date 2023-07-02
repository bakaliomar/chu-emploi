export default ({ next, auth }: Context) => {
  if (!auth?.currentUser.isManager) {
    return false;
  }
  return true;
};

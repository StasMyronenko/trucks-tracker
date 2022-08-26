const getToken = () => {
  const info = document.cookie;
  if (info.includes('jwt_token')) {
    const start = info.search('jwt_token=') + 'jwt_token='.length;
    const finish = info.slice(start).search(';');
    const token = `JWT ${info.slice(start, (finish === -1) ? undefined : finish + 1)}`;
    if (token.length > 4) {
      return token;
    }
  }
  return null;
};

module.exports = {
  getToken
}

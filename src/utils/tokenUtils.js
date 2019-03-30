export const returnToken = async () => {
  // TODO: EVITAR PEGAR ITENS DO LOCALSTORAGE SEM CHAVE STATICA
  const token = await localStorage.getItem('token');
  return token;
};

export const removeToken = async () => {
  // TODO: EVITAR PEGAR ITENS DO LOCALSTORAGE SEM CHAVE STATICA
  await localStorage.removeItem('token');
};

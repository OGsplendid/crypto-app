const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'W0pWgP+R38ZhFC7bE8accun2GCuixoiDEGcTefeJpCA='
  }
};

export const fetchCrypto = async() => {
  try {
    const response = await fetch('https://openapiv1.coinstats.app/coins', options);
    return await response.json();
  } catch(err) {
    console.error(err)
  }
}

export const fetchAssets = async() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(localStorage.getItem('assets') || '[]'))
    }, 2000)
  })
}

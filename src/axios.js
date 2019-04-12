const _axios = require('axios');

const axios = _axios.create({
  baseURL: "https://www.xn--28jyc.tk/"
});

const getMenu = async({ year, month, date }) => {
  const response = await axios.get("api/v2/menus", {
    params: {
      year,
      month,
      date
    }
  });
  const result = response.data;
  return result.length === 1 ? result[0] : null;
}

exports.axios = axios;
exports.getMenu = getMenu;

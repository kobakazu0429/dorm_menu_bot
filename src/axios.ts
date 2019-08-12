import axios from "axios";
import { getJST } from "./utils";

const MenuAPI = axios.create({
  baseURL: "https://www.xn--28jyc.tk/"
});

interface IOptions {
  type: "morning" | "lunch" | "dinner";
}

export const getMenu = async (
  options: IOptions = {} as IOptions
): Promise<string | null> => {
  const { type } = options;

  const { year, month, date } = getJST();

  const response = await MenuAPI.get("api/v2/menus", {
    params: {
      year,
      month,
      date
    }
  });
  const result = response.data;
  if (result.length !== 1) return null;

  if (type) {
    return result[0][type];
  } else {
    return result[0];
  }
};

export default MenuAPI;

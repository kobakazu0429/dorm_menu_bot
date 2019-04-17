export const getJST = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = Number((now.getMonth() + 1).toString().padStart(2, "0"));
  const date = now.getDate();
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  const day = dayList[new Date(year, month - 1, date, 9).getDay()];

  return {
    year, month, date, day
  };
}

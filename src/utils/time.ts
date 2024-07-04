export const calculate = (timestemp: number) => {
  const now = new Date();

  const past = timestemp < now.getTime() ? 1 : 0; // 输入的时间, 是过去为是1，否则为0

  let difference; // 差值
  if (past) {
    difference = new Date(now.getTime() - timestemp - 8 * 3600 * 1000);
  }  else {
    difference = new Date(timestemp - now.getTime() - 8 * 3600 * 1000);
  }

  // 计算过去的天数、小时、分钟和秒
  const dDays = difference.getTime() / 3600 / 24 / 1000;
  const dHours = difference.getHours();
  // const dMinutes = difference.getMinutes();
  // const dSeconds = difference.getSeconds();

  if (dDays > 1) {
    return `${dDays||0}天${past === 1 ? "前":"后"}`
  } 
  return `${dHours||0}小时${past === 1 ? "前":"后"}`
}

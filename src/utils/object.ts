/**
 * 获取一个对象的字节大小
 * @param obj 
 * @returns 
 */
export function getLSUsedSpace(obj: any) {
  return Object.keys(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) {
      return total;
    }
    if (typeof obj[curKey] === 'string') {
      total += obj[curKey].length + curKey.length;
    } else {
      total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;
    }
    return total;
  }, 0);
}
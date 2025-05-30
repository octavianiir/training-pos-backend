const Loggers = require("../Loggers");

module.exports = (array1, array2, key_compare = []) => {
  try {
    if (key_compare.length == 0) throw 'Key compare not specified';
    if (array1.length == 0) throw 'Array incomplete';

    let array_main = JSON.parse(JSON.stringify(array1));
    let array_sec = JSON.parse(JSON.stringify(array2));
    let array_add = [];
    let array_exist = [];

    for (const arr of array_main) {
      let counter = 0;
      for (const k of key_compare) {
        let check = array_sec.some((x) => x[k] == arr[k]);
        if (check) counter++;
      }
      let exist = counter == key_compare.length;
      if (exist) array_exist.push(arr); 
      if (!exist) array_add.push(arr);
      counter = 0;
    }

    return {array_add, array_exist};
  } catch (error) {
    Loggers.error(error);
    throw {error};
  }
}
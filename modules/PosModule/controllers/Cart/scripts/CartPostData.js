const { models } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const AvoidDuplicate = require("../../../constants/AvoidDuplicate");
const { TB_CART } = require("../../../constants/TableConstants");
const CartPutData = require("./CartPutData");
const CartGetData = require("./CartGetData");
const CartDeleteData = require("./CartDeleteData");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  const fieldPointer = ["product_id","user_id","quantity"];
  const table = TB_CART;

  try {
    let result = false;
    let arrPutData = [];
    let arrPostData = [];
    let arrDeleteData = [];

    for (const i in data) {
      if (data[i].product_id) {
        const cart = await CartGetData(db, {product_id:data[i].product_id});
        if (cart.length != 0) {
          let total_final = 0;
          
          for (const j in cart) {
            total_final = parseInt(cart[j].quantity) + parseInt(data[i].quantity);
            
            if(total_final < 0){
              total_final = 0;
            }

            if(total_final == 0){
              const newObj = {
                id: (cart[j].id).toString()
              };
              arrDeleteData.push(newObj);

            }else{
              const newObj = {
                id: cart[j].id,
                product_id: cart[j].product_id,
                quantity: total_final
              };
              arrPutData.push(newObj);
            }  
          }

        } else {
          arrPostData.push(data[i]);
        }
      }
    }

    if(arrPutData.length != 0){
      result = await CartPutData(db, arrPutData);
    }

    if(arrPostData.length != 0){
      result = await AvoidDuplicate(dbmodel, table, fieldPointer, arrPostData);
    }

    if(arrDeleteData.length != 0){
      result = await CartDeleteData(db, arrDeleteData);
    }

    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}
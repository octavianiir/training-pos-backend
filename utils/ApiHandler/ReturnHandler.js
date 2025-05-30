module.exports = {
    return_success: (res, data) => returnStatus(res, data, 200),
    return_created: (res, data) => returnStatus(res, data, 201),
    return_login: (res, data, token) => returnStatus(res, data, 200, token), 
  }
  
  function returnStatus(res, data, status = 200, token) {
    let type = typeof data;
    if (type == "object" && Array.isArray(data)) type = "array";
    res.status(status).json({data:data,token:token,type:type});
  }
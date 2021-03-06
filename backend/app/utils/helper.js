// uomnb.js                                                                                                                                                                                                                                                                                                                                                                       
var Helper = {
  mapRequestObject: mapRequestObject,
};

module.exports = Helper;

// --------------------------------------------------
/*
* @param object request request body
* @param model model mongoose model
* @return mapping
*/
function mapRequestObject(request, model) {
  var fieldsObj = model.schema.paths;
  var keyArray = [];
  for (var key in fieldsObj) {
    if (fieldsObj.hasOwnProperty(key)) {
      keyArray.push(key);
    }
  };

  // var request = request.body;
  const keys = Object.keys(request);
  keys.forEach(function (key) {
    if (typeof request[key] != 'object' && keyArray.indexOf(key) > -1) {
      model[key] = request[key];
    }
  });

  return model;
}

module.exports = {
    handleQueryResult: function(err, result, response) {
        if (err) console.log(err);
        console.log("Query result: " + JSON.stringify(result));
        response(result);
    },


};
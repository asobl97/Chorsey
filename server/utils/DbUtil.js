module.exports = {
    handleQueryResult: function(err, result, response) {
        if (err) throw err;
        console.log("Query result: " + JSON.stringify(result));
        response(result);
    }
};
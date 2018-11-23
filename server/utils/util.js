module.exports = {
    isEmpty: function(object) {
        for(var key in object) {
            if(object.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    isNotEmpty: function(object) {
        for(var key in object) {
            if(object.hasOwnProperty(key))
                return true;
        }
        return false;
    }
};
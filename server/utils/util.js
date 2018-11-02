module.exports = {
    isEmpty: function(object) {
        return ((object == null) || (object == undefined));
    },

    isNotEmpty: function(object) {
        return ((object != null) && (object != undefined));
    }
};
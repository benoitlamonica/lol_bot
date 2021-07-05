class StringHelper {

    static capitaliseFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

exports.StringHelper = StringHelper;
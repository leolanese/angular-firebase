// namespace.js 0.5.3
// https://github.com/abalanga/namespace
// (c) 2013 Adam Balanga
// namespace may be freely distributed under the MIT license.
// jshint boss:true
(function (window) {
    var slice = Array.prototype.slice;
    var namespaceRegexp = /^([A-Z_$][0-9A-Z_$]*)(\.[$A-Z_][0-9A-Z_$]*)*$/i;

    /**
     * Represents a namespace.
     * @param options properties for this namespace
     * @constructor
     */
    var namespace = function (options) {
        _extend(this, options);
    };

    namespace.prototype = {

        /**
         * Find or create a module in the namespace.
         * @param namespace the name and path of the module
         * @param options any default properties for the module (if created)
         * @returns {Object} the module in question
         */
        import: function (namespace, options) {
            return _import.apply(this, [options||{}].concat((_checkNamespace(namespace) || namespace).split('.')));
        },

        /**
         * Register an Object or native value into a module in the namespace.
         * @param module identifier for space
         * @param obj item to register
         * @returns {*} the item registered
         */
        register: function (module, obj) {
            if (arguments.length < 2) { throw new NamespaceError('Two arguments are required.'); }
            if (!_isString(module)) { throw new NamespaceError('Namespace should be a string.'); }
            module = [obj].concat((_checkNamespace(module)).split('.'));
            return _import.apply(this, [{}].concat(slice.call(module, 1, module.length-1)))[module[module.length-1]] = _isPlainObject(obj) ? _extend(new namespace(), obj) : obj;
        }
    };

    /**
     * An error in the namespace library.
     * @returns {*}
     * @constructor
     */
    function NamespaceError () {
        var error = Error.apply(this, arguments);
        error.name = "NamespaceError";
        return error;
    }

    /**
     * Checks for valid namespaces.
     * Indicicates errors by throwing an exception.
     * @param namespace the identifier for this namespace
     * @returns {string} the namespace provided
     * @throws {NamespaceError} when invalid syntax is used in namespace
     * @private
     */
    function _checkNamespace (namespace) {
        return namespaceRegexp.test(namespace) && namespace || (function(){ throw new NamespaceError('Invalid namespace \'' + namespace + '\' provided.'); })();
    }

    /**
     * Extend a given object with all the properties in passed-in objects.
     * Properties that are objects are converted to namespaces.
     *
     * Takes a variable number of parameters obj1, obj2, obj3 are
     * placeholders for the first three arguments if they exist.
     *
     * @param obj1 must be a namespace
     * @param {Object} obj2
     * @param {Object} [obj3]
     * @returns {*}
     * @private
     */
    function _extend (obj1, obj2, obj3) {
        for (var key in obj2) {
            obj1[key] = namespace && _isPlainObject(obj2[key]) ? new namespace(obj2[key]) : obj2[key];
        }
        return obj3 && _extend.apply(this, [obj1].concat(slice.call(arguments, 2))) || obj1;
    }

    /**
     * Return a property from this namespace if it exists or create a new namespace as the property if it does not.
     * @param module the name of the module
     * @param options default properties for the created module.
     * @returns {*|namespace}
     * @private
     */
    function _getModule (module, options) {
        return this[module] = this[module] || new namespace(options);
    }

    /**
     * Helper function for import allowing for recursion to be performed on namespace tokens by moving options to first argument.
     * @param options default properties for the created module.
     * @param namespace this and all following arguments are tokens in the namespace
     * @returns {*} the namespace module requested
     * @private
     */
    function _import (options, namespace) {
        if (arguments.length > 2) {
            return _import.apply(_getModule.call(this, namespace, options), [options].concat(slice.call(arguments, 2)));
        }
        return namespace && _getModule.call(this, namespace, options) || this;
    }

    /**
     * Checks if the object is a plain object (i.e., has no constructor and consists solely of properties.)
     * @param obj the object to check
     * @returns {boolean}  true if the argument is a plain object and false otherwise
     * @private
     */
    function _isPlainObject (obj) {
        return  typeof obj == 'object' && obj.constructor == Object.prototype.constructor;
    }

    /**
     * Checks if the argument provided is a string.
     * @param str the argument in question
     * @returns {boolean} true if the argument is a string and false otherwise
     * @private
     */
    function _isString (str) {
        return typeof str == "string" || typeof str == "object" && str.constructor === String;
    }

    /* test-hook */
    // Hooks for testing private functions (not found in minimized source when generated by grunt).
    namespace.__test__ = {
        _checkNamespace: _checkNamespace,
        _extend: _extend,
        _getModule: _getModule,
        _import: _import,
        _isPlainObject: _isPlainObject,
        _isString: _isString
    };
    /* end-test-hook */

    // Support node, AMD and global window variable if applicable.
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = namespace;
    }
    else if (typeof define === "function" && define.amd) {
        define("namespace", [], function () { return namespace; } );
    }
    else if (typeof window === "object" && typeof window.document === "object") {
        window.namespace = namespace;
    }
})(window);
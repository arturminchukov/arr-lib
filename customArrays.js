var customArrays = (function () {

    var customArrays = {
        take: function (array, n) {
            if (!array || array.length === 0 || n === 0) {
                return [];
            } else if (!n) {
                return array[0];
            }

            var answer = [];

            for (var i = 0; i < n; i++) {
                answer.push(array[i]);
            }

            return answer;
        },

        skip: function (array, n) {
            if (!array || n < 1) {
                return array;
            }

            var answer = [];

            for (var i = n; i < array.length; i++) {
                answer.push(array[i]);
            }

            return answer;
        },

        map: function (array, callback) {
            if (!array || array.length === 0 || !callback) {
                return array;
            }

            var answer = [];

            for (var i = 0; i < array.length; i++) {
                answer.push(callback(array[i], i, array));
            }

            return answer;
        },

        reduce: function (array, callback, initialValue) {
            if (!array || !callback || !initialValue) {
                return initialValue;
            }

            var accumulator = initialValue;

            for (var i = 0; i < array.length; i++) {
                accumulator = callback(accumulator, array[i], i, array);
            }

            return accumulator;
        },

        filter: function (array, callback) {
            if (!array || array.length === 0 || !callback) {
                return array;
            }

            var answer = [];

            for (var i = 0; i < array.length; i++) {
                if (callback(array[i], i, array)) {
                    answer.push(array[i]);
                }
            }

            return answer;
        },

        forEach: function (array, callback) {
            if (!array || array.length === 0 || !callback) {
                return array;
            }

            for (var i = 0; i < array.length; i++) {
                callback(array[i], i, array);
            }
        },

        chain: function (array) {
            var methods = Object.keys(this);
            var mainArr = this;
            var chainArr = {
                array,

                values: function () {
                    return this.array;
                }
            };

            this.foreach(methods, function (method) {
                chainArr[method] = (function () {
                    var args = [this.array];

                    for (var j = 0; j < arguments.length; j++) {
                        args[j + 1] = arguments[j];
                    }

                    chainArr.array = mainArr[method].apply(null, args);

                    return chainArr;
                }).bind(chainArr);
            })

            return chainArr;
        },

        cache: {},

        sum: function () {
            var sum = 0;

            if (!arguments) {
                return sum;
            }

            var cacheKey = arguments[0];

            for (var i = 0; i < arguments.length; i++) {
                cacheKey += '+' + arguments[i];
            }

            if (this.cache[cacheKey]) {
                return this.cache;
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    sum += arguments[i];
                }

                this.cache[cacheKey] = sum;

                return sum;
            }
        }
    }

    return customArrays;
}());

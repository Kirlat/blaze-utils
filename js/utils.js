var blaze = blaze || {};
blaze.utils = blaze.utils || {};

/**
 * Sets all columns with 'data-blaze-eqht-col' attribute to have equal height, if their group number is the same.
 * Usage:
 * add data-blaze-eqht="group_number" to elements that must have equal height.
 * group_number is an integer starting from 1 and up to the maximum group number on a page
 */
blaze.utils.equalHeightColumns = function () {
    var currentGroup,
        groupQty = 0,
        i,
        j,
        currentHeight,
        tallest,
        group;

    // Remove all values set previously
    group = document.querySelectorAll('[data-blaze-eqht]');
    for (i = 0; i < group.length; i++) {
        // Find number of columns present
        currentGroup = group[i].dataset.blazeEqht;
        if (currentGroup > groupQty) {
            groupQty = currentGroup;
        }
    }

    for (i = 1; i <= groupQty; i++) {
        currentHeight = 0;
        tallest = 0;
        group = document.querySelectorAll("[data-blaze-eqht='" + i + "']");
        for (j = 0; j < group.length; j++) {
            currentHeight = Math.ceil(group[j].getBoundingClientRect().height);
            if (currentHeight > tallest) tallest = currentHeight;
        }
        for (j = 0; j < group.length; j++) {
            group[j].style.minHeight = tallest + 'px';
        }
    }
};

/**
 * Parses parameters of a URL string
 * Based on the code from: https://www.sitepoint.com/get-url-parameters-with-javascript/
 * @param url - a URL to parse
 * @returns {{}} - An object in a format of parameter1: value1;
 */
blaze.utils.getURLParams = function (url) {
    var params = {};

    var queryString = url.split('?')[1];

    // if URL is not empty
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists (for multiple parameters with the same name)
            if (params[paramName]) {
                // convert value to array (if still string)
                if (typeof params[paramName] === 'string') {
                    params[paramName] = [params[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    params[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    params[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                params[paramName] = paramValue;
            }
        }
    }
    return params;
};
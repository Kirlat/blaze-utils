var blaze = blaze || {};

// Equal height columns
// Assign data-blz-eqht-col="i", where i is number from 1 to equalHeightColQty, to each column that should have equal height
blaze.equalHeightColumns = function () {
    var equalHeightColDAttr = "blaze-eqht-col",
        equalHeightColQty = 10,
        i,
        j,
        currentHeight,
        tallest,
        group;

    // Remove all values set previously
    group = document.querySelectorAll('[data-blz-eqht-col]');
    for (i = 0; i < group.length; i++) {
        group[i].style.height = null;
    }

    for (i = 1; i <= equalHeightColQty; i++) {
        currentHeight = 0;
        tallest = 0;
        group = document.querySelectorAll("[data-"+equalHeightColDAttr+"='"+i+"']");
        for (j = 0; j < group.length; j++) {
            currentHeight = group[j].clientHeight;
            if (currentHeight > tallest) tallest = currentHeight;
        }
        for (j = 0; j < group.length; j++) {
            group[j].style.height = tallest + 'px';
        }
    }
};
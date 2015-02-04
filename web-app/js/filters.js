'use strict';

/* Filters */

angular.module('pizzaApp.filters', [])
.filter('bitcoin', function () {
    return function (sum) {
        if (!isNaN(sum) && sum > 0) {
            return sum + " \u0E3F";
        }
        return "--";
    }
})
.filter('startFrom',function() {
	return function(input,start){
		if(input){
			start = +start; //parse to int
			return input.slice(start);
		}
		return [];
	}
})
.filter('checkboxFilter', function($filter) {
	var filterSelectedCheckboxes = function(checklistValues, item, checklistName, searchBy) {
		var countInclusions = 0;
		var countExclusions = 0;
		var result = false;

		angular.forEach(checklistValues,function(selected, checkboxName) {
			var obj = {};
			obj[searchBy] = parseInt(checkboxName, 10);

			if (selected === true) {
				countInclusions++;
				var itemsSelected = ($filter('filter')(item[checklistName], obj, true).length > 0);
				result = result || itemsSelected;
			}

			if (selected === "exclude") {
				var itemsSelectedWithExclusion = ($filter('filter')(item[checklistName], obj, true).length > 0);
				if (itemsSelectedWithExclusion === true) {
					countExclusions++;
				}
			}
		});
		
		if (countExclusions > 0) {
			result = false;
		}
		return (countInclusions === 0) && (countExclusions === 0) || result;
	}

	return function(input, definition) {
		var result = [];

		if (angular.isArray(input) && angular.isObject(definition)) {
			angular.forEach(input, function(item) {
				var matched = null;
				var tmp = null;
				var excluded = false;
				angular.forEach(definition, function(checklist, listName) {
					tmp = filterSelectedCheckboxes(checklist, item, listName, 'id');
					matched = (matched === null) ? tmp : matched && tmp;
				});

				if (matched) {
					result.push(item);
				}
			});
		}
		return result;
	};
});
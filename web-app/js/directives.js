'use strict';

/* Directives */


angular.module('pizzaApp.directives', [])
.directive('appVersion', ['version', function (version) {
	return function (scope, elm, attrs) {
		elm.text("Pizza app " + version);
	};
}])
.directive('indeterminate', [function() {
	return {
		require: '?ngModel',
		link: function(scope, elm, attrs, ctrl) {
			var included = true;
			var excluded = "exclude";
			var notselected= false;

			ctrl.$parsers = [];
			ctrl.$render = function() {
				var d = ctrl.$viewValue;
				elm.data('checked', d);
				switch(d){
				case included:
					elm.prop('indeterminate', false);
					elm.prop('checked', true);
					// elm.removeClass('striked');
					break;
				case excluded:
					elm.prop('indeterminate', true);
					//elm.addClass('striked');
					break;
				default:
					elm.prop('indeterminate', false);
				elm.prop('checked', false);
				//elm.removeClass('striked');
				}
			};

			elm.bind('click', function() {
				var d;
				switch(elm.data('checked')){
				case notselected:
					d = included;
					break;
				case included:
					d = excluded;
					break;
				default:
					d = notselected;
				}

				ctrl.$setViewValue(d);
				scope.$apply(ctrl.$render);
			});
		}
	};
}])
.directive('dualselectlist', function() {
	return {
		restrict : 'E',
		require : '^ngModel',
		scope : false,
		template : function(element, attrs) {
			return '<table> <tr style="height:35px;"><td style="background-color:#666699">'
			+ '<span style="margin-left:5px;color:white;background-color:#666699;" class="col-sm-4">Available</span>'
			+ '</td><td class="col-sm-1"></td> <td style="background-color:#666699">'
			+ '<span style="margin-left:5px;color:white;background-color:#666699;" class="col-sm-4">Selected</span>'
			+ '</td></tr><tr><td style="width:40%"><div>'
			+ '<select multiple id="availabelist" size="10" style="width:100%" ng-model="selected' + attrs.id + '"'
			+ ' ng-options="'+ attrs.options + '  | filter: {selected: \'!true\' }" >'
			+ '</select></div></td><td><div>'
			+ '<input id="btnRight" type="button" value="==>" ng-click="btnRight(selected' + attrs.id + ', ' + attrs.ngModel + ')" /><br/>'
			+ '<input id="btnLeft" type="button" value="<==" ng-click="btnLeft(selectedSelected' + attrs.id + ', ' + attrs.ngModel + ')" /></div>'
			+ '</td><td style="width:40%"><div>'
			+ '<select multiple id="selectedlist" size="10" style="width:100%" ng-model="selectedSelected' + attrs.id + '"'
			+ ' ng-options="i as i.name for i  in ' + attrs.ngModel + ' track by i.incompatible"></select>' +
			'</div></td></tr></table>';
		},
		link : function($scope, element, attrs) {

			$scope["selected"+attrs.id] =[];
			$scope["selectedSelected"+attrs.id] =[];

			$scope.btnRight = function(SelectedAvailItems, SelectedListItems) {
				angular.forEach(SelectedAvailItems, function(value, key) {
					this.push(value);
					value.selected = true;
				}, SelectedListItems);

				// free selections
				SelectedAvailItems.length=0;
			};

			$scope.btnLeft = function(SelectedSelectedListItems, SelectedListItems) {

				angular.forEach(SelectedSelectedListItems, function(value) {
					value.selected = false;
					var index = SelectedListItems.indexOf(value);
					SelectedListItems.splice(index, 1);
				});
				SelectedSelectedListItems.length = 0;
			};
		}
	};
})
.directive('emptyArray', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			scope.$watchCollection(attrs.ngModel, function(newSelectedData) {
				if (newSelectedData.length !== 0) {
					ctrl.$setValidity('emptyarr', true);
				} else {
					ctrl.$setValidity('emptyarr', false);
				}
			});
		}
	};
})
.directive('checkCompability', function() {
	return {
		require : '^ngModel',
		link : function(scope, elm, attrs, ctrl) {
			scope.$watchCollection('pizza.kinds', function(data) {
				if (data.length === 0) {
					ctrl.$setValidity('incompatible', true);
				} else {
					angular.forEach(data, function(kind){
						var exclusions = kind.excludeIngredientTypes;
						angular.forEach(scope.pizza.ingredients, function(ingredient){
							var pattern = ingredient.type.replace(/ /g,'\|');
							var ingrType = new RegExp(pattern);
							if (ingrType.test(exclusions)) {
								kind.incompatible=true;
								ingredient.incompatible=true;
								ctrl.$setValidity('incompatible', false);
							} else {
								kind.incompatible=false;
								ingredient.incompatible=false;
								ctrl.$setValidity('incompatible', true);
							}
						});
					});
				}
			});
			
			scope.$watchCollection('pizza.ingredients', function(data) {
				if (data.length === 0) {
					ctrl.$setValidity('incompatible', true);
				} else {
					angular.forEach(data, function(ingredient) {
						var pattern = ingredient.type.replace(/ /g, '\|');
						var ingrType = new RegExp(pattern);

						angular.forEach(scope.pizza.kinds, function(kind) {
							var exclusions = kind.excludeIngredientTypes;
							if (ingrType.test(exclusions)) {
								ingredient.incompatible = true;
								kind.incompatible = true;
								ctrl.$setValidity('incompatible', false);
							} else {
								ingredient.incompatible = false;
								kind.incompatible = false;
								ctrl.$setValidity('incompatible', true);
							}
						});
					});
				}
			});
		}
	};
});
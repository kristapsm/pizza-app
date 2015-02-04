'use strict';
describe('pizzaApp filter', function() {
	var scope, ctrl, $httpBackend, createFilter;
	
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});
	
	beforeEach(angular.mock.module('pizzaApp'));
	beforeEach(inject(function($filter) 
		{ createFilter = function(name) { return $filter(name); }; 
	}));
	
	beforeEach(inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			
			//define that we are expecting to GET kind data
			$httpBackend.expectGET('kind?max=-1').respond(
				[
					{id: 1, name:"ham"},
					{id: 2, name:"beef"},
					{id: 3, name:"chicken"},
					{id: 4, name:"vegetarian"},
					{id: 5, name:"other"},
					{id: 6, name:"marine"},
					{id: 7, name:"4 cheese"},
					{id: 8, name:"mexican"},
					{id: 9, name:"4 seasons"},
					{id: 10, name:"grilled"},
					{id: 11, name:"silician"}
				]
			);
			
			//define that we are expecting to GET ingredient data with parameter max=50
			$httpBackend.expectGET('ingredient?max=-1').respond(
				[
					{id:1, name:"black olives", type:"vegetable"},
					{id:1, name:"garlic", type:"vegetable"},
					{id:1, name:"pineapple", type:"vegetable"},
					{id:1, name:"tomatoes", type:"vegetable"},
					{id:1, name:"chili peppers", type:"vegetable"},
					{id:1, name:"bell peppers", type:"vegetable"},
					{id:1, name:"mozzarella", type:"cheese"},
					{id:1, name:"parmesan", type:"cheese"},
					{id:1, name:"cheddar", type:"cheese"},
					{id:1, name:"Mascarpone", type:"cheese"},
					{id:1, name:"ham", type:"meat"},
					{id:1, name:"bacon", type:"meat"},
					{id:1, name:"beef", type:"meat"},
					{id:1, name:"chicken", type:"meat"},
					{id:1, name:"pepperoni", type:"meat"},
					{id:1, name:"salami", type:"meat"},
					{id:1, name:"sausage", type:"meat"},
					{id:1, name:"agaricus", type:"mushrooms"},
					{id:1, name:"marinated mushrooms", type:"mushrooms"},
					{id:1, name:"anchovies", type:"fish"},
					{id:1, name:"tuna", type:"fish"},
					{id:1, name:"chili sauce", type:"sauce"},
					{id:1, name:"taiwan sweet sauce", type:"sauce"},
					{id:1, name:"taiwan hot sauce", type:"sauce"}
				]
			);
			
			//define that we are expecting to GET pizza data with parameters max=-1, order=desc, sort=id
			$httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond(			
				[
					{id: 1, name:"Lightness", kind: "other", image: "http://s8.postimg.org/dwh0vglfp/vegetarian.jpg", info:"Red caviar, chese, mayonaisse, sesam, tomatoe sauce", price:0.1, kinds:[{class: "Kind", id: 3}], ingredients:[{class: "Ingredient", id: 14}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 9}] },
					{id: 2, name:"Barbarians", kind: "other", image: "http://s8.postimg.org/sw4s5kcxx/ham2.jpg", info:"Mushrooms, ham, checken, mayonaisse, potatoe bits", price:0.1, kinds:[{class: "Kind", id: 4}], ingredients:[{class: "Ingredient", id: 19}, {class: "Ingredient", id: 6}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 9}] },
					{id: 3, name:"Dinner", kind: "beef", image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Bacon bits, mayo, chese, tomato sauce", price:0.08, kinds:[{class: "Kind", id:1}], ingredients:[{class: "Ingredient", id: 1}, {class: "Ingredient", id: 11}, {class: "Ingredient", id: 9}, {class: "Ingredient", id: 4}, {class: "Ingredient", id: 24}, {class: "Ingredient", id:19}] }
				]
			);
		
			//define that we are expecting to GET currency data
			$httpBackend.expectGET('currency').respond(
				[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
	}));
	describe('bitcoin', function() {
		it('should return a string of value and bitcoin sign ', inject(function(bitcoinFilter) {
			expect(bitcoinFilter(400)).toBe(400+" \u0E3F");
		}));
	    it('should return a string of -- ', inject(function(bitcoinFilter) {
			expect(bitcoinFilter('dd')).toBe('--');
		}));
		
	});
	
	describe('startFrom', function() {
		it('should return the 2nd element from array', inject(function(startFromFilter) {
			var testArray = ['test1','test2','test3'];
			expect(startFromFilter(testArray,2)).toEqual(['test3']);
		}));
		it('should return an empty array', inject(function(startFromFilter) {
			var testArray = [];
			expect(startFromFilter(testArray,2)).toEqual([]);
		}));
		it('should return an empty array', inject(function(startFromFilter) {
			expect(startFromFilter(null,2)).toEqual([]);
		}));
	});
	
	describe('checkboxFilter', function() {
		it('should test checkboxFilter', inject(function(checkboxFilterFilter) {
		
		var element;
		
		inject(function($controller,$rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('ViewCtrl', {$scope:scope});
		});
		
		$httpBackend.flush();
		
		//no filter
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData(				
		[
					{id: 1, name:"Lightness", kind: "other", image: "http://s8.postimg.org/dwh0vglfp/vegetarian.jpg", info:"Red caviar, chese, mayonaisse, sesam, tomatoe sauce", price:0.1, kinds:[{class: "Kind", id: 3}], ingredients:[{class: "Ingredient", id: 14}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 9}] },
					{id: 2, name:"Barbarians", kind: "other", image: "http://s8.postimg.org/sw4s5kcxx/ham2.jpg", info:"Mushrooms, ham, checken, mayonaisse, potatoe bits", price:0.1, kinds:[{class: "Kind", id: 4}], ingredients:[{class: "Ingredient", id: 19}, {class: "Ingredient", id: 6}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 2}, {class: "Ingredient", id: 9}] },
					{id: 3, name:"Dinner", kind: "beef", image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Bacon bits, mayo, chese, tomato sauce", price:0.08, kinds:[{class: "Kind", id:1}], ingredients:[{class: "Ingredient", id: 1}, {class: "Ingredient", id: 11}, {class: "Ingredient", id: 9}, {class: "Ingredient", id: 4}, {class: "Ingredient", id: 24}, {class: "Ingredient", id:19}] }
				]
		);

		//filter by kinds
		scope.checkbox.kinds = {3:true, 4:'exclude'};
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData([scope.pizzas[0]]);
		
		scope.checkbox.kinds = {3:'exclude', 4:true};
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData([scope.pizzas[1]]);
		
		//filter by ingredients
		scope.checkbox.kinds = {};
		scope.checkbox.ingredients = {14:true, 19:'exclude'};
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData([scope.pizzas[0]]);
		
		scope.checkbox.ingredients = {14:'exclude', 19:true};
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData([scope.pizzas[1],scope.pizzas[2]]);
		
		//filter by kind and ingredients
		scope.checkbox.kinds = {};
		scope.checkbox.ingredients = {};
		scope.pizzas[3] = scope.pizzas[2];
		scope.checkbox.ingredients = {14:'exclude', 19:true};
		scope.checkbox.kinds = {1: true};
		expect(checkboxFilterFilter(scope.pizzas,scope.checkbox)).toEqualData([scope.pizzas[2],scope.pizzas[3]]);
		
		}));
	});

});
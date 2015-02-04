'use strict';
/* jasmine specs for directives go here */
describe('pizzaApp directives', function() {
	//define a new matcher function
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	var element;
	var scope;
	var $httpBackend;
	beforeEach(module('pizzaApp'));
	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));
	beforeEach(inject(function(_$httpBackend_){
		$httpBackend = _$httpBackend_;
		//define that we are expecting to GET kind data
			$httpBackend.expectGET('kind?max=-1').respond(
				[
					{id: 1, name:"ham", excludeIngredientTypes:['fish']},
					{id: 2, name:"beef", excludeIngredientTypes:['fish']},
					{id: 3, name:"chicken", excludeIngredientTypes:['fish']},
					{id: 4, name:"vegetarian", excludeIngredientTypes:['fish meat']},
					{id: 5, name:"other", excludeIngredientTypes:[]},
					{id: 6, name:"marine", excludeIngredientTypes:['meat']},
					{id: 7, name:"4 cheese", excludeIngredientTypes:[]},
					{id: 8, name:"mexican", excludeIngredientTypes:['fish']},
					{id: 9, name:"4 seasons", excludeIngredientTypes:['fish']},
					{id: 10, name:"grilled", excludeIngredientTypes:['fish']},
					{id: 11, name:"silician", excludeIngredientTypes:['fish']}
				]
			);
			
			//define that we are expecting to GET ingredient data with parameter max=-1
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
					{id: 1, name:"Lightness", kind: "other", image: "http://s8.postimg.org/dwh0vglfp/vegetarian.jpg", info:"Red caviar, chese, mayonaisse, sesam, tomatoe sauce", price:0.1	},
					{id: 2, name:"Barbarians", kind: "other", image: "http://s8.postimg.org/sw4s5kcxx/ham2.jpg", info:"Mushrooms, ham, checken, mayonaisse, potatoe bits", price:0.1 },
					{id: 3, name:"Dinner", kind: "beef", image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Bacon bits, mayo, chese, tomato sauce", price:0.08 },
					{id: 4, name:"Spring delight", kind: "chicken", image: "http://s8.postimg.org/hrftkaf7p/chicken3.png", info:"Somoked chicken bits, basilik, chese, mayonnaisse, corn", price:0.09 },
					{id: 5, name:"Curry surprise", kind: "ham", image: "http://s8.postimg.org/74qlslwg5/pork2.jpg", info:"Olives, onions, ham slices, chese, curry seasoning", price:0.08 },
					{id: 6, name:"Gourmet", kind: "ham", image: "http://s8.postimg.org/q8jx8y9ad/pork.jpg", info:"Juicy ham pieces, chese, chilli peppers, tomatoes, dill seasoning", price:0.1 },	
					{id: 7, name:"Natural chilli", kind: "vegetarian" , image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Chilli peppers, tomatoes, olives, mushrooms, chese", price:0.07 },	
					{id: 8, name:"Agular ham", kind: "vegetarian", image: "http://s8.postimg.org/j03p5x75x/ham3.jpg", info:"Ham, chese, mazarella chese, tomato souce", price:0.09 },	
					{id: 9, name:"Adventurers", kind: "beef", image: "http://s8.postimg.org/qjws7z0cl/kolay.jpg", info:"Champignon mushrooms, salami, chese, olives", price:0.07 },	
					{id: 10, name:"Hevanly ham", kind: "ham", image: "http://s8.postimg.org/wm4eygosl/ham.jpg", info:"Smoked ham, mazarella chese, sesam leaves, cherry tomatoes", price:0.09 },	
					{id: 11, name:"Gardners", kind: "vegetarian", image: "http://s8.postimg.org/u7cje18jp/gardners.jpg", info:"Olives, paprica, tomatoes and cheeses and mayo", price:0.07 },	
					{id: 12, name:"Sunrise", kind: "chicken", image: "http://s8.postimg.org/kcle7t4lh/chicken.jpg", info:"Chicken pizza with onions, dill and garclic seasoning", price:0.08 }
				]
			);
		
			//define that we are expecting to GET currency data
			$httpBackend.expectGET('currency').respond(
				[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
	}));
	describe('appVersion directive',function() {
		it('should define attribute app-version', function() {
		inject(function($compile){
			element = angular.element("<div app-version></div>");
			$compile(element)(scope);
		});
			expect(element.html()).toBe('Pizza app 0.1');
		});
	});
	describe('indeterminate directive',function (){
		it('should change attribute values', function() {
			inject(function($compile,$controller,$rootScope){
				$controller('ViewCtrl', {$scope: scope});
				element = angular.element('<input type="checkbox"  id="kind"  ng-model="checkbox.kinds[kind.id]" indeterminate> ');
				$compile(element)(scope);
				scope.$apply();
			});
			
			var included = true;
			var excluded = "exclude";
			var notselected = false;
			
			element.data('checked',notselected);
			element[0].click();
			expect(element.prop('indeterminate')).toEqual(false);
			expect(element.prop('checked')).toEqual(true);
			
			element.data('checked',included);
			element[0].click();
			expect(element.prop('indeterminate')).toEqual(true);
			
			element.data('checked',excluded);
			element[0].click();
			expect(element.prop('indeterminate')).toEqual(false);
			expect(element.prop('checked')).toEqual(false);
				
		});
	});
	describe('dualselectlist directive', function() {
		beforeEach(function(){
			$httpBackend.flush();
			inject(function($compile,$controller){
					$controller('AddCtrl', {$scope:scope});
					element = angular.element('<dualselectlist id="kinds" ng-Model="pizza.kinds" options="i as i.name for i in kinds"></dualselectlist>');
					$compile(element)(scope);
					scope.$apply();
			});
			scope.selectedkinds = [];
			scope.selectedSelectedkinds = [];
			scope.pizza.kinds = [];
		});

		it('should add one item to the list', function(){
			scope.selectedkinds = [scope.kinds[0]];
			scope.btnRight(scope.selectedkinds, scope.pizza.kinds); 
			expect(scope.selectedkinds).toEqualData([]);
			expect(scope.pizza.kinds).toEqualData([scope.kinds[0]]);
		});
		
		it('should move two items to the selected list', function() {
			scope.selectedkinds = [scope.kinds[1],scope.kinds[2]];
			scope.btnRight(scope.selectedkinds, scope.pizza.kinds);
			expect(scope.selectedkinds).toEqualData([]);
			expect(scope.pizza.kinds).toEqualData([scope.kinds[1],scope.kinds[2]]);
		});
		
		it('should remove one item from the list', function() {
			scope.pizza.kinds = [scope.kinds[0],scope.kinds[1],scope.kinds[2]];
			scope.selectedSelectedkinds = [scope.kinds[1]];
			scope.btnLeft(scope.selectedSelectedkinds, scope.pizza.kinds);
			expect(scope.selectedSelectedkinds).toEqualData([]);
			expect(scope.pizza.kinds).toEqualData([scope.kinds[0],scope.kinds[2]]);	
		});
		
		it('should remove two items from the list', function() {
			scope.pizza.kinds = [scope.kinds[0],scope.kinds[1],scope.kinds[2],scope.kinds[3]];
			scope.selectedSelectedkinds = [scope.kinds[1],scope.kinds[3]];
			scope.btnLeft(scope.selectedSelectedkinds, scope.pizza.kinds);
			expect(scope.selectedSelectedkinds).toEqualData([]);
			expect(scope.pizza.kinds).toEqualData([scope.kinds[0],scope.kinds[2]]);
		});

	});
	describe('emptyArray directive',function() {
		var element, form;
		it('should check if array is not empty', function() {
		$httpBackend.flush();
			inject(function($compile,$controller){
				$controller('TweetPizzaCtrl', {$scope:scope});
				element = angular.element('<div><form name="pizzaForm"><div><input name="pizzaingr" type="hidden" ng-model="pizza.ingredients" ng-required="true" empty-array/><span ng-show="pizzaForm.pizzaingr.$error.emptyarr">At least 1 ingredient must be selected!</span></div></form></div>');
				$compile(element)(scope);
				form = scope.pizzaForm;
				scope.$apply();
			});
		
		expect(scope.pizzaForm.pizzaingr.$error.emptyarr).toBe(true);
		scope.pizza.ingredients.push(scope.ingredients[0]);
		scope.$apply();
		expect(scope.pizzaForm.pizzaingr.$error.emptyarr).toBe(false);
		scope.pizza.ingredients.length=0;
		scope.$apply();
		expect(scope.pizzaForm.pizzaingr.$error.emptyarr).toBe(true);
		});
		
	});
	describe('checkCompability directive',function() {
		var element, form;
		it('should check if selected ingredients list is compatible with selected kinds list and vice versa', function() {
		$httpBackend.flush();
			inject(function($compile,$controller){
				$controller('AddCtrl', {$scope:scope});
				element = angular.element('<div><form name="pizzaForm"><div><input name="pizzakinds" type="hidden" ng-model="pizza.kinds" check-compability/></div></form></div>');
				$compile(element)(scope);
				form = scope.pizzaForm;
				scope.$apply();
			});
		
		scope.pizza.ingredients.length=0;
		scope.pizza.kinds.length=0;
		scope.$apply();
		expect(form.pizzakinds.$error.incompatible).toBe(false);
		scope.pizza.ingredients.push(scope.ingredients[10]);//ham
		scope.pizza.kinds.length=0;
		scope.$apply();
		expect(form.pizzakinds.$error.incompatible).toBe(false);
		scope.pizza.ingredients.push(scope.ingredients[10]);//ham
		scope.pizza.kinds.push(scope.kinds[3]);//vegan
		scope.$apply();
		expect(form.pizzakinds.$error.incompatible).toBe(true);
		scope.pizza.ingredients.push(scope.ingredients[0]);//olives
		scope.pizza.kinds.push(scope.kinds[3]);//vegan
		scope.$apply();
		expect(form.pizzakinds.$error.incompatible).toBe(false);
		});
	});
});
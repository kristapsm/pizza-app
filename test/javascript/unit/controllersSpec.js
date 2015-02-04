'use strict';
describe('pizzaApp controllers', function () {

	//define a new matcher function
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	//load module
	beforeEach(module('pizzaApp'));
	
	//pizzaApp ViewCtrl controller
	describe('pizzaApp ViewCtrl', function(){
		var scope, ctrl, $httpBackend, rootScope;
		
		beforeEach(inject(function(_$httpBackend_,$rootScope, $controller) {
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
			
			
			rootScope = $rootScope;
			scope = $rootScope.$new();
			ctrl = $controller('ViewCtrl', {$scope: scope});
		}));
		
	//	afterEach(function() {
	//		$httpBackend.verifyNoOutstandingExpectation();
	//		$httpBackend.verifyNoOutstandingRequest();
	//    });
	
		it('should create "kinds" model with 11 kinds', function() {
				expect(scope.kinds).toEqualData([]);
				$httpBackend.flush();
				
				expect(scope.kinds).toEqualData(
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
		});
	
		it('should create "prices" model with bitcoin value', function() {
			expect(scope.prices).toEqualData([]);
			$httpBackend.flush();
			
			expect(scope.prices).toEqualData(
				[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
		});
		
		it('should create "ingredients" model', function() {
			expect(scope.ingredients).toEqualData([]);
			$httpBackend.flush();
			
			expect(scope.ingredients).toEqualData(
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
		});
		
		it('should create "pizzas" model with 12 pizzas', function() {
			expect(scope.pizzas).toEqualData([]);
			$httpBackend.flush();

			expect(scope.pizzas).toEqualData(
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
			expect(scope.pizzas.length).toBe(12);
		});
		
		it('should create empty cart', function() {
			expect(scope.cart.items).toEqualData([]);
			expect(scope.cart.total()).toBe(0);
			$httpBackend.flush();
		});
		
		it('should clear filters' , function() {
			$httpBackend.flush();
			scope.checkbox.kinds[0] = scope.kinds[0];
			scope.checkbox.kinds[1] = scope.kinds[1];
			scope.checkbox.ingredients[0] = scope.ingredients[0];
			scope.checkbox.ingredients[1] = scope.ingredients[1];
			expect(scope.checkbox.kinds).toEqualData({0: scope.kinds[0], 1: scope.kinds[1]});
			expect(scope.checkbox.ingredients).toEqualData({0: scope.ingredients[0], 1: scope.ingredients[1]});
			
			scope.clearFilters();
		
			expect(scope.checkbox.kinds).toEqualData({});
			expect(scope.checkbox.ingredients).toEq
			expect(scope.checkbox.kinds.length).toBe(undefined);
			expect(scope.checkbox.ingredients.length).toBe(undefined);
			
		});
		
		it('should add items to cart and return total value', function() {
			expect(scope.cart.items).toEqualData([]);
			expect(scope.cart.total()).toBe(0);
			$httpBackend.flush();
			
			var pizza1 = scope.pizzas[0];
			var pizza2 = scope.pizzas[1];
			scope.add(pizza1);
			scope.add(pizza1);
			scope.add(pizza2);
			expect(scope.cart.items[0].pizza).toEqualData(pizza1);
			expect(scope.cart.items[1].pizza).toEqualData(pizza2);
			expect(scope.cart.items[0].qty).toBe(2);
			expect(scope.cart.items[1].qty).toBe(1);
			
			var total = 0;
			for(var i=0;i<scope.cart.items.length;i++){
				total += scope.cart.items[i].qty * scope.cart.items[i].pizza.price;
			}
			
			
			expect(scope.cart.total()).toBe(total);

		});
		
		it('should remove an item from the cart', function() {
			expect(scope.cart.items).toEqualData([]);
			expect(scope.cart.total()).toBe(0);
			$httpBackend.flush();
			
			var pizza1 = scope.pizzas[0];
			var pizza2 = scope.pizzas[1];
			
			scope.add(pizza1);
			scope.add(pizza2);
			scope.add(pizza2);
			expect(scope.cart.items[0].pizza).toEqualData(pizza1);
			expect(scope.cart.items[1].pizza).toEqualData(pizza2);
			expect(scope.cart.items[0].qty).toBe(1);
			expect(scope.cart.items[1].qty).toBe(2);
		
			scope.remove(scope.cart.items[0]);
			expect(scope.cart.items.length).toBe(1);
			expect(scope.cart.items[0].pizza).toEqualData(pizza2);
			
			scope.remove(scope.cart.items[0]);
			expect(scope.cart.items[0].qty).toBe(1);
		});
		
		it('should call an alert', function() {
			expect(scope.checkout()).toEqual(alert("Sorry - that's all folks!"));
		});
		
		//SERVICE FUNCTION TESTING
		it('should create an empty Cart', function() {
			inject(function(Cart){
				$httpBackend.flush();
				var initCart = Cart.init();
				expect(initCart.items).toEqualData([]);
				expect(initCart.total).toBe(0);
			});
		});
		
		
		//SERVICE FUNCTION TESTING
		it('should create a Cart with 12 pizzas in it', function() {
			inject(function(Cart){
				$httpBackend.flush();
				var createCart = Cart.create(scope.pizzas,scope.pizzas.length);
				expect(createCart.items).toEqualData(scope.pizzas);
				expect(createCart.total).toEqualData(scope.pizzas.length);
				
			});
		});
		
		//SERVICE FUNCTION TESTING
		it('should create an ordered item', function() {
			inject(function(OrderItem){
				$httpBackend.flush();
				var createOrderItem = OrderItem.create(scope.pizzas[0],2);
				expect(createOrderItem.pizza).toEqual(scope.pizzas[0]);
				expect(createOrderItem.qty).toBe(2);
			});
		});
		
	});

	describe('pizzaApp AddCtrl', function() {
		var scope, ctrl, $httpBackend;
		
		beforeEach(inject(function(_$httpBackend_,$rootScope, $controller) {
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
			
			
			scope = $rootScope.$new();
			ctrl = $controller('AddCtrl', {$scope: scope});
		
		}));
		
		it('should add a new pizza and reset form', inject(function($compile,$rootScope) {
			var element;
			$httpBackend.flush();
			var newPizza = scope.pizzas[0];
			scope.pizza.name = newPizza.name;
			scope.pizza.kind = newPizza.kind;
			scope.pizza.image = newPizza.image;
			scope.pizza.info = newPizza.info;
			scope.pizza.price = newPizza.price;

			$httpBackend.expectPOST('pizza').respond(			
				{id: 13, name:"Lightness", kind: "other", image: "http://s8.postimg.org/dwh0vglfp/vegetarian.jpg", info:"Red caviar, chese, mayonaisse, sesam, tomatoe sauce", price:0.1}
			);	
			
			element = angular.element('<form name="pizzaForm"></form>');
			$compile(element)($rootScope);
			expect(scope.pizza.name).toEqual("Lightness");
			scope.submit();
			
			$httpBackend.flush();
			expect(scope.pizzas.length).toBe(13);
			expect(scope.pizza.name).toEqual(undefined);
		}));
		
		
		it('should not add a new pizza', inject(function($compile,$rootScope) {
			var element;
			$httpBackend.flush();
			var newPizza = scope.pizzas[0];
			scope.pizza.name = newPizza.name;
			scope.pizza.kind = newPizza.kind;
			scope.pizza.image = newPizza.image;
			scope.pizza.info = newPizza.info;
			scope.pizza.price = newPizza.price;

			$httpBackend.expectPOST('pizza').respond();	
			
			element = angular.element('<form name="pizzaForm"></form>');
			$compile(element)($rootScope);
			scope.submit();
			
			$httpBackend.flush();
			expect(scope.pizzas.length).toBe(13);
		}));
		
		it('should remove a pizza from pizzas', function(){
			$httpBackend.flush();
			expect(scope.pizzas).toEqualData(
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
			expect(scope.pizzas.length).toBe(12);
			var id = 12;
			scope.remove(id);
			
			$httpBackend.expectDELETE('pizza/'+id).respond();
			
			$httpBackend.flush();
			expect(scope.pizzas).toEqualData(
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
					{id: 11, name:"Gardners", kind: "vegetarian", image: "http://s8.postimg.org/u7cje18jp/gardners.jpg", info:"Olives, paprica, tomatoes and cheeses and mayo", price:0.07 }
				]
			);
			expect(scope.pizzas.length).toBe(11);
		});
		
	});
	
	describe('pizzaApp TweetPizzaCtrl', function() {
		var scope, ctrl, eventBus, $httpBackend, rootScope;
		
		beforeEach(inject(function($rootScope,$controller,_$httpBackend_) {
			scope = $rootScope.$new();
			ctrl = $controller('TweetPizzaCtrl', {$scope: scope});
			$httpBackend = _$httpBackend_;
			rootScope = $rootScope;
			
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
			
			//define that we are expecting to GET ingredient data with parameter max=-1
			$httpBackend.expectGET('ingredient?max=-1').respond(
				[
					{id:1, name:"black olives", type:"vegetable", image: "http://images.creatureworld.net/items/green_olives.png", price:0.99},
					{id:1, name:"garlic", type:"vegetable", image: "http://iconbug.com/data/c5/48/02544ad9a6e5f11e18739c9a5b610adc.png", price:0.75},
					{id:1, name:"pineapple", type:"vegetable", image: "http://img1.wikia.nocookie.net/__cb20140520193939/goatlings/images/thumb/b/ba/Item_45.gif/50px-Item_45.gif", price:0.82},
					{id:1, name:"tomatoes", type:"vegetable", image: "http://img3.wikia.nocookie.net/__cb20140326231144/herebemonsters/images/thumb/b/b7/Tomato-Sprite.png/40px-Tomato-Sprite.png", price:0.44},
					{id:1, name:"chili peppers", type:"vegetable", image: "http://img4.wikia.nocookie.net/__cb20121010115817/farmville2/images/9/91/Red_Pepper.png", price:1.35},
					{id:1, name:"bell peppers", type:"vegetable", image: "http://img4.wikia.nocookie.net/__cb20121010115817/farmville2/images/9/91/Red_Pepper.png", price:0.80},
					{id:1, name:"mozzarella", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.11},
					{id:1, name:"parmesan", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.37},
					{id:1, name:"cheddar", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:0.75},
					{id:1, name:"mascarpone", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.83}
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
		
		it('should fix ingredient order',function() {
			var obj1 = {};
			var obj2 = {};
			
			obj1.order = 1;
			obj2.order = 2;
			expect(ctrl.fixIngredientOrder(obj1,obj2)).toBe(-1);
			
			obj1.order = 2;
			obj2.order= 1;
			expect(ctrl.fixIngredientOrder(obj1,obj2)).toBe(1);
			
			obj1.order = 1;
			obj2.order = 1;
			expect(ctrl.fixIngredientOrder(obj1,obj2)).toBe(0);
		});
		
		it('should create an ingredients list from tweets and change order', function(){
			$httpBackend.flush();
			var ingredients = scope.ingredients;
			ctrl.init = true;
			rootScope.ingredients1=ingredients;
			expect(scope.ingredients1).toBeDefined();
			scope.ingredientsClientHandler(ingredients);
			expect(scope.ingredients1).toEqual(ingredients);
			
			ctrl.init = false;
			var ingr1 = ingredients[0];
			var ingr2 = ingredients[1];
			
			ingredients[0] = ingr2;
			ingredients[1] = ingr1;
			
			scope.ingredientsClientHandler(ingredients);
			expect(scope.ingredients1).toEqual(ingredients);
		});
		
		it('should generate information from ingredients', function() {
			var ingr1 = {};
			var ingr2 = {};
			var ingr3= {};
			ingr1.name = 'ham';
			ingr2.name = 'cheese';
			ingr3.name = 'olive';
			var ingredients = [ingr1,ingr2,ingr3];
			
			expect(ctrl.generateInfo(ingredients)).toEqual('ham, cheese, olive');
		});
		
		it('should generate price from ingredients', function() {
			var ingr1 = {};
			var ingr2 = {};
			var ingr3= {};
			ingr1.price = 0.0002;
			ingr2.price = 0.0003;
			ingr3.price =  0.004;
			var ingredients = [ingr1,ingr2,ingr3];
			expect(ctrl.generatePrice(ingredients)).toBe(parseFloat(ingr1.price+ingr2.price+ingr3.price));
		});
		
		it('should generate kinds from ingredients', function() {
			$httpBackend.flush();
			//kinds
			var ham = {id: 1, name:"ham", includeIngredientTypes:["ham"], excludeIngredientTypes:["fish"]};
			var beef = {id: 2, name:"beef", includeIngredientTypes:["beef"], excludeIngredientTypes:["fish"]};
			var chicken = {id: 3, name:"chicken", includeIngredientTypes:["chicken"], excludeIngredientTypes:["fish"]};
			var vegetarian = {id: 4, name:"vegetarian", includeIngredientTypes:["vegetable"], excludeIngredientTypes:["meat","fish"]};
			var seaFood ={id: 6, name:"marine", includeIngredientTypes:["fish"], excludeIngredientTypes:["meat"]}
			var kinds = [ham, beef, chicken, vegetarian, seaFood];
			
			//ingredients
			var anchovy = {id:1, name:"anchovies", type:"fish", image: "http://iconshow.me/media/images/animals/Cute-animals-Icons/png/48/tuna.png", price:0.47};
			var hamMeat = {id:1, name:"ham", type:"ham meat", image: "http://icons.iconarchive.com/icons/fixicon/market/128/ham-icon.png", price:0.30};
			var pineapple = {id:1, name:"pineapple", type:"vegetable", image: "http://img1.wikia.nocookie.net/__cb20140520193939/goatlings/images/thumb/b/ba/Item_45.gif/50px-Item_45.gif", price:0.82};
			var beefMeat = {id:1, name:"beef", type:"beef meat", image: "http://icons.iconarchive.com/icons/fixicon/market/128/ham-icon.png", price:0.30};
			var ingredients = [anchovy, hamMeat, pineapple, beefMeat];
			var defaultKind = {"class":"Ingredient", "id":5};
			
			rootScope.kinds = kinds;
			rootScope.ingredients = ingredients;
			
			var selectedIngredients = [pineapple, anchovy];
			expect(ctrl.generateKinds(selectedIngredients)).toEqual([seaFood]);

			selectedIngredients = [beefMeat, hamMeat];
			expect(ctrl.generateKinds(selectedIngredients)).toEqual([beef,ham]);
			
			selectedIngredients.length = 0;
			expect(ctrl.generateKinds(selectedIngredients)).toEqual([defaultKind]);
		});
		
		it('should detect change in pizza ingredients and calculate a new price', function() {
			$httpBackend.flush();
			expect(scope.pizza).toBeDefined();
			expect(scope.pizza.price).toBe(0);
			expect(scope.pizza.ingredients).toEqual([]);
			
			scope.pizza.ingredients.push(scope.ingredients[0]);
			scope.$apply();
			expect(scope.pizza.price).toBe(scope.ingredients[0].price);
			
			scope.pizza.ingredients.push(scope.ingredients[1]);
			scope.$apply();
			expect(scope.pizza.price).toBe(scope.ingredients[0].price + scope.ingredients[1].price);
		});
		
		it('should remove ingredient from pizza ingredients and move back to ingredients1 list',function() {
			$httpBackend.flush();
			expect(scope.pizza.ingredients).toEqual([]);
			
			
			rootScope.ingredients1 = [];
			scope.pizza.ingredients.push(scope.ingredients[0]);
			scope.removeIngredient(scope.ingredients[0]);
			expect(scope.pizza.ingredients).toEqual([]);
			expect(rootScope.ingredients1).toEqual([scope.ingredients[0]]);
			
			scope.pizza.ingredients.push(scope.ingredients[1]);
			scope.pizza.ingredients.push(scope.ingredients[2]);
			scope.pizza.ingredients.push(scope.ingredients[3]);
			scope.removeIngredient(scope.ingredients[2]);
			expect(scope.pizza.ingredients).toEqual([scope.ingredients[1],scope.ingredients[3]]);
			expect(rootScope.ingredients1).toEqual([scope.ingredients[0],scope.ingredients[2]]);
		});
		
		
		it('should successfully submit a new pizza',inject(function($compile) {
			$httpBackend.flush();
			scope.pizza.name = "AngularJS";
			scope.pizza.ingredients = [scope.ingredients[0],scope.ingredients[1]];
			$httpBackend.expectPOST('pizza').respond();	
			var element = angular.element('<form name="pizzaForm"></form>');
			
			$compile(element)(rootScope);
			scope.submit();
			//$httpBackend.flush();
			//expect(scope.pizzas[0].name).toBe("AngularJS");
			//expect(scope.pizzas[0].ingredients).toEqual([scope.ingredients[0],scope.ingredients[1]]);			
		}));
		
		
	});

	describe('pizzaApp PageCtrl', function() {
		var scope, ctrl;
		
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('PageCtrl', {$scope: scope});
		}));
		
		it('should have default values', function(){
			expect(scope.currentPage).toBe(1);
			expect(scope.maxSize).toBe(5);
			expect(scope.entryLimit).toBe(5);
		});
	});
	
	describe('pizzaApp AuthCtrl',function() {
		var scope,rootScope,ctrl,mockToken,authRequestHandler;
		beforeEach(inject(function($rootScope,$controller) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			ctrl = $controller('AuthCtrl', {$scope:scope,$rootScope:rootScope});
			
		}));
		

		it('should set username from token', function() {
			mockToken = {};
			inject(function($controller) {
				mockToken.username = 'testuser';
				rootScope.token = mockToken;
				var cookieStore = {};
				cookieStore.get = function(var1) {
					return mockToken;
				}
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope,$cookieStore:cookieStore});
			});
			expect(rootScope.token).toEqual(mockToken);
			expect(scope.user.username).toEqual('testuser');
		});
		
		it('should set username to empty if no token', function() {
			mockToken = {};
			inject(function($controller) {
				rootScope.token = mockToken;
				var cookieStore = {};
				cookieStore.get = function() {
					return mockToken;
				}
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope,$cookieStore:cookieStore});
			});
			expect(scope.user.username).toEqual('');
		});
		
		it('should return false if no user is logged in', function() {
			mockToken = {};
			inject(function($controller) {
				rootScope.token = mockToken;
				var cookieStore = {};
				cookieStore.get = function() {
					return mockToken;
				}
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope,$cookieStore:cookieStore});
			});
			expect(rootScope.hasRole('ROLE_ADMIN')).toBe(false);
		});
		
		it('should return false if user is logged in but has no role', function() {
			mockToken = {};
			inject(function($controller) {
				rootScope.token = mockToken;
				rootScope.username = 'testuser';
				var cookieStore = {};
				cookieStore.get = function() {
					return mockToken;
				}
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope,$cookieStore:cookieStore});
			});
			expect(rootScope.hasRole('ROLE_ADMIN')).toBe(false);
		});
		
		it('should return true if the logged in user has a specific role', function() {
			mockToken = {};
			inject(function($controller) {
				mockToken.username = 'testuser';
				mockToken.roles=[];
				mockToken.roles[0]= 'ROLE_USER';
				mockToken.roles[1]= 'ROLE_ADMIN';
				rootScope.token = mockToken;
				var cookieStore = {};
				cookieStore.get = function() {
					return mockToken;
				}
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope,$cookieStore:cookieStore});
			});
			
			expect(rootScope.hasRole('ROLE_ADMIN')).toBe(true);
		});
		
		it('should toggle login form (open/close)', function() {
			scope.showLogin = false;
			scope.openlogin();
			expect(scope.user.username).toBe('');
			expect(scope.user.password).toBe('');
			expect(scope.hideerror).toBe(true);
			expect(scope.showLogin).toBe(true);
			
			scope.openlogin();
			expect(scope.user.username).toBe('');
			expect(scope.user.password).toBe('');
			expect(scope.hideerror).toBe(true);
			expect(scope.showLogin).toBe(false);
		});
		
		it('should close login form',function() {
			scope.showLogin = true;
			scope.closelogin();
			expect(scope.user.username).toBe('');
			expect(scope.user.password).toBe('');
			expect(scope.hideerror).toBe(true);
			expect(scope.showLogin).toBe(false);
		});
		
		it('should login successfully',function() {
			var httpBackend;
			scope.user.username = 'test';
			scope.user.password = 'test';
			inject(function($httpBackend){
				httpBackend = $httpBackend;
			});
			mockToken = {};
			mockToken.username = 'test';
			authRequestHandler = httpBackend.when('POST','/pizza-app/api/login').respond(mockToken);
			scope.hideerror = false;
			scope.showLogin = true;
			
			httpBackend.expectGET('kind?max=-1').respond();
			httpBackend.expectGET('ingredient?max=-1').respond();
			httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond();
			httpBackend.expectGET('currency').respond(
			[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
			httpBackend.expectPOST('/pizza-app/api/login');
			scope.authenticate();
			httpBackend.flush();
			expect(scope.hideerror).toBe(true);
			expect(scope.showLogin).toBe(false);
			expect(rootScope.isAuthenticated).toBe(true);
			expect(rootScope.token.username).toEqual('test');
		});
		
		it('should fail login', function() {
			var httpBackend;
			inject(function($httpBackend){
				httpBackend = $httpBackend;
			});
			authRequestHandler = httpBackend.when('POST','/pizza-app/api/login').respond(401,'error');
			scope.hideerror = false;
			scope.showLogin = true;
			
			httpBackend.expectGET('kind?max=-1').respond();
			httpBackend.expectGET('ingredient?max=-1').respond();
			httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond();
			httpBackend.expectGET('currency').respond(
			[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
			httpBackend.expectPOST('/pizza-app/api/login');
			scope.authenticate();
			httpBackend.flush();
			expect(scope.hideerror).toBe(false);
			expect(scope.showLogin).toBe(true);
			expect(rootScope.token).toEqual('error');
		});
		
		it('should logout', function() {
			var httpBackend;
			inject(function($httpBackend){
				httpBackend = $httpBackend;
			});
			inject(function($controller) {
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope});
			});
			
			mockToken = {};
			mockToken.username = 'test';
			mockToken.roles = [];
			mockToken.roles[0] = 'ROLE_ADMIN';
			
			rootScope.isAuthenticated = true;
			rootScope.token = mockToken;
			
			authRequestHandler = httpBackend.when('POST','/pizza-app/logout').respond('sucess');
			httpBackend.expectGET('kind?max=-1').respond();
			httpBackend.expectGET('ingredient?max=-1').respond();
			httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond();
			httpBackend.expectGET('currency').respond(
			[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
			httpBackend.expectPOST('/pizza-app/logout');
			
			scope.logout();
			httpBackend.flush();
			
			expect(rootScope.isAuthenticated).toBe(false);
			expect(rootScope.token).toEqual({});
			expect(rootScope.user).toEqual({});
		});
		
		it('should logout and redirect to /pizzas if logged out from /add-pizzas', function() {
			var httpBackend,location;
			inject(function($httpBackend){
				httpBackend = $httpBackend;
			});
			inject(function($controller,$location) {
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope});
				location=$location;
			});
			
			mockToken = {};
			mockToken.username = 'test';
			mockToken.roles = [];
			mockToken.roles[0] = 'ROLE_ADMIN';
			
			rootScope.isAuthenticated = true;
			rootScope.token = mockToken;
			
			
			authRequestHandler = httpBackend.when('POST','/pizza-app/logout').respond('sucess');
			httpBackend.expectGET('kind?max=-1').respond();
			httpBackend.expectGET('ingredient?max=-1').respond();
			httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond();
			httpBackend.expectGET('currency').respond(
			[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
			httpBackend.expectPOST('/pizza-app/logout');
			
			location.path('/add-pizza');
			scope.logout();
			httpBackend.flush();
			
			expect(rootScope.isAuthenticated).toBe(false);
			expect(rootScope.token).toEqual({});
			expect(scope.user).toEqual({});
			expect(location.path()).toEqual('/pizzas');
		});
		
		it('should logout if user is a facebook user', function() {
			var httpBackend,srvAuth,spysrvAuth;
			inject(function($httpBackend){
				httpBackend = $httpBackend;
			});
			inject(function($controller) {
				$controller('AuthCtrl', {$scope:scope,$rootScope:rootScope});
			});
			inject(function(_srvAuth_){
				srvAuth=_srvAuth_;
				spysrvAuth = spyOn(srvAuth,'logout');
			});
			
			mockToken = {};
			mockToken.username = 'test';
			mockToken.roles = [];
			mockToken.roles[0] = 'ROLE_FACEBOOK';
			
			rootScope.isAuthenticated = true;
			rootScope.token = mockToken;
			
			authRequestHandler = httpBackend.when('POST','/pizza-app/logout').respond('sucess');
			httpBackend.expectGET('kind?max=-1').respond();
			httpBackend.expectGET('ingredient?max=-1').respond();
			httpBackend.expectGET('pizza?max=-1&order=desc&sort=id').respond();
			httpBackend.expectGET('currency').respond(
			[{id: 1, currency: "Bitcoin", rate: 400.00}]
			);
			httpBackend.expectPOST('/pizza-app/logout');
			
			scope.logout();
			httpBackend.flush();
			
			expect(rootScope.isAuthenticated).toBe(false);
			expect(rootScope.token).toEqual({});
			expect(rootScope.user).toEqual({});
			expect(spysrvAuth).toHaveBeenCalled();
		});
		
	});
	
});
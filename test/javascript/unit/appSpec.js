'use strict'
describe('pizzaApp', function() {
	//define a new matcher function
	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected){
				return angular.equals(this.actual, expected);
			}
		});
	});

	var rootScope;
	var $httpBackend;
	var mockEvBusFactory;
	
	beforeEach(module('pizzaApp'));
	beforeEach(function() {
		var mockHandlerObj = {};
		mockEvBusFactory = {};
		mockEvBusFactory.registerHandler = function(var1,var2){
			expect(var1).not.toBe(null);
			expect(var2).not.toBe(null);
			
			mockHandlerObj.handlerMethod = var2; //test handler wrapper function
			spyOn(mockHandlerObj,'handlerMethod').andCallThrough();//spy
			$httpBackend.expectGET('currency').respond();//expect a request and respond with nothing
			mockHandlerObj.handlerMethod('message');//call function
			expect(mockHandlerObj.handlerMethod).toHaveBeenCalled();//function should be called
		}
			
		mockEvBusFactory.send = function(var1,var2) {
			expect(var1).not.toBe(null);
			expect(var2).not.toBe(null);
		}
		module(function($provide) {
			$provide.value('EventBus',mockEvBusFactory);
		});
	});
	beforeEach(inject(function($rootScope){
		rootScope = $rootScope;
	}));
	
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
		
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
		
	}));
		
	it('should test routing', function() {
		var routes,location,q;
		inject(function($route, $location,$q) {
          routes = $route;
		  location = $location;
		  q=$q;
      });
	
	rootScope.isAuthenticated = false;
	location.path('/add-pizza');
	routes.routes['/add-pizza'].resolve['checklogin'](q,location,rootScope);
	expect(location.path()).toEqual('/');
	
	rootScope.isAuthenticated = true; 
	location.path('/add-pizza');
	routes.routes['/add-pizza'].resolve['checklogin'](q,location,rootScope);
	expect(location.path()).toEqual('/add-pizza');
	});

	it('should return a link in a text', function() {
		var text = "this is some tweet and there is a link http://draugiem.lv";
		expect(rootScope.tweetURL(text)).toEqual('this is some tweet and there is a link <a href="http://draugiem.lv" target="_blank">http://draugiem.lv</a>');
		text = 'this is some tweet and there is a link <a href="http://draugiem.lv" target="_blank">draugiem.lv</a>';
		expect(rootScope.tweetURL(text)).toEqual('this is some tweet and there is a link <a href="http://draugiem.lv" target="_blank">draugiem.lv</a>');
 
	});
	it('should return the same text', function() {
		var text = "no link in this text";
		expect(rootScope.tweetURL(text)).toEqual(text);
	});
	
	it('ingredientsClientHandler should be defined', function(){
		expect(rootScope.ingredientsClientHandler).toBeDefined();
		rootScope.ingredientsClientHandler('test');
		spyOn(rootScope,'ingredientsClientHandler');
		rootScope.ingredientsClientHandler('message')
		expect(rootScope.ingredientsClientHandler).toHaveBeenCalled();
		expect(rootScope.ingredientsClientHandler).toHaveBeenCalledWith('message');
		
	});
	
	describe("EventBus handler testing", function() {
		var busSend = false;
		beforeEach(function(){
			rootScope.EBus.send = function(address,message){
				expect(address).not.toBe(null);
				expect(message).not.toBe(null);
				busSend = true;
			}
		});
	
		it('should define ingredientsClientHandler', function() {
			expect(rootScope.ingredientsClientHandler).toBeDefined();
		});
	 
		it("should call btClientHandler", function () {
			expect(rootScope.arrow).toBe(0);
			$httpBackend.flush();
			var rate = 400;
			var oldrate = 400;
			expect(rootScope.rate).toEqual(rate);
			expect(rootScope.oldrate).toEqual(oldrate);
			$httpBackend.expectGET('currency').respond([{id: 1, currency: "Bitcoin", rate: 410.00}]);
		   	busSend=false;
		    rootScope.btClientHandler("btClientHandler test message");
			$httpBackend.flush();
			expect(rootScope.arrow).toBe(1);
			expect(rootScope.oldrate).toEqual(rate);
			expect(rootScope.rate).toBe(rootScope.prices[0].rate);
			expect(busSend).toBe(true);
			
			rate = rootScope.rate;
			oldrate = rootScope.oldrate;
			
			$httpBackend.expectGET('currency').respond([{id: 1, currency: "Bitcoin", rate: 390.00}]);
			busSend=false;	    
			rootScope.btClientHandler("btClientHandler test message");
			$httpBackend.flush();
			expect(rootScope.arrow).toBe(-1);
			expect(rootScope.oldrate).toEqual(rate);
			expect(rootScope.rate).toBe(rootScope.prices[0].rate);
			expect(busSend).toBe(true);
		});
		
		it('should call tweetClientHandler', function () {
			var mockTweet = {};
			mockTweet.user = "mockUser";
			mockTweet.text = "mock tweet message";
			busSend=false;
			var expResult = "<strong>" + mockTweet.user + "</strong> : " + mockTweet.text;
			expResult = rootScope.tweetURL(expResult);
			var sce;
			inject(function($sce){
				sce = $sce;
			});
			expResult = sce.trustAsHtml(expResult);
			rootScope.tweetClientHandler(mockTweet);
			expect(busSend).toBe(true);
			expect(rootScope.tweet.toString()).toEqual(expResult.toString());
			expect(rootScope.tweet.constructor.name).toEqual(expResult.constructor.name);
		});
	});
	
	describe("EventBus mocking",function() {
		it('test',function() {
			spyOn(rootScope.EBus,'onopen').andCallThrough();
			rootScope.EBus.onopen();
			expect(rootScope.EBus.onopen).toHaveBeenCalled();
			
			//spyOn(rootScope.EBus.'onclose').andCallThrough();
			rootScope.EBus.onclose();
			
			expect(rootScope.tweets).toEqual([]);
		});
	});
	
	it('should return price change',function(){
		var price = 100;
		
		rootScope.prices = [{id: 1, currency: "Bitcoin", rate: 1}];
		rootScope.rate = rootScope.prices[0].rate;
		rootScope.oldrate = 2;
		expect(rootScope.change(price)).toBe(50);
	});
	
});
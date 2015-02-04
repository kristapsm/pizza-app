'use strict';
describe('pizzaApp services', function() {
// load modules
	beforeEach(module('pizzaApp'));
	// Test service availability
	it('check the existence of kinds factory', inject(function(kinds) {
	expect(kinds).toBeDefined();
	}));

	it('check the existence of ingredients factory', inject(function(ingredients) {
	expect(ingredients).toBeDefined();
	}));
	
	it('check the existence of Pizza factory', inject(function(Pizza) {
	expect(Pizza).toBeDefined();
	}));

	it('check the existence of Price factory', inject(function(Price) {
	expect(Price).toBeDefined();
	}));

	it('check the existence of EventBus factory', inject(function(EventBus) {
	expect(EventBus).toBeDefined();
	}));

	it('check the existence of Cart factory', inject(function(Cart) {
	expect(Cart).toBeDefined();
	}));

	it('check the existence of OrderItem factory', inject(function(OrderItem) {
	expect(OrderItem).toBeDefined();
	}));
	
	it('check the exisctence of myHttpInterceptor factory', inject(function(myHttpInterceptor) {
	expect(myHttpInterceptor).toBeDefined();
	}));
});
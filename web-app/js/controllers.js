'use strict';

/* Controllers */

angular
		.module('pizzaApp.controllers',
				['ui.bootstrap', 'ui.sortable', 'ngAnimate','ngCookies'])
		.controller(
				'ViewCtrl',
				[
						'$scope',
						'$rootScope',
						'$timeout',
						'kinds',
						'ingredients',
						'Pizza',
						'OrderItem',
						'Cart',
						'Price',
						'filterFilter',
						function($scope, $rootScope, $timeout, kinds,
								ingredients, Pizza, OrderItem, Cart, Price,
								filterFilter) {

							$rootScope.activeTab = 'pizzas';

							if (!$rootScope.cart) {
								$rootScope.cart = Cart.init();
							}

							$scope.kind = kinds[0];

							$scope.checkbox = {
								ingredients : {},
								kinds : {}
							};

							$scope.clearFilters = function() {
								$scope.checkbox = {
									ingredients : {},
									kinds : {}
								};
							};

							$scope.add = function(entry) {

								var entry = OrderItem.create(entry);

								var firstOne = false;

								for (var i = 0; i < $rootScope.cart.items.length; i++) {
									if ($rootScope.cart.items[i].pizza.id == entry.pizza.id) {
										$rootScope.cart.items[i].qty++;
										firstOne = true;
									}
								}

								if (!firstOne) {
									$rootScope.cart.items.push(entry);
								}
							};

							$scope.cart.total = function() {
								var total = 0;
								for (var i = 0; i < $rootScope.cart.items.length; i++) {
									total = total
											+ ($rootScope.cart.items[i].qty * $rootScope.cart.items[i].pizza.price);
								}
								return total;
							};

							$scope.remove = function(item) {
								var i = $rootScope.cart.items.indexOf(item);
								if (item.qty > 1) {
									var price = item.pizza.price / item.qty
									$rootScope.cart.items[i].price -= price;
									$rootScope.cart.items[i].qty--;
									// $rootScope.cart.total -= price;
								} else {
									$rootScope.cart.items.splice(i, 1);
									// $rootScope.cart.total -=
									// item.pizza.price;
								}

							}

							$scope.checkout = function() {
								alert("Sorry - that's all folks!\n");
							}

						}])
		.controller(
				'AddCtrl',
				[
						'$scope',
						'$rootScope',
						'kinds',
						'ingredients',
						'Pizza',
						function($scope, $rootScope, kinds, ingredients, Pizza) {
							$rootScope.activeTab = 'add-pizza';

							$scope.pizza = {};

							// $scope.pizza.kind = kinds[0];

							$scope.pizza.kinds = [];
							$scope.pizza.ingredients = [];

							$scope.submit = function() {
								var newPizza = new Pizza();

								newPizza.name = $scope.pizza.name;
								newPizza.kinds = $scope.pizza.kinds;
								newPizza.ingredients = $scope.pizza.ingredients;
								newPizza.image = $scope.pizza.image;
								newPizza.info = $scope.pizza.info;
								newPizza.price = parseFloat($scope.pizza.price);

								newPizza.$save({}, function() {
									$scope.submited = {
										type : 'success',
										msg : 'Pizza added :)'
									}
									$rootScope.pizzas.unshift(newPizza);
									resetForm();
								}, function() {
									$scope.submited = {
										type : 'danger',
										msg : 'Pizza adding error :('
									}
								});
							};

							$scope.remove = function(id) {
								$scope.phone = Pizza.remove({
									pizzaId : id
								}, function() {
									for ( var i in $rootScope.pizzas) {
										if ($rootScope.pizzas[i].id === id) {
											$rootScope.pizzas.splice(i, 1);

											$scope.submited = {
												type : 'warning',
												msg : 'Pizza deleted'
											}
										}
									}
								}, function() {
									$scope.submited = {
										type : 'danger',
										msg : 'Pizza removing error :('
									}
								});
							};

							$scope.clearSelections = function() {
								angular.forEach($scope.kinds, function(value) {
									value.selected = false;
								});

								angular.forEach($scope.ingredients, function(
										value) {
									value.selected = false;
								});
							}

							function resetForm() {
								$scope.pizza = {};
								$scope.pizza.kinds = [];
								$scope.pizza.ingredients = [];
								$scope.clearSelections();
								$scope.pizzaForm.$setPristine(true);
							}

						}])
		.controller(
				'TweetPizzaCtrl',
				[
						'$scope',
						'$rootScope',
						'$filter',
						'EventBus',
						'kinds',
						'ingredients',
						'Pizza',
						'$modal',
						function($scope, $rootScope, $filter, EventBus, kinds,
								ingredients, Pizza, $modal) {
							/*
							 * var ingredientHandler = function(message) {
							 * console.log(message); $scope.ingredients =
							 * message; $scope.$apply(); }
							 */
							var that = this;

							$rootScope.activeTab = 'tweet-pizza';

							if (!$rootScope.ingredients1) {
								$rootScope.ingredients1 = angular
										.copy($rootScope.ingredients);
							}

							/*
							 * var fixOrder = function() {
							 * angular.forEach($scope.pizza.ingredients,
							 * function(value, key) { var index =
							 * function(value){ for(var i =0;i<$rootScope.ingredients1.length;i++){
							 * if($rootScope.ingredients1[i].name ==
							 * value.name){ $rootScope.ingredients1.splice(i,1);
							 * break; } } }; index(value);
							 * 
							 * console.log("Remove it "); for (var i = 0; i <
							 * $rootScope.ingredients1.length; i++) { if
							 * ($rootScope.ingredients1[i].order > value.order) {
							 * $rootScope.ingredients1[i].order--; } }
							 * 
							 * }); $rootScope.$apply(); }
							 */

							this.fixIngredientOrder = function(o1, o2) {
								if (o1.order < o2.order) {
									return -1;
								}
								if (o1.order > o2.order) {
									return 1;
								}
								return 0;

							};

							this.init = true;
							$rootScope.ingredientsClientHandler = function(
									message) {
								if (that.init) {
									// $rootScope.ingredients1 = message;
									for (var i = 0; i < message.length; i++) {
										for (var j = 0; j < $rootScope.ingredients1.length; j++) {
											if ($rootScope.ingredients1[j].name == message[i].name) {
												$rootScope.ingredients1[j].order = i + 1;
												break;
											}
										}
									}
									// console.log(message.length);
									// console.log($rootScope.ingredients.length);
									// console.log($rootScope.ingredients1.length);
									that.init = false;
								} else {
									for (var i = 0; i < message.length; i++) {
										for (var j = 0; j < $rootScope.ingredients1.length; j++) {
											if ($rootScope.ingredients1[j].name == message[i].name) {
												$rootScope.ingredients1[j].rate = message[i].rate;
												$rootScope.ingredients1[j].count = message[i].count;
												$rootScope.ingredients1[j].order = i + 1;
											}
										}

									}
								}
								// fixOrder();
								$rootScope.ingredients1
										.sort(that.fixIngredientOrder);
								$rootScope.$apply();
							}

							// Method that is called when tabs are switched
							// $scope.$on('$locationChangeStart', function(
							// event ) {
							// EventBus.unregisterHandler('ingredientsClient',ingredientHandler);
							// });

							// jquery-ui sortable, angular config
							that.baseConfig = {
								tolerance : 'pointer',
								items : 'li'
							};

							$scope.ingrConfig = angular
									.extend(
											{},
											that.baseConfig,
											{
												connectWith : ".selectedIngredients",
												over : function(event, ui) {
													ui.item
															.css("transition",
																	"transform .5s linear");
													ui.item.css("transform",
															"scale(0.7)");
												},
												out : function(event, ui) {
													ui.item
															.css("transition",
																	"transform .5s linear");
													ui.item.css("transform",
															"scale(1)");
												}
											});

							$scope.selectedIngrConfig = angular
									.extend(
											{},
											that.baseConfig,
											{
												connectWith : ".ingredients",
												receive : function(event, ui) {
													var listTop = angular.element("#pizza-area-list").offset().top;
													var listLeft = angular.element("#pizza-area-list").offset().left;
															
													//image dimension 80x80, so center's in 40
													ui.item.sortable.moved.y = event.pageY - listTop - 40;
													ui.item.sortable.moved.x = event.pageX - listLeft - 40;
												}
											});

							// helper functions
							that.generateInfo = function(ingredients) {
								var info = "";
								angular.forEach(ingredients, function(
										ingredient, index) {
									info += ingredient.name;
									if (index !== (ingredients.length - 1)) {
										info += ", ";
									}
								});
								return info;
							};

							that.generatePrice = function(ingredients) {
								var price = 0;
								angular.forEach(ingredients, function(
										ingredient) {
									price += ingredient.price;
								});
								return parseFloat(price);
							};

							that.generateKinds = function(ingredients) {
								var kinds = [];

								// add all kinds that have included selected
								// ingrediet's types
								angular
										.forEach(
												ingredients,
												function(ingredient) {

													var pattern = ingredient.type
															.replace(/ /g, '\|');
													var ingrType = new RegExp(
															pattern);

													angular
															.forEach(
																	$rootScope.kinds,
																	function(
																			kind) {
																		if (ingrType
																				.test(kind.includeIngredientTypes)) {
																			kinds
																					.push(kind);
																		}
																	});
												});

								// remove all kinds that have excluded selected
								// ingrediet's types
								angular
										.forEach(
												ingredients,
												function(ingredient) {
													var pattern = ingredient.type
															.replace(/ /g, '\|');
													var ingrType = new RegExp(
															pattern);
													for (var i = kinds.length - 1; i >= 0; i--) {
														if (ingrType
																.test(kinds[i].excludeIngredientTypes)) {
															kinds.splice(i, 1);
														}
													}
												});

								if (kinds.length === 0) {
									var defaultKind = {
										"class" : "Ingredient",
										"id" : 5
									};
									kinds.push(defaultKind);
								}

								return kinds;
							};

							$scope.pizza = {};
							$scope.pizza.ingredients = [];
							$scope.pizza.price = 0;

							$scope
									.$watchCollection(
											'pizza.ingredients',
											function(newSelectedData) {
												if (newSelectedData.length !== 0) {
													$scope.pizza.price = that
															.generatePrice(newSelectedData);
												} else {
													$scope.pizza.price = 0;
												}
											});

							$scope.removeIngredient = function(item) {
								var ingrIndex = $scope.pizza.ingredients
										.indexOf(item);
								$scope.pizza.ingredients.splice(ingrIndex, 1);
								$rootScope.ingredients1.push(item);
							};

							$scope.submit = function() {

								var newPizza = new Pizza();
								newPizza.name = $scope.pizza.name;
								newPizza.ingredients = $scope.pizza.ingredients;

								newPizza.image = 'http://s8.postimg.org/kcle7t4lh/chicken.jpg';
								newPizza.kinds = that
										.generateKinds($scope.pizza.ingredients);
								newPizza.info = that
										.generateInfo($scope.pizza.ingredients);
								newPizza.price = that
										.generatePrice($scope.pizza.ingredients);

								newPizza.$save({}, function() {
									$scope.submited = {
										type : 'success',
										msg : 'Pizza added :)'
									}
									$rootScope.pizzas.unshift(newPizza);
									resetForm();
								}, function() {
									$scope.submited = {
										type : 'danger',
										msg : 'Pizza adding error :('
									}
								});
								generateImage(newPizza);
							};
							
							function generateImage(newPizza) {
	                            console.log("Sending ingredts to image maker");
	                            EventBus.send('imageMaker', newPizza.ingredients, function(msg){
	                            	msg.text = "Check out my " + newPizza.name + "  pizza";
	                            	$rootScope.tweetMessage = msg;
	                            	$scope.open();
								});
							}

							$scope.open = function(size) {
								var modalInstance = $modal.open({
									templateUrl : 'partials/share.html',
									controller : 'ShareCtrl',
									size : size
								});
							}

							function resetForm() {
								that.init = true;
								$scope.pizza = {};
								$scope.pizza.ingredients = [];
								$rootScope.ingredients1 = angular
										.copy($rootScope.ingredients);
								$scope.pizzaForm.$setPristine(true);
							}

						}])

		.controller('PageCtrl',
				['$scope', '$rootScope', function($scope, $rootScope) {

					$scope.currentPage = 1; // current page
					$scope.maxSize = 5; // pagination max size
					$scope.entryLimit = 5; // max items per page

				}])

		.controller('ShareCtrl',
				['$scope', '$rootScope', function($scope, $rootScope) {
					console.log("Share");
					window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));

					$scope.tweetText = $rootScope.tweetMessage["text"];
					$scope.imageUrl = $rootScope.tweetMessage["url"];

				}])
		.controller('AuthCtrl',['$scope','$rootScope','$http','$location','$cookieStore','srvAuth','googleAPI', function($scope,$rootScope,$http,$location,$cookieStore,srvAuth,googleAPI){
					$scope.processAuth = function(response){
						googleAPI.processAuth(response);
					}
					window.signinCallback = $scope.processAuth;
					
					$scope.showLogin = false;
					$rootScope.token = $cookieStore.get("token");
					if(!$rootScope.token) {
						$rootScope.token = {};
					}
					$rootScope.hasRole = null;
					//app.css hides the elements on initial load
					$(".login.panel").css("display", "block");
					$(".authMenu").css("display","block");
					$scope.hideerror = true;
					$rootScope.user = {username:'',password: ''};
					if($rootScope.token.username != undefined) {
						$rootScope.user.username = $rootScope.token.username;
					}
					
					$rootScope.hasRole = function(role) {
						var hasrole = false;
						if ($rootScope.token.roles === undefined) {
						return hasrole;
						}
						angular.forEach($rootScope.token.roles,function(value){
							if(value==role){
								hasrole = true;
							}
						});
						return hasrole;
					};
					
					$scope.openlogin = function() {
						if($scope.showLogin){
							$scope.closelogin();
						}else{
							$rootScope.user = {username: '',password: ''};
							$scope.hideerror = true;
							$scope.showLogin = true;
						}
					}
					
					$scope.closelogin = function() {
						$rootScope.user = {username: '',password: ''};
						$scope.hideerror = true;
						$scope.showLogin = false;
						
					}
					
					$scope.authenticate = function() {
						$("#err_alert").hide();
						$("#spinner").show();
						$http.post('/pizza-app/api/login',{username: $rootScope.user.username,password:$rootScope.user.password})
						.success(function(result){
							$scope.hideerror=true;
							$scope.showLogin = false;
							$rootScope.token = result;
							$rootScope.isAuthenticated = true;
							$cookieStore.put("token",result);
							$rootScope.token = result;
						})
						.error(function(error){
							$rootScope.token=error;
							$scope.hideerror=false;
						});
					}
					
					$scope.logout = function() {
						$http.post('/pizza-app/logout')
						.success(function(result){
							$rootScope.isAuthenticated = false;
							if($rootScope.token.roles[0] === 'ROLE_FACEBOOK'){
								srvAuth.logout();
							}else if($rootScope.token.roles[0] === 'ROLE_GOOGLE'){
								gapi.auth.signOut();
							}
							$rootScope.token = {};
							$cookieStore.remove("token");
							$rootScope.user = {};
							if($location.path() == '/add-pizza'){
								$location.path('/pizzas');
							}
						});
					}
					
					
					
					
					
		}]);

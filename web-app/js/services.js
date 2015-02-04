
'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('pizzaApp.services', ['ngResource'])
    .value('version', '0.1')
    .factory('kinds', ['$resource',
        function($resource){
            return $resource('kind/:kindId', {}, {
                query: {method:'GET', params: {max:-1}, isArray:true}
            });
    }])
    .factory('ingredients', ['$resource',
        function($resource){
            return $resource('ingredient/:ingredientId', {}, {
                query: {method:'GET', params: {max:-1}, isArray:true}
            });
    }])
    .factory('Pizza', ['$resource',
        function($resource){
            return $resource('pizza/:pizzaId', {}, {
                query: {method:'GET', params: {max: -1, sort: 'id', order: 'desc'}, isArray:true}
            });
    }])
    .factory('Price', ['$resource',
        function($resource){
            return $resource('currency/:currencyId', {}, {
                query: {method:'GET', params: {}, isArray:true}
            });
    }])
    .factory('EventBus', function () {
	return new vertx.EventBus("http://localhost:8082/eventbus");
    })
    .service('Cart', function () {
        return {
            create: function (items, total) {
                return {
                    items: items,
                    total: total
                }
            },
            init: function () {
                return {
                    items: [],
                    total: 0
                }
            }
        }
    })
    .service('OrderItem', function () {
        return {
            create: function (pizza, qty) {
                return {
                    pizza: pizza,
                    qty: (qty ? qty : 1)
                }
            }
        }
    }).factory('myHttpInterceptor', function ($q, $window,$rootScope) {
    	  return function (promise) {
    		    return promise.then(function (response) {
    		      $("#spinner").hide();
    		      $("#err_alert").hide();
    		      return response;
    		    }, function (response) {
    		      $("#spinner").hide();
    		      $("#err_alert").show();
    		      return $q.reject(response);
    		    });
    		  };
    		})
    	.factory(
				'srvAuth',
				function($rootScope, $cookieStore, $location) {

					return {
						watchLoginChange : function() {

							var _self = this;

							FB.Event.subscribe('auth.authResponseChange',
									function(response) {

										if (response.status === 'connected') {

											/*
											 * The user is already logged, is
											 * possible retrieve his personal
											 * info
											 */
											_self.getUserInfo();
											// MUHAHAHA

											/*
											 * This is also the point where you
											 * should create a session for the
											 * current user. For this purpose
											 * you can use the data inside the
											 * response.authResponse object.
											 */

										} else {

											/*
											 * The user is not logged to the
											 * app, or into Facebook: destroy
											 * the session on the server.
											 */

										}

									});

						},
						getUserInfo : function() {
							var _self = this;
							FB.api('/me', function(response) {
								$rootScope.$apply(function() {
									var token = {};
									token.username = response['name'];
									token.access_token = response['id'];
									token.roles = [];
									token.roles[0] = 'ROLE_FACEBOOK';
									token.roles[1] = 'ROLE_ADMIN';
									$cookieStore.put('token', token);
									$rootScope.token = token;
									$rootScope.user.username = token.username;
									$rootScope.isAuthenticated = true;
								});

							});

						},
						logout : function() {
							var _self = this;
							FB.logout(function(response) {
								$rootScope.$apply(function() {
									$rootScope.user = {};
								});

							});

						}
					}

				}).factory('googleAPI',function($rootScope,$cookieStore,$http){
					return {
						processAuth : function(authResponse){

							var self = this;
							if(!$cookieStore.get('token') && authResponse['access_token']/* && authResponse['status']['method'] == 'PROMPT'*/){
								self.generateToken(authResponse['access_token']);
								$('iframe[src^="https://apis.google.com"]').css("display", "block");
								
							}
						}, generateToken : function(access_token){
							 $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+access_token)
	                          .success(function(data){
										var token = {};
										//console.log(gapi.client.plus.people.get( {'userId' : 'me'} ));
										token.access_token = access_token;
										token.roles = [];
										token.username = data['name'];
										token.roles[0] = 'ROLE_GOOGLE';
										token.roles[1] = 'ROLE_ADMIN';
										$cookieStore.put('token', token);
										$rootScope.token = token;
										$rootScope.user.username = token.username;
										$rootScope.isAuthenticated = true;
	                          })
	                          .error(function(data){
	                          });
						}
					}	
				});
'use strict';

// Declare app level module which depends on filters, and services
angular
		.module(
				'pizzaApp',
				[ 'ngRoute' ,'pizzaApp.filters', 'pizzaApp.services',
						'pizzaApp.directives', 'pizzaApp.controllers'])
		.config([ '$routeProvider','$httpProvider', function($routeProvider,$httpProvider,myHttpInterceptor) {
			$routeProvider.when('/pizzas', {
				templateUrl : 'partials/pizzas.html',
				controller : 'ViewCtrl'
			});
			$routeProvider.when('/add-pizza', {
				templateUrl : 'partials/add-pizza.html',
				controller : 'AddCtrl',
				resolve: {
					checklogin: function($q, $location,$rootScope) {
					  var deferred = $q.defer(); 
					  deferred.resolve();
					  if (!$rootScope.isAuthenticated) {
						 $location.path('/');
					  }

					  return deferred.promise;
					}
				}
			});
			$routeProvider.when('/tweet-pizza', {
				templateUrl : 'partials/tweet-pizza.html',
				controller : 'TweetPizzaCtrl'
			});
			$routeProvider.otherwise({
				redirectTo : '/pizzas'
			});

			$httpProvider.responseInterceptors.push('myHttpInterceptor');
		} ])
		.run(
				function($rootScope, $interval, $sce, EventBus, Price, kinds,
						Pizza, ingredients, $location, $http,$timeout,$cookieStore,$window,srvAuth) {

					$rootScope.tweetURL = function(text) {
						var rex = /(<a href=")?(https?:\/\/)[-A-Za-z0-9+&@#\/%?=~_|$!:,.;]+/ig;

						text = text.replace(rex, function($0, $1) {
							return $1 ? $0 : '<a href="' + $0
									+ '" target="_blank">' + $0 + '</a>';
						});

						text = text.replace(/pizza/ig, '<b>$&</b>');
						return text;
					}

					$rootScope.kinds = kinds.query();

					$rootScope.ingredients = ingredients.query();

					$rootScope.pizzas = Pizza.query();

					$rootScope.prices = Price.query(function() {

						$rootScope.rate = $rootScope.prices[0].rate;
						$rootScope.oldrate = $rootScope.rate;
						// $rootScope.arrow = 0;
					});
					
					$rootScope.token = $cookieStore.get('token');
					$rootScope.isAuthenticated = $rootScope.token != undefined;

					var d = new Date();
					$rootScope.timeS = d.getTime();
					$rootScope.arrow = 0;
					$rootScope.trig = 1;
					$rootScope.bgCol = 'red';
					$rootScope.offtext='Live';
					
					$rootScope.tweets = [];
					$rootScope.tweet = $sce.trustAsHtml("Waiting for tweets ...");

					$rootScope.ingredientsClientHandler = function(message) {
					};
					$rootScope.btClientHandler = function(message) {
						$rootScope.timeS = new Date().getTime();
						$rootScope.prices = Price.query(function() {
							if ($rootScope.rate > $rootScope.prices[0].rate) {
								$rootScope.arrow = -1
							} else {
								$rootScope.arrow = 1
							}
							$rootScope.oldrate = $rootScope.rate;
							$rootScope.rate = $rootScope.prices[0].rate;
						});

						$rootScope.EBus.send('btNotifier', "Thanks!");

						$rootScope.$apply();

					};
					$rootScope.tweetClientHandler = function(message) {

						// console.log($rootScope.tweetURL(message));
						var temp = "<strong>" + message.user + "</strong> : "
								+ message.text;
						temp = $rootScope.tweetURL(temp);
					  
							$rootScope.tweet = $sce.trustAsHtml(temp);
							$rootScope.trig = 0;
							
	
							// console.log(message);
							// $rootScope.tweetsText =
							// $sce.trustAsHtml($rootScope.tweets.text);
							// console.log($rootScope.tweetsText);
							$rootScope.bob = [temp];
							$rootScope.EBus.send('tweetHandler', "Thanks!");
							
							$rootScope.$apply();
							$rootScope.trig = 1;
							
							
						
					};

					EventBus.onopen = function() {
						EventBus.registerHandler('btClient', function(message) {
							$rootScope.btClientHandler(message);
						});

						EventBus.registerHandler('tweetClient', function(
								message) {

							$rootScope.tweetClientHandler(message);

						});

						EventBus.registerHandler('ingredientsClient', function(
								message) {
							// console.log("Cau");
							$rootScope.ingredientsClientHandler(message);
						});

						EventBus.onclose = function() {
							$rootScope.tweet = $sce.trustAsHtml("Offline");
							$rootScope.bgCol = 'gray';
							$rootScope.offtext='Offline ';
							$rootScope.$digest();
							console.log("CLosed");
						}
						$rootScope.tweets = [];
					}

					$rootScope.EBus = EventBus;

					$rootScope.AssignedDate = Date; // 'Date' could be assigned
													// too of
					// course:)
					// console.log(EventBus);
					$interval(function() {
						// nothing is required here, interval triggers digest
						// automaticaly
					}, 1000)

					$rootScope.change = function(price) {
						// console.log((price/$rootScope.oldrate -
						// price/$rootScope.rate));
						return (price / $rootScope.rate - price
								/ $rootScope.oldrate);
					}
					
					

					// console.log($rootScope.tweetURL("Pizzas asf
					// http://t.co/JAHSDKJHL"));
					// console.log($rootScope.tweetURL(" asf 3.4 asd.asd"));

					// Ctrl.$inject = ["$rootScope"];
				
					//$rootScope.user = {};
					$window.fbAsyncInit = function() {
					// Executed when the SDK is loaded
					FB.init({
					/*
					* The app id of the web app; To register a new app visit
					* Facebook App Dashboard (
					* https://developers.facebook.com/apps/ )
					*/
					appId : '1637150619845190',
					/*
					* Adding a Channel File improves the performance of the
					* javascript SDK, by addressing issues with cross-domain
					* communication in certain browsers.
					*/
					channelUrl : 'partials/channel.html',
					/*
					* Set if you want to check the authentication status at the
					* start up of the app
					*/
					status : true,
					/*
					* Enable cookies to allow the server to access the session
					*/
					cookie : true,
					/* Parse XFBML */
					xfbml : true,
					version : 'v2.1'
					});
					srvAuth.watchLoginChange();
					};
					// Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?
					(function(d) {
						// load the Facebook javascript SDK
						var js, id = 'facebook-jssdk', ref = d
						.getElementsByTagName('script')[0];
						if (d.getElementById(id)) {
							return;
						}
						js = d.createElement('script');
						js.id = id;
						js.async = true;
						js.src = "//connect.facebook.net/en_US/all.js";

						ref.parentNode.insertBefore(js, ref);
					}(document));
					
					
					//google+
				      (function() {
				       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
				       po.src = 'https://apis.google.com/js/client:plusone.js';
				       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
				     })();
					

				});
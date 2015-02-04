<!doctype html>
<html lang="en" ng-app="pizzaApp">
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Demo App</title>
<r:require modules="app" />
<r:layoutResources />
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css"
	rel="stylesheet">
<script type="text/javascript">
	if (!window.console)
		console = {
			log : function() {
			}
		};
</script>
</head>

<body>
	<div id="fb-root"></div>
	<script src="http://cdn.sockjs.org/sockjs-0.3.4.min.js"></script>
	<script
		src="https://apis.google.com/js/client:platform.js?onload=render"
		async defer></script>
	<script>
		function render() {
			gapi.signin
					.render(
							'login-btn-google',
							{
								'callback' : 'signinCallback',
								'clientid' : '803830627521-vqu3kirfcl5qfnuaa216ual95u9ntms6.apps.googleusercontent.com',
								'cookiepolicy' : 'single_host_origin',
								'requestvisibleactions' : 'http://schema.org/AddAction',
								'scope' : 'https://www.googleapis.com/auth/plus.login'
							});
		}
	</script>
	<div class="container">
		<table style="width: 100%">
			<tr>
				<th rowspan="2">
				<img src="images/pizza-app.png"
					alt="Accenture's pizza app" width="350px" height="128px"> </img>
				</th>
				<td bgcolor="#5bc0de">
					<div class="text-right" >
						<div style="color:#FFFFFF" ng-class="{'trigclear': trig==0, 'trigin': trig==1}"
							ng-bind-html="tweet">@ {{tweet}}</div>
					</div>
				</td>
			</tr>
			<tr>
				<td style="vertical-align:bottom">
				<div class="text-right" >
				<br>
				<span class="label label-info" ng-style="{'background-color': bgCol}"><strong>{{offtext}}</strong></span>
						<strong>{{ 1 | bitcoin}} = {{prices[0].rate |
							currency:"$"}} <i class="glyphicon"
							ng-class="{'glyphicon-arrow-down red' : arrow == -1, 'glyphicon-arrow-up green' : arrow == 1}"></i>
						</strong> <small>@ {{timeS | date: 'hh:mm:ss'}}
						<!--<br>Current
							time:{{AssignedDate.now() | date:'yyyy-MM-dd HH:mm:ss'}}
						</small> </br>-->
					</div>
				</td>
			</tr>
		</table>

		<div id="auth" ng-controller="AuthCtrl">
			<div class="authMenu" ng-show="isAuthenticated==true">
				Welcome Back, {{user.username}}!
				<button id="btn-small" class="btn btn-primary" ng-click=logout()>Logout</button>
			</div>
			<div ng-show="isAuthenticated==false">
				<button id="btn-small" class="btn btn-primary"
					ng-click='openlogin()'>Login</button>
				<div id="login-btn-google">&nbsp</div>
				<div class="fb-login-button" data-max-rows="1" data-size="icon"
					data-show-faces="false" data-auto-logout-link="true"
					style="vertical-align: bottom;"></div>

			</div>
			<div class="panel login" ng-show="showLogin">
				<div style="padding-left: 135px; padding-top: 20px;">
					<img id="spinner" ng-src="images/spinner_new.gif" />
				</div>
				<h5 id="err_alert" class="alert alert-danger"
					style="position: absolute; top: 0px; left: 17px;"
					ng-hide="hideerror">Unauthenticated to access resource.</h5>
				<form class="loginform" name="userAuth" ngSubmit="authenticate()">
					<div class="input-group">
						<span class="input-group-addon">username:</span> <input
							class="form-control" autofocus type="text"
							ng-model="user.username" placeholder="hint: user">
					</div>
					<br>
					<div class="input-group">
						<span class="input-group-addon">password:</span> <input
							class="form-control" type="password" ng-model="user.password"
							placeholder="hint: pass">
					</div>

					<br>
					<div class="btn-group">
						<button class="btn btn-primary" ng-click="authenticate()">Login</button>
						<button class="btn btn-primary" ng-click="closelogin()">Cancel</button>
					</div>
				</form>
			</div>
		</div>
		<br>

		<ul class="nav nav-tabs">
			<li ng-class="{active: activeTab == 'pizzas'}"><a
				href="#/pizzas">Pizzas</a></li>
			<li ng-show="isAuthenticated==true && hasRole('ROLE_ADMIN')"
				ng-class="{active: activeTab == 'add-pizza'}"><a
				href="#/add-pizza">Add pizza</a></li>
			<li ng-class="{active: activeTab == 'tweet-pizza'}"><a
				href="#/tweet-pizza">Tweet Pizza</a></li>
		</ul>

		<div ng-view></div>

		<div>
			<span app-version></span>
		</div>
	</div>
	<r:layoutResources />

</body>
</html>

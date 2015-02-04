modules = {

    app {
        dependsOn 'jqueryUI, angular, angularRoute, angularResource, angularAnimate, bootstrap'
        resource url: 'css/app.css'
        resource url: 'js/app.js'
        resource url: 'js/services.js'
        resource url: 'js/controllers.js'
        resource url: 'js/filters.js'
        resource url: 'js/directives.js'
		resource url: 'js/lib/sockjs-0.3.4.min.js'
		resource url: 'js/lib/vertxbus.js'
		resource url: 'js/lib/ui-bootstrap-tpls-0.11.0.min.js'
        resource url: 'js/lib/angular/angular-animate.js'
		resource url: 'js/lib/sortable.js'
		resource url: 'js/lib/angular/angular-cookies.js'
    }

    bootstrap {
        resource url: 'css/bootstrap.min.css'
    }

    angular {
        resource id: 'js', url: [dir: 'js/lib/angular', file: "angular.js"], nominify: true
    }
    
    angularRoute {
        dependsOn 'angular'
        resource id: 'js', url: [dir: 'js/lib/angular', file: "angular-route.js"], nominify: true
    }

    angularResource {
        dependsOn 'angularRoute'
        resource id: 'js', url: [dir: 'js/lib/angular', file: "angular-resource.js"], nominify: true
    }
    angularAnimate {
        resource id: 'js', url: [dir: 'js/lib/angular', file: "angular-animate.min.js"], nominify: true
    }
	jqueryUI {
		resource url: 'js/lib/jquery-1.11.1.min.js'	
		resource url: 'js/lib/jquery-ui-1.11.1.custom/jquery-ui.min.css'
		resource url: 'js/lib/jquery-ui-1.11.1.custom/jquery-ui.min.js'
	}
    
}
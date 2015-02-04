import org.vertx.java.platform.PlatformLocator;
import pizza.backend.Ingredient
import pizza.backend.auth.*

class BootStrap {

    def vertxPlatformManager
    
    def init = { servletContext ->
    
        new pizza.backend.Currency(id: 1, currency: "Bitcoin", rate: 1).save()


		/////Ingredients/////
		//Vegetables
		def olives = new Ingredient(id:1, name:"black olives", type:"vegetable", image: "http://images.creatureworld.net/items/green_olives.png", price:0.99)
		def garlic = new Ingredient(id:1, name:"garlic", type:"vegetable", image: "http://iconbug.com/data/c5/48/02544ad9a6e5f11e18739c9a5b610adc.png", price:0.75)
		def pineapple = new Ingredient(id:1, name:"pineapple", type:"vegetable", image: "http://img1.wikia.nocookie.net/__cb20140520193939/goatlings/images/thumb/b/ba/Item_45.gif/50px-Item_45.gif", price:0.82)
		def tomato = new Ingredient(id:1, name:"tomatoes", type:"vegetable", image: "http://img3.wikia.nocookie.net/__cb20140326231144/herebemonsters/images/thumb/b/b7/Tomato-Sprite.png/40px-Tomato-Sprite.png", price:0.44)
		def peppers = new Ingredient(id:1, name:"chili peppers", type:"vegetable", image: "http://img4.wikia.nocookie.net/__cb20121010115817/farmville2/images/9/91/Red_Pepper.png", price:1.35)
		def bpeppers = new Ingredient(id:1, name:"bell peppers", type:"vegetable", image: "http://img4.wikia.nocookie.net/__cb20121010115817/farmville2/images/9/91/Red_Pepper.png", price:0.80)
		
		//Cheese
		def mozzarella = new Ingredient(id:1, name:"mozzarella", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.11)
		def parmesan = new Ingredient(id:1, name:"parmesan", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.37)
		def cheddar = new Ingredient(id:1, name:"cheddar", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:0.75)
		def mascarpone = new Ingredient(id:1, name:"mascarpone", type:"cheese", image: "http://img3.wikia.nocookie.net/__cb20100802134055/restaurantcity/images/thumb/a/a5/Cheese.png/50px-Cheese.png", price:2.83)
		
		//Meat
		def hamMeat = new Ingredient(id:1, name:"ham", type:"ham meat", image: "http://icons.iconarchive.com/icons/fixicon/market/128/ham-icon.png", price:0.30)
		def bacon = new Ingredient(id:1, name:"bacon", type:"bacon meat", image: "http://blog.munzee.com/wp-content/uploads/2013/08/Bacon-128.png", price:0.75)
		def beefMeat = new Ingredient(id:1, name:"beef", type:"beef meat", image: "http://icons.iconarchive.com/icons/fixicon/market/128/ham-icon.png", price:0.30)
		def chickenMeat = new Ingredient(id:1, name:"chicken", type:"chicken meat", image: "http://hunt.nnov.ru/forum/public/style_emoticons/default/chicken.gif", price:0.25)
		def pepperoni = new Ingredient(id:1, name:"pepperoni", type:"pepperoni meat", image: "http://www.rw-designer.com/icon-view/10701.png", price:0.45)
		def salami = new Ingredient(id:1, name:"salami", type:"salami meat", image: "http://www.rw-designer.com/icon-view/10701.png", price:0.60)
		def sausage = new Ingredient(id:1, name:"sausage", type:"sausage meat", image: "http://www.rw-designer.com/icon-view/10701.png", price:0.30)
		
		//Mushrooms
		def agaricus = new Ingredient(id:1, name:"agaricus", type:"mushrooms", image: "http://images.creatureworld.net/items/sliced_mushroom.png", price:0.14)
		def mushroomsMarinated = new Ingredient(id:1, name:"marinated mushrooms", type:"marinated|mushrooms", image: "http://images.creatureworld.net/items/sliced_mushroom.png", price:0.27)
		
		//Fish
		def anchovy = new Ingredient(id:1, name:"anchovies", type:"fish", image: "http://iconshow.me/media/images/animals/Cute-animals-Icons/png/48/tuna.png", price:0.47)
		def tuna = new Ingredient(id:1, name:"tuna", type:"fish", image: "http://iconshow.me/media/images/animals/Cute-animals-Icons/png/48/tuna.png", price:1.22)
		
		//Sauce
		def chiliSauce = new Ingredient(id:1, name:"chili sauce", type:"hot sauce", image: "https://dtgxwmigmg3gc.cloudfront.net/files/4fec06f3c566d77b12016928-icon-64x64.png", price:0.12)
		def taiwanSauce = new Ingredient(id:1, name:"taiwan sweet sauce", type:"sweet sauce", image: "https://dtgxwmigmg3gc.cloudfront.net/files/4fec06f3c566d77b12016928-icon-64x64.png", price:0.15)
		def taiwanHotSauce = new Ingredient(id:1, name:"taiwan hot sauce", type:"hot sauce", image: "https://dtgxwmigmg3gc.cloudfront.net/files/4fec06f3c566d77b12016928-icon-64x64.png", price:0.15)

		olives.save()
		garlic.save()
		pineapple.save()
		tomato.save()
		peppers.save()
		bpeppers.save()
		mozzarella.save()
		parmesan.save()
		cheddar.save()
		mascarpone.save()
		hamMeat.save()
		bacon.save()
		beefMeat.save()
		chickenMeat.save()
		pepperoni.save()
		salami.save()
		sausage.save()
		agaricus.save()
		mushroomsMarinated.save()
		anchovy.save()
		tuna.save()
		chiliSauce.save()
		taiwanSauce.save()
		taiwanHotSauce.save()
		
		/////Kinds/////
		//by ingredients
		def ham = new pizza.backend.Kind(id: 1, name:"ham")
		def beef = new pizza.backend.Kind(id: 2, name:"beef")
		def chicken = new pizza.backend.Kind(id: 3, name:"chicken")
		def vegetarian = new pizza.backend.Kind(id: 4, name:"vegetarian")
		def other= new pizza.backend.Kind(id: 5, name:"other")
		def seaFood = new pizza.backend.Kind(id: 6, name:"marine")
		def fourCheese = new pizza.backend.Kind(id: 7, name:"4 cheese")
		def mexican = new pizza.backend.Kind(id: 8, name:"mexican")
		
		//by cooking type
		def fourSeasons = new pizza.backend.Kind(id: 9, name:"4 seasons")
		def grilled = new pizza.backend.Kind(id: 10, name:"grilled")
		
		//by pizza form
		def silician = new pizza.backend.Kind(id: 11, name:"silician")

		ham.addToIncludeIngredientTypes("ham");
		ham.addToExcludeIngredientTypes("fish");
		
		beef.addToIncludeIngredientTypes("beef");
		beef.addToExcludeIngredientTypes("fish");
		
		chicken.addToIncludeIngredientTypes("chicken");
		chicken.addToExcludeIngredientTypes("fish");
		
		vegetarian.addToIncludeIngredientTypes("vegetable");
		vegetarian.addToExcludeIngredientTypes("fish");
		vegetarian.addToExcludeIngredientTypes("meat");
		
		grilled.addToIncludeIngredientTypes("meat");
		grilled.addToExcludeIngredientTypes("fish");
		
		seaFood.addToIncludeIngredientTypes("fish");
		seaFood.addToExcludeIngredientTypes("meat");
		
		mexican.addToIncludeIngredientTypes("hot");
		mexican.addToIncludeIngredientTypes("meat");
		mexican.addToExcludeIngredientTypes("fish");
		
		fourCheese.addToIncludeIngredientTypes("cheese");
		
		ham.save()
		beef.save()
		chicken.save()
		vegetarian.save()
		other.save()
		grilled.save()
		seaFood.save()
		mexican.save()
		silician.save()
		fourSeasons.save()
		fourCheese.save()
		
		
		/////Pizzas/////
		def pizza1 =new pizza.backend.Pizza(id: 1, name:"Lightness", image: "http://s8.postimg.org/dwh0vglfp/vegetarian.jpg", info:"Red caviar, chese, mayonaisse, sesam, tomatoe sauce", price:10.0).save()
		def pizza2 =new pizza.backend.Pizza(id: 2, name:"Barbarians", image: "http://s8.postimg.org/sw4s5kcxx/ham2.jpg", info:"Mushrooms, ham, checken, mayonaisse, potatoe bits", price:11.50).save()
		def pizza3 =new pizza.backend.Pizza(id: 3, name:"Dinner", image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Bacon bits, mayo, chese, tomato sauce", price:8.90).save()
		def pizza4 =new pizza.backend.Pizza(id: 4, name:"Spring delight", image: "http://s8.postimg.org/hrftkaf7p/chicken3.png", info:"Somoked chicken bits, basilik, chese, mayonnaisse, corn", price:9.99).save()
		def pizza5 =new pizza.backend.Pizza(id: 5, name:"Curry surprise", image: "http://s8.postimg.org/74qlslwg5/pork2.jpg", info:"Olives, onions, ham slices, chese, curry seasoning", price:7.49).save()
		def pizza6 =new pizza.backend.Pizza(id: 6, name:"Gourmet", image: "http://s8.postimg.org/q8jx8y9ad/pork.jpg", info:"Juicy ham pieces, chese, chilli peppers, tomatoes, dill seasoning", price:12.25).save()
		def pizza7 =new pizza.backend.Pizza(id: 7, name:"Natural chilli", image: "http://s8.postimg.org/okg6gk611/chicken2.png", info:"Chilli peppers, tomatoes, olives, mushrooms, chese", price:9.50).save()
		def pizza8 =new pizza.backend.Pizza(id: 8, name:"Agular ham", image: "http://s8.postimg.org/j03p5x75x/ham3.jpg", info:"Ham, chese, mazarella chese, tomato souce", price:11.00).save()
		def pizza9 =new pizza.backend.Pizza(id: 9, name:"Adventurers", image: "http://s8.postimg.org/qjws7z0cl/kolay.jpg", info:"Champignon mushrooms, salami, chese, olives", price:8.90).save()
		def pizza10 =new pizza.backend.Pizza(id: 10, name:"Hevanly ham", image: "http://s8.postimg.org/wm4eygosl/ham.jpg", info:"Smoked ham, mazarella chese, sesam leaves, cherry tomatoes", price:5.99).save()
		def pizza11 =new pizza.backend.Pizza(id: 11, name:"Gardners", image: "http://s8.postimg.org/u7cje18jp/gardners.jpg", info:"Olives, paprica, tomatoes and cheeses and mayo", price:7.99).save()
		def pizza12 =new pizza.backend.Pizza(id: 12, name:"Sunrise", image: "http://s8.postimg.org/kcle7t4lh/chicken.jpg", info:"Chicken pizza with onions, dill and garclic seasoning", price:9.99).save()

		//////////Adding pizza kinds/////////
		pizza1.addToKinds(other)
		pizza1.addToKinds(ham)
		pizza2.addToKinds(other)
		pizza2.addToKinds(beef)
		pizza3.addToKinds(beef)
		pizza4.addToKinds(chicken)
		pizza5.addToKinds(ham)
		pizza6.addToKinds(ham)
		pizza7.addToKinds(vegetarian)
		pizza8.addToKinds(vegetarian)
		pizza9.addToKinds(beef)
		pizza10.addToKinds(ham)
		pizza11.addToKinds(vegetarian)
		pizza12.addToKinds(chicken)
		
		//////////Adding pizza ingredients/////////
		pizza1.addToIngredients(hamMeat)
		pizza1.addToIngredients(beefMeat)
		pizza1.addToIngredients(chickenMeat)
		pizza1.addToIngredients(cheddar)
		pizza1.addToIngredients(tomato)
		pizza1.addToIngredients(mushroomsMarinated)
		
		pizza2.addToIngredients(hamMeat)
		pizza2.addToIngredients(beefMeat)
		pizza2.addToIngredients(cheddar)
		pizza2.addToIngredients(tomato)
		
		pizza3.addToIngredients(beefMeat)
		pizza3.addToIngredients(cheddar)
		pizza3.addToIngredients(tomato)
		pizza3.addToIngredients(olives)
		
		pizza4.addToIngredients(chickenMeat)
		pizza4.addToIngredients(cheddar)
		pizza4.addToIngredients(tomato)
		
		pizza5.addToIngredients(taiwanHotSauce)
		pizza5.addToIngredients(cheddar)
		pizza5.addToIngredients(tomato)
		pizza5.addToIngredients(mushroomsMarinated)
		
		pizza6.addToIngredients(cheddar)
		pizza6.addToIngredients(tomato)
		pizza6.addToIngredients(bpeppers)
		pizza6.addToIngredients(mushroomsMarinated)
		
		pizza7.addToIngredients(chiliSauce)
		pizza7.addToIngredients(cheddar)
		pizza7.addToIngredients(tomato)
		
		pizza8.addToIngredients(hamMeat)
		pizza8.addToIngredients(cheddar)
		pizza8.addToIngredients(tomato)
		
		pizza9.addToIngredients(beefMeat)
		pizza9.addToIngredients(taiwanHotSauce)
		pizza9.addToIngredients(cheddar)
		pizza9.addToIngredients(tomato)
		pizza9.addToIngredients(bpeppers)
		
		pizza10.addToIngredients(hamMeat)
		pizza10.addToIngredients(taiwanHotSauce)
		pizza10.addToIngredients(cheddar)
		pizza10.addToIngredients(tomato)
		pizza10.addToIngredients(mushroomsMarinated)
		pizza10.addToIngredients(olives)
		
		pizza11.addToIngredients(cheddar)
		pizza11.addToIngredients(garlic)
		pizza11.addToIngredients(bpeppers)
		pizza11.addToIngredients(mushroomsMarinated)
		
		pizza12.addToIngredients(chickenMeat)
		pizza12.addToIngredients(cheddar)
		pizza12.addToIngredients(garlic)
		
		//user definition
		User admin = new User(username: "admin", password: "admin")
		admin.save()
		
		User user = new User(username: "user", password:"user")
		user.save()
 
		Role roleAdmin = new Role(authority: "ROLE_ADMIN")
		roleAdmin.save()
		
		Role roleUser = new Role(authority: "ROLE_USER")
		roleUser.save()
 
		new UserRole(user: user, role: roleUser).save()
		new UserRole(user: admin, role: roleAdmin).save()
		
		//requestmap
		//for (String url in [
	//		'/','/index.gsp', '/index', '/**/favicon.ico',
	//		'/assets/**', '/**/js/**', '/**/css/**', '/**/images/**',
	//		'/login/**','/logout/**','/pizza/**','/currency/**','/kind/**',
	//		'/ingredient/**','/partials/pizzas.html',
	//		'/partials/tweet-pizza.html']) {
	//	 new Requestmap(url: url, configAttribute: 'permitAll').save(flush: true)
	//  }
//		new Requestmap(url: '/partials/add-pizza.html',configAttribute: 'ROLE_ADMIN').save(flush: true)
	//	new Requestmap(url: '/dbconsole/**',configAttribute: 'ROLE_ADMIN,ROLE_USER').save(flush: true)

        vertxPlatformManager = PlatformLocator.factory.createPlatformManager()
        URL[] classpath = [new File("src/java/pizzaVerticles/src/vertx/java/hello").toURI().toURL()]
        vertxPlatformManager.deployVerticle("RateFetcherVerticleFirebase.java", null, classpath, 1, null, null)
		vertxPlatformManager.deployVerticle("Server.java", null, classpath, 1, null, null)
        vertxPlatformManager.deployVerticle("SocialTweety.java", null, classpath, 1, null, null)
        
    }
    
    def destroy = {
    }
}
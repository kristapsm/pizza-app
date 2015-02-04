package pizza.backend

import grails.rest.Resource
    
@Resource(uri='/kind', formats=['json'])
class Kind {
    
    Integer id
    String name

    static constraints = {
        name blank:false
    }
	
	static hasMany = [
		includeIngredientTypes: String,
		excludeIngredientTypes: String
	]
	
	//static mapping = {
	//	cache usage:'read-only'
	//}
}


package pizza.backend

import grails.rest.Resource
    
@Resource(uri='/pizza', formats=['json'])
class Pizza {
    
    Integer id
    String name
    String image
    String info
    Double price

    static constraints = {
        name blank:false
        price blank:false
    }
	
	static hasMany = [
		ingredients : Ingredient,
		kinds : Kind
	]
	
	//static mapping = {
	//	kind cache: true
	//}
	
}

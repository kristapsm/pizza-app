package pizza.backend
import grails.rest.Resource

@Resource(uri='/ingredient', formats=['json'])
class Ingredient {
	Integer id
	String name
	String type
	String image
	Double price

	static constraints = {
		name blank:false
		type blank:false
	}
}

package pizza.backend

import grails.rest.Resource

@Resource(uri='/currency', formats=['json'])
class Currency {

	Integer id
	String currency
	//Rate in comparison to USD
	Double rate
	
    static constraints = {
		currency blank:false
		rate blank:false
    }
	
	static mapping = {
		cache usage:'read-only'
	}
	
}

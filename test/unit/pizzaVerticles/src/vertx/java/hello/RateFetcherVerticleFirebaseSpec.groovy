package pizzaVerticles.src.vertx.java.hello
import org.gmock.GMockTestCase
import org.hibernate.validator.constraints.impl.AssertTrueValidator;

class RateFetcherVerticleFirebaseSpec extends GMockTestCase{
	def tested = new RateFetcherVerticleFirebase()
	def dbfetcher = new dbfetcher()
	
    void test_shouldUpdateRate() {
        def tet = Double.valueOf("123").value
		def mdb = [getOldCurrencyRate: { 0}] as dbfetcher
        play{
            tested.cons = mdb
			assert tested.trigger("123")
        }
    }
    
    void test_shouldntUpdateRate(){
        def tet = Double.valueOf("0")
    	def mdb = [getOldCurrencyRate: { tet}] as dbfetcher
        play{
            tested.cons = mdb
			assert !tested.trigger("0")
        }
    }
    
    
}

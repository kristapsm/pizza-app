package pizzaVerticles.src.vertx.java.hello;

import org.vertx.java.platform.Verticle;
import com.firebase.client.*;

public class RateFetcherVerticleFirebase
    extends Verticle {

    private double currencyRate;

    public dbfetcher cons = new dbfetcher();

    public void start() {

        Firebase myFirebaseRef =
            new Firebase(
                "https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

        myFirebaseRef.addValueEventListener(new ValueEventListener() {

            @Override
            public void onDataChange(DataSnapshot snapshot) {

                if (trigger(snapshot.child("last").getValue().toString())) {
                    Server.eb.publish("btClient", cons.getCurrencyR());
                }
            }

            @Override
            public void onCancelled() {

                // TODO Auto-generated method stub
                System.out.println("The read failed: canceled");
            }
        });

        // myFirebaseRef.addChildEventListener(this);
    }

    public boolean trigger(String data) {

        double newCurrencyRate = Double.parseDouble(data);
        currencyRate = cons.getOldCurrencyRate();
        
        if (newCurrencyRate > 0 && currencyRate != newCurrencyRate) {
            //TODO: It should be refactored. Logging should be a configurable system (like Apache Logger, etc)
            System.out.println("Change bitcoin rate: " + currencyRate + " => " + newCurrencyRate);
            cons.updateCurrencyRate(newCurrencyRate);
            return true;
        } else {
            return false;
        }
    }

    /*
     * protected double calculateCoefficient(double oldCurrencyRate, double newCurrencyRate) {
     * return newCurrencyRate / oldCurrencyRate; }
     */

}

package pizzaVerticles.src.vertx.java.hello;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

public class Server
    extends Verticle {
    public static EventBus eb;
    @Override
    public void start() {

    	HttpServer server = vertx.createHttpServer();
        JsonObject config = new JsonObject().putString("prefix", "/eventbus");
        JsonArray noPermitted = new JsonArray();
        
        
        eb = vertx.eventBus();
        eb.registerHandler("btNotifier", new Handler<Message>() {
            @Override
            public void handle(Message msg) {
                System.out.println("Got message: " + msg.body());
            }
            
        });
        
        vertx.eventBus().registerHandler("imageMaker", new Handler<Message>() {
            @Override
            public void handle(Message msg) {
                if (msg != null) {
                    msg.reply(PizzaImageMaker.generateReply(new JsonArray(msg.body().toString())));
                } else {
                    System.out.println("NYLALFASLDASL");
                }
            }
        });
        
        
        noPermitted.add(new JsonObject());
        vertx.createSockJSServer(server).bridge(config, noPermitted, noPermitted);
        server.listen(8082);    
        
        System.out.println("Server started!");
        
    }
}

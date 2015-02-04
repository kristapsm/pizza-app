package pizzaVerticles.src.vertx.java.hello;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.imageio.ImageIO;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

public class PizzaImageMaker{

    
    public static JsonObject generateReply(JsonArray msg){
        JsonObject reply = new JsonObject();
        reply.putString("text","Check out this cool pizza");
        reply.putString("url", handleImageRequest(msg));
        return reply;        
    }
    

    public static String saveImage(BufferedImage image) {
        String filename =
            "web-app/images/pizza-Images/IMG" + new File("web-app/images/pizza-Images/").list().length
                + ".png";

        try {
            File f = new File(filename);
            f.createNewFile();
            ImageIO.write(image, "png", f);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("There was problem saving image");
        }

        System.out.println("Image saved " + filename);
        return filename.split("pizza-Images/")[1];
    }

    public static String handleImageRequest(JsonArray array) {
        System.out.println("Hello");
        try {
            Image p =
                ImageIO
                    .read(new URL(
                        "http://d1ujpofy5vmb70.cloudfront.net/wp-content/uploads/featured_image/CEPizzaDough_article.jpg"));

            BufferedImage image =
                new BufferedImage(p.getWidth(null), p.getHeight(null),
                    BufferedImage.TYPE_INT_ARGB);
            Graphics g = image.getGraphics();
            g.drawImage(p, 0, 0, 500, 500, null);
            for (Object a : array) {
                if (a != null) {
                    System.out.println(a);
                    JsonObject object = (JsonObject) a;
                    int x = object.getInteger("x");
                    int y = object.getInteger("y");
                    Image i = ImageIO.read(new URL(object.getString("image")));
                    g.drawImage(i, x, y, 80, 80, null);
                }
            }
            return saveImage(image);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

   

}

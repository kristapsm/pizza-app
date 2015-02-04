package pizzaVerticles.src.vertx.java.hello;

import static org.junit.Assert.*;

import java.awt.image.BufferedImage;
import java.io.File;

import javassist.bytecode.annotation.StringMemberValue;

import org.eclipse.jdt.internal.compiler.apt.dispatch.BaseMessagerImpl;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.eventbus.impl.*;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;



public class PizzaImageMakerTest {
    @BeforeClass
    public static void setUpBeforeClass() throws Exception {

    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {

    }

    @Before
    public void setUp() throws Exception {
        System.out.println("Set yp");
    }

    @After
    public void tearDown() throws Exception {

        System.out.println("t down");
    }

    @Test
    public void testSaveImage() {
        BufferedImage image = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
        String targetFilename = "IMG" + new File("web-app/images/pizza-Images/").list().length + ".png";
        //Test if generates same filename
        assertTrue(targetFilename.equals(PizzaImageMaker.saveImage(image)));
        
        //Test if created file was there and was deleted
        assertTrue(new File("web-app/images/pizza-Images/"+targetFilename).delete());
        
    }
    
    @Test
    public void testHandleImageRequest(){
        System.out.println("Test handler request");
        String targetFilename = "IMG" + new File("web-app/images/pizza-Images/").list().length + ".png";
        JsonArray array = new JsonArray();
        JsonObject obj = new JsonObject();
        obj.putString("image","https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQClHUQfxCE3QBav93MB_r2j5zE00Jqn_LwhHrqPWQc6cKZwDFX");
        obj.putNumber("x",50);
        obj.putNumber("y",51);
        array.add(obj);
        assertTrue(PizzaImageMaker.handleImageRequest(array).equals(targetFilename));
        ///assert(;
        

        //Test if created file was there and was deleted
        //assertTrue(new File("web-app/images/pizza-Images/"+targetFilename).delete());
        System.out.println("Done");
    }

    
    @Test
    public void testGenerateReply(){
        JsonArray array = new JsonArray();
        JsonObject obj = new JsonObject();
        obj.putString("image","https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQClHUQfxCE3QBav93MB_r2j5zE00Jqn_LwhHrqPWQc6cKZwDFX");
        obj.putNumber("x",50);
        obj.putNumber("y",51);
        array.add(obj);
        //assert());
        System.out.println((PizzaImageMaker.generateReply(array)));
        
    }
    
}

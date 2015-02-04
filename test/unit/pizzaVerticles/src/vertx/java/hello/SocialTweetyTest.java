package pizzaVerticles.src.vertx.java.hello;


import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Date;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.social.twitter.api.StreamDeleteEvent;
import org.springframework.social.twitter.api.StreamWarningEvent;
import org.springframework.social.twitter.api.Tweet;
import org.vertx.java.core.json.JsonObject;

import pizzaVerticles.src.vertx.java.hello.SocialTweety;

import com.google.gson.JsonArray;


public class SocialTweetyTest {
    private SocialTweety tweety;
    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    
    @BeforeClass
    public static void setUpBeforeClass() throws Exception {

    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {

    }

    @Before
    public void setUp() throws Exception {
        tweety  = new SocialTweety();
        System.setOut(new PrintStream(outContent));
    }

    @After
    public void tearDown() throws Exception {
        System.setOut(null);
    }

    @Test
    public void testOnTweet() {
        
        long id = 123L;
        String text = "some text here with chicken pizza";
        Date d = new Date();
        String fromUser = "Edgarito"; 
        String urlImg = "http://NONE";
        long toUserId = 345L;
        long statusID = 567L;
        String languageCode = "LVA";
        String source = "Canada";
        Tweet t = new Tweet(id,text,d,fromUser,urlImg,toUserId,statusID,languageCode,source);
        tweety.onTweet(t);
        assertTrue(tweety.getWordFrequencyFinder().getWordMap().get("chicken") == 1);
       
        
    }
    
    @Test
    public void testOnWarning(){
        tweety.onWarning(new StreamWarningEvent("someCode", "some message", 0.56));
        assertEquals("StreamWarningEvent someCode some message 0.56\n", outContent.toString());
        outContent.reset();

        tweety.onWarning(new StreamWarningEvent("some Other Code", "some Other message", 0.76));
        assertEquals("StreamWarningEvent some Other Code some Other message 0.76\n", outContent.toString());
    }
    
    @Test
    public void testOnLimit(){
        tweety.onLimit(999);
        assertEquals("There is a limit 999\n", outContent.toString());
    }
    
    @Test
    public void testOnDelete(){
        tweety.onDelete(new StreamDeleteEvent(100, 101));
        assertEquals("Tweet 100 deleted by 101\n", outContent.toString());
    }
    
    @Test
    public void testInitTwitterKeys(){
        
    }
    

}

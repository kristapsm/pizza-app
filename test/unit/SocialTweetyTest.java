

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.Date;
import java.util.Set;

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
        assertEquals(tweety.getWordFrequencyFinder().getWordMap().get("chicken"),new Integer(1));
       
        
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
    public void testInitTwitterKeys() throws IOException{
    	BufferedReader reader = new BufferedReader(new FileReader(new File("twitter.properties")));
    	String accesToken = reader.readLine().split("accessToken=")[1];
    	String accessSecret = reader.readLine().split("accessSecret=")[1];
    	String consumerKey = reader.readLine().split("consumerKey=")[1];
    	String consumerSecret = reader.readLine().split("consumerSecret=")[1];
    	reader.close();
        tweety.initTwitterKeys();
        assertTrue(accesToken.equals(tweety.getAccessToken()));
        assertTrue(accessSecret.equals(tweety.getAccessSecret()));
        assertTrue(consumerKey.equals(tweety.getConsumerKey()));
        assertTrue(consumerSecret.equals(tweety.getConsumerSecret()));
    }
    
    @Test
    public void testStart(){
    	tweety.start();
    	String result = "";
    	Set<String> keys = tweety.getWordFrequencyFinder().getWordMap().keySet();
    	for(String s : keys){
    		assertTrue(keys.contains(s));
    	}
    	//assertEquals(tweety.getFilterStreamParameters().getTrackParameterValue().toString(),result.substring(0, result.length()-1));
    	
    	
    }
    
    
}

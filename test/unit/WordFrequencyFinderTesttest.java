

import static org.junit.Assert.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

import pizzaVerticles.src.vertx.java.hello.WordFrequencyFinder;

public class WordFrequencyFinderTesttest {

    private static String[] keywords = new String[] {"one", "two", "three"};

    private static WordFrequencyFinder finder;

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {

    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {

    }

    @Before
    public void setUp() throws Exception {

        finder = new WordFrequencyFinder(keywords);
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void testNormalizeMessage() {

        assertEquals("Bob", finder.normalizeMessage("@##@%$#^#@&*&(B@o&^%*b"));
        assertEquals("PizzaApp",
            finder.normalizeMessage("@P#i$z%z^&*()a*A{}p(p^-,./?"));
        assertNotEquals("Bobito", "yolito@!#!@$%&*^");
    }

    @Test
    public void testAddWords() {

        Map<String, Integer> words = finder.getWordMap();
        finder.addWords("one small and one big pizza please!");
        assertTrue(words.get("one") == 2);

        finder.addWords("two two three");
        assertTrue(words.get("two") == 2);
        assertTrue(words.get("three") == 1);

        finder
            .addWords("this is text where this metod should find ONE or two words maybe oNe that are in the keywords maybe even ThRee");
        assertTrue(words.get("one") == 4);
        assertTrue(words.get("two") == 3);
        assertTrue(words.get("three") == 2);
    }
    

    @Test
    public void testTotalWordCount() {

        finder.addWords("one two four six seve one yolo");
        assertTrue(finder.getTotalWordCount() == 3);
        
        finder.addWords("THREE four one");
        assertTrue(finder.getTotalWordCount() == 5);
    }
    

    @Test
    public void testSortWords() {

        finder.addWords("One small and onE big pizza please!");
        finder.addWords("TWO two three");
        finder.addWords("some other text about someone else yeah some - oNe");

        assertTrue(finder.sortWords().get("one") == 3);
        assertTrue(finder.sortWords().get("two") == 2);
        assertTrue(finder.sortWords().get("three") == 1);

        assertTrue(finder.sortWords().firstKey() == "one");
        assertTrue(finder.sortWords().lastKey() == "three");
        assertFalse(finder.sortWords().get("two") == 1);
    }

    @Test
    public void testGetIngredientJsonArray() {

        finder.addWords("one two two three three three");
        JsonArray ingredients = finder.getIngredientJsonArray();
        assertTrue(ingredients.toList().size() == 3);

        JsonObject json = new JsonObject();
        json.putValue("name", "three");
        json.putValue("rate", 0.5);
        json.putValue("count", 3);

        assertTrue(json.equals(ingredients.get(0)));

        json = new JsonObject();
        json.putValue("name", "two");
        json.putValue("rate", 0.3333333333333333);
        json.putValue("count", 2);

        assertTrue(json.equals(ingredients.get(1)));

        json = new JsonObject();
        json.putValue("name", "one");
        json.putValue("rate", 0.16666666666666666);
        json.putValue("count", 1);

        assertTrue(json.equals(ingredients.get(2)));

    }
    
   


}

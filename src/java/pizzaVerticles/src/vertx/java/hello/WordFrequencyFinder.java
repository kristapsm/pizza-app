package pizzaVerticles.src.vertx.java.hello;


import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

public class WordFrequencyFinder {

    private String[] mainKeyWords;
    private Map<String, Integer> words;
    private int totalWordCount = 0;

    public WordFrequencyFinder(String[] keywords) {
        this.mainKeyWords = keywords;
        words = new HashMap<String, Integer>();
        for (String string : mainKeyWords) {
            words.put(string, 0);
        }
    }

    public void addWords(String text) {
        text = normalizeMessage(text);
        String[] textWords = text.split(" ");
        for (String word : textWords) {
            if (words.containsKey(word.toLowerCase())) {
                Integer i = words.get(word.toLowerCase()) + 1;
                words.put(word.toLowerCase(), i);
                totalWordCount++;
            }
        }
    }

    public JsonArray getIngredientJsonArray() {
        Map<String,Integer> sorted_map = sortWords();
        JsonArray ingredientList = new JsonArray();
        for (String key : sorted_map.keySet()) {
            double rate;
            rate =
                Double.parseDouble(words.get(key).toString()) / totalWordCount;

            JsonObject ingredient = new JsonObject();
            ingredient.putValue("name", key);
            ingredient.putValue("rate", rate);
            ingredient.putValue("count", words.get(key));
            ingredientList.add(ingredient);
        }
        return ingredientList;
    }

    public TreeMap<String,Integer> sortWords() {
        ValueComparator bvc = new ValueComparator(words);
        TreeMap<String, Integer> sorted_map = new TreeMap<String, Integer>(bvc);
        sorted_map.putAll(words);     
        return sorted_map;
    }

    public String normalizeMessage(String msg) {

        return msg.replaceAll("[^a-zA-Z\\s]", "");
    }

    public int getTotalWordCount(){
        return totalWordCount;
    }
    
    public Map<String,Integer> getWordMap(){
        return words;
    }
}

class ValueComparator
    implements Comparator<String> {

    Map<String, Integer> base;

    public ValueComparator(Map<String, Integer> base) {

        this.base = base;
    }

    // Note: this comparator imposes orderings that are inconsistent with equals.
    public int compare(String a, String b) {
        if (base.get(a) > base.get(b)) {
            return -1;
        } else if (base.get(a) < base.get(b)) {
            return 1;
        } else {
            return a.compareTo(b);
        }
    }
}

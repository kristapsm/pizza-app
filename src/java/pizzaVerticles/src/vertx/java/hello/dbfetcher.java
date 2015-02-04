package pizzaVerticles.src.vertx.java.hello;

import java.sql.*;

public class dbfetcher {

    private double currencyRate;

    private static final String getCurrencyRateSQL =
        "select rate from currency where id = 1";

    private static final String updateCurrencyRateSQL =
        "update currency set rate = ? where id = 1";

    private static final String updatePriceSQL =
        "update pizza set price=round(price * ?, 2)";

    public double getOldCurrencyRate() {
        try (Connection con =
            DriverManager.getConnection("jdbc:h2:mem:devDb", "root", "");
            Statement s = con.createStatement();
            ResultSet rs = s.executeQuery(getCurrencyRateSQL)) {
            while (rs.next()) {
                return rs.getDouble("rate");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
		return 0.0;
    }
    
    protected void setCurrencyRate(double currencyRate) {
        this.currencyRate = currencyRate;
    }

    public double getCurrencyR() {
        return currencyRate;
    }

    protected void updatePrice(double coefficient) {
        try (Connection con =
            DriverManager.getConnection("jdbc:h2:mem:devDb", "root", "");
            PreparedStatement ps = con.prepareStatement(updatePriceSQL)) {
            ps.setDouble(1, coefficient);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Could not update currency rate");
            System.out.println(e.getMessage());
        }

    }

    protected void updateCurrencyRate(double currencyRate) {
        try (Connection con =
            DriverManager.getConnection("jdbc:h2:mem:devDb", "root", "");
            PreparedStatement ps = con.prepareStatement(updateCurrencyRateSQL)) {
            ps.setDouble(1, currencyRate);
            ps.executeUpdate();
        	setCurrencyRate(currencyRate);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

}

/* SimpleApp.java */
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.Dataset;
import static org.apache.spark.sql.functions.col;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class SimpleApp {

    private static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    private static final String MYSQL_CONNECTION_URL = "jdbc:mysql://j7a703.p.ssafy.io:3306/plantgo?allowPublicKeyRetrieval=true&useSSL=false";
    private static final String MYSQL_DBtable = "plant";
    private static final String MYSQL_USERNAME = "plantgo";
    private static final String MYSQL_PWD = "a703pg7";

    public static void main(String[] args) {
        String logFile = "/usr/lib/spark/README.md"; // Should be some file on your system
        SparkSession spark = SparkSession.builder().appName("Simple Application").config("spark.master", "local").getOrCreate();
        //Dataset<String> logData = spark.read().textFile(logFile).cache();

        Properties connectionProperties = new Properties();
        connectionProperties.put("user", MYSQL_USERNAME);
        connectionProperties.put("password", MYSQL_PWD);
        Dataset<Row> jdbcDF2 = spark.read()
                .jdbc(MYSQL_CONNECTION_URL, MYSQL_DBtable, connectionProperties);
        //long numAs = logData.filter(s -> s.contains("a")).count();
        //long numBs = logData.filter(s -> s.contains("b")).count();

        //jdbcDF2.filter(col("kor_name").equals("회색사초")).show();

        spark.stop();
    }
}
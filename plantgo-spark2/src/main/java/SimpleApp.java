/* SimpleApp.java */
import org.apache.spark.sql.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import static org.apache.spark.sql.functions.desc;
import static org.apache.spark.sql.functions.lit;

public class SimpleApp {

    private static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    private static final String MYSQL_CONNECTION_URL = "jdbc:mysql://j7a703.p.ssafy.io:3306/plantgo?allowPublicKeyRetrieval=true&useSSL=false";
    private static final String MYSQL_DBtable = "photocard";
    private static final String MYSQL_USERNAME = "plantgo";
    private static final String MYSQL_PWD = "a703pg7";

    public static void main(String[] args) {
        //Spark세션 및 앱 설정&생성
        SparkSession spark = SparkSession.builder().appName("Simple Application").config("spark.master", "local").getOrCreate();

        //DB 연결 설정
        Properties connectionProperties = new Properties();
        connectionProperties.put("user", MYSQL_USERNAME);
        connectionProperties.put("password", MYSQL_PWD);

        Dataset<Row> photocards = spark.read()
                .jdbc(MYSQL_CONNECTION_URL, MYSQL_DBtable, connectionProperties);

        //MySql 테이블에서 필요없는 칼럼 삭제
        Dataset<Row> collected = photocards.drop("photocard_id","area","latitude","longitude","memo","photo_url","created_at","kor_name");
        //중복되는 row 삭제
        Dataset<Row> dropped = collected.dropDuplicates();


        //회원번호를 기준으로 그룹화하여 데이터 집계, 내림차순으로 정렬, 상위 30개만 가져옴
        RelationalGroupedDataset groupedDataset = dropped.groupBy("user_seq");
        Dataset<Row> computed = groupedDataset.count().sort(desc("count")).limit(30);

        //랭킹을 생성한 시간 기록
        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();
        String time1 = format1.format(time);

        //시간데이터의 default 값을 바탕으로 칼럼 생성 및 count 칼럼 이름 바꿈
        Dataset<Row> finalData = computed.withColumn("insert_time", lit(time1)).withColumnRenamed("count", "plants_collects");

        //userrank 테이블에 랭크데이터를 추가
        finalData.write()
                .mode("append")
                .jdbc(MYSQL_CONNECTION_URL, "userrank", connectionProperties);
        //spark 종료
        spark.stop();
    }
}

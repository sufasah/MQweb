package kartaca.secondsteptask.taskdatabase;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;
import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class KafkaService {
	
	public static final String TOPIC="endpoint-operation-log";
	public static final String BOOTSTRAP_SERVERS="kafka:9093";
	public static final String CLIENT_ID="task-database";
	public static final String GROUP_ID="log-fetch";
	
	public Connection conn=null;
	
	public KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(createKafkaConfiguration());
	
	public KafkaService() {
		consumer.subscribe(Arrays.asList(TOPIC));
	}
	
	public void fetchLogData() throws SQLException{
		try {
			while(true) {
				ConsumerRecords<String, String> records= consumer.poll(Duration.ofMillis(1000));
				
				for(ConsumerRecord<String, String> record: records){
					String json=record.value();
					LogData logData= new ObjectMapper().readValue(json,LogData.class);
					
					PreparedStatement stmt= conn.prepareStatement("insert into logs(method_type,time_delay,timestamp) values (?,?,?)");
					stmt.setString(1, logData.getMethodType());
					stmt.setFloat(2, logData.getTimeDelay());
					stmt.setLong(3, logData.getTimestamp());
					if(stmt.executeUpdate()>0) {
						System.out.println(String.format("Info: LogData inserted database successfully. %s",json));
					}
					else {
						System.out.println("Warning: LogData could not be inserted to database.");
					}
				}
			}
		} catch (JsonProcessingException e) {
			System.out.println("Error: While fetching LogData via kafka the data could not be converted to json.");
		}catch(SQLTimeoutException e) {
			System.out.println("Error: Database insertion timeout occured.");
		}
	}
	
	public static Properties createKafkaConfiguration() {
		Properties props = new Properties();
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,BOOTSTRAP_SERVERS);
		props.put(ConsumerConfig.CLIENT_ID_CONFIG,CLIENT_ID);
		props.put(ConsumerConfig.GROUP_ID_CONFIG,GROUP_ID);
		props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,"org.apache.kafka.common.serialization.StringDeserializer");
		props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,"org.apache.kafka.common.serialization.StringDeserializer");
		return props;
	}
}

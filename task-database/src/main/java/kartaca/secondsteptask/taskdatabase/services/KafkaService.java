package kartaca.secondsteptask.taskdatabase.services;

import java.sql.Connection;
import java.sql.PreparedStatement; 
import java.sql.SQLException;
import java.sql.SQLTimeoutException; 

import org.apache.kafka.clients.consumer.ConsumerConfig; 
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition; 
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kartaca.secondsteptask.taskdatabase.domain.LogData; 


@Service
public class KafkaService {
	
	public static final String BOOTSTRAP_SERVERS="kafka:9093";
	public static final String TOPIC="endpoint-operation-log";
	public static final String CLIEND_ID_PREFIX="task-database-";
	public Connection conn=null;
	
	
	@KafkaListener(
			id = "save-logs",
			clientIdPrefix = CLIEND_ID_PREFIX,
			topicPartitions = @TopicPartition(
					topic = TOPIC,
					partitions = {"0"}),
			properties = {
				ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG+"="+BOOTSTRAP_SERVERS,
				ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG+"="+"org.apache.kafka.common.serialization.StringDeserializer",
				ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG+"="+"org.apache.kafka.common.serialization.StringDeserializer",
				ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG+"="+"false"
			})
	public void saveLogDatas(@Payload String json,@Header(KafkaHeaders.RECEIVED_PARTITION_ID) int partition){
		try {
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
		} catch (JsonProcessingException e) {
			System.out.println("Error: While fetching LogData via kafka the data could not be converted to json.");
		}catch(SQLTimeoutException e) {
			System.out.println("Error: Database insertion timeout occured.");
		}catch(SQLException e) {
			System.out.println("Error-qwereqwereasd");
		}
	}
	
}

package kartaca.secondsteptask.taskapi.services;

import java.util.Properties;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kartaca.secondsteptask.taskapi.domain.LogData;

@Service
public class KafkaService {
	
	public static final String TOPIC="endpoint-operation-log";
	public static final String BOOTSTRAP_SERVERS="kafka:9093";
	public static final String CLIENT_ID="task-rest-api";
	
	private KafkaProducer<String, String> producer;
	
	@Async
	public void sendLogData(LogData data)  {
		try {
			if(producer==null)
				producer=new KafkaProducer<String, String>(createProducerConfiguration());
			
			String json = new ObjectMapper().writeValueAsString(data);
			ProducerRecord<String, String> producerRecord = new ProducerRecord<String, String>(TOPIC,"logkey",json);
			producer.send(producerRecord);
			System.out.println(String.format("Info: LogData sent to kafka. %s",json));
		} catch (JsonProcessingException e) {
			String msg="Error: While sending LogData via Kafka the data could not be converted to json.";
			System.out.println(msg);
		}
	}
	
	public static Properties createProducerConfiguration() {
		Properties props = new Properties();
		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,BOOTSTRAP_SERVERS);
		props.put(ProducerConfig.CLIENT_ID_CONFIG,CLIENT_ID);
		props.put(ProducerConfig.ACKS_CONFIG,"all");
		props.put(ProducerConfig.RETRIES_CONFIG,"0");
		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,"org.apache.kafka.common.serialization.StringSerializer");
		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,"org.apache.kafka.common.serialization.StringSerializer");
		return props;
	}
	
}

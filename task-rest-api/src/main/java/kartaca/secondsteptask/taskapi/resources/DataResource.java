package kartaca.secondsteptask.taskapi.resources;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kartaca.secondsteptask.taskapi.domain.LogData;
import kartaca.secondsteptask.taskapi.exceptions.ApiRequestException;
//import kartaca.secondsteptask.taskapi.services.KafkaService;
import kartaca.secondsteptask.taskapi.services.KafkaService;

@RestController
@RequestMapping("/api/data")
public class DataResource {
	
	private File logFile;
	
	@Autowired
	private KafkaService kafkaService;
	
	@Autowired
	private SimpMessagingTemplate brokerMessagingTemplate;
	
	private void doTask(final String methodType) {
		LogData logData = new LogData(methodType,new Random().nextFloat()*3,System.currentTimeMillis());
		
		try {			
			if(logFile==null) 
				logFile=new File(System.getProperty("user.dir")+"/mylog.txt");
			
			if(!logFile.isFile())
				logFile.createNewFile();
			
			FileWriter logWriter = new FileWriter(logFile,true);
	
			String logMsg= String.format(Locale.ENGLISH,"log: \"%s,%1.2f,%d\"\n",
					logData.getMethodType(),
					logData.getTimeDelay(),
					logData.getTimestamp());
			
			logWriter.append(logMsg);
			logWriter.close();
			
		}catch(IOException e) {
			System.out.println("Log file 'mylog.txt' can not be created or opened.");
		}
		
		try {
			Thread.sleep(Math.round(logData.getTimeDelay()));
		} catch (InterruptedException e) {}
		
		kafkaService.sendLogData(logData);
		
		brokerMessagingTemplate.convertAndSend("/last-logs/dashboard",logData);
		
	}
	private ResponseEntity<Map<String,Object>> successMessage(){
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("httpResponse",HttpStatus.OK);
		result.put("message","LogData is sending to database service.");
		return new ResponseEntity<Map<String,Object>>(result,HttpStatus.OK);
	}
	
	@GetMapping("/get")
	public ResponseEntity<Map<String,Object>> getMethod(){
		
		doTask("GET");
		return successMessage();
	}
	@PostMapping("/post")
	public ResponseEntity<Map<String,Object>> postMethod(@RequestBody @Nullable Object body){
		
		doTask("POST");
		return successMessage();
	}
	@PutMapping("/put")
	public ResponseEntity<Map<String,Object>> putMethod(@RequestBody @Nullable Object body){
		
		doTask("PUT");
		return successMessage();
	}
	@DeleteMapping("/delete")
	public ResponseEntity<Map<String,Object>> deleteMethod(){
		
		doTask("DELETE");
		return successMessage();
	}
	
	
}

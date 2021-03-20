package kartaca.secondsteptask.taskdatabase;

import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import kartaca.secondsteptask.taskdatabase.services.KafkaService;

@SpringBootApplication
public class TaskDatabaseApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(TaskDatabaseApplication.class, args);
	}
	
	@Bean
	public ApplicationRunner runner(KafkaService kafkaService) {
		return args -> {			
			while(true) {
				try {
					kafkaService.conn = DriverManager.getConnection("jdbc:mysql://task-database:3306/kartaca","root",null);
					System.out.println("Info: Database connection successful.");
					break;
				} catch (SQLException e) {
					System.out.println("Error: Database connection failed. Trying to reconnect ...");
					try {
						Thread.sleep(5000);
					} catch (InterruptedException e1) {}
				}
			}
		};
	}

}

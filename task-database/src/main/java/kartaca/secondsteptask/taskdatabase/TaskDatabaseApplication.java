package kartaca.secondsteptask.taskdatabase;

import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class TaskDatabaseApplication {
	
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(TaskDatabaseApplication.class, args);
		KafkaService kafkaService = context.getBean(KafkaService.class);
		while(true) {
			try {
				kafkaService.conn = DriverManager.getConnection("jdbc:mysql://task-database:3306/kartaca","root",null);
				kafkaService.fetchLogData();
			} catch (SQLException e) {
				System.out.println("Error: Database connection failed.");
				try {
					Thread.sleep(5000);
				} catch (InterruptedException e1) {}
			}
		}
	
	}

}

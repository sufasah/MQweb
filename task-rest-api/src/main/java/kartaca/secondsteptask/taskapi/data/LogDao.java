package kartaca.secondsteptask.taskapi.data;

import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

import kartaca.secondsteptask.taskapi.domain.LogData;

@Component
public class LogDao {
	private Connection conn;
	
	public Connection getConnection() throws SQLException{
		while(conn==null) {
			conn= DriverManager.getConnection("jdbc:mysql://task-database:3306/kartaca","root",null);
		}
		return conn;
	}
	
	
	public ArrayList<LogData> getOneHourLogDatas() throws SQLException{
		ArrayList<LogData> logDatas = new ArrayList<LogData>();
		Connection conn = getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from logs where timestamp >= ?");
		stmt.setLong(1, System.currentTimeMillis()-1000*60*60*1);
		ResultSet result = stmt.executeQuery();
		while(result.next()) {
			LogData logData= new LogData(result.getString(2),result.getFloat(3),result.getLong(4));
			logDatas.add(logData);
		}
		return logDatas;
	}
}

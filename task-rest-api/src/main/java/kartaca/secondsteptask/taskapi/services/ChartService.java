package kartaca.secondsteptask.taskapi.services;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kartaca.secondsteptask.taskapi.data.LogDao;
import kartaca.secondsteptask.taskapi.domain.LogData;

@Service
public class ChartService {
	
	@Autowired
	LogDao logsDao;
	
	public List<List<Map<Object, Object>>> getChartInitialData() {
		List<List<Map<Object,Object>>> res = new ArrayList<>();
		
		for(int j=0;j<4;j++) res.add(new ArrayList<>());
		
		try {
			List<LogData> logDatas = logsDao.getOneHourLogDatas();
			Map<Object,Object> point;
			for( LogData logData : logDatas) {
				point = new HashMap<Object, Object>();
				point.put("x",logData.getTimestamp());
				point.put("y",logData.getTimeDelay());
				int type=-1;
				if(logData.getMethodType().equals("GET")) type=0;
				if(logData.getMethodType().equals("POST")) type=1;
				if(logData.getMethodType().equals("PUT")) type=2;
				if(logData.getMethodType().equals("DELETE")) type=3;
				res.get(type).add(point);
				
			}
		} catch (SQLException e) {
			System.out.println("LogsDao database connection failed.");
		}
		
		return res;
	}
	
	
}
package kartaca.secondsteptask.taskapi.domain;

public class LogData {
	private String methodType;
	private float timeDelay;
	private long timestamp;
	
	public LogData(){
		
	}
	
	public LogData(String methodType, float timeDelay, long timestamp) {
		this.methodType = methodType;
		this.timeDelay = timeDelay;
		this.timestamp = timestamp;
	}
	public String getMethodType() {
		return methodType;
	}
	public void setMethodType(String methodType) {
		this.methodType = methodType;
	}
	public float getTimeDelay() {
		return timeDelay;
	}
	public void setTimeDelay(float timeDelay) {
		this.timeDelay = timeDelay;
	}
	public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	
	
}

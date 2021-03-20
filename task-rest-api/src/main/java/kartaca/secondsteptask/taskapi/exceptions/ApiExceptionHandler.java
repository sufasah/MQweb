package kartaca.secondsteptask.taskapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler{
	@ExceptionHandler(value = {ApiRequestException.class})
	public ResponseEntity<Object> handleApiRequestException(ApiRequestException exception){
		final HttpStatus status=HttpStatus.BAD_REQUEST;
		ApiException apiException = new ApiException(status,exception.getMessage());
		return new ResponseEntity<Object>(apiException,status);
	}
	
	@ExceptionHandler(value= {RuntimeException.class})
	public ResponseEntity<Object> handleGeneralException(RuntimeException exception){
		final HttpStatus status = HttpStatus.BAD_REQUEST;
		ApiException apiException = new ApiException(status,"Operation requested can not be done appropriately.");
		return new ResponseEntity<Object>(apiException,status);
	}
	
}

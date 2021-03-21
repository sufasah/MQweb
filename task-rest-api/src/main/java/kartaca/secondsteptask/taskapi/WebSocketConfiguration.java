package kartaca.secondsteptask.taskapi;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new DashboardHandler(), "/dashboard").withSockJS();
	}
	
	class DashboardHandler extends TextWebSocketHandler{
		
		private List<WebSocketSession> sessions = new CopyOnWriteArrayList<WebSocketSession>();
		
		@Override
		public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			sessions.add(session);
		}

		@Override
		protected void handleTextMessage(WebSocketSession session, TextMessage message){
			for(WebSocketSession s : sessions) {
				try {
					s.sendMessage(message);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
			sessions.remove(session);
		}
		
		
	}
}

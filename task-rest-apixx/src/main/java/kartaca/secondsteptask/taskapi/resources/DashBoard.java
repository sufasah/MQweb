package kartaca.secondsteptask.taskapi.resources;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import kartaca.secondsteptask.taskapi.services.ChartService;

@Controller
@RequestMapping("/")
public class DashBoard {
	@Autowired
	private ChartService chartService;
	
    @GetMapping
	public String dsahboardPage(ModelMap model){
		List<List<Map<Object,Object>>> list = chartService.getChartInitialData();
		model.addAttribute("dataPointsList",list);
		return "dashboard";
	}
	
	/*@GetMapping("chart-data")
	public RequestMapping<Object> lastChartData(){
		chartService
	}*/
}

var dataPoints = [
	[],
	[],
	[],
	[],
];
window.onload = function() {
	
	var customToolTipContent=function(color){return '<div style="text-align:center;margin-top:5px;margin-bottom:5px;color:MidnightBlue;">{x}</div><span style="color:'+color+';">{name} : {y}</span>';}
	
	var customHeaderColor="#4B0082";
	var customHeaderFontSize = 24;
	
	
	
	var chart = new CanvasJS.Chart("chartAll", {
		zoomEnabled: true,
		backgroundColor: "#FAFAF5",
		  theme: "light1",
			title: {
				text: "Rest Api Time Delay Per Response",
				fontColor: customHeaderColor,
				fontSize: customHeaderFontSize,
			},
			axisX: {
				title: "Click method types at the top to make them visible or not.",
			    interval: 1,
			    intervalType: "minute",
			
			},
			axisY:{
				title: "Time Delay",
				viewportMinimum: 0.0,
				viewportMaximum: 3.0,
			}, 
			toolTip: {
				shared: true,
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 16,
				fontColor: "dimGrey",
				itemclick : toggleDataSeries
			},
			data: [{ 
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "GET",
				lineColor: "SeaGreen",
				markerColor:"SeaGreen",
				lineThickness: 2,
				markerSize: 5,
				toolTipContent: customToolTipContent("SeaGreen"),
				dataPoints: dataPoints[0],
				
			},
			{				
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "POST" ,
				lineColor: "Gold",
				markerColor:"Gold",
				lineThickness: 2,
				markerSize: 5,
				toolTipContent:'<span style="color:Gold;">{name} : {y}</span>',
				dataPoints: dataPoints[1]
			},
			{				
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "PUT" ,
				lineColor: "CornflowerBlue",
				markerColor:"CornflowerBlue",
				lineThickness: 2,
				markerSize: 5,
				toolTipContent:'<span style="color:CornflowerBlue;">{name} : {y}</span>',
				dataPoints: dataPoints[2]
			},
			{				
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "DELETE" ,
				lineColor: "Crimson",
				markerColor:"Crimson",
				lineThickness: 2,
				markerSize: 5,
				toolTipContent:'<span style="color:Crimson;">{name} : {y}</span>',
				dataPoints: dataPoints[3]
			}]
		});
		
	var chartGet = new CanvasJS.Chart("chartGet", {
			zoomEnabled: false,
			animationEnabled: true,
			animationDuration: 1000,
			backgroundColor: "#FAFAF5",
			  theme: "light1",
				title: {
					text: "Get Method Time Delay Per Response",
					fontColor: customHeaderColor,
					fontSize: customHeaderFontSize,
				},
				axisX: {
				    interval: 1,
				    intervalType: "minute",
				},
				axisY:{
					title: "Time Delay",
					viewportMinimum: 0.0,
					viewportMaximum: 3.0,
				}, 
				toolTip: {
					shared: true,
				},
				legend: {
					verticalAlign: "top",
					fontSize: 16,
					fontColor: "dimGrey",
				},
				data: [{ 
					type: "line",
					lineDashType: "dot",
					xValueType: "dateTime",
					yValueFormatString: "##0.#0 seconds",
					xValueFormatString: "HH:mm:ss",
					showInLegend: true,
					name: "GET",
					lineColor: "SeaGreen",
					markerColor:"SeaGreen",
					lineThickness: 3,
					markerSize: 5,
					toolTipContent: customToolTipContent("SeaGreen"),
					dataPoints: dataPoints[0]
				}]
			});

	var chartPost = new CanvasJS.Chart("chartPost", {
		zoomEnabled: false,
		animationEnabled: true,
		animationDuration: 1000,
		backgroundColor: "#FAFAF5",
		  theme: "light1",
			title: {
				text: "Post Method Time Delay Per Response",
				fontColor: customHeaderColor,
				fontSize: customHeaderFontSize,
			},
			axisX: {
			    interval: 1,
			    intervalType: "minute",
			},
			axisY:{
				title: "Time Delay",
				viewportMinimum: 0.0,
				viewportMaximum: 3.0,
			}, 
			toolTip: {
				shared: true,
			},
			legend: {
				verticalAlign: "top",
				fontSize: 16,
				fontColor: "dimGrey",
			},
			data: [{ 
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "POST",
				lineColor: "Gold",
				markerColor:"Gold",
				lineThickness: 3,
				markerSize: 5,
				toolTipContent: customToolTipContent("Gold"),
				dataPoints: dataPoints[1]
			}]
		});
	
	var chartPut = new CanvasJS.Chart("chartPut", {
		zoomEnabled: false,
		animationEnabled: true,
		animationDuration: 1000,
		backgroundColor: "#FAFAF5",
		  theme: "light1",
			title: {
				text: "Put Method Time Delay Per Response",
				fontColor: customHeaderColor,
				fontSize: customHeaderFontSize,
			},
			axisX: {
			    interval: 1,
			    intervalType: "minute",
			},
			axisY:{
				title: "Time Delay",
				viewportMinimum: 0.0,
				viewportMaximum: 3.0,
			}, 
			toolTip: {
				shared: true,
			},
			legend: {
				verticalAlign: "top",
				fontSize: 16,
				fontColor: "dimGrey",
			},
			data: [{ 
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "PUT",
				lineColor: "CornflowerBlue",
				markerColor:"CornflowerBlue",
				lineThickness: 3,
				markerSize: 5,
				toolTipContent: customToolTipContent("CornflowerBlue"),
				dataPoints: dataPoints[2]
			}]
		});
		
	var chartDelete = new CanvasJS.Chart("chartDelete", {
		zoomEnabled: false,
		animationEnabled: true,
		animationDuration: 1000,
		backgroundColor: "#FAFAF5",
		  theme: "light1",
			title: {
				text: "Delete Method Time Delay Per Response",
				fontColor: customHeaderColor,
				fontSize: customHeaderFontSize,
			},
			axisX: {
			    interval: 1,
			    intervalType: "minute",
			},
			axisY:{
				title: "Time Delay",
				viewportMinimum: 0.0,
				viewportMaximum: 3.0,
			}, 
			toolTip: {
				shared: true,
			},
			legend: {
				verticalAlign: "top",
				fontSize: 16,
				fontColor: "dimGrey",
			},
			data: [{ 
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				name: "DELETE",
				lineColor: "Crimson",
				markerColor:"Crimson",
				lineThickness: 3,
				markerSize: 5,
				toolTipContent: customToolTipContent("Crimson"),
				dataPoints: dataPoints[3]
			}]
		});
	
	renderCharts();
	
	// WEBSOCKET CONNECTION HANDLING
	var webSocket = new SockJS('/dashboard');
	var stompClient = Stomp.over(webSocket);
	
	stompClient.connect({},function(frame){
		stompClient.subscribe("/last-logs/dashboard",function(message){
			var data= JSON.parse(message.body);
			updateChart(data);
		});
	});
	
	
	
	function updateChart(data) {
		
		var type;
		if(data.methodType=="GET") type=0;
		else if(data.methodType=="POST") type=1;
		else if(data.methodType=="PUT") type=2;
		else if(data.methodType=="DELETE") type=3;
		
		
		dataPoints[type].push({
			x: data.timestamp,
			y: data.timeDelay,
		});
		
		var dateNow= data.timestamp;
		var dateMin = dateNow-1000*60*60-1000*60;
		
		var typeText= data.methodType.charAt(0) + data.methodType.slice(1).toLowerCase();
		chart.options.data[type].legendText = " "+typeText+" Method -  " + data.timeDelay.toFixed(2);

		chart.options.axisX.viewportMinimum=dateMin;
		chart.options.axisX.viewportMaximum=dateNow;
		
		chart.render();

		if(type===0){
			chartGet.options.data[0].legendText = " Get Method -  " + data.timeDelay.toFixed(2);
			chartGet.options.axisX.viewportMinimum=dateMin;	
			chartGet.options.axisX.viewportMaximum=dateNow;
			chartGet.render();
		}
		else if(type===1){
			chartPost.options.data[0].legendText = " Post Method -  " + data.timeDelay.toFixed(2);
			chartPost.options.axisX.viewportMinimum=dateMin;
			chartPost.options.axisX.viewportMaximum=dateNow;
			chartPost.render();
		}
		else if(type===2){
			chartPut.options.data[0].legendText = " Put Method -  " + data.timeDelay.toFixed(2);
			chartPut.options.axisX.viewportMinimum=dateMin;
			chartPut.options.axisX.viewportMaximum=dateNow;
			chartPut.render();			
		}
		else if(type===3){
			chartDelete.options.data[0].legendText = " Delete Method -  " + data.timeDelay.toFixed(2);						
			chartDelete.options.axisX.viewportMinimum=dateMin;
			chartDelete.options.axisX.viewportMaximum=dateNow;
			chartDelete.render();
		}
		
		
		
		
	}

	function renderCharts(){
		chart.render();
		chartGet.render();
		chartPost.render();
		chartPut.render();
		chartDelete.render();
	}
	 
	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
	
}
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
		zoomEnabled: false,
		animationEnabled: true,
		animationDuration: 100,
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
			    viewportMinimum: null,
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
				    viewportMinimum: null,
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
			    viewportMinimum: null,
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
			    viewportMinimum: null,
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
				dataPoints: dataPoints[0]
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
			    viewportMinimum: null,
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
				dataPoints: dataPoints[0]
			}]
		});
	
	
	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
	
	
	var webSocket = new SockJS('/dashboard');
	var stompClient = Stomp.over(webSocket);
	
	stompClient.connect({},function(frame){
		stompClient.subscribe("/last-logs/dashboard",function(message){
			console.log("RECEIVED MESSAGE FROM WEBSOCKET -> "+message);
		});
	});
	
	
		 
	var updateInterval = 1000;
	// initial value
	var yValue1 = 2.1; 
	var yValue2 = 1.1;
	var yValue3 = 0.5;
	var yValue4 = 2.6;
	 
	
	var time = new Date;
	
	function updateChart(count) {
		count = count || 1;
		for (var i = 0; i < count; i++) {
			time.setTime(time.getTime()+ updateInterval);
	 
			// adding random value and rounding it to two digits. 
			yValue1 = Math.random()*3;
			yValue2 = Math.random()*3;
			yValue3 = Math.random()*3;
			yValue4 = Math.random()*3;
	
			// pushing the new values
			dataPoints[0].push({
				x: time.getTime(),
				y: yValue1
			});
			dataPoints[1].push({
				x: time.getTime(),
				y: yValue2
			});
			dataPoints[2].push({
				x: time.getTime(),
				y: yValue3
			});
			dataPoints[3].push({
				x: time.getTime(),
				y: yValue4
			});
		}
		
		var date= new Date;
		date.setTime(time.getTime()+updateInterval);
		date.setHours(time.getHours()-1);
				
		chart.options.axisX.viewportMinimum=date;
		chartGet.options.axisX.viewportMinimum=date;
		chartPost.options.axisX.viewportMinimum=date;
		chartPut.options.axisX.viewportMinimum=date;
		chartDelete.options.axisX.viewportMinimum=date;
		
		date = new Date;
		chart.options.axisX.viewportMaximum=date;
		chartGet.options.axisX.viewportMaximum=date;
		chartPost.options.axisX.viewportMaximum=date;
		chartPut.options.axisX.viewportMaximum=date;
		chartDelete.options.axisX.viewportMaximum=date;
		
		chart.options.data[0].legendText = " Get Method -  " + yValue1.toPrecision(2);
		chart.options.data[1].legendText = " Post Method -  " + yValue2.toPrecision(2); 
		chart.options.data[2].legendText = " Put Method -  " + yValue3.toPrecision(2);
		chart.options.data[3].legendText = " Delete Method -  " + yValue4.toPrecision(2); 
		
		chartGet.options.data[0].legendText = " Get Method -  " + yValue1.toPrecision(2);
		chartPost.options.data[0].legendText = " Post Method -  " + yValue1.toPrecision(2);
		chartPut.options.data[0].legendText = " Put Method -  " + yValue1.toPrecision(2);
		chartDelete.options.data[0].legendText = " Delete Method -  " + yValue1.toPrecision(2);
		chart.render();
		chartGet.render();
		chartPost.render();
		chartPut.render();
		chartDelete.render();
	}
	 
	setInterval(function(){updateChart()}, updateInterval);
	
	
}
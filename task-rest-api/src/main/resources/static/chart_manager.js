var dataPoints = [
	[],
	[],
	[],
	[],
];
var intervalDate = Date.now();
window.onload = function() {
	
	var customToolTipContent=function(color){return '<div style="text-align:center;margin-top:5px;margin-bottom:5px;color:MidnightBlue;">{x}</div><span style="color:'+color+';">{name} : {y}</span>';}
	
	var customHeaderColor="#4B0082";
	var customHeaderFontSize = 24;
	
	var initDateMin = Date.now()-1000*60*60-1000*30;
	
	var chart = new CanvasJS.Chart("chartAll", {
		backgroundColor: "#FAFAF5",
		animationEnabled:true,
		animationDuration: 1000,
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
				viewportMinimum: initDateMin,
				viewportMaximum: getDateMaxForAll(),
			},
			axisY:{
				title: "Time Delay",
				viewportMinimum: 0.0,
				viewportMaximum: 3.0,
			}, 
			toolTip: {
				shared: true,
				contentFormatter: function(e){
					var x= e.entries[0].dataPoint.x;
					x=new Date(x);
					x=getHHmmss(x);
					var res= '<div style="text-align:center;margin-top:5px;margin-bottom:5px;color:MidnightBlue;">'+x+'</div>';
					e.entries.map(entry =>{
						var color;
						if(entry.dataSeries.name=="GET") color="SeaGreen";
						else if(entry.dataSeries.name=="POST") color="Gold";
						else if(entry.dataSeries.name=="PUT") color="CornflowerBlue";
						else color="Crimson";
						res+='<div style="margin:1px;height:20px;"><span style="color:'+color+';">'+capitalize(entry.dataSeries.name)+' : '+entry.dataPoint.y.toFixed(2)+' seconds</span></div>';
					});
					return res;
				},
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
				nullDataLineDashType:  "dot",
				connectNullData: true,
				markerSize: 5,
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
				connectNullData: true,
				nullDataLineDashType:  "dot",
				lineThickness: 2,
				markerSize: 5,
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
				nullDataLineDashType:  "dot",
				connectNullData: true,
				lineThickness: 2,
				markerSize: 5,
				dataPoints: dataPoints[2]
			},
			{				
				type: "line",
				lineDashType: "dot",
				xValueType: "dateTime",
				yValueFormatString: "##0.#0 seconds",
				xValueFormatString: "HH:mm:ss",
				showInLegend: true,
				nullDataLineDashType:  "dot",
				name: "DELETE" ,
				lineColor: "Crimson",
				markerColor:"Crimson",
				connectNullData: true,
				lineThickness: 2,
				markerSize: 5,
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
					viewportMinimum: initDateMin,
					viewportMaximum: getDateMax(0),
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
					nullDataLineDashType:  "dot",
					connectNullData: true,
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
				viewportMinimum: initDateMin,
				viewportMaximum: getDateMax(1),
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
				nullDataLineDashType:  "dot",
				lineColor: "Gold",
				connectNullData: true,
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
				viewportMinimum: initDateMin,
				viewportMaximum: getDateMax(2),
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
				nullDataLineDashType:  "dot",
				connectNullData: true,
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
				viewportMinimum: initDateMin,
				viewportMaximum: getDateMax(3),
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
				connectNullData: true,
				markerColor:"Crimson",
				nullDataLineDashType:  "dot",
				lineThickness: 3,
				markerSize: 5,
				toolTipContent: customToolTipContent("Crimson"),
				dataPoints: dataPoints[3]
			}]
		});
	
	renderCharts();
	
	var queue=[];
	
	// WEBSOCKET CONNECTION HANDLING
	function connectBroker(){
		var webSocket = new SockJS('/dashboard');
		var stompClient = Stomp.over(webSocket);
	
		stompClient.connect({},function(frame){
			stompClient.subscribe("/last-logs/dashboard",function(message){
				var data= JSON.parse(message.body);
				queue.push(data);
			});
		},function(error){
			console.log('STOMP: ' + error);
		    setTimeout(connectBroker, 5000);
		    console.log('STOMP: Reconecting in 5 seconds');
		});
	}
	connectBroker();
	
	
	var intervalPeriod=1000;
	
	setInterval(function(){
		intervalDate=Date.now();
		var datas=[];
		while(queue.length>0 && queue[0].timestamp<=intervalDate){
			datas.push(queue.shift());
		}
		if(datas.length==0) updateChart([{methodType:"DELETE",timeDelay:null,timestamp:intervalDate}]);
		else updateChart(datas);
		
	},intervalPeriod);
	
	setInterval(function(){
		var dateLast=Date.now()-1000*60*60-1000*30;
		for(var i =0;i<4;i++){
			var points = dataPoints[i];
			while(points.length>0 && points[0].x<=dateLast)
				dataPoints[i].shift();
		}
	},1000*60*2);
	
	
	function updateChart(datas) {
		if(datas.length==1 && datas[0].timeDelay==null){
			for(var i=0;i<4;i++)
				dataPoints[i].push({
					x: datas[0].timestamp,
					y: null,
				});
			var dateNow= datas[0].timestamp;
			var dateMin = dateNow-1000*60*60-1000*60;
			
			chart.options.axisX.viewportMinimum=dateMin;
			chart.options.axisX.viewportMaximum=dateNow;
			chartGet.options.axisX.viewportMinimum=dateMin;
			chartGet.options.axisX.viewportMaximum=dateNow;
			chartPost.options.axisX.viewportMinimum=dateMin;
			chartPost.options.axisX.viewportMaximum=dateNow;
			chartPut.options.axisX.viewportMinimum=dateMin;
			chartPut.options.axisX.viewportMaximum=dateNow;
			chartDelete.options.axisX.viewportMinimum=dateMin;
			chartDelete.options.axisX.viewportMaximum=dateNow;
			renderCharts();
			return;
		}
		datas.map(data=>{
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
			
			var typeText= capitalize(data.methodType);
			chart.options.axisX.viewportMinimum=dateMin;
			chart.options.axisX.viewportMaximum=dateNow;
			chart.options.data[type].legendText = " "+typeText+" Method -  " + data.timeDelay.toFixed(2);
	
			if(type===0){
				chartGet.options.data[0].legendText = " Get Method -  " + data.timeDelay.toFixed(2);
				chartGet.options.axisX.viewportMinimum=dateMin;	
				chartGet.options.axisX.viewportMaximum=dateNow;
			}
			else if(type===1){
				chartPost.options.data[0].legendText = " Post Method -  " + data.timeDelay.toFixed(2);
				chartPost.options.axisX.viewportMinimum=dateMin;
				chartPost.options.axisX.viewportMaximum=dateNow;
			}
			else if(type===2){
				chartPut.options.data[0].legendText = " Put Method -  " + data.timeDelay.toFixed(2);
				chartPut.options.axisX.viewportMinimum=dateMin;
				chartPut.options.axisX.viewportMaximum=dateNow;
			}
			else if(type===3){
				chartDelete.options.data[0].legendText = " Delete Method -  " + data.timeDelay.toFixed(2);						
				chartDelete.options.axisX.viewportMinimum=dateMin;
				chartDelete.options.axisX.viewportMaximum=dateNow;
			}
		});
		renderCharts();
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
	
	function getDateMax(index){
		var arr = dataPoints[index];
		if(arr.length>0){
			arr=arr[arr.length-1];
			return arr.x;
		}
		return Date.now();
	}
	function getDateMaxForAll(){
		var res=-1;
		dataPoints.map(i=>{
			if(i.length>0)
				res= Math.max(res,i[i.length-1].x);
		});
		if(res==-1)
			return Date.now();
		return res;
	}
	
	function capitalize(str){
		return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();
	}
	
	function getHHmmss(date){
		var z="0";
		return (z+date.getHours()).slice(-2)+':'+(z+date.getMinutes()).slice(-2)+':'+(z+date.getSeconds()).slice(-2);
	}
}
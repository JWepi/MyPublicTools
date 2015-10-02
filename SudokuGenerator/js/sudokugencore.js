
var working = false;

var rows = [[1,2,3,10,11,12,19,20,21],
			[4,5,6,13,14,15,22,23,24],
			[7,8,9,16,17,18,25,26,27],
			[28,29,30,37,38,39,46,47,48],
			[31,32,33,40,41,42,49,50,51],
			[34,35,36,43,44,45,52,53,54],
			[55,56,57,64,65,66,73,74,75],
			[58,59,60,67,68,69,76,77,78],
			[61,62,63,70,71,72,79,80,81]];
			
var columns = [[1,4,7,28,31,34,55,58,61],
			[2,5,8,29,32,35,56,59,62],
			[3,6,9,30,33,36,57,60,63],
			[10,13,16,37,40,43,64,67,70],
			[11,14,17,38,41,44,65,68,71],
			[12,15,18,39,42,45,66,69,72],
			[19,22,25,46,49,52,73,76,79],
			[20,23,26,47,50,53,74,77,80],
			[21,24,27,48,51,54,75,78,81]];

var basicBox = [1,2,3,4,5,6,7,8,9];

var basicGrid = [basicBox, basicBox, basicBox, basicBox, basicBox, basicBox, basicBox, basicBox, basicBox];
			
var emptyGrid = [[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]],
				[[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9],
					[1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9]]];
			
var currentGrid = [];
			
var getEmptyGrid = function(){
	var gridToRet = [];
	for (var i = 0; i < 9; i++)
	{
		gridToRet.push([]);
		for (var j = 0; j < 9; j++)
		{
			gridToRet[i].push([1,2,3,4,5,6,7,8,9]);
		}
	}
	return (gridToRet);
}
			
var generateGrid = function(){
	var testmode = 100000;
	var normalmode = 1000000;
	var brutalmode = 10000000;
	var hardcodemode = 100000000;
	var laggmode = 1000000000;
	var nightmode = 10000000000;
	
	var maxloop = testmode;
	var checker = maxloop / 100;
	var displayer = maxloop / 10;
	
	if (!working)
	{
		working = true;
		$("#progress").text("Calculating ...");
		
		var myloop = 0;
		var goodgrid = false;
		
		while (goodgrid == false && myloop < maxloop){
			goodgrid = true;
			myloop++;
			if (myloop % checker == 0){
				console.log((myloop / maxloop * 100) + "%");
				$("#progress").text((myloop / maxloop * 100) + "%");
			}
			if (myloop % displayer == 0){
				console.log("Displaying, probably failed : " + currentGrid);
				displayGridCurrent(true);
			}
			
			fillCurrentGrid();
			
			var j = 0;
			$.each(columns[0], function(index, value){
				j++;
				for (var i = 1; i < 10; i++)
				{
					if ($.inArray(i, getValuesAtPosesCurrent(getRowFromPosition(value))) == -1)
					{
						goodgrid = false;
						return false;
					}
				}
			});
		}
		
		if (goodgrid != true)
		{
			displayGridCurrent(true);
			console.log("FAILED !");
		}
		else
		{
			displayGridCurrent();
		}
		
		$("#progress").text("Not calculating for now");
		working = false;
	}
};

var fillCurrentGrid = function()
{
	var keepLooping = true;
	currentGrid = getEmptyGrid();
	possiblePoses = [];
	for (var i = 1; i < 82; i++)
	{
		possiblePoses.push(i);
	}

	while (possiblePoses.length > 0 && keepLooping)
	{		
		var posToSet = checkIfOneOptionCurrent();
		var valatpos = 0;
		
		if (posToSet != 0)
		{
			valatpos = getValAtPosCurrent(posToSet)[0];
		}
		else
		{
			var randPos = Math.floor(Math.random() * possiblePoses.length);
			posToSet = possiblePoses[randPos];
			possiblePoses.splice(randPos, 1);
			
			var randVal = Math.floor(Math.random() * getValAtPosCurrent(posToSet).length);
			valatpos = getValAtPosCurrent(posToSet)[randVal];
		}
		
		if (valatpos == undefined)
		{
			keepLooping = false
		}
		else
		{
			setValAtPosCurrent(valatpos, posToSet);
			
			removeValFromRowAtPosCurrent(valatpos, posToSet);
			removeValFromColAtPosCurrent(valatpos, posToSet);
			removeValFromBoxAtPosCurrent(valatpos, posToSet);
		}
	}
};

var shuffleArray = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var checkIfOneOptionCurrent = function(){
	return (checkIfOneOption(currentGrid));
};

var checkIfOneOption = function(grid){
	var toret = 0;
	for (var i = 0; i < 9; i++)
	{
		for (var j = 0; j < 9; j++)
		{
			if (grid[i][j].length == 1)
				toret = i * 9 + j + 1;
		}
	}
	return(toret);
};

var getValuesAtPosesCurrent = function(gridPoses){
	return (getValuesAtPoses(gridPoses, currentGrid))
};

var getValuesAtPoses = function(gridPoses, grid){
	var posesToRet = [];
	$.each(gridPoses, function(index, value){
		posesToRet.push(getValAtPos(value, grid));
	});
	return(posesToRet);
};

var removeValFromRowAtPosCurrent = function(valtormv, gridPos){
	removeValFromRowAtPos(valtormv, gridPos, currentGrid);
};

var removeValFromRowAtPos = function(valtormv, gridPos, grid){
	var row = getRowFromPosition(gridPos);
	$.each(row, function(index, value){
		rmvValFromArrayAtPos(valtormv, value, grid);
	});
};

var removeValFromColAtPosCurrent = function(valtormv, gridPos){
	removeValFromColAtPos(valtormv, gridPos, currentGrid);
};

var removeValFromColAtPos = function(valtormv, gridPos, grid){
	var row = getColumnFromPosition(gridPos);
	$.each(row, function(index, value){
		rmvValFromArrayAtPos(valtormv, value, grid);
	});
};

var removeValFromBoxAtPosCurrent = function(valtormv, gridPos){
	removeValFromBoxAtPos(valtormv, gridPos, currentGrid);
};

var removeValFromBoxAtPos = function(valtormv, gridPos, grid){
	
	var startingPos = gridPos - ((gridPos - 1) % 9);
	
	for (var pos = startingPos; pos < startingPos + 9; pos++){
		rmvValFromArrayAtPos(valtormv, pos, grid);
	}
};

var rmvValFromArrayAtPos = function(value, gridPos, grid){
	var arrayAtPos = getValAtPos(gridPos, grid);
	
	if (arrayAtPos.length > 0)
	{
		var index = arrayAtPos.indexOf(value);
		if (index > -1){
			arrayAtPos.splice(index, 1);
			if (arrayAtPos == undefined || arrayAtPos.length == 0)
			{
				setValAtPos(0, gridPos, grid);
			}
			else
			{
				setValAtPos(arrayAtPos, gridPos, grid);
			}
		}
	}
};

var setValAtPosCurrent = function(value, gridPos){
	setValAtPos(value, gridPos, currentGrid);
};

var setValAtPos = function(value, gridPos, grid){
	gridPos = gridPos - 1;
	grid[Math.floor(gridPos / 9)][(gridPos) % 9] = value;
	return(grid);
};

var getValAtPosCurrent = function(gridPos){
	return(getValAtPos(gridPos, currentGrid));
};

var getValAtPos = function(gridPos, grid){
	gridPos = gridPos - 1;
	var valtoret = grid[Math.floor(gridPos / 9)][(gridPos) % 9];
	if (valtoret == undefined)
		valtoret = false;
	return(valtoret);
};

var getRowFromPosition = function(position)
{
	rowtoret = [];
	$.each(rows, function(index, value){
		if ($.inArray(position, value) > -1)
		{
			rowtoret = value;
			return false;
		}
	});	
	return(rowtoret);
};

var getColumnFromPosition = function(position)
{
	columntoret = [];
	$.each(columns, function(index, value){
		if ($.inArray(position, value) > -1)
		{
			columntoret = value;
			return false;
		}
	});	
	return(columntoret);
};

var posToString = function(postoshow)
{
	postoshow = postoshow - 1;
	return ("["+(Math.floor(postoshow / 9) + 1)+"]["+((postoshow) % 9 + 1)+"]");
}

var displayGridCurrent = function(failed)
{
	displayGrid(currentGrid, failed);
}

var displayGrid = function(sudokuGrid, failed)
{
	var htmltoinsert = "";
	
	htmltoinsert += "<div class='bigbox bordered1 "+(failed?"failed":"")+"'>";
	$.each(sudokuGrid, function(index, value){
		if (index % 3 == 0 && index > 0)
			htmltoinsert += "<br/>";
		htmltoinsert += "<div class='box bordered1'>";
		$.each(value, function(subindex, subvalue){
			if (subindex % 3 == 0 && subindex > 0)
				htmltoinsert += "<br />";
			if (subvalue == undefined || subvalue.length > 0)
				subvalue = '*';
			htmltoinsert += "<div class='square bordered1'>"+subvalue+"</div>";
		});
		htmltoinsert += "</div>";
	});
	htmltoinsert += "</div><br /><br /><br />";
	
	$(".core").prepend(htmltoinsert);
};
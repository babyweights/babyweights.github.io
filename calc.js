/*

good/bad/maakav ranges for increases
visual rep of ranges and child's location
(nursing vs. formula vs. combo)

website vs. mobile app

shows עלייה vs ירידה


*/

//=============================================================================

// Initialize variables
var numDays,
	weight1Grams,
	weight2Grams,
	weightChangeGrams,
	averageDailyGrams,
	averageWeeklyGrams,
	averageMonthlyGrams;

window.onload = function() {

	//document.getElementById("clear-button").click();
	
	//document.getElementById("weight1-error").innerHTML = "hi";
		
}
/*
$(function() {
								$('input[name="dates"]').daterangepicker({
								"showDropdowns": true,
								"autoApply": true,
								"locale": {
									"format": "DD/MM/YYYY",
									"separator": " עד ",
									"sapplyLabel": "Apply",
									"cancelLabel": "Cancel",
									"fromLabel": "From",
									"toLabel": "To",
									"customRangeLabel": "Custom",
									"weekLabel": "W",
									"daysOfWeek": [
										"א",
										"ב",
										"ג",
										"ד",
										"ה",
										"ו",
										"ש"
									],
									"monthNames": [
										"ינואר",
										"פברואר",
										"מרץ",
										"אפריל",
										"מאי",
										"יוני",
										"יולי",
										"אוגוסט",
										"ספטמבר",
										"אוקטובר",
										"נובמבר",
										"דצמבר"
									],
									"firstDay": 0,
									cancelLabel: 'מחק'
								},
								"alwaysShowCalendars": true,
								//"startDate": "01/01/2018",
								//"endDate": "02/02/2018",
								"maxDate": new Date(),
								"opens": "left"
							}, function(start, end, label) {
							  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
							  numDays = Math.floor((end - start) / (1000*60*60*24));
							  document.getElementById("num-days").innerHTML = numDays;
							  calculateValues();
							});
						});
*/
//=============================================================================
	/*	
$(function() {
	$('input[name="dates"]').daterangepicker({
		"showDropdowns": true,
		"autoApply": true,
		"locale": {
			"format": "DD/MM/YYYY",
			"separator": " עד ",
			"sapplyLabel": "Apply",
			"cancelLabel": "Cancel",
			"fromLabel": "From",
			"toLabel": "To",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": [
				"א",
				"ב",
				"ג",
				"ד",
				"ה",
				"ו",
				"ש"
			],
			"monthNames": [
				"ינואר",
				"פברואר",
				"מרץ",
				"אפריל",
				"מאי",
				"יוני",
				"יולי",
				"אוגוסט",
				"ספטמבר",
				"אוקטובר",
				"נובמבר",
				"דצמבר"
			],
			"firstDay": 0,
			cancelLabel: 'מחק'
		},
		"alwaysShowCalendars": true,
		//"startDate": "01/01/2018",
		//"endDate": "02/02/2018",
		"maxDate": new Date(),
		"opens": "left"
	}, function(start, end, label) {
	  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	  numDays = Math.floor((end - start) / (1000*60*60*24));
	  document.getElementById("num-days").innerHTML = numDays;
	  calculateValues();
	});
});
		*/
//=============================================================================

// Change in weight 1 units or weight 2 units
function adjustWeightInputUnits() {
	calculateValues();
}

//=============================================================================

// Change in weight1 number input
function weightInputChange() {
	
	// Weight 1
	var weight1 = document.getElementById("weight1-input").value;
	if (weight1 == "") {
		document.getElementById("weight1-error").innerHTML = "";
	}
	else {
		if (isNaN(weight1) || weight1 <= 0) {
			document.getElementById("weight1-error").innerHTML = "שגיעה";
			clearWeightDisplays();
		}
		else {
			document.getElementById("weight1-error").innerHTML = "";
			//document.getElementById("testing").innerHTML = "weight1 = " + weight1;
		}
	}
	
	// Weight 2
	var weight2 = document.getElementById("weight2-input").value;
	if (weight2 == "") {
		document.getElementById("weight2-error").innerHTML = "";
	}
	else {
		if (isNaN(weight2) || weight2 <= 0) {
			document.getElementById("weight2-error").innerHTML = "שגיעה";
			clearWeightDisplays();
		}
		else {
			document.getElementById("weight2-error").innerHTML = "";
			//document.getElementById("testing").innerHTML = "weight2 = " + weight2;
		}
	}
	
	calculateValues();
}

//=============================================================================

function roundToThree(num) {    
    return +(Math.round(num + "e+3")  + "e-3");
}

function numberWithCommas(x) {
	var neg = false;
	if (x < 0) {
		neg = true;
		x = -x;
	}
	

	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	if (!neg) {
		return(parts.join("."));
	}
	else {
		return(parts.join(".") + "-");
	}
}

//=============================================================================

function clearDateDisplays() {
	numDays = 0;
	document.getElementById("num-days").innerHTML = "";
	clearAveragesDisplays();
}

function clearWeightDisplays() {
	weight1Grams = 0;
	weight2Grams = 0;
	weightChangeGrams = 0;
	document.getElementById("weight-change").innerHTML = "";
	clearAveragesDisplays();
}

function clearAveragesDisplays() {
	averageDailyGrams = 0;
	averageWeeklyGrams = 0;
	averageMonthlyGrams = 0;	
	document.getElementById("daily-average").innerHTML = "";
	document.getElementById("weekly-average").innerHTML = "";
	document.getElementById("monthly-average").innerHTML = "";
}

//=============================================================================

function calculateValues() {

	// Load weights
	var weight1Grams = document.getElementById("weight1-input").value;
	var weight2Grams = document.getElementById("weight2-input").value;

	var weightsOK = !isNaN(weight1Grams) && !isNaN(weight2Grams) && weight1Grams > 0 && weight2Grams > 0;
	var daysOK = !isNaN(numDays) && numDays > 0;
	
	if (!weightsOK) {
		clearWeightDisplays();
	}	
	else {	// weightsOK
		// Convert weights from kg to g if relevant:
		if (document.getElementById("weight1-units").value == "kg") {
			weight1Grams = 1000*weight1Grams;
		}
		if (document.getElementById("weight2-units").value == "kg") {
			weight2Grams = 1000*weight2Grams;
		}

		weightChangeGrams = weight2Grams - weight1Grams;
		var weightChangeMessage = numberWithCommas(roundToThree(weightChangeGrams)) + " ג' = " + numberWithCommas(roundToThree(weightChangeGrams/1000)) + ' ק"ג';
		if (weightChangeGrams == 0) {
			weightChangeMessage += " (אין שינוי)";
		}
		else if (weightChangeGrams > 0) {
			weightChangeMessage += ' <span style="color: green">(עלייה)</span>';
		}
		else {
			weightChangeMessage += ' <span style="color: red">(ירידה)</span>';
		}
		
		document.getElementById("weight-change").innerHTML = weightChangeMessage;
	}
	
	if (!daysOK){
		clearDateDisplays();
	}
	
	if (daysOK && weightsOK) {
			
		// Compute and display weight change averages
		// Compute daily, weekly and monthly averages
		averageDailyGrams = weightChangeGrams / numDays;
		averageWeeklyGrams = 7 * weightChangeGrams / numDays;
		averageMonthlyGrams = 30.4167 * weightChangeGrams / numDays;
		
		// Display averages
		document.getElementById("daily-average").innerHTML = numberWithCommas(roundToThree(averageDailyGrams)) + " ג' = " + numberWithCommas(roundToThree(averageDailyGrams/1000)) + ' ק"ג';
		document.getElementById("weekly-average").innerHTML = numberWithCommas(roundToThree(averageWeeklyGrams)) + " ג' = " + numberWithCommas(roundToThree(averageWeeklyGrams/1000)) + ' ק"ג';
		document.getElementById("monthly-average").innerHTML = numberWithCommas(roundToThree(averageMonthlyGrams)) + " ג' = " + numberWithCommas(roundToThree(averageMonthlyGrams/1000)) + ' ק"ג';
	}
}

/**
 * @properties={typeid:24,uuid:"DD36DB11-E855-4AD4-8CFF-87F39B457EE2"}
 */
function loadPolarCategoryChart() {
    var query = "SELECT category, SUM(cost) FROM assets GROUP BY category";
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    
    var labelsArray = [];
    var dataArray = [];
    
    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1)); 
        dataArray.push(dataset.getValue(i, 2)); 
    }

    var chartPackage = {
        type: 'polarArea', 
        data: {
            labels: labelsArray,
            datasets: [{
            	label: 'Budget ($)',
                data: dataArray,
                backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
            }]
        }
    };

    var options = {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
            title: { display: true, text: 'Budget Distribution by Category' }
        }
    };

    if (elements.chart_polar) {
        elements.chart_polar.setData(chartPackage);
        elements.chart_polar.setOptions(options);
    }
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1B5DA30D-19AC-4A5F-8351-2A9D08550903"}
 */
function onShow(firstShow, event) {
	loadPolarCategoryChart();
}

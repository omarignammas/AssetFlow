
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"947D0C8C-68BF-427A-B9D0-F591C64121EB"}
 * @override
 */
function openAddModal(event) {
	forms.sub_addAssets.prepareNewRecord();
    var win = application.createWindow('win_add_asset', JSWindow.MODAL_DIALOG);
    win.title = 'Add Asset';
    win.setSize(600, 400);
    win.resizable = false;
    win.show(forms.sub_addAssets);
}



/**
 * TODO generated, please specify type and doc for the params
 * @param foundsetindex
 * @param columnindex
 * @param record
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"45D2BBB1-94A7-434A-9102-768CB1B2A118"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
    if (!record) return;

    var col = elements.datagrid_1.getColumn(columnindex);

    if (col.id == 'assetDetail_col') {
        forms.sub_assetDetails.foundset.loadRecords(record.asset_uuid);

        var win = application.createWindow('win_asset_details', JSWindow.MODAL_DIALOG);
        win.title = 'Asset Details';
        win.setSize(400, 250);
        win.resizable = false;
        win.show(forms.sub_assetDetails);
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"FE03DBDC-34E1-4906-8179-899C3698F54A"}
 */
function loadStatusChart(firstShow, event) {
    var query = "SELECT status, COUNT(*) FROM assets GROUP BY status ORDER BY status";
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);

    var labelsArray = [];
    var dataArray = [];

    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1));
        dataArray.push(1 * dataset.getValue(i, 2));
    }

    var chartPackage = {
        type: 'doughnut',
        data: {
            labels: labelsArray,
            datasets: [{
                data: dataArray,
                backgroundColor: ['#2ecc71', '#3498db', '#e67e22', '#95a5a6'],
                hoverOffset: 4
            }]
        }
    };

    if (elements.chart_status) {
        elements.chart_status.setData(chartPackage);
        elements.chart_status.setOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
                title: { display: true, text: 'Total Assets by Status' }
            }
        });
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"77922765-4AF8-467A-A039-D404A285809C"}
 */
function loadCostChart(firstShow, event) {
    var query = "SELECT type, SUM(cost) FROM assets GROUP BY type ORDER BY type";
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);

    var labelsArray = [];
    var dataArray = [];

    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1));
        dataArray.push(1 * dataset.getValue(i, 2));
    }

    var chartPackage = {
        type: 'bar',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Total Cost ($)',
                data: dataArray,
                backgroundColor: ['#3498db', '#e74c3c', '#9b59b6', '#f1c40f', '#2ecc71'],
                borderWidth: 1
            }]
        }
    };

    if (elements.chart_cost) {
        elements.chart_cost.setData(chartPackage);
        elements.chart_cost.setOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Total Cost by Asset Type' }
            },
            scales: { y: { beginAtZero: true } }
        });
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"35834F1E-F181-4CE2-A595-D48B66D73FBB"}
 * @override
 */
function onShow(firstShow, event) {
    loadStatusChart(firstShow, event);
    loadCostChart(firstShow, event);
}
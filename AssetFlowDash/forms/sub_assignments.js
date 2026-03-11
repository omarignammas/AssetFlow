
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"866203A6-EDFA-4120-A670-C57BA7B35F1F"}
 * @override
 */
function openAddModal(event) {
	forms.sub_addassignments.prepareNewRecord();
    var win = application.createWindow('win_add_assignments', JSWindow.MODAL_DIALOG);
    win.title = 'Assign Asset to Employee';
    win.setSize(500, 400);
    win.resizable = false;
    win.show(forms.sub_addassignments);
}



/**
 * TODO generated, please specify type and doc for the params
 * @param foundsetindex
 * @param columnindex
 * @param record
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"AD1643F9-F97E-41F9-AA72-71D844BD4D5C"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
    if (!record) return;

    var col = elements.datagrid_10.getColumn(columnindex);

    if (col.id == 'delete_assignement') {
        var empName   = record.assignments_to_employees
            ? record.assignments_to_employees.name : 'Unknown Employee';
        var assetName = record.assignments_to_assets
            ? record.assignments_to_assets.name : 'Unknown Asset';

        deleteRecord(record, empName + ' -> ' + assetName);
    }
}



/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"F5966269-55EF-4FE6-B9E8-C95251748299"}
 */
function loadAssignmentsByCategory(firstShow, event) {
    var query = "SELECT assets.category, COUNT(*) " +
                "FROM assignments " +
                "JOIN assets ON assignments.asset_id = assets.asset_uuid " +
                "WHERE assignments.returned_date IS NULL " +
                "GROUP BY assets.category " +
                "ORDER BY COUNT(*) DESC";

    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);

    var labelsArray = [];
    var dataArray = [];

    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1));
        dataArray.push(1 * dataset.getValue(i, 2));
    }

    if (elements.chart_assignments) {
        elements.chart_assignments.setData({
            type: 'pie',
            data: {
                labels: labelsArray,
                datasets: [{
                    data: dataArray,
                    backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'],
                    hoverOffset: 4
                }]
            }
        });
        elements.chart_assignments.setOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
                title: { display: true, text: 'Active Assignments by Category' }
            }
        });
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"78CEFE94-3392-4570-97B5-2903499DE3B8"}
 * @override
 */
function onShow(firstShow, event) {
    loadAssignmentsByCategory(firstShow, event);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"0710A401-3B2F-4137-9FD5-4F93E69E6783"}
 * @override
 */
function openAddModal(event) {
	forms.sub_addEmployee.prepareNewRecord();
    var win = application.createWindow('win_add_employee', JSWindow.MODAL_DIALOG);
    win.title = 'Add Employee';
    win.setSize(400, 300);
    win.resizable = false;
    win.show(forms.sub_addEmployee);
}




/**
 * TODO generated, please specify type and doc for the params
 * @param foundsetindex
 * @param columnindex
 * @param record
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"79112E84-10A7-4CBF-A4CA-FAAA0B45B185"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
    if (!record) return;

    var col = elements.datagrid_1.getColumn(columnindex);

    if (col.id == 'delete_col') {
        deleteRecord(record, "the employee '" + record.name + "'");
        return;
    }
    if (col.id == 'possessions_col') {
        showEmployeePossessions(record);
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param employeeRecord
 *
 * @properties={typeid:24,uuid:"2C7C9982-F03D-49AE-85CB-D5AA4DFF7AFC"}
 */
function showEmployeePossessions(employeeRecord) {
    var employeeName = employeeRecord.name;

    var q = datasources.db.assetflowdb.assignments.createSelect();
    q.result.add(q.joins.assignments_to_assets.columns.name, 'asset_name');
    q.result.add(q.columns.assignment_uuid.count, 'qty');
    q.where.add(q.columns.employee_id.eq(employeeRecord.employee_uuid));
    q.where.add(q.columns.returned_date.isNull);
    q.groupBy.add(q.joins.assignments_to_assets.columns.name);

    var ds = databaseManager.getDataSetByQuery(q, -1);

    if (ds.getMaxRowIndex() === 0) {
        plugins.dialogs.showInfoDialog(
            'Possessions',
            employeeName + ' currently holds no active assets.'
        );
        return;
    }

    var possessionsList = [];
    for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
        possessionsList.push(ds.getValue(i, 2) + 'x ' + ds.getValue(i, 1));
    }

    plugins.dialogs.showInfoDialog(
        'Possessions',
        employeeName + ' currently holds: ' + possessionsList.join(', ') + '.'
    );
}


/**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"249144F6-6899-4C0F-86BD-FF259DF459CD"}
 * @override
 */
function onSearch(oldValue, newValue, event) {
    if (!searchTerm) {
        foundset.loadAllRecords();
        return true;
    }

    var q = foundset.getQuery();
    q.where.clear();

    var orGroup = q.or;
    orGroup.add(q.columns.name.upper.like('%' + searchTerm.toUpperCase() + '%'));
    orGroup.add(q.columns.email.upper.like('%' + searchTerm.toUpperCase() + '%'));
    q.where.add(orGroup);

    foundset.loadRecords(q);

    if (foundset.getSize() == 0) {
        plugins.dialogs.showInfoDialog('Info', 'No employees found matching "' + searchTerm + '"');
        foundset.loadAllRecords();
    }

    return true;
}


/**
 * @properties={typeid:24,uuid:"C80D289C-551A-4159-886D-0ABFEC5E8F68"}
 */
function getChartData() {
    var query = "SELECT e.name, COUNT(a.assignment_id) " +
                "FROM employees e " +
                "LEFT JOIN assignments a ON e.employee_id = a.employee_id AND a.returned_date IS NULL " +
                "GROUP BY e.employee_id, e.name " +
                "ORDER BY e.name";

    var ds = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);

    var employeeNames = [];
    var assetCounts = [];
    for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
        employeeNames.push(ds.getValue(i, 1) || "Unknown");
        assetCounts.push(ds.getValue(i, 2) || 0);
    }

    return {
        labels: employeeNames,
        datasets: [{
            label: 'Assets held',
            data: assetCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    };
}


/**
 * @properties={typeid:24,uuid:"1B707A05-99EB-4177-B392-E7BE8A22619F"}
 */
function refreshAssetChart() {
    if (!elements.chart_assets) return;
    elements.chart_assets.setData(JSON.parse(JSON.stringify(getChartData())));
    elements.chart_assets.setOptions(JSON.parse(JSON.stringify({
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    })));
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"5B996C4A-7A5C-4551-A26F-8D21E8F14B56"}
 * @override
 */
function onShow(firstShow, event) {
    refreshAssetChart();
}
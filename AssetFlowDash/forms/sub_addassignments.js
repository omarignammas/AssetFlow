

/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"D5A94CF6-B1B3-49D2-B338-849EC08FA03D"}
 */
function onShow(firstShow, event) {
    databaseManager.revertEditedRecords(foundset);
    var rec = foundset.createRecord();
    if (rec) {
        rec.returned_date = null;
    }
}


/**
 * @properties={typeid:24,uuid:"5654CE91-7EB2-4875-B49A-0FCA0182CEC3"}
 * @override
 */
function prepareNewRecord() {
    _super.prepareNewRecord(); // handles createRecord
    var rec = foundset.getSelectedRecord();
    if (rec) {
        rec.returned_date = null;
    }
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"8C9D1BC4-2D4F-4A7B-9D54-8189E40BE2EF"}
 * @override
 */
function onAction(event) {
    var rec = foundset.getSelectedRecord();

    if (!rec.asset_id) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select an Asset.', 'OK');
        return;
    }
    if (!rec.employee_id) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select an Employee.', 'OK');
        return;
    }
    if (!rec.assigned_date) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the Assigned Date.', 'OK');
        return;
    }
    if (rec.returned_date != null && rec.returned_date < rec.assigned_date) {
        plugins.dialogs.showErrorDialog('Date Error', 'Returned Date cannot be before Assigned Date.', 'OK');
        return;
    }

    // Update asset status BEFORE _super closes the window
    var relatedAsset = rec.assignments_to_assets;
    if (relatedAsset) {
        relatedAsset.status = rec.returned_date == null ? 'ASSIGNED' : 'IN_STOCK';
        databaseManager.saveData(relatedAsset);
    }

    _super.onAction(event);
}



/**
 * @properties={typeid:24,uuid:"F81646D8-F629-416B-8A66-F8D6BC012077"}
 * @override
 */
function closeModal() {
    var win = application.getWindow('win_add_assignments');
    if (win) win.destroy();
}
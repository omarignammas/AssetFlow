
/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"4735FA43-A80C-4012-A2F8-8215C8E5A16A"}
 */
function onShow(firstShow, event) {
	databaseManager.revertEditedRecords(foundset);
    var rec = foundset.createRecord();
    if (rec) {
        rec.status = '🟢 In Stock';
        rec.purchase_date = new Date();
    }
}
/**
 * @properties={typeid:24,uuid:"7B4BE886-72F1-4CF2-A3EF-186FF1259034"}
 * @override
 */
function prepareNewRecord() {
    _super.prepareNewRecord(); // handles createRecord
    var rec = foundset.getSelectedRecord();
    if (rec) {
        rec.status = '🟢 In Stock';
        rec.purchase_date = new Date();
    }
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"86900A9A-623B-45C6-850C-BB62649EDA1B"}
 * @override
 */
function onAction(event) {
    var rec = foundset.getSelectedRecord();

    if (!rec.name || rec.name.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Asset Name is required.', 'OK');
        return;
    }
    if (!rec.type || rec.type.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select a Type (Hardware or Software).', 'OK');
        return;
    }
    if (rec.total_seats == null || rec.total_seats < 1) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Total Seats must be at least 1.', 'OK');
        return;
    }

    _super.onAction(event);
}


/**
 * @properties={typeid:24,uuid:"94334E44-21B3-4A74-8842-BD237EA0AC82"}
 * @override
 */
function closeModal() {
    var win = application.getWindow('win_add_asset');
    if (win) win.destroy();
}
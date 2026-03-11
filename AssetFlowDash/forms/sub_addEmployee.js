
/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"7572EF1C-25F8-4604-A495-D00711351E70"}
 */
function onShow(firstShow, event) {
    databaseManager.revertEditedRecords(foundset);
    var rec = foundset.createRecord();
    if (rec) {
        rec.is_active = 1;
    }
}


/**
 * @properties={typeid:24,uuid:"D7EFD4DA-C023-4DA6-9D00-4F94823212B1"}
 * @override
 */
function prepareNewRecord() {
    _super.prepareNewRecord(); // handles createRecord
    var rec = foundset.getSelectedRecord();
    if (rec) {
        rec.is_active = 1;
    }
}
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"2EEC2F47-D328-46A9-85D4-0C4D08CD9A17"}
 * @override
 */
function onAction(event) {
    var rec = foundset.getSelectedRecord();

    if (!rec.name || rec.name.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the employee name.', 'OK');
        return;
    }
    if (!rec.email || rec.email.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the employee email.', 'OK');
        return;
    }

    _super.onAction(event);
}


/**
 * @properties={typeid:24,uuid:"508718E2-D4E8-4DEE-9577-4506156B5186"}
 * @override
 */
function closeModal() {
    var win = application.getWindow('win_add_employee');
    if (win) win.destroy();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"CF352DF0-12D8-4E6C-AE8A-3351A9D1A46E"}
 */
function onAction(event) {
    var rec = foundset.getSelectedRecord();
    if (!rec) {
        plugins.dialogs.showErrorDialog('Error', 'No record found.', 'OK');
        return;
    }
    // child validates fields here then calls _super
    // _super handles the save and window close
    var success = databaseManager.saveData(rec);
    if (success) {
        closeModal();
    } else {
        plugins.dialogs.showErrorDialog('Save Error', 'Could not save record.', 'OK');
    }
}


/**
 * @properties={typeid:24,uuid:"4DEF8E06-8555-4391-99F3-495042ADFB33"}
 */
function prepareNewRecord() {
    databaseManager.revertEditedRecords(foundset);
    foundset.createRecord();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"247759A6-1FAA-4E25-84D7-01A899C92A37"}
 */
function onCancel(event) {
    databaseManager.revertEditedRecords(foundset);
    closeModal();
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"190A611C-3E96-41F4-9A8C-12264A16D0A9"}
 */
function onHide(event) {
    databaseManager.revertEditedRecords(foundset);
    return true;
}


/**
 * @properties={typeid:24,uuid:"3DC00A3B-C8C1-40D9-8E7C-7558B170D003"}
 */
function closeModal() {
    // to be overridden by the child 
}

/**
 * @properties={typeid:35,uuid:"11CD7F1A-C75C-4585-9EA0-C958CE7F8CB3",variableType:-4}
 */
var searchTerm = null;


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"4F075546-7E6C-4B76-A099-540B7825F6D6"}
 */
function openAddModal(event) {
	   
}

/**
 * TODO generated, please specify type and doc for the params
 * @param record
 * @param label
 *
 * @properties={typeid:24,uuid:"1832FA02-4C10-4F3A-8949-AA503279FFCD"}
 */
function deleteRecord(record, label) {
    var answer = plugins.dialogs.showQuestionDialog(
        'Confirm Delete',
        'Are you sure you want to delete ' + label + '?',
        'Delete',
        'Cancel'
    );
    if (answer == 'Delete') {
        record.foundset.deleteRecord(record);
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"D97B58F4-D228-40B6-BD83-5058062F921D"}
 */
function onSearch(oldValue, newValue, event) {
    if (!searchTerm) {
        foundset.loadAllRecords();
        return true;
    }
    return true;
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"7DBFC734-1C41-4ACF-8025-242C89BB7FA4"}
 */
function onShow(firstShow, event) {
}
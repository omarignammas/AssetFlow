
/**
 * @properties={typeid:24,uuid:"FE2DB057-F648-4805-B958-9079EEB1F613"}
 */
function closeModal() {
    // child overrides this with window name 
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"BC4FB1D9-6D1A-440A-9C75-76654AB8935F"}
 */
function onHide(event) {
    databaseManager.revertEditedRecords(foundset);
    return true;
}

/**
 * @properties={typeid:24,uuid:"67ADDAA4-9B7F-46F9-A1D3-42BF3C7319FB"}
 */
function closeModal() {
    var win = application.getWindow('win_asset_details');
    if (win) win.destroy();
    forms.sub_assets_copy.foundset.loadAllRecords();
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"7838DCD2-571D-4F8F-BAB0-2D7D534C9D44"}
 */
function onHide(event) {
    _super.onHide(event);
    forms.sub_assets_copy.foundset.loadAllRecords();
    return true;
}
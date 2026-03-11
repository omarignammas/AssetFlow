/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"56EF49AB-4BC7-4DC0-9EDE-F6536B286611"}
 */
function onLoad(event) {	
	var menuItems = [
		{ id: 'home', text: 'Home' },
		{ id: 'assignments', text: 'Assignments' },
		{ id: 'employees', text: 'Employees' },
		{ id: 'assets', text: 'Assets' }
	];

	elements.sidenav.setRootMenuItems(menuItems);
	
	if (forms.sub_home) {
		elements.sidenav.containedForm = forms.sub_home;
	}
}

/**
 * Called when a menu item is selected.
 *
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"AE20EE91-78DD-4786-B612-CEB08B12745B"}
 */
function onMenuItemSelected(menuItemId, event) {
    application.output('Menu item selected: ' + menuItemId);
    
    if (menuItemId == 'home' && forms.sub_home) {
        elements.sidenav.containedForm = forms.sub_home;
    } else if (menuItemId == 'employees' && forms.sub_employees) {
        elements.sidenav.containedForm = forms.sub_employees;
    }else if (menuItemId == 'assets' && forms.sub_assets) {
        elements.sidenav.containedForm = forms.sub_assets;
    }else if (menuItemId == 'assignments' && forms.sub_assignments) {
        elements.sidenav.containedForm = forms.sub_assignments;
    }
}
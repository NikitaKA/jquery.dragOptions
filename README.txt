
jQuery Draggable Select Options

Description:
Use with native selects. Sort list of options by drag'n'drop.

Supported Browsers:
Chrome, Firefox, Opera, Safari.
IE (any) not supported due to "problems" with <option> object. :(

Usage:
$("select").dragOptions({});

Options:
	highlight: 'String'    // Symbol(s) to highlight draggable option.
	onDrag: function(){}   // (v. 1.1) Callback while dragging an option.
	onChange: function(){} // (v. 1.1) Callback after mouse button released.
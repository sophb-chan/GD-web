function Easing(type) {
	const types = [
		'none',
		'ease-in-out',
		'ease-in',
		'ease-out',
		'elastic-in-out',
		'elastic-in',
		'elastic-out',
		'bounce-in-out',
		'bounce-in',
		'bounce-out',
		'exponential-in-out',
		'exponential-in',
		'exponential-out',
		'sine-in-out',
		'sine-in',
		'sine-out',
		'back-in-out',
		'back-in',
		'back-out',
	];
	return types[type];
}
function Bool(value) {
	return parseInt(value) === 1;
}
function HSV(v) {
	const [hue, saturation, value, saturationMode, valueMode] = v.split('a');
	const modes = ['mult', 'add'];
	return {
		hue: parseInt(hue),
		saturation: parseFloat(hue),
		value: parseFloat(hue),
		saturationMode: modes[saturationMode],
		valueMode: modes[valueMode],
	}
}
function PulseMode(value) {
	return ['color', 'hsv'][value];
}
function PulseTargetType(value) {
	return ['channel', 'group'][value];
}
function ValueArray(value) {
	if (value.includes(':')) return value.split(':');
	else return value.split('.');
}
function PickupItemMode(value) {
	return ['itemID', 'timer', 'points'][value || 0];
}
function TouchToggleMode(value) {
	return ['none', 'on', 'off'][value];
}
function InstantCountComparison(value) {
	return ['=', '>', '<'][value];
	// return ['equals', 'larger', 'smaller'][value]; // IDK if this is needed
}

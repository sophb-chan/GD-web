function getSections(decodedString) {
	const parts = decodedString.split(';');
	const lastElement = parts.pop() || null; // Discard empty last element

	// Check for footer
	// (does not start with standard obj properties or including special delimiters like pipe)
	const containsFooter = !/^[123],/.test(parts.at(-1)) || /[_:#,]/.test(parts.at(-1));

	// Get parts
	const levelStart = parts[0];
	const level = parts.slice(1, -containsFooter).join(';');
	const footer = containsFooter ? parts.at(-1) : null;

	// Return them
	return {
		levelStart,
		level,
		footer,
		lastElement,
	}
}
function getObjects(decodedString) {
	return getSections(decodedString).level.split(';');
}
function getDecodedObjects(decodedString) {
	return getObjects(decodedString).map(o => decodeObjectString(o));
}

// Conversion tables
const { propertyCoercions, propertyNameToID, propertyIDtoName } = conversionTables;

// Decode object string
function decodeObjectString(objString) {
	const CSV = objString.split(',');
	const properties = {};
	for (let i = 0; i < CSV.length; i += 2) {
		// Decode KV
		const propertyID = CSV[i];
		const value = CSV[i + 1];
		const propertyName = propertyIDtoName[propertyID];

		// Coerce value into its respective type
		const coercer = propertyCoercions[propertyID] ?? parseInt;
		let coercedValue = coercer ? coercer(value) : value;

		properties[propertyName ?? propertyID] = coercedValue;
	}
	return properties;
}

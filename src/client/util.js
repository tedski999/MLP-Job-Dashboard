
function timeSince(date) {
	let interval = new Date() - date;
	if (interval < 1000) { return Math.floor(interval) + "ms"; }
	interval /= 1000;
	if (interval < 60) { return Math.floor(interval) + "s"; }
	interval /= 60;
	if (interval < 60) { return Math.floor(interval) + "m"; }
	interval /= 60;
	if (interval < 24) { return Math.floor(interval) + "h"; }
	interval /= 24;
	if (interval < 30) { return Math.floor(interval) + "d"; }
	interval /= 30;
	if (interval < 12) { return Math.floor(interval) + "mo"; }
	interval /= 12;
	return Math.floor(interval) + "y";
}

export default { timeSince };

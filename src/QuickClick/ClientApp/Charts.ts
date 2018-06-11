declare const google: any;

let loadPromise: Promise<any> = createPromise(); 

export default abstract class Charts {
	static load(): Promise<any> {
		return loadPromise;
	}
}

function createPromise(): Promise<any> {
	const charts = google ? google.charts : undefined;

	if (typeof (charts) === 'undefined') {
		throw new Error('Google Charts not loaded. \'google.charts\' is not defined.');
	}

	charts.load('current', { packages: ['corechart'] });

	return new Promise(resolve => {
		charts.setOnLoadCallback(() => {
			if (typeof (google.charts) === 'undefined') {
				throw new Error('Google Charts not loaded. \'google.charts\' is not defined.');
			}

			if (typeof (google.visualization) === 'undefined') {
				throw new Error('Google Visualization not loaded. \'google.visualization\' is not defined.');
			}

			resolve(google);
		});
	});
}
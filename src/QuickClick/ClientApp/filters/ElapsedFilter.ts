import * as moment from 'moment';

export default function(target: any) : any {
	const duration = moment.duration(target);
	const format = duration.minutes() > 0 ? 'HH:mm:ss.SSS' : (duration.minutes() > 0 ? 'mm:ss.SSS' : ':ss.SSS');

	return moment(target).format(format);
}
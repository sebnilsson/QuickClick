import * as moment from 'moment';

export default function(target: any) : any {
	return moment(target).format('HH:mm:ss');
}
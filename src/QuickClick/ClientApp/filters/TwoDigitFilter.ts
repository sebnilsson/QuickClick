import numeral from 'numeral';

export default function(target: any) : any {
	return numeral(target).format('0,0.00');
}
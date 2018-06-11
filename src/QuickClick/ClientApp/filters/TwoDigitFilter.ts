declare var numeral : any;

export default function(target: any) : any {
	return numeral(target).format('0,0.00');
}
export default interface ISession {
	id: string,
	startedAt: Date,
	clicks: Array<Date>,
	elapsed: number,
	isExpanded: boolean
}
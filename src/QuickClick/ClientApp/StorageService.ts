import ISession from './ISession';

const sessionsStorageKey: string = 'Sessions';
const timerLengthStorageKey: string = 'TimerLength';
const defaultTimerLength = 10;

export default abstract class StorageService {
	static getSessions(): Array<ISession> {
		const stored : any = localStorage.getItem(sessionsStorageKey);
		const sessions : any = JSON.parse(stored) || [];

		sessions.forEach((s: ISession) => {
			const parsedStartedAt = this.parseJsonDate(s.startedAt);
			s.startedAt = parsedStartedAt;

			const parsedClicks = s.clicks.map(c => this.parseJsonDate(c));
			
			s.clicks.splice(0, s.clicks.length);
			parsedClicks.forEach(c => s.clicks.push(c));
		});
		
		return sessions;
	}

	static saveSessions(sessions: Array<ISession>): void {
		const sessionsJson = JSON.stringify(sessions);

		localStorage.setItem(sessionsStorageKey, sessionsJson);
	}

	static getTimerLength(): number {
		const stored : any = localStorage.getItem(timerLengthStorageKey);
		const timerLength = parseInt(stored, 10);

		return timerLength || defaultTimerLength;
	}

	static saveTimerLength(timerLength: number) {
		localStorage.setItem(timerLengthStorageKey, timerLength.toString());
	}

	private static parseJsonDate(date: any): Date {
		return new Date(Date.parse(date));
	}
}
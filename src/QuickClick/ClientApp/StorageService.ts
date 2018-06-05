import ISession from './ISession';

const sessionsStorageKey: string = 'Sessions';
const timerLengthStorageKey: string = 'TimerLength';
const defaultTimerLength = 10;

export default abstract class StorageService {
	static getSessions(): Array<ISession> {
		const stored : any = localStorage.getItem(sessionsStorageKey);
		const sessions = JSON.parse(stored);

		return sessions || [];
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
}
import ISession from './ISession';
import StorageService from './StorageService';

export default abstract class SessionService {
	static getAll(): Array<ISession> {
		const sessions = StorageService.getSessions() || [];

		this.sortSessions(sessions);

		return sessions;
	}

	static add(sessions: Array<ISession>, session: ISession) {
		sessions.push(session);

		this.sortSessions(sessions);

		StorageService.saveSessions(sessions);
	}

	static remove(sessions: Array<ISession>, session: ISession) {
		const index = session ? sessions.indexOf(session) : -1;

		if (index < 0) {
			return;
		}

		sessions.splice(index, 1);

		this.sortSessions(sessions);

		StorageService.saveSessions(sessions);
	}

	private static sortSessions(sessions: Array<ISession>) {
		sessions.sort((a, b) => (a.startedAt > b.startedAt ? -1 : (b.startedAt > a.startedAt) ? 1 : 0));
		console.log('sortSessions -- sessions: ', sessions);
	}
}
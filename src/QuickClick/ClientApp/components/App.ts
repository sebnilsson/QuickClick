import { Vue, Component } from 'vue-property-decorator';
import '../styles/App.css';

import ISession from '../ISession';
import SessionService from '../SessionService';

import Sessions from './Sessions.vue';
import Timer from './Timer.vue';

@Component({
	components: {
		Sessions,
		Timer
	}
})
export default class App extends Vue {
	sessions: Array<ISession> = [];

	mounted() {
		this.sessions.splice(0, this.sessions.length);

		const sessions = SessionService.getAll();

		sessions.forEach(x => {
			x.isExpanded = false;
			this.sessions.push(x);
		});
	}

	sessionRemove(session: ISession) {
		SessionService.remove(this.sessions, session);
	}

	timerStart() {
	}

	timerDone(session: ISession) {
		SessionService.add(this.sessions, session);
	}
}
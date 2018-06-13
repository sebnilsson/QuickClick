declare const module: any;
declare const require: Function;

import { Vue, Component } from "vue-property-decorator";

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

/*if (module && module['hot']) {
	const api = require('vue-hot-reload-api');
	//const Vue = require('vue');

	api.install(Vue);

	module['hot'].accept();
}*/
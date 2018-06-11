declare const moment: any;

import { Vue, Component, Emit, Watch } from "vue-property-decorator";

import ISession from '../ISession';
import StorageService from '../StorageService';
import SingleDigitFilter from '../filters/SingleDigitFilter';
import TwoDigitFilter from '../filters/TwoDigitFilter';

const timerIntervalMs = 100;

@Component({
	filters: {
		'singledigit': SingleDigitFilter,
		'twodigit': TwoDigitFilter
	}
})
export default class Timer extends Vue {
	isTimerRunning: boolean = false;
	timerElapsed: number = 0;
	timerLength: number = StorageService.getTimerLength();

	private intervalId: number = -1;
	private currentSession: ISession = this.createSession();
	
	@Emit()
	start() {
		if (this.timerElapsed <= 0 || this.isTimerDone) {
			this.reset();
		}

		this.isTimerRunning = true;
		
		window.addEventListener('keydown', this.handleKeyUp, true);
		window.addEventListener('mousedown', this.handleKeyUp, true);

		this.intervalId = setInterval(() => this.increaseTimer(), timerIntervalMs);
	}

	pause() {
		this.isTimerRunning = false;

		window.removeEventListener('keydown', this.handleKeyUp, true);
		window.removeEventListener('mousedown', this.handleKeyUp, true);

		clearInterval(this.intervalId);
	}

	stop() {
		this.pause();
		this.reset();
	}

	get clicksPerSecond() {
		return (this.currentSession.clicks.length / (this.timerElapsed / 1000));
	}

	get isTimerDone() {
		return (this.timerLengthSeconds > 0 && this.timerElapsed >= this.timerLengthSeconds);
	}

	get timerLengthSeconds(): number {
		return (this.timerLength * 1000);
	}
	
	get timerDisplay() {
		const ms = moment.duration(this.timerElapsed / 1000, 'seconds');
		return ms.asSeconds();
	}

	@Emit()
	private done(session: ISession) {
		session.elapsed = this.timerElapsed;
	}

	@Watch('timerElapsed')
	private onTimerElapsedChanged(value: number, oldValue: number) {
		if (this.isTimerDone) {
			this.pause();

			if (this.currentSession.clicks.length) {
				this.done(this.currentSession);
			}
		}
	}

	@Watch('timerLength')
	private onTimerLengthChanged(value: number, oldValue: number) {
		this.reset();
		StorageService.saveTimerLength(value);
	}

	private createSession(): ISession {
		const id = (Math.random().toString(36) + '00000000000000000').slice(2, 8 + 2);

		return {
			id: id,
			startedAt: new Date(),
			clicks: [],
			elapsed: -1,
			isExpanded: false
		};
	}

	private handleKeyUp(e: any) {
		this.currentSession.clicks.push(new Date());

		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
		}
	}

	private increaseTimer() {
		this.timerElapsed = this.timerElapsed + timerIntervalMs;
	}

	private reset() {
		this.timerElapsed = 0;
		this.currentSession = this.createSession();
	}
}
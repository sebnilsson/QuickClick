declare const moment: any;

import { Vue, Component, Emit, Watch } from "vue-property-decorator";

import ISession from '../ISession';
import StorageService from '../StorageService';

const timerIntervalMs = 100;

@Component
export default class Timer extends Vue {
	isTimerRunning: boolean = false;
	timerElapsed: number = 0;
	timerLength: number = StorageService.getTimerLength();

	private intervalId: number = -1;
	private currentSession: ISession = this.createSession();
	
	@Emit()
	start() {
		if (this.isTimerDone) {
			this.timerElapsed = 0;
		}
		this.isTimerRunning = true;
		this.currentSession = this.createSession();
		
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
		this.timerElapsed = 0;
		this.currentSession = this.createSession();
	}

	@Emit()
	private done(session: ISession) {
		session.elapsed = this.timerElapsed;
	}

	private handleKeyUp(e: any) {
		this.currentSession.clicks.push(new Date());

		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
		}
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

	get isTimerDone() {
		return (this.timerElapsed >= this.timerLengthSeconds);
	}

	@Watch('timerLength')
	private onTimerLengthChanged(value: number, oldValue: number) {
		StorageService.saveTimerLength(value);
	}

	get timerLengthSeconds(): number {
		return (this.timerLength * 1000);
	}
	
	get timerDisplay() {
		const ms = moment().set({
			'month': 0,
			'date': 1,
			'hour': 0,
			'minute': 0,
			'second': 0,
			'millisecond': this.timerElapsed
		});
		return ms.format('mm:ss.SSS');
	}

	private increaseTimer() {
		this.timerElapsed = this.timerElapsed + timerIntervalMs;
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
}
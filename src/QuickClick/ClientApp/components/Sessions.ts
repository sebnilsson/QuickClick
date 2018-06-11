import { Vue, Component, Emit, Prop } from "vue-property-decorator";

import DateFilter from '../filters/DateFilter';
import DateTimeFilter from '../filters/DateTimeFilter';
import ElapsedFilter from '../filters/ElapsedFilter';
import ISession from '../ISession';
import SessionsGraph from './SessionsGraph.vue';
import TimeFilter from '../filters/TimeFilter';
import TimeMsFilter from '../filters/TimeMsFilter';
import TwoDigitFilter from '../filters/TwoDigitFilter';

@Component({
	components: {
		SessionsGraph
	},
	filters: {
		'elapsed': ElapsedFilter,
		'date': DateFilter,
		'time': TimeFilter,
		'timems': TimeMsFilter,
		'twodigit': TwoDigitFilter
	}
})
export default class Sessions extends Vue {
	@Prop({ default: () => [] })
	sessions: Array<ISession>;

	created() {
	}

	remove(session: ISession) {
		const isConfirmed = confirm(`Are you sure you want to remove the session from ${DateTimeFilter(session.startedAt)}?`);
		if (!isConfirmed) {
			return;
		}

		this.removeSession(session);
	}

	toggleDetails(session: ISession) {
		session.isExpanded = !session.isExpanded;
	}

	@Emit('remove')
	private removeSession(session: ISession) {
	}
}
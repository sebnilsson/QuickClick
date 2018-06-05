import { Vue, Component, Emit, Prop } from "vue-property-decorator";

import DateFilter from '../filters/DateFilter';
import ElapsedFilter from '../filters/ElapsedFilter';
import ISession from '../ISession';
import TimeFilter from '../filters/TimeFilter';
import TimeMsFilter from '../filters/TimeMsFilter';

@Component({
	filters: {
		'elapsed': ElapsedFilter,
		'date': DateFilter,
		'time': TimeFilter,
		'timems': TimeMsFilter
	}
})
export default class Sessions extends Vue {
	@Prop({ default: () => [] })
	sessions: Array<ISession>;

	created() {
	}

	toggleDetails(session: ISession) {
		session.isExpanded = !session.isExpanded;
	}

	@Emit()
	private remove(session: ISession) {
	}
}
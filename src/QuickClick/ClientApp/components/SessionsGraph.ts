﻿import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import Charts from '../Charts';
import ISession from '../ISession';

@Component
export default class SessionsGraph extends Vue {
	@Prop({ default: () => [] })
	sessions: Array<ISession>;
	
	$refs: {
		chartWrapper: HTMLFormElement
	}
	
	@Watch('sessions')
	private onSessionsChanged(value: Array<ISession>, oldValue: Array<ISession>) {
		Charts.load().then(this.loadChartData);
	}

	private loadChartData(google: any) {
		const data = new google.visualization.DataTable();
		data.addColumn('datetime', 'Started');
		data.addColumn('number', 'Clicks/s');

		const options = {
			curveType: 'function',
			legend: 'none',
			height: '100%',
			width: '100%',
			chartArea: {
				width: '85%',
				height: '70%'
			},
			hAxis: {
				format: 'yyyy-MM-dd'
			},
			vAxis: {
				viewWindow: {
					min: 0
				}
			}
		};

		/*const xData: Array<any> = ['x'];
		const sessionsData: Array<any> = ['sessions'];*/

		const dataRows: Array<any> = [];

		this.sessions.forEach(x => {
			//xData.push(x.startedAt);

			const clicksPerMinute = x.clicks.length / (x.elapsed / 1000);
			//sessionsData.push(clicksPerMinute);

			dataRows.push([x.startedAt, clicksPerMinute]);
		});

		data.addRows(dataRows);
		
		const chart = new google.visualization.LineChart(this.$refs.chartWrapper);
		chart.draw(data, options);
	}
}
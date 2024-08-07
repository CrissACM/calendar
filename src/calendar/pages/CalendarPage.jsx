import { addHours } from 'date-fns'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, Navbar } from '..'
import { getMessagesES, localizer } from '../../helpers'

const myEventsList = [
	{
		title: 'Cumpleaños del jefe',
		notes: 'Hay que comprar el pastel',
		start: new Date(),
		end: addHours(new Date(), 2),
		bgColor: '#fafafa',
		user: {
			_id: '123',
			name: 'Criss',
		},
	},
]

export function CalendarPage() {
	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#347CF67',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		}

		return {
			style,
		}
	}

	return (
		<>
			<Navbar />
			<Calendar
				culture='es'
				localizer={localizer}
				events={myEventsList}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc(100vh - 80px)' }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
			/>
		</>
	)
}

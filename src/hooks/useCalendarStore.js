import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from '../helpers'
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store'

export function useCalendarStore() {
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)
	const { events, activeEvent } = useSelector((state) => state.calendar)

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent))
	}

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
				dispatch(onUpdateEvent({ ...calendarEvent, user }))
			} else {
				const { data } = await calendarApi.post('/events', calendarEvent)
				dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
			}
		} catch (error) {
			console.log(error)
			Swal.fire('Error al guardar', error.response.data.msg, 'error')
		}
	}

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`)
			dispatch(onDeleteEvent())
		} catch (error) {
			console.log(error)
			Swal.fire('Error al eliminar', error.response.data.msg, 'error')
		}
	}

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events')
			const events = convertEventsToDateEvents(data.eventos)

			dispatch(onLoadEvents(events))
			console.log(events)
		} catch (error) {
			console.log(error)
			console.log('Error al cargar eventos')
		}
	}

	return {
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	}
}

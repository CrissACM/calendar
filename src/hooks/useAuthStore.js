import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'

export function useAuthStore() {
	const { status, user, errorMessage } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const startLogin = async ({ email, password }) => {
		try {
			const resp = await calendarApi.post('/auth', { email, password })

			console.log({ resp })
		} catch (error) {
			console.log(error)
		}
	}

	return {
		status,
		user,
		errorMessage,
		startLogin,
	}
}
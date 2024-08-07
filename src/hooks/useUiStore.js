import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice'

export function useUiStore() {
	const dispatch = useDispatch()
	const { isDateModalOpen } = useSelector((state) => state.ui)

	const openDateModal = () => {
		dispatch(onOpenDateModal())
	}

	const closeDateModal = () => {
		dispatch(onCloseDateModal())
	}

	return {
		isDateModalOpen,
		openDateModal,
		closeDateModal,
	}
}
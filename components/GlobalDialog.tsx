import { closeDialog } from '@/utils/dialog.slice'
import { useAppDispatch, useAppSelector } from '@/utils/hook'
import { IconDialog } from './IconDialog'
import { RootState } from '@/utils/store'

export function GlobalDialog() {
    const dispatch = useAppDispatch()
    const { open, type, title, message } = useAppSelector(
        (state: RootState) => state.dialog
    )

    return (
        <IconDialog
            type={type || 'info'}
            title={title || ''}
            message={message || ''}
            open={open}
            onClose={() => dispatch(closeDialog())}
        />
    )
}

'use client'
import { useDispatch } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { AppDispatch } from "@/lib/store";
import { useAppSelector } from "@/hooks";
import { closeAlert, openNotification } from "@/lib/store/slices";

export const Alert = () => {
	const dispatch = useDispatch<AppDispatch>();
	const alertState = useAppSelector((state) => state.alert);

	const onConfirm = () => {
		alertState.onConfirm();
		dispatch(closeAlert());
		dispatch(openNotification({ message: alertState.notificationMessage }));
	};
	return (
		<div className='alert-screen-background'>
			<div className='alert'>
				<div className='alert-body'>
					<ExclamationCircleIcon className='alert-icon' />
					<h3>{alertState.message}</h3>
				</div>
				<footer>
					<button
						className='alert-cancel-btn'
						onClick={() => dispatch(closeAlert())}
					>
						Cancel
					</button>
					<button className='alert-confirm-btn' onClick={onConfirm}>
						Confirm
					</button>
				</footer>
			</div>
		</div>
	);
};

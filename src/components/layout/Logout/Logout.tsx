'use client'
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { AppDispatch } from "@/lib/store";
import { logoutUser } from "@/lib/store/slices";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { deleteCookies } from "@/lib/utils";

export const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onLogout = async () => {
    await dispatch(logoutUser());
    await deleteCookies();
    router.push('/');
   };


  return (
    <div className='logout group' >
    <Tooltip message='Log out' parent='logout' />
      <button className='logout-btn' onClick={onLogout}>
        <ArrowRightStartOnRectangleIcon
          className='logout-icon'
        />
      </button>
    </ div>
  )
};
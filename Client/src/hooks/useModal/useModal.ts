import { modalSelector } from '@/store/slices/modal/modal.selector';
import { useAppDispatch, useAppSelector } from '../useRedux/useRedux';
import {
  closeModalAction,
  openModalAction,
} from '@/store/slices/modal/modal.slice';
import { type ModalState } from '@/types/modal.type';

export const useModal = () => {
  const modalState = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const openModal = (content: ModalState['content']) => {
    dispatch(openModalAction({ content }));
  };

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  return { state: modalState, openModal, closeModal };
};

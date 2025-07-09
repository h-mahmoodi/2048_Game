import { type FC } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
};

const ModalComponent: FC<ModalProps> = ({ isOpen }) => {
  if (isOpen) {
    return <div>Modat</div>;
  }
  return null;
};

export const Modal = (props: ModalProps) => {
  const element: HTMLElement | null = document.querySelector('#modal');
  if (!element) {
    return null;
  }
  return createPortal(<ModalComponent {...props} />, element);
};

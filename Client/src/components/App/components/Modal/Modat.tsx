import { useModal } from '@/hooks/useModal/useModal';
import { useEffect, useRef, useState, type FC } from 'react';
import { createPortal } from 'react-dom';

const ModalComponent: FC = () => {
  const { isOpen, content, closeModal } = useModal();
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <button onClick={closeModal}>close</button>
      <div>modal</div>
      <div>{content}</div>
    </div>
  );
};

export const Modal = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = document.getElementById('modal');
    if (!el) {
      console.warn('Missing #modal element in DOM');
    }
    setElement(el);
  }, []);
  if (!element) {
    return null;
  }
  return createPortal(<ModalComponent />, element);
};

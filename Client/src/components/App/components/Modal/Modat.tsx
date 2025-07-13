import { useModal } from '@/hooks/useModal/useModal';
import { useEffect, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import { useModalStyle } from './Modal.style';
import { AnimatePresence, motion } from 'motion/react';

const ModalComponent: FC = () => {
  const { isOpen, content, closeModal } = useModal();
  const classes = useModalStyle();
  //   if (!isOpen) {
  //     return null;
  //   }
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className={classes.Container}
        >
          <motion.div
            className={classes.Backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={classes.Modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            // transition={{ duration: 0.3 }}
          >
            <button onClick={closeModal}>close</button>
            <div>modal</div>
            <div>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

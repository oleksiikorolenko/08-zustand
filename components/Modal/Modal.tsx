import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "../Modal/Modal.module.css";


interface ModalProps{
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      window.addEventListener('keydown', handleKey);
      
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
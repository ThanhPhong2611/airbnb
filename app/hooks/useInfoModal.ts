import { create } from 'zustand';

interface InfoModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInfoModal = create<InfoModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useInfoModal;

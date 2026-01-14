import { create } from 'zustand';

type ModalType = 'login' | 'signup' | 'forgot' | null;

interface ModalState {
  activeModal: ModalType;
  modalData: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  openModal: (type, data = null) => set({ activeModal: type, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));

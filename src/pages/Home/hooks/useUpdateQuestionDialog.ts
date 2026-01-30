import { create } from "zustand";

type UpdateQuestionDialogStore = {
  open: boolean;
  selectedId: string | null;
  closeDialog: () => void;
  openDialog: (id: string) => void;
};

export const useUpdateQuestionDialog = create<UpdateQuestionDialogStore>(
  (set) => ({
    open: false,
    selectedId: null,
    openDialog: (id) => set({ open: true, selectedId: id }),
    closeDialog: () => set({ open: false, selectedId: null }),
  }),
);

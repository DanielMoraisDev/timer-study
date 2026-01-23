import { create } from "zustand";

type UpdateQuestionDialogStore = {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
};

export const useUpdateQuestionDialog = create<UpdateQuestionDialogStore>(
  (set) => ({
    open: false,
    openDialog: () => set({ open: true }),
    closeDialog: () => set({ open: false }),
  }),
);

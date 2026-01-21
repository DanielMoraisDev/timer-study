import { create } from "zustand";

type MissQuestionDialogStore = {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
};

export const useMissQuestionDialog = create<MissQuestionDialogStore>((set) => ({
  open: false,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}));

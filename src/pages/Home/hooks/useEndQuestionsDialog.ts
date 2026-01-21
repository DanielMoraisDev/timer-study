import { create } from "zustand";

type EndQuestionsDialogStore = {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
};

export const useEndQuestionsDialog = create<EndQuestionsDialogStore>((set) => ({
  open: false,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}));

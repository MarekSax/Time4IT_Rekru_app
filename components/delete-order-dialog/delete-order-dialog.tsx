import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface DeleteOrderDialogProps {
  open: boolean;
  setDialogOpen: (open: boolean) => void;
  handleConfirmDelete: () => void;
}
const DeleteOrderDialog = ({ open, setDialogOpen, handleConfirmDelete }: DeleteOrderDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <AlertDialogContent className="h-[234px] w-[400px] items-end gap-8">
        <AlertDialogHeader className="mt-16 gap-0">
          <AlertDialogTitle className="text-base font-semibold text-gray-900">Usuń Zamówienie</AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-normal text-gray-600">
            Czy jesteś pewny, że chcesz usunąć zamówienie?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex h-min gap-3 lg:items-center lg:justify-center">
          <AlertDialogCancel
            onClick={() => setDialogOpen(false)}
            className="min-h-11 min-w-[170px] cursor-pointer bg-white py-2.5 text-base font-semibold text-gray-700"
          >
            Anuluj
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-error-600 hover:bg-error-700 min-h-11 min-w-[170px] cursor-pointer py-2.5 text-base font-semibold text-white"
          >
            Usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrderDialog;

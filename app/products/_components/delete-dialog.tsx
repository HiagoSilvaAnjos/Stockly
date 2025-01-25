import { deleteProduct } from "@/app/_actions/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const AlertDialogDelete = ({ productId }: DeleteProductDialogContentProps) => {
  const onDelete = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso.");
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir o produto.");
      console.log(error);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Você realmente deseja excluir este produto?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Você esta prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDialogDelete;

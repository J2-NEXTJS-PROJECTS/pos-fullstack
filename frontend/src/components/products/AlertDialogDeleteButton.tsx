"use client";
import { FormEvent, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product } from "@/schemas/schemas";
import { deleteProduct } from "../../../actions/delete-product-action";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const AlertDialogDeleteButton = ({
  productId,
}: {
  productId: Product["id"];
}) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    //wait().then(() => setOpen(false));
    await sleep();
    await deleteProduct(productId)
    setOpen(false);
    setPending(false);
  };

  //   console.log({ open });
  //   console.log({ pending });
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <button
          className="text-red-600 hover:text-red-800 cursor-pointer"
          type="button"
          onClick={() => setOpen(true)}
        >
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-600  hover:bg-red-800" asChild>
            <form
              onSubmit={handlerSubmit}
            >
              {/** some inputs */}
              <button
                className="cursor-pointer"
                type="submit"
                disabled={pending}
              >
                {!pending ? "Delete Product" : "Deleting..."}
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

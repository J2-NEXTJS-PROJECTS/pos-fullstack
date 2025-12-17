import Heading from "@/components/ui/Heading";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="text-center">
      <Heading>Pagina No encontrada</Heading>

      <p>
        <Link className="text-gree-400" href={`/admin/products?page=1`}>
          Volver a Productos
        </Link>
      </p>
    </div>
  );
};
export default NotFound;

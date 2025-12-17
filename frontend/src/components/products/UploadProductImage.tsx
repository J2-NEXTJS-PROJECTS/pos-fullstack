"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../actions/upload-image-action";
import Image from "next/image";
import { Product } from "@/schemas/schemas";
import { getImagePath } from "@/utils/utils";

export default function UploadProductImage({currentImage}:{currentImage?:string}) {
  const [image, setImage] = useState("");

  const myOnDropMethod = useCallback(async (files: File[]) => {
    //colocamos el archivo en formData
    const formData = new FormData();
    // COmo files es un array ha que iterar
    files.forEach((file) => {
      //añadimos el imput file, solo es uno porque el dropzone solo permite un archivo
      formData.append("file", file);
      //console.log(file)
    });

    const imageUrl = await uploadImage(formData);
    //console.log({imageUrl})
    setImage(imageUrl);
  }, []);
  //COnfiguracion del DropZOne
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: myOnDropMethod,
    maxFiles: 1,
  });
  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Imagen Producto
        </label>
        <div
          {...getRootProps({
            className: `
            py-20 border-2 border-dashed  text-center 
            ${
              isDragActive
                ? "border-gray-900 text-gray-900 bg-gray-200 "
                : "border-gray-400 text-gray-400 bg-white"
            } 
            ${isDragReject ? "border-none bg-white" : "cursor-not-allowed"}
        `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>Suelta la Imagen</p>}
          {isDragReject && <p>Archivo no válido</p>}
          {!isDragActive && <p>Arrastra y suelta una imagen aquí</p>}
        </div>
      </div>
      {/* SI tenemos una imagen la mostramos */}
      {image && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Imagen del producto</p>
          <div className="border border-amber-400 w-auto h-auto relative">
            <Image
              src={image}
              alt="Imagen Publicada"
              className="border border-amber-600 object-cover"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      {/* Tiene que haber una currentImage y no una image */}
      {(currentImage && !image) && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Imagen del producto</p>
          <div className="border border-amber-400 w-auto h-auto relative">
            <Image
              src={getImagePath(currentImage)}
              alt="Imagen Publicada"
              className="border border-amber-600 object-cover"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
      <input type="hidden" name="image" defaultValue={image ? image : currentImage}/>
    </>
  );
}

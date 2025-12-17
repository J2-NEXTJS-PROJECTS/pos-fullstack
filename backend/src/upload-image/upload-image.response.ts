import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
//!Creamos el type, puede ser de los dos tipos
export type CloudinaryResponse = UploadApiErrorResponse | UploadApiResponse;

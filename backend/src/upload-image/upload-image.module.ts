import { Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { UploadImageProvider } from './upload-image';

//!este modulo no tiene controlador propio pero puede ser usado en cualquier otro modulo
@Module({
  //COnfiguramos los providers,UploadImageProvider ya tiene la configuracion del para cuando cualquier modulo lo pueda usar como  @Injectable('CLOUDINARY') EX: constructor(
  // @Inject('CLOUDINARY') private readonly cloudinary: any,
  // ) {}

  providers: [UploadImageService, UploadImageProvider],
  //! esportamos el service porque tiene el metodo y provider porque tiene las credenciales
  exports: [UploadImageService, UploadImageProvider],
})
export class UploadImageModule {}

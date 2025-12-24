import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get_product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/upload-image/upload-image.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    //!inyectamos la dependencia UploadImageService
    private readonly uploadImageService: UploadImageService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  //si no se le pasa ningun valor a @Query se puede usar la variable query
  findAll(@Query() query: GetProductsQueryDto) {
    console.log(query); //GetProductsQueryDto { category_id: '3', take: '5' }
    const category = query.category_id ? query.category_id : null;
    const take = query.take ? query.take : 10;
    const skip = query.skip ? query.skip : 0;
    console.log({ category, take, skip }); // { category: 1, take: '2' }
    return this.productsService.findAll(category, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  // Orden importa:
  // JwtAuthGuard → autentica y crea req.user
  // RolesGuard → autoriza leyendo req.user.role y la metadata de @Roles()
  // Si el token es inválido → ni llegas a RolesGuard (401).
  // Si el token es válido pero rol no coincide → RolesGuard bloquea (típicamente 403, ver abajo).

  //! @UseGuards para proteger el endpoint y activar los guards y tambien JwtStrategy
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }

  //!controlador par asubir las imagenes
  // /products/upload-image
  @Post('upload-image')
  // <input type="file" name="file"=>
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(`Imagen es obligatoria`);
    }
    //nos va a devolver la url de la imagen en cloudinary
    return this.uploadImageService.uploadFile(file);
  }
}

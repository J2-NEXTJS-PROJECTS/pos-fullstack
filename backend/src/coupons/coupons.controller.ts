import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { ApplyCouponDto } from './dto/apply-couon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.couponsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.couponsService.remove(+id);
  }

  @Post('apply-coupon')
  @HttpCode(HttpStatus.OK) // Configuramos el codigo de la peticion.
  apply(@Body() applyCouponDto: ApplyCouponDto) {
    return this.couponsService.apply(applyCouponDto.coupon_name);
  }
}

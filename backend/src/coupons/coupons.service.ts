import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    return await this.couponRepository.save(createCouponDto);
  }

  async findAll() {
    return await this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id: id });
    if (!coupon) {
      throw new NotFoundException(`Coupon con el id ${id} no existe`);
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    //console.log(updateCouponDto);
    const coupon = await this.findOne(id);
    //Sobreescribimos el objeto coupon con los que vienen en updateCouponDto (Mutamos)
    Object.assign(coupon, updateCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.findOne(id);
    await this.couponRepository.remove(coupon);
    return { message: `Coupon eliminado` };
  }
  async apply(couponName: string) {
    const coupon = await this.couponRepository.findOneBy({ name: couponName });
    if (!coupon) {
      throw new NotFoundException(`Cupon no existe`);
    }
    const currentDate = new Date();
    console.log({ currentDate }); // 2025-12-06T04:36:00.286Z
    const expirationDate = endOfDay(coupon.expirationDate);
    console.log({ expirationDate }); //2023-12-25T04:59:59.999Z
    if (isAfter(currentDate, expirationDate)) {
      //throw new BadRequestException(`Cupon ya expiro`);
      throw new UnprocessableEntityException(`Cupon ya expiro`);
    }
    return {
      message: `Coupon Valido`,
      ...coupon,
    };
  }
}

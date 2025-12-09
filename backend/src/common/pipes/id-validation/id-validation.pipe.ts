import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
//heredamos ParseIntPipe
export class IdValidationPipe extends ParseIntPipe {
  constructor() {
    //Reescribimos el constructor padre ParseIntPipe
    super({
      exceptionFactory: () => new BadRequestException('Id No valido'),
    });
  }
}

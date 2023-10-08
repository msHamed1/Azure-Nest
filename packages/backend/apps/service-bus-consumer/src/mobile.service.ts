import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mobile } from 'libs/src/Entity/Mobile.schema';
import { CreateMobileDto } from './dto/createMobile.dto';
import { Logger } from 'winston';

@Injectable()
export class MobileServices {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<Mobile>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async create(createMobileDto: CreateMobileDto): Promise<Mobile> {
    try {
      const createdCat = new this.mobileModel(createMobileDto);
      this.logger.info(`Creating ${createMobileDto.imme}`);
      return createdCat.save();
    } catch (err) {
      this.logger.error(
        `Error Creating a resource from Mobile Services  ${createMobileDto.imme} : ${err.message}`,
      );
    }
  }
}

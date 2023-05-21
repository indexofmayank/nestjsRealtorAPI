import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import {UserType} from 'prisma/prisma-client';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ name, phone, email, password }: SignupParams) {
    const userExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if(userExist) {
      throw new ConflictException()
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: UserType.BUYER,
      },
    });

    return user;
  }
}

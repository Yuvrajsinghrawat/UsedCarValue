import { Injectable } from '@nestjs/common/decorators';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    const users = await this.usersService.findBy(email);
    // Email already in use
    if (users.length) {
      throw new BadRequestException('Email already exist');
    }

    // Hash the users Password
    //Generate a Salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new User and save it
    const user = this.usersService.create(email, result);

    // Return the user
    return user;
  }

  async signin(email: string, password: string) {
    // Check if email is in db
    const [user] = await this.usersService.findBy(email);

    if (!user) {
      throw new NotFoundException('Email does not Exist : Please Sign Up');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect Password : Try again');
    }

    return user;
  }
}

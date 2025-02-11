import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupDto } from '../authentication/dto/signup.dto';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(dto: SignupDto): Promise<{ message: string }> {
    const { email, password, phoneNumber } = dto;

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password using AuthService
    const hashedPassword = await this.authService.hashPassword(password);

    // Create and save new user
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  /**
   * Get a user by ID
   */
  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Find user by email (for AuthService)
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}

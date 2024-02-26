import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user-response.dto";

@ApiTags("User")
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post("user")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }

  @Get("user/:id")
  async getUserById(@Param("id") id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Get("email/:email")
  async getUserByEmail(@Param("email") email: string): Promise<UserModel | null> {
    return this.userService.user({ email: String(email) });
  }

  @Get("users")
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Put("user/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete("user/:id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Delete("email/:email")
  async deleteUserByEmail(@Param("email") email: string): Promise<UserModel> {
    return this.userService.deleteUser({ email });
  }
}

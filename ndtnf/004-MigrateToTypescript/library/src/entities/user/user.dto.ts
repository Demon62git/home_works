import { IUser } from "./user.interface"

export interface PromiseUserDto {
    email: IUser['email']
    login: IUser['login']
    firstname: IUser['firstname']
    name: IUser['name']
    thirdname: IUser['thirdname']
    role: IUser['role']
  }

export interface RegistrationUserDto extends PromiseUserDto {
    message: string
}
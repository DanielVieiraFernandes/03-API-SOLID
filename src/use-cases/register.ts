import { UsersRepository } from "@/repositories/users-repositorie";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

// SOLID 

// D - Dependency Inversion Principle

export class RegisterUseCase {
    constructor(private userRepository:UsersRepository){

    }

 async execute({ email, name, password }: RegisterRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
    }


    await this.userRepository.create({ email, name, password_hash });
}
}

/**
 * const prismaUserrepository = new PrismaUserRepository();
 * 
 * const registerUserCase = new RegisterUserCase(prismaUserrepository)
 */


// {
//     userRepository:{
//         create(){

//         }
//         findByEmail(){

//         }
//     }

//     async execute(){
//      const existeEsseEmail = await userRepository.findByEmail({param})
//  if(existeEsseEmail){ 
//      return throw new       
// }
//          userRepository.create({params});
//     }
// }
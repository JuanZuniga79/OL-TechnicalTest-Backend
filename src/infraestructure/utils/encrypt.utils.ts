import { UnauthorizedException } from "@nestjs/common";
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

export default class EncryptUtils{
    private static saltRounds = genSaltSync(14);

    static async encryptPassword (pw: string) {
        return hashSync(pw, this.saltRounds);
    }

    static async validatePassword(pw: string, encryptedPw: string): Promise<boolean> {
        const validation = compareSync(pw, encryptedPw);
        if (!validation) throw new UnauthorizedException('Contraseña incorrecta');
        return validation;
    }

}
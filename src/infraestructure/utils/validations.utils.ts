export class Validations{
    private static emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@(gmail\.|hotmail\.|outlook\.)[a-z]{2,}$/
    static validateEmail(email: string){
        if(email.length < 10) return false;
        return this.emailRegex.test(email);
    }
}
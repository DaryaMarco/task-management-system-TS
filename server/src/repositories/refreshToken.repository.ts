import refreshTokenModel from "../models/refreshToken.model";

class RefreshTokenRepository {
    async create(data:{
         userId : string,
          hashedToken : string,
          expiresAt :Date
        })
       
        {
            return refreshTokenModel.create(data);
        }

        async findByToken(hashedToken : string){
            return refreshTokenModel.findOne({
                hashedToken
            });
        }

        async deleteByUser(userId: string){
            return refreshTokenModel.deleteMany({
                userId
            })
        }

        async deleteByToken(hashedToken:string){
        return refreshTokenModel.deleteOne({
            hashedToken
        });
}

}


export default new RefreshTokenRepository;
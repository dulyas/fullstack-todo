import jwt from "jsonwebtoken"
import Token from "@/models/Token"
import config from "@/config/index"


export const generateTokens = (payload: string | object | Buffer) => {
    const accessToken: string = jwt.sign(payload, config.jwt.acess_secret, {expiresIn: '15m'})
    const refreshToken: string = jwt.sign(payload, config.jwt.refresh_sercet, {expiresIn: '30d'})

    return {
        accessToken,
        refreshToken
    }
} 

export const saveToken = async (userId: string, refreshToken: string) => {
    const tokenData = await Token.query().findOne('user_id', userId)

    if (tokenData) {

        await tokenData.$query().updateAndFetch({refreshToken})

        return tokenData
    }

    const token = await Token.query().insertAndFetch({user_id: userId, refreshToken})
    return token
}

export const removeToken = async (refreshToken: string) => {
    const tokenData = await Token.query().delete('refreshT')
    
    return tokenData
}

class TokenService {




    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }


    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_ACCESS_SECRET)
            return userData as UserToken
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_REFRESH_SECRET)
            return userData as UserToken
        } catch (e) {
            return null
        }
    }
}

export default new TokenService()
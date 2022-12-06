import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Drive from '@ioc:Adonis/Core/Drive';
import Profile from 'App/Models/Profile';

export class ProfileService {
    public static async getAthenticateProfile(auth: HttpContextContract['auth']) {
        const avatarUrl = await Drive.getUrl('./avatar');
        let authenticateProfile = null;
        if(auth.isAuthenticated) {
            authenticateProfile = await Profile.findBy('user_id', auth.user?.id);
        }
        return { avatarUrl, authenticateProfile }
    } 
}
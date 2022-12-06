import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class AssetService {
  public static async uploadFile( request: HttpContextContract['request'], directory: string, name: string) {
    const assetThumbnail = await request.file(name)
    let fileName = ''
    if (assetThumbnail){
        fileName = string.generateRandom(32) + '.' + assetThumbnail.extname
        await assetThumbnail.moveToDisk(directory, { name: fileName })
    }
    return fileName
  }

  public static async uploadProfileFile(  request: HttpContextContract['request'], profile: string | undefined, name: string) {
    const file = await request.file(name)
    let fileName = ''
    if (file) {
      fileName = profile + '_' + string.generateRandom(8) +'.' + file.extname
      await file.moveToDisk(`./${name}/`, {
        name: fileName,
      })
    }
    return fileName
  }
}

import config from '../config/index.js';
import path from 'path';
import fs from 'fs';
import { AdvertisementModel } from '../model/index.js';
import { ErrorHttp } from '../services/index.js';

class AdvertisementService {

/**
* приведение к типу соответствия схеме 
*/   
  mapFields(field) {
   return {
      _id:         field._id,
      shortText:   field.shortText,
      description: field.description,
      images:      field.images,
      user:        field.userId,
      createdAt:   field.createdAt,
      updatedAt:   field.updatedAt,
      tags:        field.tags,
    }
  }

/**
* Поиск объявления
*/   
async find(params) {
    try {
        const conditions = {}
        if (params.shortText) {
            //shortText — поиск регулярным выражением
            conditions.shortText = new RegExp(params.shortText, 'i');
        }
        if (params.description) {
            //description — поиск регулярным выражением
            conditions.description = new RegExp(params.description, 'i');
        }
        if (params.userId) {
            //userId — точное совпадение
            conditions.userId = params.userId;
        }
        if (params.tags) {
            //tags — значение в базе данных должно включать все искомые значения
            const tagsArray = Array.isArray(params.tags) ? params.tags : params.tags.split(',');
            conditions.tags = { $all: tagsArray };
        }
    
        const adv = await AdvertisementModel
            .find(conditions)
            .populate('userId', { name: 1 });

        const data = adv
        //отфильтровать записи, которые помечены удалёнными isDeleted = true
            .filter(advertisement => !advertisement.isDeleted)
            .map(advertisement => this.mapFields(advertisement))
        return data
        } catch (error) {
          throw ErrorHttp(500, `Ошибка поиска: ${error.message}`)
        }
    }
    
/**
* Создание объявления
*/    
async create(req) {
  try {
    const advertisement = new AdvertisementModel({
      shortText:   req.body.shortText,
      description: req.body.description,
      userId:      req.user._id,
      tags:        req.body.tags ?
        Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map(t => t.trim()) : [],
    });

    if (req.files.length) {
    // создание директории для файлов объявления
      const advertisementDir = path.join(config.storage, advertisement._id.toString());
      fs.mkdirSync(advertisementDir, { recursive: true });

      // сохранение фото на сервер
      req.files.forEach(file => {
        fs.renameSync(
          path.join(config.storage, file.originalname),
          path.join(advertisementDir, file.originalname));
      });
      advertisement.images = req.files.map(file => path.join(advertisementDir, file.originalname));
    }

    await advertisement.save();
    return this.get(advertisement._id);
  } catch (error) {
    throw new ErrorHttp(500, `Ошибка создания объявления: ${error.message}`);
  }
}

  async get(id) {
    try {
      const advertisement = await AdvertisementModel
        .findById(id)
        .populate('userId', { name: 1 })
        .lean()
      if (!advertisement) {
        throw new ErrorHttp(404, `объявление не найдено`)
      }
      if (advertisement.isDeleted) {
        throw new ErrorHttp(410, `объявление удалено`)
      }
      return this.mapFields(advertisement)
    } catch (error) {
      throw new ErrorHttp(error.status || 500, `Ошибка при получении объявления ${id}: ${error.message}`)
    }
  }

/**
* Удаление объявления
*/  
async remove(id, user) {
    try {
        const advertisement = await AdvertisementModel
        .findById(id)
        .populate('userId', { email: 1 });

        if (!advertisement) {
          throw new ErrorHttp(404, `объявление не найдено`)
        }
        if (advertisement.isDeleted) {
          throw new ErrorHttp(410, `объявление уже удалено`)
        }
        if (advertisement.userId.email !== user.email) {
          throw new ErrorHttp(403, `Вы не являетесь автором объявления`)
        }

        //выставлять значение флага isDeleted = true
        advertisement.isDeleted = true;
        await advertisement.save();
    } catch (error) {
      throw new ErrorHttp(error.status || 500, `Ошибка удаления: ${error.message}`);
    }
  }
}

export default new AdvertisementService();
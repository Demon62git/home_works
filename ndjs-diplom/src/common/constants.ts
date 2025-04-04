/** Роли пользователей */
export enum USER_ROLES {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

/** константы - источник сообщения */
export enum MESSAGE_SRC {
  SUPPORT = 'support', // ответ от сотрудника
  USER = 'user', // сообщение/вопрос от автора обращения
}

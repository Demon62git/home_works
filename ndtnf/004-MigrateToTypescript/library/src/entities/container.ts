import { Container, decorate, injectable } from 'inversify'
import { BookService, UserService } from './index'

const container = new Container()

decorate(injectable(), BookService)
decorate(injectable(), UserService)
container.bind(BookService).toSelf()
container.bind(UserService).toSelf()

export default container

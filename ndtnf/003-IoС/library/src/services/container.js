import { Container, decorate, injectable } from 'inversify'
import { BookRepository } from './index.js'

const container = new Container()

decorate(injectable(), BookRepository)
container.bind(BookRepository).toSelf()

export default container

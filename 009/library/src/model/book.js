class Book {
    constructor(
      data
    ) {
      this.id = data.id,
      this.title = data.title,
      this.description = data.description,
      this.authors = data.authors,
      this.favorite = data.favorite,
      this.fileCover = data.fileCover,
      this.fileName = data.fileName,
      this.fileBook = data.fileBook,
      this.viewsCount = 0
    }
  }
  
  export default Book
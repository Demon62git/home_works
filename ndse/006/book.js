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
      this.fileName = data.fileName
    }
  }
  
  export default Book
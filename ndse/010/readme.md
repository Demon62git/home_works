
#### Задание:
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
 - запрос для *поиска* полей документов коллекции **books** по полю *title*,
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 


#### Решение:

* Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books:
```
db.books.insertMany( [ 
    { 
        title: "Унесённые ветром",
        description: "роман-эпопея",
        authors: "Маргарет Митчелл"
    }, 
    { 
        title: "Собор Парижской Богоматери",
        description: "роман-эпопея",
        authors: "Виктор Гюго"
    }, 
    { 
        title: "Властелин колец",
        description: "фэнтази",
        authors: "Дж . Р. Р. Толкин"
    }
] )
```

* Запрос для поиска полей документов коллекции books по полю title:
```
db.books.find( { title: "Унесённые ветром" } )
```

* Запрос для редактирования полей: description и authors коллекции books по _id записи:
```
db.books.updateOne( 
    { _id: 213 }, 
    { $set: { 
        description: "Новое описание",
        authors: "Новый автор"
            } 
    })
```
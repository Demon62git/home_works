   // init-mongo.js
   db = db.getSiblingDB('library');
   db.createCollection('books');
   
   // Начальные данные
   db.books.insertMany([
     { id: '1',
         title: 'Преступление и наказание',
          description: 'роман',
           authors: 'Фёдор Достоевский',
            favorite: 2,
             fileCover: 'Crime and punishment',
              fileName: 'Crime and punishment.txt' },
     { id: '2',
         title: 'Унесённые ветром',
          description: 'роман-эпопея',
           authors: 'Маргарет Митчелл',
            favorite: 4,
             fileCover: 'cover2.jpg',
              fileName: 'Gone with the Wind.txt' },
     { id: '3',
         title: 'Собор Парижской Богоматери',
          description: 'роман-эпопея',
           authors: 'Виктор Гюго',
            favorite: 5,
             fileCover: 'cover3.jpg',
              fileName: 'Notre-Dame de Paris' },
     { id: '4',
         title: 'Властелин колец',
          description: 'фэнтази',
           authors: 'Дж . Р. Р. Толкин',
            favorite: 5,
             fileCover: 'cover5.jpg',
              fileName: 'The Lord of the Rings.txt' },
     { id: '5',
         title: 'Одиссея капитана Блада',
          description: 'приключенческий роман',
           authors: 'Рафаэль Сабатини',
            favorite: 5,
             fileCover: 'cover6.jpg',
              fileName: 'Captain Blood His Odyssey.txt' },
   ]);

fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(item => console.log(item));



[
  {
    "id": 1,
    "title": "The post title  ",
    "body": "dskfj adskfjask djfakj slaskfjaos"
  },
  {
    "id": 2,
    "title": "2The post title ",
    "body": "2dskfj adskfjask djfakj slaskfjaos"
  },
  {
    "id": 3,
    "title": "3The post title",
    "body": "3dskfj adskfjask djfakj slaskfjaos"
  },
  {
    "id": 4,
    "title": "4The post title",
    "body": "3dskfj adskfjask djfakj slaskfjaos"
  }

]
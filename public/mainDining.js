// document.querySelector('.food').addEventListener('click', getResturants);
// const uL = document.querySelectorAll('#list');

// function getResturants() {
//   let zip = document.querySelector('.zip').value;
//   const url = `https://api.documenu.com/v2/restaurants/zip_code/${zip}?key=d2742dcef78e36acc44f109a098f3fb3&page=1`
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.data);
//       let restaurants = data.data
//       restaurants.forEach(item => {
//         let listItem = document.createElement('li')
//         let textItem = document.createTextNode(item.restaurant_name)
//         console.log(textItem);
//         listItem.appendChild(textItem)
//         document.getElementById('list').appendChild(listItem)
//       });
//     })
// }

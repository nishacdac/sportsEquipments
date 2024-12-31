// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })

// export class HomeComponent{
  
// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//   cards = [
//     { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Football_19June.jpg?v=1718773488&width=400' },
//     { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Background_Website_1920_X_633.jpg?v=1717828608&width=1944' },
//     { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Football_19June.jpg?v=1718773488&width=400' },
//     { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Football_19June.jpg?v=1718773488&width=400' },
//     { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Football_19June.jpg?v=1718773488&width=400' }
//   ];
// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = [
    { title: 'FOOTBALL', image: 'https://www.niviasports.com/cdn/shop/files/Football_19June.jpg?v=1718773488&width=400' },
    { title: 'BASKETBALL', image: 'https://www.niviasports.com/cdn/shop/files/Basketball.jpg?v=1718773488&width=400' },
    // { title: 'TENNIS', image: 'https://www.niviasports.com/cdn/shop/files/Tennis.jpg?v=1718773488&width=400' },
    { title: 'CRICKET', image: 'https://www.niviasports.com/cdn/shop/files/Cricket.jpg?v=1718773488&width=400' },
    { title: 'HOCKEY', image: 'https://media.istockphoto.com/id/1457057147/photo/sports-fitness-field-hockey-game-and-women-challenge-for-ball-in-stadium-competition-club.jpg?s=612x612&w=0&k=20&c=o41JWFRq1cUyko8a3BFxEp636vF3TmcjAOG42vsujnw=' },
    { title: 'VOLLEYBALL', image: 'https://www.niviasports.com/cdn/shop/files/Volleyball.jpg?v=1718773488&width=400' }
  ];
}

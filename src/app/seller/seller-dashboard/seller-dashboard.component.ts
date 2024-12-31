// import { Component, OnInit } from '@angular/core';
// import * as Highcharts from 'highcharts';
// import { SellerDashboardData } from '../../models/user';
// import { DataService } from '../../services/data.service';

// @Component({
//   selector: 'app-seller-dashboard',
//   templateUrl: './seller-dashboard.component.html',
//   styleUrls: ['./seller-dashboard.component.css']
// })
// export class SellerDashboardComponent implements OnInit {
//   Highcharts: typeof Highcharts = Highcharts; 
//   chartOptions ! : Highcharts.Options;
//   sellerData: SellerDashboardData[] = []; 

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//     const userId = 1; 
//     this.dataService.getSellerDashbaord(userId).subscribe(
//       (data: SellerDashboardData[]) => {
//         this.sellerData = data;
//         this.initChart(); 
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   private initChart(): void {
//     this.chartOptions = {
//       chart: {
//         type: 'column'
//       },
//       title: {
//         text: 'Product Quantity by Seller'
//       },
//       xAxis: {
//         categories: ['hh1','hh2','hh3','hh4'], 
//         title: {
//           text: 'Sellers'
//         }
//       },
//       yAxis: {
//         title: {
//           text: 'Quantity'
//         }
//       },
//       series: [
//         {
//           name: 'Quantity',
//           type: 'column',
//           data: [33,444,555,66]
//         }
//       ]
//     };
//   }
// }

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SellerDashboardData } from '../../models/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // Reference to Highcharts
  chartOptions!: Highcharts.Options; // Chart configuration
  sellerData: SellerDashboardData[] = []; // Dynamic data from the service

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const userId = 1; // Replace with dynamic user ID if needed
    this.dataService.getSellerDashbaord(userId).subscribe(
      (data: SellerDashboardData[]) => {
        this.sellerData = data; // Assign the fetched data
        this.initChart(); // Initialize the chart with the fetched data
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private initChart(): void {
    if (this.sellerData.length > 0) {
      console.log(this.sellerData); // Log the data to check if it’s correct

      // Map dynamic data into chart format
      const categories = this.sellerData.map(item => item.first_name); // Seller names for x-axis
      const data = this.sellerData.map(item => item.quantity); // Quantity for y-axis

      // Set the chart options
      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Product Quantity by Seller'
        },
        xAxis: {
          categories: categories, // Dynamic categories from seller data
          title: {
            text: 'Sellers'
          }
        },
        yAxis: {
          title: {
            text: 'Quantity'
          }
        },
        series: [
          {
            name: 'Quantity',
            type: 'column',
            data: data // Dynamic data from seller data
          }
        ]
      };

      // Create the chart using the options provided
      Highcharts.chart('chartContainer', this.chartOptions);
    }
  }
}

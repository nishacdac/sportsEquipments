import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('productChartReference', { static: false }) productChart: any;
  @ViewChild('productPieChartReference', { static: false }) productPieChart: any;

  // Chart configuration variables
  dataAdapter: any;
  xAxis: any;
  valueAxis: any;
  barChartSeriesGroups: any;
  pieChartSeriesGroups: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData() {
    this.dataService.getProductChart().subscribe((data: any) => {
      const chartSource = data.map((product: any) => ({
        product_name: product.product_name,
        total_quantity: product.total_quantity,
      }));

      // jqwidgets DataAdapter for the chart
      this.dataAdapter = new jqx.dataAdapter({
        localdata: chartSource,
        datatype: 'array',
        datafields: [
          { name: 'product_name', type: 'string' },
          { name: 'total_quantity', type: 'number' },
        ],
      });

      // X-Axis settings for bar chart
      this.xAxis = {
        dataField: 'product_name',
        displayText: 'Product Name',
        gridLines: { visible: true },
      };

      // Value axis settings for bar chart
      this.valueAxis = {
        minValue: 0,
        displayValueAxis: true,
        description: 'Total Quantity',
        axisSize: 'auto',
      };

      // Bar chart settings
      this.barChartSeriesGroups = [
        {
          type: 'column',
          series: [
            { dataField: 'total_quantity', displayText: 'Total Quantity' },
          ],
        },
      ];

      // Pie chart settings
      this.pieChartSeriesGroups = [
        {
          type: 'pie',
          showLabels: true,
          series: [
            {
              dataField: 'total_quantity',
              displayText: 'product_name',
              labelRadius: 120,
              initialAngle: 15,
              radius: 150,
              centerOffset: 0,
            },
          ],
        },
      ];
    });
  }
}

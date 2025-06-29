import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css";
import React from "react";
import { Chart } from 'primereact/chart';
import ReactDOM from "react-dom";



export function PieChart() {
    const chartData = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    }
    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }

    return(
        <div className="card p-d-flex p-jc-center">
            <Chart 
                type="pie" 
                data={chartData} 
                options={lightOptions} 
                style={{position:'relative',width:'40%'}} 
            />
        </div>
    );
}



ReactDOM.render(<PieChart/>, document.querySelector(".root"))
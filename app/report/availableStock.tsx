// @ts-ignore
'use client';
import React, { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';
import { IoMdDownload } from 'react-icons/io';
import { FaPrint } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';



export default function AvailableStock() {
    const [items, setItems] = useState([]); // State to store items
    const [itemName, setItemName] = useState('');
    const [month, setMonth] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [newSold, setNewSold] = useState(0);
    const [newGrowth, setNewGrowth] = useState(0);
    const [newVolume, setNewVolume] = useState(0);
    const [newAvailable, setNewAvailable] = useState(0);
    const [salesTrend, setSalesTrend] = useState([]);

    const handleNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleQuantityChange = (event, index) => {
        const newQuantityValue = parseInt(event.target.value, 10) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = newQuantityValue;
            return updatedItems;
        });
    };

    const handlePriceChange = (event, index) => {
        const newPriceValue = parseInt(event.target.value, 10) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].price = newPriceValue;
            return updatedItems;
        });
    };

    const handleSaleChange = (event, index) => {
        const newSoldValue = parseInt(event.target.value, 10) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].sold = newSoldValue;
            return updatedItems;
        });
        handleGrowthChange(index);
    };

    const handleGrowthChange = (index) => {
        const previousVolume = index > 0 ? items[index - 1].volume : 0;
        const currentVolume = items[index].price * items[index].sold;
        const currentGrowth = ((currentVolume - previousVolume) / previousVolume) * 100;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].growth = currentGrowth;
            return updatedItems;
        });
    };

    const handleVolumeChange = (event, index) => {
        const newVolumeValue = parseInt(event.target.value, 10) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].volume = newVolumeValue;
            return updatedItems;
        });
    };

    const handleAvailableChange = (event, index) => {
        const newAvailableValue = parseInt(event.target.value, 10) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].available = newAvailableValue;
            return updatedItems;
        });
    };

    const handleAddItem = () => {
        const newItem = {
          Month: month,  // Assign the selected month to the newItem
          quantity: newQuantity,
          price: newPrice,
          sold: newSold,
          growth: newGrowth,
          volume: newVolume,
          available: newAvailable,
          itemName: itemName,
        };
    
        setItems([...items, newItem]);
        clearInputFields();
      };  

    const clearInputFields = () => {
        setNewQuantity(0);
        setNewPrice(0);
        setItemName('');
        setMonth('');
        setNewSold(0);
        setNewGrowth(0);
        setNewVolume(0);
        setNewAvailable(0);
    };

    useEffect(() => {
        // Update salesTrend whenever items change
        const updatedSalesTrend = items.map((item) => ({
            Month: item.month,
            Sales: item.volume, // Assuming sales is based on the volume
            Profit: item.available * item.price, // Modify this based on your calculation
        }));
        setSalesTrend(updatedSalesTrend);
    }, [items]);

    //   DOWNLOAD 
    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    const downloadTextFile = () => {
        // Create text content based on user input
        const textContent = items.map(item => `
      Month: ${item.month}
      Quantity: ${item.quantity}
      Price: ${item.price}
      Sold: ${item.sold}
      Growth: ${item.growth}
      Volume: ${item.volume}
      Available: ${item.available}
      Item Name: ${item.itemName}
      
    `).join('\n');

        // Create Blob and download link
        const blob = new Blob(['\ufeff', textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sales Summary ' + Date.now() + '.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadCsvFile = () => {
        // CSV header
        const csvHeader = 'Month,Quantity,Price,Sold,Growth,Volume,Available,Item Name\n';

        // CSV content
        const csvContent = items.map(item => (
            `${item.month},${item.quantity},${item.price},${item.sold},${item.growth},${item.volume},${item.available},"${item.itemName}"`
        )).join('\n');

        // Combine header and content
        const csvData = csvHeader + csvContent;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create and trigger download link
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sales Summary ' + Date.now() + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const downloadExcelFile = () => {
        const itemsTable = `
    <table>
      <tr>
        <th>Month</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Sold</th>
        <th>Growth</th>
        <th>Volume</th>
        <th>Available</th>
        <th>Item Name</th>
      </tr>
      ${items.map(item => `
        <tr>
          <td>${item.month}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.sold}</td>
          <td>${item.growth}</td>
          <td>${item.volume}</td>
          <td>${item.available}</td>
          <td>${item.itemName}</td>
        </tr>`).join('')}
    </table>`;

        const content = `
    <html xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        ${itemsTable}
      </body>
    </html>`;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', content], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sales Summary ' + Date.now() + '.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadWordFile = () => {
        const itemsContent = items.map(item => `
    <tr>
      <td>${item.month}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${item.sold}</td>
      <td>${item.growth}</td>
      <td>${item.volume}</td>
      <td>${item.available}</td>
      <td>${item.itemName}</td>
    </tr>`).join('');

        const content = `
    <html xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th>Month</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Growth</th>
            <th>Volume</th>
            <th>Available</th>
            <th>Item Name</th>
          </tr>
          ${itemsContent}
        </table>
      </body>
    </html>`;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sales Summary ' + Date.now() + '.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main>
            <div className="export">
                <div className="row">
                    <div className="col-6">
                    </div>
                    <div className="col-6">
                        <Dropdown>
                            <span><MenuButton variant="outlined"><IoMdDownload /></MenuButton></span>
                            <Menu>
                                <MenuItem onClick={downloadTextFile}>Text format</MenuItem>
                                <MenuItem onClick={downloadCsvFile}>CSV format</MenuItem>
                                <MenuItem onClick={downloadExcelFile}>Excel format</MenuItem>
                                <MenuItem onClick={downloadWordFile}>Word format</MenuItem>
                            </Menu>
                        </Dropdown>
                        <span onClick={Print}><Button variant="outlined"><FaPrint /></Button></span>
                    </div>
                </div>
            </div>
            <Card className="mt-6" id='printablediv'>
                <Title>Sales Summary</Title>
                <Card>
                    <form>
                        <div className="userDetails">
                            <div className="col-4">
                                <label htmlFor="itemName" className="form-label">
                                    Item name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemName"
                                    name="itemName"
                                    placeholder="Item name"
                                    onChange={handleNameChange}
                                    value={itemName}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="stockTableHeader">
                            <div className="row">
                                <div className="col-1">
                                    <p>Month</p>
                                </div>
                                <div className="col-2">
                                    <p>Quantity</p>
                                </div>
                                <div className="col-2">
                                    <p>Price per unit(₦)</p>
                                </div>
                                <div className="col-2">
                                    <p>Number sold</p>
                                </div>
                                <div className="col-1">
                                    <p>Growth (%)</p>
                                </div>
                                <div className="col-2">
                                    <p>Sales Volume (₦)</p>
                                </div>
                                <div className="col-2">
                                    <p>Available Stock</p>
                                </div>
                            </div>
                        </div>

                        <div className="tableBody">
                            {items.map((item, index) => (
                                <div key={index} className="row tableBodyRow">
                                    <div className="col-1">
                                    <Select
                                        placeholder="Month"
                                        name={`month-${index}`}
                                        value={item.Month} // Use item.Month instead of item.month
                                        onChange={(event) => {
                                        if (event && event.target) {
                                            setMonth(event.target.value);
                                            handleQuantityChange(event, index);
                                        }
                                        }}
                                        required
                                    >
                                            <Option value="january">January</Option>
                                            <Option value="february">February</Option>
                                            <Option value="march">March</Option>
                                            <Option value="april">April</Option>
                                            <Option value="may">May</Option>
                                            <Option value="june">June</Option>
                                            <Option value="july">July</Option>
                                            <Option value="august">August</Option>
                                            <Option value="september">September</Option>
                                            <Option value="october">October</Option>
                                            <Option value="november">November</Option>
                                            <Option value="december">December</Option>
                                        </Select>
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="quantity"
                                            placeholder="0"
                                            aria-label="quantity"
                                            value={item.quantity}
                                            onChange={(event) => handleQuantityChange(event, index)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="price"
                                            placeholder="0"
                                            aria-label="price"
                                            value={item.price}
                                            onChange={(event) => handlePriceChange(event, index)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="sold"
                                            placeholder="0"
                                            aria-label="sold"
                                            value={item.sold}
                                            onChange={(event) => handleSaleChange(event, index)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="growth"
                                            placeholder="0"
                                            aria-label="growth"
                                            value={item.growth}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="volume"
                                            placeholder="0"
                                            aria-label="volume"
                                            value={item.volume}
                                            onChange={(event) => handleVolumeChange(event, index)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="available"
                                            placeholder="0"
                                            aria-label="available"
                                            value={item.available}
                                            onChange={(event) => handleAvailableChange(event, index)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-primary mt-3" type="button" onClick={handleAddItem}>
                                &#43; Add item
                            </button>
                        </div>
                    </form>
                </Card>
                <Card className="mt-8">
                    <Title>Sales trend</Title>
                    <Text>Comparison between Sales and Profit</Text>
                    <AreaChart
                        className="mt-4 h-80"
                        data={salesTrend}
                        categories={['Sales', 'Profit']}
                        index="Month"
                        colors={['indigo', 'fuchsia']}
                        valueFormatter={(number) => `₦ ${Intl.NumberFormat('us').format(number).toString()}`}
                        yAxisWidth={60}
                    />
                </Card>
            </Card>
        </main>
    );
}

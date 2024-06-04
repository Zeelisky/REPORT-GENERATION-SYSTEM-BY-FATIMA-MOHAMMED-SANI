// @ts-ignore
'use client';

import { useState } from 'react';
import { Card } from '@tremor/react';
import { IoMdDownload } from 'react-icons/io';
import { FaPrint } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Button from '@mui/joy/Button';



export default function IndexPage() {
    const [items, setItems] = useState([]); // State to store items
    const [quantity, setQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [amount, setAmount] = useState(0);
    // state for other input fields
    const [userDetails, setUserDetails] = useState({
        userName: '',
        billingDate: '',
        dueDate: '',
        paymentTerms: '',
        note: '',
    });

    const handleUserDetailsChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10) || 0;
        setQuantity(newQuantity);
        updateAmount(newQuantity, rate);
        console.log('quantity is : ', newQuantity);
    };

    const handleRateChange = (event) => {
        const newRate = parseInt(event.target.value, 10) || 0;
        setRate(newRate);
        updateAmount(quantity, newRate);
    };

    const updateAmount = (newQuantity, newRate) => {
        const newAmount = newQuantity * newRate;
        setAmount(newAmount);
    };

    const handleAddItem = () => {
        const newItem = {
            description: '',
            quantity: quantity,
            rate: rate,
            amount: amount,
        };

        setItems([...items, newItem]); // Add the new item to the items array
        clearInputFields(); // Clear input fields after adding an item
    };

    const clearInputFields = () => {
        setQuantity(0);
        setRate(0);
        setAmount(0);
    };

    const calculateSubtotal = () => {
        // Calculate the total amount by summing up all item amounts
        return items.reduce((total, item) => total + item.amount, 0);
    };

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
        const itemsContent = items.map(item => `
            Description: ${item.description}
            Quantity: ${item.quantity}
            Rate (₦): ${item.rate}
            Amount (₦): ${item.amount}
        `).join('\n');

        const textContent = `
            Invoice System by Fatima Mohammed Sani
    
            Bill to: ${userDetails.userName}
            Billing date: ${userDetails.billingDate}
            Due date: ${userDetails.dueDate}
            Payment terms: ${userDetails.paymentTerms}
    
            Item Details:
            ${itemsContent}
    
            Note: ${userDetails.note}
            Subtotal (₦): ${calculateSubtotal()}
        `;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Invoice ' + Date.now() + '.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadCsvFile = () => {
        // Create CSV content based on user input
        const csvContent = items.map(item => `
            Description: ${item.description}
            Quantity: ${item.quantity}
            Rate (₦): ${item.rate}
            Amount (₦): ${item.amount}
        `).join('\n');

        const textContent = `
            Invoice system by Fatima Mohammed Sani

            Bill to: ${userDetails.userName}
            Billing date: ${userDetails.billingDate}
            Due date: ${userDetails.dueDate}
            Payment terms: ${userDetails.paymentTerms}
    
            Item Details:
            ${csvContent}
    
            Note: ${userDetails.note}
            Subtotal (₦): ${calculateSubtotal()}
        `;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', textContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Invoice ' + Date.now() + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadExcelFile = () => {
        const itemsTable = `
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate (₦)</th>
                        <th>Amount (₦)</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map((item, index) => `
                        <tr key=${index}>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>${item.rate}</td>
                            <td>${item.amount}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    
        // Generate HTML content based on user input
        const content = `
            <h4>Invoice system by Fatima Mohammed Sani</h4>
            <div class="userDetails">
                <p><strong>Bill to:</strong> ${userDetails.userName}</p>
                <p><strong>Billing date:</strong> ${userDetails.billingDate}</p>
                <p><strong>Due date:</strong> ${userDetails.dueDate}</p>
                <p><strong>Payment terms:</strong> ${userDetails.paymentTerms}</p>
            </div>
            <hr />
            <div class="tableBody">
                ${itemsTable}
            </div>
            <div class="tableFooter">
                <div class="row">
                    <div class="col-6">
                        <p><strong>Note:</strong> ${userDetails.note}</p>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-2">
                        <p><strong>Subtotal (₦):</strong> ${calculateSubtotal()}</p>
                    </div>
                </div>
            </div>
        `;
    
        // Create Blob and download link
        const blob = new Blob(['\ufeff', content], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Invoice ' + Date.now() + '.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    const downloadWordFile = () => {
        const itemsContent = items.map((item, index) => `
            Description: ${item.description}
            Quantity: ${item.quantity}
            Rate (₦): ${item.rate}
            Amount (₦): ${item.amount}
        `).join('\n');

        const content = `
            Invoice system by Fatima Mohammed Sani

            Bill to: ${userDetails.userName}
            Billing date: ${userDetails.billingDate}
            Due date: ${userDetails.dueDate}
            Payment terms: ${userDetails.paymentTerms}
    
            Item Details:
            ${itemsContent}
    
            Note: ${userDetails.note}
            Subtotal (₦): ${calculateSubtotal()}
        `;

        // Create Blob and download link
        const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Invoice ' + Date.now() + '.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="export">
                <div className="row">
                    <div className="col-6">
                        <h5>Create new invoice</h5>
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
                <h2>Invoice</h2>

                <Card>
                    <form>
                        <div className="userDetails">
                            <div className="row">
                                <div className="col-4">
                                    <label htmlFor="userName" className="form-label">Bill to: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        name="userName"
                                        value={userDetails.userName}
                                        onChange={handleUserDetailsChange}
                                        placeholder="Enter recipient's name"
                                    />
                                </div>
                                <div className="col-2">
                                    <label htmlFor="date" className="form-label">Billing date: </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="billingDate"
                                        value={userDetails.billingDate}
                                        onChange={handleUserDetailsChange}
                                    />
                                </div>
                                <div className="col-2">
                                    <label htmlFor="date" className="form-label">Due date: </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="dueDate"
                                        value={userDetails.dueDate}
                                        onChange={handleUserDetailsChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="paymentTerms" className="form-label">Payment terms: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="paymentTerms"
                                        name="paymentTerms"
                                        value={userDetails.paymentTerms}
                                        onChange={handleUserDetailsChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className='invoice-hr'/>
                        <div className='tableHeader'>
                            <div className="row">
                                <div className="col-6">
                                    <p>Item</p>
                                </div>
                                <div className="col-2">
                                    <p>Quantity</p>
                                </div>
                                <div className="col-2">
                                    <p>Rate (₦)</p>
                                </div>
                                <div className="col-2">
                                    <p>Amount (₦)</p>
                                </div>
                            </div>
                        </div>

                        <div className="tableBody">
                            {items.map((item, index) => (
                                <div key={index} className="row tableBodyRow">
                                    <div className="col-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="description"
                                            placeholder="Description of item or product"
                                            aria-label="description"
                                            value={item.description}
                                            onChange={(e) => {
                                                const updatedItems = [...items];
                                                updatedItems[index].description = e.target.value;
                                                setItems(updatedItems);
                                            }}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="quantity"
                                            placeholder="0"
                                            aria-label="quantity"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const updatedItems = [...items];
                                                updatedItems[index].quantity = parseInt(e.target.value, 10) || 0;
                                                updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
                                                setItems(updatedItems);
                                            }}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="rate"
                                            placeholder="0"
                                            aria-label="rate"
                                            value={item.rate}
                                            onChange={(e) => {
                                                const updatedItems = [...items];
                                                updatedItems[index].rate = parseInt(e.target.value, 10) || 0;
                                                updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
                                                setItems(updatedItems);
                                            }}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="amount"
                                            placeholder="0"
                                            aria-label="amount"
                                            value={item.amount}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                className="btn btn-primary mt-3"
                                type="button"
                                onClick={handleAddItem}
                            >
                                &#43; Add item
                            </button>
                        </div>

                        <div className="tableFooter">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="note" className="form-label">Note: </label>
                                    <textarea
                                        className="form-control"
                                        id="note"
                                        name="note"
                                        value={userDetails.note}
                                        onChange={handleUserDetailsChange}
                                        placeholder="Any relevant additional information"
                                    ></textarea>
                                </div>
                                <div className="col-4"></div>
                                <div className="col-2">
                                    <label htmlFor="subtotal" className="form-label">
                                        Subtotal (₦)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="subtotal"
                                        placeholder="0"
                                        value={calculateSubtotal()} // Display the calculated subtotal
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </Card>
        </main>
    );
}

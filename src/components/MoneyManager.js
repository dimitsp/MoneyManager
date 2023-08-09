import React, { useState, useEffect } from 'react';
import { IonButton, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import  './MoneyManager.css';
import {
  IonFabButton,
  IonFab,
  IonIcon,
  IonFabList
}
  from '@ionic/react';
  import {
    settingsOutline,
   
    refreshSharp,
    saveOutline,
    
  } from 'ionicons/icons';

function MoneyManager() {
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceColor, setBalanceColor] =useState('#0fc457'); //#2ecc71
  
 

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedIncomes = localStorage.getItem('incomes');
    const storedExpenses = localStorage.getItem('expenses');
    const storedColor = localStorage.getItem('color');
   
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
    if (storedIncomes) {
      setIncomes(parseFloat(storedIncomes));
    }
    if (storedExpenses) {
      setExpenses(parseFloat(storedExpenses));
    }
    if (storedColor) {
      setBalanceColor((storedColor));
    }
   
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('incomes', incomes);
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', expenses);
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('color', balanceColor);
  }, [balanceColor]);

  const saveBalanceHistory = () => {
    const now = new Date();
    const savedBalanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
    savedBalanceHistory.push({ date: now.toISOString(), balance });
    localStorage.setItem('balanceHistory', JSON.stringify(savedBalanceHistory));
    alert('Balance history saved!');
  };
  const saveBalanceHistoryAuto = () => {
    const now = new Date();
    const savedBalanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
  
    // Get the last day of the current month
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
    // Check if today is the last day of the month
    if (now.getDate() === lastDayOfMonth) {
      savedBalanceHistory.push({ date: now.toISOString(), balance });
      localStorage.setItem('balanceHistory', JSON.stringify(savedBalanceHistory));
      alert('End of month! Balance saved to history!');
      handleClear();
    }
  };
  
  // Run the saveBalanceHistory function every day at midnight
  setInterval(() => {
    saveBalanceHistoryAuto();
  }, 24 * 60 * 60 * 1000);
  
      
  


  const currentDate = new Date();
  const today = currentDate.getDate()+ '-' + (currentDate.getMonth() + 1) + '-' +currentDate.getFullYear() ;

  function handleAddIncome(event) {
    event.preventDefault();
    const amount = parseFloat(event.target.amount.value);
    setIncomes(incomes + amount);
    setBalance(balance + amount);
    
    (balance + amount) >= 0 ? setBalanceColor('#0fc457') : setBalanceColor('#FF3357');
     
    event.target.reset();
  }

  function handleAddExpense(event) {
    event.preventDefault();
    const amount = parseFloat(event.target.amount.value);
    setExpenses(expenses + amount);
    setBalance(balance - amount);
   
    (balance - amount) < 0 ? setBalanceColor('#FF3357') : setBalanceColor('#0fc457');
   
    event.target.reset();
  }

  const handleClear =() =>{
    setBalance(0)
    setExpenses(0)
    setIncomes(0)
    setBalanceColor('#0fc457')
  }

  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle >Money Manager</IonTitle>
        </IonToolbar>  
      </IonHeader>
       <IonLabel className='dateStyle'>{today}</IonLabel>
      <IonContent className="ion-padding"> 
    
        <form onSubmit={handleAddIncome}>
          <IonItem>
            <IonLabel  position="floating" style={{ color:'#ffffff' }}>Income:</IonLabel>
            <IonInput color="success" className='custom-input' style={{ color:'#FAC305' }} type="number" name="amount" step='0.01'/>
          </IonItem>
          <IonButton type="submit">Add Income</IonButton>
        </form>
        <form onSubmit={handleAddExpense}>
          <IonItem>
            <IonLabel  position="floating" style={{ color:'#ffffff' }}>Expense:</IonLabel>
            <IonInput color="success" className='custom-input' style={{ color:'#FAC305' }} type="number" name="amount" step='0.01' />
          </IonItem>
          <IonButton type="submit">Add Expense</IonButton>
        </form>
        
      <p>Incomes Total: {incomes.toFixed(2)}</p>
      <p> Expenses Total : {expenses.toFixed(2)}</p>

        {/* <h2>Balance: {balance.toFixed(2)}</h2> */}
        <h2 style={{ color: `${balanceColor}` }}>Balance: {balance.toFixed(2)}</h2>
        {/* <IonButton className='reset-button' type="submit" onClick={handleClear}>Reset</IonButton> */}

     {/* <IonButton type="submit" onClick={saveBalanceHistory}>Save to history</IonButton> */}
     <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={settingsOutline}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton  type="submit" onClick={handleClear}>
              <IonIcon icon={refreshSharp}></IonIcon>
            </IonFabButton>
            <IonFabButton type="submit" onClick={saveBalanceHistory}>
              <IonIcon icon={saveOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent> 
    </IonPage>
   
  );
}

export default MoneyManager;

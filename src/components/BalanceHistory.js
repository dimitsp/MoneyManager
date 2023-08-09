
import React from 'react';
import { IonHeader, IonPage ,IonTitle, IonToolbar, IonContent, IonButton, IonList, IonItem } from '@ionic/react';
import { useState, useEffect } from 'react';

// import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
// import { FileOpener } from '@ionic-native/file-opener';






import './BalanceHistory.css';


const BalanceHistory = ( ) => {

  const [balanceHistory, setBalanceHistory] = useState([]);
  // const savedBalanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
 
  const handleClearHistory =() =>{
    localStorage.removeItem('balanceHistory');
    setBalanceHistory([]);
  } 

  //auto-update data on an Ionic React page without refreshing the page
  useEffect(() => {
    const intervalId = setInterval(() => {
        const savedBalanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
        setBalanceHistory(savedBalanceHistory);

    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);


  //------------convert the data --------------//
  // const convertToCSV = () => {
  //   const csvRows = [];
  //   const headers = ['Date', 'Amount'];
  
  //   // Add headers to CSV rows
  //   csvRows.push(headers.join(','));
  
  //   // Add balance history data to CSV rows
  //   balanceHistory.forEach((entry) => {
  //     const formattedDate = new Date(entry.date).toLocaleDateString(); // Format date without time
  //     const formattedAmount = entry.balance.toFixed(2); // Format balance with two decimal places
  
  //     const row = [
  //       formattedDate,
  //       formattedAmount,
  //     ];
  //     csvRows.push(row.join(','));
  //   });
  // console.log(csvRows.join('\n'));
  //   // Combine all rows into a single CSV string
  //   return csvRows.join('\n');
  // };
   
    
  

  // --------- handleExportCsv -------------//

  // const handleExportCSV = async () => {
  //   const csvData = convertToCSV();
  //   const fileName = 'balance_history.csv';
  
  //   try {
  //     // Save the CSV file
  //     const result = await Filesystem.writeFile({
  //       path: fileName,
  //       data: csvData,
  //       directory: FilesystemDirectory.Documents,
  //       encoding: FilesystemEncoding.UTF8,
  //     });
  
  //     // Get the file URI
  //     const fileUri = result.uri;
  
  //     // Open the file and share it
  //     await FileOpener.open({ path: fileUri, uti: 'text/csv' });
  //   } catch (error) {
  //     console.error('Error saving/opening file:', error);
  //   }
  // };
  

  // ..

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle>Balance History</IonTitle> 
      </IonToolbar>
      </IonHeader>
      <div className='bh-btn' style={{margin:'0'}}>
         <IonButton type="submit" onClick={handleClearHistory}>clear History</IonButton>
         {/* <IonButton
            onClick={handleExportCSV}
          >
          Export
          </IonButton> */}
     
      </div>
     
      <IonContent>
      <IonList>
        {balanceHistory.map((item) => (
          <IonItem key={item.date}>
            Date: {new Date(item.date).toLocaleDateString()} | Balance: {item.balance.toFixed(2)}
          </IonItem>
        ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default BalanceHistory;



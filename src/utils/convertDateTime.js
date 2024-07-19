function convertDateTime (dbDate){
    const date = new Date(dbDate);
  
    // Format the date and time
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate + ' : ' + formattedTime;
  };
  export {convertDateTime};
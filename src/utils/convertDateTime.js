function convertDateTimeUTC (dbDate){
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

  function convertDateTime(dbDate) {
    const date = new Date(dbDate);
  
    // Manually adjust the time by subtracting 5 hours and 30 minutes
    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);
  
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
  
    return `${formattedDate} : ${formattedTime}`;
  }
  
  export { convertDateTime,convertDateTimeUTC };
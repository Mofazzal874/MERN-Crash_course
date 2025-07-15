// to understand asynchronous JavaScript, we need to understand how callback functions work.

// ->A callback function is a function that is passed as an argument to another function and is executed after the completion of that function.


function fetchData(callback) { 
    setTimeout(() => {
        const data = { id: 1, name: 'John Doe' };
        callback(data); // Call the callback function with the fetched data
    }, 2000); // Simulate a delay of 2 seconds
}


function processData(data) {
    console.log('Processing data:', data);
}
// Call fetchData and pass processData
fetchData(processData); // processData will be called after fetchData completes
// Output after 2 seconds: Processing data: { id: 1, name: 'John Doe' }


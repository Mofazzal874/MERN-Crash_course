const domContainer = document.querySelector('#root');

const Fruits = () => {
    const [fruit, setFruit] = React.useState(''); // initially no fruit entered by default
    const [fruits, setFruits] = React.useState(['Abul', 'Babul', 'Dabul', 'Eabul', 'Fabul']); // initial list of fruits

    // Function to add a new fruit
    const AddFruit = () => {
        if (fruit !== '') { // Ensure the input field is not empty
            setFruits([...fruits, fruit]);  // Add the new fruit to the list
            setFruit(''); // Clear the input field after adding
        }
    };

    return (
        <div className='container'>
            <h1>Fruit display</h1>

            {/* Display the list of sorted fruits */}
            <ul id='fruits'>
                {fruits.sort().map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>

            <br />

            {/* Input field to enter a new fruit */}
            <input
                type='text'
                value={fruit}
                onChange={(e) => setFruit(e.target.value)} // Update the fruit state on input change
                placeholder='Enter a Fruit'
            />

            {/* Button to add the new fruit */}
            <button id='button' onClick={AddFruit}>Add Fruit</button>
        </div>
    );
};

// Rendering the component to the root DOM element
ReactDOM.render(<Fruits />, domContainer);

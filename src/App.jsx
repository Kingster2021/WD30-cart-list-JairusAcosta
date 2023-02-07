import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([]);

	const [inputValue, setInputValue] = useState("");
	const [totalItemCount, setTotalItemCount] = useState(0);

	const handleAddButtonClick = () => {
		if (inputValue == "") {''}
    else{
    const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue("");
		setTotalItemCount(totalItemCount + 1);
	}
};
	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		if (newItems[index].quantity <= 1){
      newItems[index].quantity = 1;
    } else {
      newItems[index].quantity--;
    }
    setItems(newItems);
    calculateTotal();
	};

	const toggleComplete = (index) => {
		const newItems = [...items];
		newItems[index].isSelected = !newItems[index].isSelected;
		setItems(newItems);
	};

	const calculateTotal = () => {
		let total;
    total = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(total)
	};

  const deleteItem = (index) => {
    const newItems = [...items];
    const deletedItem = newItems.splice(index, 1)[0];
    setItems(newItems);
    setTotalItemCount((prevCount) => prevCount - deletedItem.quantity);
  };

	return (
		<div className='app-background'>
			<div className='main-container'>
        <h1>Cart List</h1>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Write some list here' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} style={{cursor:"pointer"}}/>
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
								</button>
                <div className="trash">
                      <button
                        onClick={() => deleteItem(index)}
                        type="button"
                        className="delbtn">
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import AddChore from './AddChore.js';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './stylesheets/choreList.css';


// Table data as an array of objects
const list = [
	{ name: 'Brian Vaughn', description: 'Software engineer' }
];

class ChoreList extends React.Component {

	render() {
		return (
			<section className="choreSection">
				<div>
					<AddChore />
				</div>
				<div className='choreSection'>
					<Table
						width={1000}
						height={1000}
						headerHeight={20}
						rowHeight={100}
						rowCount={list.length}
						rowGetter={({ index }) => list[index]}
					>
						<Column
							label='Name'
							dataKey='name'
							width={100}
						/>
						<Column
							width={200}
							label='Description'
							dataKey='description'
						/>
					</Table>
				</div>
			</section>
		);
	}
}

export default ChoreList;
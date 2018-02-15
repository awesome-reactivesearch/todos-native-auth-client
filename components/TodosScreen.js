/* eslint-disable */
import React from 'react';

import TodosContainer from './TodosContainer';

const TodosScreen = props => <TodosContainer screen={props.navigation.state.key} {...props} />;

export default TodosScreen;

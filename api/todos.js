import CONFIG from './../constants/Config';

const getHeaders = (accessToken) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken}`
});

const logger = message => console.log(message);

class TodoModel {
  constructor(key) {
    this.key = key;
    this.todos = [];
    this.onChanges = [];
    this.appbaseRef = new Appbase({
      url: CONFIG.url,
      app: CONFIG.app,
      credentials: CONFIG.credentials,
      type: CONFIG.type,
    });
  }

  add(todo, screenProps) {
    if (!screenProps.accessToken) {
      console.log('Access Token not present');
      return;
    }
    const body = JSON.stringify({
      title: todo.title,
      name: screenProps.name,
      avatar: screenProps.avatar
    });

    fetch(CONFIG.server, {
      method: 'POST',
      headers: getHeaders(screenProps.accessToken),
      body
    })
      .then(res => res.json())
      .then(logger)
      .catch(logger);
  }

  update = (todo, screenProps) => {
    if (!screenProps.accessToken) {
      console.log('Access Token not present');
      return;
    }
    const body = JSON.stringify({
        completed: todo.completed,
        id: todo._id
    });

    fetch(CONFIG.server, {
      method: 'PUT',
      headers: getHeaders(screenProps.accessToken),
      body
    })
      .then(res => res.json())
      .then(logger)
      .catch(logger);
  };

  destroy = (todo, screenProps) => {
    if (!screenProps.accessToken) {
      console.log('Access Token not present');
      return;
    }
    const body = JSON.stringify({
      id: todo._id
    });

    fetch(CONFIG.server, {
      method: 'DELETE',
      headers: getHeaders(screenProps.accessToken),
      body
    })
      .then(res => res.json())
      .then(logger)
      .catch(logger);
  };
}

export default TodoModel;

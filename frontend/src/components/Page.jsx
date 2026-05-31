import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

function Page() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTodos() {
      try {
        const { data, error } = await supabase.from('todos').select();

        if (error) {
          setError('Error fetching todos: ' + error.message);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          setTodos(data);
        } else {
          setError('No todos found.');
        }
      } catch (err) {
        setError('An unexpected error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li> // Assuming 'task' is the name of the column
        ))}
      </ul>
    </div>
  );
}

export default Page;

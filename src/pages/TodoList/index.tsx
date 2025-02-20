import React, { useState, useEffect } from 'react';
import { Button, Input, List, Checkbox } from 'antd';

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<{ text: string; completed: boolean; dueDate: string }[]>([]);
    const [input, setInput] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Load danh sách từ localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Lưu danh sách vào localStorage khi có thay đổi
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (input.trim() !== '' && dueDate.trim() !== '') {
            setTasks([...tasks, { text: input, completed: false, dueDate }]);
            setInput('');
            setDueDate('');
        }
    };

    const toggleComplete = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const removeTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <h2>📝 Todo List</h2>
            <Input
                placeholder="Nhập công việc..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Input
                placeholder="Nhập ngày giờ (VD: 20/02/2025 14:30)"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Button type="primary" onClick={addTask} block>
                Thêm công việc
            </Button>
            <List
                bordered
                dataSource={tasks}
                renderItem={(task, index) => (
                    <List.Item
                        actions={[
                            <Button danger onClick={() => removeTask(index)} size="small">
                                Xóa
                            </Button>,
                        ]}
                    >
                        <Checkbox checked={task.completed} onChange={() => toggleComplete(index)}>
                            {task.text} - 🕒 {task.dueDate}
                        </Checkbox>
                    </List.Item>
                )}
                style={{ marginTop: 10 }}
            />
        </div>
    );
};

export default TodoList;

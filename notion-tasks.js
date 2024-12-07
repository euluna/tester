const NOTION_API_KEY = config.NOTION_API_KEY; // Secure API key in a config file
const NOTION_DATABASE_ID = config.NOTION_DATABASE_ID; // Secure Database ID

async function fetchTasks() {
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
            },
        });
        const data = await response.json();

        if (response.ok) {
            displayTasks(data.results);
        } else {
            console.error('Error fetching tasks:', data);
            alert('Failed to fetch tasks. Check the console for details.');
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Failed to fetch tasks. Please try again.');
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    if (!taskList) {
        console.warn('No task list element found in the DOM.');
        return;
    }

    taskList.innerHTML = '';

    tasks.forEach(task => {
        const name = task.properties.Name?.title[0]?.text?.content || 'No Name';
        const description = task.properties.Description?.rich_text[0]?.text?.content || 'No Description';
        const date = task.properties.Date?.date?.start || 'No Date';
        const tags = (task.properties.Tag?.multi_select || []).map(tag => tag.name).join(', ') || 'No Tags';

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Tags:</strong> ${tags}</p>
        `;
        taskList.appendChild(taskItem);
    });
}

async function addTask(name, description = '', date = '', tags = '') {
    if (!name) {
        alert('Task name is required!');
        return;
    }

    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    try {
        const response = await fetch(`https://api.notion.com/v1/pages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
            },
            body: JSON.stringify({
                parent: { database_id: NOTION_DATABASE_ID },
                properties: {
                    Name: { title: [{ text: { content: name } }] },
                    Description: { rich_text: [{ text: { content: description } }] },
                    Date: date ? { date: { start: date } } : undefined,
                    Tag: tagArray.length ? { multi_select: tagArray.map(tag => ({ name: tag })) } : undefined,
                },
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Task "${name}" added successfully!`);
            fetchTasks();
        } else {
            console.error('Error adding task:', data);
            alert('Failed to add task. Check the console for details.');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    const addTaskButton = document.getElementById('addTaskButton');
    if (addTaskButton) {
        addTaskButton.onclick = () => {
            const name = prompt('Enter task name:');
            if (!name) {
                alert('Task name is required!');
                return;
            }

            const description = prompt('Enter task description (optional):');
            const tags = prompt('Enter tags (comma-separated, optional):');

            let date = prompt('Enter the due date (YYYY-MM-DD):');
            if (date) {
                const isValidDate = Date.parse(date);
                if (!isValidDate) {
                    alert('Invalid date format! Please enter the date as YYYY-MM-DD.');
                    return;
                }
                date = new Date(date).toISOString();
            }

            addTask(name, description, date, tags);
        };
    }
});


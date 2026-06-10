// src/controllers/taskController.js
import pool from '../config/db.js';

// 1. CREATE TASK
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id; 
    try {
        const newTask = await pool.query(
            "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, description]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Task create nahi ho saka!" });
    }
};

// 2. GET ALL TASKS (Sirf login kiye hue user ke)
export const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        res.json(tasks.rows);
    } catch (err) {
        res.status(500).json({ error: "Tasks fetch nahi ho sake!" });
    }
};

// 3. UPDATE TASK
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id;
    try {
        const updatedTask = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [title, description, status, id, userId]
        );
        if (updatedTask.rows.length === 0) return res.status(404).json({ error: "Task nahi mila ya ijazat nahi hai!" });
        res.json(updatedTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Task update nahi ho saka!" });
    }
};

// 4. DELETE TASK
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deleted = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
        if (deleted.rows.length === 0) return res.status(404).json({ error: "Task nahi mila!" });
        res.json({ message: "Task delete ho gaya! 🗑️" });
    } catch (err) {
        res.status(500).json({ error: "Task delete nahi ho saka!" });
    }
};
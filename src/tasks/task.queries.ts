export const taskQueries = {
    readAllTasksByListID: `
        SELECT * 
        FROM \`cst-391-milestone\`.tasks
        WHERE listID = ?
        `,
    readTaskByTaskID: `
        SELECT * 
        FROM \`cst-391-milestone\`.tasks
        WHERE taskID = ?
        `,
    createTask: `
        INSERT INTO \`cst-391-milestone\`.tasks (listID, task_title, due_date, task_note) VALUES (?, ?, ?, ?)
        `,
    updateTask: `
        UPDATE \`cst-391-milestone\`.tasks
        SET listID = ?, task_title = ?, due_date = ?, task_note = ? 
        WHERE taskID = ?
    `,
    deleteTask: `
        DELETE FROM \`cst-391-milestone\`.tasks
        WHERE taskID = ?
    `,
}
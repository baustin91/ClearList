export const listQueries = {
    readAllListsByUserID: `
        SELECT * 
        FROM \`cst-391-milestone\`.lists
        WHERE userID = ?
        `,
    readListByListID: `
        SELECT * 
        FROM \`cst-391-milestone\`.lists
        WHERE listID = ?
        `,
    createList: `
        INSERT INTO \`cst-391-milestone\`.lists (userID, list_title) VALUES (?, ?)
        `,
    updateList: `
        UPDATE \`cst-391-milestone\`.lists SET list_title = ? 
        WHERE listID = ?
    `,
    deleteList: `
        DELETE FROM \`cst-391-milestone\`.lists
        WHERE listID = ?
    `,
}
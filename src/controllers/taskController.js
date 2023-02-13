const config = require("../config");

const db = require("mysql2/promise");
const pool = db.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  database: config.DB_NAME
});

// const index = async (req, res)=>{
//     await req.getConnection((err, conn)=>{
//         conn.query("SELECT * FROM tasks", (err, tasks)=>{
//             if(err){
//                 res.json(err);
//             }
//             res.render("tasks/index",{tasks});
//             // console.log(tasks);
//             // res.json(tasks);

//         })
//     })
    
// }

const index = async (req, res)=>{
    const [tasks] = await pool.query('SELECT * FROM tasks')
    // res.json(rows)
    res.render("tasks/index", {tasks});
}

// Para form de crear una tarea
const create = (req, res)=>{
    res.render("tasks/create");
}

// Para Almacenar las tareas
const store = async (req, res)=>{

    const data = req.body;
    // console.log(data);
    const result = await pool.query("INSERT INTO tasks SET ?", [data]);
    res.json(result)

}

// Para Eliminar una tarea
const destroy = async (req, res)=>{

    const id = req.body.id;
    // console.log(id);
    await pool.query("DELETE FROM tasks where task_id = ?", [id]);
    res.redirect("/tasks");

}

// Para form de Editar una tarea
const edit = async (req, res)=>{
    const id = req.params.id;

    const tasks = await pool.query("SELECT * FROM tasks WHERE task_id = ?", [id]);
    res.render("tasks/edit", {tasks: tasks[0]});

}

// Para guardar los cambios de las tareas
const update = async (req, res)=>{
    const id = req.params.id;
    const data = req.body;

    await pool.query("UPDATE tasks set ? WHERE task_id = ?", [data, id]);
    res.redirect("/tasks");

}

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy:destroy,
    edit: edit,
    update: update
}
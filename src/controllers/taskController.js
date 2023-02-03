const index = async (req, res)=>{
    await req.getConnection((err, conn)=>{
        conn.query("SELECT * FROM tasks", (err, tasks)=>{
            if(err){
                res.json(err);
            }
            res.render("tasks/index",{tasks});
            // console.log(tasks);
            // res.json(tasks);

        })
    })
    
}
// const index = (req, res)=>{
//     req.getConnection((err, conn)=>{
//         conn.query("SELECT * FROM tasks", (err, tasks)=>{
//             if(err){
//                 res.json(err);
//             }
//             // res.json(tasks);
//             res.render("tasks/index", {tasks});
//             // console.log(tasks);

//         })
//     })
// }

const create = (req, res)=>{
    res.render("tasks/create");
}

const store = (req, res)=>{
    // console.log(req.body);
    const data = req.body;
    // console.log(data);
    req.getConnection((err, conn)=>{
        conn.query("INSERT INTO tasks SET ?", [data], (err, results, rows)=>{
            // if (err) throw err;
            // console.log("Resultados: " + results);
            // res.redirect("/tasks");
            res.json(results);

        })
    });
}

const destroy = (req, res)=>{
    const id = req.body.id;
    console.log(id);
    req.getConnection((err, conn)=>{
        conn.query("DELETE FROM tasks where task_id = ?", [id], (err, results, rows)=>{
            // res.json(results);

            res.redirect("/tasks");

        })
    })

}

const edit = (req, res)=>{
    const id = req.params.id;

    req.getConnection((err, conn)=>{
        conn.query("SELECT * FROM tasks WHERE task_id = ?", [id], (err, tasks)=>{
            if(err){
                res.json(err);
                console.log("No funciono");
            }
            res.render("tasks/edit", {tasks});
            // console.log(tasks);

        })
    })
}

const update = (req, res)=>{
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err,conn)=>{
        conn.query("UPDATE tasks set ? WHERE task_id = ?", [data, id], (err,rows)=>{
            res.redirect("/tasks");
        })
    });

}

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy:destroy,
    edit: edit,
    update: update
}
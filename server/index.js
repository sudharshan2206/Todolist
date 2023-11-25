const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const database=require("mysql")
const connect=express()

connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static("public"))

connect.use(bodyparser.urlencoded({extended:true}))

let databaseconnection=database.createConnection({
    host:"localhost",
    port:3306,
    user:"root", 
    password:"Sudhar2206@",
    database:"products"
    })

    databaseconnection.connect(function(error){
        if(error){
            console.log(error)
        }
        else{
            console.log("database is connected")
        }
    })

    connect.post('/addtask',(request,response)=>{
        let{taskname,taskdescription}=request.body
        let sql='insert into todolist(taskname,taskdescription) values(?,?)'
        databaseconnection.query(sql,[taskname,taskdescription],(error,result)=>{
            if(error){
                response.send({"status":"error"})
                console.log(error)
            }
            else{
                response.send({"status":"success"})
                console.log("ok")
            }
        })
    })

    connect.get('/taskdetail',(request,response)=>{
        let sql='select * from todolist'
        databaseconnection.query(sql,(error,result)=>{
            if(error) {
                response.send(error)
                console.log(error)
            }
            else{
                response.send(result)
               
            }
           
        })
    })

    connect.get('/singletask/:id',(request,response)=>{
        let {id} = request.params
        let sql='select * from todolist where id=?'
        databaseconnection.query(sql,[id],(error,result)=>{
            if(error) {
                response.send(error)
                console.log(error)
            }
            else{
                response.send(result)
             
            }
            
        })
    })

    connect.put('/taskupdate/:id',(request,response)=>{
        let {id}=request.params
        let {taskname,taskdescription} = request.body
        let sql='update todolist set taskname=?,taskdescription=? where id=?'
        databaseconnection.query(sql,[taskname,taskdescription,id],(error,result)=>{
            if(error){
                response.send({"status":"not_updated"})
                console.log(error)
            }
            else{
                response.send({"status":"success","id":id})
                console.log("ok")
            }
        })
    })

    connect.post('/delete',(request,response)=>{
        let id = request.body.id  
        let sql='delete from todolist where id=?'
        databaseconnection.query(sql,[id],(error,result)=>{
            if(error){
                response.send({"status":"error"})
                console.log(error)
            }
            else{
                response.send({"status":"success"})
                console.log("okay")
            }
        })
    })
    
    connect.listen(2211,()=>{
        console.log("your server is running in port 2211")
    })
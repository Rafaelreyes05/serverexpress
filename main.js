const express = require('express')
const { send } = require('process')
const {Router} = express
const Container = require ('./Container')

const app = express()
const routerProductos = Router()
const PORT = 8080

app.use('/api/productos',routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))

let archivo = new Container ('productos.txt')

app.use(express.static('public'));

//Routes
routerProductos.get('/',(req,res)=>{
  console.log('llego una peticion')
  res.send(archivo.getAll())
})

routerProductos.get('/:id',(req,res)=>{
    console.log('peticion por id')
    const {id} = req.params
    console.log(`el id es: ${id}`)
    let producto = archivo.encontrar(id)
    res.send(producto)
})

routerProductos.post('/',(req,res)=>{
  let producto = req.body
  console.log(producto)
  producto = archivo.agregar(producto)
  res.send(producto)
})

routerProductos.put('/:id',(req,res)=>{
    let {id} = req.params
    let campos = req.body
    archivo.modificar(id,campos)
    res.send('Producto actualizado con exito!')
})

routerProductos.delete('/:id',(req,res)=>{
    let {id} =req.params
    archivo.eliminar(id)
    res.send('Producto ha sido eliminado con exito!')
})

//Listen
app.listen(PORT,(req,res)=>{
  console.log(`Escuchando en el puerto ${PORT}`)
})


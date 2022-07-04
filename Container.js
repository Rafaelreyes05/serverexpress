const fs = require('fs')


class Container{
  constructor(nombre){
    this.nombre = nombre
  }

  getAll(){
    const data = JSON.parse(fs.readFileSync(this.nombre,'utf-8'))
    return data
  }

  encontrar(id){
    const data = this.getAll()
    let producto = data.find(elemento=>elemento.id==id)
    if (producto){
      return producto
    }
    else{
      return 'El producto no se ha encontrado'
    }
    
  }

  escribir(array){
    const data = JSON.stringify(array)
    fs.writeFileSync(this.nombre,data,'utf-8')
  }

  agregar(producto){
    const data = this.getAll()
    producto.id = data.length+1
    data.push(producto)
    this.escribir(data)
    return producto
  }

  modificar(id,campos){
    campos.id = id
    const data = this.getAll()
    data[id-1] = campos
    this.escribir (data)
  }

  eliminar(id){
  const data = this.getAll()
  data.splice(id-1,id)
  this.escribir(data)
  }

}

module.exports = Container
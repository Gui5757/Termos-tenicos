class Item {
  // private createdAt: Date = new Date()
  // private updatedAt: Date = new Date()
  // private completedAt: Date | null = null
  // private group: string = "default"
  constructor(
    public title: string
  ) { }
}

class List {
  private items: Item[] = []

  constructor(
    private filename: string
  ) {
    this.load()
  }

  add(item: Item | string): List {
    if (typeof item === "string")
      item = new Item(item)
    this.items.push(item)
    this.save()
    return this
  }

  findOneByTitle(title: string): Item | undefined {
    return this.items.find(item => item.title === title)
  }

  findManyByTitle(title: string): Item[] {
    return this.items.filter(item => item.title === title)
  }

  remove(item: Item): void {
    const index = this.items.indexOf(item)
    if (index !== -1)
      this.items.splice(index, 1)
    this.save()
  }

  save(): void {
    const file = Bun.file(this.filename)
    const content = JSON.stringify(this.items)
    Bun.write(file, content)
  }

  getItems(): Item[] {
    return this.items
  }

  private async load() {
    try {
      const file = Bun.file(this.filename)
      const content = await file.json()
      console.warn("NÃO SE ESQUEÇA DE POPULAR A LIST NO CONSTRUCTOR")
    } catch (error) {
      Bun.write(this.filename, "[]")
    }
  }
}

const mercado = new List('mercado.json')
const tarefas = new List('tarefas.json')

// const item = new Item("comprar lete")

// mercado
//   .add("comprar macarrão")
//   .add("comprar pão")
//   .add("comprar pão")
//   .add(item)
//   .add("comprar paçoca")
//   .add("comprar pipoca")
//   .add("comprar Jirimum")

// item.title = "comprar leite"

// const itemN = mercado.findOneByTitle("comprar pão")
// itemN && (itemN.title = "comprar pão francês")

// console.log(mercado.getItems().map(item => item.title).join("\n"))
export class UsersService {
  users: {id:number,name:string,age:number,gender:string,isMarried:boolean}[] = [
    {id: 1, name: "John", age: 30, gender: "male", isMarried: true},
    {id: 2, name: "Jane", age: 25, gender: "female", isMarried: false},
    {id: 3, name: "Doe", age: 40, gender: "non-binary", isMarried: true}
  ];

  getUsers() {
    return this.users;
  }
  getUserByName(name: string) {
    return this.users.find(user => user.name === name);
  }
  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
  createUser(user: {name: string, age: number, gender: string, isMarried: boolean}) {
    const newUser = {
      id: this.users.length + 1,
      ...user 
    };
    this.users.push(newUser);
    return newUser;
  }
}

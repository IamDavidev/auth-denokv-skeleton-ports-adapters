// Single Responsibility Principle

// this form is not recommended because it is not scalable
// the class UserServices has many responsibilities ( Authenticate & register - Send email & Generate token )
interface UserEntity {
  name: string;
  email: string;
}

class UserServiceBad {

  constructor(
    private readonly db: UserEntity[]
  ) {
  }

  async authenticate(email: string, password: string) {
    // ... logic
  }

  async create(user: UserEntity) {
    // ... logic
  }

  async sendEmail(email: string, message: string) {
    // ... logic
  }

  async generateToken(name: string, reference: string) {
    // ... logic
  }

}

// this form is recommended because it is scalable
// the class UserServices has only one responsibility ( Authenticate & register )
// the class EmailService has only one responsibility ( Send email & Generate token )
// with this form, we can easily add new features without having to change the existing code

class UserService {

  constructor(
    private readonly db: UserEntity[]
  ) {
  }

  async create(user: UserEntity) {
    // ... logic
  }

  async authenticate(email: string, password: string) {
    // ... logic
  }

}

class EmailService {

  async sendEmail(email: string, message: string) {
    // ... logic
  }

  async generateToken(name: string, reference: string) {
    // ... logic
  }
}


/*  
    Open/Closed Principle
*/

interface PaymentMethod {
  pay(): void;
}

class CreditCard implements PaymentMethod {
  pay() {
    // ... logic
  }
}

class BankTransfer implements PaymentMethod {
  pay() {
    // ... logic
  }
}

/* 

  Liskov Substitution Principle
  
  The Liskov Substitution Principle (LSP) states that
  "objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program."
  in other words, the child class must be able to replace the parent class without causing errors in the program
  
 */


class CoffeeMachine {
  makeCoffee() {
    // ... logic
  }
}

class CappuccinoMachine extends CoffeeMachine {
  makeCoffee() {
    // ... logic
  }
}

class LatteMachine extends CoffeeMachine {
  makeCoffee() {
    // ... logic
  }
}

class SodaMachine extends CoffeeMachine {
  makeCoffee() {
    // this method will not be used
    throw new Error('This Machine does not make coffee')
  }
}

class CoffeeShop {
  constructor(
    private readonly coffeeMachine: CoffeeMachine
  ) {
  }

  makeCoffee() {
    this.coffeeMachine.makeCoffee()
  }
}

/*
  In the example above, the CoffeeShop class receives a CoffeeMachine instance in its constructor,
  but it can also receive a CappuccinoMachine or LatteMachine instance because they are subclasses of CoffeeMachine,
  and the CoffeeShop class will not have to change its code to receive these new subclasses.
  
  If we use SodaMachine instead of CoffeeMachine, the CoffeeShop class will have to change its code to receive this new subclass,
  because the SodaMachine class does not make coffee, and the CoffeeShop class expects to receive a CoffeeMachine instance that makes coffee.
  
 */


/* 

  Interface Segregation Principle
  
  interface PlayVideoGame {
  play(): void;
}

interface ServiceSaveVideoGame {
  save(): void;
  overwrite(): void;
}

  
*/


/* 
inteterface PlayVideoGame {
  play(): void;

  save(): void;

  overwrite(): void;
}


// Hardcore
class HardcoreVideoGame implements PlayVideoGame {
  play() {
    // ... logic
  }

  save() {
    // this game does not have a save feature
    throw new Error('This game does not have a save feature')
  }

  overwrite() {
    // this game does not have a overwrite feature
    throw new Error('This game does not have a overwrite feature')
  }
}*/

/* 
 En este caso la clase HardcodedVideoGame no debería implementar la interfaz PlayVideoGame
  porque no tiene las funcionalidades de save y overwrite, además de que no tiene sentido que las tenga
  ya que es un juego hardcodeado, por lo que no debería implementar la interfaz que lo obliga a tener esas funcionalidades

 */


interface PlayVideoGame {
  play(): void;
}

interface ServiceSaveVideoGame {
  save(): void;

  overwrite(): void;
}


class HardcoreVideoGame implements PlayVideoGame {
  play() {
    // ... logic
  }
}

class CasualVideoGame implements PlayVideoGame, ServiceSaveVideoGame {
  play() {
    // ... logic
  }

  save() {
    // ... logic
  }

  overwrite() {
    // ... logic
  }
}

/* 
  Dependency Inversion Principle
  
  The Dependency Inversion Principle (DIP) states that
  "high-level modules should not depend on low-level modules. Both should depend on abstractions (e.g. interfaces)."
  "abstractions should not depend on details. Details (concrete implementations) should depend on abstractions."
    
  In other words, the high-level module should not depend on the low-level module, both should depend on abstractions.
  And the abstractions should not depend on the details, the details should depend on the abstractions.
 */


/*
class Database {
  constructor(
    private readonly db: any
  ) {
  }

  async save(data: any) {
    // ... logic
  }
}

class UserAPI {
  constructor(
    private readonly database: Database
  ) {
  }

  async create(user: any) {
    // ... logic
  }
}
*/

/* 
  In the example above, the UserAPI class depends on the Database class, and the Database class is a low-level module,
  and the UserAPI class is a high-level module, so the UserAPI class depends on the low-level module, which is not recommended.
 */


interface Database {
  save(data: any): void;
}

class DatabaseService implements Database {
  constructor(
    private readonly db: any
  ) {
  }

  async save(data: any) {
    // ... logic
  }
}

class UserAPI {
  constructor(
    private readonly database: Database
  ) {
  }

  async create(user: any) {
    // ... logic
  }
}


/* 
  Now the UserAPI class depends on the Database interface, and the DatabaseService class implements the Database interface,
  so the UserAPI class depends on the abstraction (Database interface) and not on the details (DatabaseService class).
 */

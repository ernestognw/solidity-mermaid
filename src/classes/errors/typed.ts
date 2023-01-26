export class TypedError<T> extends Error {
  private readonly _name: string;

  constructor(message: string, private readonly _type: T) {
    super(message);
    this._name = this.constructor.name;
  }

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  print() {
    console.error(`${this.name} [${this.type}]: ${this.message}`);
  }
}

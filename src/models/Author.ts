export type authorType = {
  firstName: string;
  lastName: string;
  _id: string;
};

class Author {
  private id: string;
  private firstName: string;
  private lastName: string;

  constructor(_id: string, firstName: string, lastName: string) {
    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getId() {
    return this.id.toString();
  }

  public getFirstName() {
    return this.firstName;
  }

  public getLastName() {
    return this.lastName;
  }
}

export default Author;

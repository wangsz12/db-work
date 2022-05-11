export class ReaderCardEntity {
  constructor(
    id: string,
    name?: string,
    gender?: number,
    contact?: string,
    address?: string,
  ) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.contact = contact;
    this.address = address;
  }

  id: string;

  name?: string;

  gender?: number;

  contact?: string;

  address?: string;
}

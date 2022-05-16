import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';
import { PublisherEntity } from 'src/publishers/entity/publisher.entity';

export class BookEntity {
  constructor(
    id: string,
    publisher?: PublisherEntity,
    name?: string,
    author?: string,
    quantity?: number,
    category?: string,
    isbn?: string,
    price?: number,
  ) {
    this.id = id;
    this.publisher = publisher;
    this.name = name;
    this.author = author;
    this.quantity = quantity;
    this.category = category;
    this.isbn = isbn;
    this.price = price;
  }

  @IsString()
  id: string;

  publisher?: PublisherEntity;

  @IsString()
  name?: string;

  @IsString()
  author?: string;

  @IsInt()
  @Min(0)
  quantity?: number;

  @IsString()
  category?: string;

  @IsString()
  @Length(13)
  isbn?: string;

  @IsNumber()
  price?: number;
}

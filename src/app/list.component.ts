import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpBookService} from './http-book-service';
import {Book} from './book';
import {CapitalizePipe} from './capitalize.pipe';
@Component({
  selector: 'app-list',
  template: `
    <div>
      <ul>
<!-- -----CREATE NEW BOOK------------------- -->
        <li id="li1">
          <label><h3>Title:</h3></label>
          <input [(ngModel)]="bookCreate.title"  type="text" #titleCreate class="form-control" required>
          <span [hidden]="titleCreate.checkValidity()">  * </span>
          <button (click)="createBook()" [disabled]=
            "!(dateCreate.checkValidity() && authorCreate.checkValidity() && titleCreate.checkValidity())">
          Create</button><br>
          <label><h3>Author:</h3></label>
          <input [(ngModel)]="bookCreate.author" type="text" #authorCreate class="form-control" required>
          <span [hidden]="authorCreate.checkValidity()">  * </span><br>
          <label><h3>Date:</h3></label>
          <input [(ngModel)]="bookCreate.date" type="text"  #dateCreate class="form-control" required>
          <span [hidden]="dateCreate.checkValidity()">  * </span>
        </li>
<!-- --------------LIST OF BOOKS-------------------------- -->
        <li *ngFor="let book of books">
          <label class="bookField"><h3>Title: </h3></label> <h4>{{book.title | capitalize }}</h4>
          <button (click)="openModal(book)" >E d i t</button><br>
          <label class="bookField"> <h3>Author: </h3></label> <h4>{{(book.author)}}</h4><br>
          <label class="bookField"><h3>Date : </h3></label> <h4>{{book.date}}</h4>
          <button (click)="deleteBook(book.title)">Delete</button><br>
        </li>
      </ul>
    </div>
<!-- ---------------MODAL FOR EDIT BOOK--------------------------------------- -->
    <div #popup id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span #close class="close" (click)="closeModel()" >&times;</span>
          <h4>Update book details</h4>
        </div>
        <div class="modal-body">
          <div class="formContainer">
              <form id="form-edit" #bookUpdateForm="ngForm"
                    (ngSubmit)="updateBook(bookForUpdate)">
                <div class="container">
                  <label for="title">Title:</label>
                  <input type="text" name="title" class="form-control"  [disabled]="true" [ngModel]="bookForUpdate.title" required><br>
                  <label for="author"><strong>Author:</strong></label>
                  <span [hidden]="a.checkValidity()">  field can't be empty </span>
                  <input type="text" name="author" class="form-control" #a [(ngModel)]="bookForUpdate.author" required><br>
                  <label for="author"><strong>Date:</strong></label>
                  <span [hidden]="d.checkValidity()">field can't be empty </span>
                  <input type="text" name="date" class="form-control" #d [(ngModel)]="bookForUpdate.date" required><br>
                  <input type="submit" class="btn btn-default" [disabled]="!(a.checkValidity()&&d.checkValidity())" >
                  <button class="cancelbtn" (click)="closeModel()">cancel</button>
                </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>

  `,

  providers: [HttpBookService]
})

export class ListComponent implements OnInit {
  @ViewChild('popup') modal: ElementRef;
  public msg: string;
  public books: Book[];
  public bookCreate: Book = {title: '', author: '', date: '26-11-1989'};
  public bookForUpdate: Book = {title: '', author: '', date: ''};
  constructor(private _httpBookService: HttpBookService) {
  }
  ngOnInit(): any {
     this.getBooksHttp();
  }

  closeModel() {
    this.modal.nativeElement.style.display = 'none';
  }

  createBook() {
    let bookLoop = null;
    let title;
    title = new CapitalizePipe().transform(this.bookCreate.title);
    for (bookLoop of this.books) {
      if (title === bookLoop.title) {
        alert('Title already exist');
        return;
      }
    }
    this._httpBookService.createBook({
      title: this.bookCreate.title,
      author: this.bookCreate.author,
      date: this.bookCreate.date
    }).subscribe(msg => this.msg = msg);
    this.books.push({title: this.bookCreate.title, author: this.bookCreate.author, date: this.bookCreate.date});
    this.bookCreate = {title: '', author: '', date: ''};

  }

  deleteBook(title) {
    if (confirm('Are you sure you want to delete this item?!') === true) {
      this._httpBookService.deleteBook(title).subscribe(msg => this.msg = msg);
      this.getBooksHttp();
    }
  }
  getBooksHttp() {
    this._httpBookService.getBooks().subscribe((resBooks: Book[]) => {this.books = resBooks});

  }

  openModal(book) {
    this.bookForUpdate = book;
    this.modal.nativeElement.style.display = 'block';
  }

  updateBook(book) {
    this._httpBookService.updateBook({
      title: book.title,
      author: book.author,
      date: book.date
    }).subscribe(msg => this.msg = msg);
      this.modal.nativeElement.style.display = 'none';
      this.getBooksHttp();
  }
}

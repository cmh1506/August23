import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from "../login/user";
import { Observable, BehaviorSubject, of, catchError, finalize } from 'rxjs';
import { UserService } from "../service/user.service";

export class UserListRemoteDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) { }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers() {
    this.loadingSubject.next(true);
    this.userService.getUsers().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(users => this.usersSubject.next(users));
  }
}
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@shared/models/user.model';
import { auth } from 'firebase/app';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  async loginWithGoogle(): Promise<void> {
    const { user } = await this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
  }

  getCurrentUser(): Observable<User> {
    return from(
      this.afAuth.currentUser
        .then((currentUser) => {
          return currentUser as User;
        })
        .catch((error) => {
          throw new Error(this._handlerErrors(error));
        })
    ).pipe(
      map((user: User) => user),
      catchError((error) => throwError(error))
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => user !== null));
  }

  private _handlerErrors(error: any): any {
    let message: string =
      _AuthenticationFirebaseMessage.AUTH_ERRORS[error.code];
    if (!message) {
      message = error;
    }

    return message;
  }
}

class _AuthenticationFirebaseMessage {
  // Messages for code errors in firebase
  static AUTH_ERRORS: any = {
    'auth/account-exists-with-different-credential':
      'Ya existe una cuenta con esas credenciales.',
    'auth/invalid-credential': 'Las credenciales no son validas.',
    'auth/operation-not-allowed': 'Operación no permitida.',
    'auth/user-disabled': 'El usuario esta deshabilitado.',
    'auth/user-not-found': 'El usuario no se encontró.',
    'auth/wrong-password': 'El usuario o password no es valido.',
    'auth/invalid-verification-code': 'El código de verificación no es valido.',
    'auth/invalid-verification-id': 'El Id de verificación no es valido.',
    'auth/user-not-verificated': 'No se a verificado el email del usuario.', // this error isn't firebase
    'auth/email-already-in-use': 'El email ya esta en uso por otra cuenta.',
  };
}

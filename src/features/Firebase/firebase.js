import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
	apiKey: "AIzaSyBT5fHWuP1nTA9CCfahWZgk9jlU0IXyVXQ",
	authDomain: "rationghar-112.firebaseapp.com",
	databaseURL: "https://rationghar-112.firebaseio.com",
	projectId: "rationghar-112",
	storageBucket: "rationghar-112.appspot.com",
	messagingSenderId: "35319229556",
	appId: "1:35319229556:web:cee56220e5062eb6f53521",
	measurementId: "G-73RL0LTK5G"
}

class Firebase {
  constructor() {
		app.initializeApp(config)
		
		this.auth = app.auth()
		this.db = app.database()
	}
	
	// *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password)
		
	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password)

	doSignOut = () => this.auth.signOut()

	// *** User API ***

	user = uid => this.db.ref(`users/${uid}`)
	users = () => this.db.ref('users')
	form = fid => this.db.ref(`forms/${fid}`)
	forms = () => this.db.ref('forms')
}

export default Firebase
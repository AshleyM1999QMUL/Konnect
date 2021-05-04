import firebase from 'firebase'

class Fire{
    constructor(){
        this.init();
        this.observeAuth();
    }

    init = () => 
        firebase.initializeApp({
            apiKey: "AIzaSyBRWyMKH8BNdsNuaNBKDrOa9bbM1Lqc0TI",
            authDomain: "konnectchat-29181.firebaseapp.com",
            projectId: "konnectchat-29181",
            storageBucket: "konnectchat-29181.appspot.com",
            messagingSenderId: "890200839303",
            appId: "1:890200839303:web:b63615287a5a79f19fd422",
            measurementId: "G-0YXDSJV9KS",
            databaseURL: "https://konnectchat-29181-default-rtdb.firebaseio.com/"
        });

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    
    onAuthStateChanged = user =>{
        if(!user){
            try{
                firebase.auth().signInAnonymously();
            }catch({message}){
                alert(message);
            }
        }
    }

    get ref(){
        return firebase.database().ref('messages');
    }

    on = callback =>
        this.ref.limitToLast(20).on('child_added', snapshot =>
        callback(this.parse(snapshot)));

    parse = snapshot =>{
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot

        const timestamp = new Date(numberStamp)
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp(){
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for(let i = 0; i < messages.length; i++){
            const {text, user} = messages[i]
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    }

    append = message => this.ref.push(message);

    off(){
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;
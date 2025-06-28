class UserProfile  {
constructor(username, email){
    this.username = username;
    this.email; email
}
displayInfo(){
    console.log(`Username: ${this.username} Email: ${this.email}`);
}
}

const user = new UserProfile('john', 'john@gmail.com');
user.displayInfo();